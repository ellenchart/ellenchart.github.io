function revealSections() {
    const sections = document.querySelectorAll('.section');
    sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (sectionTop < windowHeight * 0.75) {
            section.classList.add('visible');
        }
    });
}

function rickRoll() {
    window.open('https://www.youtube.com/watch?v=xvFZjo5PgG0', '_blank');
}

function bindRdkLinks() {
    const rdkElements = document.querySelectorAll('.rdk-hover');
    rdkElements.forEach((element) => {
        element.addEventListener('click', function () {
            if (this.textContent === 'RDK-B') {
                window.open('https://wiki.rdkcentral.com/display/RDK/RDK-Broadband', '_blank');
            } else if (this.textContent === 'RDK') {
                window.open('https://en.wikipedia.org/wiki/Reference_Design_Kit', '_blank');
            }
        });
    });
}

async function initializeApp() {
    window.addEventListener('scroll', revealSections);
    window.addEventListener('load', revealSections);
    revealSections();

    bindRdkLinks();

    if (typeof createProjectTiles === 'function') {
        await createProjectTiles();
    }

    if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
    }

    if (typeof window.GitHubCalendar === 'function') {
        window.GitHubCalendar('#github-calendar', 'ellenchart', { responsive: true });
    }
}

document.addEventListener('DOMContentLoaded', initializeApp);

window.rickRoll = rickRoll;
function revealSections() {
    const sections = document.querySelectorAll('.section');
    sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (sectionTop < windowHeight * 0.75) {
            section.classList.add('visible');
        }
    });
}

function rickRoll() {
    window.open('https://www.youtube.com/watch?v=xvFZjo5PgG0', '_blank');
}

function bindRdkLinks() {
    const rdkElements = document.querySelectorAll('.rdk-hover');
    rdkElements.forEach((element) => {
        element.addEventListener('click', function () {
            if (this.textContent === 'RDK-B') {
                window.open('https://wiki.rdkcentral.com/display/RDK/RDK-Broadband', '_blank');
            } else if (this.textContent === 'RDK') {
                window.open('https://en.wikipedia.org/wiki/Reference_Design_Kit', '_blank');
            }
        });
    });
}

async function initializeApp() {
    window.addEventListener('scroll', revealSections);
    window.addEventListener('load', revealSections);
    revealSections();

    bindRdkLinks();

    if (typeof createProjectTiles === 'function') {
        await createProjectTiles();
    }

    if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
    }

    if (typeof window.GitHubCalendar === 'function') {
        window.GitHubCalendar('#github-calendar', 'ellenchart', { responsive: true });
    }
}

document.addEventListener('DOMContentLoaded', initializeApp);

window.rickRoll = rickRoll;
