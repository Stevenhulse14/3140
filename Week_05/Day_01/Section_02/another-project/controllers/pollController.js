/**
 * Poll Controller
 * Handles HTTP request/response logic for poll endpoints
 */

const pollModel = require('../models/pollModel');

class PollController {
    /**
     * Get poll question and options
     * GET /api/poll
     */
    getPoll(req, res) {
        try {
            const poll = pollModel.getPoll();
            res.json(poll);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch poll' });
        }
    }

    /**
     * Submit a vote
     * POST /api/vote
     */
    submitVote(req, res) {
        try {
            const { optionId, voterId } = req.body;

            // Validate required fields
            if (!optionId || !voterId) {
                return res.status(400).json({ 
                    error: "optionId and voterId are required." 
                });
            }

            // Submit vote through model
            const result = pollModel.submitVote(optionId, voterId);

            if (!result.success) {
                const statusCode = result.error.includes('already voted') ? 409 : 404;
                return res.status(statusCode).json({ error: result.error });
            }

            res.json({ message: result.message });
        } catch (error) {
            res.status(500).json({ error: 'Failed to submit vote' });
        }
    }

    /**
     * Get poll results
     * GET /api/results
     */
    getResults(req, res) {
        try {
            const results = pollModel.getResults();
            res.json(results);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch results' });
        }
    }

    /**
     * Reset poll (for testing/reuse)
     * POST /api/reset
     */
    resetPoll(req, res) {
        try {
            const result = pollModel.reset();
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: 'Failed to reset poll' });
        }
    }
}

module.exports = new PollController();
