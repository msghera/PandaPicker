const ratingSlider = document.getElementById("ratingSlider");
const currentRatingSpan = document.getElementById("currentRating");

function handleSliderChange() {
    currentRatingSpan.textContent = ratingSlider.value;

    const message = {
        action: 'sliderValueChanged',
        data: ratingSlider.value
    };

    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        const activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, message);
    });
}

ratingSlider.addEventListener("change", handleSliderChange);
currentRatingSpan.textContent = ratingSlider.value;
