/**
 * Poll Data Model
 * Manages poll data and voting state
 */

const { POLL } = require('../config/constants');

class PollModel {
    constructor() {
        this.poll = {
            question: POLL.question,
            options: POLL.options.map(opt => ({ ...opt }))
        };
        this.votedIds = new Set();
    }

    /**
     * Get poll question and options (without vote counts)
     */
    getPoll() {
        return {
            question: this.poll.question,
            options: this.poll.options.map(({ id, label }) => ({ id, label }))
        };
    }

    /**
     * Submit a vote for an option
     * @param {string} optionId - The ID of the option to vote for
     * @param {string} voterId - Unique identifier for the voter
     * @returns {Object} Result object with success status and message
     */
    submitVote(optionId, voterId) {
        // Validate voter hasn't already voted
        if (this.votedIds.has(voterId)) {
            return {
                success: false,
                error: "This browser already voted."
            };
        }

        // Find the option
        const option = this.poll.options.find((o) => o.id === optionId);
        if (!option) {
            return {
                success: false,
                error: "Option not found."
            };
        }

        // Record the vote
        option.votes += 1;
        this.votedIds.add(voterId);

        return {
            success: true,
            message: "Vote recorded."
        };
    }

    /**
     * Get poll results with vote counts and percentages
     * @returns {Object} Results object with question, total votes, and results array
     */
    getResults() {
        const totalVotes = this.poll.options.reduce((sum, o) => sum + o.votes, 0);

        const results = this.poll.options.map((o) => ({
            id: o.id,
            label: o.label,
            votes: o.votes,
            percent: totalVotes === 0 ? 0 : Number(((o.votes / totalVotes) * 100).toFixed(1)),
        }));

        return {
            question: this.poll.question,
            totalVotes,
            results,
        };
    }

    /**
     * Reset poll votes and voter tracking
     * @returns {Object} Success message
     */
    reset() {
        this.poll.options.forEach((o) => (o.votes = 0));
        this.votedIds.clear();
        return {
            message: "Poll reset."
        };
    }

    /**
     * Check if a voter has already voted
     * @param {string} voterId - Unique identifier for the voter
     * @returns {boolean} True if voter has already voted
     */
    hasVoted(voterId) {
        return this.votedIds.has(voterId);
    }
}

// Export singleton instance
module.exports = new PollModel();
