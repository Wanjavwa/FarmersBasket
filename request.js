// request.js - Handles produce request functionality
export async function initRequest() {
    const requestForm = document.getElementById('request-form');
    if (requestForm) {
        requestForm.addEventListener('submit', handleRequestSubmit);
    }
    loadRequests();
}

async function handleRequestSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    try {
        const response = await fetch('/api/request', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        if (result.success) {
            alert('Request submitted successfully!');
            event.target.reset();
            loadRequests();
        } else {
            alert('Error: ' + result.message);
        }
    } catch (error) {
        console.error('Failed to submit request:', error);
    }
}

async function loadRequests() {
    try {
        const response = await fetch('/api/requests');
        const requests = await response.json();
        const container = document.getElementById('requests-container');
        if (container) {
            container.innerHTML = requests.slice(-5).map(req => `
                <div class="request-item">
                    <p><strong>${req.produce}</strong> - Quantity: ${req.quantity}</p>
                    <p>Notes: ${req.notes || 'None'}</p>
                    <small>Submitted: ${new Date(req.timestamp).toLocaleString()}</small>
                </div>
            `).join('');
        }
    } catch (error) {
        console.error('Failed to load requests:', error);
    }
}