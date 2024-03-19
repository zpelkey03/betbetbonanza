import axios from 'axios';

// An api key is emailed to you when you sign up to a plan
// Get a free API key at https://api.the-odds-api.com/
const apiKey = '9d0bd4a50c2dcbe41687efcac4ae9dea'


export const fetchUpcomingNHLGames = async () => {
    const sportKey = 'icehockey_nhl'; // Set the sport key for NHL

    const regions = 'us'; // uk | us | eu | au. Multiple can be specified if comma delimited

    const markets = 'h2h'; // h2h | spreads | totals. Multiple can be specified if comma delimited

    const oddsFormat = 'american'; // decimal | american

    const dateFormat = 'iso'; // iso | unix

    try {
        // Fetch odds for upcoming NHL games
        const response = await axios.get(`https://api.the-odds-api.com/v4/sports/${sportKey}/odds`, {
            params: {
                apiKey,
                regions,
                markets,
                oddsFormat,
                dateFormat
            }
        });
        console.log("RESPONSE:", response);
        // Check if response data is defined and is an object
        if (response.data && typeof response.data === 'object') {
            const today = new Date(); // Current date
            const upcomingGames = [];

            // Iterate over each game key ("0", "1", "2", etc.)
            Object.keys(response.data).forEach(gameKey => {
                const game = response.data[gameKey];
                // Check if the game object has 'commence_time' property and if it's greater than or equal to the current date
                if (game.commence_time && new Date(game.commence_time) >= today) {
                    const formattedGame = {
                        id: game.id,
                        commence_time: game.commence_time,
                        home_team: game.home_team,
                        away_team: game.away_team,
                        draftkings_odds: getDraftKingsOdds(game.bookmakers),
                        // Add other properties as needed
                    };
                    upcomingGames.push(formattedGame);
                }
            });

            console.log("UPCOMING GAMES:", upcomingGames);
            return upcomingGames;      
        } else {
            console.error('Error fetching upcoming NHL games: Response data is not in the expected format');
            return []; // or handle the error case appropriately
        }
    }catch (error) {
        throw error;
    }
};


export const fetchUpcomingNBAGames = async () => {
    const sportKey = 'basketball_nba'; // Set the sport key for NHL

    const regions = 'us'; // uk | us | eu | au. Multiple can be specified if comma delimited

    const markets = 'h2h'; // h2h | spreads | totals. Multiple can be specified if comma delimited

    const oddsFormat = 'american'; // decimal | american

    const dateFormat = 'iso'; // iso | unix

    try {
        // Fetch odds for upcoming NHL games
        const response = await axios.get(`https://api.the-odds-api.com/v4/sports/${sportKey}/odds`, {
            params: {
                apiKey,
                regions,
                markets,
                oddsFormat,
                dateFormat
            }
        });
        console.log("RESPONSE:", response);
        const requestsUsed = response.headers['x-requests-used'];
        console.log("Requests used:", requestsUsed);
        // Check if response data is defined and is an object
        if (response.data && typeof response.data === 'object') {
            const today = new Date(); // Current date
            const upcomingGames = [];

            // Iterate over each game key ("0", "1", "2", etc.)
            Object.keys(response.data).forEach(gameKey => {
                const game = response.data[gameKey];
                // Check if the game object has 'commence_time' property and if it's greater than or equal to the current date
                if (game.commence_time && new Date(game.commence_time) >= today) {
                    const formattedGame = {
                        id: game.id,
                        commence_time: game.commence_time,
                        home_team: game.home_team,
                        away_team: game.away_team,
                        draftkings_odds: getDraftKingsOdds(game.bookmakers),
                        // Add other properties as needed
                    };
                    upcomingGames.push(formattedGame);
                }
            });

            console.log("UPCOMING GAMES:", upcomingGames);
            return upcomingGames;      
        } else {
            console.error('Error fetching upcoming NHL games: Response data is not in the expected format');
            return []; // or handle the error case appropriately
        }
    }catch (error) {
        throw error;
    }
};

export const fetchUpcomingSoccerGames = async () => {
    const sportKey = 'soccer_usa_mls'; // Set the sport key for MLS

    const regions = 'us'; // Targeting the US region

    const markets = 'h2h'; // Betting markets: head-to-head

    const oddsFormat = 'american'; // Odds format: American

    const dateFormat = 'iso';

    try {
        const response = await axios.get(`https://api.the-odds-api.com/v4/sports/${sportKey}/odds`, {
            params: {
                apiKey,
                regions,
                markets,
                oddsFormat,
                dateFormat
            }
        });
        console.log("RESPONSE:", response);

        if (response.data && typeof response.data === 'object') {
            const today = new Date(); // Current date
            const upcomingGames = [];

            Object.keys(response.data).forEach(gameKey => {
                const game = response.data[gameKey];
                if (game.commence_time && new Date(game.commence_time) >= today) {
                    const formattedGame = {
                        id: game.id,
                        commence_time: game.commence_time,
                        home_team: game.home_team,
                        away_team: game.away_team,
                        draftkings_odds: getDraftKingsOdds(game.bookmakers),
                    };
                    upcomingGames.push(formattedGame);
                }
            });

            console.log("UPCOMING GAMES:", upcomingGames);
            return upcomingGames;
        } else {
            console.error('Error fetching upcoming MLS games: Response data is not in the expected format');
            return [];
        }
    } catch (error) {
        throw error;
    }
};

// Function to extract DraftKings odds from the bookmakers array
const getDraftKingsOdds = (bookmakers) => {
    const draftKingsBookmaker = bookmakers.find(bookmaker => bookmaker.key === 'draftkings');
    if (draftKingsBookmaker) {
        const draftKingsOdds = draftKingsBookmaker.markets.find(market => market.key === 'h2h');
        if (draftKingsOdds && (draftKingsOdds.outcomes.length === 2)) {         // 3 length needed for soccer
            console.log("2 Outcomes Found:", draftKingsOdds.outcomes);
            return {
                home_team_odds: draftKingsOdds.outcomes[0].price,
                away_team_odds: draftKingsOdds.outcomes[1].price
            };
        } else if (draftKingsOdds && draftKingsOdds.outcomes.length === 3) {
            // When there are 3 outcomes, assuming the third is the tie
            return {
                
                home_team_odds: draftKingsOdds.outcomes[0].price,
                away_team_odds: draftKingsOdds.outcomes[1].price,
                tie_odds: draftKingsOdds.outcomes[2].price // Adding tie odds here
            };
        }
    }
    return null; // Return null if DraftKings odds are not available or not in the expected format
};