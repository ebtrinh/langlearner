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
	let isShowingAlternative = false;
	let correctAnswers = 0;
	let totalQuestions = 0;
	
	// Calculate total practice questions on component init
	$: {
		totalQuestions = lesson1Content.steps.filter(step => step.type === 'practice').length;
	}

	// Spanish Lesson 1: Basic "Yo" + Present Tense
	const lesson1Content = {
		title: 'Basic "Yo" + Present Tense',
		steps: [
			{
				type: 'teaching',
				title: 'Understanding "Yo" (I) in Spanish',
				content: 'Verbs in Spanish use different sounds at the ends to dictate who the subject is. Verbs naturally start out as their infinitive: "to eat" is comer, "to speak" is hablar, etc. When we want to say that I am doing something, an "o" replaces the er, ir, or ar at the end of the verb. ex. comer = como, hablar = hablo. Now you try!'
			},
			{
				type: 'practice',
				questionNumber: 1,
				inputType: 'multiple',
				question: 'What is the yo form of hablar (to speak)?',
				options: ['hablo', 'hablas', 'habla', 'hablamos'],
				correct: 0,
				correctExplanation: 'Perfect! "Hablo" is correct. For -ar verbs like hablar, we remove -ar and add -o.',
				wrongExplanation: 'Not quite right. For -ar verbs like hablar, we remove -ar and add -o for yo.',
				alternativeQuestion: 'What is the yo form of caminar (to walk)?',
				alternativeOptions: ['camino', 'caminas', 'camina', 'caminamos'],
				alternativeCorrect: 0,
				alternativeCorrectExplanation: 'Perfect! "Camino" is correct. For -ar verbs like caminar, we remove -ar and add -o.',
				alternativeWrongExplanation: 'Not quite right. For -ar verbs like caminar, we remove -ar and add -o for yo.'
			},
			{
				type: 'practice',
				questionNumber: 2,
				inputType: 'multiple',
				question: 'What is the yo form of comer (to eat)?',
				options: ['como', 'comes', 'come', 'comemos'],
				correct: 0,
				correctExplanation: 'Excellent! "Como" is correct. For -er verbs like comer, we remove -er and add -o.',
				wrongExplanation: 'Not quite right. For -er verbs like comer, we remove -er and add -o for yo.',
				alternativeQuestion: 'What is the yo form of beber (to drink)?',
				alternativeOptions: ['bebo', 'bebes', 'bebe', 'bebemos'],
				alternativeCorrect: 0,
				alternativeCorrectExplanation: 'Excellent! "Bebo" is correct. For -er verbs like beber, we remove -er and add -o.',
				alternativeWrongExplanation: 'Not quite right. For -er verbs like beber, we remove -er and add -o for yo.'
			},
			{
				type: 'practice',
				questionNumber: 3,
				inputType: 'typed',
				question: 'Type the yo form of vivir (to live):',
				correctAnswer: 'vivo',
				correctExplanation: 'Perfect! "Vivo" is correct.',
				wrongExplanation: 'Not quite right. Remember, for -ir verbs we remove -ir and add -o.',
				alternativeQuestion: 'Type the yo form of escribir (to write):',
				alternativeAnswer: 'escribo',
				alternativeCorrectExplanation: 'Perfect! "Escribo" is correct.',
				alternativeWrongExplanation: 'Not quite right. Remember, for -ir verbs we remove -ir and add -o.'
			},
			{
				type: 'practice',
				questionNumber: 4,
				inputType: 'typed',
				question: 'Type the yo form of tener? (the yo form has a g after the n when conjugated)',
				correctAnswer: 'tengo',
				correctExplanation: 'Excellent! "Tengo" is correct. Tener is irregular in the yo form.',
				wrongExplanation: 'Not quite right. Tener is irregular - the yo form is "tengo".',
				alternativeQuestion: 'Type the yo form of querer? (STEM-CHANGING VERB: e → ie)',
				alternativeAnswer: 'quiero',
				alternativeCorrectExplanation: 'Excellent! "Quiero" is correct. Querer is a stem-changing verb where e becomes ie.',
				alternativeWrongExplanation: 'Not quite right. Querer is a stem-changing verb - the yo form is "quiero".'
			},
			{
				type: 'practice',
				questionNumber: 5,
				inputType: 'application',
				question: 'How do you say "I want water" in Spanish? (querer = to want [STEM-CHANGING: e → ie], agua = water)',
				correctAnswer: 'quiero agua',
				correctExplanation: 'Perfect! "Quiero agua" - you\'ve mastered using yo with querer!',
				wrongExplanation: 'Remember: use the yo form of querer (quiero) + agua.',
				alternativeQuestion: 'How do you say "I want coffee" in Spanish? (querer = to want [STEM-CHANGING: e → ie], café = coffee)',
				alternativeAnswer: 'quiero café',
				alternativeCorrectExplanation: 'Perfect! "Quiero café" - you\'ve mastered using yo with querer!',
				alternativeWrongExplanation: 'Remember: use the yo form of querer (quiero) + café.'
			},
			{
				type: 'practice',
				questionNumber: 6,
				inputType: 'application',
				question: 'How do you say "I have a book" in Spanish? (tener = to have [IRREGULAR: yo form has g], un = a/an, libro = book)',
				correctAnswer: 'tengo un libro',
				correctExplanation: 'Excellent! "Tengo un libro" - you\'re really getting this!',
				wrongExplanation: 'Remember: use the yo form of tener (tengo) + un libro.',
				alternativeQuestion: 'How do you say "I eat food" in Spanish? (comer = to eat, comida = food)',
				alternativeAnswer: 'como comida',
				alternativeCorrectExplanation: 'Excellent! "Como comida" - you\'re really getting this!',
				alternativeWrongExplanation: 'Remember: use the yo form of comer (como) + comida.'
			},
			{
				type: 'completion',
				title: 'Congratulations! 🎉',
				content: 'You\'ve mastered the basic "yo" form in Spanish! You can now express what you do using common Spanish verbs.',
				nextLesson: 'Next: Learn to conjugate verbs for different people (tú, él, ella, etc.)'
			}
		]
	};


	function nextStep() {
		if (currentStep < lesson1Content.steps.length - 1) {
			currentStep++;
			selectedAnswer = '';
			typedAnswer = '';
			showFeedback = false;
			showHint = false;
			wrongAttempts = 0;
			showAlternativeButton = false;
			isShowingAlternative = false;
		}
	}
	
	function selectAnswer(index: number) {
		selectedAnswer = index.toString();
		showFeedback = true;
		
		// Track correct answer on first attempt (not alternative question)
		if (index === currentStepData.correct && !isShowingAlternative) {
			correctAnswers++;
		}
		
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
		isShowingAlternative = true;
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
		
		// Track correct answer on first attempt (not alternative question)
		if (checkTypedAnswer() && !isShowingAlternative) {
			correctAnswers++;
		}
		
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
		isShowingAlternative = true;
	}
	
	function toggleHint() {
		showHint = !showHint;
	}
	
	function completeLesson() {
		// Save lesson score to localStorage
		const lessonScores = JSON.parse(localStorage.getItem('lessonScores') || '{}');
		const percentage = Math.round((correctAnswers / totalQuestions) * 100);
		lessonScores['spanish-1'] = { score: `${correctAnswers}/${totalQuestions}`, percentage };
		localStorage.setItem('lessonScores', JSON.stringify(lessonScores));
		
		goto('/dashboard');
	}
	
	$: scorePercentage = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;

	$: currentStepData = lesson1Content.steps[currentStep];
