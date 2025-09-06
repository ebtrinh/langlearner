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
	
	// Lesson 3: Specific Subjects
	const lesson3Content = {
		title: 'Specific Subjects & Names',
		steps: [
			{
				type: 'teaching',
				title: 'Real People and Groups',
				content: 'Now we\'ll practice with real names and specific groups like "my family" or "my brothers". These work just like él/ella (for names) and ellos/ellas (for groups).',
				examples: [
					{ 
						subject: 'Pablo', 
						verb: 'hablar',
						form: 'Pablo habla', 
						translation: 'Pablo speaks',
						note: 'Names work like él/ella - use the él/ella form'
					},
					{ 
						subject: 'Mi familia', 
						verb: 'comer',
						form: 'Mi familia come', 
						translation: 'My family eats',
						note: 'Family = group, so use él/ella form (singular)'
					},
					{ 
						subject: 'Mis hermanos', 
						verb: 'vivir',
						form: 'Mis hermanos viven', 
						translation: 'My brothers live',
						note: 'Brothers = multiple people, so use ellos/ellas form'
					}
				],
				rule: 'Names and singular groups = él/ella form. Plural groups = ellos/ellas form!'
			},
			// Multiple Choice Questions (1-4)
			{
				type: 'practice',
				questionNumber: 1,
				inputType: 'multiple',
				title: 'Multiple Choice Practice',
				question: 'What form does "Pablo habla" use?',
				options: ['yo form', 'tú form', 'él/ella form'],
				correct: 2,
				correctExplanation: 'Correct! Pablo is a name, so we use the él/ella form.',
				wrongExplanation: 'Names like Pablo work like él/ella - use the él/ella form.',
				alternativeQuestion: 'What form does "María come" use?',
				alternativeOptions: ['yo form', 'él/ella form', 'ellos/ellas form'],
				alternativeCorrect: 1
			},
			{
				type: 'practice',
				questionNumber: 2,
				inputType: 'multiple',
				title: 'Multiple Choice Practice',
				question: 'How do you say "My family speaks"? (mi familia + hablar)',
				options: ['Mi familia hablan', 'Mi familia habla', 'Mi familia hablo'],
				correct: 1,
				correctExplanation: 'Perfect! "Mi familia habla" - family is singular, so use él/ella form.',
				wrongExplanation: 'Family is one group (singular), so use the él/ella form.',
				alternativeQuestion: 'How do you say "My mom eats"? (mi mamá + comer)',
				alternativeOptions: ['Mi mamá como', 'Mi mamá come', 'Mi mamá comes'],
				alternativeCorrect: 1
			},
			{
				type: 'practice',
				questionNumber: 3,
				inputType: 'multiple',
				title: 'Multiple Choice Practice',
				question: 'How do you say "My brothers live"? (mis hermanos + vivir)',
				options: ['Mis hermanos vive', 'Mis hermanos viven', 'Mis hermanos vivo'],
				correct: 1,
				correctExplanation: 'Excellent! "Mis hermanos viven" - brothers is plural, so use ellos/ellas form.',
				wrongExplanation: 'Brothers is plural (multiple people), so use the ellos/ellas form.',
				alternativeQuestion: 'How do you say "My friends eat"? (mis amigos + comer)',
				alternativeOptions: ['Mis amigos comen', 'Mis amigos come', 'Mis amigos como'],
				alternativeCorrect: 0
			},
			{
				type: 'practice',
				questionNumber: 4,
				inputType: 'multiple',
				title: 'Multiple Choice Practice',
				question: 'How do you say "Pepe and I walk"? (Pepe y yo + caminar)',
				options: ['Pepe y yo camino', 'Pepe y yo caminamos', 'Pepe y yo camina'],
				correct: 1,
				correctExplanation: 'Great! "Pepe y yo caminamos" - Pepe and I = we, so use nosotros form.',
				wrongExplanation: 'Pepe and I = we (nosotros), so use the nosotros form.',
				alternativeQuestion: 'How do you say "Ana and I eat"? (Ana y yo + comer)',
				alternativeOptions: ['Ana y yo comemos', 'Ana y yo come', 'Ana y yo como'],
				alternativeCorrect: 0
			},
			// Typed Questions (5-8)
			{
				type: 'practice',
				questionNumber: 5,
				inputType: 'typed',
				title: 'Type the Answer',
				question: 'How do you say "Carlos speaks"? (Carlos + hablar)',
				correctAnswer: 'carlos habla',
				correctExplanation: 'Perfect! "Carlos habla" - names use the él/ella form.',
				wrongExplanation: 'Remember: names like Carlos use the él/ella form (habla).',
				alternativeQuestion: 'How do you say "Sofia runs"? (Sofia + correr)',
				alternativeAnswer: 'sofia corre'
			},
			{
				type: 'practice',
				questionNumber: 6,
				inputType: 'typed',
				title: 'Type the Answer',
				question: 'How do you say "My family eats"? (mi familia + comer)',
				correctAnswer: 'mi familia come',
				correctExplanation: 'Excellent! "Mi familia come" - family is one group (singular).',
				wrongExplanation: 'Remember: mi familia is singular, so use the él/ella form (come).',
				alternativeQuestion: 'How do you say "My team plays"? (mi equipo + jugar)',
				alternativeAnswer: 'mi equipo juega'
			},
			{
				type: 'practice',
				questionNumber: 7,
				inputType: 'typed',
				title: 'Type the Answer',
				question: 'How do you say "My sisters dance"? (mis hermanas + bailar)',
				correctAnswer: 'mis hermanas bailan',
				correctExplanation: 'Great job! "Mis hermanas bailan" - sisters is plural.',
				wrongExplanation: 'Remember: mis hermanas is plural, so use the ellos/ellas form (bailan).',
				alternativeQuestion: 'How do you say "My parents work"? (mis padres + trabajar)',
				alternativeAnswer: 'mis padres trabajan'
			},
			{
				type: 'practice',
				questionNumber: 8,
				inputType: 'typed',
				title: 'Type the Answer',
				question: 'How do you say "Luis and I study"? (Luis y yo + estudiar)',
				correctAnswer: 'luis y yo estudiamos',
				correctExplanation: 'Perfect! "Luis y yo estudiamos" - Luis and I = we (nosotros).',
				wrongExplanation: 'Remember: Luis y yo = nosotros, so use the nosotros form (estudiamos).',
				alternativeQuestion: 'How do you say "Rosa and I live"? (Rosa y yo + vivir)',
				alternativeAnswer: 'rosa y yo vivimos'
			},
			// Application Questions (9-10)
			{
				type: 'practice',
				questionNumber: 9,
				inputType: 'application',
				title: 'Real World Application',
				question: 'How do you say "My mom speaks Spanish"? (mi mamá + hablar + español)',
				correctAnswer: 'mi mama habla español',
				correctExplanation: 'Excellent! "Mi mamá habla español" - perfect for talking about family!',
				wrongExplanation: 'Remember: mi mamá uses the él/ella form (habla) + español.',
				alternativeQuestion: 'How do you say "My dad works here"? (mi papá + trabajar + aquí)',
				alternativeAnswer: 'mi papa trabaja aqui'
			},
			{
				type: 'practice',
				questionNumber: 10,
				inputType: 'application',
				title: 'Real World Application',
				question: 'How do you say "My friends and I eat tacos"? (mis amigos y yo + comer + tacos)',
				correctAnswer: 'mis amigos y yo comemos tacos',
				correctExplanation: 'Perfect! "Mis amigos y yo comemos tacos" - great for talking about activities!',
				wrongExplanation: 'Remember: mis amigos y yo = nosotros, so use comemos + tacos.',
				alternativeQuestion: 'How do you say "My sister and I study Spanish"? (mi hermana y yo + estudiar + español)',
				alternativeAnswer: 'mi hermana y yo estudiamos español'
			},
			{
				type: 'completion',
				title: 'Lesson Complete! 🎉',
				content: 'You\'ve mastered talking about specific people and groups! Now you can describe what your family, friends, and others do.',
				mastered: [
					'Names and specific people (Pablo habla)',
					'Singular groups (mi familia come)',
					'Plural groups (mis hermanos viven)', 
					'You + others (Pepe y yo caminamos)'
				],
				nextLesson: 'Next: Learn essential travel verbs and common travel situations'
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
		if (currentStep < lesson3Content.steps.length - 1) {
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
	}
	
	function toggleHint() {
		showHint = !showHint;
	}
	
	function completeLesson() {
		// Mark lesson as complete and return to dashboard
		goto('/dashboard');
	}
	
	$: currentStepData = lesson3Content.steps[currentStep];
</script>

<svelte:head>
	<title>Lesson 3: {lesson3Content.title} - LangLearner</title>
	<meta name="description" content="Learn to talk about specific people and groups" />
</svelte:head>

<div class="min-h-screen bg-gray-50">
	<div class="container mx-auto px-4 py-8">
		<div class="max-w-2xl mx-auto">
			<!-- Progress Bar -->
			<div class="mb-8">
				<div class="flex justify-between items-center mb-2">
					<span class="text-sm text-gray-600">Lesson 3: {lesson3Content.title}</span>
					<span class="text-sm text-gray-600">{currentStep + 1} of {lesson3Content.steps.length}</span>
				</div>
				<div class="bg-gray-200 rounded-full h-2">
					<div class="bg-blue-600 h-2 rounded-full transition-all duration-300" style="width: {((currentStep + 1) / lesson3Content.steps.length) * 100}%"></div>
				</div>
			</div>
			
			<!-- Lesson Content -->
			<div class="bg-white p-8 rounded-lg shadow-lg">
				{#if currentStepData.type === 'teaching'}
					<h1 class="text-3xl font-bold text-gray-900 mb-6">{currentStepData.title}</h1>
					<p class="text-lg text-gray-700 mb-8">{currentStepData.content}</p>
					
					<!-- Examples -->
					<div class="bg-blue-50 p-6 rounded-lg mb-6">
						<h3 class="text-xl font-semibold text-blue-900 mb-4">Examples:</h3>
						<div class="space-y-4">
							{#each currentStepData.examples || [] as example}
								<div class="bg-white p-4 rounded-lg">
									<div class="flex items-center justify-between mb-2">
										<span class="text-lg font-medium text-gray-900">{example.subject} + {example.verb}</span>
									</div>
									<div class="flex items-center justify-between mb-2">
										<span class="text-xl font-bold text-blue-600">{example.form}</span>
										<span class="text-blue-800">{example.translation}</span>
									</div>
									<div class="text-sm text-gray-600">{example.note}</div>
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
							<h3 class="font-semibold text-yellow-800 mb-3">💡 Subject Guide:</h3>
							<div class="space-y-3 text-sm">
								<div class="bg-white p-3 rounded">
									<h4 class="font-semibold text-blue-700 mb-2">Names & Singular Groups</h4>
									<p class="mb-2">Use <strong>él/ella form</strong>:</p>
									<div class="text-xs space-y-1">
										<div>• Pablo, María, Carlos → -a/-e ending</div>
										<div>• mi familia, mi mamá, mi equipo → -a/-e ending</div>
									</div>
								</div>
								<div class="bg-white p-3 rounded">
									<h4 class="font-semibold text-green-700 mb-2">Plural Groups</h4>
									<p class="mb-2">Use <strong>ellos/ellas form</strong>:</p>
									<div class="text-xs space-y-1">
										<div>• mis hermanos, mis amigos → -an/-en ending</div>
										<div>• mis padres, mis hermanas → -an/-en ending</div>
									</div>
								</div>
								<div class="bg-white p-3 rounded">
									<h4 class="font-semibold text-purple-700 mb-2">You + Others</h4>
									<p class="mb-2">Use <strong>nosotros form</strong>:</p>
									<div class="text-xs space-y-1">
										<div>• Pablo y yo, María y yo → -amos/-emos/-imos</div>
									</div>
								</div>
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
								{currentStep === lesson3Content.steps.length - 2 ? 'Complete Lesson' : 'Continue'}
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
