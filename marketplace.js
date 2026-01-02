// marketplace.js - Handles marketplace and cart
import { initTheme } from './theme.js';

let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartButton = document.getElementById('cart-button');
const cartModal = document.getElementById('cart-modal');
const paymentModal = document.getElementById('payment-modal');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');

export function initMarketplace() {
    // Migrate old cart format if necessary
    if (cart.length > 0 && !cart[0].hasOwnProperty('product')) {
        cart = cart.map(product => ({ product, quantity: 1 }));
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    loadProducts();
    updateCartUI();

    cartButton.addEventListener('click', () => {
        cartModal.style.display = 'flex';
        updateCartUI();
    });

    const viewCartTop = document.getElementById('view-cart-top');
    if (viewCartTop) {
        viewCartTop.addEventListener('click', () => {
            cartModal.style.display = 'flex';
            updateCartUI();
        });
    }

    document.getElementById('checkout-button').addEventListener('click', () => {
        cartModal.style.display = 'none';
        paymentModal.style.display = 'flex';
    });

    document.getElementById('payment-form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Payment successful! (This is a demo)');
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartUI();
        paymentModal.style.display = 'none';
    });
}

async function loadProducts() {
    try {
        const response = await fetch('/api/products');
        const products = await response.json();
        const container = document.getElementById('products-container');
        container.innerHTML = products.map(product => `
            <div class="card">
                <img src="${product.image}" alt="${product.name}" />
                <div class="card-content">
                    <h3>${product.name}</h3>
                    <h4>${product.farm}</h4>
                    <p>$${product.price}</p>
                    <div style="display: flex; align-items: center; margin-top: 10px;">
                        <label for="quantity-${product.id}" style="margin-right: 10px;">Qty:</label>
                        <input type="number" min="1" value="1" id="quantity-${product.id}" style="width: 60px; padding: 5px;">
                        <button onclick="addToCart(${product.id})" style="margin-left: 10px; padding: 5px 10px;">Add to Cart</button>
                    </div>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Failed to load products:', error);
    }
}

window.addToCart = function(productId) {
    fetch('/api/products')
        .then(res => res.json())
        .then(products => {
            const product = products.find(p => p.id === productId);
            if (product) {
                const qty = parseInt(document.getElementById(`quantity-${productId}`).value) || 1;
                const existing = cart.find(item => item.product.id === productId);
                if (existing) {
                    existing.quantity += qty;
                } else {
                    cart.push({ product, quantity: qty });
                }
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartUI();
                // Better feedback
                showNotification(`${product.name} (${qty}) added to cart!`, 'success');
            }
        });
};

function showNotification(message, type) {
    // Create a simple notification
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.background = type === 'success' ? '#28a745' : '#dc3545';
    notification.style.color = 'white';
    notification.style.padding = '10px 20px';
    notification.style.borderRadius = '4px';
    notification.style.zIndex = '1000';
    document.body.appendChild(notification);
    setTimeout(() => {
        document.body.removeChild(notification);
    }, 3000);
}

function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartButton.textContent = `Cart (${totalItems})`;
    cartItems.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <div>
                <strong>${item.product.name}</strong> x${item.quantity} - $${(item.product.price * item.quantity).toFixed(2)}
            </div>
            <button onclick="removeFromCart(${index})">Remove</button>
        </div>
    `).join('');
    const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    cartTotal.textContent = total.toFixed(2);
}

window.removeFromCart = function(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initMarketplace();
});