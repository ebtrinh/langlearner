<script lang="ts">
	import { onMount } from 'svelte';
	
	let userPreferences: any = {};
	let lessonsCompleted = 0;
	let totalLessons = 3;
	let lessonScores: any = {};
	
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
			lessons = frenchLessons;
			totalLessons = frenchLessons.length;
		} else {
			lessons = spanishLessons;
			totalLessons = spanishLessons.length;
		}
	});
	
	let lessons: any[] = [];
	
	// Spanish lessons
	const spanishLessons = [
		{
			id: 1,
			title: 'Basic "Yo" + Present Tense',
			description: 'Master essential verbs with "yo" (I): quiero, necesito, tengo',
			completed: false,
			available: true,
			skills: ['yo quiero (I want)', 'yo necesito (I need)', 'yo tengo (I have)'],
			language: 'spanish'
		},
		{
			id: 2,
			title: 'Verb Conjugations: -ar, -er, -ir',
			description: 'Learn to conjugate verbs for different subjects',
			completed: false,
			available: true,
			skills: ['hablar → hablo, hablas, habla', 'comer → como, comes, come', 'vivir → vivo, vives, vive'],
			language: 'spanish'
		},
		{
			id: 3,
			title: 'Specific Subjects & Names',
			description: 'Talk about real people and groups (Pablo, mi familia, etc.)',
			completed: false,
			available: true,
			skills: ['Pablo habla (Pablo speaks)', 'mi familia come (my family eats)', 'mis hermanos viven (my brothers live)'],
			language: 'spanish'
		}
	];
	
	// French lessons
	const frenchLessons = [
		{
			id: 1,
			title: 'Basic "Je" + Present Tense',
			description: 'Master essential verbs with "je" (I): veux, ai besoin, ai',
			completed: false,
			available: true,
			skills: ['je veux (I want)', 'j\'ai besoin (I need)', 'j\'ai (I have)'],
			language: 'french'
		},
		{
			id: 2,
			title: 'Verb Conjugations: -er, -ir, -re',
			description: 'Learn to conjugate verbs for different subjects',
			completed: false,
			available: true,
			skills: ['parler → parle, parles, parle', 'finir → finis, finis, finit', 'vendre → vends, vends, vend'],
			language: 'french'
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
			
			<!-- Lessons Grid -->
			<div class="grid md:grid-cols-2 gap-6">
				{#each lessons as lesson}
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
								class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors inline-block text-center"
							>
								{lesson.id === 1 ? 'Start Learning' : 'Continue Lesson'}
							</a>
						{:else if lesson.completed}
							<a 
								href="/{lesson.language === 'french' ? 'frenchlessons' : 'spanishlessons'}/{lesson.id}"
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
