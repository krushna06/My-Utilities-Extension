document.addEventListener('keydown', function(event) {
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
