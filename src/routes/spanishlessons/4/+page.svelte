<script lang="ts" context="module">
	// Declare gtag function for TypeScript
	declare function gtag(command: string, targetId: string | Date, config?: Record<string, any>): void;
</script>

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
	
	// Lesson 4: Ser vs Estar (Es vs Está)
	const lesson4Content = {
		title: 'Es vs Está: The Two Ways to Say "Is"',
		steps: [
			{
				type: 'teaching',
				title: 'Understanding "Es" vs "Está"',
				content: 'Spanish has two ways to say "is" - ES and ESTÁ. This might seem confusing, but there\'s a simple pattern: ES is for permanent things (identity, characteristics), ESTÁ is for temporary things (location, feelings, states).',
				examples: [
					{ 
						type: 'es',
						spanish: 'Pablo es alto',
						english: 'Pablo is tall',
						pronunciation: 'PAH-bloh ehs AHL-toh',
						explanation: 'Height is permanent - use ES'
					},
					{ 
						type: 'esta',
						spanish: 'Pablo está aquí',
						english: 'Pablo is here',
						pronunciation: 'PAH-bloh es-TAH ah-KEE',
						explanation: 'Location can change - use ESTÁ'
					},
					{ 
						type: 'es',
						spanish: 'Ella es doctora',
						english: 'She is a doctor',
						pronunciation: 'EH-yah ehs dok-TOH-rah',
						explanation: 'Job/profession - use ES'
					},
					{ 
						type: 'esta',
						spanish: 'Ella está feliz',
						english: 'She is happy',
						pronunciation: 'EH-yah es-TAH feh-LEES',
						explanation: 'Emotions/feelings change - use ESTÁ'
					}
				],
				rule: 'ES = permanent (who you are, what you\'re like). ESTÁ = temporary (where you are, how you feel).'
			},
			// Multiple Choice Questions (1-4)
			{
				type: 'practice',
				questionNumber: 1,
				inputType: 'multiple',
				title: 'Multiple Choice Practice',
				question: 'How do you say "She is a teacher"? (ella + ser + maestra)',
				options: ['Ella está maestra', 'Ella es maestra', 'Ella son maestra'],
				correct: 1,
				correctExplanation: 'Correct! "Ella es maestra" (EH-yah ehs mah-EHS-trah) - profession is permanent, use ES.',
				wrongExplanation: 'Profession is permanent - use ES (ella es maestra).',
				alternativeQuestion: 'How do you say "He is a student"? (él + ser + estudiante)',
				alternativeOptions: ['Él está estudiante', 'Él es estudiante', 'Él son estudiante'],
				alternativeCorrect: 1
			},
			{
				type: 'practice',
				questionNumber: 2,
				inputType: 'multiple',
				title: 'Multiple Choice Practice',
				question: 'How do you say "The food is here"? (la comida + estar + aquí)',
				options: ['La comida es aquí', 'La comida está aquí', 'La comida son aquí'],
				correct: 1,
				correctExplanation: 'Perfect! "La comida está aquí" (lah koh-MEE-dah es-TAH ah-KEE) - location uses ESTÁ.',
				wrongExplanation: 'Location (where something is) uses ESTÁ.',
				alternativeQuestion: 'How do you say "My mom is in Mexico"? (mi mamá + estar + en México)',
				alternativeOptions: ['Mi mamá es en México', 'Mi mamá está en México', 'Mi mamá son en México'],
				alternativeCorrect: 1
			},
			{
				type: 'practice',
				questionNumber: 3,
				inputType: 'multiple',
				title: 'Multiple Choice Practice',
				question: 'How do you say "I am tired"? (yo + estar + cansado)',
				options: ['Yo soy cansado', 'Yo estoy cansado', 'Yo es cansado'],
				correct: 1,
				correctExplanation: 'Excellent! "Yo estoy cansado" (yoh es-TOY kahn-SAH-doh) - feelings are temporary, use ESTOY.',
				wrongExplanation: 'Feelings and emotions are temporary - use ESTOY (yo estoy cansado).',
				alternativeQuestion: 'How do you say "We are happy"? (nosotros + estar + felices)',
				alternativeOptions: ['Nosotros somos felices', 'Nosotros estamos felices', 'Nosotros es felices'],
				alternativeCorrect: 1
			},
			{
				type: 'practice',
				questionNumber: 4,
				inputType: 'multiple',
				title: 'Multiple Choice Practice',
				question: 'How do you say "The car is blue"? (el carro + ser + azul)',
				options: ['El carro está azul', 'El carro es azul', 'El carro estoy azul'],
				correct: 1,
				correctExplanation: 'Great! "El carro es azul" (ehl KAH-rroh ehs ah-SOOL) - color is permanent, use ES.',
				wrongExplanation: 'Colors and permanent characteristics use ES.',
				alternativeQuestion: 'How do you say "The house is big"? (la casa + ser + grande)',
				alternativeOptions: ['La casa está grande', 'La casa es grande', 'La casa estoy grande'],
				alternativeCorrect: 1
			},
			// Typed Questions (5-8)
			{
				type: 'practice',
				questionNumber: 5,
				inputType: 'typed',
				title: 'Type the Answer',
				question: 'How do you say "I am in the hospital"? (yo + estar + en el hospital)',
				correctAnswer: 'yo estoy en el hospital',
				correctExplanation: 'Perfect! "Yo estoy en el hospital" (yoh es-TOY ehn ehl ohs-pee-TAHL) - location uses ESTOY.',
				wrongExplanation: 'Remember: location uses ESTAR - yo estoy en el hospital.',
				alternativeQuestion: 'How do you say "You are at home"? (tú + estar + en casa)',
				alternativeAnswer: 'tu estas en casa'
			},
			{
				type: 'practice',
				questionNumber: 6,
				inputType: 'typed',
				title: 'Type the Answer',
				question: 'How do you say "My sister is intelligent"? (mi hermana + ser + inteligente)',
				correctAnswer: 'mi hermana es inteligente',
				correctExplanation: 'Excellent! "Mi hermana es inteligente" (mee er-MAH-nah ehs een-teh-lee-HEN-teh) - personality traits use ES.',
				wrongExplanation: 'Remember: permanent characteristics use SER - mi hermana es inteligente.',
				alternativeQuestion: 'How do you say "My dad is tall"? (mi papá + ser + alto)',
				alternativeAnswer: 'mi papa es alto'
			},
			{
				type: 'practice',
				questionNumber: 7,
				inputType: 'typed',
				title: 'Type the Answer',
				question: 'How do you say "We are nervous"? (nosotros + estar + nerviosos)',
				correctAnswer: 'nosotros estamos nerviosos',
				correctExplanation: 'Great job! "Nosotros estamos nerviosos" (noh-SOH-trohs es-TAH-mohs ner-vee-OH-sohs) - emotions use ESTAR.',
				wrongExplanation: 'Remember: emotions and feelings use ESTAR - nosotros estamos nerviosos.',
				alternativeQuestion: 'How do you say "They are angry"? (ellos + estar + enojados)',
				alternativeAnswer: 'ellos estan enojados'
			},
			{
				type: 'practice',
				questionNumber: 8,
				inputType: 'typed',
				title: 'Type the Answer',
				question: 'How do you say "The book is interesting"? (el libro + ser + interesante)',
				correctAnswer: 'el libro es interesante',
				correctExplanation: 'Perfect! "El libro es interesante" (ehl LEE-broh ehs een-teh-reh-SAHN-teh) - characteristics use ES.',
				wrongExplanation: 'Remember: permanent qualities use SER - el libro es interesante.',
				alternativeQuestion: 'How do you say "The movie is boring"? (la película + ser + aburrida)',
				alternativeAnswer: 'la pelicula es aburrida'
			},
			// Application Questions (9-10)
			{
				type: 'practice',
				questionNumber: 9,
				inputType: 'application',
				title: 'Real World Application',
				question: 'How do you say "I am a student and I am in class or the library"? (yo + ser + estudiante + y + yo + estar + en clase o en la biblioteca)',
				correctAnswer: 'yo soy estudiante y estoy en clase o en la biblioteca',
				correctExplanation: 'Excellent! "Yo soy estudiante y estoy en clase o en la biblioteca" (yoh soy es-too-dee-AHN-teh ee es-TOY ehn KLAH-seh oh ehn lah bee-blee-oh-TEH-kah) - perfect use of both with Y and O!',
				wrongExplanation: 'Remember: profession uses SOY, location uses ESTOY, connect with Y and O.',
				alternativeQuestion: 'How do you say "She is Mexican and she is in Spain or France"? (ella + ser + mexicana + y + estar + en España o Francia)',
				alternativeAnswer: 'ella es mexicana y esta en españa o francia'
			},
			{
				type: 'practice',
				questionNumber: 10,
				inputType: 'application',
				title: 'Real World Application',
				question: 'How do you say "My friends are funny but they are sad or tired today"? (mis amigos + ser + divertidos + PERO (but) + estar + tristes o cansados hoy)',
				correctAnswer: 'mis amigos son divertidos pero estan tristes o cansados hoy',
				correctExplanation: 'Perfect! "Mis amigos son divertidos pero están tristes o cansados hoy" (mees ah-MEE-gohs sohn dee-ver-TEE-dohs PEH-roh es-TAHN TREES-tehs oh kahn-SAH-dohs oy) - excellent use of SER/ESTAR with PERO (but) and O!',
				wrongExplanation: 'Remember: personality uses SON, current emotions use ESTÁN, connect with PERO and O.',
				alternativeQuestion: 'How do you say "The food is delicious and it is hot or cold"? (la comida + ser + deliciosa + y + estar + caliente o fría)',
				alternativeAnswer: 'la comida es deliciosa y esta caliente o fria'
			},
			{
				type: 'completion',
				title: 'Lesson Complete! 🎉',
				content: 'You\'ve mastered one of the most important concepts in Spanish! Now you know when to use ES vs ESTÁ.',
				mastered: [
					'SER (es, soy, son) for permanent things: identity, profession, characteristics',
					'ESTAR (está, estoy, están) for temporary things: location, emotions, states',
					'Real-world applications combining both verbs',
					'Key vocabulary for descriptions and feelings'
				],
				nextLesson: 'Next: Learn essential travel vocabulary and practical phrases for your trip'
			}
		]
	};
	
	onMount(() => {
		// Analytics: Track lesson start
		gtag('event', 'lesson_started', {
			'lesson_type': 'spanish_lesson_4',
			'lesson_title': 'Es vs Está',
			'lesson_category': 'grammar'
		});

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
		if (currentStep < lesson4Content.steps.length - 1) {
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
		const messages = ['¡Perfecto! 🎉', '¡Excelente! ⭐', '¡Muy bien! 👏', '¡Fantástico! 🌟', '¡Increíble! 🚀', '¡Genial! ✨'];
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
		// Analytics: Track lesson completion
		gtag('event', 'lesson_completed', {
			'lesson_type': 'spanish_lesson_4',
			'lesson_title': 'Es vs Está',
			'lesson_category': 'grammar'
		});

		// Save lesson completion to localStorage
		const lessonScores = JSON.parse(localStorage.getItem('lessonScores') || '{}');
		lessonScores['spanish-4'] = { 
			score: '10/10', 
			percentage: 100,
			type: 'grammar',
			title: 'Es vs Está'
		};
		localStorage.setItem('lessonScores', JSON.stringify(lessonScores));

		goto('/dashboard');
	}
	
	$: currentStepData = lesson4Content.steps[currentStep];
</script>

<svelte:head>
	<title>Lesson 4: {lesson4Content.title} - LangLearner</title>
	<meta name="description" content="Learn the difference between es and está in Spanish" />
</svelte:head>

<div class="min-h-screen bg-gray-50">
	<div class="container mx-auto px-4 py-8">
		<div class="max-w-2xl mx-auto">
			<!-- Progress Bar -->
			<div class="mb-8">
				<div class="flex justify-between items-center mb-2">
					<span class="text-sm text-gray-600">Lesson 4: {lesson4Content.title}</span>
					<span class="text-sm text-gray-600">{currentStep + 1} of {lesson4Content.steps.length}</span>
				</div>
				<div class="bg-gray-200 rounded-full h-2">
					<div class="bg-blue-600 h-2 rounded-full transition-all duration-300" style="width: {((currentStep + 1) / lesson4Content.steps.length) * 100}%"></div>
				</div>
			</div>
			
			<!-- Celebration Pop-up -->
			{#if showCelebration}
				<div class="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white px-8 py-4 rounded-full shadow-lg animate-bounce">
					<div class="text-xl font-bold text-center">{celebrationMessage}</div>
				</div>
			{/if}

			<!-- Lesson Content -->
			<div class="bg-white p-8 rounded-lg shadow-lg relative overflow-hidden">
				<!-- Progress celebration effects -->
				{#if currentStep >= 3}
					<div class="absolute top-0 right-0 text-6xl opacity-10 pointer-events-none">🎯</div>
				{/if}
				{#if currentStep >= 6}
					<div class="absolute bottom-0 left-0 text-6xl opacity-10 pointer-events-none">⭐</div>
				{/if}
				{#if currentStepData.type === 'teaching'}
					<h1 class="text-3xl font-bold text-gray-900 mb-6">{currentStepData.title}</h1>
					<p class="text-lg text-gray-700 mb-8">{currentStepData.content}</p>
					
					<!-- Examples -->
					<div class="bg-blue-50 p-6 rounded-lg mb-6">
						<h3 class="text-xl font-semibold text-blue-900 mb-4">Examples:</h3>
						<div class="space-y-4">
							{#each currentStepData.examples || [] as example}
								<div class="bg-white p-4 rounded-lg border-l-4 {example.type === 'es' ? 'border-green-400' : 'border-purple-400'}">
									<div class="flex items-center justify-between mb-2">
										<span class="text-lg font-bold {example.type === 'es' ? 'text-green-600' : 'text-purple-600'}">{example.spanish}</span>
										<span class="text-sm {example.type === 'es' ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'} px-2 py-1 rounded">{example.type.toUpperCase()}</span>
									</div>
									<div class="text-blue-800 mb-1">{example.english}</div>
									<div class="text-sm text-gray-600 mb-2">Pronunciation: {example.pronunciation}</div>
									<div class="text-sm {example.type === 'es' ? 'text-green-700' : 'text-purple-700'} font-medium">{example.explanation}</div>
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
							<h3 class="font-semibold text-yellow-800 mb-3">💡 ES vs ESTÁ Quick Guide:</h3>
							<div class="grid grid-cols-2 gap-4 text-sm">
								<div class="bg-green-100 p-3 rounded">
									<h4 class="font-semibold text-green-700 mb-2">Use ES (SER) for:</h4>
									<div class="space-y-1 text-xs">
										<div>• <strong>Identity:</strong> Soy Pablo</div>
										<div>• <strong>Profession:</strong> Es doctora</div>
										<div>• <strong>Characteristics:</strong> Es alto</div>
										<div>• <strong>Nationality:</strong> Es mexicano</div>
										<div>• <strong>Permanent traits:</strong> Es inteligente</div>
									</div>
								</div>
								<div class="bg-purple-100 p-3 rounded">
									<h4 class="font-semibold text-purple-700 mb-2">Use ESTÁ (ESTAR) for:</h4>
									<div class="space-y-1 text-xs">
										<div>• <strong>Location:</strong> Está aquí</div>
										<div>• <strong>Emotions:</strong> Está feliz</div>
										<div>• <strong>States:</strong> Está cansado</div>
										<div>• <strong>Temporary conditions:</strong> Está enfermo</div>
										<div>• <strong>Current situation:</strong> Está ocupado</div>
									</div>
								</div>
							</div>
							<div class="mt-3 p-2 bg-blue-100 rounded text-xs">
								<strong>Memory trick:</strong> If it can change easily (location, feelings), use ESTÁ. If it's who/what someone IS, use ES.
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
								{currentStep === lesson4Content.steps.length - 2 ? 'Complete Lesson' : 'Continue'}
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
