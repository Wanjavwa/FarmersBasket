// main.js - Main entry point
import { initTheme } from './theme.js';
import { initRSVP } from './rsvp.js';
import { initRequest } from './request.js';

// Initialize modules
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initRSVP();
    initRequest();

    // Handle Shop Now button
    const shopNowButton = document.getElementById('shopNow');
    if (shopNowButton) {
        shopNowButton.addEventListener('click', () => {
            window.location.href = 'marketplace.html';
        });
    }
});