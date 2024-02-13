import { fetchedUser } from './LogInComponent';
import { useEffect, useState } from 'react';


const BetSelectionPopup = ({ gameId, sport, upcomingNHLGames, upcomingNBAGames, homeOrAway, closePopup }) => {

    const [selectedGame, setSelectedGame] = useState(null);

    useEffect(() => {
        let game = null;

        // Find the selected game based on gameId
        if (sport === "hockey") {
            game = upcomingNHLGames.find((game) => game.id === gameId);
        } else if (sport === "basketball") {
            game = upcomingNBAGames.find((game) => game.id === gameId);
        }

        setSelectedGame(game);
    }, [gameId, sport, upcomingNHLGames, upcomingNBAGames]);

    let selectedTeam = "";
    let odds = "";
    if (selectedGame) {
        if (homeOrAway === "home") {
            selectedTeam = selectedGame.home_team;
            odds = selectedGame.draftkings_odds.home_team_odds;

            if (odds > 0) {
                odds = "+" + odds
            }


        } else if (homeOrAway === "away") {
            selectedTeam = selectedGame.away_team;
            odds = selectedGame.draftkings_odds.away_team_odds;

            if (odds > 0) {
                odds = "+" + odds
            }
        }
    }


    //Dynamically update the wager amount:
    const [wagerAmount, setWagerAmount] = useState('');

    const handleWagerChange = (event) => {
        // Update the state with the entered wager amount
    
        setWagerAmount(event.target.value);
    };

    const calculateReturn = () => {
        // Perform the calculation without updating the state
        const wager = parseFloat(wagerAmount);


        if (odds > 0) {
            if (!isNaN(wager)) {
                const potentialReturn = wager + (wager * odds / 100);
                return potentialReturn.toFixed(2); // Assuming you want two decimal places
              }
        } else {
            if (!isNaN(wager)) {
                const potentialReturn = wager + Math.abs(wager / (odds / 100));
                return potentialReturn.toFixed(2); // Assuming you want two decimal places
              }
        }
        return '';
     };

    if (!selectedGame) {
        return null; // or some loading state, or placeholder
    }

    //Close popup
    const handleClose = () => {
        // Additional logic if needed
        closePopup(); // Call the closePopup function passed as a prop
      };

    return (
        <div className="fixed bottom-10 left-0 w-full flex justify-center z-50">
            <div class="bg-white rounded-md shadow-xl overflow-hidden max-w-md w-full sm:w-96 md:w-1/2 lg:w-2/3 xl:w-1/3 z-50">

                <div class="bg-indigo-500 text-white px-4 py-2 flex justify-between">
                    <h2 class="text-lg font-bold">{selectedTeam + " " + odds}</h2>
                    <button onClick={handleClose} className="text-white px-2 py-1">X</button>
                </div>

                <div class="p-4">
                    <p className="text-small"> {selectedGame.home_team + " vs " + selectedGame.away_team} </p>
                    <p className="text-xs">Moneyline</p>
                </div>

                <div className="border-t flex justify-end items-center relative">
                    <div className="absolute top-0 left-0 text-xs px-3 py-1 text-center">Wager</div>
                    <input
                        type="text"
                        value={wagerAmount}
                        onChange={handleWagerChange}
                        className="flex-1 px-3 py-2 text-center text-small focus:outline-none pl-3"
                        placeholder="$0.00"
                    />
                    <button className="px-3 py-4 border-l border-white border-opacity-25 bg-indigo-500 text-white w-1/2 relative font-bold">
                        Place Bet
                        <p className="absolute py-2 bottom-0 left-0 font-normal text-xs text-center w-full">To return: ${calculateReturn()} </p>
                    </button>
                </div>

                
            </div>
        </div>

    )


}

export default BetSelectionPopup; 