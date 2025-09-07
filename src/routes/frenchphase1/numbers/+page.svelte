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

	// French Phase 1: Numbers
	const lessonContent = {
		title: 'Numbers in French',
		category: 'Numbers',
		description: 'Learn essential numbers for prices, time, and everyday counting.',
		steps: [
			{
				type: 'teaching',
				title: 'Numbers in French',
				content: 'Numbers are super useful! You\'ll need them for prices, addresses, phone numbers, and telling time. Let\'s learn the basics that you\'ll use every day.',
				vocabTable: [
					{ english: 'One', french: 'Un', pronunciation: 'uhn' },
					{ english: 'Two', french: 'Deux', pronunciation: 'duh' },
					{ english: 'Three', french: 'Trois', pronunciation: 'trwah' },
					{ english: 'Four', french: 'Quatre', pronunciation: 'KAH-truh' },
					{ english: 'Five', french: 'Cinq', pronunciation: 'sank' },
					{ english: 'Six', french: 'Six', pronunciation: 'sees' },
					{ english: 'Seven', french: 'Sept', pronunciation: 'set' },
					{ english: 'Eight', french: 'Huit', pronunciation: 'weet' },
					{ english: 'Nine', french: 'Neuf', pronunciation: 'nuf' },
					{ english: 'Ten', french: 'Dix', pronunciation: 'dees' },
					{ english: 'Fifteen', french: 'Quinze', pronunciation: 'kanz' },
					{ english: 'Twenty', french: 'Vingt', pronunciation: 'vahn' },
					{ english: 'Fifty', french: 'Cinquante', pronunciation: 'san-KAHNT' },
					{ english: 'One hundred', french: 'Cent', pronunciation: 'sahn' },
					{ english: 'One thousand', french: 'Mille', pronunciation: 'meel' },
					{ english: 'How much?', french: 'Combien?', pronunciation: 'kom-bee-AHN' },
					{ english: 'Price', french: 'Prix', pronunciation: 'pree' }
				]
			},
			{
				type: 'practice',
				questionNumber: 1,
				inputType: 'multiple',
				question: 'How do you say "One" in French?',
				options: ['Deux', 'Un', 'Trois', 'Quatre'],
				correct: 1,
				correctExplanation: 'Perfect! "Un" means one.',
				wrongExplanation: 'Not quite right. "Un" means one.'
			},
			{
				type: 'practice',
				questionNumber: 2,
				inputType: 'multiple',
				question: 'How do you say "Two" in French?',
				options: ['Un', 'Deux', 'Trois', 'Cinq'],
				correct: 1,
				correctExplanation: 'Excellent! "Deux" means two.',
				wrongExplanation: 'Not quite right. "Deux" means two.'
			},
			{
				type: 'practice',
				questionNumber: 3,
				inputType: 'multiple',
				question: 'How do you say "Three" in French?',
				options: ['Deux', 'Quatre', 'Trois', 'Cinq'],
				correct: 2,
				correctExplanation: 'Great! "Trois" means three.',
				wrongExplanation: 'Not quite right. "Trois" means three.'
			},
			{
				type: 'practice',
				questionNumber: 4,
				inputType: 'multiple',
				question: 'How do you say "Four" in French?',
				options: ['Trois', 'Quatre', 'Cinq', 'Six'],
				correct: 1,
				correctExplanation: 'Perfect! "Quatre" means four.',
				wrongExplanation: 'Not quite right. "Quatre" means four.'
			},
			{
				type: 'practice',
				questionNumber: 5,
				inputType: 'multiple',
				question: 'How do you say "Five" in French?',
				options: ['Quatre', 'Cinq', 'Six', 'Sept'],
				correct: 1,
				correctExplanation: 'Excellent! "Cinq" means five.',
				wrongExplanation: 'Not quite right. "Cinq" means five.'
			},
			{
				type: 'practice',
				questionNumber: 6,
				inputType: 'multiple',
				question: 'How do you say "Ten" in French?',
				options: ['Neuf', 'Dix', 'Onze', 'Douze'],
				correct: 1,
				correctExplanation: 'Great! "Dix" means ten.',
				wrongExplanation: 'Not quite right. "Dix" means ten.'
			},
			{
				type: 'practice',
				questionNumber: 7,
				inputType: 'multiple',
				question: 'How do you say "Twenty" in French?',
				options: ['Dix', 'Vingt', 'Trente', 'Quarante'],
				correct: 1,
				correctExplanation: 'Perfect! "Vingt" means twenty.',
				wrongExplanation: 'Not quite right. "Vingt" means twenty.'
			},
			{
				type: 'practice',
				questionNumber: 8,
				inputType: 'multiple',
				question: 'How do you say "Hundred" in French?',
				options: ['Cinquante', 'Cent', 'Mille', 'Dix'],
				correct: 1,
				correctExplanation: 'Excellent! "Cent" means one hundred.',
				wrongExplanation: 'Not quite right. "Cent" means one hundred.'
			},
			{
				type: 'practice',
				questionNumber: 9,
				inputType: 'application',
				question: 'How do you ask "How much?" in French?',
				correctAnswer: 'combien',
				correctExplanation: 'Perfect! "Combien?" means "How much?" - essential for shopping!',
				wrongExplanation: 'Remember: "Combien?" means "How much?"'
			},
			{
				type: 'practice',
				questionNumber: 10,
				inputType: 'application',
				question: 'How do you say "price" in French?',
				correctAnswer: 'prix',
				correctExplanation: 'Great! "Prix" means price.',
				wrongExplanation: 'Remember: "Prix" means price.'
			},
			{
				type: 'practice',
				questionNumber: 11,
				inputType: 'application',
				question: 'How do you say "thousand" in French?',
				correctAnswer: 'mille',
				correctExplanation: 'Excellent! "Mille" means thousand.',
				wrongExplanation: 'Remember: "Mille" means thousand.'
			},
			{
				type: 'completion',
				title: 'Congratulations! 🎉',
				content: 'You\'ve learned essential French numbers! Now you can understand prices, count, and handle numbers in French.',
				nextLesson: 'Next: Learn food and drink vocabulary!'
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
		lessonScores['french-phase1-numbers'] = { score: `${correctAnswers}/${totalQuestions}`, percentage };
		localStorage.setItem('lessonScores', JSON.stringify(lessonScores));
		
		goto('/dashboard');
	}
	
	$: scorePercentage = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;

	$: currentStepData = lessonContent.steps[currentStep];
</script>

<svelte:head>
	<title>French Phase 1: Numbers - LangLearner</title>
	<meta name="description" content="Learn essential French numbers for everyday use" />
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
					<div class="bg-purple-600 h-2 rounded-full transition-all duration-300" style="width: {((currentStep + 1) / lessonContent.steps.length) * 100}%"></div>
				</div>
			</div>

			<div class="bg-white p-8 rounded-lg shadow-lg">
				
				{#if currentStepData.type === 'teaching'}
					<div class="text-center">
						<div class="text-4xl mb-4">🔢</div>
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
												<th class="py-2 px-4 font-medium text-gray-700">French</th>
												<th class="py-2 px-4 font-medium text-gray-700">Pronunciation</th>
											</tr>
										</thead>
										<tbody>
											{#each currentStepData.vocabTable as vocab}
												<tr class="border-b border-gray-100">
													<td class="py-2 px-4 text-gray-600">{vocab.english}</td>
													<td class="py-2 px-4 font-medium text-gray-900">{vocab.french}</td>
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
										class="w-full p-4 text-left border-2 rounded-lg transition-all {selectedAnswer === index.toString() ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-gray-300'}"
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
									class="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
								/>
								<button 
									on:click={submitTypedAnswer}
									class="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
									disabled={showFeedback}
								>
									Submit Answer
								</button>
							</div>
						{/if}
						
						{#if showHint}
							<div class="mt-4 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-300 rounded-lg shadow-sm">
								<h4 class="font-medium text-indigo-800 mb-2 flex items-center">
									💡 Hint - Vocabulary Reference:
								</h4>
								<p class="text-indigo-700 mb-3">
									French numbers have unique sounds. Check the vocabulary table below:
								</p>
								<div class="bg-white rounded p-3 max-h-48 overflow-y-auto">
									<table class="w-full text-sm">
										<thead>
											<tr class="border-b border-indigo-200">
												<th class="py-1 px-2 text-left font-medium text-indigo-800">English</th>
												<th class="py-1 px-2 text-left font-medium text-indigo-800">French</th>
											</tr>
										</thead>
										<tbody>
											{#each lessonContent.steps[0].vocabTable || [] as vocab}
												<tr class="border-b border-indigo-100">
													<td class="py-1 px-2 text-indigo-600">{vocab.english}</td>
													<td class="py-1 px-2 font-medium text-indigo-900">{vocab.french}</td>
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
						<div class="bg-purple-50 border-2 border-purple-200 rounded-lg p-6 mb-6">
							<h3 class="text-xl font-semibold text-purple-900 mb-2">Your Score</h3>
							<div class="text-3xl font-bold text-purple-600 mb-2">{correctAnswers}/{totalQuestions}</div>
							<div class="text-lg text-purple-700">{scorePercentage}% Correct</div>
						</div>
						
						<p class="text-gray-600 mb-8">{currentStepData.nextLesson}</p>
						<button 
							on:click={completeLesson}
							class="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium text-lg transition-colors"
						>
							Return to Dashboard
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
						<button 
							on:click={nextStep}
							class="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
							disabled={!showFeedback}
						>
							{currentStep === lessonContent.steps.length - 2 ? 'Complete Lesson' : 'Continue'}
						</button>
					{:else if currentStepData.type !== 'completion'}
						<button 
							on:click={nextStep}
							class="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
						>
							Continue
						</button>
					{:else}
						<button 
							on:click={completeLesson}
							class="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
						>
							Return to Dashboard
						</button>
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>
