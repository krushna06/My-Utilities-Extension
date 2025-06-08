function clickReturnToStreamButton() {
    const buttons = Array.from(document.querySelectorAll('div[data-a-target="tw-core-button-label-text"]'));
    const returnButton = buttons.find(btn => 
        btn.textContent.trim() === "Return to stream"
    );
    
    if (returnButton) {
        const buttonElement = returnButton.closest('button');
        if (buttonElement) {
            buttonElement.click();
            console.log('Auto-clicked "Return to stream" button');
        }
    }
}

setInterval(clickReturnToStreamButton, 1000);
document.addEventListener('DOMContentLoaded', clickReturnToStreamButton);
document.addEventListener('load', clickReturnToStreamButton, true);
