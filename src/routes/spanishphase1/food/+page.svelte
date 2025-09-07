<script lang="ts">
	import { goto } from '$app/navigation';

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
		totalQuestions = lessonContent.steps.filter(step => step.type === 'practice').length;
	}

	// Spanish Phase 1: Food & Drink
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
					{ english: 'Water', spanish: 'Agua', pronunciation: 'AH-gwah' },
					{ english: 'Food', spanish: 'Comida', pronunciation: 'koh-MEE-dah' },
					{ english: 'Coffee', spanish: 'Café', pronunciation: 'kah-FEH' },
					{ english: 'Tea', spanish: 'Té', pronunciation: 'teh' },
					{ english: 'Beer', spanish: 'Cerveza', pronunciation: 'ser-VEH-sah' },
					{ english: 'Wine', spanish: 'Vino', pronunciation: 'VEE-noh' },
					{ english: 'Bread', spanish: 'Pan', pronunciation: 'pahn' },
					{ english: 'Meat', spanish: 'Carne', pronunciation: 'KAR-neh' },
					{ english: 'Chicken', spanish: 'Pollo', pronunciation: 'POH-yoh' },
					{ english: 'Fish', spanish: 'Pescado', pronunciation: 'pes-KAH-doh' },
					{ english: 'Rice', spanish: 'Arroz', pronunciation: 'ah-ROHS' },
					{ english: 'Fruit', spanish: 'Fruta', pronunciation: 'FROO-tah' },
					{ english: 'Breakfast', spanish: 'Desayuno', pronunciation: 'deh-sah-YOO-noh' },
					{ english: 'Lunch', spanish: 'Almuerzo', pronunciation: 'al-MWER-soh' },
					{ english: 'Dinner', spanish: 'Cena', pronunciation: 'SEH-nah' },
					{ english: 'I want tacos', spanish: 'Quiero tacos', pronunciation: 'kee-EH-roh TAH-kohs' },
					{ english: 'I want water', spanish: 'Quiero agua', pronunciation: 'kee-EH-roh AH-gwah' }
				]
			},
			{
				type: 'practice',
				questionNumber: 1,
				inputType: 'multiple',
				question: 'How do you say "Water" in Spanish?',
				options: ['Leche', 'Agua', 'Café', 'Té'],
				correct: 1,
				correctExplanation: 'Perfect! "Agua" means water - probably the most important word to know!',
				wrongExplanation: 'Not quite right. "Agua" means water.',
				alternativeQuestion: 'How do you say "Food" in Spanish?',
				alternativeOptions: ['Bebida', 'Comida', 'Cena', 'Mesa'],
				alternativeCorrect: 1,
				alternativeCorrectExplanation: 'Excellent! "Comida" means food.',
				alternativeWrongExplanation: 'Not quite right. "Comida" means food.'
			},
			{
				type: 'practice',
				questionNumber: 2,
				inputType: 'multiple',
				question: 'How do you say "Coffee" in Spanish?',
				options: ['Té', 'Café', 'Agua', 'Cerveza'],
				correct: 1,
				correctExplanation: 'Great! "Café" means coffee.',
				wrongExplanation: 'Not quite right. "Café" means coffee.',
				alternativeQuestion: 'How do you say "Beer" in Spanish?',
				alternativeOptions: ['Vino', 'Café', 'Cerveza', 'Agua'],
				alternativeCorrect: 2,
				alternativeCorrectExplanation: 'Perfect! "Cerveza" means beer.',
				alternativeWrongExplanation: 'Not quite right. "Cerveza" means beer.'
			},
			{
				type: 'practice',
				questionNumber: 3,
				inputType: 'multiple',
				question: 'How do you say "Bread" in Spanish?',
				options: ['Pan', 'Carne', 'Pollo', 'Pescado'],
				correct: 0,
				correctExplanation: 'Excellent! "Pan" means bread.',
				wrongExplanation: 'Not quite right. "Pan" means bread.',
				alternativeQuestion: 'How do you say "Meat" in Spanish?',
				alternativeOptions: ['Pan', 'Carne', 'Fruta', 'Arroz'],
				alternativeCorrect: 1,
				alternativeCorrectExplanation: 'Great! "Carne" means meat.',
				alternativeWrongExplanation: 'Not quite right. "Carne" means meat.'
			},
			{
				type: 'practice',
				questionNumber: 4,
				inputType: 'multiple',
				question: 'How do you say "Breakfast" in Spanish?',
				options: ['Cena', 'Almuerzo', 'Desayuno', 'Merienda'],
				correct: 2,
				correctExplanation: 'Perfect! "Desayuno" means breakfast.',
				wrongExplanation: 'Not quite right. "Desayuno" means breakfast.',
				alternativeQuestion: 'How do you say "Dinner" in Spanish?',
				alternativeOptions: ['Desayuno', 'Almuerzo', 'Cena', 'Té'],
				alternativeCorrect: 2,
				alternativeCorrectExplanation: 'Excellent! "Cena" means dinner.',
				alternativeWrongExplanation: 'Not quite right. "Cena" means dinner.'
			},
			{
				type: 'practice',
				questionNumber: 5,
				inputType: 'application',
				question: 'How do you say "I want tacos" in Spanish? (Quiero tacos)',
				correctAnswer: 'quiero tacos',
				correctExplanation: 'Perfect! "Quiero tacos" - a very useful phrase!',
				wrongExplanation: 'Remember: "Quiero tacos" means "I want tacos".',
				alternativeQuestion: 'How do you say "I want water" in Spanish? (Quiero agua)',
				alternativeAnswer: 'quiero agua',
				alternativeCorrectExplanation: 'Great! "Quiero agua" - essential for staying hydrated!',
				alternativeWrongExplanation: 'Remember: "Quiero agua" means "I want water".'
			},
			{
				type: 'practice',
				questionNumber: 6,
				inputType: 'application',
				question: 'How do you say "chicken" in Spanish? (pollo)',
				correctAnswer: 'pollo',
				correctExplanation: 'Excellent! "Pollo" means chicken.',
				wrongExplanation: 'Remember: "Pollo" means chicken.',
				alternativeQuestion: 'How do you say "fruit" in Spanish? (fruta)',
				alternativeAnswer: 'fruta',
				alternativeCorrectExplanation: 'Perfect! "Fruta" means fruit.',
				alternativeWrongExplanation: 'Remember: "Fruta" means fruit.'
			},
			{
				type: 'completion',
				title: 'Congratulations! 🎉',
				content: 'You\'ve learned essential food and drink vocabulary! Now you can order meals and navigate restaurants in Spanish.',
				nextLesson: 'Next: Learn shopping and money words for markets and stores!'
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
		lessonScores['spanish-phase1-food'] = { score: `${correctAnswers}/${totalQuestions}`, percentage };
		localStorage.setItem('lessonScores', JSON.stringify(lessonScores));
		
		goto('/dashboard');
	}
	
	$: scorePercentage = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;

	$: currentStepData = lessonContent.steps[currentStep];
