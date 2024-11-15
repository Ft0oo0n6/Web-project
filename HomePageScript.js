function displayWeekStartDate() {

    const today = new Date();

    const daysToSunday = today.getDay(); 
    
    const weekStartDate = new Date(today);
    weekStartDate.setDate(today.getDate() - daysToSunday);

    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    const formattedDate = weekStartDate.toLocaleDateString('en-US', options);

    document.getElementById("WeekDate").textContent = `Current Week’s Date: ${formattedDate}`;
}

window.onload = displayWeekStartDate;

document.getElementById("toggleButton").addEventListener("click", function() {
    const hiddenOffers = document.querySelectorAll(".offers-container .offer.hidden");
    const allOffers = document.querySelectorAll(".offers-container .offer");
    const isExpanded = this.textContent === "Show Less";

    if (isExpanded) {
        // Hide all offers after the first 3
        allOffers.forEach((offer, index) => {
            if (index >= 3) {
                offer.classList.add("hidden");
            }
        });
        this.textContent = "Show More";
    } else {
        // Show all hidden offers
        hiddenOffers.forEach((offer) => {
            offer.classList.remove("hidden");
        });
        this.textContent = "Show Less";
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const reviews = document.querySelectorAll(".custReview");
    const tooltip = document.getElementById("reviewTooltip");

    reviews.forEach(review => {
        review.addEventListener("mouseenter", (e) => {
            // Get data attributes from the hovered review
            const customerName = review.getAttribute("data-customer-name");
            const productName = review.getAttribute("data-product-name");
            const rating = review.getAttribute("data-rating");
            const feedback = review.getAttribute("data-feedback");

            // Set the content of the tooltip with only the specified details
            tooltip.innerHTML = `
                <strong>Customer:</strong> ${customerName}<br>
                <strong>Product:</strong> ${productName}<br>
                <strong>Rating:</strong> ${rating} <img src="images/25069.png" alt="star" width="12" height="12"><br>
                <strong>Feedback:</strong> ${feedback}
            `;

            // Position and show the tooltip
            tooltip.style.left = `${e.pageX + 10}px`;
            tooltip.style.top = `${e.pageY + 10}px`;
            tooltip.classList.remove("hidden");
        });

        review.addEventListener("mousemove", (e) => {
            // Update the position of the tooltip while moving within the review
            tooltip.style.left = `${e.pageX + 10}px`;
            tooltip.style.top = `${e.pageY + 10}px`;
        });

        review.addEventListener("mouseleave", () => {
            // Hide the tooltip when mouse leaves the review
            tooltip.classList.add("hidden");
        });
    });
});

