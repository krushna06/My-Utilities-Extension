document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.sync.get(['keybindsEnabled', 'audioEnabled'], function(result) {
        document.getElementById('toggleKeybinds').checked = result.keybindsEnabled !== false;
        document.getElementById('toggleAudio').checked = result.audioEnabled !== false;
    });

    document.getElementById('toggleKeybinds').addEventListener('change', function() {
        chrome.storage.sync.set({ keybindsEnabled: this.checked });
    });

    document.getElementById('toggleAudio').addEventListener('change', function() {
        chrome.storage.sync.set({ audioEnabled: this.checked });
    });
});
