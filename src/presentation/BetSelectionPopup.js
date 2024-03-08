import { fetchedUser } from './LogInComponent';
import { useEffect, useState } from 'react';
import { addBetToDatabase, updateUserCredits } from '../business/Bets';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


const BetSelectionPopup = ({ gameId, sport, upcomingNHLGames, upcomingNBAGames, homeOrAway, closePopup }) => {

    const [selectedGame, setSelectedGame] = useState(null);
    const navigate = useNavigate();

    //Boiler plate code that tells Toast where and how long to show for 
    const toastSettings = () => ({
        position: 'top-right',
        autoClose: 2000, // this means 4 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,

    })


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
        const input = event.target.value;

        // Allow only numeric values and up to two digits after the decimal point
        const sanitizedInput = input.replace(/[^0-9.]/g, ''); // Remove non-numeric characters except '.'

        // Limit the total input length to 12 characters
        if (sanitizedInput.length > 12) {
            return; // Ignore input if more than 12 characters
        }

        // Limit to one decimal point
        const decimalCheck = sanitizedInput.split('.');
        if (decimalCheck.length > 2) {
            return; // Ignore input if more than one decimal point
        }

        // Limit to two digits after the decimal point
        if (decimalCheck[1] && decimalCheck[1].length > 2) {
            decimalCheck[1] = decimalCheck[1].substring(0, 2); // Trim digits after the second decimal place
        }

        const finalInput = decimalCheck.join('.');

        // Update the state with the sanitized input
        setWagerAmount(finalInput);
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

    const placeBet = async () => {

        let buttons = document.getElementsByClassName("betButton");

        let button = buttons[0];

        try {
            // Call the updateDatabase function to update the database
            if (fetchedUser.credits >= wagerAmount && wagerAmount > 0) {
                button.classList.add("inactive");
                toast.success("Bet successfully placed!", toastSettings);
                await addBetToDatabase(sport, selectedGame, selectedTeam, wagerAmount, calculateReturn(), fetchedUser.email, false);

                // Call the updateUser function to update the fetched user
                await updateUserCredits(fetchedUser.email, fetchedUser.credits - wagerAmount);

                fetchedUser.credits -= wagerAmount;

                setTimeout(() => {

                    closePopup();
                    button.classList.remove("inactive");
                }, toastSettings().autoClose);




            } else {
                button.classList.remove("inactive");

                if (wagerAmount <= 0) {
                    toast.error("Must place a bet greater than $0.00", toastSettings);

                } else {

                    toast.error("Not enough bet credits to place bet! Your balance: $" + fetchedUser.credits, toastSettings);
                }
            }

            // You can also add any additional logic related to placing the bet
        } catch (error) {
            if (button.classList.contains("inactive")) {
                button.classList.remove("inactive");
            }

            // Handle any errors that occur during updating the database or user
            console.error('Error while placing bet:', error);
        }
    };

    return (
        <div className="fixed bottom-10 left-0 w-full flex justify-center z-50">
            <div className="bg-white rounded-md shadow-xl overflow-hidden max-w-md w-full sm:w-96 md:w-1/2 lg:w-2/3 xl:w-1/3 z-50">

                <div className="bg-indigo-500 text-white px-4 py-2 flex justify-between">
                    <h2 className="text-lg font-bold">{selectedTeam + " " + odds}</h2>
                    <button onClick={handleClose} className="text-white px-2 py-1">X</button>
                </div>

                <div className="p-4">
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
                    <button onClick={placeBet} className="betButton px-3 py-4 border-l border-white border-opacity-25 bg-indigo-500 text-white w-1/2 relative font-bold">
                        Place Bet
                        <p className="absolute py-2 bottom-0 left-0 font-normal text-indigo-200 text-xs text-center w-full">To return: ${calculateReturn()} </p>
                    </button>
                </div>


            </div>

            <ToastContainer></ToastContainer>
        </div>

    )


}

export default BetSelectionPopup; 