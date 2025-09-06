<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	
	let destination = '';
	let userPreferences = {
		travelTime: '',
		goal: '',
		dailyTime: ''
	};
	
	// Get destination from URL params
	$: if ($page.url.searchParams.get('destination')) {
		destination = $page.url.searchParams.get('destination') || '';
	}
	
	function completeOnboarding() {
		// Store preferences in localStorage or send to server
		localStorage.setItem('userPreferences', JSON.stringify({
			destination,
			...userPreferences
		}));
		goto('/dashboard');
	}
</script>

<svelte:head>
	<title>Personalize Your Learning - LangLearner</title>
	<meta name="description" content="Customize your language learning experience" />
</svelte:head>

<div class="min-h-screen bg-gradient-to-b from-blue-50 to-white">
	<div class="container mx-auto px-4 py-16">
		<div class="max-w-2xl mx-auto">
			<h1 class="text-4xl font-bold text-gray-900 mb-8 text-center">Let's personalize your {destination} experience</h1>
			<p class="text-lg text-gray-600 mb-12 text-center">Just a few quick questions to customize your learning path</p>
			
			<div class="space-y-8">
				<div>
					<h3 class="text-xl font-semibold mb-4">When are you traveling?</h3>
					<div class="space-y-2">
						<label class="flex items-center">
							<input type="radio" bind:group={userPreferences.travelTime} value="this-week" class="mr-3">
							This week
						</label>
						<label class="flex items-center">
							<input type="radio" bind:group={userPreferences.travelTime} value="this-month" class="mr-3">
							In a month
						</label>
						<label class="flex items-center">
							<input type="radio" bind:group={userPreferences.travelTime} value="browsing" class="mr-3">
							Just browsing
						</label>
					</div>
				</div>
				
				<div>
					<h3 class="text-xl font-semibold mb-4">What's your goal?</h3>
					<div class="space-y-2">
						<label class="flex items-center">
							<input type="radio" bind:group={userPreferences.goal} value="survive" class="mr-3">
							Survive conversations
						</label>
						<label class="flex items-center">
							<input type="radio" bind:group={userPreferences.goal} value="confidence" class="mr-3">
							Build confidence
						</label>
						<label class="flex items-center">
							<input type="radio" bind:group={userPreferences.goal} value="both" class="mr-3">
							Both
						</label>
					</div>
				</div>
				
				<div>
					<h3 class="text-xl font-semibold mb-4">How much time do you have daily?</h3>
					<div class="space-y-2">
						<label class="flex items-center">
							<input type="radio" bind:group={userPreferences.dailyTime} value="5min" class="mr-3">
							5 minutes
						</label>
						<label class="flex items-center">
							<input type="radio" bind:group={userPreferences.dailyTime} value="10min" class="mr-3">
							10 minutes
						</label>
						<label class="flex items-center">
							<input type="radio" bind:group={userPreferences.dailyTime} value="20min" class="mr-3">
							20+ minutes
						</label>
					</div>
				</div>
				
				<button 
					on:click={completeOnboarding}
					class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors mt-8"
					disabled={!userPreferences.travelTime || !userPreferences.goal || !userPreferences.dailyTime}
				>
					Create My Learning Plan
				</button>
			</div>
			
			<div class="mt-8 text-center">
				<a href="/destinations" class="text-blue-600 hover:text-blue-700 font-medium">
					← Back to destinations
				</a>
			</div>
		</div>
	</div>
</div>

