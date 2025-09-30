<script lang="ts" context="module">
	// Declare gtag function for TypeScript
	declare function gtag(command: string, targetId: string | Date, config?: Record<string, any>): void;
</script>

<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let currentCardIndex = 0;
	let previousCardIndex = -1; // Track previous card to avoid repeats
	let isFlipped = false;
	
	// Knowledge levels: 0 = unknown, 1 = kind of known, 2 = known
	let cardKnowledge: { [key: number]: number } = {};
	
	// Initialize all cards as unknown (0)
	function initializeCardKnowledge() {
		for (let i = 0; i < lessonContent.flashcards.length; i++) {
			if (cardKnowledge[i] === undefined) {
				cardKnowledge[i] = 0;
			}
		}
	}

	// Spanish Phase 1: Essential Phrases Flashcards
	const lessonContent = {
		title: 'Essential Spanish Phrases',
		category: 'Essentials',
		description: 'Learn the most important words and phrases you\'ll need in any Spanish-speaking situation.',
		flashcards: [
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
	};

	// Card selection algorithm with group-based selection
	function selectNextCard(): number {
		// Separate cards into groups by knowledge level
		const unknownCards = [];
		const kindOfKnownCards = [];
		const knownCards = [];
		
		for (let i = 0; i < lessonContent.flashcards.length; i++) {
			// Skip the previous card to avoid repeats (unless it's the only option)
			if (i === previousCardIndex && lessonContent.flashcards.length > 1) {
				continue;
			}
			
			const knowledge = cardKnowledge[i] || 0;
			if (knowledge === 0) unknownCards.push(i);
			else if (knowledge === 1) kindOfKnownCards.push(i);
			else knownCards.push(i);
		}
		
		// Group selection weights (higher = more likely to be selected)
		const groupWeights = [
			{ group: unknownCards, weight: 50 },      // Highest priority
			{ group: kindOfKnownCards, weight: 30 },  // Medium priority  
			{ group: knownCards, weight: 20 }         // Lowest priority
		];
		
		// Filter out empty groups
		const availableGroups = groupWeights.filter(g => g.group.length > 0);
		
		// If no available groups (shouldn't happen), fallback
		if (availableGroups.length === 0) {
			let fallbackIndex;
			do {
				fallbackIndex = Math.floor(Math.random() * lessonContent.flashcards.length);
			} while (fallbackIndex === previousCardIndex && lessonContent.flashcards.length > 1);
			return fallbackIndex;
		}
		
		// Create weighted array of groups
		const groupSelection = [];
		for (const groupData of availableGroups) {
			for (let i = 0; i < groupData.weight; i++) {
				groupSelection.push(groupData.group);
			}
		}
		
		// Select a random group based on weights
		const selectedGroup = groupSelection[Math.floor(Math.random() * groupSelection.length)];
		
		// Select a random card from the chosen group
		return selectedGroup[Math.floor(Math.random() * selectedGroup.length)];
	}

	// Track lesson start
	onMount(() => {
		gtag('event', 'lesson_started', {
			'lesson_type': 'spanish_essentials',
			'lesson_category': 'flashcards',
			'total_cards': lessonContent.flashcards.length
		});
	});

	$: {
		initializeCardKnowledge();
		// Initialize first card selection if it's the first time
		if (currentCardIndex === 0 && Object.keys(cardKnowledge).length > 0) {
			currentCardIndex = selectNextCard();
		}
	}
	$: currentCard = lessonContent.flashcards[currentCardIndex];
	$: unknownCount = Object.values(cardKnowledge).filter(level => level === 0).length;
	$: kindOfKnownCount = Object.values(cardKnowledge).filter(level => level === 1).length;
	$: knownCount = Object.values(cardKnowledge).filter(level => level === 2).length;
	$: progress = (knownCount / lessonContent.flashcards.length) * 100;
	$: allCardsKnown = knownCount === lessonContent.flashcards.length;

	function flipCard() {
		isFlipped = !isFlipped;
		
		// Analytics: Track card flips
		gtag('event', 'flashcard_flip', {
			'lesson_type': 'spanish_essentials',
			'card_index': currentCardIndex,
			'card_english': currentCard.english,
			'card_spanish': currentCard.spanish,
			'flip_to': isFlipped ? 'spanish' : 'english'
		});
	}

	function markAsCorrect() {
		const currentKnowledge = cardKnowledge[currentCardIndex] || 0;
		
		// Progress: unknown (0) -> kind of known (1) -> known (2)
		if (currentKnowledge < 2) {
			cardKnowledge[currentCardIndex] = currentKnowledge + 1;
		}
		
		// Analytics: Track correct answers
		gtag('event', 'flashcard_correct', {
			'lesson_type': 'spanish_essentials',
			'card_index': currentCardIndex,
			'card_english': currentCard.english,
			'card_spanish': currentCard.spanish,
			'previous_knowledge': currentKnowledge,
			'new_knowledge': cardKnowledge[currentCardIndex],
			'progress_percentage': Math.round(((knownCount + 1) / lessonContent.flashcards.length) * 100)
		});
		
		// Trigger reactivity
		cardKnowledge = cardKnowledge;
		nextCard();
	}

	function markAsIncorrect() {
		const currentKnowledge = cardKnowledge[currentCardIndex] || 0;
		
		// Regress: known (2) -> kind of known (1) -> unknown (0)
		if (currentKnowledge > 0) {
			cardKnowledge[currentCardIndex] = currentKnowledge - 1;
		}
		
		// Analytics: Track incorrect answers
		gtag('event', 'flashcard_incorrect', {
			'lesson_type': 'spanish_essentials',
			'card_index': currentCardIndex,
			'card_english': currentCard.english,
			'card_spanish': currentCard.spanish,
			'previous_knowledge': currentKnowledge,
			'new_knowledge': cardKnowledge[currentCardIndex],
			'progress_percentage': Math.round((knownCount / lessonContent.flashcards.length) * 100)
		});
		
		// Trigger reactivity  
		cardKnowledge = cardKnowledge;
		nextCard();
	}

	function nextCard() {
		previousCardIndex = currentCardIndex; // Store current as previous
		currentCardIndex = selectNextCard();
		isFlipped = false;
	}


	function resetProgress() {
		// Analytics: Track lesson reset
		gtag('event', 'lesson_reset', {
			'lesson_type': 'spanish_essentials',
			'cards_known_before_reset': knownCount,
			'cards_kind_of_known_before_reset': kindOfKnownCount,
			'progress_before_reset': Math.round(progress)
		});
		
		// Reset all cards to unknown
		cardKnowledge = {};
		initializeCardKnowledge();
		previousCardIndex = -1; // Reset previous card tracking
		currentCardIndex = selectNextCard();
		isFlipped = false;
	}

	function completeLesson() {
		const percentage = Math.round(progress);
		
		// Analytics: Track lesson completion
		gtag('event', 'lesson_completed', {
			'lesson_type': 'spanish_essentials',
			'lesson_category': 'flashcards',
			'final_score': `${knownCount}/${lessonContent.flashcards.length}`,
			'final_percentage': percentage,
			'cards_mastered': knownCount,
			'cards_kind_of_known': kindOfKnownCount,
			'cards_unknown': unknownCount,
			'completion_status': 'full_mastery'
		});
		
		// Save lesson completion to localStorage
		const lessonScores = JSON.parse(localStorage.getItem('lessonScores') || '{}');
		lessonScores['spanish-phase1-essentials'] = { 
			score: `${knownCount}/${lessonContent.flashcards.length}`, 
			percentage,
			type: 'flashcards',
			knowledge: cardKnowledge
		};
		localStorage.setItem('lessonScores', JSON.stringify(lessonScores));
		
		goto('/dashboard');
	}
</script>

<svelte:head>
	<title>Spanish Phase 1: Essential Phrases - LangLearner</title>
	<meta name="description" content="Learn essential Spanish phrases with flashcards" />
</svelte:head>

<div class="min-h-screen bg-gray-50">
	<div class="container mx-auto px-4 py-16">
		<div class="max-w-4xl mx-auto">
			<!-- Header -->
			<div class="text-center mb-8">
				<div class="text-4xl mb-4">🗣️</div>
				<h1 class="text-3xl font-bold text-gray-900 mb-2">{lessonContent.title}</h1>
				<p class="text-lg text-gray-600 mb-6">{lessonContent.description}</p>
				
				<!-- Progress Bar -->
				<div class="max-w-md mx-auto mb-6">
					<div class="flex justify-between text-sm text-gray-600 mb-2">
						<span>Progress</span>
						<span>{knownCount} of {lessonContent.flashcards.length} cards mastered</span>
					</div>
					<div class="bg-gray-200 rounded-full h-3 relative">
						<!-- Yellow bar (kind of known + known) -->
						<div 
							class="bg-yellow-400 h-3 rounded-full transition-all duration-300 absolute top-0 left-0" 
							style="width: {((kindOfKnownCount + knownCount) / lessonContent.flashcards.length) * 100}%"
						></div>
						<!-- Green bar (known only) on top -->
						<div 
							class="bg-green-600 h-3 rounded-full transition-all duration-300 absolute top-0 left-0" 
							style="width: {progress}%"
						></div>
					</div>
					
					<!-- Knowledge Level Breakdown -->
					<div class="flex justify-between text-xs text-gray-500 mt-2">
						<span class="text-red-600">Unknown: {unknownCount}</span>
						<span class="text-yellow-600">Kind of Known: {kindOfKnownCount}</span>
						<span class="text-green-600">Known: {knownCount}</span>
					</div>
				</div>
			</div>

			{#if allCardsKnown}
				<!-- Completion Screen -->
				<div class="bg-white p-8 rounded-lg shadow-lg text-center">
					<div class="text-6xl mb-4">🎉</div>
					<h2 class="text-3xl font-bold text-gray-900 mb-4">Congratulations!</h2>
					<p class="text-lg text-gray-700 mb-6">You've mastered all the essential Spanish phrases!</p>
					
					<div class="bg-green-50 border-2 border-green-200 rounded-lg p-6 mb-6">
						<h3 class="text-xl font-semibold text-green-900 mb-2">Your Progress</h3>
						<div class="text-3xl font-bold text-green-600 mb-2">{knownCount}/{lessonContent.flashcards.length}</div>
						<div class="text-lg text-green-700">100% Mastered</div>
					</div>

					<div class="flex justify-center gap-4">
						<button 
							on:click={resetProgress}
							class="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
						>
							Study Again
						</button>
						<button 
							on:click={completeLesson}
							class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
						>
							Return to Dashboard
						</button>
					</div>
				</div>
			{:else}
				<!-- Flashcard -->
				<div class="max-w-2xl mx-auto">
					<div class="relative">
						<div class="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-gray-200 transition-all duration-300 hover:border-green-300">
							<!-- Card Status -->
							<div class="bg-gray-100 px-6 py-3 border-b border-gray-200">
								<div class="flex justify-center items-center">
									<span class="text-sm font-medium {
										(cardKnowledge[currentCardIndex] || 0) === 0 ? 'text-red-600' : 
										(cardKnowledge[currentCardIndex] || 0) === 1 ? 'text-yellow-600' : 
										'text-green-600'
									}">
										{(cardKnowledge[currentCardIndex] || 0) === 0 ? '❓ Unknown' : 
										 (cardKnowledge[currentCardIndex] || 0) === 1 ? '🤔 Kind of Known' : 
										 '✅ Known'}
									</span>
								</div>
							</div>

							<!-- Flashcard Content -->
							<div 
								class="p-12 min-h-[300px] flex flex-col justify-center items-center cursor-pointer select-none"
								on:click={flipCard}
								on:keydown={(e) => e.key === ' ' && flipCard()}
								tabindex="0"
								role="button"
								aria-label="Flip flashcard"
							>
								{#if !isFlipped}
									<!-- Front: English -->
									<div class="text-center">
										<div class="text-sm text-gray-500 mb-2">English</div>
										<div class="text-2xl font-bold text-gray-900 mb-4">{currentCard.english}</div>
										<div class="text-sm text-gray-400 italic">Click to reveal Spanish</div>
									</div>
								{:else}
									<!-- Back: Spanish -->
									<div class="text-center">
										<div class="text-sm text-green-600 mb-2">Spanish</div>
										<div class="text-3xl font-bold text-green-700 mb-2">{currentCard.spanish}</div>
										<div class="text-lg text-gray-600 italic mb-4">{currentCard.pronunciation}</div>
										<div class="text-sm text-gray-400">Click to flip back</div>
									</div>
								{/if}
							</div>

							<!-- Action Buttons (only show when flipped) -->
							{#if isFlipped}
								<div class="bg-gray-50 px-6 py-4 border-t border-gray-200">
									<div class="flex justify-center gap-4">
										<button 
											on:click|stopPropagation={markAsIncorrect}
											class="bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-lg font-medium transition-colors border border-red-300"
										>
											❌ Got it Wrong
										</button>
										<button 
											on:click|stopPropagation={markAsCorrect}
											class="bg-green-100 hover:bg-green-200 text-green-700 px-4 py-2 rounded-lg font-medium transition-colors border border-green-300"
										>
											✅ Got it Right
										</button>
									</div>
								</div>
							{/if}
						</div>

						<!-- Back to Dashboard -->
						<div class="flex justify-center items-center mt-6">
							<a 
								href="/dashboard"
								class="text-gray-600 hover:text-gray-700 transition-colors"
							>
								← Back to Dashboard
							</a>
						</div>
					</div>

				</div>
			{/if}
		</div>
	</div>
</div>