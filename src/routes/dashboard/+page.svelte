<script lang="ts" context="module">
	// Declare gtag function for TypeScript
	declare function gtag(command: string, targetId: string | Date, config?: Record<string, any>): void;
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	
	let userPreferences: any = {};
	let lessonsCompleted = 0;
	let totalLessons = 3;
	let lessonScores: any = {};
	let phase1Lessons: any[] = [];
	let phase2Lessons: any[] = [];
	
	onMount(() => {
		// Load user preferences from localStorage
		const stored = localStorage.getItem('userPreferences');
		if (stored) {
			userPreferences = JSON.parse(stored);
		}
		
		// Load lesson scores from localStorage
		const storedScores = localStorage.getItem('lessonScores');
		if (storedScores) {
			lessonScores = JSON.parse(storedScores);
		}
		
		// Set lessons based on destination
		if (userPreferences.destination === 'France') {
			phase1Lessons = frenchPhase1Lessons;
			phase2Lessons = frenchPhase2Lessons;
			totalLessons = frenchPhase1Lessons.length + frenchPhase2Lessons.length;
		} else {
			phase1Lessons = spanishPhase1Lessons;
			phase2Lessons = spanishPhase2Lessons;
			totalLessons = spanishPhase1Lessons.length + spanishPhase2Lessons.length;
		}
		
		// Count completed lessons
		lessonsCompleted = Object.keys(lessonScores).length;
		
		// Analytics: Track dashboard visit
		gtag('event', 'page_view', {
			'page_title': 'Dashboard',
			'page_location': window.location.href,
			'user_destination': userPreferences.destination || 'not_set',
			'lessons_completed': lessonsCompleted,
			'total_lessons': totalLessons,
			'progress_percentage': Math.round((lessonsCompleted / totalLessons) * 100)
		});
	});
	
	// Function to track lesson clicks
	function trackLessonClick(lesson: any, lessonType: string) {
		gtag('event', 'lesson_click', {
			'lesson_id': lesson.id,
			'lesson_title': lesson.title,
			'lesson_type': lessonType,
			'lesson_language': lesson.language || 'spanish',
			'lesson_phase': lesson.phase,
			'lesson_available': lesson.available,
			'lesson_completed': lesson.completed,
			'user_destination': userPreferences.destination || 'not_set'
		});
	}
	
	// Spanish Phase 1 - Vocabulary Lessons
	const spanishPhase1Lessons = [
		{
			id: 'essentials',
			title: 'Essential Phrases',
			description: 'Hello, thank you, please, yes, no - the basics you need',
			completed: false,
			available: true,
			skills: ['Hola (Hello)', 'Gracias (Thank you)', 'Por favor (Please)', 'Sí/No (Yes/No)'],
			language: 'spanish',
			phase: 1,
			category: 'Essentials',
			icon: '🗣️'
		},
		{
			id: 'directions',
			title: 'Directions & Places',
			description: 'Navigate and find important places',
			completed: false,
			available: true,
			skills: ['¿Dónde? (Where?)', 'Izquierda/Derecha (Left/Right)', 'Hotel, Restaurante', 'Autobús, Taxi'],
			language: 'spanish',
			phase: 1,
			category: 'Directions',
			icon: '🧭'
		},
		{
			id: 'numbers',
			title: 'Numbers',
			description: 'Count, prices, and basic math',
			completed: false,
			available: true,
			skills: ['Uno, dos, tres (1, 2, 3)', 'Diez, veinte (10, 20)', '¿Cuánto? (How much?)', 'Precio (Price)'],
			language: 'spanish',
			phase: 1,
			category: 'Numbers',
			icon: '🔢'
		},
		{
			id: 'food',
			title: 'Food & Drink',
			description: 'Order meals and drinks with confidence',
			completed: false,
			available: true,
			skills: ['Agua (Water)', 'Quiero tacos (I want tacos)', 'Café, Cerveza', 'Desayuno, Cena'],
			language: 'spanish',
			phase: 1,
			category: 'Food',
			icon: '🍽️'
		}
	];
	
	// Spanish Phase 2 - Grammar Lessons  
	const spanishPhase2Lessons = [
		{
			id: 1,
			title: 'Basic "Yo" + Present Tense',
			description: 'Master essential verbs with "yo" (I): quiero, necesito, tengo',
			completed: false,
			available: true,
			skills: ['yo quiero (I want)', 'yo necesito (I need)', 'yo tengo (I have)'],
			language: 'spanish',
			phase: 2,
			icon: '📚'
		},
		{
			id: 2,
			title: 'Verb Conjugations: -ar, -er, -ir',
			description: 'Learn to conjugate verbs for different subjects',
			completed: false,
			available: true,
			skills: ['hablar → hablo, hablas, habla', 'comer → como, comes, come', 'vivir → vivo, vives, vive'],
			language: 'spanish',
			phase: 2,
			icon: '📚'
		},
		{
			id: 3,
			title: 'Specific Subjects & Names',
			description: 'Talk about real people and groups (Pablo, mi familia, etc.)',
			completed: false,
			available: true,
			skills: ['Pablo habla (Pablo speaks)', 'mi familia come (my family eats)', 'mis hermanos viven (my brothers live)'],
			language: 'spanish',
			phase: 2,
			icon: '📚'
		},
		{
			id: 4,
			title: 'Es vs Está: The Two Ways to Say "Is"',
			description: 'Master the difference between permanent and temporary states',
			completed: false,
			available: true,
			skills: ['es for permanent (ella es doctora)', 'está for temporary (está aquí)', 'emotions vs characteristics'],
			language: 'spanish',
			phase: 2,
			icon: '🎯'
		},
		{
			id: 5,
			title: 'Questions: Where, Can, When',
			description: 'Ask essential questions for travel and daily life',
			completed: false,
			available: true,
			skills: ['¿Dónde está? (Where is?)', '¿Puede ayudar? (Can you help?)', '¿Cuándo? (When?)', 'combining with Y and O'],
			language: 'spanish',
			phase: 2,
			icon: '❓'
		},
		{
			id: 6,
			title: 'Me Gusta vs Me Gustan',
			description: 'Express what you like and don\'t like correctly',
			completed: false,
			available: true,
			skills: ['me gusta (singular)', 'me gustan (plural)', 'no me gusta (dislikes)', 'te gusta / le gusta (others)'],
			language: 'spanish',
			phase: 2,
			icon: '💝'
		}
	];
	
	// French Phase 1 - Vocabulary Lessons
	const frenchPhase1Lessons = [
		{
			id: 'essentials',
			title: 'Essential Phrases',
			description: 'Bonjour, merci, s\'il vous plaît - the basics you need',
			completed: false,
			available: true,
			skills: ['Bonjour (Hello)', 'Merci (Thank you)', 'S\'il vous plaît (Please)', 'Oui/Non (Yes/No)'],
			language: 'french',
			phase: 1,
			category: 'Essentials',
			icon: '🗣️'
		},
		{
			id: 'directions',
			title: 'Directions & Places',
			description: 'Navigate and find important places',
			completed: false,
			available: true,
			skills: ['Où? (Where?)', 'Gauche/Droite (Left/Right)', 'Hôtel, Restaurant', 'Bus, Taxi'],
			language: 'french',
			phase: 1,
			category: 'Directions',
			icon: '🧭'
		},
		{
			id: 'numbers',
			title: 'Numbers',
			description: 'Count, prices, and basic math',
			completed: false,
			available: true,
			skills: ['Un, deux, trois (1, 2, 3)', 'Dix, vingt (10, 20)', 'Combien? (How much?)', 'Prix (Price)'],
			language: 'french',
			phase: 1,
			category: 'Numbers',
			icon: '🔢'
		},
		{
			id: 'food',
			title: 'Food & Drink',
			description: 'Order meals and drinks with confidence',
			completed: false,
			available: true,
			skills: ['Eau (Water)', 'Je voudrais... (I would like...)', 'Café, Bière', 'Petit-déjeuner, Dîner'],
			language: 'french',
			phase: 1,
			category: 'Food',
			icon: '🍽️'
		}
	];
	
	// French Phase 2 - Grammar Lessons
	const frenchPhase2Lessons = [
		{
			id: 1,
			title: 'Basic "Je" + Present Tense',
			description: 'Master essential verbs with "je" (I): veux, ai besoin, ai',
			completed: false,
			available: true,
			skills: ['je veux (I want)', 'j\'ai besoin (I need)', 'j\'ai (I have)'],
			language: 'french',
			phase: 2,
			icon: '📚'
		},
		{
			id: 2,
			title: 'Verb Conjugations: -er, -ir, -re',
			description: 'Learn to conjugate verbs for different subjects',
			completed: false,
			available: true,
			skills: ['parler → parle, parles, parle', 'finir → finis, finis, finit', 'vendre → vends, vends, vend'],
			language: 'french',
			phase: 2,
			icon: '📚'
		}
	];
