// Import necessary modules
const axios = require('axios');
const admin = require('firebase-admin');
const functions = require('firebase-functions');
const logger = require('firebase-functions/logger');

// Initialize Firebase Admin SDK
admin.initializeApp();

// Scheduled function to update game results for multiple sports every 4 hours
exports.updateGameResults = functions.pubsub.schedule('every 4 hours').onRun(async (context) => {
  try {
    const hockeyApiKey = '9d0bd4a50c2dcbe41687efcac4ae9dea'; // Replace with your actual hockey API key
    const basketballApiKey = '9d0bd4a50c2dcbe41687efcac4ae9dea'; // Replace with your actual basketball API key
    const soccerApiKey = '9d0bd4a50c2dcbe41687efcac4ae9dea'; // Replace with your actual soccer API key
    const hockeySport = 'icehockey_nhl';
    const basketballSport = 'basketball_nba';
    const soccerSport = 'soccer_usa_mls';
    const daysFrom = 1;

    // Construct API URLs for hockey, basketball, and soccer
    const hockeyApiUrl = `https://api.the-odds-api.com/v4/sports/${hockeySport}/scores/?daysFrom=${daysFrom}&apiKey=${hockeyApiKey}`;
    const basketballApiUrl = `https://api.the-odds-api.com/v4/sports/${basketballSport}/scores/?daysFrom=${daysFrom}&apiKey=${basketballApiKey}`;
    const soccerApiUrl = `https://api.the-odds-api.com/v4/sports/${soccerSport}/scores/?daysFrom=${daysFrom}&apiKey=${soccerApiKey}`;
    
    // Fetch hockey data from the API
    const hockeyResponse = await axios.get(hockeyApiUrl);
    const hockeyGames = hockeyResponse.data;

    // Fetch basketball data from the API
    const basketballResponse = await axios.get(basketballApiUrl);
    const basketballGames = basketballResponse.data;

    // Fetch soccer data from the API
    const soccerResponse = await axios.get(soccerApiUrl);
    const soccerGames = soccerResponse.data;

    // Reference to 'games' node in Firebase Realtime Database
    const database = admin.database();
    const gamesRef = database.ref('games');

    // Update hockey game results
    hockeyGames.forEach((game) => {
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

    // Update basketball game results
    basketballGames.forEach((game) => {
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

    // Update soccer game results
    soccerGames.forEach((game) => {
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