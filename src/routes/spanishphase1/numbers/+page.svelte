<script lang="ts">
	import { goto } from '$app/navigation';

	let currentCardIndex = 0;
	let isFlipped = false;
	let completedCards = new Set();

	// Spanish Phase 1: Numbers Flashcards
	const lessonContent = {
		title: 'Numbers in Spanish',
		category: 'Numbers',
		description: 'Learn essential numbers for prices, time, and everyday counting.',
		flashcards: [
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
	};

	$: currentCard = lessonContent.flashcards[currentCardIndex];
	$: progress = ((completedCards.size) / lessonContent.flashcards.length) * 100;
	$: allCardsCompleted = completedCards.size === lessonContent.flashcards.length;

	function flipCard() {
		isFlipped = !isFlipped;
	}

	function markAsKnown() {
		completedCards.add(currentCardIndex);
		completedCards = completedCards;
		nextCard();
	}

	function markAsUnknown() {
		nextCard();
	}

	function nextCard() {
		if (currentCardIndex < lessonContent.flashcards.length - 1) {
			currentCardIndex++;
		} else {
			currentCardIndex = 0;
		}
		isFlipped = false;
	}

	function previousCard() {
		if (currentCardIndex > 0) {
			currentCardIndex--;
		} else {
			currentCardIndex = lessonContent.flashcards.length - 1;
		}
		isFlipped = false;
	}

	function goToCard(index: number) {
		currentCardIndex = index;
		isFlipped = false;
	}

	function resetProgress() {
		completedCards.clear();
		completedCards = completedCards;
		currentCardIndex = 0;
		isFlipped = false;
	}

	function completeLesson() {
		const lessonScores = JSON.parse(localStorage.getItem('lessonScores') || '{}');
		const percentage = Math.round((completedCards.size / lessonContent.flashcards.length) * 100);
		lessonScores['spanish-phase1-numbers'] = { 
			score: `${completedCards.size}/${lessonContent.flashcards.length}`, 
			percentage,
			type: 'flashcards'
		};
		localStorage.setItem('lessonScores', JSON.stringify(lessonScores));
		
		goto('/dashboard');
	}
</script>

<svelte:head>
	<title>Spanish Phase 1: Numbers - LangLearner</title>
	<meta name="description" content="Learn Spanish numbers with flashcards" />
</svelte:head>

<div class="min-h-screen bg-gray-50">
	<div class="container mx-auto px-4 py-16">
		<div class="max-w-4xl mx-auto">
			<!-- Header -->
			<div class="text-center mb-8">
				<div class="text-4xl mb-4">🔢</div>
				<h1 class="text-3xl font-bold text-gray-900 mb-2">{lessonContent.title}</h1>
				<p class="text-lg text-gray-600 mb-6">{lessonContent.description}</p>
				
				<!-- Progress Bar -->
				<div class="max-w-md mx-auto mb-6">
					<div class="flex justify-between text-sm text-gray-600 mb-2">
						<span>Progress</span>
						<span>{completedCards.size} of {lessonContent.flashcards.length} cards learned</span>
					</div>
					<div class="bg-gray-200 rounded-full h-3">
						<div class="bg-purple-600 h-3 rounded-full transition-all duration-300" style="width: {progress}%"></div>
					</div>
				</div>
			</div>

			{#if allCardsCompleted}
				<!-- Completion Screen -->
				<div class="bg-white p-8 rounded-lg shadow-lg text-center">
					<div class="text-6xl mb-4">🎉</div>
					<h2 class="text-3xl font-bold text-gray-900 mb-4">Congratulations!</h2>
					<p class="text-lg text-gray-700 mb-6">You've learned all the essential Spanish numbers!</p>
					
					<div class="bg-purple-50 border-2 border-purple-200 rounded-lg p-6 mb-6">
						<h3 class="text-xl font-semibold text-purple-900 mb-2">Your Progress</h3>
						<div class="text-3xl font-bold text-purple-600 mb-2">{completedCards.size}/{lessonContent.flashcards.length}</div>
						<div class="text-lg text-purple-700">100% Complete</div>
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
							class="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
						>
							Return to Dashboard
						</button>
					</div>
				</div>
			{:else}
				<!-- Flashcard -->
				<div class="max-w-2xl mx-auto">
					<div class="relative">
						<div class="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-gray-200 transition-all duration-300 hover:border-purple-300">
							<!-- Card Counter -->
							<div class="bg-gray-100 px-6 py-3 border-b border-gray-200">
								<div class="flex justify-between items-center">
									<span class="text-sm font-medium text-gray-600">
										Card {currentCardIndex + 1} of {lessonContent.flashcards.length}
									</span>
									<span class="text-sm font-medium {completedCards.has(currentCardIndex) ? 'text-purple-600' : 'text-gray-600'}">
										{completedCards.has(currentCardIndex) ? '✓ Known' : 'Learning'}
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
										<div class="text-sm text-purple-600 mb-2">Spanish</div>
										<div class="text-3xl font-bold text-purple-700 mb-2">{currentCard.spanish}</div>
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
											on:click|stopPropagation={markAsUnknown}
											class="bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-lg font-medium transition-colors border border-red-300"
										>
											😕 Still Learning
										</button>
										<button 
											on:click|stopPropagation={markAsKnown}
											class="bg-purple-100 hover:bg-purple-200 text-purple-700 px-4 py-2 rounded-lg font-medium transition-colors border border-purple-300"
										>
											😊 I Know This
										</button>
									</div>
								</div>
							{/if}
						</div>

						<!-- Navigation Buttons -->
						<div class="flex justify-between items-center mt-6">
							<button 
								on:click={previousCard}
								class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
							>
								← Previous
							</button>

							<div class="flex items-center gap-2">
								<a 
									href="/dashboard"
									class="text-gray-600 hover:text-gray-700 transition-colors"
								>
									← Back to Dashboard
								</a>
							</div>

							<button 
								on:click={nextCard}
								class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
							>
								Next →
							</button>
						</div>
					</div>

					<!-- Card Grid -->
					<div class="mt-8">
						<h3 class="text-lg font-semibold text-gray-900 mb-4">All Cards</h3>
						<div class="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
							{#each lessonContent.flashcards as card, index}
								<button
									on:click={() => goToCard(index)}
									class="aspect-square rounded-lg border-2 text-sm font-medium transition-all {
										index === currentCardIndex 
											? 'border-purple-500 bg-purple-100 text-purple-700' 
											: completedCards.has(index)
											? 'border-purple-300 bg-purple-50 text-purple-600'
											: 'border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300'
									}"
								>
									{index + 1}
									{#if completedCards.has(index)}
										<div class="text-xs">✓</div>
									{/if}
								</button>
							{/each}
						</div>
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>