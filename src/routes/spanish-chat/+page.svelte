<script lang="ts" context="module">
	// Declare gtag function for TypeScript
	declare function gtag(command: string, targetId: string | Date, config?: Record<string, any>): void;
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	interface ChatMessage {
		role: 'user' | 'assistant';
		content: string;
		timestamp: Date;
	}

	let messages: ChatMessage[] = [];
	let userInput = '';
	let isLoading = false;
	let isTyping = false;
	let chatContainer: HTMLElement;
	let inputElement: HTMLInputElement;
	let showWelcome = true;
	let currentScenario = '';

	// Scenario suggestions for new conversations
	const scenarioSuggestions = [
		{ emoji: '🍽️', title: 'Restaurant', description: 'Order food and drinks at a Spanish restaurant' },
		{ emoji: '🗺️', title: 'Directions', description: 'Ask for and understand directions in the city' },
		{ emoji: '🛍️', title: 'Shopping', description: 'Buy clothes, souvenirs, or groceries' },
		{ emoji: '🏨', title: 'Hotel', description: 'Check in, ask about amenities, report problems' },
		{ emoji: '☕', title: 'Café', description: 'Order coffee and pastries like a local' },
		{ emoji: '🚇', title: 'Metro', description: 'Navigate public transportation' },
		{ emoji: '👋', title: 'Meeting People', description: 'Introduce yourself and make friends' },
		{ emoji: '💊', title: 'Pharmacy', description: 'Get help with basic medical needs' }
	];

	onMount(() => {
		// Analytics: Track Phase 3 start
		gtag('event', 'phase3_chat_started', {
			'feature': 'ai_conversation',
			'phase': '3'
		});

		// Focus input on load
		if (inputElement) {
			inputElement.focus();
		}

		// Start with a welcome message from María
		startWelcomeConversation();
	});

	async function startWelcomeConversation() {
		showWelcome = false;
		isTyping = true;
		
		// Simulate typing delay
		setTimeout(async () => {
			const welcomeMessage: ChatMessage = {
				role: 'assistant',
				content: '¡Hola! Soy María, tu amiga local de Madrid. [Hello! I\'m María, your local friend from Madrid.] ¡Qué emocionante que quieras practicar español conmigo! [How exciting that you want to practice Spanish with me!] \n\nHe oído que ya sabes lo básico - ¡perfecto! [I heard you already know the basics - perfect!] Podemos practicar situaciones reales que encontrarás en España. [We can practice real situations you\'ll encounter in Spain.]\n\n¿Qué te gustaría practicar primero? [What would you like to practice first?] 😊\n\n💡 *Tip: From now on, I\'ll speak in Spanish like a real local would. If you need help, just ask "¿Qué significa...?" or "Help!"*',
				timestamp: new Date()
			};
			
			messages = [welcomeMessage];
			isTyping = false;
			scrollToBottom();
		}, 1500);
	}

	async function sendMessage() {
		if (!userInput.trim() || isLoading) return;

		const userMessage: ChatMessage = {
			role: 'user',
			content: userInput,
			timestamp: new Date()
		};

		messages = [...messages, userMessage];
		const currentInput = userInput;
		userInput = '';
		isLoading = true;
		isTyping = true;

		// Analytics: Track message sent
		gtag('event', 'chat_message_sent', {
			'message_length': currentInput.length,
			'conversation_length': messages.length
		});

		scrollToBottom();

		try {
			const response = await fetch('/api/chat', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					message: currentInput,
					conversationHistory: messages.slice(-10) // Keep last 10 messages for context
				})
			});

			const data = await response.json();

			if (data.success) {
				// Simulate typing delay for more natural feel
				setTimeout(() => {
					const aiMessage: ChatMessage = {
						role: 'assistant',
						content: data.message,
						timestamp: new Date()
					};
					
					messages = [...messages, aiMessage];
					isTyping = false;
					scrollToBottom();
				}, 1000 + Math.random() * 1000); // 1-2 second delay
			} else {
				throw new Error(data.error || 'Failed to get response');
			}
		} catch (error) {
			console.error('Chat error:', error);
			let errorContent = 'Lo siento, tengo problemas técnicos. [Sorry, I\'m having technical issues.] ¿Puedes intentar otra vez? [Can you try again?]';
			
			// Check if it's a rate limit error
			if (error.message && error.message.includes('429')) {
				errorContent = 'Perdón, estoy un poco ocupada ahora. [Sorry, I\'m a bit busy right now.] ¿Puedes intentar otra vez en un momento? [Can you try again in a moment?]';
			}
			
			const errorMessage: ChatMessage = {
				role: 'assistant',
				content: errorContent,
				timestamp: new Date()
			};
			messages = [...messages, errorMessage];
			isTyping = false;
		} finally {
			isLoading = false;
			scrollToBottom();
		}
	}

	async function startNewScenario(scenario?: string) {
		isLoading = true;
		isTyping = true;

		// Analytics: Track new scenario
		gtag('event', 'new_scenario_started', {
			'scenario': scenario || 'random',
			'conversation_length': messages.length
		});

		try {
			const response = await fetch('/api/chat', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					message: scenario ? `I want to practice a ${scenario} scenario` : 'I want to try a new scenario',
					conversationHistory: messages.slice(-5), // Less context for fresh start
					isNewScenario: true
				})
			});

			const data = await response.json();

			if (data.success) {
				setTimeout(() => {
					const aiMessage: ChatMessage = {
						role: 'assistant',
						content: data.message,
						timestamp: new Date()
					};
					
					messages = [...messages, aiMessage];
					isTyping = false;
					currentScenario = scenario || 'New Scenario';
					scrollToBottom();
				}, 1500);
			}
		} catch (error) {
			console.error('Scenario error:', error);
			isTyping = false;
		} finally {
			isLoading = false;
		}
	}

	function scrollToBottom() {
		setTimeout(() => {
			if (chatContainer) {
				chatContainer.scrollTop = chatContainer.scrollHeight;
			}
		}, 100);
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
			sendMessage();
		}
	}

	function clearConversation() {
		messages = [];
		currentScenario = '';
		startWelcomeConversation();
	}

	function formatMessageContent(content: string) {
		// Convert [English text] to styled translations
		return content.replace(/\[([^\]]+)\]/g, '<span class="translation">[$1]</span>');
	}