</script>

<svelte:head>
	<title>Spanish Phase 1: Food & Drink - LangLearner</title>
	<meta name="description" content="Learn essential Spanish food and drink vocabulary" />
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
									Think about foods you love to eat! Many food words are similar across languages. Check the vocabulary table below:
								</p>
								<div class="bg-white rounded p-3 max-h-48 overflow-y-auto">
									<table class="w-full text-sm">
										<thead>
											<tr class="border-b border-amber-200">
												<th class="py-1 px-2 text-left font-medium text-amber-800">English</th>
												<th class="py-1 px-2 text-left font-medium text-amber-800">Spanish</th>
											</tr>
										</thead>
										<tbody>
											{#each lessonContent.steps[0].vocabTable || [] as vocab}
												<tr class="border-b border-amber-100">
													<td class="py-1 px-2 text-amber-600">{vocab.english}</td>
													<td class="py-1 px-2 font-medium text-amber-900">{vocab.spanish}</td>
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
								class="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
							>
								Try Extra Question
							</button>
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
							class="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
							disabled={!canContinue}
						>
							{currentStep === lessonContent.steps.length - 2 ? 'Complete Lesson' : 'Continue'}
						</button>
					{:else}
						<button 
							on:click={nextStep}
							class="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
						>
							Continue
						</button>
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>
