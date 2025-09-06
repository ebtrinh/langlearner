<svelte:head>
	<title>Choose Your Destination - LangLearner</title>
	<meta name="description" content="Choose your travel destination to get started with the right language lessons" />
</svelte:head>

<div class="min-h-screen bg-gradient-to-b from-blue-50 to-white">
	<div class="container mx-auto px-4 py-16">
		<div class="max-w-2xl mx-auto text-center">
			<h1 class="text-4xl font-bold text-gray-900 mb-8">Where are you going?</h1>
			<p class="text-lg text-gray-600 mb-12">Choose your destination to get started with the right language lessons</p>
			
			<div class="grid md:grid-cols-3 gap-6">
				<a 
					href="/onboarding?destination=Mexico"
					class="p-6 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all block"
				>
					<div class="text-4xl mb-3">🌮</div>
					<h3 class="font-semibold text-lg">Mexico</h3>
					<p class="text-gray-600">Spanish</p>
				</a>
				
				<a 
					href="/onboarding?destination=France"
					class="p-6 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all block"
				>
					<div class="text-4xl mb-3">🗼</div>
					<h3 class="font-semibold text-lg">France</h3>
					<p class="text-gray-600">French</p>
				</a>
				
				<a 
					href="/onboarding?destination=Japan"
					class="p-6 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all block"
				>
					<div class="text-4xl mb-3">🏯</div>
					<h3 class="font-semibold text-lg">Japan</h3>
					<p class="text-gray-600">Japanese</p>
				</a>
			</div>
			
			<div class="mt-12">
				<a href="/" class="text-blue-600 hover:text-blue-700 font-medium">
					← Back to home
				</a>
			</div>
		</div>
	</div>
</div>
