console.log("Starting...");


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

function refresh(minimumRating = undefined) {

    minimumRating = minimumRating === undefined ? 0 : minimumRating;

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
    refresh()
    setInterval(() => refresh(), 2000)
})()

