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

        // Loop
        document.querySelectorAll('.cart-item').forEach(item => {
            const quantityInput = item.querySelector('.quantity');
            const quantity = parseInt(quantityInput.value) || 0;
            const price = parseFloat(item.dataset.price) || 0;

            //total price for each item
            const itemTotal = quantity * price;
            subtotal += itemTotal;

          
            const itemPriceElement = item.querySelector('.priceCart');
            itemPriceElement.textContent = `${itemTotal.toFixed(2)} SAR`;
        });


        const taxes = subtotal * taxRate;
        const total = subtotal + taxes + deliveryFee;


        subtotalElement.textContent = `${subtotal.toFixed(2)} SAR`;
        taxesElement.textContent = `${taxes.toFixed(2)} SAR`;
        totalElement.textContent = `${total.toFixed(2)} SAR`;
    }

  
    itemsContainer.addEventListener('click', (e) => {
        const item = e.target.closest('.cart-item'); 
        if (!item) return;

        const quantityInput = item.querySelector('.quantity');

     
        if (e.target.classList.contains('increase')) {
            quantityInput.value = parseInt(quantityInput.value) + 1; 
        }
        
        else if (e.target.classList.contains('decrease')) {
            if (parseInt(quantityInput.value) > 1) {
                quantityInput.value = parseInt(quantityInput.value) - 1; 
            }
        }

        else if (e.target.classList.contains('clearItem')) {
            item.remove(); 
        }

       
        updateCart();
    });


    document.querySelector('.empty-cart').addEventListener('click', () => {
        itemsContainer.innerHTML = ''; 
        updateCart(); 
    });


    document.querySelector('.checkout').addEventListener('click', () => {
        const total = totalElement.textContent; 
        alert(`Your purchase is complete! Total Cost: ${total}`); 
        window.location.href = 'OrderEval.html'; 
    });


    updateCart();
});
