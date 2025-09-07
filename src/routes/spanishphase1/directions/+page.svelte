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

	// Spanish Phase 1: Directions & Places
	const lessonContent = {
		title: 'Directions & Places',
		category: 'Directions & Places',
		description: 'Learn essential words for getting around and finding places.',
		steps: [
			{
				type: 'teaching',
				title: 'Directions & Places',
				content: 'Need to get around? These words will help you navigate and find important places. Learn these key phrases and you\'ll never be lost!',
				vocabTable: [
					{ english: 'Where?', spanish: '¿Dónde?', pronunciation: 'DOHN-deh' },
					{ english: 'Here', spanish: 'Aquí', pronunciation: 'ah-KEE' },
					{ english: 'There', spanish: 'Allí', pronunciation: 'ah-YEE' },
					{ english: 'Left', spanish: 'Izquierda', pronunciation: 'ees-kee-AIR-dah' },
					{ english: 'Right', spanish: 'Derecha', pronunciation: 'deh-REH-chah' },
					{ english: 'Straight', spanish: 'Recto', pronunciation: 'REK-toh' },
					{ english: 'Street', spanish: 'Calle', pronunciation: 'KAH-yeh' },
					{ english: 'Hotel', spanish: 'Hotel', pronunciation: 'oh-TELL' },
					{ english: 'Restaurant', spanish: 'Restaurante', pronunciation: 'res-tow-RAHN-teh' },
					{ english: 'Bus', spanish: 'Autobús', pronunciation: 'ow-toh-BOOS' },
					{ english: 'Taxi', spanish: 'Taxi', pronunciation: 'TAHK-see' },
					{ english: 'Train', spanish: 'Tren', pronunciation: 'trehn' },
					{ english: 'Airport', spanish: 'Aeropuerto', pronunciation: 'ah-eh-roh-PWAIR-toh' },
					{ english: 'Where is the bus?', spanish: '¿Dónde está el autobús?', pronunciation: 'DOHN-deh es-TAH el ow-toh-BOOS' },
					{ english: 'Where is the airport?', spanish: '¿Dónde está el aeropuerto?', pronunciation: 'DOHN-deh es-TAH el ah-eh-roh-PWAIR-toh' }
				]
			},
			{
				type: 'practice',
				questionNumber: 1,
				inputType: 'multiple',
				question: 'How do you say "Where?" in Spanish?',
				options: ['Aquí', 'Allí', 'Dónde', 'Cómo'],
				correct: 2,
				correctExplanation: 'Perfect! "¿Dónde?" means "Where?" - essential for asking directions.',
				wrongExplanation: 'Not quite right. "¿Dónde?" means "Where?"'
			},
			{
				type: 'practice',
				questionNumber: 2,
				inputType: 'multiple',
				question: 'How do you say "Here" in Spanish?',
				options: ['Allí', 'Aquí', 'Dónde', 'Lejos'],
				correct: 1,
				correctExplanation: 'Excellent! "Aquí" means "here".',
				wrongExplanation: 'Not quite right. "Aquí" means "here".'
			},
			{
				type: 'practice',
				questionNumber: 3,
				inputType: 'multiple',
				question: 'How do you say "There" in Spanish?',
				options: ['Aquí', 'Allí', 'Dónde', 'Lejos'],
				correct: 1,
				correctExplanation: 'Great! "Allí" means "there".',
				wrongExplanation: 'Not quite right. "Allí" means "there".'
			},
			{
				type: 'practice',
				questionNumber: 4,
				inputType: 'multiple',
				question: 'How do you say "Left" in Spanish?',
				options: ['Derecha', 'Izquierda', 'Recto', 'Atrás'],
				correct: 1,
				correctExplanation: 'Great! "Izquierda" means left.',
				wrongExplanation: 'Not quite right. "Izquierda" means left.'
			},
			{
				type: 'practice',
				questionNumber: 5,
				inputType: 'multiple',
				question: 'How do you say "Right" in Spanish?',
				options: ['Izquierda', 'Derecha', 'Recto', 'Atrás'],
				correct: 1,
				correctExplanation: 'Perfect! "Derecha" means right.',
				wrongExplanation: 'Not quite right. "Derecha" means right.'
			},
			{
				type: 'practice',
				questionNumber: 6,
				inputType: 'multiple',
				question: 'How do you say "Straight" in Spanish?',
				options: ['Izquierda', 'Derecha', 'Recto', 'Vuelta'],
				correct: 2,
				correctExplanation: 'Excellent! "Recto" means straight ahead.',
				wrongExplanation: 'Not quite right. "Recto" means straight ahead.'
			},
			{
				type: 'practice',
				questionNumber: 7,
				inputType: 'multiple',
				question: 'How do you say "Street" in Spanish?',
				options: ['Casa', 'Calle', 'Carro', 'Campo'],
				correct: 1,
				correctExplanation: 'Great! "Calle" means street.',
				wrongExplanation: 'Not quite right. "Calle" means street.'
			},
			{
				type: 'practice',
				questionNumber: 8,
				inputType: 'multiple',
				question: 'How do you say "Hotel" in Spanish?',
				options: ['Casa', 'Hotel', 'Restaurante', 'Tienda'],
				correct: 1,
				correctExplanation: 'Perfect! "Hotel" is the same in Spanish.',
				wrongExplanation: 'Not quite right. "Hotel" is the same in Spanish.'
			},
			{
				type: 'practice',
				questionNumber: 9,
				inputType: 'multiple',
				question: 'How do you say "Restaurant" in Spanish?',
				options: ['Hotel', 'Restaurante', 'Mercado', 'Hospital'],
				correct: 1,
				correctExplanation: 'Excellent! "Restaurante" means restaurant.',
				wrongExplanation: 'Not quite right. "Restaurante" means restaurant.'
			},
			{
				type: 'practice',
				questionNumber: 10,
				inputType: 'multiple',
				question: 'How do you say "Bus" in Spanish?',
				options: ['Autobús', 'Taxi', 'Tren', 'Carro'],
				correct: 0,
				correctExplanation: 'Perfect! "Autobús" means bus.',
				wrongExplanation: 'Not quite right. "Autobús" means bus.'
			},
			{
				type: 'practice',
				questionNumber: 11,
				inputType: 'multiple',
				question: 'How do you say "Taxi" in Spanish?',
				options: ['Autobús', 'Taxi', 'Tren', 'Carro'],
				correct: 1,
				correctExplanation: 'Excellent! "Taxi" is the same in Spanish.',
				wrongExplanation: 'Not quite right. "Taxi" is the same in Spanish.'
			},
			{
				type: 'practice',
				questionNumber: 12,
				inputType: 'multiple',
				question: 'How do you say "Train" in Spanish?',
				options: ['Autobús', 'Taxi', 'Tren', 'Avión'],
				correct: 2,
				correctExplanation: 'Perfect! "Tren" means train.',
				wrongExplanation: 'Not quite right. "Tren" means train.'
			},
			{
				type: 'practice',
				questionNumber: 13,
				inputType: 'multiple',
				question: 'How do you say "Airport" in Spanish?',
				options: ['Hospital', 'Aeropuerto', 'Hotel', 'Estación'],
				correct: 1,
				correctExplanation: 'Great! "Aeropuerto" means airport.',
				wrongExplanation: 'Not quite right. "Aeropuerto" means airport.'
			},
			{
				type: 'practice',
				questionNumber: 14,
				inputType: 'application',
				question: 'How do you ask "Where is the bus?" in Spanish?',
				correctAnswer: 'donde esta el autobus',
				correctExplanation: 'Perfect! "¿Dónde está el autobús?" - essential for public transportation!',
				wrongExplanation: 'Remember: "¿Dónde está el autobús?" means "Where is the bus?"'
			},
			{
				type: 'practice',
				questionNumber: 15,
				inputType: 'application',
				question: 'How do you ask "Where is the airport?" in Spanish?',
				correctAnswer: 'donde esta el aeropuerto',
				correctExplanation: 'Great! "¿Dónde está el aeropuerto?" - very useful for travelers!',
				wrongExplanation: 'Remember: "¿Dónde está el aeropuerto?" means "Where is the airport?"'
			},
			{
				type: 'completion',
				title: 'Congratulations! 🎉',
				content: 'You\'ve learned essential words for directions and places! Now you can navigate Spanish-speaking areas with confidence.',
				nextLesson: 'Next: Learn numbers - super useful for prices, addresses, and time!'
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
		lessonScores['spanish-phase1-directions'] = { score: `${correctAnswers}/${totalQuestions}`, percentage };
		localStorage.setItem('lessonScores', JSON.stringify(lessonScores));
		
		goto('/dashboard');
	}
	
	$: scorePercentage = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;

	$: currentStepData = lessonContent.steps[currentStep];
</script>

<svelte:head>
	<title>Spanish Phase 1: Directions & Places - LangLearner</title>
	<meta name="description" content="Learn essential Spanish words for directions and places" />
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
					<div class="bg-blue-600 h-2 rounded-full transition-all duration-300" style="width: {((currentStep + 1) / lessonContent.steps.length) * 100}%"></div>
				</div>
			</div>

			<div class="bg-white p-8 rounded-lg shadow-lg">
				
				{#if currentStepData.type === 'teaching'}
					<div class="text-center">
						<div class="text-4xl mb-4">🧭</div>
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
									💡 Hint - Vocabulary Reference:
								</h4>
								<p class="text-yellow-700 mb-3">
									Think about directions you use when giving someone directions in English. Check the vocabulary table below:
								</p>
								<div class="bg-white rounded p-3 max-h-48 overflow-y-auto">
									<table class="w-full text-sm">
										<thead>
											<tr class="border-b border-yellow-200">
												<th class="py-1 px-2 text-left font-medium text-yellow-800">English</th>
												<th class="py-1 px-2 text-left font-medium text-yellow-800">Spanish</th>
											</tr>
										</thead>
										<tbody>
											{#each lessonContent.steps[0].vocabTable || [] as vocab}
												<tr class="border-b border-yellow-100">
													<td class="py-1 px-2 text-yellow-600">{vocab.english}</td>
													<td class="py-1 px-2 font-medium text-yellow-900">{vocab.spanish}</td>
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
						<div class="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-6">
							<h3 class="text-xl font-semibold text-blue-900 mb-2">Your Score</h3>
							<div class="text-3xl font-bold text-blue-600 mb-2">{correctAnswers}/{totalQuestions}</div>
							<div class="text-lg text-blue-700">{scorePercentage}% Correct</div>
						</div>
						
						<p class="text-gray-600 mb-8">{currentStepData.nextLesson}</p>
						<button 
							on:click={completeLesson}
							class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium text-lg transition-colors"
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
							class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
							disabled={!showFeedback}
						>
							{currentStep === lessonContent.steps.length - 2 ? 'Complete Lesson' : 'Continue'}
						</button>
					{:else if currentStepData.type !== 'completion'}
						<button 
							on:click={nextStep}
							class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
						>
							Continue
						</button>
					{:else}
						<button 
							on:click={completeLesson}
							class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
						>
							Return to Dashboard
						</button>
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>