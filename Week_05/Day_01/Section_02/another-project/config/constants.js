/**
 * Application Constants
 */

module.exports = {
    PORT: 3001,
    HOST: '0.0.0.0', // ngrok/LAN friendly
    
    // Poll configuration
    POLL: {
        question: "How is the weather?",
        options: [
            { id: "very-cold", label: "Very Cold", votes: 0 },
            { id: "nice-weather", label: "Nice Weather", votes: 0 },
            { id: "glad-home", label: "I'm glad im home", votes: 0 },
            { id: "snowball-fight", label: "Snow ball fight", votes: 0 },
        ],
    },
    
    // LocalStorage keys
    STORAGE_KEYS: {
        VOTER_ID: 'weatherVoteVoterId',
        HAS_VOTED: 'weatherVoteHasVoted'
    },
    
    // Results refresh interval (milliseconds)
    RESULTS_REFRESH_INTERVAL: 2000
};
