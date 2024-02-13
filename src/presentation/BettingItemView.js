import { fetchUpcomingNBAGames, fetchUpcomingNHLGames } from '../business/SportsApi';
import BetSelectionPopup from './BetSelectionPopup';
import { fetchedUser } from './LogInComponent';
import ProfileComponent from './ProfileComponent';
import { useEffect, useState } from 'react';


const BettingItemView = ({ sport }) => {

    const [upcomingNHLGames, setUpcomingNHLGames] = useState([]);
    const [upcomingNBAGames, setUpcomingNBAGames] = useState([]);

    //This code will handle which bet was selected

    const [selectedGame, setSelectedGame] = useState(null);
    const [homeOrAway, setHomeOrAway] = useState(null);

    const handleBetSelection = (gameId, team) => {
        setSelectedGame(gameId);
        setHomeOrAway(team);
    };



    // This can be updated in the future once our other API stuff is done 
    useEffect(() => {
        if (sport === "hockey") {
            handleFetchUpcomingNHLGames();
        }
    }, [sport]);

    useEffect(() => {
        if (sport === "basketball") {
            handleFetchUpcomingNBAGames();
        }
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


    //The upcomingNHLGames will store all the NHL Games. 
    //To map it I would use this: upcomingNHLGames.map((game, index)
    //To get the home and way team I would use this: game.home_team and game.away_team


    let contentToDisplay;

    const generateContent = (game) => {
        return (


            <div key={game.id} className="grid grid-cols-3 gap-0 sticky top-0 z-10 w-4/5 mx-auto mt-8">
                {/* First Column */}

                <div className="col-span-1 bg-gray-700">
                    <div className="flex-none sm:flex justify-center items-center">
                        <div className="flex-auto justify-evenly text-center">
                            <div className="flex flex-col pt-3 pb-3">
                                <div className="w-full flex-none text-1x1 text-white font-bold leading-none mt-2"> {"Game Lines: "}  </div>

                                <div className="bg-gray-600 flex-auto text-white my-1">
                                    <span className="mr-3"> </span>
                                    <span className="mr-3"> </span>

                                </div>

                                <div className="bg-gray-700 flex-auto text-white my-1">
                                    <span className="mr-3">{"Money Line"} </span>
                                    <span className="mr-3"></span>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Second Column */}
                <div className="col-span-1 bg-gray-700">
                    <div className="flex-none sm:flex justify-center items-center">
                        <div className="flex-auto justify-evenly text-center">
                            <div className="flex flex-col pt-3 pb-3">
                                <div className="w-full flex-none text-1x1 text-gray-200 font-bold leading-none mt-2 mr-3"> &nbsp;  </div>

                                <div className="bg-gray-600 flex-auto text-white font-bold my-1">
                                    <button onClick={() => handleBetSelection(game.id, "home")} className="mr-3">{game.home_team} </button>
                                    <span className="mr-3"> </span>

                                </div>

                                <div className="bg-gray-700 flex-auto text-white my-1">
                                    <span className="mr-3"></span>

                                    {
                                        (() => {
                                            // This code just adds a + to the odds which are not favoured to win

                                            if (game.draftkings_odds.home_team_odds > 0) {
                                                return <button onClick={() => handleBetSelection(game.id, "home")} className="mr-3">{"+" + game.draftkings_odds.home_team_odds}</button>;
                                            } else {
                                                return <button onClick={() => handleBetSelection(game.id, "home")} className="mr-3"> {game.draftkings_odds.home_team_odds} </button>
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
                <div className="col-span-1 bg-gray-700">
                    <div className="flex-none sm:flex justify-center items-center">
                        <div className="flex-auto justify-evenly text-center">
                            <div className="flex flex-col pt-3 pb-3">
                                <div className="w-full flex-none text-1x1 text-white font-bold leading-none mt-2"> &nbsp;  </div>

                                <div className="bg-gray-600 flex-auto text-white font-bold my-1">
                                    <span className="mr-3"></span>
                                    <button onClick={() => handleBetSelection(game.id, "away")} className="mr-3">{game.away_team} </button>

                                </div>

                                <div className="bg-gray-700 flex-auto text-white my-1">
                                    <span className="mr-3"></span>
                                    <span className="mr-3"></span>
                                    {
                                        (() => {
                                            // This code just adds a + to the odds which are not favoured to win

                                            if (game.draftkings_odds.away_team_odds > 0) {
                                                return <button onClick={() => handleBetSelection(game.id, "away")} className="mr-3">{"+" + game.draftkings_odds.away_team_odds}</button>;
                                            } else {
                                                return <button onClick={() => handleBetSelection(game.id, "away")} className="mr-3"> {game.draftkings_odds.away_team_odds} </button>
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


    if (sport === "hockey") {

        contentToDisplay = upcomingNHLGames.map((game) => generateContent(game));

    } else if (sport === "basketball") {
        contentToDisplay = upcomingNBAGames.map((game) => generateContent(game));

    } else if (sport === "soccer") {
        
    } else if (sport === "profile") {
        contentToDisplay = (
            <div>
                 <ProfileComponent></ProfileComponent>
                 <BetSelectionPopup></BetSelectionPopup>
            </div>
           
        )
    }

    return (
        <div style={{ maxHeight: "95%" }} className="h-screen overflow-y-auto bg-gray-400 rounded-lg p-4 m-4">
            {contentToDisplay}


            {selectedGame && homeOrAway && (
                <BetSelectionPopup gameId={selectedGame} sport={sport} upcomingNHLGames={upcomingNHLGames} upcomingNBAGames={upcomingNBAGames} homeOrAway={homeOrAway} />
            )}


        </div>

    )

}


export default BettingItemView