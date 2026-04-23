const fallbackCareerEntries = [
    {
        id: 'job1',
        side: 'left',
        title: 'Research Assistant',
        organization: 'University of Richmond',
        date: 'Aug 2023 - Present',
        details: [
            'Assist in creating a robust thesis statement by reviewing over 40 articles in the fields of computing and education.',
            'Refine goals for African computer science education through discussions, identifying three impactful strategies.',
            'Review 25+ CHI (Conference on Human Factors in Computing Systems) articles for adherence to accessibility rules.'
        ]
    },
    {
        id: 'job2',
        side: 'right',
        title: 'Teaching Assistant',
        organization: 'University of Richmond',
        date: 'Sept 2023 - Present',
        details: [
            'Supported project-based learning by mentoring students during Friday lab sessions, assisting in development, debugging, and documentation of semester-long Python projects.',
            'Provided online assistance to students, answering queries and offering guidance on Python programming challenges.',
            'Guided students through programming exercises on control structures, arrays, recursion, and file I/O.'
        ]
    },
    {
        id: 'job3',
        side: 'left',
        title: 'Software Engineer Intern',
        organization: 'Genesys',
        date: 'May 2024 - Aug 2024',
        details: [
            'Implemented automated front-end testing procedures to improve testing efficiency and accuracy.',
            'Conducted thorough bug detection to improve product reliability and performance.',
            'Focused on improving accessibility standards and overall product quality.'
        ]
    },
    {
        id: 'job4',
        side: 'right',
        title: 'Software Engineer Intern',
        organization: 'Relai',
        date: 'June 2023 - Aug 2023',
        details: [
            'Conducted UX research for template designs and contacted 600 businesses for user-focused wireframes.',
            'Developed full-stack software architecture using JavaScript, HTML, Node.js, and React for a mobile app.',
            'Enhanced app functionality by integrating multiple APIs, resulting in increased user engagement.'
        ]
    },
    {
        id: 'job5',
        side: 'left',
        title: 'Group Planner and Dock Hand',
        organization: 'Guest Services, Inc.',
        date: 'May 2024 - Aug 2024',
        details: [
            'Arranged large group events at Boating in DC locations with over 100 participants.',
            'Maintained daily communication with clients to ensure needs were met.',
            'Led group tours and delivered educational facts about Washington, DC.'
        ]
    }
];

async function loadCareerEntries() {
    const response = await fetch('data/career.json');
    if (!response.ok) {
        throw new Error(`Failed to load career data (${response.status})`);
    }

    return response.json();
}

function toggleDetails(jobId) {
    const details = document.getElementById(`details-${jobId}`);
    const button = document.querySelector(`[data-toggle-id="${jobId}"]`);
    if (!details || !button) {
        return;
    }

    const isHidden = details.classList.contains('hidden');
    details.classList.toggle('hidden', !isHidden);
    button.textContent = isHidden ? '-' : '+';
}

function createCareerCard(job, index) {
    const jobId = job.id || `job${index + 1}`;
    const isLeft = (job.side || '').toLowerCase() === 'left';
    const sideButtonClass = isLeft ? '-left-3' : '-right-3';
    const spacerStart = isLeft ? '<div class="w-5/12"></div>' : '';
    const spacerEnd = isLeft ? '' : '<div class="w-5/12"></div>';
    const bulletItems = Array.isArray(job.details)
        ? job.details.map((item) => `<li>${item}</li>`).join('')
        : '';

    return `
        <div class="mb-8 flex items-center justify-between w-full">
            ${spacerStart}
            <div class="w-5/12 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg relative transform -translate-y-4">
                <div class="absolute ${sideButtonClass} top-3 bg-blue-500 rounded-full w-6 h-6 text-white flex items-center justify-center">
                    <button data-toggle-id="${jobId}" onclick="toggleDetails('${jobId}')" class="focus:outline-none">+</button>
                </div>
                <h3 class="text-xl font-semibold text-blue-600 dark:text-blue-400">${job.title || ''}</h3>
                <p class="text-gray-500 dark:text-gray-400">${job.organization || ''}</p>
                <span class="text-xs bg-blue-200 text-blue-700 dark:bg-blue-600 dark:text-white rounded-full px-3 py-1 inline-block mt-2">${job.date || ''}</span>
                <div id="details-${jobId}" class="hidden mt-4 text-gray-600 dark:text-gray-400">
                    <ul class="list-disc pl-5 space-y-2">
                        ${bulletItems}
                    </ul>
                </div>
            </div>
            ${spacerEnd}
        </div>
    `;
}

async function createCareerTimeline() {
    const timelineContainer = document.getElementById('careerTimeline');
    if (!timelineContainer) {
        return;
    }

    let jobs = [];
    try {
        jobs = await loadCareerEntries();
    } catch (error) {
        console.warn('Falling back to inline career data:', error);
        jobs = fallbackCareerEntries;
    }

    timelineContainer.innerHTML = jobs.map(createCareerCard).join('');
}
