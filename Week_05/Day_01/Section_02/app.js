/**
 * Express.js Demo
 * Demonstrates basic Express server setup, routing, and middleware
 */

const express = require('express');
const app = express();
const PORT = 3000;

// ============================================
// MIDDLEWARE
// ============================================

// Built-in middleware: Parse JSON bodies
app.use(express.json());

// Built-in middleware: Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Custom middleware: Logger
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next(); // Pass control to the next middleware
});

// Custom middleware: Request time tracker
app.use((req, res, next) => {
    req.startTime = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - req.startTime;
        console.log(`Request completed in ${duration}ms`);
    });
    next();
});

// ============================================
// ROUTES
// ============================================

// Root route
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Express.js Demo',
        endpoints: {
            home: '/',
            about: '/about',
            users: '/api/users',
            userById: '/api/users/:id',
            createUser: 'POST /api/users'
        }
    });
});

// About route
app.get('/about', (req, res) => {
    res.json({
        name: 'Express Demo Server',
        version: '1.0.0',
        description: 'A demonstration of Express.js capabilities'
    });
});

// ============================================
// API ROUTES
// ============================================

// Mock database (in-memory array)
let users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'user' }
];

// GET all users
app.get('/api/users', (req, res) => {
    res.json({
        success: true,
        count: users.length,
        data: users
    });
});

// GET user by ID
app.get('/api/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id);
    
    if (!user) {
        return res.status(404).json({
            success: false,
            message: `User with ID ${id} not found`
        });
    }
    
    res.json({
        success: true,
        data: user
    });
});

// POST - Create new user
app.post('/api/users', (req, res) => {
    const { name, email, role } = req.body;
    
    // Basic validation
    if (!name || !email) {
        return res.status(400).json({
            success: false,
            message: 'Name and email are required'
        });
    }
    
    // Check if email already exists
    if (users.some(u => u.email === email)) {
        return res.status(409).json({
            success: false,
            message: 'Email already exists'
        });
    }
    
    // Create new user
    const newUser = {
        id: users.length + 1,
        name,
        email,
        role: role || 'user'
    };
    
    users.push(newUser);
    
    res.status(201).json({
        success: true,
        message: 'User created successfully',
        data: newUser
    });
});

// PUT - Update user
app.put('/api/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === id);
    
    if (userIndex === -1) {
        return res.status(404).json({
            success: false,
            message: `User with ID ${id} not found`
        });
    }
    
    // Update user
    users[userIndex] = {
        ...users[userIndex],
        ...req.body,
        id: id // Prevent ID changes
    };
    
    res.json({
        success: true,
        message: 'User updated successfully',
        data: users[userIndex]
    });
});

// DELETE - Delete user
app.delete('/api/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === id);
    
    if (userIndex === -1) {
        return res.status(404).json({
            success: false,
            message: `User with ID ${id} not found`
        });
    }
    
    const deletedUser = users.splice(userIndex, 1)[0];
    
    res.json({
        success: true,
        message: 'User deleted successfully',
        data: deletedUser
    });
});

// ============================================
// QUERY PARAMETERS EXAMPLE
// ============================================

app.get('/api/search', (req, res) => {
    const { name, role } = req.query;
    let results = [...users];
    
    // Filter by name if provided
    if (name) {
        results = results.filter(u => 
            u.name.toLowerCase().includes(name.toLowerCase())
        );
    }
    
    // Filter by role if provided
    if (role) {
        results = results.filter(u => u.role === role);
    }
    
    res.json({
        success: true,
        query: { name, role },
        count: results.length,
        data: results
    });
});

// ============================================
// ERROR HANDLING MIDDLEWARE
// ============================================

// 404 handler (must be after all routes)
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.method} ${req.path} not found`
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// ============================================
// START SERVER
// ============================================

app.listen(PORT, () => {
    console.log(`\n🚀 Express server running on http://localhost:${PORT}`);
    console.log(`\nAvailable endpoints:`);
    console.log(`  GET  /`);
    console.log(`  GET  /about`);
    console.log(`  GET  /api/users`);
    console.log(`  GET  /api/users/:id`);
    console.log(`  POST /api/users`);
    console.log(`  PUT  /api/users/:id`);
    console.log(`  DELETE /api/users/:id`);
    console.log(`  GET  /api/search?name=John&role=admin`);
    console.log(`\nPress Ctrl+C to stop the server\n`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('\nSIGTERM signal received: closing HTTP server');
    process.exit(0);
});
