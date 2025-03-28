// Confirm that the script is connected
console.log("hamburger.js is connected");

document.addEventListener("DOMContentLoaded", function () {
    // Select the hamburger menu and the navigation menu
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.querySelector("nav ul");

    // Check if the hamburger icon exists before adding the event listener
    if (menuToggle) {
        // Add the event listener for the click event on the hamburger menu
        menuToggle.addEventListener("click", function () {
            // Toggle the 'active' class on the navigation menu to show or hide it
            navMenu.classList.toggle("active");
        });
    }
});
