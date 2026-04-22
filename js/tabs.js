function openTab(tabId) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach((tab) => tab.classList.remove('active-tab'));

    const buttons = document.querySelectorAll('.tab-link');
    buttons.forEach((button) => button.classList.remove('active-tab'));

    const selectedTab = document.getElementById(tabId);
    if (selectedTab) {
        selectedTab.classList.add('active-tab');
    }

    if (window.event && window.event.currentTarget) {
        window.event.currentTarget.classList.add('active-tab');
    }
}
function openTab(tabId) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach((tab) => tab.classList.remove('active-tab'));

    const buttons = document.querySelectorAll('.tab-link');
    buttons.forEach((button) => button.classList.remove('active-tab'));

    const selectedTab = document.getElementById(tabId);
    if (selectedTab) {
        selectedTab.classList.add('active-tab');
    }

    if (window.event && window.event.currentTarget) {
        window.event.currentTarget.classList.add('active-tab');
    }
}
