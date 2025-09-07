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

	// Spanish Phase 1: Numbers
	const lessonContent = {
		title: 'Numbers in Spanish',
		category: 'Numbers',
		description: 'Learn essential numbers for prices, time, and everyday counting.',
		steps: [
			{
				type: 'teaching',
				title: 'Numbers in Spanish',
				content: 'Numbers are super useful! You\'ll need them for prices, addresses, phone numbers, and telling time. Let\'s learn the basics that you\'ll use every day.',
				vocabTable: [
					{ english: 'One', spanish: 'Uno', pronunciation: 'OO-noh' },
					{ english: 'Two', spanish: 'Dos', pronunciation: 'dohs' },
					{ english: 'Three', spanish: 'Tres', pronunciation: 'trehs' },
					{ english: 'Four', spanish: 'Cuatro', pronunciation: 'KWAH-troh' },
					{ english: 'Five', spanish: 'Cinco', pronunciation: 'SEEN-koh' },
					{ english: 'Six', spanish: 'Seis', pronunciation: 'says' },
					{ english: 'Seven', spanish: 'Siete', pronunciation: 'see-EH-teh' },
					{ english: 'Eight', spanish: 'Ocho', pronunciation: 'OH-choh' },
					{ english: 'Nine', spanish: 'Nueve', pronunciation: 'NWAY-veh' },
					{ english: 'Ten', spanish: 'Diez', pronunciation: 'dee-EHS' },
					{ english: 'Fifteen', spanish: 'Quince', pronunciation: 'KEEN-seh' },
					{ english: 'Twenty', spanish: 'Veinte', pronunciation: 'VAYN-teh' },
					{ english: 'Fifty', spanish: 'Cincuenta', pronunciation: 'seen-KWEN-tah' },
					{ english: 'One hundred', spanish: 'Cien', pronunciation: 'see-EHN' },
					{ english: 'One thousand', spanish: 'Mil', pronunciation: 'meel' },
					{ english: 'How much?', spanish: '¿Cuánto?', pronunciation: 'KWAN-toh' },
					{ english: 'Price', spanish: 'Precio', pronunciation: 'PREH-see-oh' }
				]
			},
			{
				type: 'practice',
				questionNumber: 1,
				inputType: 'multiple',
				question: 'How do you say "One" in Spanish?',
				options: ['Dos', 'Uno', 'Tres', 'Cuatro'],
				correct: 1,
				correctExplanation: 'Perfect! "Uno" means one.',
				wrongExplanation: 'Not quite right. "Uno" means one.',
				alternativeQuestion: 'How do you say "Two" in Spanish?',
				alternativeOptions: ['Uno', 'Dos', 'Tres', 'Cinco'],
				alternativeCorrect: 1,
				alternativeCorrectExplanation: 'Excellent! "Dos" means two.',
				alternativeWrongExplanation: 'Not quite right. "Dos" means two.'
			},
			{
				type: 'practice',
				questionNumber: 2,
				inputType: 'multiple',
				question: 'How do you say "Three" in Spanish?',
				options: ['Dos', 'Cuatro', 'Tres', 'Cinco'],
				correct: 2,
				correctExplanation: 'Great! "Tres" means three.',
				wrongExplanation: 'Not quite right. "Tres" means three.',
				alternativeQuestion: 'How do you say "Four" in Spanish?',
				alternativeOptions: ['Tres', 'Cuatro', 'Cinco', 'Seis'],
				alternativeCorrect: 1,
				alternativeCorrectExplanation: 'Perfect! "Cuatro" means four.',
				alternativeWrongExplanation: 'Not quite right. "Cuatro" means four.'
			},
			{
				type: 'practice',
				questionNumber: 3,
				inputType: 'multiple',
				question: 'How do you say "Five" in Spanish?',
				options: ['Cuatro', 'Cinco', 'Seis', 'Siete'],
				correct: 1,
				correctExplanation: 'Excellent! "Cinco" means five.',
				wrongExplanation: 'Not quite right. "Cinco" means five.',
				alternativeQuestion: 'How do you say "Ten" in Spanish?',
				alternativeOptions: ['Nueve', 'Diez', 'Once', 'Doce'],
				alternativeCorrect: 1,
				alternativeCorrectExplanation: 'Great! "Diez" means ten.',
				alternativeWrongExplanation: 'Not quite right. "Diez" means ten.'
			},
			{
				type: 'practice',
				questionNumber: 4,
				inputType: 'multiple',
				question: 'How do you say "Twenty" in Spanish?',
				options: ['Diez', 'Veinte', 'Treinta', 'Cuarenta'],
				correct: 1,
				correctExplanation: 'Perfect! "Veinte" means twenty.',
				wrongExplanation: 'Not quite right. "Veinte" means twenty.',
				alternativeQuestion: 'How do you say "Hundred" in Spanish?',
				alternativeOptions: ['Cincuenta', 'Cien', 'Mil', 'Diez'],
				alternativeCorrect: 1,
				alternativeCorrectExplanation: 'Excellent! "Cien" means one hundred.',
				alternativeWrongExplanation: 'Not quite right. "Cien" means one hundred.'
			},
			{
				type: 'practice',
				questionNumber: 5,
				inputType: 'application',
				question: 'How do you ask "How much?" in Spanish? (¿Cuánto?)',
				correctAnswer: 'cuanto',
				correctExplanation: 'Perfect! "¿Cuánto?" means "How much?" - essential for shopping!',
				wrongExplanation: 'Remember: "¿Cuánto?" means "How much?"',
				alternativeQuestion: 'How do you say "price" in Spanish? (precio)',
				alternativeAnswer: 'precio',
				alternativeCorrectExplanation: 'Great! "Precio" means price.',
				alternativeWrongExplanation: 'Remember: "Precio" means price.'
			},
			{
				type: 'practice',
				questionNumber: 6,
				inputType: 'application',
				question: 'How do you say "thousand" in Spanish? (mil)',
				correctAnswer: 'mil',
				correctExplanation: 'Excellent! "Mil" means thousand.',
				wrongExplanation: 'Remember: "Mil" means thousand.',
				alternativeQuestion: 'If something costs 15 pesos, how would you say the number? (quince)',
				alternativeAnswer: 'quince',
				alternativeCorrectExplanation: 'Perfect! "Quince" means fifteen.',
				alternativeWrongExplanation: 'Remember: "Quince" means fifteen.'
			},
			{
				type: 'completion',
				title: 'Congratulations! 🎉',
				content: 'You\'ve learned essential Spanish numbers! Now you can understand prices, count, and handle numbers in Spanish.',
				nextLesson: 'Next: Learn time expressions - today, tomorrow, morning, evening!'
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
		lessonScores['spanish-phase1-numbers'] = { score: `${correctAnswers}/${totalQuestions}`, percentage };
		localStorage.setItem('lessonScores', JSON.stringify(lessonScores));
		
		goto('/dashboard');
	}
	
	$: scorePercentage = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;

	$: currentStepData = lessonContent.steps[currentStep];
</script>

<svelte:head>
	<title>Spanish Phase 1: Numbers - LangLearner</title>
	<meta name="description" content="Learn essential Spanish numbers for everyday use" />
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
									Many Spanish numbers sound similar to English: "cinco" (five), "diez" (ten). Check the vocabulary table below:
								</p>
								<div class="bg-white rounded p-3 max-h-48 overflow-y-auto">
									<table class="w-full text-sm">
										<thead>
											<tr class="border-b border-indigo-200">
												<th class="py-1 px-2 text-left font-medium text-indigo-800">English</th>
												<th class="py-1 px-2 text-left font-medium text-indigo-800">Spanish</th>
											</tr>
										</thead>
										<tbody>
											{#each lessonContent.steps[0].vocabTable || [] as vocab}
												<tr class="border-b border-indigo-100">
													<td class="py-1 px-2 text-indigo-600">{vocab.english}</td>
													<td class="py-1 px-2 font-medium text-indigo-900">{vocab.spanish}</td>
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
								class="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
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
							class="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
							disabled={!canContinue}
						>
							{currentStep === lessonContent.steps.length - 2 ? 'Complete Lesson' : 'Continue'}
						</button>
					{:else}
						<button 
							on:click={nextStep}
							class="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
						>
							Continue
						</button>
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>
