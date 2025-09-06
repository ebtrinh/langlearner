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

	// French Lesson 1: Basic "Je" + Present Tense
	const lesson1Content = {
		title: 'Basic "Je" + Present Tense',
		steps: [
			{
				type: 'teaching',
				title: 'Understanding "Je" (I) in French',
				content: 'Verbs in French change their endings to show who is doing the action. French verbs naturally start in their infinitive form: "to want" is "vouloir", "to have" is "avoir", etc. When we want to say that I am doing something, we use "je" and the verb changes. For example: vouloir → je veux, avoir → j\'ai, parler → je parle. Now you try!'
			},
			{
				type: 'practice',
				questionNumber: 1,
				inputType: 'multiple',
				question: 'What is the je form of parler (to speak)?',
				options: ['je parle', 'je parles', 'je parlé', 'je parlons'],
				correct: 0,
				correctExplanation: 'Perfect! "Je parle" is correct. For -er verbs like parler, we remove -er and add -e for je.',
				wrongExplanation: 'Not quite right. For -er verbs like parler, we remove -er and add -e for je.',
				alternativeQuestion: 'What is the je form of regarder (to look/watch)?',
				alternativeOptions: ['je regarde', 'je regardes', 'je regardé', 'je regardons'],
				alternativeCorrect: 0
			},
			{
				type: 'practice',
				questionNumber: 2,
				inputType: 'multiple',
				question: 'What is the je form of finir (to finish)?',
				options: ['je fini', 'je finis', 'je finir', 'je finissons'],
				correct: 1,
				correctExplanation: 'Excellent! "Je finis" is correct. For -ir verbs like finir, we remove -ir and add -is for je.',
				wrongExplanation: 'Not quite right. For -ir verbs like finir, we remove -ir and add -is for je.',
				alternativeQuestion: 'What is the je form of choisir (to choose)?',
				alternativeOptions: ['je choisi', 'je choisis', 'je choisir', 'je choisissons'],
				alternativeCorrect: 1
			},
			{
				type: 'practice',
				questionNumber: 3,
				inputType: 'typed',
				question: 'Type the je form of manger (to eat):',
				correctAnswer: 'je mange',
				correctExplanation: 'Perfect! "Je mange" is correct.',
				wrongExplanation: 'Not quite right. Remember, for -er verbs we remove -er and add -e for je.',
				alternativeQuestion: 'Type the je form of donner (to give):',
				alternativeAnswer: 'je donne'
			},
			{
				type: 'practice',
				questionNumber: 4,
				inputType: 'typed',
				question: 'Type the je form of prendre (to take)?',
				correctAnswer: 'je prends',
				correctExplanation: 'Excellent! "Je prends" is correct. Prendre is irregular in the je form.',
				wrongExplanation: 'Not quite right. Prendre is irregular - the je form is "je prends".',
				alternativeQuestion: 'Type the je form of vendre (to sell):',
				alternativeAnswer: 'je vends'
			},
			{
				type: 'practice',
				questionNumber: 5,
				inputType: 'application',
				question: 'How do you say "I want coffee" in French? (vouloir = to want, café = coffee)',
				correctAnswer: 'je veux du café',
				correctExplanation: 'Perfect! "Je veux du café" - you\'ve mastered using je with vouloir!',
				wrongExplanation: 'Remember: use the je form of vouloir (je veux) + du café.',
				alternativeQuestion: 'How do you say "I have water" in French? (avoir = to have, eau = water)',
				alternativeAnswer: 'j\'ai de l\'eau'
			},
			{
				type: 'practice',
				questionNumber: 6,
				inputType: 'application',
				question: 'How do you say "I speak French" in French? (parler = to speak, français = French)',
				correctAnswer: 'je parle français',
				correctExplanation: 'Excellent! "Je parle français" - you\'re really getting this!',
				wrongExplanation: 'Remember: use the je form of parler (je parle) + français.',
				alternativeQuestion: 'How do you say "I eat bread" in French? (manger = to eat, pain = bread)',
				alternativeAnswer: 'je mange du pain'
			},
			{
				type: 'completion',
				title: 'Congratulations! 🎉',
				content: 'You\'ve mastered the basic "je" form in French! You can now express what you do using common French verbs.',
				nextLesson: 'Next: Learn to conjugate French verbs for different people (tu, il/elle, nous, vous, ils/elles)'
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
		const messages = ['Parfait! 🎉', 'Excellent! ⭐', 'Très bien! 👏', 'Fantastique! 🌟', 'Incroyable! 🚀', 'Génial! ✨'];
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
		typedAnswer = '';
		showFeedback = false;
		showAlternativeButton = false;
	}
	
	function toggleHint() {
		showHint = !showHint;
	}
	
	function completeLesson() {
		goto('/dashboard');
	}

	$: currentStepData = lesson1Content.steps[currentStep];
</script>

<svelte:head>
	<title>French Lesson 1: Basic "Je" + Present Tense - LangLearner</title>
	<meta name="description" content="Learn the basic je form of French verbs" />
</svelte:head>

<div class="min-h-screen bg-gray-50">
	<div class="container mx-auto px-4 py-16">
		<div class="max-w-2xl mx-auto">
			<!-- Progress Bar -->
			<div class="mb-8">
				<div class="flex justify-between text-sm text-gray-600 mb-2">
					<span>Lesson 1: Basic "Je" + Present Tense</span>
					<span>{currentStep + 1} of {lesson1Content.steps.length}</span>
				</div>
				<div class="bg-gray-200 rounded-full h-2">
					<div class="bg-blue-600 h-2 rounded-full transition-all duration-300" style="width: {((currentStep + 1) / lesson1Content.steps.length) * 100}%"></div>
				</div>
			</div>

			<!-- Celebration Pop-up -->
			{#if showCelebration}
				<div class="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white px-8 py-4 rounded-full shadow-lg animate-bounce">
					<div class="text-xl font-bold text-center">{celebrationMessage}</div>
				</div>
			{/if}

			<div class="bg-white p-8 rounded-lg shadow-lg relative overflow-hidden">
				<!-- Progress celebration effects -->
				{#if currentStep >= 3}
					<div class="absolute top-0 right-0 text-6xl opacity-10 pointer-events-none">🎯</div>
				{/if}
				{#if currentStep >= 6}
					<div class="absolute bottom-0 left-0 text-6xl opacity-10 pointer-events-none">⭐</div>
				{/if}
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
									on:keydown={(e) => e.key === 'Enter' && submitTypedAnswer()}
								/>
								<button 
									on:click={submitTypedAnswer}
									class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
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
									For French verbs with "je": -er verbs add -e (parler → je parle), -ir verbs add -is (finir → je finis), -re verbs add -s (vendre → je vends). Some verbs have changes - check the question for hints about irregular forms.
								</p>
							</div>
						{/if}
					</div>
					
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
							{showHint ? '🙈 Hide Hint' : '💡 Besoin d\'aide?'}
						</button>
						{#if currentStep >= 2}
							<span class="text-sm text-green-600 font-medium">Vous êtes formidable! 🎆</span>
						{/if}
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
