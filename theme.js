// theme.js - Handles dark mode functionality
export function initTheme() {
    const themeButton = document.getElementById("theme-button");

    const toggleDarkMode = () => {
        document.body.classList.toggle("dark-mode");
        if (document.body.classList.contains("dark-mode")) {
            themeButton.textContent = "Light Mode";
        } else {
            themeButton.textContent = "Dark Mode";
        }
    };

    if (themeButton) {
        themeButton.addEventListener("click", toggleDarkMode);
    }
}