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
	
	// Lesson 5: Questions - Where, Can, When
	const lesson5Content = {
		title: 'Asking Questions: Where, Can, When',
		steps: [
			{
				type: 'teaching',
				title: 'Essential Question Words',
				content: 'Questions are crucial for travelers! Let\'s learn the most important question words and how to use them with the verbs we already know.',
				examples: [
					{ 
						question: '¿Dónde?',
						english: 'Where?',
						pronunciation: 'DOHN-deh',
						example: '¿Dónde está el hotel?',
						exampleEnglish: 'Where is the hotel?',
						note: 'Use with ESTÁ for location'
					},
					{ 
						question: '¿Cuándo?',
						english: 'When?',
						pronunciation: 'KWAN-doh',
						example: '¿Cuándo llega el tren?',
						exampleEnglish: 'When does the train arrive?',
						note: 'Use with any verb for timing'
					},
					{ 
						question: '¿Puedes...?',
						english: 'Can you...?',
						pronunciation: 'PWEH-dehs',
						example: '¿Puedes ayudarme?',
						exampleEnglish: 'Can you help me?',
						note: 'Polite way to ask for help (tú form)'
					},
					{ 
						question: '¿Puedo...?',
						english: 'Can I...?',
						pronunciation: 'PWEH-doh',
						example: '¿Puedo pagar con tarjeta?',
						exampleEnglish: 'Can I pay with card?',
						note: 'Ask for permission'
					}
				],
				rule: 'Questions in Spanish often start with ¿ and end with ? - don\'t forget the upside-down question mark!'
			},
			// Multiple Choice Questions (1-4)
			{
				type: 'practice',
				questionNumber: 1,
				inputType: 'multiple',
				title: 'Multiple Choice Practice',
				question: 'How do you ask "Where is the bathroom?"',
				options: ['¿Cuándo está el baño?', '¿Dónde está el baño?', '¿Puede está el baño?'],
				correct: 1,
				correctExplanation: 'Correct! "¿Dónde está el baño?" (DOHN-deh es-TAH ehl BAH-nyoh) - use DÓNDE for location.',
				wrongExplanation: 'For location questions, use ¿Dónde está...?',
				alternativeQuestion: 'How do you ask "Where is the restaurant?"',
				alternativeOptions: ['¿Dónde está el restaurante?', '¿Cuándo está el restaurante?', '¿Puedes está el restaurante?'],
				alternativeCorrect: 0,
				alternativeCorrectExplanation: 'Perfect! "¿Dónde está el restaurante?" (DOHN-deh es-TAH ehl res-tow-RAHN-teh) - use DÓNDE for location.',
				alternativeWrongExplanation: 'For location questions, use ¿Dónde está...?'
			},
			{
				type: 'practice',
				questionNumber: 2,
				inputType: 'multiple',
				title: 'Multiple Choice Practice',
				question: 'How do you ask "When does the bus arrive?"',
				options: ['¿Dónde llega el autobús?', '¿Cuándo llega el autobús?', '¿Puede llega el autobús?'],
				correct: 1,
				correctExplanation: 'Perfect! "¿Cuándo llega el autobús?" (KWAN-doh YEH-gah ehl ow-toh-BOOS) - use CUÁNDO for time.',
				wrongExplanation: 'For time questions, use ¿Cuándo...?',
				alternativeQuestion: 'How do you ask "When do they open?"',
				alternativeOptions: ['¿Cuándo abren?', '¿Dónde abren?', '¿Puedes abren?'],
				alternativeCorrect: 0,
				alternativeCorrectExplanation: 'Excellent! "¿Cuándo abren?" (KWAN-doh AH-brehn) - use CUÁNDO for time.',
				alternativeWrongExplanation: 'For time questions, use ¿Cuándo...?'
			},
			{
				type: 'practice',
				questionNumber: 3,
				inputType: 'multiple',
				title: 'Multiple Choice Practice',
				question: 'How do you ask "Can you help me?"',
				options: ['¿Dónde ayudarme?', '¿Cuándo ayudarme?', '¿Puedes ayudarme?'],
				correct: 2,
				correctExplanation: 'Excellent! "¿Puedes ayudarme?" (PWEH-dehs ah-yoo-DAHR-meh) - very polite and useful!',
				wrongExplanation: 'To ask for help politely, use ¿Puedes ayudarme?',
				alternativeQuestion: 'How do you ask "Can you speak English?"',
				alternativeOptions: ['¿Puedes hablar inglés?', '¿Dónde hablar inglés?', '¿Cuándo hablar inglés?'],
				alternativeCorrect: 0,
				alternativeCorrectExplanation: 'Great! "¿Puedes hablar inglés?" (PWEH-dehs ah-BLAHR een-GLAYS) - very useful question!',
				alternativeWrongExplanation: 'To ask for help politely, use ¿Puedes...?'
			},
			{
				type: 'practice',
				questionNumber: 4,
				inputType: 'multiple',
				title: 'Multiple Choice Practice',
				question: 'How do you ask "Can I pay with card?"',
				options: ['¿Puedo pagar con tarjeta?', '¿Puede pagar con tarjeta?', '¿Dónde pagar con tarjeta?'],
				correct: 0,
				correctExplanation: 'Great! "¿Puedo pagar con tarjeta?" (PWEH-doh pah-GAHR kohn tar-HEH-tah) - asking for permission.',
				wrongExplanation: 'To ask for permission (Can I...?), use ¿Puedo...?',
				alternativeQuestion: 'How do you ask "Can I sit here?"',
				alternativeOptions: ['¿Puedo sentarme aquí?', '¿Puedes sentarme aquí?', '¿Dónde sentarme aquí?'],
				alternativeCorrect: 0,
				alternativeCorrectExplanation: 'Perfect! "¿Puedo sentarme aquí?" (PWEH-doh sen-TAHR-meh ah-KEE) - asking for permission.',
				alternativeWrongExplanation: 'To ask for permission (Can I...?), use ¿Puedo...?'
			},
			// Typed Questions (5-8)
			{
				type: 'practice',
				questionNumber: 5,
				inputType: 'typed',
				title: 'Type the Answer',
				question: 'How do you ask "Where is the hospital?" (hospital = hospital)',
				correctAnswer: 'donde esta el hospital',
				correctExplanation: 'Perfect! "¿Dónde está el hospital?" (DOHN-deh es-TAH ehl ohs-pee-TAHL) - essential for emergencies!',
				wrongExplanation: 'Remember: ¿Dónde está + location',
				alternativeQuestion: 'How do you ask "Where is the pharmacy?" (farmacia = pharmacy)',
				alternativeAnswer: 'donde esta la farmacia',
				alternativeCorrectExplanation: 'Excellent! "¿Dónde está la farmacia?" (DOHN-deh es-TAH lah far-MAH-see-ah) - essential for emergencies!',
				alternativeWrongExplanation: 'Remember: ¿Dónde está + location'
			},
			{
				type: 'practice',
				questionNumber: 6,
				inputType: 'typed',
				title: 'Type the Answer',
				question: 'How do you ask "When do you close?" (cerrar = to close, using ustedes form "cierran")',
				correctAnswer: 'cuando cierran',
				correctExplanation: 'Excellent! "¿Cuándo cierran?" (KWAN-doh see-EH-rahn) - useful for stores and restaurants!',
				wrongExplanation: 'Remember: ¿Cuándo + conjugated verb',
				alternativeQuestion: 'How do you ask "When do you open?" (abrir = to open, using ustedes form "abren")',
				alternativeAnswer: 'cuando abren',
				alternativeCorrectExplanation: 'Perfect! "¿Cuándo abren?" (KWAN-doh AH-brehn) - useful for stores and restaurants!',
				alternativeWrongExplanation: 'Remember: ¿Cuándo + conjugated verb'
			},
			{
				type: 'practice',
				questionNumber: 7,
				inputType: 'typed',
				title: 'Type the Answer',
				question: 'How do you ask "Can you recommend a restaurant?" (recomendar = to recommend)',
				correctAnswer: 'puedes recomendar un restaurante',
				correctExplanation: 'Great job! "¿Puedes recomendar un restaurante?" (PWEH-dehs reh-koh-men-DAHR oon res-tow-RAHN-teh) - perfect for getting local tips!',
				wrongExplanation: 'Remember: ¿Puedes + infinitive verb',
				alternativeQuestion: 'How do you ask "Can you call a taxi?" (llamar = to call)',
				alternativeAnswer: 'puedes llamar un taxi',
				alternativeCorrectExplanation: 'Great job! "¿Puedes llamar un taxi?" (PWEH-dehs yah-MAHR oon TAHK-see) - perfect for getting around!',
				alternativeWrongExplanation: 'Remember: ¿Puedes + infinitive verb'
			},
			{
				type: 'practice',
				questionNumber: 8,
				inputType: 'typed',
				title: 'Type the Answer',
				question: 'How do you ask "Can I use the WiFi?" (usar = to use)',
				correctAnswer: 'puedo usar el wifi',
				correctExplanation: 'Perfect! "¿Puedo usar el WiFi?" (PWEH-doh oo-SAHR ehl WEE-fee) - very practical for travelers!',
				wrongExplanation: 'Remember: ¿Puedo + infinitive verb',
				alternativeQuestion: 'How do you ask "Can I take a photo?" (tomar = to take, foto = photo)',
				alternativeAnswer: 'puedo tomar una foto',
				alternativeCorrectExplanation: 'Perfect! "¿Puedo tomar una foto?" (PWEH-doh toh-MAHR OO-nah FOH-toh) - very practical for travelers!',
				alternativeWrongExplanation: 'Remember: ¿Puedo + infinitive verb'
			},
			// Application Questions (9-10)
			{
				type: 'practice',
				questionNumber: 9,
				inputType: 'application',
				title: 'Real World Application',
				question: 'You\'re lost and need directions. Ask "Where is the metro station and when does it close?" (metro = metro, estación = station, cerrar = to close)',
				correctAnswer: 'donde esta la estacion de metro y cuando cierra',
				correctExplanation: 'Excellent! "¿Dónde está la estación de metro y cuándo cierra?" (DOHN-deh es-TAH lah es-tah-see-OHN deh MEH-troh ee KWAN-doh see-EH-rrah) - combining questions with Y!',
				wrongExplanation: 'Remember: ¿Dónde está... y cuándo...?',
				alternativeQuestion: 'Ask "Where is the bank and can I exchange money?" (banco = bank, cambiar = to exchange, dinero = money)',
				alternativeAnswer: 'donde esta el banco y puedo cambiar dinero',
				alternativeCorrectExplanation: 'Excellent! "¿Dónde está el banco y puedo cambiar dinero?" (DOHN-deh es-TAH ehl BAHN-koh ee PWEH-doh kahm-bee-AHR dee-NEH-roh) - combining questions with Y!',
				alternativeWrongExplanation: 'Remember: ¿Dónde está... y puedo...?'
			},
			{
				type: 'practice',
				questionNumber: 10,
				inputType: 'application',
				title: 'Real World Application',
				question: 'At a restaurant, ask "Can you recommend the fish or the chicken, and when do you close?" (recomendar = recommend, pescado = fish, pollo = chicken)',
				correctAnswer: 'puedes recomendar el pescado o el pollo y cuando cierran',
				correctExplanation: 'Perfect! "¿Puedes recomendar el pescado o el pollo, y cuándo cierran?" (PWEH-dehs reh-koh-men-DAHR ehl pes-KAH-doh oh ehl POH-yoh ee KWAN-doh see-EH-rahn) - using O and Y perfectly!',
				wrongExplanation: 'Remember: ¿Puedes recomendar... o ..., y cuándo...?',
				alternativeQuestion: 'Ask "Can I pay with cash or card, and where is the bathroom?" (efectivo = cash, tarjeta = card)',
				alternativeAnswer: 'puedo pagar con efectivo o tarjeta y donde esta el baño',
				alternativeCorrectExplanation: 'Perfect! "¿Puedo pagar con efectivo o tarjeta, y dónde está el baño?" (PWEH-doh pah-GAHR kohn eh-fehk-TEE-voh oh tar-HEH-tah ee DOHN-deh es-TAH ehl BAH-nyoh) - using O and Y perfectly!',
				alternativeWrongExplanation: 'Remember: ¿Puedo... o ..., y dónde está...?'
			},
			{
				type: 'completion',
				title: 'Lesson Complete! 🎉',
				content: 'You\'ve mastered essential question formation! Now you can get information, ask for help, and navigate any situation.',
				mastered: [
					'¿Dónde? for location questions',
					'¿Cuándo? for time questions',
					'¿Puede? for polite requests (Can you...?)',
					'¿Puedo? for asking permission (Can I...?)',
					'Combining questions with Y (and) and O (or)'
				],
				nextLesson: 'Next: Learn "me gusta" and "me gustan" to express what you like and don\'t like'
			}
		]
	};
	
	onMount(() => {
		// Analytics: Track lesson start
		gtag('event', 'lesson_started', {
			'lesson_type': 'spanish_lesson_5',
			'lesson_title': 'Questions: Where, Can, When',
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
		if (currentStep < lesson5Content.steps.length - 1) {
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
			'lesson_type': 'spanish_lesson_5',
			'lesson_title': 'Questions: Where, Can, When',
			'lesson_category': 'grammar'
		});

		// Save lesson completion to localStorage
		const lessonScores = JSON.parse(localStorage.getItem('lessonScores') || '{}');
		lessonScores['spanish-5'] = { 
			score: '10/10', 
			percentage: 100,
			type: 'grammar',
			title: 'Questions'
		};
		localStorage.setItem('lessonScores', JSON.stringify(lessonScores));

		goto('/dashboard');
	}
	
	$: currentStepData = lesson5Content.steps[currentStep];
</script>

<svelte:head>
	<title>Lesson 5: {lesson5Content.title} - LangLearner</title>
	<meta name="description" content="Learn to ask essential questions in Spanish" />
</svelte:head>

<div class="min-h-screen bg-gray-50">
	<div class="container mx-auto px-4 py-8">
		<div class="max-w-2xl mx-auto">
			<!-- Progress Bar -->
			<div class="mb-8">
				<div class="flex justify-between items-center mb-2">
					<span class="text-sm text-gray-600">Lesson 5: {lesson5Content.title}</span>
					<span class="text-sm text-gray-600">{currentStep + 1} of {lesson5Content.steps.length}</span>
				</div>
				<div class="bg-gray-200 rounded-full h-2">
					<div class="bg-blue-600 h-2 rounded-full transition-all duration-300" style="width: {((currentStep + 1) / lesson5Content.steps.length) * 100}%"></div>
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
					<div class="absolute top-0 right-0 text-6xl opacity-10 pointer-events-none">❓</div>
				{/if}
				{#if currentStep >= 6}
					<div class="absolute bottom-0 left-0 text-6xl opacity-10 pointer-events-none">💬</div>
				{/if}
				{#if currentStepData.type === 'teaching'}
					<h1 class="text-3xl font-bold text-gray-900 mb-6">{currentStepData.title}</h1>
					<p class="text-lg text-gray-700 mb-8">{currentStepData.content}</p>
					
					<!-- Examples -->
					<div class="bg-blue-50 p-6 rounded-lg mb-6">
						<h3 class="text-xl font-semibold text-blue-900 mb-4">Essential Question Words:</h3>
						<div class="space-y-4">
							{#each currentStepData.examples || [] as example}
								<div class="bg-white p-4 rounded-lg border-l-4 border-blue-400">
									<div class="flex items-center justify-between mb-2">
										<span class="text-2xl font-bold text-blue-600">{example.question}</span>
										<span class="text-blue-800">{example.english}</span>
									</div>
									<div class="text-sm text-gray-600 mb-2">Pronunciation: {example.pronunciation}</div>
									<div class="text-lg font-medium text-gray-900 mb-1">{example.example}</div>
									<div class="text-gray-700 mb-2">{example.exampleEnglish}</div>
									<div class="text-sm text-blue-700 font-medium">{example.note}</div>
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
							<h3 class="font-semibold text-yellow-800 mb-3">💡 Question Words Quick Guide:</h3>
							<div class="grid grid-cols-2 gap-4 text-sm">
								<div class="bg-white p-3 rounded">
									<h4 class="font-semibold text-blue-700 mb-2">Location & Time</h4>
									<div class="space-y-1 text-xs">
										<div>• <strong>¿Dónde?</strong> = Where?</div>
										<div>• <strong>¿Cuándo?</strong> = When?</div>
										<div>• Use with ESTÁ for location</div>
										<div>• Use with any verb for time</div>
									</div>
								</div>
								<div class="bg-white p-3 rounded">
									<h4 class="font-semibold text-green-700 mb-2">Asking & Permission</h4>
									<div class="space-y-1 text-xs">
										<div>• <strong>¿Puedes?</strong> = Can you...? (tú form)</div>
										<div>• <strong>¿Puedo?</strong> = Can I...?</div>
										<div>• Use + infinitive verb</div>
										<div>• Very polite forms</div>
									</div>
								</div>
							</div>
							<div class="mt-3 p-2 bg-blue-100 rounded text-xs">
								<strong>Remember:</strong> Don't forget ¿ at the beginning and ? at the end!
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
								{currentStep === lesson5Content.steps.length - 2 ? 'Complete Lesson' : 'Continue'}
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
