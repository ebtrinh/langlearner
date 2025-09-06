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
	
	// Lesson 2: Verb Conjugations
	const lesson2Content = {
		title: 'Verb Conjugations: -ar, -er, -ir',
		steps: [
			{
				type: 'teaching',
				title: 'Verbs for Different People',
				content: 'Verbs in Spanish use different sounds at the ends to dictate who the subject is. Verbs naturally start out as their infinitive: "to eat" is comer, "to speak" is hablar, etc. When we want to say that different people are doing something, we change the endings in specific patterns.',
				examples: [
					{ 
						infinitive: 'hablar (to speak)', 
						conjugations: [
							{ subject: 'yo', form: 'hablo', translation: 'I speak' },
							{ subject: 'tú', form: 'hablas', translation: 'you speak' },
							{ subject: 'él/ella', form: 'habla', translation: 'he/she speaks' }
						]
					},
					{ 
						infinitive: 'comer (to eat)', 
						conjugations: [
							{ subject: 'yo', form: 'como', translation: 'I eat' },
							{ subject: 'tú', form: 'comes', translation: 'you eat' },
							{ subject: 'él/ella', form: 'come', translation: 'he/she eats' }
						]
					}
				],
				rule: 'Each person has their own special ending!'
			},
			// Multiple Choice Questions (1-4)
			{
				type: 'practice',
				questionNumber: 1,
				inputType: 'multiple',
				title: 'Multiple Choice Practice',
				question: 'What is the tú (you) form of "hablar"?',
				options: ['hablo', 'hablas', 'habla'],
				correct: 1,
				correctExplanation: 'Correct! "Hablas" means "you speak".',
				wrongExplanation: 'Not quite. For tú with -ar verbs, use -as ending.',
				alternativeQuestion: 'What is the tú form of "estudiar" (to study)?',
				alternativeOptions: ['estudia', 'estudias', 'estudio'],
				alternativeCorrect: 1
			},
			{
				type: 'practice',
				questionNumber: 2,
				inputType: 'multiple',
				title: 'Multiple Choice Practice',
				question: 'What is the él/ella (he/she) form of "comer"?',
				options: ['como', 'comes', 'come'],
				correct: 2,
				correctExplanation: 'Perfect! "Come" means "he/she eats".',
				wrongExplanation: 'Not quite. For él/ella with -er verbs, use -e ending.',
				alternativeQuestion: 'What is the él/ella form of "beber" (to drink)?',
				alternativeOptions: ['bebo', 'bebes', 'bebe'],
				alternativeCorrect: 2
			},
			{
				type: 'practice',
				questionNumber: 3,
				inputType: 'multiple',
				title: 'Multiple Choice Practice',
				question: 'What is the nosotros (we) form of "vivir"?',
				options: ['vivo', 'viven', 'vivimos'],
				correct: 2,
				correctExplanation: 'Excellent! "Vivimos" means "we live".',
				wrongExplanation: 'Not quite. For nosotros with -ir verbs, use -imos ending.',
				alternativeQuestion: 'What is the nosotros form of "escribir" (to write)?',
				alternativeOptions: ['escribimos', 'escriben', 'escribo'],
				alternativeCorrect: 0
			},
			{
				type: 'practice',
				questionNumber: 4,
				inputType: 'multiple',
				title: 'Multiple Choice Practice',
				question: 'What is the ellos/ellas (they) form of "caminar"?',
				options: ['camina', 'caminan', 'camino'],
				correct: 1,
				correctExplanation: 'Great! "Caminan" means "they walk".',
				wrongExplanation: 'Not quite. For ellos/ellas with -ar verbs, use -an ending.',
				alternativeQuestion: 'What is the ellos/ellas form of "bailar" (to dance)?',
				alternativeOptions: ['bailan', 'baila', 'bailo'],
				alternativeCorrect: 0
			},
			// Typed Questions (5-8)
			{
				type: 'practice',
				questionNumber: 5,
				inputType: 'typed',
				title: 'Type the Answer',
				question: 'What is the tú form of "trabajar" (to work)?',
				correctAnswer: 'trabajas',
				correctExplanation: 'Perfect! "Trabajas" means "you work".',
				wrongExplanation: 'Remember: tú + -ar verbs = -as ending',
				alternativeQuestion: 'What is the tú form of "cantar" (to sing)?',
				alternativeAnswer: 'cantas'
			},
			{
				type: 'practice',
				questionNumber: 6,
				inputType: 'typed',
				title: 'Type the Answer',
				question: 'What is the nosotros form of "correr" (to run)?',
				correctAnswer: 'corremos',
				correctExplanation: 'Excellent! "Corremos" means "we run".',
				wrongExplanation: 'Remember: nosotros + -er verbs = -emos ending',
				alternativeQuestion: 'What is the nosotros form of "leer" (to read)?',
				alternativeAnswer: 'leemos'
			},
			{
				type: 'practice',
				questionNumber: 7,
				inputType: 'typed',
				title: 'Type the Answer',
				question: 'What is the él/ella form of "abrir" (to open)?',
				correctAnswer: 'abre',
				correctExplanation: 'Great job! "Abre" means "he/she opens".',
				wrongExplanation: 'Remember: él/ella + -ir verbs = -e ending',
				alternativeQuestion: 'What is the él/ella form of "subir" (to go up)?',
				alternativeAnswer: 'sube'
			},
			{
				type: 'practice',
				questionNumber: 8,
				inputType: 'typed',
				title: 'Type the Answer',
				question: 'What is the ellos/ellas form of "decidir" (to decide)?',
				correctAnswer: 'deciden',
				correctExplanation: 'Perfect! "Deciden" means "they decide".',
				wrongExplanation: 'Remember: ellos/ellas + -ir verbs = -en ending',
				alternativeQuestion: 'What is the ellos/ellas form of "partir" (to leave)?',
				alternativeAnswer: 'parten'
			},
			// Application Questions (9-10)
			{
				type: 'practice',
				questionNumber: 9,
				inputType: 'application',
				title: 'Real World Application',
				question: 'How do you say "You speak Spanish"? (hablar = to speak, español = Spanish)',
				correctAnswer: 'hablas español',
				correctExplanation: 'Excellent! "Hablas español" - perfect for conversations!',
				wrongExplanation: 'Remember: use tú form "hablas" + español',
				alternativeQuestion: 'How do you say "We eat pizza"? (comer = to eat, pizza = pizza)',
				alternativeAnswer: 'comemos pizza'
			},
			{
				type: 'practice',
				questionNumber: 10,
				inputType: 'application',
				title: 'Real World Application',
				question: 'How do you say "They live in Mexico"? (vivir = to live, en = in, Mexico = Mexico)',
				correctAnswer: 'viven en mexico',
				correctExplanation: 'Perfect! "Viven en México" - great for talking about people!',
				wrongExplanation: 'Remember: use ellos/ellas form "viven" + en México',
				alternativeQuestion: 'How do you say "She writes letters"? (escribir = to write, cartas = letters)',
				alternativeAnswer: 'escribe cartas'
			},
			{
				type: 'completion',
				title: 'Lesson Complete! 🎉',
				content: 'You\'ve mastered verb conjugations for all the main subjects! Now you can talk about what different people do.',
				mastered: [
					'All subject pronouns (yo, tú, él/ella, nosotros, ellos/ellas)',
					'-ar verb patterns for all subjects',
					'-er verb patterns for all subjects', 
					'-ir verb patterns for all subjects'
				],
				nextLesson: 'Next: Learn essential travel verbs and how to use them in real situations'
			}
		]
	};
	
	onMount(() => {
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
		if (currentStep < lesson2Content.steps.length - 1) {
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
		
		// If wrong answer, show button for alternative question
		if (index !== currentStepData.correct) {
			wrongAttempts++;
			if (wrongAttempts === 1 && currentStepData.alternativeQuestion) {
				showAlternativeButton = true;
			}
		}
	}
	
	function tryAlternativeQuestion() {
		// Switch to alternative question
		currentStepData.question = currentStepData.alternativeQuestion;
		currentStepData.options = currentStepData.alternativeOptions;
		currentStepData.correct = currentStepData.alternativeCorrect;
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
		
		// If wrong answer, show button for alternative question
		if (!checkTypedAnswer()) {
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
		typedAnswer = '';
		showFeedback = false;
		showAlternativeButton = false;
	}
	
	function toggleHint() {
		showHint = !showHint;
	}
	
	function completeLesson() {
		// Mark lesson as complete and return to dashboard
		goto('/dashboard');
	}
	
	$: currentStepData = lesson2Content.steps[currentStep];
</script>

<svelte:head>
	<title>Lesson 2: {lesson2Content.title} - LangLearner</title>
	<meta name="description" content="Learn Spanish verb conjugation patterns" />
</svelte:head>

<div class="min-h-screen bg-gray-50">
	<div class="container mx-auto px-4 py-8">
		<div class="max-w-2xl mx-auto">
			<!-- Progress Bar -->
			<div class="mb-8">
				<div class="flex justify-between items-center mb-2">
					<span class="text-sm text-gray-600">Lesson 2: {lesson2Content.title}</span>
					<span class="text-sm text-gray-600">{currentStep + 1} of {lesson2Content.steps.length}</span>
				</div>
				<div class="bg-gray-200 rounded-full h-2">
					<div class="bg-blue-600 h-2 rounded-full transition-all duration-300" style="width: {((currentStep + 1) / lesson2Content.steps.length) * 100}%"></div>
				</div>
			</div>
			
			<!-- Lesson Content -->
			<div class="bg-white p-8 rounded-lg shadow-lg">
				{#if currentStepData.type === 'teaching'}
					<h1 class="text-3xl font-bold text-gray-900 mb-6">{currentStepData.title}</h1>
					<p class="text-lg text-gray-700 mb-8">{currentStepData.content}</p>
					
					<!-- Examples -->
					<div class="bg-blue-50 p-6 rounded-lg mb-6">
						<h3 class="text-xl font-semibold text-blue-900 mb-4">Examples:</h3>
						<div class="space-y-6">
							{#each currentStepData.examples || [] as example}
								<div class="bg-white p-4 rounded-lg">
									<h4 class="text-lg font-medium text-gray-900 mb-3">{example.infinitive}</h4>
									<div class="space-y-2">
										{#each example.conjugations as conj}
											<div class="flex items-center justify-between">
												<span class="text-gray-600">{conj.subject}</span>
												<span class="text-lg font-bold text-blue-600">{conj.form}</span>
												<span class="text-blue-800">{conj.translation}</span>
											</div>
										{/each}
									</div>
								</div>
							{/each}
						</div>
					</div>
					
					<!-- Rule -->
					<div class="bg-green-50 border-l-4 border-green-400 p-4">
						<p class="text-green-800 font-semibold">📝 Rule: {currentStepData.rule}</p>
					</div>
				{:else if currentStepData.type === 'lesson'}
					<h2 class="text-2xl font-bold text-gray-900 mb-6">{currentStepData.title}</h2>
					<p class="text-lg text-gray-700 mb-6">{currentStepData.content}</p>
					
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
							<h3 class="font-semibold text-yellow-800 mb-3">💡 Conjugation Endings:</h3>
							<div class="grid grid-cols-3 gap-4 text-sm">
								<div class="bg-white p-3 rounded">
									<h4 class="font-semibold text-blue-700 mb-2">-ar verbs</h4>
									<div class="space-y-1 text-xs">
										<div>yo: <strong>-o</strong></div>
										<div>tú: <strong>-as</strong></div>
										<div>él/ella: <strong>-a</strong></div>
										<div>nosotros: <strong>-amos</strong></div>
										<div>ellos/ellas: <strong>-an</strong></div>
									</div>
								</div>
								<div class="bg-white p-3 rounded">
									<h4 class="font-semibold text-green-700 mb-2">-er verbs</h4>
									<div class="space-y-1 text-xs">
										<div>yo: <strong>-o</strong></div>
										<div>tú: <strong>-es</strong></div>
										<div>él/ella: <strong>-e</strong></div>
										<div>nosotros: <strong>-emos</strong></div>
										<div>ellos/ellas: <strong>-en</strong></div>
									</div>
								</div>
								<div class="bg-white p-3 rounded">
									<h4 class="font-semibold text-purple-700 mb-2">-ir verbs</h4>
									<div class="space-y-1 text-xs">
										<div>yo: <strong>-o</strong></div>
										<div>tú: <strong>-es</strong></div>
										<div>él/ella: <strong>-e</strong></div>
										<div>nosotros: <strong>-imos</strong></div>
										<div>ellos/ellas: <strong>-en</strong></div>
									</div>
								</div>
							</div>
							<div class="mt-3 p-2 bg-blue-100 rounded text-xs">
								<strong>Pattern:</strong> Remove the infinitive ending (-ar/-er/-ir), then add the correct ending for the subject
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
								{currentStep === lesson2Content.steps.length - 2 ? 'Complete Lesson' : 'Continue'}
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
