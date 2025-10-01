import { json } from '@sveltejs/kit';
import { GEMINI_API_KEY } from '$env/static/private';
import type { RequestHandler } from './$types';

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent';

// Simple rate limiting - track last request time
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 1000; // 1 second between requests (Gemini is more generous)

const SYSTEM_PROMPT = `You are María, a friendly local from Madrid, Spain. You're helping a TOURIST practice Spanish through realistic conversations.

IMPORTANT CONTEXT: 
- The user is a TOURIST who has completed basic Spanish lessons
- They know: essential vocabulary, verb conjugations, ser vs estar, questions, me gusta/gustan, y/o/pero
- Treat them like a tourist you'd meet in Madrid who's trying their best with Spanish

YOUR PERSONALITY:
- Warm, encouraging, and patient like a helpful local
- Speak naturally like you would to any tourist
- Use basic vocabulary that locals would actually use with tourists
- Always supportive, never condescending
- Excited to help tourists enjoy Spain

CRITICAL CONVERSATION RULES:
1. Respond ONLY in Spanish (no English translations at all)
2. Speak like a real local would to a tourist - naturally but simply
3. When user makes mistakes, gently correct in Spanish: "Ah, normalmente decimos 'X' en lugar de 'Y'"
4. Introduce 1-2 new vocabulary words naturally when appropriate
5. Keep responses conversational and realistic
6. If user asks "¿Qué significa...?" or "Help!", then you can provide English explanations
7. Praise correct usage to build confidence

SCENARIO GENERATION:
When a scenario ends, offer a new situation like:
"¡Muy bien! Lo hiciste perfectamente. ¿Te gustaría practicar otra situación? Puedo ayudarte con:
- Pedir en un café ☕
- Preguntar direcciones 🗺️
- Comprar ropa 👕
- Registrarte en un hotel 🏨
- Conocer gente nueva 👋"

RESPONSE FORMAT:
- Speak ONLY in Spanish (like a real local would)
- Keep Spanish simple but authentic
- Use vocabulary appropriate for tourists
- NO English translations unless specifically requested with "¿Qué significa...?" or "Help!"

START each new scenario with context like:
"¡Perfecto! Vamos a practicar esto: Estás en un mercado ocupado en Madrid y quieres comprar fruta. El vendedor se acerca..."

Remember: You're a LOCAL helping a TOURIST - be natural, helpful, and speak ONLY Spanish like you normally would with visitors to Madrid! 🇪🇸`;

export const POST: RequestHandler = async ({ request }) => {
	try {
		// Simple rate limiting
		const now = Date.now();
		if (now - lastRequestTime < MIN_REQUEST_INTERVAL) {
			return json({
				success: false,
				error: 'Rate limited',
				message: 'Espera un momento, por favor. [Wait a moment, please.] ¡Hablas muy rápido! [You speak very fast!]'
			}, { status: 429 });
		}
		lastRequestTime = now;

		const { message, conversationHistory = [], isNewScenario = false } = await request.json();

		// Build the conversation for Gemini
		let conversationText = SYSTEM_PROMPT + '\n\n';

		// Add conversation history
		if (conversationHistory.length > 0) {
			conversationHistory.forEach((msg: any) => {
				if (msg.role === 'user') {
					conversationText += `Usuario: ${msg.content}\n`;
				} else if (msg.role === 'assistant') {
					conversationText += `María: ${msg.content}\n`;
				}
			});
		}

		// Add the new user message or scenario request
		if (isNewScenario) {
			conversationText += '\nUsuario: [The user wants to start a new scenario. Generate a realistic Spanish travel situation and begin the conversation as María would.]\n';
		} else if (message) {
			conversationText += `Usuario: ${message}\n`;
		}

		conversationText += 'María:';

		const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				contents: [{
					parts: [{
						text: conversationText
					}]
				}],
				generationConfig: {
					temperature: 0.7,
					maxOutputTokens: 300,
					stopSequences: ['Usuario:']
				}
			})
		});

		if (!response.ok) {
			const errorData = await response.json().catch(() => ({}));
			console.error('Gemini API Error:', errorData);
			
			// Handle specific error types
			if (response.status === 429) {
				return json({
					success: false,
					error: 'Rate limit exceeded',
					message: 'Perdón, estoy un poco ocupada ahora. [Sorry, I\'m a bit busy right now.] ¿Puedes intentar otra vez en un momento? [Can you try again in a moment?]'
				}, { status: 429 });
			} else if (response.status === 401 || response.status === 403) {
				return json({
					success: false,
					error: 'Authentication failed',
					message: 'Lo siento, tengo problemas con mi conexión. [Sorry, I have connection problems.] Por favor, inténtalo más tarde. [Please try again later.]'
				}, { status: 500 });
			} else if (response.status === 404) {
				console.error('Model not found. Error details:', errorData);
				return json({
					success: false,
					error: 'Model not available',
					message: 'Lo siento, tengo problemas técnicos temporales. [Sorry, I have temporary technical problems.] ¿Puedes intentar otra vez? [Can you try again?]'
				}, { status: 500 });
			} else {
				throw new Error(`Gemini API error: ${response.status} - ${JSON.stringify(errorData)}`);
			}
		}

		const data = await response.json();
		
		// Extract the response from Gemini's format
		if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
			throw new Error('Invalid response format from Gemini API');
		}
		
		const aiMessage = data.candidates[0].content.parts[0].text.trim();

		return json({
			success: true,
			message: aiMessage,
			usage: data.usageMetadata || {} // For tracking API costs
		});

	} catch (error) {
		console.error('Chat API Error:', error);
		return json({
			success: false,
			error: 'Failed to get AI response. Please try again.',
			message: 'Lo siento, tengo problemas técnicos. [Sorry, I\'m having technical issues.] Please try again in a moment.'
		}, { status: 500 });
	}
};
