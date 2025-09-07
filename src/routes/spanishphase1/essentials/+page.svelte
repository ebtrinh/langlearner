<script lang="ts">
	import { goto } from '$app/navigation';

	let currentStep = 0;
	let selectedAnswer = '';
	let typedAnswer = '';
	let showFeedback = false;
	let showHint = false;
	let correctAnswers = 0;
	let totalQuestions = 0;

	// Calculate total practice questions on component init
	$: {
		totalQuestions = lessonContent.steps.filter(step => step.type === 'practice').length;
	}

	// Spanish Phase 1: Essentials Vocabulary
	const lessonContent = {
		title: 'Essential Spanish Phrases',
		category: 'Essentials',
		description: 'Learn the most important words and phrases you\'ll need in any Spanish-speaking situation.',
		steps: [
			{
				type: 'teaching',
				title: 'Essential Spanish Phrases',
				content: 'Let\'s start with the most important phrases you\'ll use every day. These are essential for basic communication - no grammar rules to memorize, just practical phrases that work in real situations!',
				vocabTable: [
					{ english: 'Hello', spanish: 'Hola', pronunciation: 'OH-lah' },
					{ english: 'Good morning', spanish: 'Buenos días', pronunciation: 'BWAY-nos DEE-ahs' },
					{ english: 'Thank you', spanish: 'Gracias', pronunciation: 'GRAH-see-ahs' },
					{ english: 'You\'re welcome', spanish: 'De nada', pronunciation: 'deh NAH-dah' },
					{ english: 'Please', spanish: 'Por favor', pronunciation: 'por fah-VOR' },
					{ english: 'Excuse me/Sorry', spanish: 'Perdón', pronunciation: 'per-DOHN' },
					{ english: 'Yes', spanish: 'Sí', pronunciation: 'see' },
					{ english: 'No', spanish: 'No', pronunciation: 'noh' },
					{ english: 'Help', spanish: 'Ayuda', pronunciation: 'ah-YOO-dah' },
					{ english: 'Where is the bathroom?', spanish: '¿Dónde está el baño?', pronunciation: 'DOHN-deh es-TAH el BAH-nyoh' },
					{ english: 'Goodbye', spanish: 'Adiós', pronunciation: 'ah-dee-OHS' },
					{ english: 'See you later', spanish: 'Hasta luego', pronunciation: 'AHS-tah LWAY-goh' }
				]
			},
			{
				type: 'practice',
				questionNumber: 1,
				inputType: 'multiple',
				question: 'How do you say "Hello" in Spanish?',
				options: ['Hola', 'Adiós', 'Gracias', 'Por favor'],
				correct: 0,
				correctExplanation: 'Perfect! "Hola" is the most common way to say hello in Spanish.',
				wrongExplanation: 'Not quite right. "Hola" is how you say hello in Spanish.'
			},
			{
				type: 'practice',
				questionNumber: 2,
				inputType: 'multiple',
				question: 'How do you say "Good morning" in Spanish?',
				options: ['Buenos días', 'Buenas noches', 'Buenas tardes', 'Hola'],
				correct: 0,
				correctExplanation: 'Excellent! "Buenos días" means good morning.',
				wrongExplanation: 'Not quite right. "Buenos días" means good morning.'
			},
			{
				type: 'practice',
				questionNumber: 3,
				inputType: 'multiple',
				question: 'How do you say "Thank you" in Spanish?',
				options: ['Por favor', 'Gracias', 'De nada', 'Perdón'],
				correct: 1,
				correctExplanation: 'Great! "Gracias" means thank you.',
				wrongExplanation: 'Not quite right. "Gracias" means thank you.'
			},
			{
				type: 'practice',
				questionNumber: 4,
				inputType: 'multiple',
				question: 'How do you say "You\'re welcome" in Spanish?',
				options: ['Gracias', 'De nada', 'Por favor', 'Perdón'],
				correct: 1,
				correctExplanation: 'Perfect! "De nada" means you\'re welcome.',
				wrongExplanation: 'Not quite right. "De nada" means you\'re welcome.'
			},
			{
				type: 'practice',
				questionNumber: 5,
				inputType: 'multiple',
				question: 'How do you say "Please" in Spanish?',
				options: ['Gracias', 'Perdón', 'Por favor', 'Hola'],
				correct: 2,
				correctExplanation: 'Excellent! "Por favor" means please.',
				wrongExplanation: 'Not quite right. "Por favor" means please.'
			},
			{
				type: 'practice',
				questionNumber: 6,
				inputType: 'multiple',
				question: 'How do you say "Excuse me" or "Sorry" in Spanish?',
				options: ['Por favor', 'Perdón', 'Gracias', 'Hola'],
				correct: 1,
				correctExplanation: 'Great! "Perdón" means excuse me or sorry.',
				wrongExplanation: 'Not quite right. "Perdón" means excuse me or sorry.'
			},
			{
				type: 'practice',
				questionNumber: 7,
				inputType: 'multiple',
				question: 'How do you say "Yes" in Spanish?',
				options: ['No', 'Sí', 'Tal vez', 'Nunca'],
				correct: 1,
				correctExplanation: 'Perfect! "Sí" means yes.',
				wrongExplanation: 'Not quite right. "Sí" means yes.'
			},
			{
				type: 'practice',
				questionNumber: 8,
				inputType: 'multiple',
				question: 'How do you say "No" in Spanish?',
				options: ['Sí', 'No', 'Tal vez', 'Siempre'],
				correct: 1,
				correctExplanation: 'Correct! "No" means no (same as English).',
				wrongExplanation: 'Not quite right. "No" means no (same as English).'
			},
			{
				type: 'practice',
				questionNumber: 9,
				inputType: 'application',
				question: 'If you need help, what would you say?',
				correctAnswer: 'ayuda',
				correctExplanation: 'Perfect! "Ayuda" means help. You can say just "¡Ayuda!" when you need help.',
				wrongExplanation: 'Remember: "Ayuda" means help.'
			},
			{
				type: 'practice',
				questionNumber: 10,
				inputType: 'application',
				question: 'How do you ask "Where is the bathroom?" in Spanish?',
				correctAnswer: 'donde esta el bano',
				correctExplanation: 'Great! "¿Dónde está el baño?" is essential to know!',
				wrongExplanation: 'The phrase is "¿Dónde está el baño?" - Where is the bathroom?'
			},
			{
				type: 'practice',
				questionNumber: 11,
				inputType: 'application',
				question: 'How do you say "Goodbye" in Spanish?',
				correctAnswer: 'adios',
				correctExplanation: 'Excellent! "Adiós" means goodbye.',
				wrongExplanation: 'Remember: "Adiós" means goodbye.'
			},
			{
				type: 'practice',
				questionNumber: 12,
				inputType: 'application',
				question: 'How do you say "See you later" in Spanish?',
				correctAnswer: 'hasta luego',
				correctExplanation: 'Perfect! "Hasta luego" means see you later.',
				wrongExplanation: 'Remember: "Hasta luego" means see you later.'
			},
			{
				type: 'completion',
				title: 'Congratulations! 🎉',
				content: 'You\'ve learned the essential Spanish phrases! These words will help you in any Spanish-speaking situation.',
				nextLesson: 'Next: Learn directions and places to get around easily!'
			}
		]
	};

	function nextStep() {
		if (currentStep < lessonContent.steps.length - 1) {
		currentStep++;
		selectedAnswer = '';
		typedAnswer = '';
		showFeedback = false;
		showHint = false;
		}
	}
	
	function selectAnswer(index: number) {
		selectedAnswer = index.toString();
		showFeedback = true;
		
		// Track correct answer
		if (index === currentStepData.correct) {
			correctAnswers++;
		}
	}
	
	function checkTypedAnswer() {
		const correct = currentStepData.correctAnswer?.toLowerCase().trim();
		const userAnswer = typedAnswer.toLowerCase().trim();
		
		// Check if the answer is correct (remove accents for comparison)
		const normalizeText = (text: string) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
		return normalizeText(userAnswer) === normalizeText(correct || '');
	}
	
	function submitTypedAnswer() {
		showFeedback = true;
		
		// Track correct answer
		if (checkTypedAnswer()) {
			correctAnswers++;
		}
	}
	
	function toggleHint() {
		showHint = !showHint;
	}
	
	function completeLesson() {
		// Save lesson score to localStorage
		const lessonScores = JSON.parse(localStorage.getItem('lessonScores') || '{}');
		const percentage = Math.round((correctAnswers / totalQuestions) * 100);
		lessonScores['spanish-phase1-essentials'] = { score: `${correctAnswers}/${totalQuestions}`, percentage };
		localStorage.setItem('lessonScores', JSON.stringify(lessonScores));
		
		goto('/dashboard');
	}
	
	$: scorePercentage = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;

	$: currentStepData = lessonContent.steps[currentStep];
