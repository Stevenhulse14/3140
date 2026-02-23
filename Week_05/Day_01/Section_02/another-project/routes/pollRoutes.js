/**
 * Poll Routes
 * Defines all routes related to the poll functionality
 */

const express = require('express');
const router = express.Router();
const pollController = require('../controllers/pollController');

// GET /api/poll - Get poll question and options
router.get('/poll', pollController.getPoll.bind(pollController));

// POST /api/vote - Submit a vote
router.post('/vote', pollController.submitVote.bind(pollController));

// GET /api/results - Get poll results
router.get('/results', pollController.getResults.bind(pollController));

// POST /api/reset - Reset poll (for testing)
router.post('/reset', pollController.resetPoll.bind(pollController));

module.exports = router;
