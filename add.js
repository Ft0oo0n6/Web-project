
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
    console.log("Adding to cart: ", product);
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
        console.error("Cart container not found");
        return;
    }


    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartContainer.innerHTML = ""; 

    cart.forEach((product) => {
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
    });
}


const viewCartButton = document.getElementById('viewCartButton');
if (viewCartButton) {
    viewCartButton.addEventListener('click', () => {
        window.location.href = 'cart.html'; 
    });
}



document.addEventListener('DOMContentLoaded', function() {
   setupAddToCartButtons();
   
  /* localStorage.removeItem('cart');*/
  
});



document.addEventListener("DOMContentLoaded", () => {
    
    const emptyCartButton = document.querySelector(".empty-cart");

    if (emptyCartButton) {
        emptyCartButton.addEventListener("click", () => {
            localStorage.removeItem("cart");
            displayCart();
            updateCartSummary();
        });
    }
});


function updateCartSummary() {
    document.getElementById("subtotal").innerText = "0 SAR";
    document.getElementById("taxes").innerText = "0 SAR";
    document.getElementById("total").innerText = "0 SAR";
}
