<script lang="ts">
	import { page } from '$app/state';
</script>

<header class="bg-white shadow-sm">
	<div class="container mx-auto px-4">
		<div class="flex justify-between items-center h-16">
			<div class="flex items-center">
				<a href="/" class="text-2xl font-bold text-blue-600">
					🌍 LangLearner
				</a>
			</div>

			<nav class="hidden md:flex space-x-8">
				<a href="/" 
					class="text-gray-700 hover:text-blue-600 font-medium transition-colors"
					class:text-blue-600={page.url.pathname === '/'}
				>
					Home
				</a>
				<a href="/dashboard" 
					class="text-gray-700 hover:text-blue-600 font-medium transition-colors"
					class:text-blue-600={page.url.pathname === '/dashboard'}
				>
					Dashboard
				</a>
				<a href="/about" 
					class="text-gray-700 hover:text-blue-600 font-medium transition-colors"
					class:text-blue-600={page.url.pathname === '/about'}
				>
					About
				</a>
			</nav>

			<div class="flex items-center space-x-4">
				<button class="text-gray-700 hover:text-blue-600 font-medium">
					Login
				</button>
				<button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
					Sign Up
				</button>
			</div>
		</div>
	</div>
</header>

