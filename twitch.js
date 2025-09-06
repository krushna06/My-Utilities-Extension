function clickClaimBonusButton() {
    const claimButtons = Array.from(document.querySelectorAll('button[aria-label="Claim Bonus"]'));
    
    claimButtons.forEach(button => {
        if (button.offsetParent !== null) {
            button.click();
            console.log('Auto-clicked "Claim Bonus" button');
        }
    });
}

function clickLabelButton(labelText) {
    const buttons = Array.from(document.querySelectorAll('div[data-a-target="tw-core-button-label-text"]'));
    const targetButton = buttons.find(btn => 
        btn.textContent.trim() === labelText
    );
    
    if (targetButton) {
        const buttonElement = targetButton.closest('button, div.ScCoreButtonLabel-sc-s7h2b7-0');
        if (buttonElement) {
            buttonElement.click();
            console.log(`Auto-clicked "${labelText}" button`);
        }
    }
}

function runChecks() {
    clickClaimBonusButton();
    clickLabelButton("Return to stream");
    clickLabelButton("Click Here to Reload Player");
}

setInterval(runChecks, 1000);
document.addEventListener('DOMContentLoaded', runChecks);
document.addEventListener('load', runChecks, true);
