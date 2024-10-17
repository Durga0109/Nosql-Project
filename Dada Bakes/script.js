// Function to add items to the cart and store them in localStorage
function addToCart(itemName, itemPrice, itemImage) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the item already exists in the cart
    let existingItem = cart.find(item => item.name === itemName);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name: itemName, price: itemPrice, image: itemImage, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${itemName} has been added to your cart.`);
}

// Function to load items into the cart page dynamically
function loadCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.querySelector('.cart-container');
    cartContainer.innerHTML = ''; // Clear existing items

    cart.forEach(item => {
        cartContainer.innerHTML += `
            <div class="cart-item">
                <div class="item-details">
                    <img src="${item.image}" alt="${item.name}">
                    <span class="item-name">${item.name}</span>
                </div>
                <div class="item-info">Rs. ${item.price}</div>
                <div class="quantity-control">
                    <button class="quantity-btn" onclick="updateQuantity(this, -1)">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(this, 1)">+</button>
                </div>
                <div class="item-total">Rs. ${item.price * item.quantity}</div>
            </div>
        `;
    });

    updateGrandTotal();
}

// Function to update the quantity and total for each item
function updateQuantity(button, change) {
    const quantityElement = button.parentElement.querySelector('.quantity');
    const totalElement = button.parentElement.parentElement.querySelector('.item-total');
    const itemName = button.parentElement.parentElement.querySelector('.item-name').textContent;
    const itemPrice = parseInt(button.parentElement.parentElement.querySelector('.item-info').textContent.replace('Rs. ', ''));
    let quantity = parseInt(quantityElement.textContent);

    // Update the quantity based on the button click (increment or decrement)
    quantity += change;

    // Allow quantity to reach zero but not go below
    if (quantity < 0) {
        quantity = 0; // Set the minimum quantity to 0 but do not remove the item from the cart
    }

    // Update the quantity display
    quantityElement.textContent = quantity;

    // Calculate the new total for the item and update the display
    const newTotal = itemPrice * quantity;
    totalElement.textContent = `Rs. ${newTotal}`;

    // Update the cart in localStorage with the new quantity
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(product => product.name === itemName);

    if (item) {
        item.quantity = quantity;
        if (item.quantity <= 0) {
            cart = cart.filter(product => product.name !== itemName); // Remove the item if quantity is zero
        }
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateGrandTotal(); // Update the grand total to reflect changes
}

// Function to update the grand total based on all item totals
function updateGrandTotal() {
    const totalElements = document.querySelectorAll('.item-total');
    let grandTotal = 0;

    // Sum up all item totals to calculate the grand total
    totalElements.forEach(item => {
        grandTotal += parseInt(item.textContent.replace('Rs. ', '')) || 0;
    });

    // Display the updated grand total
    document.querySelector('.grand-total').textContent = `Grand Total: Rs. ${grandTotal}`;
}

// Automatically load cart items and update grand total when the cart page is opened
window.onload = loadCartItems;

// JavaScript for modal functionality
document.getElementById('login-link').addEventListener('click', function () {
    document.getElementById('login-modal').style.display = 'block';
});

document.getElementById('signup-link').addEventListener('click', function () {
    document.getElementById('signup-modal').style.display = 'block';
});

document.getElementById('close-login').addEventListener('click', function () {
    document.getElementById('login-modal').style.display = 'none';
});

document.getElementById('close-signup').addEventListener('click', function () {
    document.getElementById('signup-modal').style.display = 'none';
});

// Close modal when clicking outside of it
window.addEventListener('click', function (event) {
    if (event.target === document.getElementById('login-modal')) {
        document.getElementById('login-modal').style.display = 'none';
    }
    if (event.target === document.getElementById('signup-modal')) {
        document.getElementById('signup-modal').style.display = 'none';
    }
});

// User account dropdown functionality
document.getElementById('user-icon').addEventListener('click', function() {
    const dropdownMenu = document.getElementById('dropdown-menu');
    dropdownMenu.classList.toggle('open');
});
document.getElementById('hamburgerMenu').addEventListener('click', function() {
    const navbarMenu = document.getElementById('navbarMenu');
    navbarMenu.classList.toggle('open');
});