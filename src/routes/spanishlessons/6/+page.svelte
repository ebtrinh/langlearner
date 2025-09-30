<script lang="ts" context="module">
	// Declare gtag function for TypeScript
	declare function gtag(command: string, targetId: string | Date, config?: Record<string, any>): void;
</script>

<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	
	let currentStep = 0;
	let selectedAnswer = '';
	let typedAnswer = '';
	let showFeedback = false;
	let showHint = false;
	let wrongAttempts = 0;
	let showAlternativeButton = false;
	let celebrationMessage = '';
	let showCelebration = false;
	
	// Lesson 6: Me Gusta vs Me Gustan
	const lesson6Content = {
		title: 'Expressing Likes: Me Gusta vs Me Gustan',
		steps: [
			{
				type: 'teaching',
				title: 'Talking About What You Like',
				content: 'In Spanish, expressing what you like is different from English. Instead of "I like tacos," you say "Tacos please me" (me gustan tacos). The verb changes based on whether you like ONE thing (gusta) or MULTIPLE things (gustan).',
				examples: [
					{ 
						type: 'singular',
						spanish: 'Me gusta la comida',
						english: 'I like the food',
						pronunciation: 'meh GOOS-tah lah koh-MEE-dah',
						explanation: 'ONE thing (la comida) → use GUSTA'
					},
					{ 
						type: 'plural',
						spanish: 'Me gustan los tacos',
						english: 'I like tacos',
						pronunciation: 'meh GOOS-tahn lohs TAH-kohs',
						explanation: 'MULTIPLE things (los tacos) → use GUSTAN'
					},
					{ 
						type: 'singular',
						spanish: 'No me gusta el café',
						english: 'I don\'t like coffee',
						pronunciation: 'noh meh GOOS-tah ehl kah-FEH',
						explanation: 'Add NO before ME to say you don\'t like something'
					},
					{ 
						type: 'others',
						spanish: 'Te gusta la música',
						english: 'You like music',
						pronunciation: 'teh GOOS-tah lah MOO-see-kah',
						explanation: 'TE gusta = you like, LE gusta = he/she likes'
					}
				],
				rule: 'ONE thing = ME GUSTA. MULTIPLE things = ME GUSTAN. It\'s about what pleases you!'
			},
			// Multiple Choice Questions (1-4)
			{
				type: 'practice',
				questionNumber: 1,
				inputType: 'multiple',
				title: 'Multiple Choice Practice',
				question: 'How do you say "I like pizza"? (pizza is singular)',
				options: ['Me gustan la pizza', 'Me gusta la pizza', 'Me gusta las pizzas'],
				correct: 1,
				correctExplanation: 'Correct! "Me gusta la pizza" (meh GOOS-tah lah PEET-sah) - pizza is one thing, use GUSTA.',
				wrongExplanation: 'Pizza is singular (one thing), so use ME GUSTA.',
				alternativeQuestion: 'How do you say "I like wine"? (el vino)',
				alternativeOptions: ['Me gusta el vino', 'Me gustan el vino', 'Me gustan los vinos'],
				alternativeCorrect: 0,
				alternativeCorrectExplanation: 'Perfect! "Me gusta el vino" (meh GOOS-tah ehl VEE-noh) - wine is one thing, use GUSTA.',
				alternativeWrongExplanation: 'Wine is singular (one thing), so use ME GUSTA.'
			},
			{
				type: 'practice',
				questionNumber: 2,
				inputType: 'multiple',
				title: 'Multiple Choice Practice',
				question: 'How do you say "I like vegetables"? (las verduras - plural)',
				options: ['Me gusta las verduras', 'Me gustan las verduras', 'Me gusta la verdura'],
				correct: 1,
				correctExplanation: 'Perfect! "Me gustan las verduras" (meh GOOS-tahn lahs ver-DOO-rahs) - vegetables are multiple, use GUSTAN.',
				wrongExplanation: 'Vegetables (verduras) are plural, so use ME GUSTAN.',
				alternativeQuestion: 'How do you say "I like fruits"? (las frutas)',
				alternativeOptions: ['Me gustan las frutas', 'Me gusta las frutas', 'Me gusta la fruta'],
				alternativeCorrect: 0,
				alternativeCorrectExplanation: 'Excellent! "Me gustan las frutas" (meh GOOS-tahn lahs FROO-tahs) - fruits are multiple, use GUSTAN.',
				alternativeWrongExplanation: 'Fruits (frutas) are plural, so use ME GUSTAN.'
			},
			{
				type: 'practice',
				questionNumber: 3,
				inputType: 'multiple',
				title: 'Multiple Choice Practice',
				question: 'How do you say "I don\'t like beer"? (la cerveza)',
				options: ['No me gustan la cerveza', 'No me gusta la cerveza', 'Me no gusta la cerveza'],
				correct: 1,
				correctExplanation: 'Excellent! "No me gusta la cerveza" (noh meh GOOS-tah lah ser-VEH-sah) - add NO before ME.',
				wrongExplanation: 'To say you don\'t like something, put NO before ME GUSTA.',
				alternativeQuestion: 'How do you say "I don\'t like onions"? (las cebollas)',
				alternativeOptions: ['No me gustan las cebollas', 'No me gusta las cebollas', 'Me no gustan las cebollas'],
				alternativeCorrect: 0,
				alternativeCorrectExplanation: 'Perfect! "No me gustan las cebollas" (noh meh GOOS-tahn lahs seh-BOH-yahs) - add NO before ME.',
				alternativeWrongExplanation: 'To say you don\'t like something, put NO before ME GUSTAN.'
			},
			{
				type: 'practice',
				questionNumber: 4,
				inputType: 'multiple',
				title: 'Multiple Choice Practice',
				question: 'How do you say "You like music"? (la música)',
				options: ['Te gustan la música', 'Te gusta la música', 'Me gusta la música'],
				correct: 1,
				correctExplanation: 'Great! "Te gusta la música" (teh GOOS-tah lah MOO-see-kah) - TE gusta = you like.',
				wrongExplanation: 'For "you like," use TE GUSTA (not ME GUSTA).',
				alternativeQuestion: 'How do you say "She likes books"? (los libros)',
				alternativeOptions: ['Le gustan los libros', 'Le gusta los libros', 'Me gustan los libros'],
				alternativeCorrect: 0,
				alternativeCorrectExplanation: 'Excellent! "Le gustan los libros" (leh GOOS-tahn lohs LEE-brohs) - LE gustan = she likes multiple things.',
				alternativeWrongExplanation: 'For "she likes," use LE GUSTAN (not ME GUSTAN).'
			},
			// Typed Questions (5-8)
			{
				type: 'practice',
				questionNumber: 5,
				inputType: 'typed',
				title: 'Type the Answer',
				question: 'How do you say "I like Mexican food"? (la comida mexicana)',
				correctAnswer: 'me gusta la comida mexicana',
				correctExplanation: 'Perfect! "Me gusta la comida mexicana" (meh GOOS-tah lah koh-MEE-dah meh-hee-KAH-nah) - food is singular!',
				wrongExplanation: 'Remember: la comida (food) is singular, so use ME GUSTA.',
				alternativeQuestion: 'How do you say "I like Italian food"? (la comida italiana)',
				alternativeAnswer: 'me gusta la comida italiana',
				alternativeCorrectExplanation: 'Perfect! "Me gusta la comida italiana" (meh GOOS-tah lah koh-MEE-dah ee-tah-lee-AH-nah) - food is singular!',
				alternativeWrongExplanation: 'Remember: la comida (food) is singular, so use ME GUSTA.'
			},
			{
				type: 'practice',
				questionNumber: 6,
				inputType: 'typed',
				title: 'Type the Answer',
				question: 'How do you say "I like spicy foods"? (las comidas picantes)',
				correctAnswer: 'me gustan las comidas picantes',
				correctExplanation: 'Excellent! "Me gustan las comidas picantes" (meh GOOS-tahn lahs koh-MEE-dahs pee-KAHN-tehs) - foods is plural!',
				wrongExplanation: 'Remember: las comidas (foods) is plural, so use ME GUSTAN.',
				alternativeQuestion: 'How do you say "I like cold drinks"? (las bebidas frías)',
				alternativeAnswer: 'me gustan las bebidas frias',
				alternativeCorrectExplanation: 'Excellent! "Me gustan las bebidas frías" (meh GOOS-tahn lahs beh-BEE-dahs FREE-ahs) - drinks is plural!',
				alternativeWrongExplanation: 'Remember: las bebidas (drinks) is plural, so use ME GUSTAN.'
			},
			{
				type: 'practice',
				questionNumber: 7,
				inputType: 'typed',
				title: 'Type the Answer',
				question: 'How do you say "I don\'t like hot weather"? (el clima caliente)',
				correctAnswer: 'no me gusta el clima caliente',
				correctExplanation: 'Great job! "No me gusta el clima caliente" (noh meh GOOS-tah ehl KLEE-mah kah-lee-EHN-teh) - perfect use of NO!',
				wrongExplanation: 'Remember: add NO before ME GUSTA to say you don\'t like something.',
				alternativeQuestion: 'How do you say "I don\'t like crowded places"? (los lugares llenos)',
				alternativeAnswer: 'no me gustan los lugares llenos',
				alternativeCorrectExplanation: 'Perfect! "No me gustan los lugares llenos" (noh meh GOOS-tahn lohs loo-GAH-rehs YEH-nohs) - perfect use of NO!',
				alternativeWrongExplanation: 'Remember: add NO before ME GUSTAN to say you don\'t like something.'
			},
			{
				type: 'practice',
				questionNumber: 8,
				inputType: 'typed',
				title: 'Type the Answer',
				question: 'How do you say "My friend likes coffee and tea"? (mi amigo, el café, el té)',
				correctAnswer: 'a mi amigo le gusta el cafe y el te',
				correctExplanation: 'Perfect! "A mi amigo le gusta el café y el té" (ah mee ah-MEE-goh leh GOOS-tah ehl kah-FEH ee ehl teh) - using Y (and) perfectly!',
				wrongExplanation: 'Remember: A + person + LE GUSTA, and connect with Y.',
				alternativeQuestion: 'How do you say "My sister likes dogs and cats"? (mi hermana, los perros, los gatos)',
				alternativeAnswer: 'a mi hermana le gustan los perros y los gatos',
				alternativeCorrectExplanation: 'Perfect! "A mi hermana le gustan los perros y los gatos" (ah mee er-MAH-nah leh GOOS-tahn lohs PEH-rrohs ee lohs GAH-tohs) - using A + person + LE GUSTAN with Y!',
				alternativeWrongExplanation: 'Remember: A + person + LE GUSTAN, and connect with Y.'
			},
			// Application Questions (9-10)
			{
				type: 'practice',
				questionNumber: 9,
				inputType: 'application',
				title: 'Real World Application',
				question: 'At a restaurant, say "I like fish but I don\'t like vegetables" (el pescado, las verduras)',
				correctAnswer: 'me gusta el pescado pero no me gustan las verduras',
				correctExplanation: 'Excellent! "Me gusta el pescado pero no me gustan las verduras" (meh GOOS-tah ehl pes-KAH-doh PEH-roh noh meh GOOS-tahn lahs ver-DOO-rahs) - perfect use of PERO (but)!',
				wrongExplanation: 'Remember: fish is singular (me gusta), vegetables are plural (me gustan), connect with PERO.',
				alternativeQuestion: 'Say "I like wine but I don\'t like beer" (el vino, la cerveza)',
				alternativeAnswer: 'me gusta el vino pero no me gusta la cerveza',
				alternativeCorrectExplanation: 'Perfect! "Me gusta el vino pero no me gusta la cerveza" (meh GOOS-tah ehl VEE-noh PEH-roh noh meh GOOS-tah lah ser-VEH-sah) - excellent use of PERO (but)!',
				alternativeWrongExplanation: 'Remember: wine is singular (me gusta), beer is singular (me gusta), connect with PERO.'
			},
			{
				type: 'practice',
				questionNumber: 10,
				inputType: 'application',
				title: 'Real World Application',
				question: 'Tell someone "Do you like Mexican food or Italian food?" (te gusta, la comida mexicana, la comida italiana)',
				correctAnswer: 'te gusta la comida mexicana o la comida italiana',
				correctExplanation: 'Perfect! "¿Te gusta la comida mexicana o la comida italiana?" (teh GOOS-tah lah koh-MEE-dah meh-hee-KAH-nah oh lah koh-MEE-dah ee-tah-lee-AH-nah) - great question with O (or)!',
				wrongExplanation: 'Remember: ¿TE GUSTA + food + O + food?',
				alternativeQuestion: 'Ask "Do you like coffee or tea in the morning?" (el café, el té, por la mañana)',
				alternativeAnswer: 'te gusta el cafe o el te por la mañana',
				alternativeCorrectExplanation: 'Excellent! "¿Te gusta el café o el té por la mañana?" (teh GOOS-tah ehl kah-FEH oh ehl teh por lah mah-NYAH-nah) - great question with O (or)!',
				alternativeWrongExplanation: 'Remember: ¿TE GUSTA + singular + O + singular?'
			},
			{
				type: 'completion',
				title: 'Lesson Complete! 🎉',
				content: 'You\'ve mastered expressing likes and dislikes! Now you can talk about food preferences, activities, and connect with others.',
				mastered: [
					'ME GUSTA for singular things (one item)',
					'ME GUSTAN for plural things (multiple items)',
					'NO ME GUSTA/GUSTAN for dislikes',
					'TE GUSTA/LE GUSTA for talking about others\' preferences',
					'Combining preferences with Y (and), O (or), and PERO (but)'
				],
				nextLesson: 'Congratulations! You\'ve completed all Phase 2 grammar lessons. Ready for Phase 3?'
			}
		]
	};
	
	onMount(() => {
		// Analytics: Track lesson start
		gtag('event', 'lesson_started', {
			'lesson_type': 'spanish_lesson_6',
			'lesson_title': 'Me Gusta vs Me Gustan',
			'lesson_category': 'grammar'
		});

		const handleKeydown = (e: KeyboardEvent) => {
			if (e.key === 'Enter') {
				const isCorrect = (currentStepData.inputType === 'multiple' && selectedAnswer === currentStepData.correct?.toString()) || (currentStepData.inputType !== 'multiple' && checkTypedAnswer());
				const canContinue = showFeedback && (isCorrect || wrongAttempts >= 2);
				
				if (canContinue && currentStepData.type === 'practice') {
					nextStep();
				} else if (currentStepData.type === 'teaching') {
					nextStep();
				}
			}
		};
		
		window.addEventListener('keydown', handleKeydown);
		return () => window.removeEventListener('keydown', handleKeydown);
	});

	function nextStep() {
		if (currentStep < lesson6Content.steps.length - 1) {
			currentStep++;
			selectedAnswer = '';
			typedAnswer = '';
			showFeedback = false;
			showHint = false;
			wrongAttempts = 0;
			showAlternativeButton = false;
		}
	}
	
	function selectAnswer(index: number) {
		selectedAnswer = index.toString();
		showFeedback = true;
		
		// If correct answer, show celebration
		if (index === currentStepData.correct) {
			showCelebrationMessage();
		} else {
			// If wrong answer, show button for alternative question
			wrongAttempts++;
			if (wrongAttempts === 1 && currentStepData.alternativeQuestion) {
				showAlternativeButton = true;
			}
		}
	}
	
	function showCelebrationMessage() {
		const messages = ['¡Perfecto! 🎉', '¡Excelente! ⭐', '¡Muy bien! 👏', '¡Fantástico! 🌟', '¡Increíble! 🚀', '¡Genial! ✨'];
		celebrationMessage = messages[Math.floor(Math.random() * messages.length)];
		showCelebration = true;
		setTimeout(() => {
			showCelebration = false;
		}, 2000);
	}
	
	function tryAlternativeQuestion() {
		// Switch to alternative question
		currentStepData.question = currentStepData.alternativeQuestion;
		currentStepData.options = currentStepData.alternativeOptions;
		currentStepData.correct = currentStepData.alternativeCorrect;
		currentStepData.correctExplanation = currentStepData.alternativeCorrectExplanation;
		currentStepData.wrongExplanation = currentStepData.alternativeWrongExplanation;
		selectedAnswer = '';
		showFeedback = false;
		showAlternativeButton = false;
	}
	
	function checkTypedAnswer() {
		const correct = wrongAttempts === 0 ? 
			currentStepData.correctAnswer?.toLowerCase().trim() : 
			currentStepData.alternativeAnswer?.toLowerCase().trim();
		const userAnswer = typedAnswer.toLowerCase().trim();
		
		// Check if the answer is correct (remove accents for comparison)
		const normalizeText = (text: string) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
		return normalizeText(userAnswer) === normalizeText(correct || '');
	}
	
	function submitTypedAnswer() {
		showFeedback = true;
		
		// If correct answer, show celebration
		if (checkTypedAnswer()) {
			showCelebrationMessage();
		} else {
			// If wrong answer, show button for alternative question
			wrongAttempts++;
			if (wrongAttempts === 1 && currentStepData.alternativeQuestion) {
				showAlternativeButton = true;
			}
		}
	}
	
	function tryAlternativeTypedQuestion() {
		// Switch to alternative question  
		currentStepData.question = currentStepData.alternativeQuestion;
		currentStepData.correctAnswer = currentStepData.alternativeAnswer;
		currentStepData.correctExplanation = currentStepData.alternativeCorrectExplanation;
		currentStepData.wrongExplanation = currentStepData.alternativeWrongExplanation;
		typedAnswer = '';
		showFeedback = false;
		showAlternativeButton = false;
	}
	
	function toggleHint() {
		showHint = !showHint;
	}
	
	function completeLesson() {
		// Analytics: Track lesson completion
		gtag('event', 'lesson_completed', {
			'lesson_type': 'spanish_lesson_6',
			'lesson_title': 'Me Gusta vs Me Gustan',
			'lesson_category': 'grammar'
		});

		// Save lesson completion to localStorage
		const lessonScores = JSON.parse(localStorage.getItem('lessonScores') || '{}');
		lessonScores['spanish-6'] = { 
			score: '10/10', 
			percentage: 100,
			type: 'grammar',
			title: 'Me Gusta/Gustan'
		};
		localStorage.setItem('lessonScores', JSON.stringify(lessonScores));

		goto('/dashboard');
	}
	
	$: currentStepData = lesson6Content.steps[currentStep];
