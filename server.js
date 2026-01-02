const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static('.')); // serve static files from current directory
app.use(express.json()); // for parsing JSON

const rsvpsFile = path.join(__dirname, 'rsvps.json');
const requestsFile = path.join(__dirname, 'requests.json');

// Load RSVPs from file
let rsvps = [];
let rsvpCount = 3;

// Load Requests from file
let requests = [];

try {
  if (fs.existsSync(rsvpsFile)) {
    const data = fs.readFileSync(rsvpsFile, 'utf8');
    const parsed = JSON.parse(data);
    rsvps = parsed.rsvps || [];
    rsvpCount = parsed.count || 3;
  } else {
    // Initial data
    rsvps = [
      { name: 'Prevailer', state: 'Jewwethall', event: 'Green Market Festival' },
      { name: 'Favor', state: 'Robinson', event: 'Farmers Meetup' },
      { name: 'Imran', state: 'Texas', event: 'Green Market Festival' }
    ];
    saveRSVPs();
  }
} catch (error) {
  console.error('Error loading RSVPs:', error);
}

try {
  if (fs.existsSync(requestsFile)) {
    const data = fs.readFileSync(requestsFile, 'utf8');
    requests = JSON.parse(data);
  }
} catch (error) {
  console.error('Error loading requests:', error);
  requests = [];
}

function saveRSVPs() {
  try {
    fs.writeFileSync(rsvpsFile, JSON.stringify({ rsvps, count: rsvpCount }, null, 2));
  } catch (error) {
    console.error('Error saving RSVPs:', error);
  }
}

function saveRequests() {
  try {
    fs.writeFileSync(requestsFile, JSON.stringify(requests, null, 2));
  } catch (error) {
    console.error('Error saving requests:', error);
  }
}

app.get('/api/rsvps', (req, res) => {
  res.json({ count: rsvpCount, participants: rsvps });
});

app.post('/api/rsvp', (req, res) => {
  const { name, state, event } = req.body;
  if (name && state && event) {
    rsvps.push({ name, state, event });
    rsvpCount++;
    saveRSVPs();
    res.json({ success: true, count: rsvpCount });
  } else {
    res.status(400).json({ success: false, message: 'Missing fields' });
  }
});

app.get('/api/requests', (req, res) => {
  res.json(requests);
});

app.post('/api/request', (req, res) => {
  const { produce, quantity, notes } = req.body;
  if (produce && quantity) {
    const request = { id: Date.now(), produce, quantity: parseInt(quantity), notes: notes || '', timestamp: new Date().toISOString() };
    requests.push(request);
    saveRequests();
    res.json({ success: true });
  } else {
    res.status(400).json({ success: false, message: 'Missing fields' });
  }
});

// Products data
const products = [
  { id: 1, name: 'Organic Tomatoes', farm: 'Green Valley Farm', price: 3, image: 'templates/tomatoes.jpg' },
  { id: 2, name: 'Hearty Potatoes', farm: 'Rose Well Farm', price: 5, image: 'templates/potatoes.jpg' },
  { id: 3, name: 'Ground Beef', farm: 'N\'gombe Farm', price: 8, image: 'templates/groundbeef.jpg' },
  { id: 4, name: 'Fresh Carrots', farm: 'Sunny Acres', price: 2, image: 'templates/carrots.jpg' },
  { id: 5, name: 'Organic Apples', farm: 'Orchard Hills', price: 4, image: 'templates/apples.jpg' },
  { id: 6, name: 'Grass-Fed Chicken', farm: 'Happy Cows Farm', price: 10, image: 'templates/chicken.jpg' },
  { id: 7, name: 'Local Honey', farm: 'Bee Haven', price: 6, image: 'templates/honey.jpg' },
  { id: 8, name: 'Fresh Lettuce', farm: 'Green Leaf Gardens', price: 3, image: 'templates/lettuce.jpg' },
  { id: 9, name: 'Artisan Cheese', farm: 'Dairy Delight', price: 7, image: 'templates/cheese.jpg' }
];

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});