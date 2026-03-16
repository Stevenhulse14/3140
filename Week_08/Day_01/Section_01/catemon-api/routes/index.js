/**
 * Central Router - Reduces Import Clutter
 *
 * This file acts as a single entry point for all routes.
 * Instead of importing each route in the main index.js,
 * we import this one file and it mounts all sub-routes.
 *
 * To add new resources (e.g., /trainers, /battles),
 * require the route file and add a router.use() line.
 */

const express = require("express");
const router = express.Router();

const catemonRoutes = require("./catemonRoutes");

// Mount Catèmon routes at /catemons
router.use("/catemons", catemonRoutes);

module.exports = router;
