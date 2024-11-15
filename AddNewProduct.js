function CheckAddProductForm() {

    const nameInput = document.getElementById("product-name");
    const descriptionInput = document.getElementById("AddProductTextarea");
    const priceInput = document.getElementById("base-pricing");
    const stockInput = document.getElementById("stockLabel");
    const categoryInput = document.getElementById("AddProductCategory");
    const imageInput = document.getElementById("addProductImage");

    let missing = "";

    if (nameInput.value == "" || nameInput.value == null) {
        missing = "Product Name";
    }

    if (descriptionInput.value == "" || descriptionInput.value == null) {
        if (missing === "")
            missing = "Description";
        else
            missing += ", Description";
    }

    if (priceInput.value == "" || priceInput.value == null) {
        if (missing === "")
            missing = "Base Pricing";
        else
            missing += ", Base Pricing";
    }

    if (stockInput.value == "" || stockInput.value == null) {
        if (missing === "")
            missing = "Stock";
        else
            missing += ", Stock";
    }

    if (missing !== "") {
        alert(missing + " must be filled.");
        return false;
    }

    if (!/^[^\d]/.test(nameInput.value)) {
        alert("Product name cannot start with a number.");
        return false;
    }

    if (isNaN(priceInput.value)) {
        alert("Base Pricing must be a numeric value.");
        return false;
    }

    if (isNaN(stockInput.value) || !Number.isInteger(Number(stockInput.value))) {
        alert("Stock must be an integer value.");
        return false;
    }

    if (categoryInput.value === "categories") {
        alert("Please select a category.");
        return false;
    }

    if (imageInput.files.length === 0) {
        alert("Please upload an image.");
        return false;
    }

    const file = imageInput.files[0];
    if (!file.type.startsWith("image/")) {
        alert("Only image files are allowed.");
        return false;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        const base64Image = event.target.result;

        const product = {
            name: nameInput.value,
            description: descriptionInput.value,
            price: priceInput.value,
            stock: stockInput.value,
            category: categoryInput.value,
            imageUrl: base64Image
        };

        const products = JSON.parse(localStorage.getItem("products")) || [];
        products.push(product);
        localStorage.setItem("products", JSON.stringify(products));

        alert(`Product "${product.name}" has been added successfully.`);
        document.querySelector("form").reset();

        displayProducts();
    };

    reader.readAsDataURL(file);
    return false;
}

document.addEventListener("DOMContentLoaded", displayProducts);

function displayProducts() {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const productContainer = document.getElementById("SellerProductContainer");

    productContainer.innerHTML = "";

    products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("Product-s");

        const productImage = document.createElement("img");
        productImage.src = product.imageUrl || "images/default-product.png";
        productImage.alt = product.name;

        console.log("Image Source:", productImage.src);

        const productName = document.createElement("h3");
        productName.textContent = product.name;

        const productDescription = document.createElement("p");
        productDescription.textContent = product.description;

        const priceQuanDiv = document.createElement("div");
        priceQuanDiv.classList.add("price-quan");

        const productPrice = document.createElement("div");
        productPrice.classList.add("price");
        productPrice.textContent = `${product.price} SAR`;

        const productQuantity = document.createElement("div");
        productQuantity.classList.add("DashQuan");
        productQuantity.textContent = `Quantity: ${product.stock}`;

        priceQuanDiv.appendChild(productPrice);
        priceQuanDiv.appendChild(productQuantity);

        productDiv.appendChild(productImage);
        productDiv.appendChild(productName);
        productDiv.appendChild(productDescription);
        productDiv.appendChild(priceQuanDiv);

        productContainer.appendChild(productDiv);
    });
}