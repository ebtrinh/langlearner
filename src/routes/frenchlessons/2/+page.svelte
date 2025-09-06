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

	// French Lesson 2: Verb Conjugations
	const lesson2Content = {
		title: 'Verb Conjugations: -er, -ir, -re',
		steps: [
			{
				type: 'teaching',
				title: 'French Verb Conjugations for All Subjects',
				content: 'Now that you know "je", let\'s learn how French verbs change for different people. French has different endings for each subject: je (I), tu (you singular), il/elle (he/she), nous (we), vous (you formal/plural), ils/elles (they). For example: parler → je parle, tu parles, il/elle parle, nous parlons, vous parlez, ils/elles parlent. Each verb group (-er, -ir, -re) has its own pattern. Let\'s practice!'
			},
			{
				type: 'practice',
				questionNumber: 1,
				inputType: 'multiple',
				question: 'What is the tu form of parler (to speak)?',
				options: ['tu parle', 'tu parles', 'tu parlons', 'tu parlez'],
				correct: 1,
				correctExplanation: 'Perfect! "Tu parles" is correct. For -er verbs, tu takes -es.',
				wrongExplanation: 'Not quite right. For -er verbs like parler, tu takes -es ending.',
				alternativeQuestion: 'What is the tu form of regarder (to look)?',
				alternativeOptions: ['tu regarde', 'tu regardes', 'tu regardons', 'tu regardez'],
				alternativeCorrect: 1
			},
			{
				type: 'practice',
				questionNumber: 2,
				inputType: 'multiple',
				question: 'What is the nous form of finir (to finish)?',
				options: ['nous finis', 'nous finit', 'nous finissons', 'nous finissez'],
				correct: 2,
				correctExplanation: 'Excellent! "Nous finissons" is correct. For -ir verbs, nous takes -issons.',
				wrongExplanation: 'Not quite right. For -ir verbs like finir, nous takes -issons.',
				alternativeQuestion: 'What is the nous form of choisir (to choose)?',
				alternativeOptions: ['nous choisis', 'nous choisit', 'nous choisissons', 'nous choisissez'],
				alternativeCorrect: 2
			},
			{
				type: 'practice',
				questionNumber: 3,
				inputType: 'typed',
				question: 'Type the il form of vendre (to sell):',
				correctAnswer: 'il vend',
				correctExplanation: 'Perfect! "Il vend" is correct. For -re verbs, il/elle takes no extra ending.',
				wrongExplanation: 'Not quite right. For -re verbs like vendre, il/elle takes no extra ending - just remove the -re.',
				alternativeQuestion: 'Type the elle form of attendre (to wait):',
				alternativeAnswer: 'elle attend'
			},
			{
				type: 'practice',
				questionNumber: 4,
				inputType: 'typed',
				question: 'Type the vous form of manger (to eat):',
				correctAnswer: 'vous mangez',
				correctExplanation: 'Excellent! "Vous mangez" is correct.',
				wrongExplanation: 'Not quite right. For -er verbs, vous takes -ez.',
				alternativeQuestion: 'Type the vous form of donner (to give):',
				alternativeAnswer: 'vous donnez'
			},
			{
				type: 'practice',
				questionNumber: 5,
				inputType: 'application',
				question: 'How do you say "We speak French" in French? (parler = to speak, français = French)',
				correctAnswer: 'nous parlons français',
				correctExplanation: 'Perfect! "Nous parlons français" - you\'ve mastered the nous form!',
				wrongExplanation: 'Remember: use the nous form of parler (nous parlons) + français.',
				alternativeQuestion: 'How do you say "They eat bread" in French? (manger = to eat, pain = bread)',
				alternativeAnswer: 'ils mangent du pain'
			},
			{
				type: 'practice',
				questionNumber: 6,
				inputType: 'application',
				question: 'How do you say "You (formal) choose coffee" in French? (choisir = to choose, café = coffee)',
				correctAnswer: 'vous choisissez du café',
				correctExplanation: 'Excellent! "Vous choisissez du café" - you\'re mastering French conjugations!',
				wrongExplanation: 'Remember: use the vous form of choisir (vous choisissez) + du café.',
				alternativeQuestion: 'How do you say "She sells books" in French? (vendre = to sell, livres = books)',
				alternativeAnswer: 'elle vend des livres'
			},
			{
				type: 'completion',
				title: 'Fantastic Work! 🎉',
				content: 'You\'ve mastered French verb conjugations for all subjects! You can now express actions for any person using -er, -ir, and -re verbs.',
				nextLesson: 'Next: Learn essential travel verbs and common French phrases for real situations'
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

	$: currentStepData = lesson2Content.steps[currentStep];
</script>

<svelte:head>
	<title>French Lesson 2: Verb Conjugations - LangLearner</title>
	<meta name="description" content="Learn French verb conjugations for all subjects" />
</svelte:head>

<div class="min-h-screen bg-gray-50">
	<div class="container mx-auto px-4 py-16">
		<div class="max-w-2xl mx-auto">
			<!-- Progress Bar -->
			<div class="mb-8">
				<div class="flex justify-between text-sm text-gray-600 mb-2">
					<span>Lesson 2: Verb Conjugations</span>
					<span>{currentStep + 1} of {lesson2Content.steps.length}</span>
				</div>
				<div class="bg-gray-200 rounded-full h-2">
					<div class="bg-blue-600 h-2 rounded-full transition-all duration-300" style="width: {((currentStep + 1) / lesson2Content.steps.length) * 100}%"></div>
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
								<div class="text-yellow-700">
									<p class="mb-2">French verb conjugation endings:</p>
									<table class="text-sm border-collapse">
										<thead>
											<tr>
												<th class="border border-yellow-300 px-2 py-1">Subject</th>
												<th class="border border-yellow-300 px-2 py-1">-er verbs</th>
												<th class="border border-yellow-300 px-2 py-1">-ir verbs</th>
												<th class="border border-yellow-300 px-2 py-1">-re verbs</th>
											</tr>
										</thead>
										<tbody>
											<tr><td class="border border-yellow-300 px-2 py-1">je</td><td class="border border-yellow-300 px-2 py-1">-e</td><td class="border border-yellow-300 px-2 py-1">-is</td><td class="border border-yellow-300 px-2 py-1">-s</td></tr>
											<tr><td class="border border-yellow-300 px-2 py-1">tu</td><td class="border border-yellow-300 px-2 py-1">-es</td><td class="border border-yellow-300 px-2 py-1">-is</td><td class="border border-yellow-300 px-2 py-1">-s</td></tr>
											<tr><td class="border border-yellow-300 px-2 py-1">il/elle</td><td class="border border-yellow-300 px-2 py-1">-e</td><td class="border border-yellow-300 px-2 py-1">-it</td><td class="border border-yellow-300 px-2 py-1">(remove -re)</td></tr>
											<tr><td class="border border-yellow-300 px-2 py-1">nous</td><td class="border border-yellow-300 px-2 py-1">-ons</td><td class="border border-yellow-300 px-2 py-1">-issons</td><td class="border border-yellow-300 px-2 py-1">-ons</td></tr>
											<tr><td class="border border-yellow-300 px-2 py-1">vous</td><td class="border border-yellow-300 px-2 py-1">-ez</td><td class="border border-yellow-300 px-2 py-1">-issez</td><td class="border border-yellow-300 px-2 py-1">-ez</td></tr>
											<tr><td class="border border-yellow-300 px-2 py-1">ils/elles</td><td class="border border-yellow-300 px-2 py-1">-ent</td><td class="border border-yellow-300 px-2 py-1">-issent</td><td class="border border-yellow-300 px-2 py-1">-ent</td></tr>
										</tbody>
									</table>
								</div>
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
							<span class="text-sm text-green-600 font-medium">Vous maîtrisez le français! 🎆</span>
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
			</div>
		</div>
	</div>
</div>