</script>

<svelte:head>
	<title>Spanish Lesson 1: Basic "Yo" + Present Tense - LangLearner</title>
	<meta name="description" content="Learn the basic yo form of Spanish verbs" />
</svelte:head>

<div class="min-h-screen bg-gray-50">
	<div class="container mx-auto px-4 py-16">
		<div class="max-w-2xl mx-auto">
			<!-- Progress Bar -->
			<div class="mb-8">
				<div class="flex justify-between text-sm text-gray-600 mb-2">
					<span>Lesson 1: Basic "Yo" + Present Tense</span>
					<span>{currentStep + 1} of {lesson1Content.steps.length}</span>
				</div>
				<div class="bg-gray-200 rounded-full h-2">
					<div class="bg-blue-600 h-2 rounded-full transition-all duration-300" style="width: {((currentStep + 1) / lesson1Content.steps.length) * 100}%"></div>
				</div>
			</div>

			<div class="bg-white p-8 rounded-lg shadow-lg">
				
				{#if currentStepData.type === 'teaching'}
					<div class="text-center">
						<h1 class="text-3xl font-bold text-gray-900 mb-4">{currentStepData.title}</h1>
						<p class="text-lg text-gray-700 mb-8 leading-relaxed">{currentStepData.content}</p>
					</div>
				{:else if currentStepData.type === 'practice'}
					<div class="mb-6">
						<h2 class="text-2xl font-semibold text-gray-900 mb-4">Question {currentStepData.questionNumber}</h2>
						<p class="text-lg text-gray-700 mb-6">{currentStepData.question}</p>
						
						{#if currentStepData.inputType === 'multiple'}
							<div class="space-y-3">
								{#each currentStepData.options || [] as option, index}
									<button 
										on:click={() => selectAnswer(index)}
										class="w-full p-4 text-left border-2 rounded-lg transition-all {selectedAnswer === index.toString() ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}"
										disabled={showFeedback}
									>
										{option}
									</button>
								{/each}
							</div>
						{:else if currentStepData.inputType === 'typed' || currentStepData.inputType === 'application'}
							<div class="space-y-4">
								<input 
									bind:value={typedAnswer}
									type="text" 
									placeholder="Type your answer here..."
									class="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
								/>
								<button 
									on:click={submitTypedAnswer}
									class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
									disabled={showFeedback}
								>
									Submit Answer
								</button>
							</div>
						{/if}
						
						{#if showHint}
							<div class="mt-4 p-4 bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-300 rounded-lg shadow-sm">
								<h4 class="font-medium text-yellow-800 mb-2 flex items-center">
									💡 Hint:
								</h4>
								<p class="text-yellow-700">
									Remove the -ar, -er, or -ir ending and add -o. For example: hablar → hablo, comer → como, vivir → vivo. Some verbs have small changes - check the question for hints.
								</p>
							</div>
						{/if}
					</div>
					
					{#if showFeedback}
						{@const isCorrect = (currentStepData.inputType === 'multiple' && selectedAnswer === currentStepData.correct?.toString()) || (currentStepData.inputType !== 'multiple' && checkTypedAnswer())}
						{@const correctExplanation = isShowingAlternative ? currentStepData.alternativeCorrectExplanation : currentStepData.correctExplanation}
						{@const wrongExplanation = isShowingAlternative ? currentStepData.alternativeWrongExplanation : currentStepData.wrongExplanation}
						{@const correctAnswer = isShowingAlternative ? currentStepData.alternativeAnswer : currentStepData.correctAnswer}
						<div class="{isCorrect ? 'bg-green-50 border-green-400 text-green-700' : 'bg-red-50 border-red-400 text-red-700'} border px-4 py-3 rounded">
							{isCorrect ? correctExplanation : wrongExplanation}
							{#if currentStepData.inputType !== 'multiple' && !checkTypedAnswer()}
								<br/><strong>Correct answer:</strong> {correctAnswer}
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
						<p class="text-lg text-gray-700 mb-6">{currentStepData.content}</p>
						
						<!-- Score Display -->
						<div class="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-6">
							<h3 class="text-xl font-semibold text-blue-900 mb-2">Your Score</h3>
							<div class="text-3xl font-bold text-blue-600 mb-2">{correctAnswers}/{totalQuestions}</div>
							<div class="text-lg text-blue-700">{scorePercentage}% Correct</div>
						</div>
						
						<p class="text-gray-600 mb-8">{currentStepData.nextLesson}</p>
						<button 
							on:click={completeLesson}
							class="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium text-lg transition-colors"
						>
							Back to Dashboard
						</button>
					</div>
				{/if}
				
				<div class="flex justify-between items-center mt-8">
					<div class="flex items-center space-x-4">
						<button 
							on:click={toggleHint}
							class="bg-yellow-100 hover:bg-yellow-200 text-yellow-800 px-4 py-2 rounded-lg font-medium transition-colors border border-yellow-300"
						>
							{showHint ? '🙈 Hide Hint' : '💡 Need Help?'}
						</button>
					</div>
					
					<a 
						href="/dashboard"
						class="text-gray-600 hover:text-gray-700 transition-colors"
					>
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
			</div>
		</div>
	</div>
</div>