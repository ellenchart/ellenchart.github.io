const fallbackProjects = [
    {
        title: 'deliberate decoding',
        description: 'An interactive hyperlink artwork exploring the layered meanings of digital art. Published in Issue 22 of <a href="https://www.digitalamerica.org/deliberate-decoding-ellen-hart/" target="_blank" class="underline text-black hover:text-blue-700">Digital America</a>.',
        url: 'https://github.com/ellenchart/deliberateDecoding.github.io',
        image: 'https://opengraph.githubassets.com/1/ellenchart/deliberateDecoding.github.io'
    },
    {
        title: 'Developer Portfolio',
        description: 'This is a developer portfolio made using Tailwind framework, JS, HTML, and CSS',
        url: 'https://github.com/ellenchart/ellenchart.github.io',
        image: 'https://opengraph.githubassets.com/1/ellenchart/ellenchart.github.io'
    },
    {
        title: 'MIPS Emulator: From Assembly to Operation',
        description: 'Runs MIPS assembly code: includes creating an assembler in C++, developing a Logisim CPU, expanding to support all class instructions, adding I/O, and building a MIPS kernel with syscall handling.',
        url: 'https://github.com/ellenchart/CMSC301_Project',
        image: 'https://opengraph.githubassets.com/1/ellenchart/CMSC301_Project'
    },
    {
        title: 'Project Jellen: Favorite Movies API',
        description: 'My friend and I made a C++ REST API dedicated to reviwing our favorite movies. It provides endpoints to access information on selected movies, including genres, directors, and reviews. Each API response offers a personalized look into movies we love, with features like user accounts, orders, and dynamic content fetched from JSON files.',
        url: 'https://github.com/cmsc240-s24/project-jellen',
        image: 'https://opengraph.githubassets.com/1/cmsc240-s24/project-jellen'
    }
];

async function loadProjects() {
    const response = await fetch('data/projects.json');
    if (!response.ok) {
        throw new Error(`Failed to load project data (${response.status})`);
    }

    return response.json();
}

async function createProjectTiles() {
    const projectsContainer = document.querySelector('#projects .grid');
    if (!projectsContainer) {
        return;
    }

    projectsContainer.innerHTML = '';

    let projects = [];
    try {
        projects = await loadProjects();
    } catch (error) {
        console.warn('Falling back to inline project data:', error);
        projects = fallbackProjects;
    }

    projects.forEach((project) => {
        const tile = document.createElement('div');
        tile.className = 'project-tile';
        tile.innerHTML = `
            <div class="project-thumbnail mb-4">
                <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover">
                <div class="redirect-icon">
                    <i data-lucide="external-link"></i>
                </div>
            </div>
            <h3 class="text-xl font-bold mb-2">${project.title}</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">${project.description}</p>
            <a href="${project.url}" target="_blank" class="read-more">
                find more
                <i data-lucide="github"></i>
            </a>
            <div class="repo-actions">
                <a href="${project.url}/stargazers" target="_blank" class="repo-action">
                    <i data-lucide="star"></i>
                    Star
                </a>
                <a href="${project.url}/fork" target="_blank" class="repo-action">
                    <i data-lucide="git-fork"></i>
                    Fork
                </a>
            </div>
        `;

        const thumbnail = tile.querySelector('.project-thumbnail');
        if (thumbnail) {
            thumbnail.addEventListener('click', () => window.open(project.url, '_blank'));
        }

        projectsContainer.appendChild(tile);
    });
}
