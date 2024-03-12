import { fetchedUser } from './LogInComponent';
import { useEffect, useState } from 'react';
import { getAllBetsByUserEmail } from '../business/Bets'; // Assuming you've named the file containing the function getAllBetsByUserEmail as BetsUtils.js
import { getGamesByIds } from '../business/Bets'
import UserBetsView from './UserBetsView';

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
            setUserBets(bets);
            const gameIds = bets.map(bet => bet.game.id); // Assuming game id is nested within a "game" property
            getGamesByIds(gameIds);
        } catch (error) {
            console.error('Error fetching user bets:', error);
        }
    };

    return (
        <div className="flex flex-col sticky top-0 z-10  mx-auto mt-8">


            <div className="bg-gray-900 border border-gray-800 shadow-lg rounded-2xl p-4 relative mb-2">
                {/* Main content */}
                <div className="flex-none sm:flex">
                    <div className="flex-auto sm:ml-5 justify-evenly flex w-95p">
                        {/* Left side content */}
                        <div className="flex flex-col w-full">
                            <div className="w-full flex-none text-1x1 text-gray-200 font-bold leading-none mt-2">{fetchedUser.firstName + " " + fetchedUser.lastName}</div>
                            <div className="flex-auto text-gray-400 my-1">
                                <br></br>
                                <br></br>
                                <span className="mr-3">{"Email: " + fetchedUser.email}</span>
                            </div>
                        </div>

                        {/* Right side box */}
                        <div className="flex-none bg-gray-600 h-95p w-5p rounded-2xl flex flex-col items-center justify-center text-white p-5">
                            <p className="font-bold text-lg">Total Credits:</p>
                            <div className="text-2xl font-bold text-green-600">
                                <span className="mr-3">{"$" + fetchedUser.credits}</span>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Display user's bets */}
            <div className="mt-4 bg-gray-700 rounded-lg p-4">
                <h2 className="text-xl font-bold text-black mb-5 mt-5 ">Your Bets</h2>
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