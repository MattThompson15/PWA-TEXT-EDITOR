// Get the installation button from the DOM
const butInstall = document.getElementById('buttonInstall');
// Listen for the 'beforeinstallprompt' event, which is fired from the browser
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the default install prompt from showing immediately
  window.deferredPrompt = event;
  
  // Make the custom install button visible
  butInstall.classList.toggle('hidden', false);
});
// Add an event listener to the custom install button for the 'click' event
butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;
  // If there is no deferred prompt, exit the function
  if (!promptEvent) {
    return;
  }
  // Show the install prompt to the user
  promptEvent.prompt();

  window.deferredPrompt = null;

  butInstall.classList.toggle('hidden', true);
});
// Listen for the 'appinstalled' event, which is fired after the PWA has been installed
window.addEventListener('appinstalled', (event) => {
  // Clear the deferred prompt upon successful app install 
  window.deferredPrompt = null;
});
