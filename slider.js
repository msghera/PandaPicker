// Get references to the slider and the span element
const ratingSlider = document.getElementById("ratingSlider");
const currentRatingSpan = document.getElementById("currentRating");

// Function to handle slider value changes
function handleSliderChange() {
    // Retrieve the current value of the slider
    const selectedRating = ratingSlider.value;
    
    // Update the text content of the span element
    currentRatingSpan.textContent = selectedRating;
}

// Add an event listener to the slider using the onChange event
ratingSlider.addEventListener("change", handleSliderChange);

// Initialize the text content with the default slider value
currentRatingSpan.textContent = ratingSlider.value;
