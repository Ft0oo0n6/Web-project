
function addToCart(product) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find(item => item.name === product.name);
    if (existingProduct) {
    //if product ordy in cart change the quantity
        existingProduct.quantity += product.quantity;
    } else {
        //add prouduct
        cart.push(product);
    }

    
    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();
    
    alert(`${product.name} has been added to cart`);
}


// function for add to cart button
function setupAddToCartButtons() {
    
    const addToCartButtons = document.querySelectorAll(".add-to-cart");

    addToCartButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            const productCard = event.target.closest(".product-card");

            // collect informatoin 
            const quantityInput = productCard.querySelector(".quantity11"); 
            const quantity = parseInt(quantityInput.value, 10); 

            const product = {
                name: productCard.querySelector(".product-title").innerText, 
                description: productCard.querySelector("p").innerText, 
                price: parseFloat(productCard.querySelector(".product-price").innerText.replace(" SAR", "")),
                imageUrl: productCard.querySelector("img").src, 
                quantity: quantity 
            };

            
            addToCart(product);
        });
    });
}

function displayCart() {
    const cartContainer = document.querySelector("#itemsContainer");


   if (!cartContainer) {
        return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

   

    let subtotal = 0;

    cartContainer.innerHTML = ""; 
    if (cart.length === 0) {
        // إذا كانت السلة فارغة، تعيين المجموع إلى صفر
        document.getElementById("subtotal").innerText = `0.00 SAR`;
        document.getElementById("taxes").innerText = `0.00 SAR`;
        document.getElementById("total").innerText = `0.00 SAR`;
        return;
    }

    cart.forEach(product => {
        const productElement = document.createElement("div");
        productElement.classList.add("cart-item");
        productElement.innerHTML = `
            <img src="${product.imageUrl}" alt="${product.name}" class="Cart-product-image">
            <div class="quanDescrip">
                <div class="descrip">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                </div>
                <div class="CartQuantity">
                    <button type="button" class="decrease">-</button>
                    <input type="number" class="quantity" value="${product.quantity}" min="1">
                    <button type="button" class="increase">+</button>
                </div>
            </div>
            <p class="priceCart">${(product.price * product.quantity).toFixed(2)} SAR</p>
            <button type="button" class="clearItem">
                <img src="images/trash-icon.png" alt="Cart Icon" width="20" height="20">
            </button>
        `;

        cartContainer.appendChild(productElement);

        subtotal += product.price * product.quantity;
    });

    
    const taxes = subtotal * 0.15; 
    const deliveryFee = 20; 
    const total = subtotal + taxes + deliveryFee;

    //update the conntent in interface
    document.getElementById("subtotal").innerText = `${subtotal.toFixed(2)} SAR`;
    document.getElementById("taxes").innerText = `${taxes.toFixed(2)} SAR`;
    document.getElementById("total").innerText = `${total.toFixed(2)} SAR`;
}
const viewCartButton = document.getElementById('viewCartButton');
if (viewCartButton) {
    viewCartButton.addEventListener('click', () => {
        window.location.href = 'cart.html'; 
    });
}



document.addEventListener('DOMContentLoaded', function() {
   setupAddToCartButtons();
  
});




function emptyCart() {
    localStorage.removeItem("cart"); // remove from localStorage
    displayCart(); 
}

// setup for empty-cart button
document.addEventListener("DOMContentLoaded", () => {
    const emptyCartButton = document.querySelector(".empty-cart");
    if (emptyCartButton) {
        emptyCartButton.addEventListener("click", () => {
            emptyCart();
        });
    }

    displayCart();
});



function updateCartTotals(cart) {
    let subtotal = 0;

    // count the total
    cart.forEach(product => {
        subtotal += product.price * product.quantity;
    });

    const taxes = (subtotal * 0.15).toFixed(2); 
    const deliveryFee = 20; 
    const total = (subtotal + parseFloat(taxes) + deliveryFee).toFixed(2);

    updateCartSummary(subtotal, taxes, total);
}

// increace and decrece button
document.addEventListener("click", (e) => {
    const item = e.target.closest(".CartQuantity");
    if (!item) return;

    const quantityInput = item.querySelector(".quantity");
    const productName = item.closest(".cart-item").querySelector("h3").innerText;
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    let currentValue = parseInt(quantityInput.value, 10);

    if (e.target.classList.contains("increase")) {
        quantityInput.value = currentValue + 1;
    } else if (e.target.classList.contains("decrease")) {
        if (currentValue > 1) {
            quantityInput.value = currentValue - 1;
        }
    }

    // update the qantety in localStorage
    const updatedProduct = cart.find((product) => product.name === productName);
    if (updatedProduct) {
        updatedProduct.quantity = parseInt(quantityInput.value, 10);
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    displayCart(); 
});


document.addEventListener("click", function (e) {
    // (Trash Icon)
    if (e.target.closest(".clearItem")) {
        const cartItem = e.target.closest(".cart-item"); // The item that contains the product information
        const productName = cartItem.querySelector(".descrip h3").innerText; //Extract the name of the product to be deleted

        
        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        // Check for product existence and delete it only
        const updatedCart = cart.filter(product => product.name !== productName);

        // update localStorage
        localStorage.setItem("cart", JSON.stringify(updatedCart));

        // delete iteme
        cartItem.remove();

        
        displayCart();
    }
});



function updateCartSummary() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let subtotal = 0;

    cart.forEach(product => {
        subtotal += product.price * product.quantity;
    });

    const taxes = subtotal * 0.15; 
    const deliveryFee = 20; 
    const total = subtotal + taxes + deliveryFee;

    document.getElementById("subtotal").innerText = `${subtotal.toFixed(2)} SAR`;
    document.getElementById("taxes").innerText = `${taxes.toFixed(2)} SAR`;
    document.getElementById("total").innerText = `${total.toFixed(2)} SAR`;
}
