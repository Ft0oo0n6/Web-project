document.addEventListener('DOMContentLoaded', () => {
    // update the cart totals
    const itemsContainer = document.getElementById('itemsContainer');
    const subtotalElement = document.getElementById('subtotal');
    const taxesElement = document.getElementById('taxes');
    const totalElement = document.getElementById('total');
    const deliveryFee = 20; // Fixed delivery fee
    const taxRate = 0.15; // 15% tax rate

    // Function  update the cart totals
    function updateCart() {
        let subtotal = 0;

        // Loop each cart item to calculate totals
        document.querySelectorAll('.cart-item').forEach(item => {
            const quantityInput = item.querySelector('.quantity');
            const quantity = parseInt(quantityInput.value) || 0;
            const price = parseFloat(item.dataset.price) || 0;

            // Calculate total price for each item
            const itemTotal = quantity * price;
            subtotal += itemTotal;

            // Update displayed item price
            const itemPriceElement = item.querySelector('.priceCart');
            itemPriceElement.textContent = `${itemTotal.toFixed(2)} SAR`;
        });

        // Calculate taxes and total
        const taxes = subtotal * taxRate;
        const total = subtotal + taxes + deliveryFee;

        // Update subtotal, taxes, and total in the UI
        subtotalElement.textContent = `${subtotal.toFixed(2)} SAR`;
        taxesElement.textContent = `${taxes.toFixed(2)} SAR`;
        totalElement.textContent = `${total.toFixed(2)} SAR`;
    }





  /*  // Event listeners for increasing or decreasing item quantities
    itemsContainer.addEventListener('click', (e) => {

        const item = e.target.closest('.cart-item'); // Find the nearest cart item
        if (!item) return;

        const quantityInput = item.querySelector('.quantity');

        // Check if user clicked the "+" button
        if (e.target.classList.contains('increase')) {
            quantityInput.value = parseInt(quantityInput.value) + 1; // Increase quantity
        }
        // Check if user clicked the "-" button
        else if (e.target.classList.contains('decrease')) {
            if (parseInt(quantityInput.value) > 1) {
                quantityInput.value = parseInt(quantityInput.value) - 1; // Decrease quantity
            }
        }
        // Check if user clicked the trash icon to remove the item
        else if (e.target.classList.contains('clearItem')) {
            item.remove(); // Remove the entire cart item
        }

        // Update the cart totals after any change
        updateCart();
    }); */





  /*  // Event listener for "Empty Cart" button to clear all items
    document.querySelector('.empty-cart').addEventListener('click', () => {
        itemsContainer.innerHTML = ''; // Remove all items from the cart
        updateCart(); // Update totals to zero
    });*/
    

    // Event listener for the "Checkout" button
    document.querySelector('.checkout').addEventListener('click', () => {
        const total = totalElement.textContent; // Get the total amount
        alert(`Your purchase is complete! Total Cost: ${total}`); // Show a confirmation message
        window.location.href = 'OrderEval.html'; // Redirect to evaluation page
    });

    // Initialize cart totals when the page loads
    updateCart();
});
