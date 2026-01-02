// rsvp.js - Handles RSVP functionality with API
let rsvpCount = 3;
const participantsDiv = document.querySelector('.rsvp-participants');
const rsvpCountElement = document.getElementById('rsvp-count');

export async function initRSVP() {
    // Load initial RSVPs from API
    try {
        const response = await fetch('/api/rsvps');
        const data = await response.json();
        rsvpCount = data.count;
        updateRSVPUI(data.participants);
    } catch (error) {
        console.error('Failed to load RSVPs:', error);
    }

    // Attach event listeners to forms
    const eventForms = document.querySelectorAll('.event-rsvp-form');
    eventForms.forEach(form => {
        form.addEventListener('submit', handleRSVPSubmit);
    });
}

function updateRSVPUI(participants) {
    if (rsvpCountElement) {
        rsvpCountElement.textContent = `⭐ ${rsvpCount} people have RSVP'd to this event!`;
    }
    if (participantsDiv) {
        // Clear existing
        const existing = participantsDiv.querySelectorAll('p');
        existing.forEach(p => p.remove());
        // Add new
        participants.forEach(p => {
            const newP = document.createElement('p');
            newP.textContent = `🎟️ ${p.name} from ${p.state} has RSVP'd for ${p.event}.`;
            participantsDiv.appendChild(newP);
        });
    }
}

async function handleRSVPSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const name = form.querySelector('input[name="name"]').value.trim();
    const state = form.querySelector('input[name="state"]').value.trim();
    const email = form.querySelector('input[type="email"]').value.trim();
    const eventCard = form.closest('.event-card');
    const eventName = eventCard ? eventCard.getAttribute('data-event') : 'Event';

    // Validation
    let hasErrors = false;
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        if (input.value.trim().length < 2) {
            hasErrors = true;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });
    if (!email.includes('@')) {
        hasErrors = true;
        form.querySelector('input[type="email"]').classList.add('error');
    }

    if (!hasErrors) {
        try {
            const response = await fetch('/api/rsvp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, state, event: eventName })
            });
            const result = await response.json();
            if (result.success) {
                rsvpCount = result.count;
                // Reload RSVPs
                const res = await fetch('/api/rsvps');
                const data = await res.json();
                updateRSVPUI(data.participants);
                toggleModal({ name, state, email });
                inputs.forEach(input => input.value = '');
            }
        } catch (error) {
            console.error('Failed to submit RSVP:', error);
        }
    }
}

function toggleModal(person) {
    const modal = document.getElementById('success-modal');
    const modalText = document.getElementById('modal-text');
    const modalImage = document.getElementById('modal-image');

    modal.style.display = 'flex';
    modalText.textContent = `Thanks for RSVPing, ${person.name}! We can't wait to see you.`;

    // Animate image
    let rotate = 0;
    const animate = () => {
        rotate = rotate === 0 ? -10 : 0;
        modalImage.style.transform = `rotate(${rotate}deg)`;
    };
    const intervalId = setInterval(animate, 400);

    setTimeout(() => {
        modal.style.display = 'none';
        clearInterval(intervalId);
    }, 5000);
}