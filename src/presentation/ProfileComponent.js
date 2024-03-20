import { fetchedUser } from './LogInComponent';
import { useEffect, useState } from 'react';
import { getAllBetsByUserEmail, updateUserCredits, updateWinCredits } from '../business/Bets'; // Assuming you've named the file containing the function getAllBetsByUserEmail as BetsUtils.js
import { getGamesByIds, updateBetsInDatabase } from '../business/Bets'
import UserBetsView from './UserBetsView';
import CreditsAndEmail from './CreditsAndEmail';

function ProfileComponent() {
    const [userBets, setUserBets] = useState([]);

    useEffect(() => {
        // Fetch user's bets when the component mounts
        fetchUserBets();
    }, []); // Empty dependency array to run only once on component mount

    const fetchUserBets = async () => {
        try {
            // Assuming fetchedUser contains the current user's email
            const bets = await getAllBetsByUserEmail(fetchedUser.email);
            
            // Map bet IDs to objects for easy lookup
            const betIdMap = {};
            bets.forEach(bet => {
                betIdMap[bet.id] = bet;
            });
            
            // Extract game IDs from all bets
            const gameIds = bets
            .filter(bet => !bet.isCompleted) // Filter out completed bets
            .map(bet => bet.game.id);
            const games = await getGamesByIds(gameIds);
            
            // Update userBets with corresponding games
            const updatedUserBets = bets.map(bet => {
                const game = games.find(game => game.id === bet.game.id);
                if (game) {
                    // Update specific properties of the user bet
                    const updatedBet = { ...bet };
                    if (game.completed !== undefined) {
                        updatedBet.isCompleted = game.completed;
                    }
                    if (game.homeScore !== null) {
                        updatedBet.homeScore = game.homeScore;
                    }
                    if (game.awayScore !== null) {
                        updatedBet.awayScore = game.awayScore;
                    }
                    // Calculate winner based on scores
                    if (game.homeScore !== null && game.awayScore !== null) {;
                        if (game.homeScore === game.awayScore) {
                            updatedBet.winner = 'Tie';
                        } else if (game.homeScore > game.awayScore) {
                            updatedBet.winner = game.homeTeam;
                        } else {
                            updatedBet.winner = game.awayTeam;
                        }
                    }
                    updateWinCredits(updatedBet); // Update the user's credits based on the bet 
                    return updatedBet;
                } else {
                    return bet;
                }
            });

            // Filter out completed games
            const completedUserBets = updatedUserBets.filter(bet => bet.isCompleted);
            setUserBets(updatedUserBets);
            console.log('Updated user bets:', updatedUserBets);
            updateBetsInDatabase(completedUserBets); // Update the user bets in the database 
        } catch (error) {
            console.error('Error fetching user bets:', error);
        }
    };

    return (

      
        <div className="flex flex-col sticky top-0 z-10  mx-auto mt-8">

            <CreditsAndEmail></CreditsAndEmail>

            {/* Display user's bets */}
            <div className="mt-4 bg-gray-700 rounded-lg p-4">
                <h2 className="text-xl font-bold text-white mb-5 mt-5 ">Your Bets</h2>
                <ul className="list-none">
                    {
                        // Sort the userBets by the newest date first! 
                        userBets.sort((a, b) => new Date(b.game.commence_time) - new Date(a.game.commence_time))
                            .map((bet, index) => (
                                <li key={index} className="text-gray-300">
                                    <UserBetsView gameInformation={bet}></UserBetsView>
                                </li>
                            ))
                    }
                </ul>
            </div>
        </div>
    );
}

export default ProfileComponent;