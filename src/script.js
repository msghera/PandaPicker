MINIMUM_RATING = 0.0;
const REREST_INTERVAL_IN_MS = 2000;

chrome.storage.local.get(['sliderValue'], function(result) {
    MINIMUM_RATING = result.sliderValue || 0.0;
});


function getRatingFromString(ratingString) {
    if (!ratingString.includes('/5')) {
        return 0   
    }
    
    const theRating = parseFloat(ratingString.split('/')[0]);
    return theRating;
}

function showCard(card){
    card.parentElement.style.display = '';
}

function hideCard(card){
    card.parentElement.style.display = 'none';
}


function processCard(minimumRating, card) {
    
    const theRatingStringElement = card.querySelector('.rating--label-primary');
    if (theRatingStringElement) {
        const ratingString = theRatingStringElement.innerText;
        const rating = getRatingFromString(ratingString);

        rating < minimumRating ? hideCard(card) : showCard(card);
    }
    
}

function refresh(minimumRating = MINIMUM_VALUE) {

    const foodCards = document.querySelectorAll('.vendor-tile-wrapper');

    for (const card of [...foodCards]) {
        processCard(minimumRating, card);
    }
}

(() => {
    refresh(MINIMUM_RATING);
    
    setInterval(() => refresh(MINIMUM_RATING), REREST_INTERVAL_IN_MS)
})()


function handleMessageFromScript(message) {
    if (message.action === 'sliderValueChanged') {

        MINIMUM_RATING = message.rating;
        console.log('Minimum rating changed to:', MINIMUM_RATING);
    }
}

chrome.runtime.onMessage.addListener(handleMessageFromScript);
