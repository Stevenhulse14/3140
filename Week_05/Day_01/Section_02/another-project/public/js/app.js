/**
 * Frontend Application Logic
 * Handles UI interactions and API calls
 */

// Constants (matching config/constants.js)
const STORAGE_KEYS = {
    VOTER_ID: 'weatherVoteVoterId',
    HAS_VOTED: 'weatherVoteHasVoted'
};

const RESULTS_REFRESH_INTERVAL = 2000; // milliseconds

// Emoji mapping for weather options
const OPTION_EMOJIS = {
    'very-cold': '🥶',
    'nice-weather': '☀️',
    'glad-home': '🏠',
    'snowball-fight': '❄️'
};

// DOM Elements
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const voteMessageEl = document.getElementById("voteMessage");
const resultsEl = document.getElementById("results");
const totalVotesEl = document.getElementById("totalVotes");

// Voter ID management
let voterId = localStorage.getItem(STORAGE_KEYS.VOTER_ID);
if (!voterId) {
    voterId = (crypto.randomUUID && crypto.randomUUID()) || String(Date.now() + Math.random());
    localStorage.setItem(STORAGE_KEYS.VOTER_ID, voterId);
}

/**
 * Load poll question and options from API
 */
async function loadPoll() {
    try {
        const res = await fetch("/api/poll");
        const data = await res.json();

        questionEl.textContent = data.question;
        optionsEl.innerHTML = "";

        const alreadyVoted = localStorage.getItem(STORAGE_KEYS.HAS_VOTED) === "true";

        data.options.forEach((option, index) => {
            const btn = document.createElement("button");
            const emoji = OPTION_EMOJIS[option.id] || '📊';
            btn.innerHTML = `<span style="font-size: 1.5em; margin-right: 12px;">${emoji}</span>${option.label}`;
            btn.disabled = alreadyVoted;
            btn.addEventListener("click", () => submitVote(option.id));
            optionsEl.appendChild(btn);
        });

        if (alreadyVoted) {
            voteMessageEl.textContent = "You already voted from this browser.";
            voteMessageEl.className = "muted";
        }
    } catch (error) {
        console.error('Failed to load poll:', error);
        voteMessageEl.textContent = "Failed to load poll. Please refresh.";
        voteMessageEl.className = "error";
    }
}

/**
 * Submit a vote for an option
 * @param {string} optionId - The ID of the option to vote for
 */
async function submitVote(optionId) {
    voteMessageEl.textContent = "";

    try {
        const res = await fetch("/api/vote", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ optionId, voterId }),
        });

        const data = await res.json();

        if (!res.ok) {
            voteMessageEl.textContent = data.error || "Vote failed.";
            voteMessageEl.className = "error";
            return;
        }

        localStorage.setItem(STORAGE_KEYS.HAS_VOTED, "true");
        voteMessageEl.textContent = "Vote recorded ✅";
        voteMessageEl.className = "success";

        await loadPoll();
        await loadResults();
    } catch (err) {
        console.error('Vote submission error:', err);
        voteMessageEl.textContent = "Server error. Try again.";
        voteMessageEl.className = "error";
    }
}

/**
 * Load and display poll results
 */
async function loadResults() {
    try {
        const res = await fetch("/api/results");
        const data = await res.json();

        resultsEl.innerHTML = "";

        data.results.forEach((r) => {
            const row = document.createElement("div");
            row.className = "result-row";
            const emoji = OPTION_EMOJIS[r.id] || '📊';

            row.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <span style="font-size: 1.3em; margin-right: 8px;">${emoji}</span>
                        <strong>${r.label}</strong>
                    </div>
                    <div style="font-size: 1.2em; font-weight: 600; color: #667eea;">
                        ${r.votes} <span style="color: #764ba2; font-size: 0.9em;">(${r.percent}%)</span>
                    </div>
                </div>
            `;

            resultsEl.appendChild(row);
        });

        totalVotesEl.textContent = `Total votes: ${data.totalVotes}`;
    } catch (error) {
        console.error('Failed to load results:', error);
    }
}

/**
 * Initialize the application
 */
async function init() {
    await loadPoll();
    await loadResults();
    setInterval(loadResults, RESULTS_REFRESH_INTERVAL);
}

// Start the app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
