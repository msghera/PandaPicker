const ratingSlider = document.getElementById("ratingSlider");
const currentRatingSpan = document.getElementById("currentRating");

function setSliderValue(value) {
    chrome.storage.local.set({ sliderValue: value });
}

function getSliderValue(callback) {
    chrome.storage.local.get(['sliderValue'], function(result) {
        const sliderValue = result.sliderValue || 0.0;
        callback(sliderValue);
    });
}

function updateSliderValue() {
    const ratingSlider = document.getElementById("ratingSlider");
    const currentRating = document.getElementById("currentRating");
    
    getSliderValue(function(sliderValue) {
        ratingSlider.value = sliderValue;
        currentRating.textContent = sliderValue; 
    });
}

document.addEventListener('DOMContentLoaded', updateSliderValue);

function handleSliderChange() {
    currentRatingSpan.textContent = ratingSlider.value;
    setSliderValue(ratingSlider.value);

    const message = {
        action: 'sliderValueChanged',
        rating: ratingSlider.value
    };

    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        const activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, message);
    });
}

ratingSlider.addEventListener("change", handleSliderChange);
currentRatingSpan.textContent = ratingSlider.value;
