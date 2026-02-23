# Class Voting App

A simple, well-organized classroom voting application built with Express.js. Perfect for real-time polls in the classroom with ngrok support for remote access.

## Features

- **Real-time Voting**: Students can vote on poll questions
- **Live Results**: Results update automatically every 2 seconds
- **One Vote Per Browser**: Prevents duplicate votes using localStorage
- **ngrok Ready**: Configured to work with ngrok for remote access
- **Modular Architecture**: Clean separation of concerns

## Poll Setup

**Question:** How is the weather?

**Options:**
- Very Cold
- Nice Weather
- I'm glad im home
- Snow ball fight

## Project Structure

```
another-project/
├── server.js              # Main server entry point
├── config/
│   └── constants.js       # Application constants and configuration
├── models/
│   └── pollModel.js       # Data model for poll management
├── controllers/
│   └── pollController.js  # Request handlers for poll endpoints
├── routes/
│   └── pollRoutes.js      # Route definitions
└── public/
    ├── index.html         # Frontend HTML
    ├── css/
    │   └── style.css      # Styles
    └── js/
        └── app.js         # Frontend JavaScript
```

## Installation

```bash
npm install
```

## Running the App

```bash
npm start
```

The server will start on `http://localhost:3001`

## API Endpoints

- `GET /api/poll` - Get poll question and options
- `POST /api/vote` - Submit a vote (requires `optionId` and `voterId`)
- `GET /api/results` - Get current poll results
- `POST /api/reset` - Reset poll (for testing/reuse)

## Using with ngrok

1. Start the server: `npm start`
2. In another terminal, run: `ngrok http 3001`
3. Share the ngrok URL with your class

## Architecture

This project follows a modular MVC-like architecture:

- **Models**: Handle data and business logic (`models/pollModel.js`)
- **Controllers**: Handle HTTP requests/responses (`controllers/pollController.js`)
- **Routes**: Define API endpoints (`routes/pollRoutes.js`)
- **Config**: Centralized configuration (`config/constants.js`)
- **Public**: Static frontend files (`public/`)

## Customization

To change the poll question or options, edit `config/constants.js`:

```javascript
POLL: {
    question: "Your question here",
    options: [
        { id: "option-1", label: "Option 1", votes: 0 },
        // ... more options
    ],
}
```
