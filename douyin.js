function safeClick(element) {
    try {
        if (typeof element.click === 'function') {
            element.click();
            return true;
        }
        
        const event = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true
        });
        return element.dispatchEvent(event);
    } catch (error) {
        console.error('Error clicking element:', error);
        return false;
    }
}

function closeDouyinLogin() {
    try {
        const closeButton = document.evaluate(
            '//div[contains(@class, "NlfB2yYf")]//*[local-name()="svg"][@width="36"][@height="36"]/ancestor::div[contains(@class, "NlfB2yYf")]',
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
        )?.singleNodeValue;

        if (closeButton) {
            console.log('Found close button via XPath');
            if (safeClick(closeButton)) {
                console.log('Clicked close button');
                return true;
            }
        }

        const selectors = [
            'div[class*="NlfB2yYf"]',
            'button[aria-label*="close" i], button[title*="close" i]',
            'article[id^="douyin_login"]',
            'div[class*="close" i], button[class*="close" i]',
            'svg[width="36"][height="36"]',
            'button:last-child',
            'svg[viewBox*="36"]',
            'i[class*="close" i]'
        ];

        for (const selector of selectors) {
            const elements = document.querySelectorAll(selector);
            for (const element of elements) {
                console.log('Trying element with selector:', selector);
                if (safeClick(element)) {
                    console.log('Clicked element with selector:', selector);
                    return true;
                }
            }
        }

        
        const svgClose = document.querySelector('svg[width="36"][height="36"]');
        if (svgClose) {
            console.log('Found SVG close button');
            const clickableParent = svgClose.closest('button') || svgClose.closest('div[role="button"]');
            if (clickableParent) {
                clickableParent.click();
                console.log('Clicked SVG close button via parent');
                return true;
            }
        }
        
        const loginPopup = document.getElementById('douyin_login_comp_tab_panel');
        if (loginPopup) {
            console.log('Found login popup, removing it');
            loginPopup.remove();
            return true;
        }
        
        const closeElements = document.querySelectorAll('*[class*="close" i]');
        if (closeElements.length > 0) {
            console.log('Found elements with "close" in class');
            closeElements[0].click();
            return true;
        }
        
    } catch (error) {
        console.error('Error in closeDouyinLogin:', error);
    }
    return false;
}

let checkCount = 0;
const maxChecks = 20;
const intervalId = setInterval(() => {
    checkCount++;
    if (closeDouyinLogin() || checkCount >= maxChecks) {
        clearInterval(intervalId);
        console.log('Stopped checking for Douyin login popup');
    }
}, 500);
document.addEventListener('DOMContentLoaded', closeDouyinLogin);
const observer = new MutationObserver((mutations) => {
    if (closeDouyinLogin()) {
        observer.disconnect();
    }
});
observer.observe(document.body, {
    childList: true,
    subtree: true
});
