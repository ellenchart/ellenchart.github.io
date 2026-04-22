function toggleDetails(jobId) {
    const details = document.getElementById(`details-${jobId}`);
    if (!details) {
        return;
    }

    const button = details.previousElementSibling?.querySelector('button');

    if (details.classList.contains('hidden')) {
        details.classList.remove('hidden');
        if (button) {
            button.textContent = '-';
        }
    } else {
        details.classList.add('hidden');
        if (button) {
            button.textContent = '+';
        }
    }
}
function toggleDetails(jobId) {
    const details = document.getElementById(`details-${jobId}`);
    if (!details) {
        return;
    }

    const button = details.previousElementSibling?.querySelector('button');

    if (details.classList.contains('hidden')) {
        details.classList.remove('hidden');
        if (button) {
            button.textContent = '-';
        }
    } else {
        details.classList.add('hidden');
        if (button) {
            button.textContent = '+';
        }
    }
}
