/**
 * Catèmon API - Main Entry Point
 *
 * This file starts the Express server and configures:
 * - JSON body parsing (for POST/PUT requests)
 * - Static file serving (for card images in public/)
 * - All API routes via the central router
 */

const express = require("express");
const path = require("path");
const routes = require("./routes");

const app = express();
const PORT = 3000;

// Middleware: Parse JSON request bodies (required for POST and PUT)
app.use(express.json());

// Serve static files (card images) from public/ folder
// Images at public/images/card-1.png become available at /images/card-1.png
app.use(express.static(path.join(__dirname, "public")));

// Mount all API routes (catemons, etc.)
app.use(routes);

// Optional: Root route for API info
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Catèmon API! 🐱⚡",
    endpoints: {
      catemons: "/catemons",
      "catemon by id": "/catemons/:id",
    },
  });
});

app.listen(PORT, () => {
  console.log(`Catèmon API running on http://localhost:${PORT}`);
});
