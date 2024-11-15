// Function to apply the saved theme on page load
function applySavedTheme() {
    const mainTheme = document.getElementById("main-theme-stylesheet");
    const blueTheme = document.getElementById("blue-theme-stylesheet");

    // Check the saved theme in localStorage
    const savedTheme = localStorage.getItem("selectedTheme");

    if (savedTheme === "blue") {
        // Apply blue theme
        blueTheme.disabled = false;
        mainTheme.disabled = true;
    } else {
        // Apply main theme by default
        blueTheme.disabled = true;
        mainTheme.disabled = false;
    }
}

// Function to toggle the theme and save the selection
function toggleTheme() {
    const mainTheme = document.getElementById("main-theme-stylesheet");
    const blueTheme = document.getElementById("blue-theme-stylesheet");

    if (blueTheme.disabled) {
        // Enable blue theme, disable main theme, and save the choice
        blueTheme.disabled = false;
        mainTheme.disabled = true;
        localStorage.setItem("selectedTheme", "blue");
    } else {
        // Enable main theme, disable blue theme, and save the choice
        blueTheme.disabled = true;
        mainTheme.disabled = false;
        localStorage.setItem("selectedTheme", "main");
    }
}

// Apply the saved theme on page load
applySavedTheme();
