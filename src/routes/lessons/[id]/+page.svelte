<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	
	let lessonId: number;
	let currentStep = 0;
	let selectedAnswer = '';
	let typedAnswer = '';
	let showFeedback = false;
	let showHint = false;
	let wrongAttempts = 0;
	let showAlternativeButton = false;
	
	$: lessonId = parseInt($page.params.id || '1');
	
	// Lesson 1: Basic "Yo" + Present Tense
	const lesson1Content = {
		title: 'Basic "Yo" + Present Tense',
		steps: [
			{
				type: 'teaching',
				title: 'How Spanish Verbs Work',
				content: 'In Spanish, verbs change their endings to tell us WHO is doing the action. Verbs start out in their infinitive form - like "to eat" or "to speak". When we want to say that I (yo) am doing something, we change the ending to "o".',
				examples: [
					{ infinitive: 'hablar', meaning: 'to speak', conjugated: 'hablo', translation: 'I speak' },
					{ infinitive: 'comer', meaning: 'to eat', conjugated: 'como', translation: 'I eat' },
					{ infinitive: 'vivir', meaning: 'to live', conjugated: 'vivo', translation: 'I live' }
				],
				rule: 'Replace -ar, -er, or -ir with -o to say "I" do something!'
			},
			// Multiple Choice Questions (1-4)
			{
				type: 'practice',
				questionNumber: 1,
				inputType: 'multiple',
				title: 'Multiple Choice Practice',
				question: 'What is the yo form of "hablar"?',
				options: ['hablo', 'hablar', 'hablamos'],
				correct: 0,
				correctExplanation: 'Correct! "Hablo" means "I speak".',
				wrongExplanation: 'Not quite. Remember to replace -ar with -o for the yo form.',
				alternativeQuestion: 'What is the yo form of "estudiar" (to study)?',
				alternativeOptions: ['estudiar', 'estudia', 'estudio'],
				alternativeCorrect: 2
			},
			{
				type: 'practice',
				questionNumber: 2,
				inputType: 'multiple',
				title: 'Multiple Choice Practice',
				question: 'What is the yo form of "comer"?',
				options: ['comer', 'como', 'comes'],
				correct: 1,
				correctExplanation: 'Perfect! "Como" means "I eat".',
				wrongExplanation: 'Not quite. Remember to replace -er with -o for the yo form.',
				alternativeQuestion: 'What is the yo form of "leer" (to read)?',
				alternativeOptions: ['leer', 'leo', 'lees'],
				alternativeCorrect: 1
			},
			{
				type: 'practice',
				questionNumber: 3,
				inputType: 'multiple',
				title: 'Multiple Choice Practice',
				question: 'What is the yo form of "vivir"?',
				options: ['vivo', 'vivir', 'vives'],
				correct: 0,
				correctExplanation: 'Excellent! "Vivo" means "I live".',
				wrongExplanation: 'Not quite. Remember to replace -ir with -o for the yo form.',
				alternativeQuestion: 'What is the yo form of "abrir" (to open)?',
				alternativeOptions: ['abro', 'abrir', 'abres'],
				alternativeCorrect: 0
			},
			{
				type: 'practice',
				questionNumber: 4,
				inputType: 'multiple',
				title: 'Multiple Choice Practice',
				question: 'What is the yo form of "tener"? (the yo form has a g after the n when conjugated)',
				options: ['tener', 'tengo', 'tienes'],
				correct: 1,
				correctExplanation: 'Great! "Tengo" means "I have". The n becomes ng in the yo form.',
				wrongExplanation: 'Remember: tener adds a g after the n in the yo form (ten + g + o).',
				alternativeQuestion: 'What is the yo form of "hacer" (to do/make)? (the c becomes g in yo form)',
				alternativeOptions: ['hago', 'hacer', 'haces'],
				alternativeCorrect: 0
			},
			// Typed Questions (5-8)
			{
				type: 'practice',
				questionNumber: 5,
				inputType: 'typed',
				title: 'Type the Answer',
				question: 'What is the yo form of "caminar"?',
				correctAnswer: 'camino',
				correctExplanation: 'Perfect! "Camino" means "I walk".',
				wrongExplanation: 'Remember: -ar verbs replace the ending with -o for yo.',
				alternativeQuestion: 'What is the yo form of "bailar" (to dance)?',
				alternativeAnswer: 'bailo'
			},
			{
				type: 'practice',
				questionNumber: 6,
				inputType: 'typed',
				title: 'Type the Answer',
				question: 'What is the yo form of "beber"?',
				correctAnswer: 'bebo',
				correctExplanation: 'Excellent! "Bebo" means "I drink".',
				wrongExplanation: 'Remember: -er verbs replace the ending with -o for yo.',
				alternativeQuestion: 'What is the yo form of "correr" (to run)?',
				alternativeAnswer: 'corro'
			},
			{
				type: 'practice',
				questionNumber: 7,
				inputType: 'typed',
				title: 'Type the Answer',
				question: 'What is the yo form of "escribir"?',
				correctAnswer: 'escribo',
				correctExplanation: 'Great job! "Escribo" means "I write".',
				wrongExplanation: 'Remember: -ir verbs replace the ending with -o for yo.',
				alternativeQuestion: 'What is the yo form of "subir" (to go up)?',
				alternativeAnswer: 'subo'
			},
			{
				type: 'practice',
				questionNumber: 8,
				inputType: 'typed',
				title: 'Type the Answer',
				question: 'What is the yo form of "querer"? (STEM-CHANGING VERB: e → ie)',
				correctAnswer: 'quiero',
				correctExplanation: 'Perfect! "Quiero" means "I want". The e changes to ie.',
				wrongExplanation: 'Querer is stem-changing. The e becomes ie, then add -o.',
				alternativeQuestion: 'What is the yo form of "pensar" (to think)? (STEM-CHANGING: e → ie)',
				alternativeAnswer: 'pienso'
			},
			// Application Questions (9-10)
			{
				type: 'practice',
				questionNumber: 9,
				inputType: 'application',
				title: 'Real World Application',
				question: 'How do you say "I want water"? (querer = to want, agua = water)',
				correctAnswer: 'quiero agua',
				correctExplanation: 'Excellent! "Quiero agua" is perfect. You\'re ready to order drinks!',
				wrongExplanation: 'Remember: use the yo form of querer (quiero) + agua.',
				alternativeQuestion: 'How do you say "I want coffee"? (querer = to want, café = coffee)',
				alternativeAnswer: 'quiero cafe'
			},
			{
				type: 'practice',
				questionNumber: 10,
				inputType: 'application',
				title: 'Real World Application',
				question: 'How do you say "I need help"? (necesitar = to need, ayuda = help)',
				correctAnswer: 'necesito ayuda',
				correctExplanation: 'Perfect! "Necesito ayuda" is essential for travelers. You\'ve mastered the basics!',
				wrongExplanation: 'Remember: use the yo form of necesitar (necesito) + ayuda.',
				alternativeQuestion: 'How do you say "I need a taxi"? (necesitar = to need, taxi = taxi)',
				alternativeAnswer: 'necesito taxi'
			},
			{
				type: 'completion',
				title: 'Lesson Complete! 🎉',
				content: 'You\'ve mastered the yo form and can now express what you want, need, and do in Spanish!',
				mastered: ['Yo form for all verb types', 'Stem-changing verbs like querer', 'Real-world phrases for travel'],
				nextLesson: 'Next: Learn to conjugate verbs for different people (tú, él, ella, etc.)'
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
		if (currentStep < lesson1Content.steps.length - 1) {
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
	
	$: currentStepData = lesson1Content.steps[currentStep];
</script>

<svelte:head>
	<title>Lesson {lessonId}: {lesson1Content.title} - LangLearner</title>
	<meta name="description" content="Learn essential Spanish verbs with yo" />
</svelte:head>

<div class="min-h-screen bg-gray-50">
	<div class="container mx-auto px-4 py-8">
		<div class="max-w-2xl mx-auto">
			<!-- Progress Bar -->
			<div class="mb-8">
				<div class="flex justify-between items-center mb-2">
					<span class="text-sm text-gray-600">Lesson {lessonId}: {lesson1Content.title}</span>
					<span class="text-sm text-gray-600">{currentStep + 1} of {lesson1Content.steps.length}</span>
				</div>
				<div class="bg-gray-200 rounded-full h-2">
					<div class="bg-blue-600 h-2 rounded-full transition-all duration-300" style="width: {((currentStep + 1) / lesson1Content.steps.length) * 100}%"></div>
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
						<div class="space-y-4">
							{#each currentStepData.examples || [] as example}
								<div class="bg-white p-4 rounded-lg">
									<div class="flex items-center justify-between mb-2">
										<span class="text-lg font-medium text-gray-900">{example.infinitive}</span>
										<span class="text-gray-600">({example.meaning})</span>
									</div>
									<div class="flex items-center justify-between">
										<span class="text-xl font-bold text-blue-600">{example.conjugated}</span>
										<span class="text-blue-800">{example.translation}</span>
									</div>
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
							<h3 class="font-semibold text-yellow-800 mb-3">💡 Yo Form Pattern:</h3>
							<div class="space-y-3">
								<div class="bg-white p-3 rounded">
									<h4 class="font-semibold text-blue-700 mb-2">Regular Verbs</h4>
									<p class="text-sm">Remove the <strong>-ar</strong>, <strong>-er</strong>, or <strong>-ir</strong> ending and add <strong>-o</strong></p>
									<div class="text-xs text-gray-600 mt-1">
										Example: trabajar → trabaj + o = trabajo
									</div>
								</div>
							<div class="bg-orange-100 p-3 rounded">
								<h4 class="font-semibold text-orange-700 mb-2">Remember:</h4>
								<ul class="text-sm space-y-1">
									<li>Most verbs follow this pattern exactly</li>
									<li>Some verbs have small changes - check the question for hints</li>
								</ul>
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
								{currentStep === lesson1Content.steps.length - 2 ? 'Complete Lesson' : 'Continue'}
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
