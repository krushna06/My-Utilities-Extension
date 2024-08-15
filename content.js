// Listen for changes to the keybindsEnabled state
chrome.storage.sync.get(['keybindsEnabled'], function(result) {
    let keybindsEnabled = result.keybindsEnabled !== false; // Default to true if not set

    document.addEventListener('keydown', function(event) {
        if (!keybindsEnabled) return;

        // Check if the focus is on an input or textarea element
        const activeElement = document.activeElement;
        const isInputFocused = activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA' || activeElement.isContentEditable;

        if (!isInputFocused) {
            switch(event.key) {
                case 'a': // 'A' key to go to the previous post
                    simulateKey('ArrowLeft');
                    break;
                case 'd': // 'D' key to go to the next post
                    simulateKey('ArrowRight');
                    break;
                case 'w': // 'W' key to scroll up
                    window.scrollBy(0, -100);
                    break;
                case 's': // 'S' key to scroll down
                    window.scrollBy(0, 100);
                    break;
            }
        }
    });

    function simulateKey(key) {
        let event = new KeyboardEvent('keydown', {
            key: key,
            keyCode: key === 'ArrowLeft' ? 37 : 39,
            code: key,
            which: key === 'ArrowLeft' ? 37 : 39,
            bubbles: true
        });
        document.dispatchEvent(event);
    }

    // Update keybindsEnabled state when it changes
    chrome.storage.onChanged.addListener(function(changes, namespace) {
        if (changes.keybindsEnabled) {
            keybindsEnabled = changes.keybindsEnabled.newValue;
        }
    });
});
