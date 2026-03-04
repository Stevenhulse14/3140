// ============================================
// API BASE URL
// ============================================
const API_BASE_URL = 'http://localhost:3000/api';

// ============================================
// DOM ELEMENTS
// ============================================
const pokemonInput = document.getElementById('pokemonInput');
const searchBtn = document.getElementById('searchBtn');
const pokemonDisplay = document.getElementById('pokemonDisplay');
const teamDisplay = document.getElementById('teamDisplay');

// ============================================
// EVENT LISTENERS
// ============================================

// Search button click handler
searchBtn.addEventListener('click', handleSearch);

// Allow Enter key to trigger search
pokemonInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    handleSearch();
  }
});

// Load team when page loads
window.addEventListener('DOMContentLoaded', loadTeam);

// ============================================
// FUNCTIONS
// ============================================

/**
 * Handles the search button click
 * Fetches Pokémon data from the backend API
 */
async function handleSearch() {
  // Get the Pokémon name from the input
  const pokemonName = pokemonInput.value.trim().toLowerCase();
  
  // Validate input
  if (!pokemonName) {
    alert('Please enter a Pokémon name!');
    return;
  }
  
  try {
    // Show loading message
    pokemonDisplay.innerHTML = '<p>Searching...</p>';
    
    // Fetch Pokémon data from our backend API
    const response = await fetch(`${API_BASE_URL}/pokemon/${pokemonName}`);
    
    // Check if request was successful
    if (!response.ok) {
      const error = await response.json();
      pokemonDisplay.innerHTML = `<p class="error">${error.error || 'Pokémon not found!'}</p>`;
      return;
    }
    
    // Parse the JSON response
    const pokemon = await response.json();
    
    // Display the Pokémon information
    displayPokemon(pokemon);
    
  } catch (error) {
    // Handle any errors
    console.error('Error searching Pokémon:', error);
    pokemonDisplay.innerHTML = '<p class="error">Failed to search Pokémon. Make sure the server is running!</p>';
  }
}

/**
 * Displays Pokémon information in the search results area
 * @param {Object} pokemon - The Pokémon data object
 */
function displayPokemon(pokemon) {
  // Create HTML to display Pokémon info
  const html = `
    <div class="pokemon-card">
      <h3>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
      <img src="${pokemon.sprite}" alt="${pokemon.name}" class="pokemon-sprite">
      <div class="pokemon-info">
        <p><strong>Types:</strong> ${pokemon.types.join(', ')}</p>
        <p><strong>Abilities:</strong> ${pokemon.abilities.join(', ')}</p>
      </div>
      <button class="add-btn" onclick="addToTeam('${pokemon.name}')">
        Add To Team
      </button>
    </div>
  `;
  
  // Update the display area
  pokemonDisplay.innerHTML = html;
}

/**
 * Adds a Pokémon to the team
 * Called when "Add To Team" button is clicked
 * @param {string} pokemonName - The name of the Pokémon to add
 */
async function addToTeam(pokemonName) {
  try {
    // Send POST request to add Pokémon to team
    const response = await fetch(`${API_BASE_URL}/team`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: pokemonName })
    });
    
    // Parse the response
    const result = await response.json();
    
    // Check if request was successful
    if (!response.ok) {
      alert(result.error || 'Failed to add Pokémon to team');
      return;
    }
    
    // Show success message
    alert(result.message || 'Pokémon added to team!');
    
    // Reload the team display
    loadTeam();
    
  } catch (error) {
    console.error('Error adding Pokémon to team:', error);
    alert('Failed to add Pokémon to team. Make sure the server is running!');
  }
}

/**
 * Loads and displays the current team
 * Fetches team data from the backend API
 */
async function loadTeam() {
  try {
    // Fetch team data from backend
    const response = await fetch(`${API_BASE_URL}/team`);
    
    // Parse the JSON response
    const team = await response.json();
    
    // Display the team
    displayTeam(team);
    
  } catch (error) {
    console.error('Error loading team:', error);
    teamDisplay.innerHTML = '<p class="error">Failed to load team. Make sure the server is running!</p>';
  }
}

/**
 * Displays the team in the team section
 * @param {Array} team - Array of Pokémon objects in the team
 */
function displayTeam(team) {
  // If team is empty, show empty message
  if (team.length === 0) {
    teamDisplay.innerHTML = '<p class="empty-message">Your team is empty. Search and add Pokémon!</p>';
    return;
  }
  
  // Create HTML for each Pokémon in the team
  const teamHTML = team.map(pokemon => {
    const capitalizedName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    return `
      <div class="team-member">
        <span>${capitalizedName}</span>
        <button class="remove-btn" onclick="removeFromTeam('${pokemon.name}')">
          Remove
        </button>
      </div>
    `;
  }).join('');
  
  // Update the team display
  teamDisplay.innerHTML = teamHTML;
  
  // Show team count
  const teamCount = document.createElement('p');
  teamCount.className = 'team-count';
  teamCount.textContent = `Team: ${team.length}/6`;
  teamDisplay.appendChild(teamCount);
}

/**
 * Removes a Pokémon from the team
 * Called when "Remove" button is clicked
 * @param {string} pokemonName - The name of the Pokémon to remove
 */
async function removeFromTeam(pokemonName) {
  try {
    // Send DELETE request to remove Pokémon from team
    const response = await fetch(`${API_BASE_URL}/team/${pokemonName}`, {
      method: 'DELETE'
    });
    
    // Parse the response
    const result = await response.json();
    
    // Check if request was successful
    if (!response.ok) {
      alert(result.error || 'Failed to remove Pokémon from team');
      return;
    }
    
    // Reload the team display
    loadTeam();
    
  } catch (error) {
    console.error('Error removing Pokémon from team:', error);
    alert('Failed to remove Pokémon from team. Make sure the server is running!');
  }
}

// Make functions available globally for onclick handlers
window.addToTeam = addToTeam;
window.removeFromTeam = removeFromTeam;
