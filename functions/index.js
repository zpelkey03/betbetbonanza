// Import necessary modules
const axios = require('axios');
const admin = require('firebase-admin');
const functions = require('firebase-functions');
const logger = require('firebase-functions/logger');

// Initialize Firebase Admin SDK
admin.initializeApp();

// Scheduled function to update game results every 4 hours
exports.updateGameResults = functions.pubsub.schedule('every 4 hours').onRun(async (context) => {
  try {
    const apiKey = '9d0bd4a50c2dcbe41687efcac4ae9dea'; // Replace with your actual API key
    const sport = 'icehockey_nhl';
    const daysFrom = 1;

    // Construct API URL
    const apiUrl = `https://api.the-odds-api.com/v4/sports/${sport}/scores/?daysFrom=${daysFrom}&apiKey=${apiKey}`;
    
    // Fetch data from the API
    const response = await axios.get(apiUrl);
    const games = response.data;

    // Reference to 'games' node in Firebase Realtime Database
    const database = admin.database();
    const gamesRef = database.ref('games');

    // Iterate over each game and update the database
    games.forEach((game) => {
      if (game.completed) {
        const gameId = game.id;
        const homeTeam = game.home_team;
        const awayTeam = game.away_team;
        
        // Finding scores might require adapting based on the actual response structure
        const homeScore = game.scores.find((score) => score.name === homeTeam)?.score;
        const awayScore = game.scores.find((score) => score.name === awayTeam)?.score;

        // Update the Realtime Database with game details
        gamesRef.child(gameId).set({
          homeTeam,
          awayTeam,
          homeScore,
          awayScore,
          completed: true,
          lastUpdate: game.last_update,
        });
      }
    });

    logger.log('Game results updated successfully');
  } catch (error) {
    logger.error('Error updating game results:', error);
  }
});
