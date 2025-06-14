function clickClaimBonusButton() {
    const claimButtons = Array.from(document.querySelectorAll('button[aria-label="Claim Bonus"]'));
    
    claimButtons.forEach(button => {
        if (button.offsetParent !== null) {
            button.click();
            console.log('Auto-clicked "Claim Bonus" button');
        }
    });
}

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

function runChecks() {
    clickReturnToStreamButton();
    clickClaimBonusButton();
}

setInterval(runChecks, 1000);
document.addEventListener('DOMContentLoaded', runChecks);
document.addEventListener('load', runChecks, true);
