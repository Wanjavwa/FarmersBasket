# FarmersBasket

Farmers Basket is a digital platform designed to connect local farmers directly with consumers. Through the website, farmers can post upcoming events, list products in a shared marketplace, and respond to community demand. Consumers can browse available goods, RSVP to local farming events, and request specific produce through the “Request Produce” feature. By reducing reliance on traditional retail channels, Farmers Basket helps support small-scale farmers while giving consumers easier access to fresh, locally sourced food.

## Features

- **Marketplace**: Browse and purchase fresh produce
- **Events**: RSVP to local farmers' events
- **Dark Mode**: Toggle between light and dark themes
- **Shopping Cart**: Add items and proceed to payment (demo)
- **Responsive Design**: Works on desktop and mobile

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript (ES6 Modules)
- **Backend**: Node.js, Express
- **Data Storage**: File-based persistence (RSVPs saved to rsvps.json)

## Project Structure

```
farmersbasket/
├── index.html          # Home page
├── marketplace.html    # Full marketplace page
├── styles.css          # Stylesheets
├── main.js             # Main entry point (home page)
├── marketplace.js      # Marketplace logic
├── theme.js            # Dark mode functionality
├── rsvp.js             # RSVP handling
├── request.js          # Produce request handling
├── server.js           # Express server
├── package.json        # Dependencies
├── .gitignore          # Git ignore rules
├── rsvps.json          # RSVP data (generated)
├── requests.json       # Request data (generated)
└── templates/          # Images
```

## API Endpoints

- `GET /api/products` - Get all products
- `GET /api/rsvps` - Get RSVP data
- `POST /api/rsvp` - Submit RSVP
- `GET /api/requests` - Get produce requests
- `POST /api/request` - Submit produce request

## Running the Application

1. Install dependencies: `npm install`
2. Start the server: `npm start`
3. Open http://localhost:3000 in your browser

## Design Decisions

- **Modular JavaScript**: Code split into ES6 modules for maintainability
- **Separation of Concerns**: Frontend handles UI, backend manages data
- **RESTful API**: Clean client-server communication
- **File-based Persistence**: Simple storage for demo (upgrade to database for production)
- **Responsive Design**: Mobile-first approach

## Scalability

- API can be extended for more features
- Modules allow easy addition of new pages/components
- Server can be deployed to cloud platforms

## Data Persistence

RSVPs are stored in `rsvps.json` on the server. Cart data is stored in browser localStorage. For production, implement a proper database.
