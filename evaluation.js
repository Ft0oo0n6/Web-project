// Show products when an order is selected
document.getElementById('Order').addEventListener('change', function() {
    const selectedOrder = this.value;

    // If a valid order is selected, show the products
    if (selectedOrder !== "#") {
        document.querySelectorAll('.Product-Eval').forEach(product => {
            product.style.display = 'flex';
        });
    }
});

document.getElementById('Submit-feedback').addEventListener('click', function(event) {
    event.preventDefault();

    const orderSelect = document.getElementById('Order');
    const selectedOrder = orderSelect.value;

    const productCheckboxes = document.querySelectorAll('.Product-Eval input[type="checkbox"]');
    const isProductSelected = Array.from(productCheckboxes).some(checkbox => checkbox.checked);

    const stars = document.querySelectorAll('.Stars img');
    let userRating = Array.from(stars).filter(star => star.src.includes('fullstar.png')).length;

    if (selectedOrder === "#" || userRating === 0) {
        alert("Please make sure you selected an order, a rating and at least one product.");
        return;
    }

    const selectedProducts = Array.from(productCheckboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.closest('.Product-Eval').querySelector('h3').innerText);

    alert(`Thank you for your feedback!\nYour rating for products: ${selectedProducts.join(', ')} is ${userRating}`);

    window.location.href = "Home.html";
});

const stars = document.querySelectorAll('.Stars img');
stars.forEach((star) => {
    star.addEventListener('click', function() {
        if (this.src.includes('emptystar.png')) {
            this.src = 'images/fullstar.png'; 
        } else {
            this.src = 'images/emptystar.png'; 
        }
    });
});
