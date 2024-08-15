// Get the toggle checkbox
const toggleKeybinds = document.getElementById('toggleKeybinds');

// Load the current state from storage and set the checkbox
chrome.storage.sync.get(['keybindsEnabled'], function(result) {
    toggleKeybinds.checked = result.keybindsEnabled !== false; // Default to true if not set
});

// Listen for changes to the checkbox
toggleKeybinds.addEventListener('change', function() {
    const keybindsEnabled = toggleKeybinds.checked;
    chrome.storage.sync.set({ keybindsEnabled: keybindsEnabled }, function() {
        console.log('Keybinds are ' + (keybindsEnabled ? 'enabled' : 'disabled'));
    });
});
