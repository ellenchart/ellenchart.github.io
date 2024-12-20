function openTab(tabId) {
    // Remove active class from all tabs
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active-tab'));

    // Remove active class from all buttons
    const buttons = document.querySelectorAll('.tab-link');
    buttons.forEach(button => button.classList.remove('active-tab'));

    // Add active class to the clicked tab and button
    document.getElementById(tabId).classList.add('active-tab');
    event.currentTarget.classList.add('active-tab');
}

function toggleDetails(jobId) {
    const details = document.getElementById(`details-${jobId}`);
    const button = details.previousElementSibling.querySelector("button");

    if (details.classList.contains("hidden")) {
        details.classList.remove("hidden");
        button.textContent = "-";
    } else {
        details.classList.add("hidden");
        button.textContent = "+";
    }
}


