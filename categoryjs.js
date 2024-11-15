
function sortProducts() {
    const sortOption = document.getElementById("sortNamePrice").value;
    const productContainer = document.querySelector(".ulCategory");
    const products = Array.from(productContainer.querySelectorAll(".product-card"));

    // Sorting logic based on selected option
    products.sort((a, b) => {
        let valueA, valueB;
    
        if (sortOption === "name-asc") {
            valueA = a.querySelector(".product-title").innerText.toLowerCase();
            valueB = b.querySelector(".product-title").innerText.toLowerCase();
            
            if (valueA < valueB) return -1;
            if (valueA > valueB) return 1;
            return 0;
            
        } else if (sortOption === "name-desc") {
            valueA = a.querySelector(".product-title").innerText.toLowerCase();
            valueB = b.querySelector(".product-title").innerText.toLowerCase();
            
            if (valueA > valueB) return -1;
            if (valueA < valueB) return 1;
            return 0;
            
        } else if (sortOption === "price-asc") {
            valueA = parseFloat(a.querySelector(".product-price").innerText.replace(" SAR", ""));
            valueB = parseFloat(b.querySelector(".product-price").innerText.replace(" SAR", ""));
            return valueA - valueB;
            
        } else if (sortOption === "price-desc") {
            valueA = parseFloat(a.querySelector(".product-price").innerText.replace(" SAR", ""));
            valueB = parseFloat(b.querySelector(".product-price").innerText.replace(" SAR", ""));
            return valueB - valueA;
        }
    });
    

    // Clear and re-add sorted products
    productContainer.innerHTML = "";
    products.forEach(product => productContainer.appendChild(product));
}