</script>

<svelte:head>
	<title>Your Learning Dashboard - LangLearner</title>
	<meta name="description" content="Track your progress and continue learning" />
</svelte:head>

<div class="min-h-screen bg-gray-50">
	<div class="container mx-auto px-4 py-16">
		<div class="max-w-4xl mx-auto">
			<div class="mb-8">
				<h1 class="text-4xl font-bold text-gray-900 mb-4">
					Your {userPreferences.destination || 'Spanish'} Learning Dashboard
				</h1>
				<p class="text-lg text-gray-600">Master the building blocks of {userPreferences.destination === 'Mexico' ? 'Spanish' : userPreferences.destination === 'France' ? 'French' : 'Spanish'} step by step</p>
			</div>
			
			<!-- Progress Section -->
			<div class="bg-white p-6 rounded-lg shadow-lg mb-8">
				<div class="flex justify-between items-center mb-4">
					<h2 class="text-xl font-semibold">Lesson Progress</h2>
					<span class="text-gray-600">{lessonsCompleted} of {totalLessons} lessons completed</span>
				</div>
				<div class="bg-gray-200 rounded-full h-4 mb-2">
					<div class="bg-blue-600 h-4 rounded-full transition-all duration-300" style="width: {(lessonsCompleted / totalLessons) * 100}%"></div>
				</div>
				<p class="text-sm text-gray-600">{Math.round((lessonsCompleted / totalLessons) * 100)}% complete</p>
			</div>
			
			<!-- Phase 1: Vocabulary Lessons -->
			<div class="mb-12">
				<div class="flex items-center mb-6">
					<div class="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-medium mr-3">Phase 1</div>
					<h2 class="text-2xl font-bold text-gray-900">Vocabulary & Phrases</h2>
				</div>
				<p class="text-gray-600 mb-6">Start here! Learn essential words and phrases for everyday situations. No grammar rules - just practical communication.</p>
				
				<div class="grid md:grid-cols-2 gap-6">
					{#each phase1Lessons as lesson}
						<div class="bg-white p-6 rounded-lg shadow-lg border-2 {lesson.available ? 'border-green-200 hover:border-green-300' : 'border-gray-100'} transition-all">
							<div class="flex items-start justify-between mb-4">
								<div class="flex items-center">
									<div class="text-2xl mr-3">{lesson.icon}</div>
									<div>
										<h3 class="text-lg font-semibold {lesson.available ? 'text-gray-900' : 'text-gray-400'}">{lesson.title}</h3>
									</div>
								</div>
								<div class="text-sm px-2 py-1 rounded {lesson.completed ? 'bg-green-100 text-green-700' : lesson.available ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}">
									{lesson.completed ? 'Complete' : lesson.available ? 'Available' : 'Locked'}
								</div>
							</div>
							
							<p class="text-gray-600 mb-4">{lesson.description}</p>
							
							<!-- Show score if lesson has been completed -->
							{#if lessonScores[`${lesson.language}-phase1-${lesson.id}`]}
								<div class="bg-green-50 border border-green-200 rounded p-3 mb-4">
									<div class="flex items-center justify-between">
										<span class="text-sm font-medium text-green-800">Your Score:</span>
										<div class="text-right">
											<div class="text-lg font-bold text-green-600">{lessonScores[`${lesson.language}-phase1-${lesson.id}`].score}</div>
											<div class="text-sm text-green-700">{lessonScores[`${lesson.language}-phase1-${lesson.id}`].percentage}%</div>
										</div>
									</div>
								</div>
							{/if}
							
							<div class="mb-4">
								<h4 class="text-sm font-medium text-gray-700 mb-2">You'll learn:</h4>
								<ul class="text-sm text-gray-600 space-y-1">
									{#each lesson.skills as skill}
										<li class="flex items-center">
											<span class="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
											{skill}
										</li>
									{/each}
								</ul>
							</div>
							
							{#if lesson.available && !lesson.completed}
								<a 
									href="/{lesson.language}phase1/{lesson.id}"
									on:click={() => trackLessonClick(lesson, 'phase1_start')}
									class="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors inline-block text-center"
								>
									Start Learning
								</a>
							{:else if lesson.completed}
								<a 
									href="/{lesson.language}phase1/{lesson.id}"
									on:click={() => trackLessonClick(lesson, 'phase1_review')}
									class="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors inline-block text-center"
								>
									Review Lesson
								</a>
							{:else}
								<button 
									class="w-full bg-gray-300 text-gray-500 py-2 px-4 rounded-lg font-medium cursor-not-allowed"
									disabled
								>
									Complete Previous Lessons
								</button>
							{/if}
						</div>
					{/each}
				</div>
			</div>

			<!-- Phase 2: Grammar Lessons -->
			<div class="mb-12">
				<div class="flex items-center mb-6">
					<div class="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium mr-3">Phase 2</div>
					<h2 class="text-2xl font-bold text-gray-900">Grammar & Conjugations</h2>
				</div>
				<p class="text-gray-600 mb-6">Ready for the next level? Master verb conjugations and grammar rules to speak with confidence.</p>
				
				<div class="grid md:grid-cols-2 gap-6">
					{#each phase2Lessons as lesson}
						<div class="bg-white p-6 rounded-lg shadow-lg border-2 {lesson.available ? 'border-blue-200 hover:border-blue-300' : 'border-gray-100'} transition-all">
							<div class="flex items-start justify-between mb-4">
								<div class="flex items-center">
									<div class="w-8 h-8 rounded-full flex items-center justify-center mr-3 {lesson.completed ? 'bg-green-100 text-green-600' : lesson.available ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}">
										{#if lesson.completed}
											✓
										{:else}
											{lesson.id}
										{/if}
									</div>
									<div>
										<h3 class="text-lg font-semibold {lesson.available ? 'text-gray-900' : 'text-gray-400'}">{lesson.title}</h3>
									</div>
								</div>
								<div class="text-sm px-2 py-1 rounded {lesson.completed ? 'bg-green-100 text-green-700' : lesson.available ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'}">
									{lesson.completed ? 'Complete' : lesson.available ? 'Available' : 'Locked'}
								</div>
							</div>
							
							<p class="text-gray-600 mb-4">{lesson.description}</p>
							
							<!-- Show score if lesson has been completed -->
							{#if lessonScores[`${lesson.language}-${lesson.id}`]}
								<div class="bg-green-50 border border-green-200 rounded p-3 mb-4">
									<div class="flex items-center justify-between">
										<span class="text-sm font-medium text-green-800">Your Score:</span>
										<div class="text-right">
											<div class="text-lg font-bold text-green-600">{lessonScores[`${lesson.language}-${lesson.id}`].score}</div>
											<div class="text-sm text-green-700">{lessonScores[`${lesson.language}-${lesson.id}`].percentage}%</div>
										</div>
									</div>
								</div>
							{/if}
							
							<div class="mb-4">
								<h4 class="text-sm font-medium text-gray-700 mb-2">You'll learn:</h4>
								<ul class="text-sm text-gray-600 space-y-1">
									{#each lesson.skills as skill}
										<li class="flex items-center">
											<span class="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
											{skill}
										</li>
									{/each}
								</ul>
							</div>
							
							{#if lesson.available && !lesson.completed}
								<a 
									href="/{lesson.language === 'french' ? 'frenchlessons' : 'spanishlessons'}/{lesson.id}"
									on:click={() => trackLessonClick(lesson, 'phase2_start')}
									class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors inline-block text-center"
								>
									{lesson.id === 1 ? 'Start Learning' : 'Continue Lesson'}
								</a>
							{:else if lesson.completed}
								<a 
									href="/{lesson.language === 'french' ? 'frenchlessons' : 'spanishlessons'}/{lesson.id}"
									on:click={() => trackLessonClick(lesson, 'phase2_review')}
									class="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors inline-block text-center"
								>
									Review Lesson
								</a>
							{:else}
								<button 
									class="w-full bg-gray-300 text-gray-500 py-2 px-4 rounded-lg font-medium cursor-not-allowed"
									disabled
								>
									Complete Previous Lessons
								</button>
							{/if}
						</div>
					{/each}
				</div>
			</div>

			<!-- Phase 3: AI Conversation -->
			<div class="mb-12">
				<div class="flex items-center mb-6">
					<div class="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-medium mr-3">Phase 3</div>
					<h2 class="text-2xl font-bold text-gray-900">Real Conversations</h2>
				</div>
				<p class="text-gray-600 mb-6">Ready to put it all together? Chat with María, your AI Spanish tutor, in realistic scenarios you'll encounter in Spain!</p>
				
				<!-- Phase 3 Card -->
				<div class="bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200 p-8 rounded-xl shadow-lg">
					<div class="flex items-center justify-between mb-6">
						<div class="flex items-center">
							<div class="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center mr-4">
								<span class="text-white text-2xl font-bold">M</span>
							</div>
							<div>
								<h3 class="text-2xl font-bold text-gray-900 mb-2">Chat with María</h3>
								<p class="text-gray-600">Your friendly AI conversation partner from Madrid</p>
							</div>
						</div>
						<div class="text-4xl">🇪🇸</div>
					</div>
					
					<div class="grid md:grid-cols-2 gap-6 mb-6">
						<div class="bg-white p-4 rounded-lg">
							<h4 class="font-semibold text-gray-900 mb-2">🎭 Endless Scenarios</h4>
							<p class="text-sm text-gray-600">Practice ordering food, asking directions, shopping, and more real-life situations</p>
						</div>
						<div class="bg-white p-4 rounded-lg">
							<h4 class="font-semibold text-gray-900 mb-2">🔧 Gentle Corrections</h4>
							<p class="text-sm text-gray-600">María will help you improve naturally, just like a patient local friend</p>
						</div>
						<div class="bg-white p-4 rounded-lg">
							<h4 class="font-semibold text-gray-900 mb-2">📚 Learn New Words</h4>
							<p class="text-sm text-gray-600">Discover new vocabulary contextually as you chat about different topics</p>
						</div>
						<div class="bg-white p-4 rounded-lg">
							<h4 class="font-semibold text-gray-900 mb-2">🚀 Build Confidence</h4>
							<p class="text-sm text-gray-600">Practice until you feel ready to have real conversations in Spain!</p>
						</div>
					</div>

					<!-- Phase 3 Unlock Logic -->
					{#if spanishPhase2Lessons.every(lesson => lessonScores[`spanish-${lesson.id}`]?.percentage >= 80)}
						<a 
							href="/spanish-chat"
							on:click={() => gtag('event', 'phase3_chat_started', { 'source': 'dashboard' })}
							class="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white py-4 px-6 rounded-lg font-bold text-lg transition-all transform hover:scale-105 inline-block text-center shadow-lg"
						>
							🚀 Start Chatting with María
						</a>
					{:else}
						<div class="text-center">
							<div class="bg-gray-100 text-gray-500 py-4 px-6 rounded-lg font-medium mb-4">
								🔒 Complete all Phase 2 lessons to unlock conversations with María
							</div>
							<div class="text-sm text-gray-600">
								Progress: {spanishPhase2Lessons.filter(lesson => lessonScores[`spanish-${lesson.id}`]?.percentage >= 80).length} of {spanishPhase2Lessons.length} lessons completed
							</div>
						</div>
					{/if}
				</div>
			</div>
			
			<!-- Quick Stats -->
			<div class="grid md:grid-cols-3 gap-6 mt-8">
				<div class="bg-white p-6 rounded-lg shadow-lg text-center">
					<div class="text-3xl font-bold text-blue-600 mb-2">{lessonsCompleted}</div>
					<div class="text-gray-600">Lessons Completed</div>
				</div>
				<div class="bg-white p-6 rounded-lg shadow-lg text-center">
					<div class="text-3xl font-bold text-green-600 mb-2">0</div>
					<div class="text-gray-600">Day Streak</div>
				</div>
				<div class="bg-white p-6 rounded-lg shadow-lg text-center">
					<div class="text-3xl font-bold text-purple-600 mb-2">0</div>
					<div class="text-gray-600">Skills Mastered</div>
				</div>
			</div>
		</div>
	</div>
</div>
