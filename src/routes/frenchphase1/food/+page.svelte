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

	// French Phase 1: Food & Drink
	const lessonContent = {
		title: 'Food & Drink',
		category: 'Food & Drink',
		description: 'Learn essential food and drink vocabulary for restaurants and shopping.',
		steps: [
			{
				type: 'teaching',
				title: 'Food & Drink',
				content: 'Food is universal! Learn these essential words and you\'ll be able to order meals, ask for drinks, and navigate menus with confidence.',
				vocabTable: [
					{ english: 'Water', french: 'Eau', pronunciation: 'oh' },
					{ english: 'Food', french: 'Nourriture', pronunciation: 'noo-ree-TOOR' },
					{ english: 'Coffee', french: 'Café', pronunciation: 'kah-FAY' },
					{ english: 'Tea', french: 'Thé', pronunciation: 'tay' },
					{ english: 'Beer', french: 'Bière', pronunciation: 'bee-YAIR' },
					{ english: 'Wine', french: 'Vin', pronunciation: 'vahn' },
					{ english: 'Bread', french: 'Pain', pronunciation: 'pahn' },
					{ english: 'Meat', french: 'Viande', pronunciation: 'vee-AHND' },
					{ english: 'Chicken', french: 'Poulet', pronunciation: 'poo-LAY' },
					{ english: 'Fish', french: 'Poisson', pronunciation: 'pwah-SOHN' },
					{ english: 'Rice', french: 'Riz', pronunciation: 'ree' },
					{ english: 'Fruit', french: 'Fruit', pronunciation: 'frwee' },
					{ english: 'Breakfast', french: 'Petit-déjeuner', pronunciation: 'puh-tee day-zhuh-NAY' },
					{ english: 'Lunch', french: 'Déjeuner', pronunciation: 'day-zhuh-NAY' },
					{ english: 'Dinner', french: 'Dîner', pronunciation: 'dee-NAY' },
					{ english: 'I would like...', french: 'Je voudrais...', pronunciation: 'zhuh voo-DRAY' },
					{ english: 'I would like water', french: 'Je voudrais de l\'eau', pronunciation: 'zhuh voo-DRAY duh loh' }
				]
			},
			{
				type: 'practice',
				questionNumber: 1,
				inputType: 'multiple',
				question: 'How do you say "Water" in French?',
				options: ['Lait', 'Eau', 'Café', 'Thé'],
				correct: 1,
				correctExplanation: 'Perfect! "Eau" means water - probably the most important word to know!',
				wrongExplanation: 'Not quite right. "Eau" means water.'
			},
			{
				type: 'practice',
				questionNumber: 2,
				inputType: 'multiple',
				question: 'How do you say "Food" in French?',
				options: ['Boisson', 'Nourriture', 'Dîner', 'Table'],
				correct: 1,
				correctExplanation: 'Excellent! "Nourriture" means food.',
				wrongExplanation: 'Not quite right. "Nourriture" means food.'
			},
			{
				type: 'practice',
				questionNumber: 3,
				inputType: 'multiple',
				question: 'How do you say "Coffee" in French?',
				options: ['Thé', 'Café', 'Eau', 'Bière'],
				correct: 1,
				correctExplanation: 'Great! "Café" means coffee.',
				wrongExplanation: 'Not quite right. "Café" means coffee.'
			},
			{
				type: 'practice',
				questionNumber: 4,
				inputType: 'multiple',
				question: 'How do you say "Beer" in French?',
				options: ['Vin', 'Café', 'Bière', 'Eau'],
				correct: 2,
				correctExplanation: 'Perfect! "Bière" means beer.',
				wrongExplanation: 'Not quite right. "Bière" means beer.'
			},
			{
				type: 'practice',
				questionNumber: 5,
				inputType: 'multiple',
				question: 'How do you say "Bread" in French?',
				options: ['Pain', 'Viande', 'Poulet', 'Poisson'],
				correct: 0,
				correctExplanation: 'Excellent! "Pain" means bread.',
				wrongExplanation: 'Not quite right. "Pain" means bread.'
			},
			{
				type: 'practice',
				questionNumber: 6,
				inputType: 'multiple',
				question: 'How do you say "Meat" in French?',
				options: ['Pain', 'Viande', 'Fruit', 'Riz'],
				correct: 1,
				correctExplanation: 'Great! "Viande" means meat.',
				wrongExplanation: 'Not quite right. "Viande" means meat.'
			},
			{
				type: 'practice',
				questionNumber: 7,
				inputType: 'multiple',
				question: 'How do you say "Breakfast" in French?',
				options: ['Dîner', 'Déjeuner', 'Petit-déjeuner', 'Goûter'],
				correct: 2,
				correctExplanation: 'Perfect! "Petit-déjeuner" means breakfast.',
				wrongExplanation: 'Not quite right. "Petit-déjeuner" means breakfast.'
			},
			{
				type: 'practice',
				questionNumber: 8,
				inputType: 'multiple',
				question: 'How do you say "Dinner" in French?',
				options: ['Petit-déjeuner', 'Déjeuner', 'Dîner', 'Thé'],
				correct: 2,
				correctExplanation: 'Excellent! "Dîner" means dinner.',
				wrongExplanation: 'Not quite right. "Dîner" means dinner.'
			},
			{
				type: 'practice',
				questionNumber: 9,
				inputType: 'application',
				question: 'How do you say "I would like water" in French?',
				correctAnswer: 'je voudrais de l\'eau',
				correctExplanation: 'Great! "Je voudrais de l\'eau" - essential for staying hydrated!',
				wrongExplanation: 'Remember: "Je voudrais de l\'eau" means "I would like water".'
			},
			{
				type: 'practice',
				questionNumber: 10,
				inputType: 'application',
				question: 'How do you say "chicken" in French?',
				correctAnswer: 'poulet',
				correctExplanation: 'Excellent! "Poulet" means chicken.',
				wrongExplanation: 'Remember: "Poulet" means chicken.'
			},
			{
				type: 'practice',
				questionNumber: 11,
				inputType: 'application',
				question: 'How do you say "fruit" in French?',
				correctAnswer: 'fruit',
				correctExplanation: 'Perfect! "Fruit" means fruit.',
				wrongExplanation: 'Remember: "Fruit" means fruit.'
			},
			{
				type: 'completion',
				title: 'Congratulations! 🎉',
				content: 'You\'ve learned essential food and drink vocabulary! Now you can order meals and navigate restaurants in French.',
				nextLesson: 'Next: Ready for Phase 2 grammar lessons!'
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
		lessonScores['french-phase1-food'] = { score: `${correctAnswers}/${totalQuestions}`, percentage };
		localStorage.setItem('lessonScores', JSON.stringify(lessonScores));
		
		goto('/dashboard');
	}
	
	$: scorePercentage = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;

	$: currentStepData = lessonContent.steps[currentStep];
</script>

<svelte:head>
	<title>French Phase 1: Food & Drink - LangLearner</title>
	<meta name="description" content="Learn essential French food and drink vocabulary" />
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
					<div class="bg-orange-600 h-2 rounded-full transition-all duration-300" style="width: {((currentStep + 1) / lessonContent.steps.length) * 100}%"></div>
				</div>
			</div>

			<div class="bg-white p-8 rounded-lg shadow-lg">
				
				{#if currentStepData.type === 'teaching'}
					<div class="text-center">
						<div class="text-4xl mb-4">🍽️</div>
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
										class="w-full p-4 text-left border-2 rounded-lg transition-all {selectedAnswer === index.toString() ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-gray-300'}"
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
									class="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none"
								/>
								<button 
									on:click={submitTypedAnswer}
									class="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
									disabled={showFeedback}
								>
									Submit Answer
								</button>
							</div>
						{/if}
						
						{#if showHint}
							<div class="mt-4 p-4 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 rounded-lg shadow-sm">
								<h4 class="font-medium text-amber-800 mb-2 flex items-center">
									💡 Hint - Vocabulary Reference:
								</h4>
								<p class="text-amber-700 mb-3">
									Think about foods you love to eat! Check the vocabulary table below:
								</p>
								<div class="bg-white rounded p-3 max-h-48 overflow-y-auto">
									<table class="w-full text-sm">
										<thead>
											<tr class="border-b border-amber-200">
												<th class="py-1 px-2 text-left font-medium text-amber-800">English</th>
												<th class="py-1 px-2 text-left font-medium text-amber-800">French</th>
											</tr>
										</thead>
										<tbody>
											{#each lessonContent.steps[0].vocabTable || [] as vocab}
												<tr class="border-b border-amber-100">
													<td class="py-1 px-2 text-amber-600">{vocab.english}</td>
													<td class="py-1 px-2 font-medium text-amber-900">{vocab.french}</td>
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
						<div class="bg-orange-50 border-2 border-orange-200 rounded-lg p-6 mb-6">
							<h3 class="text-xl font-semibold text-orange-900 mb-2">Your Score</h3>
							<div class="text-3xl font-bold text-orange-600 mb-2">{correctAnswers}/{totalQuestions}</div>
							<div class="text-lg text-orange-700">{scorePercentage}% Correct</div>
						</div>
						
						<p class="text-gray-600 mb-8">{currentStepData.nextLesson}</p>
						<button 
							on:click={completeLesson}
							class="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-medium text-lg transition-colors"
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
							class="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
							disabled={!showFeedback}
						>
							{currentStep === lessonContent.steps.length - 2 ? 'Complete Lesson' : 'Continue'}
						</button>
					{:else if currentStepData.type !== 'completion'}
						<button 
							on:click={nextStep}
							class="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
						>
							Continue
						</button>
					{:else}
						<button 
							on:click={completeLesson}
							class="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
						>
							Return to Dashboard
						</button>
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>