</script>

<svelte:head>
	<title>Phase 3: Spanish Conversation - LangLearner</title>
	<meta name="description" content="Practice real Spanish conversations with AI tutor María" />
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
	<div class="container mx-auto px-4 py-6">
		<div class="max-w-4xl mx-auto">
			<!-- Header -->
			<div class="bg-white rounded-t-xl shadow-lg p-6 border-b border-orange-100">
				<div class="flex items-center justify-between">
					<div class="flex items-center space-x-4">
						<div class="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
							<span class="text-white text-xl font-bold">M</span>
						</div>
						<div>
							<h1 class="text-2xl font-bold text-gray-900">Chat with María</h1>
							<p class="text-gray-600">Your friendly Spanish conversation partner from Madrid 🇪🇸</p>
							{#if currentScenario}
								<span class="inline-block mt-1 px-3 py-1 bg-orange-100 text-orange-800 text-sm rounded-full">
									Current: {currentScenario}
								</span>
							{/if}
						</div>
					</div>
					<div class="flex space-x-2">
						<button
							on:click={clearConversation}
							class="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm"
						>
							🔄 New Chat
						</button>
						<a
							href="/dashboard"
							class="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors text-sm"
						>
							← Dashboard
						</a>
					</div>
				</div>
			</div>

			<!-- Chat Container -->
			<div class="bg-white shadow-lg" style="height: 500px;">
				<div
					bind:this={chatContainer}
					class="h-full overflow-y-auto p-6 space-y-4"
				>
					{#if showWelcome}
						<!-- Welcome Screen -->
						<div class="text-center py-12">
							<div class="text-6xl mb-4">👋</div>
							<h2 class="text-2xl font-bold text-gray-900 mb-2">¡Bienvenido a Phase 3!</h2>
							<p class="text-gray-600 mb-6">Get ready to chat with María, your AI Spanish tutor!</p>
							<div class="animate-pulse text-orange-600">Connecting with María...</div>
						</div>
					{:else}
						<!-- Chat Messages -->
						{#each messages as message}
							<div class="flex {message.role === 'user' ? 'justify-end' : 'justify-start'}">
								<div class="max-w-xs lg:max-w-md">
									{#if message.role === 'assistant'}
										<div class="flex items-start space-x-2">
											<div class="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center flex-shrink-0">
												<span class="text-white text-sm font-bold">M</span>
											</div>
											<div class="bg-gray-100 rounded-lg px-4 py-3">
												<div class="text-gray-900 whitespace-pre-wrap">
													{@html formatMessageContent(message.content)}
												</div>
											</div>
										</div>
									{:else}
										<div class="bg-blue-600 text-white rounded-lg px-4 py-3">
											<div class="whitespace-pre-wrap">{message.content}</div>
										</div>
									{/if}
								</div>
							</div>
						{/each}

						<!-- Typing Indicator -->
						{#if isTyping}
							<div class="flex justify-start">
								<div class="flex items-start space-x-2">
									<div class="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
										<span class="text-white text-sm font-bold">M</span>
									</div>
									<div class="bg-gray-100 rounded-lg px-4 py-3">
										<div class="flex space-x-1">
											<div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
											<div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
											<div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
										</div>
									</div>
								</div>
							</div>
						{/if}
					{/if}
				</div>
			</div>

			<!-- Input Area -->
			<div class="bg-white rounded-b-xl shadow-lg p-4 border-t border-gray-100">
				<div class="flex space-x-3">
					<input
						bind:this={inputElement}
						bind:value={userInput}
						on:keydown={handleKeydown}
						placeholder="Type in Spanish... (¡Escribe en español!)"
						class="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none text-lg"
						disabled={isLoading}
					/>
					<button
						on:click={() => { userInput = '¿Qué significa eso?'; sendMessage(); }}
						disabled={isLoading}
						class="px-4 py-3 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg font-medium transition-colors"
						title="Ask for help with translation"
					>
						❓
					</button>
					<button
						on:click={sendMessage}
						disabled={!userInput.trim() || isLoading}
						class="px-6 py-3 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-300 text-white rounded-lg font-medium transition-colors"
					>
						{#if isLoading}
							<div class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
						{:else}
							Send
						{/if}
					</button>
				</div>

				<!-- Quick Scenario Buttons -->
				<div class="mt-4 flex flex-wrap gap-2">
					<button
						on:click={() => startNewScenario()}
						class="px-3 py-1 bg-green-100 hover:bg-green-200 text-green-700 rounded-full text-sm transition-colors"
						disabled={isLoading}
					>
						🎲 Random Scenario
					</button>
					{#each scenarioSuggestions.slice(0, 4) as scenario}
						<button
							on:click={() => startNewScenario(scenario.title)}
							class="px-3 py-1 bg-orange-100 hover:bg-orange-200 text-orange-700 rounded-full text-sm transition-colors"
							disabled={isLoading}
							title={scenario.description}
						>
							{scenario.emoji} {scenario.title}
						</button>
					{/each}
				</div>

				<!-- Help Text -->
				<div class="mt-3 text-center">
					<p class="text-sm text-gray-500">
						💡 Tip: María speaks like a real local now! Use the ❓ button or type "¿Qué significa...?" if you need help.
					</p>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	:global(.translation) {
		color: #6b7280;
		font-style: italic;
		font-size: 0.9em;
	}
	
	.animate-bounce {
		animation: bounce 1.4s infinite;
	}
	
	@keyframes bounce {
		0%, 80%, 100% {
			transform: translateY(0);
		}
		40% {
			transform: translateY(-10px);
		}
	}
</style>
