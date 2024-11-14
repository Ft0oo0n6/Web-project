
function sortProducts() {
    const sortOption = document.getElementById("sortNamePrice").value;
    const productContainer = document.querySelector(".ulCategory");
    const products = Array.from(productContainer.querySelectorAll(".product-card"));

    // Sorting logic based on selected option
    products.sort((a, b) => {
        let valueA, valueB;

        if (sortOption === "name-asc") {
            // Sort alphabetically A-Z
            valueA = a.querySelector(".product-title").innerText.toLowerCase();
            valueB = b.querySelector(".product-title").innerText.toLowerCase();
            return valueA.localeCompare(valueB);
        } else if (sortOption === "name-desc") {
            // Sort alphabetically Z-A
            valueA = a.querySelector(".product-title").innerText.toLowerCase();
            valueB = b.querySelector(".product-title").innerText.toLowerCase();
            return valueB.localeCompare(valueA);
        } else if (sortOption === "price-asc") {
            // Sort by price low to high
            valueA = parseFloat(a.querySelector(".product-price").innerText.replace(" SAR", ""));
            valueB = parseFloat(b.querySelector(".product-price").innerText.replace(" SAR", ""));
            return valueA - valueB;
        } else if (sortOption === "price-desc") {
            // Sort by price high to low
            valueA = parseFloat(a.querySelector(".product-price").innerText.replace(" SAR", ""));
            valueB = parseFloat(b.querySelector(".product-price").innerText.replace(" SAR", ""));
            return valueB - valueA;
        }
    });

    // Clear and re-add sorted products
    productContainer.innerHTML = "";
    products.forEach(product => productContainer.appendChild(product));
}
