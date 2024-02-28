/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */


const logger = require('firebase-functions/logger');
const {onSchedule} = require('firebase-functions/v2/scheduler');

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

exports.updateGameResults = onSchedule('every 4 hours', async (event) => {
  try {
    const apiKey = '9d0bd4a50c2dcbe41687efcac4ae9dea'; // Replace with your actual API key
    const sport = 'icehockey_nhl';
    const daysFrom = 1;

    const apiUrl = `https://api.the-odds-api.com/v4/sports/${sport}/scores/?daysFrom=${daysFrom}&apiKey=${apiKey}`;
    const response = await axios.get(apiUrl);
    const games = response.data;

    const database = admin.database();
    const gamesRef = database.ref('games');

    games.forEach((game) => {
      if (game.completed) {
        const gameId = game.id;
        const homeTeam = game.home_team;
        const awayTeam = game.away_team;
        const homeScore = game.scores.find((score) =>
          score.name === homeTeam).score;
        const awayScore = game.scores.find((score) =>
          score.name === awayTeam).score;

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
    return null;
  } catch (error) {
    console.error('Error updating game results:', error);
    return null;
  }
});

