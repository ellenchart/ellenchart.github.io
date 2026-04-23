const fallbackProjects = [
    {
        title: 'deliberate decoding',
        description: 'An interactive hyperlink artwork exploring the layered meanings of digital art. Published in Issue 22 of <a href="https://www.digitalamerica.org/deliberate-decoding-ellen-hart/" target="_blank" class="underline text-black hover:text-blue-700">Digital America</a>.',
        url: 'https://github.com/ellenchart/deliberateDecoding.github.io',
        image: 'assets/projects/deliberate-decoding.png'
    },
    {
        title: 'Developer Portfolio',
        description: 'This is a developer portfolio made using Tailwind framework, JS, HTML, and CSS',
        url: 'https://github.com/ellenchart/ellenchart.github.io',
        image: 'assets/projects/developer-portfolio.png'
    },
    {
        title: 'MIPS Emulator: From Assembly to Operation',
        description: 'Runs MIPS assembly code: includes creating an assembler in C++, developing a Logisim CPU, expanding to support all class instructions, adding I/O, and building a MIPS kernel with syscall handling.',
        url: 'https://github.com/ellenchart/CMSC301_Project',
        image: 'assets/projects/mips-emulator.png'
    },
    {
        title: 'Project Jellen: Favorite Movies API',
        description: 'My friend and I made a C++ REST API dedicated to reviwing our favorite movies. It provides endpoints to access information on selected movies, including genres, directors, and reviews. Each API response offers a personalized look into movies we love, with features like user accounts, orders, and dynamic content fetched from JSON files.',
        url: 'https://github.com/cmsc240-s24/project-jellen',
        image: 'assets/projects/project-jellen.png'
    }
];

async function loadProjects() {
    const response = await fetch('data/projects.json');
    if (!response.ok) {
        throw new Error(`Failed to load project data (${response.status})`);
    }

    return response.json();
}

function buildProjectPlaceholder(title) {
    const safeTitle = (title || 'Project').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-label="${safeTitle}">
            <defs>
                <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stop-color="#0f172a" />
                    <stop offset="100%" stop-color="#1d4ed8" />
                </linearGradient>
            </defs>
            <rect width="1200" height="630" fill="url(#g)" />
            <text x="600" y="315" fill="#f8fafc" font-size="52" font-family="Inter, Arial, sans-serif" text-anchor="middle" dominant-baseline="middle">${safeTitle}</text>
        </svg>
    `;

    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function buildProjectImageCandidates(project) {
    const candidates = [];
    const imagePath = (project.image || '').trim();

    // Use only local/project-hosted images for fast, reliable rendering.
    if (imagePath && !/^https?:\/\//i.test(imagePath)) {
        candidates.push(imagePath);
    }

    // Always provide an immediate inline fallback so cards never wait on network thumbnails.
    candidates.push(buildProjectPlaceholder(project.title));
    return [...new Set(candidates)];
}

function applyImageFallback(img, imageCandidates) {
    let currentCandidate = 0;
    img.src = imageCandidates[currentCandidate];

    img.addEventListener('error', () => {
        currentCandidate += 1;
        if (currentCandidate < imageCandidates.length) {
            img.src = imageCandidates[currentCandidate];
        }
    });
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
        const imageCandidates = buildProjectImageCandidates(project);
        tile.innerHTML = `
            <div class="project-thumbnail mb-4">
                <img alt="${project.title}" class="w-full h-full object-cover" loading="lazy" decoding="async" fetchpriority="low">
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
        const image = tile.querySelector('img');

        if (image) {
            applyImageFallback(image, imageCandidates);
        }

        if (thumbnail) {
            thumbnail.addEventListener('click', () => window.open(project.url, '_blank'));
        }

        projectsContainer.appendChild(tile);
    });
}
