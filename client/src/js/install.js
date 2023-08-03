const butInstall = document.getElementById('buttonInstall');

// Event listener for before the install, removing the hidden class from the install button
window.addEventListener('beforeinstallprompt', (event) => {
    window.deferredPrompt = event;
    
    butInstall.classList.toggle('hidden', false);
});

// Event listener for clicking the install button, hides the button once installed
butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;

    if (!promptEvent) {
        return;
    }

    promptEvent.prompt();

    window.deferredPrompt = null;

    butInstall.classList.toggle('hidden', true);
});

// Resetting deferredPrompt back to null once the app has been installed
window.addEventListener('appinstalled', (event) => {
    window.deferredPrompt = null;
});