</script>

<svelte:head>
	<title>Spanish Phase 1: Essential Phrases - LangLearner</title>
	<meta name="description" content="Learn essential Spanish phrases for everyday communication" />
</svelte:head>

<div class="min-h-screen bg-gray-50">
	<div class="container mx-auto px-4 py-16">
		<div class="max-w-2xl mx-auto">
			<!-- Progress Bar -->
			<div class="mb-8">
				<div class="flex justify-between text-sm text-gray-600 mb-2">
					<span>Phase 1: {lessonContent.category}</span>
					<span>{currentStep + 1} of {lessonContent.steps.length}</span>
				</div>
				<div class="bg-gray-200 rounded-full h-2">
					<div class="bg-green-600 h-2 rounded-full transition-all duration-300" style="width: {((currentStep + 1) / lessonContent.steps.length) * 100}%"></div>
				</div>
			</div>

			<div class="bg-white p-8 rounded-lg shadow-lg">
				
				{#if currentStepData.type === 'teaching'}
					<div class="text-center">
						<div class="text-4xl mb-4">🗣️</div>
						<h1 class="text-3xl font-bold text-gray-900 mb-4">{currentStepData.title}</h1>
						<p class="text-lg text-gray-700 mb-8 leading-relaxed">{currentStepData.content}</p>
						
						{#if currentStepData.vocabTable}
							<div class="bg-gray-50 rounded-lg p-6 mb-8">
								<h2 class="text-xl font-semibold text-gray-900 mb-4">Vocabulary You'll Learn</h2>
								<div class="overflow-x-auto">
									<table class="w-full text-left">
										<thead>
											<tr class="border-b border-gray-200">
												<th class="py-2 px-4 font-medium text-gray-700">English</th>
												<th class="py-2 px-4 font-medium text-gray-700">Spanish</th>
												<th class="py-2 px-4 font-medium text-gray-700">Pronunciation</th>
											</tr>
										</thead>
										<tbody>
											{#each currentStepData.vocabTable as vocab}
												<tr class="border-b border-gray-100">
													<td class="py-2 px-4 text-gray-600">{vocab.english}</td>
													<td class="py-2 px-4 font-medium text-gray-900">{vocab.spanish}</td>
													<td class="py-2 px-4 text-gray-500 italic">{vocab.pronunciation}</td>
												</tr>
											{/each}
										</tbody>
									</table>
								</div>
							</div>
						{/if}
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
										class="w-full p-4 text-left border-2 rounded-lg transition-all {selectedAnswer === index.toString() ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'}"
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
									class="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
								/>
								<button 
									on:click={submitTypedAnswer}
									class="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
									disabled={showFeedback}
								>
									Submit Answer
								</button>
							</div>
						{/if}
						
						{#if showHint}
							<div class="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-lg shadow-sm">
								<h4 class="font-medium text-blue-800 mb-2 flex items-center">
									💡 Hint - Vocabulary Reference:
								</h4>
								<p class="text-blue-700 mb-3">
									These are common phrases used in daily conversation. Check the vocabulary table below:
								</p>
								<div class="bg-white rounded p-3 max-h-48 overflow-y-auto">
									<table class="w-full text-sm">
										<thead>
											<tr class="border-b border-blue-200">
												<th class="py-1 px-2 text-left font-medium text-blue-800">English</th>
												<th class="py-1 px-2 text-left font-medium text-blue-800">Spanish</th>
											</tr>
										</thead>
										<tbody>
											{#each lessonContent.steps[0].vocabTable || [] as vocab}
												<tr class="border-b border-blue-100">
													<td class="py-1 px-2 text-blue-600">{vocab.english}</td>
													<td class="py-1 px-2 font-medium text-blue-900">{vocab.spanish}</td>
												</tr>
											{/each}
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
							{#if currentStepData.inputType !== 'multiple' && !checkTypedAnswer()}
								<br/><strong>Correct answer:</strong> {currentStepData.correctAnswer}
							{/if}
						</div>
					{/if}
				{:else if currentStepData.type === 'completion'}
					<div class="text-center">
						<div class="text-6xl mb-4">🎉</div>
						<h1 class="text-3xl font-bold text-gray-900 mb-4">{currentStepData.title}</h1>
						<p class="text-lg text-gray-700 mb-6">{currentStepData.content}</p>
						
						<!-- Score Display -->
						<div class="bg-green-50 border-2 border-green-200 rounded-lg p-6 mb-6">
							<h3 class="text-xl font-semibold text-green-900 mb-2">Your Score</h3>
							<div class="text-3xl font-bold text-green-600 mb-2">{correctAnswers}/{totalQuestions}</div>
							<div class="text-lg text-green-700">{scorePercentage}% Correct</div>
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
							class="bg-blue-100 hover:bg-blue-200 text-blue-800 px-4 py-2 rounded-lg font-medium transition-colors border border-blue-300"
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
						<button 
							on:click={nextStep}
							class="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
							disabled={!showFeedback}
						>
							{currentStep === lessonContent.steps.length - 2 ? 'Complete Lesson' : 'Continue'}
						</button>
					{:else if currentStepData.type !== 'completion'}
						<button 
							on:click={nextStep}
							class="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
						>
							Continue
						</button>
					{:else}
						<button 
							on:click={completeLesson}
							class="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
						>
							Return to Dashboard
						</button>
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>
