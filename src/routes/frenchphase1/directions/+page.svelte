<script lang="ts">
	import { goto } from '$app/navigation';

	let currentCardIndex = 0;
	let isFlipped = false;
	let completedCards = new Set();

	const lessonContent = {
		title: 'Directions & Places',
		category: 'Directions & Places',
		description: 'Learn essential words for getting around and finding places.',
		flashcards: [
			{ english: 'Where?', french: 'Où?', pronunciation: 'oo' },
			{ english: 'Here', french: 'Ici', pronunciation: 'ee-SEE' },
			{ english: 'There', french: 'Là', pronunciation: 'lah' },
			{ english: 'Left', french: 'Gauche', pronunciation: 'gohsh' },
			{ english: 'Right', french: 'Droite', pronunciation: 'drwaht' },
			{ english: 'Straight', french: 'Tout droit', pronunciation: 'too drwah' },
			{ english: 'Street', french: 'Rue', pronunciation: 'roo' },
			{ english: 'Road', french: 'Route', pronunciation: 'root' },
			{ english: 'Hotel', french: 'Hôtel', pronunciation: 'oh-TELL' },
			{ english: 'Restaurant', french: 'Restaurant', pronunciation: 'res-toh-RAHN' },
			{ english: 'Market', french: 'Marché', pronunciation: 'mar-SHAY' },
			{ english: 'Bus', french: 'Bus', pronunciation: 'boos' },
			{ english: 'Train', french: 'Train', pronunciation: 'trahn' },
			{ english: 'Taxi', french: 'Taxi', pronunciation: 'tak-SEE' },
			{ english: 'Airport', french: 'Aéroport', pronunciation: 'ah-ay-roh-POR' },
			{ english: 'Where is the bus?', french: 'Où est le bus?', pronunciation: 'oo ay luh boos' },
			{ english: 'Where is the airport?', french: 'Où est l\'aéroport?', pronunciation: 'oo ay lah-ay-roh-POR' }
		]
	};

	$: currentCard = lessonContent.flashcards[currentCardIndex];
	$: progress = ((completedCards.size) / lessonContent.flashcards.length) * 100;
	$: allCardsCompleted = completedCards.size === lessonContent.flashcards.length;

	function flipCard() { isFlipped = !isFlipped; }
	function markAsKnown() { completedCards.add(currentCardIndex); completedCards = completedCards; nextCard(); }
	function markAsUnknown() { nextCard(); }
	function nextCard() { currentCardIndex = currentCardIndex < lessonContent.flashcards.length - 1 ? currentCardIndex + 1 : 0; isFlipped = false; }
	function previousCard() { currentCardIndex = currentCardIndex > 0 ? currentCardIndex - 1 : lessonContent.flashcards.length - 1; isFlipped = false; }
	function goToCard(index: number) { currentCardIndex = index; isFlipped = false; }
	function resetProgress() { completedCards.clear(); completedCards = completedCards; currentCardIndex = 0; isFlipped = false; }
	function completeLesson() {
		const lessonScores = JSON.parse(localStorage.getItem('lessonScores') || '{}');
		lessonScores['french-phase1-directions'] = { score: `${completedCards.size}/${lessonContent.flashcards.length}`, percentage: Math.round((completedCards.size / lessonContent.flashcards.length) * 100), type: 'flashcards' };
		localStorage.setItem('lessonScores', JSON.stringify(lessonScores));
		goto('/dashboard');
	}
</script>

<svelte:head>
	<title>French Phase 1: Directions & Places - LangLearner</title>
</svelte:head>

