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

function ensureStylesheet(url) {
    const existing = document.querySelector(`link[href="${url}"]`);
    if (existing) {
        return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = url;
        link.onload = resolve;
        link.onerror = reject;
        document.head.appendChild(link);
    });
}

function ensureScript(url) {
    const existing = document.querySelector(`script[src="${url}"]`);
    if (existing) {
        if (window.GitHubCalendar) {
            return Promise.resolve();
        }

        return new Promise((resolve, reject) => {
            existing.addEventListener('load', resolve, { once: true });
            existing.addEventListener('error', reject, { once: true });
        });
    }

    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = url;
        script.defer = true;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
    });
}

function waitForLucide() {
    return new Promise((resolve) => {
        if (window.lucide && typeof window.lucide.createIcons === 'function') {
            resolve();
            return;
        }

        let attempts = 0;
        const timer = setInterval(() => {
            attempts += 1;
            if (window.lucide && typeof window.lucide.createIcons === 'function') {
                clearInterval(timer);
                resolve();
                return;
            }

            if (attempts >= 20) {
                clearInterval(timer);
                resolve();
            }
        }, 100);
    });
}

function initializeGitHubCalendarWhenVisible() {
    const calendarSection = document.getElementById('github-calendar-section');
    if (!calendarSection) {
        return;
    }

    let hasLoaded = false;
    const loadCalendar = async () => {
        if (hasLoaded) {
            return;
        }

        hasLoaded = true;
        try {
            await ensureStylesheet('https://unpkg.com/github-calendar/dist/github-calendar-responsive.css');
            await ensureScript('https://unpkg.com/github-calendar@latest/dist/github-calendar.min.js');
            if (typeof window.GitHubCalendar === 'function') {
                window.GitHubCalendar('#github-calendar', 'ellenchart', { responsive: true });
            }
        } catch (error) {
            console.warn('Unable to load GitHub calendar:', error);
        }
    };

    const observer = new IntersectionObserver((entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting) {
            observer.disconnect();
            loadCalendar();
        }
    }, { rootMargin: '180px' });

    observer.observe(calendarSection);
}

async function initializeApp() {
    window.addEventListener('scroll', revealSections);
    window.addEventListener('load', revealSections);
    revealSections();

    bindRdkLinks();

    if (typeof createProjectTiles === 'function') {
        await createProjectTiles();
    }

    if (typeof createCareerTimeline === 'function') {
        await createCareerTimeline();
    }

    await waitForLucide();
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
    }

    // initializeGitHubCalendarWhenVisible();
}

document.addEventListener('DOMContentLoaded', initializeApp);

window.rickRoll = rickRoll;
