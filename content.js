chrome.storage.sync.get(['keybindsEnabled'], function(result) {
    let keybindsEnabled = result.keybindsEnabled !== false;

    document.addEventListener('keydown', function(event) {
        if (!keybindsEnabled) return;

        // Check if the focus is on an input or textarea element
        const activeElement = document.activeElement;
        const isInputFocused = activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA' || activeElement.isContentEditable;

        if (!isInputFocused) {
            const currentUrl = window.location.href;

            if (currentUrl.includes('/reels/')) {
                switch(event.key) {
                    case 'w': // 'W' key to scroll up (previous reel)
                        simulateTouchScroll('up');
                        break;
                    case 's': // 'S' key to scroll down (next reel)
                        simulateTouchScroll('down');
                        break;
                }
            } else {
                // Default behavior for other Instagram pages
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
        }
    });

    function simulateTouchScroll(direction) {
        let touchStartY = direction === 'up' ? window.innerHeight * 0.8 : window.innerHeight * 0.2;
        let touchEndY = direction === 'up' ? window.innerHeight * 0.2 : window.innerHeight * 0.8;

        let touchStartEvent = new TouchEvent('touchstart', {
            touches: [new Touch({
                identifier: Date.now(),
                target: document.body,
                clientY: touchStartY
            })],
            bubbles: true
        });

        let touchMoveEvent = new TouchEvent('touchmove', {
            touches: [new Touch({
                identifier: Date.now(),
                target: document.body,
                clientY: touchEndY
            })],
            bubbles: true
        });

        let touchEndEvent = new TouchEvent('touchend', {
            bubbles: true
        });

        document.body.dispatchEvent(touchStartEvent);
        document.body.dispatchEvent(touchMoveEvent);
        document.body.dispatchEvent(touchEndEvent);
    }

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

    chrome.storage.onChanged.addListener(function(changes, namespace) {
        if (changes.keybindsEnabled) {
            keybindsEnabled = changes.keybindsEnabled.newValue;
        }
    });
});