<div class="min-h-screen bg-gray-50">
	<div class="container mx-auto px-4 py-16">
		<div class="max-w-4xl mx-auto">
			<div class="text-center mb-8">
				<div class="text-4xl mb-4">🧭</div>
				<h1 class="text-3xl font-bold text-gray-900 mb-2">{lessonContent.title}</h1>
				<p class="text-lg text-gray-600 mb-6">{lessonContent.description}</p>
				<div class="max-w-md mx-auto mb-6">
					<div class="flex justify-between text-sm text-gray-600 mb-2">
						<span>Progress</span>
						<span>{completedCards.size} of {lessonContent.flashcards.length} cards learned</span>
					</div>
					<div class="bg-gray-200 rounded-full h-3">
						<div class="bg-blue-600 h-3 rounded-full transition-all duration-300" style="width: {progress}%"></div>
					</div>
				</div>
			</div>

			{#if allCardsCompleted}
				<div class="bg-white p-8 rounded-lg shadow-lg text-center">
					<div class="text-6xl mb-4">🎉</div>
					<h2 class="text-3xl font-bold text-gray-900 mb-4">Félicitations!</h2>
					<p class="text-lg text-gray-700 mb-6">You've learned all the directions and places vocabulary!</p>
					<div class="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-6">
						<h3 class="text-xl font-semibold text-blue-900 mb-2">Your Progress</h3>
						<div class="text-3xl font-bold text-blue-600 mb-2">{completedCards.size}/{lessonContent.flashcards.length}</div>
						<div class="text-lg text-blue-700">100% Complete</div>
					</div>
					<div class="flex justify-center gap-4">
						<button on:click={resetProgress} class="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">Study Again</button>
						<button on:click={completeLesson} class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">Return to Dashboard</button>
					</div>
				</div>
			{:else}
				<div class="max-w-2xl mx-auto">
					<div class="relative">
						<div class="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-gray-200 transition-all duration-300 hover:border-blue-300">
							<div class="bg-gray-100 px-6 py-3 border-b border-gray-200">
								<div class="flex justify-between items-center">
									<span class="text-sm font-medium text-gray-600">Card {currentCardIndex + 1} of {lessonContent.flashcards.length}</span>
									<span class="text-sm font-medium {completedCards.has(currentCardIndex) ? 'text-blue-600' : 'text-gray-600'}">{completedCards.has(currentCardIndex) ? '✓ Known' : 'Learning'}</span>
								</div>
							</div>
							<div class="p-12 min-h-[300px] flex flex-col justify-center items-center cursor-pointer select-none" on:click={flipCard} on:keydown={(e) => e.key === ' ' && flipCard()} tabindex="0" role="button" aria-label="Flip flashcard">
								{#if !isFlipped}
									<div class="text-center">
										<div class="text-sm text-gray-500 mb-2">English</div>
										<div class="text-2xl font-bold text-gray-900 mb-4">{currentCard.english}</div>
										<div class="text-sm text-gray-400 italic">Click to reveal French</div>
									</div>
								{:else}
									<div class="text-center">
										<div class="text-sm text-blue-600 mb-2">French</div>
										<div class="text-3xl font-bold text-blue-700 mb-2">{currentCard.french}</div>
										<div class="text-lg text-gray-600 italic mb-4">{currentCard.pronunciation}</div>
										<div class="text-sm text-gray-400">Click to flip back</div>
									</div>
								{/if}
							</div>
							{#if isFlipped}
								<div class="bg-gray-50 px-6 py-4 border-t border-gray-200">
									<div class="flex justify-center gap-4">
										<button on:click|stopPropagation={markAsUnknown} class="bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-lg font-medium transition-colors border border-red-300">😕 Still Learning</button>
										<button on:click|stopPropagation={markAsKnown} class="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg font-medium transition-colors border border-blue-300">😊 I Know This</button>
									</div>
								</div>
							{/if}
						</div>
						<div class="flex justify-between items-center mt-6">
							<button on:click={previousCard} class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">← Previous</button>
							<div class="flex items-center gap-2"><a href="/dashboard" class="text-gray-600 hover:text-gray-700 transition-colors">← Back to Dashboard</a></div>
							<button on:click={nextCard} class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">Next →</button>
						</div>
					</div>
					<div class="mt-8">
						<h3 class="text-lg font-semibold text-gray-900 mb-4">All Cards</h3>
						<div class="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
							{#each lessonContent.flashcards as card, index}
								<button on:click={() => goToCard(index)} class="aspect-square rounded-lg border-2 text-sm font-medium transition-all {index === currentCardIndex ? 'border-blue-500 bg-blue-100 text-blue-700' : completedCards.has(index) ? 'border-blue-300 bg-blue-50 text-blue-600' : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300'}">
									{index + 1}
									{#if completedCards.has(index)}<div class="text-xs">✓</div>{/if}
								</button>
							{/each}
						</div>
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>