console.log("hello");

let resizeTimeout;

// Wait for the DOM to be fully loaded before executing the layout function
document.addEventListener('DOMContentLoaded', function () {
    // Wait for the images to load before arranging them into columns
    window.onload = createImageColumns;

    // Resize event listener
    window.addEventListener('resize', function () {
        // Clear the timeout if the resize event is triggered repeatedly
        clearTimeout(resizeTimeout);

        // Set a timeout to run the createImageColumns function after resizing is done
        resizeTimeout = setTimeout(createImageColumns, 100);
    });
});

function createImageColumns() {
    // Select all divs with class 'image_with_info'
    const imageDivs = document.querySelectorAll('.image_with_info');
    const columns = document.querySelectorAll('.image_container section');
    const screenWidth = window.innerWidth;

    // Set number of columns based on screen width (max 3 columns)
    let numColumns = 1;

    if (screenWidth >= 1000) {
        numColumns = 3;
    } else if (screenWidth >= 400) {
        numColumns = 2;
    } else {
        numColumns = 1;
    }

    // Hide extra columns if they are not needed
    columns.forEach((col, index) => {
        if (index < numColumns) {
            col.style.display = 'block';  // Show columns
        } else {
            col.style.display = 'none';  // Hide unused columns
        }
    });

    // First, clear the content of each column (before adding divs)
    columns.forEach(col => col.innerHTML = '');

    // Create an array to store the column heights
    let columnHeights = Array(numColumns).fill(0);  // Initialize with 0 height for each column

    // Distribute the divs to columns in a way that balances the heights
    imageDivs.forEach((div, index) => {
        // Find the column with the smallest height
        const columnIndex = columnHeights.indexOf(Math.min(...columnHeights));

        // Append the image div to the column with the smallest height
        columns[columnIndex].appendChild(div);

        // Update the height of the column after appending the div
        columnHeights[columnIndex] += div.offsetHeight;
    });

    // Force a layout recalculation (reflow) to ensure the heights are updated correctly
    columns.forEach(col => col.offsetHeight); // Trigger a reflow
}
