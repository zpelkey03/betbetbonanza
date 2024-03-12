import { fetchUpcomingNBAGames, fetchUpcomingNHLGames, fetchUpcomingSoccerGames } from '../business/SportsApi';
import BetSelectionPopup from './BetSelectionPopup';
import { fetchedUser } from './LogInComponent';
import ProfileComponent from './ProfileComponent';
import { useEffect, useState } from 'react';
import Images from './images/images';
import MainPageComponent from './MainPageComponent';


const BettingItemView = ({ sport }) => {

    const [upcomingNHLGames, setUpcomingNHLGames] = useState([]);
    const [upcomingNBAGames, setUpcomingNBAGames] = useState([]);
    const [upcomingSoccerGames, setUpcomingSoccerGames] = useState([]);


    //This code will handle which bet was selected
    const [selectedGame, setSelectedGame] = useState(null);
    const [homeOrAway, setHomeOrAway] = useState(null);

    const handleBetSelection = (gameId, team) => {
        setSelectedGame(gameId);
        setHomeOrAway(team);
        setPopupOpen(true);
    };

    //Handle the bet selection popup
    const [isPopupOpen, setPopupOpen] = useState(false);

    const closePopup = () => {
        setPopupOpen(false);
      };


    // We can also load our images here
    // This can be updated in the future once our other API stuff is done
   
    useEffect(() => {
        if (sport === "hockey") {
            handleFetchUpcomingNHLGames();
        } else if (sport === "basketball") {
            handleFetchUpcomingNBAGames();
        } else if (sport === "soccer") {
            handleFetchUpcomingSoccerGames();
        }
        // Add else-if blocks for other sports as needed
    }, [sport]);


    // Function to fetch upcoming NHL games when the button is clicked
    const handleFetchUpcomingNHLGames = async () => {
        try {
            const games = await fetchUpcomingNHLGames(); // Call the function to fetch upcoming NHL games
            setUpcomingNHLGames(games); // Update the state with the fetched games
        } catch (error) {
            console.error('Error fetching upcoming NHL games:', error);
        }
    };

    const handleFetchUpcomingNBAGames = async () => {
        try {
            const games = await fetchUpcomingNBAGames(); // Call the function to fetch upcoming NBA games
            setUpcomingNBAGames(games); // Update the state with the fetched games
        } catch (error) {
            console.error('Error fetching upcoming NBA games:', error);
        }
    };

    const handleFetchUpcomingSoccerGames = async () => {
        try {
            const games = await fetchUpcomingSoccerGames(); // Call the function to fetch upcoming soccer games
            setUpcomingSoccerGames(games);                  // Update the state with the fetched games
        } catch (error) {
            console.error('Error fetching upcoming soccer games:', error);
        }
    };



    

    const generateContent = (game) => {
        return (
            
            <div key={game.id} className="grid grid-cols-3 gap-0 sticky top-0 z-10 w-4/5 mx-auto mt-8">
                {/* First Column */}

                <div className="col-span-1 bg-gray-900">
                    <div className="flex-none sm:flex justify-center items-center">
                        <div className="flex-auto justify-evenly text-center">
                            <div className="flex flex-col pt-3 pb-3">
                                <div className="w-full flex-none text-1x1 text-white font-bold leading-none mt-2"> {"Game Lines: "}  </div>

                                <div className="bg-gray-800 flex-auto text-white my-1">
                                    <span className="mr-3"> </span>
                                    <span className="mr-3"> </span>

                                </div>

                                <div className="bg-gray-900 flex-auto text-white my-1">
                                    <span className="mr-3">{"Money Line"} </span>
                                    <span className="mr-3"></span>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Second Column */}
                <div className="col-span-1 bg-gray-900">
                    <div className="flex-none sm:flex justify-center items-center">
                        <div className="flex-auto justify-evenly text-center">
                            <div className="flex flex-col pt-3 pb-3">
                                <div className="w-full flex-none text-1x1 text-gray-200 font-bold leading-none mt-2 mr-3"> &nbsp;  </div>

                                <div className="bg-gray-800 flex-auto text-white font-bold my-1">
                                    <button onClick={() => handleBetSelection(game.id, "home")} className="mr-3">{game.home_team} </button>
                                    <span className="mr-3"> </span>

                                </div>

                                <div className="bg-gray-900 flex-auto text-white my-1">
                                    <span className="mr-3"></span>

                                    {
                                        (() => {
                                            // Ensure draftkings_odds is not null before trying to access its properties
                                            if (game.draftkings_odds) {
                                                if (game.draftkings_odds.home_team_odds > 0) {
                                                    return <button onClick={() => handleBetSelection(game.id, "home")} className="mr-3">{"+" + game.draftkings_odds.home_team_odds}</button>;
                                                } else {
                                                    return <button onClick={() => handleBetSelection(game.id, "home")} className="mr-3"> {game.draftkings_odds.home_team_odds} </button>;
                                                }
                                            } else {
                                                // Return some default UI or handle the missing odds case here
                                                return <span>No odds available</span>;
                                            }
                                        })()
                                    }

                                    <span className="mr-3"> </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Third Column */}
                <div className="col-span-1 bg-gray-900">
                    <div className="flex-none sm:flex justify-center items-center">
                        <div className="flex-auto justify-evenly text-center">
                            <div className="flex flex-col pt-3 pb-3">
                                <div className="w-full flex-none text-1x1 text-white font-bold leading-none mt-2"> &nbsp;  </div>

                                <div className="bg-gray-800 flex-auto text-white font-bold my-1">
                                    <span className="mr-3"></span>
                                    <button onClick={() => handleBetSelection(game.id, "away")} className="mr-3">{game.away_team} </button>

                                </div>

                                <div className="bg-gray-900 flex-auto text-white my-1">
                                    <span className="mr-3"></span>
                                    <span className="mr-3"></span>
                                    {
                                        (() => {
                                            // Same check for away_team_odds
                                            if (game.draftkings_odds) {
                                                if (game.draftkings_odds.away_team_odds > 0) {
                                                    return <button onClick={() => handleBetSelection(game.id, "away")} className="mr-3">{"+" + game.draftkings_odds.away_team_odds}</button>;
                                                } else {
                                                    return <button onClick={() => handleBetSelection(game.id, "away")} className="mr-3"> {game.draftkings_odds.away_team_odds} </button>;
                                                }
                                            } else {
                                                // Return some default UI or handle the missing odds case here
                                                return <span>No odds available</span>;
                                            }
                                        })()
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }

    let contentToDisplay; 
    if (sport === "hockey") {

        contentToDisplay = upcomingNHLGames.map((game) => generateContent(game));

    } else if (sport === "basketball") {
        contentToDisplay = upcomingNBAGames.map((game) => generateContent(game));

    } else if (sport === "soccer") {
        contentToDisplay = upcomingSoccerGames.map((game) => generateContent(game));
    }

    return (
        <div style={{ maxHeight: "95%" }} className="overflow-y-auto bg-gray-700 rounded-lg p-4 m-4">
            {contentToDisplay}


            {selectedGame && homeOrAway && isPopupOpen && (
                <BetSelectionPopup gameId={selectedGame} sport={sport} upcomingNHLGames={upcomingNHLGames} upcomingNBAGames={upcomingNBAGames} upcomingSoccerGames={upcomingSoccerGames} homeOrAway={homeOrAway} closePopup={closePopup} />
            )}


        </div>

    )

}


export default BettingItemView