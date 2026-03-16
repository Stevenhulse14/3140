/**
 * Catèmon API Routes
 *
 * Defines all REST endpoints for the /catemons resource.
 * Uses Express Router to group related routes.
 */

const express = require("express");
const router = express.Router();
const catemons = require("../data/catemons");

// GET /catemons - Retrieve all Catèmon
router.get("/", (req, res) => {
  res.json(catemons);
});

// GET /catemons/:id - Retrieve one Catèmon by ID
router.get("/:id", (req, res) => {
  const catemon = catemons.find((c) => c.id === parseInt(req.params.id));
  if (!catemon) {
    return res.status(404).json({ error: "Catèmon not found" });
  }
  res.json(catemon);
});

// POST /catemons - Create a new Catèmon
router.post("/", (req, res) => {
  const newCatemon = req.body;
  catemons.push(newCatemon);
  res.status(201).json(newCatemon);
});

// PUT /catemons/:id - Update an existing Catèmon
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = catemons.findIndex((c) => c.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Catèmon not found" });
  }
  catemons[index] = req.body;
  res.json(catemons[index]);
});

// DELETE /catemons/:id - Remove a Catèmon
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = catemons.findIndex((c) => c.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Catèmon not found" });
  }
  const deleted = catemons.splice(index, 1);
  res.json(deleted);
});

module.exports = router;
