/**
 * Main Server File
 * Sets up Express app and middleware
 */

const express = require('express');
const path = require('path');
const { PORT, HOST } = require('./config/constants');
const pollRoutes = require('./routes/pollRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/api', pollRoutes);

// Root route - serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, HOST, () => {
    console.log(`\n🚀 Class Voting App running on http://localhost:${PORT}`);
    console.log(`   Accessible on LAN at http://${HOST}:${PORT}`);
    console.log(`\n   Ready for ngrok tunneling!\n`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('\nSIGTERM signal received: closing HTTP server');
    process.exit(0);
});
