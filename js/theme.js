(() => {
    const html = document.documentElement;
    const themeToggle = document.getElementById('themeToggle');

    if (!themeToggle) {
        return;
    }

    function updateIcon(isDark) {
        themeToggle.innerHTML = isDark
            ? '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>'
            : '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>';
    }

    function setTheme(isDark) {
        if (isDark) {
            html.classList.add('dark');
        } else {
            html.classList.remove('dark');
        }
        updateIcon(isDark);
        localStorage.setItem('darkMode', isDark);
    }

    function getSystemPreference() {
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    function setInitialTheme() {
        const savedTheme = localStorage.getItem('darkMode');
        if (savedTheme !== null) {
            setTheme(JSON.parse(savedTheme));
        } else {
            setTheme(getSystemPreference());
        }
    }

    themeToggle.addEventListener('click', () => {
        const isDark = !html.classList.contains('dark');
        setTheme(isDark);
    });

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
        if (localStorage.getItem('darkMode') === null) {
            setTheme(event.matches);
        }
    });

    setInitialTheme();
})();
