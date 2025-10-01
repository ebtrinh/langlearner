<script lang="ts" context="module">
	// Declare gtag function for TypeScript
	declare function gtag(command: string, targetId: string | Date, config?: Record<string, any>): void;
</script>

<script lang="ts">
	import { page } from '$app/state';
	
	// Function to track navigation clicks
	function trackNavClick(destination: string) {
		gtag('event', 'navigation_click', {
			'link_destination': destination,
			'current_page': window.location.pathname,
			'click_source': 'header_nav'
		});
	}
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
					on:click={() => trackNavClick('home')}
					class="text-gray-700 hover:text-blue-600 font-medium transition-colors"
					class:text-blue-600={page.url.pathname === '/'}
				>
					Home
				</a>
				<a href="/dashboard" 
					on:click={() => trackNavClick('dashboard')}
					class="text-gray-700 hover:text-blue-600 font-medium transition-colors"
					class:text-blue-600={page.url.pathname === '/dashboard'}
				>
					Dashboard
				</a>
				<a href="/spanish-chat" 
					on:click={() => trackNavClick('chat')}
					class="text-gray-700 hover:text-orange-600 font-medium transition-colors"
					class:text-orange-600={page.url.pathname === '/spanish-chat'}
				>
					💬 Chat
				</a>
				<a href="/about" 
					on:click={() => trackNavClick('about')}
					class="text-gray-700 hover:text-blue-600 font-medium transition-colors"
					class:text-blue-600={page.url.pathname === '/about'}
				>
					About
				</a>
			</nav>

			<div class="flex items-center space-x-4">
				<button 
					on:click={() => trackNavClick('login')}
					class="text-gray-700 hover:text-blue-600 font-medium"
				>
					Login
				</button>
				<button 
					on:click={() => trackNavClick('signup')}
					class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
				>
					Sign Up
				</button>
			</div>
		</div>
	</div>
</header>

