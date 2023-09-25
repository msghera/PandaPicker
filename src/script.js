console.log("Starting...");

MINIMUM_VALUE = 4.0;

function getRatingFromString(ratingString) {
    if (!ratingString.includes('/5')) {
        return 0   
    }
    
    const theRating = parseFloat(ratingString.split('/')[0]);
    return theRating;
}

function removeLowRatingCard(minimumRating, card) {
    const theRatingStringElement = card.querySelector('.rating--label-primary');
    if (!theRatingStringElement) {
        return false;
    }
    const ratingString = theRatingStringElement.innerText;
    const rating = getRatingFromString(ratingString);

    if (rating < minimumRating) {
        card.parentElement.remove()
        return true;
    }
    return false;
}

function refresh(minimumRating = MINIMUM_VALUE) {

    const foodCards = document.querySelectorAll('.vendor-tile-wrapper');

    let hiddenCount = 0;

    for (const card of [...foodCards]) {
        const isHidden = removeLowRatingCard(minimumRating, card)

        if (isHidden) {
            hiddenCount++;
        }
    }

    console.log(`Filtering options below rating (${minimumRating}/5): removed ${hiddenCount} options`)
}

(() => {
    refresh(MINIMUM_VALUE);
    
    setInterval(() => refresh(MINIMUM_VALUE), 2000)
})()


function handleMessageFromScript(message) {
    if (message.action === 'sliderValueChanged') {

        rating = message.data;
        console.log('Message received in content.js:', data);
    }
}

chrome.runtime.onMessage.addListener(handleMessageFromScript);