</script>

<svelte:head>
	<title>Lesson 6: {lesson6Content.title} - LangLearner</title>
	<meta name="description" content="Learn to express likes and dislikes with me gusta and me gustan" />
</svelte:head>

<div class="min-h-screen bg-gray-50">
	<div class="container mx-auto px-4 py-8">
		<div class="max-w-2xl mx-auto">
			<!-- Progress Bar -->
			<div class="mb-8">
				<div class="flex justify-between items-center mb-2">
					<span class="text-sm text-gray-600">Lesson 6: {lesson6Content.title}</span>
					<span class="text-sm text-gray-600">{currentStep + 1} of {lesson6Content.steps.length}</span>
				</div>
				<div class="bg-gray-200 rounded-full h-2">
					<div class="bg-blue-600 h-2 rounded-full transition-all duration-300" style="width: {((currentStep + 1) / lesson6Content.steps.length) * 100}%"></div>
				</div>
			</div>
			
			<!-- Celebration Pop-up -->
			{#if showCelebration}
				<div class="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white px-8 py-4 rounded-full shadow-lg animate-bounce">
					<div class="text-xl font-bold text-center">{celebrationMessage}</div>
				</div>
			{/if}

			<!-- Lesson Content -->
			<div class="bg-white p-8 rounded-lg shadow-lg relative overflow-hidden">
				<!-- Progress celebration effects -->
				{#if currentStep >= 3}
					<div class="absolute top-0 right-0 text-6xl opacity-10 pointer-events-none">💝</div>
				{/if}
				{#if currentStep >= 6}
					<div class="absolute bottom-0 left-0 text-6xl opacity-10 pointer-events-none">🍽️</div>
				{/if}
				{#if currentStepData.type === 'teaching'}
					<h1 class="text-3xl font-bold text-gray-900 mb-6">{currentStepData.title}</h1>
					<p class="text-lg text-gray-700 mb-8">{currentStepData.content}</p>
					
					<!-- Examples -->
					<div class="bg-blue-50 p-6 rounded-lg mb-6">
						<h3 class="text-xl font-semibold text-blue-900 mb-4">How to Express Likes:</h3>
						<div class="space-y-4">
							{#each currentStepData.examples || [] as example}
								<div class="bg-white p-4 rounded-lg border-l-4 {example.type === 'singular' ? 'border-green-400' : example.type === 'plural' ? 'border-purple-400' : example.type === 'singular' ? 'border-red-400' : 'border-blue-400'}">
									<div class="flex items-center justify-between mb-2">
										<span class="text-xl font-bold {example.type === 'singular' ? 'text-green-600' : example.type === 'plural' ? 'text-purple-600' : 'text-blue-600'}">{example.spanish}</span>
										<span class="text-sm {example.type === 'singular' ? 'bg-green-100 text-green-800' : example.type === 'plural' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'} px-2 py-1 rounded">{example.type.toUpperCase()}</span>
									</div>
									<div class="text-blue-800 mb-1">{example.english}</div>
									<div class="text-sm text-gray-600 mb-2">Pronunciation: {example.pronunciation}</div>
									<div class="text-sm {example.type === 'singular' ? 'text-green-700' : example.type === 'plural' ? 'text-purple-700' : 'text-blue-700'} font-medium">{example.explanation}</div>
								</div>
							{/each}
						</div>
					</div>
					
					<!-- Rule -->
					<div class="bg-green-50 border-l-4 border-green-400 p-4">
						<p class="text-green-800 font-semibold">📝 Rule: {currentStepData.rule}</p>
					</div>
				{:else if currentStepData.type === 'practice'}
					<div class="flex justify-between items-center mb-4">
						<span class="text-sm text-blue-600 font-medium">Question {currentStepData.questionNumber} of 10</span>
						<button 
							on:click={toggleHint}
							class="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-lg transition-colors"
						>
							💡 Hint
						</button>
					</div>
					<h2 class="text-2xl font-bold text-gray-900 mb-6">{currentStepData.title}</h2>
					<p class="text-lg text-gray-700 mb-6">{currentStepData.question}</p>
					
					<!-- Hint Panel -->
					{#if showHint}
						<div class="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-6">
							<h3 class="font-semibold text-yellow-800 mb-3">💡 Gusta vs Gustan Guide:</h3>
							<div class="grid grid-cols-2 gap-4 text-sm">
								<div class="bg-green-100 p-3 rounded">
									<h4 class="font-semibold text-green-700 mb-2">Use GUSTA (singular)</h4>
									<div class="space-y-1 text-xs">
										<div>• <strong>One thing:</strong> la comida, el café</div>
										<div>• <strong>Me gusta</strong> = I like</div>
										<div>• <strong>Te gusta</strong> = You like</div>
										<div>• <strong>Le gusta</strong> = He/She likes</div>
									</div>
								</div>
								<div class="bg-purple-100 p-3 rounded">
									<h4 class="font-semibold text-purple-700 mb-2">Use GUSTAN (plural)</h4>
									<div class="space-y-1 text-xs">
										<div>• <strong>Multiple things:</strong> los tacos, las frutas</div>
										<div>• <strong>Me gustan</strong> = I like</div>
										<div>• <strong>Te gustan</strong> = You like</div>
										<div>• <strong>Le gustan</strong> = He/She likes</div>
									</div>
								</div>
							</div>
							<div class="mt-3 space-y-2">
								<div class="p-2 bg-blue-100 rounded text-xs">
									<strong>Don't like?</strong> Add NO before: No me gusta, No me gustan
								</div>
								<div class="p-2 bg-purple-100 rounded text-xs">
									<strong>Talking about others:</strong> A + person + LE GUSTA/GUSTAN (A mi amigo le gusta...)
								</div>
							</div>
						</div>
					{/if}
					
					{#if currentStepData.inputType === 'multiple'}
						<!-- Multiple Choice -->
						<div class="space-y-3 mb-6">
							{#each currentStepData.options || [] as option, index}
								<button
									class="w-full p-4 text-left border-2 rounded-lg transition-all {selectedAnswer === index.toString() ? (index === currentStepData.correct ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50') : 'border-gray-200 hover:border-blue-300'}"
									on:click={() => selectAnswer(index)}
									disabled={showFeedback}
								>
									{option}
								</button>
							{/each}
						</div>
					{:else if currentStepData.inputType === 'typed' || currentStepData.inputType === 'application'}
						<!-- Text Input -->
						<div class="mb-6">
							<input
								type="text"
								bind:value={typedAnswer}
								placeholder="Type your answer here..."
								class="w-full p-4 text-lg border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
								disabled={showFeedback}
								on:keydown={(e) => e.key === 'Enter' && !showFeedback && submitTypedAnswer()}
							/>
							{#if !showFeedback}
								<div class="mt-3">
									<button
										on:click={submitTypedAnswer}
										class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
										disabled={!typedAnswer.trim()}
									>
										Check Answer
									</button>
								</div>
							{/if}
						</div>
					{/if}
					
					{#if showFeedback}
						{@const isCorrect = (currentStepData.inputType === 'multiple' && selectedAnswer === currentStepData.correct?.toString()) || (currentStepData.inputType !== 'multiple' && checkTypedAnswer())}
						<div class="{isCorrect ? 'bg-green-50 border-green-400 text-green-700' : 'bg-red-50 border-red-400 text-red-700'} border px-4 py-3 rounded">
							{isCorrect ? currentStepData.correctExplanation : currentStepData.wrongExplanation}
							{#if currentStepData.inputType !== 'multiple' && !checkTypedAnswer() && wrongAttempts === 0}
								<br/><strong>Correct answer:</strong> {currentStepData.correctAnswer}
							{:else if currentStepData.inputType !== 'multiple' && !checkTypedAnswer() && wrongAttempts > 0}
								<br/><strong>Correct answer:</strong> {currentStepData.alternativeAnswer}
							{/if}
						</div>
					{/if}
					
					{#if showAlternativeButton}
						<div class="mt-4 text-center">
							<button 
								on:click={currentStepData.inputType === 'multiple' ? tryAlternativeQuestion : tryAlternativeTypedQuestion}
								class="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
							>
								Try Extra Question
							</button>
						</div>
					{/if}
				{:else if currentStepData.type === 'completion'}
					<div class="text-center">
						<h1 class="text-3xl font-bold text-gray-900 mb-4">{currentStepData.title}</h1>
						<p class="text-lg text-gray-700 mb-8">{currentStepData.content}</p>
						
						<div class="bg-green-50 p-6 rounded-lg mb-8">
							<h3 class="font-semibold text-green-900 mb-4">Skills mastered:</h3>
							<div class="space-y-2">
								{#each currentStepData.mastered || [] as skill}
									<div class="flex items-center justify-center text-green-800">
										<span class="mr-2">✓</span>
										{skill}
									</div>
								{/each}
							</div>
						</div>
						
						<div class="bg-blue-50 p-4 rounded-lg mb-8">
							<p class="text-blue-800">{currentStepData.nextLesson}</p>
						</div>
						
						<button 
							on:click={completeLesson}
							class="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
						>
							Complete Lesson & Return to Dashboard
						</button>
					</div>
				{/if}
				
				<!-- Navigation -->
				{#if currentStepData.type !== 'completion'}
					<div class="flex justify-between items-center mt-8">
						<a href="/dashboard" class="text-blue-600 hover:text-blue-700 font-medium">
							← Back to Dashboard
						</a>
						
						{#if currentStepData.type === 'practice'}
							{@const isCorrect = (currentStepData.inputType === 'multiple' && selectedAnswer === currentStepData.correct?.toString()) || (currentStepData.inputType !== 'multiple' && checkTypedAnswer())}
							{@const canContinue = showFeedback && (isCorrect || wrongAttempts >= 2)}
							<button 
								on:click={nextStep}
								class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
								disabled={!canContinue}
							>
								{currentStep === lesson6Content.steps.length - 2 ? 'Complete Lesson' : 'Continue'}
							</button>
						{:else}
							<button 
								on:click={nextStep}
								class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
							>
								Continue
							</button>
						{/if}
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>
