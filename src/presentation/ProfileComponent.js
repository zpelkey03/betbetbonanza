import { fetchedUser } from './LogInComponent';
import { useEffect, useState } from 'react';
import { getAllBetsByUserEmail } from '../business/Bets'; // Assuming you've named the file containing the function getAllBetsByUserEmail as BetsUtils.js
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
        } catch (error) {
            console.error('Error fetching user bets:', error);
        }
    };


    if (fetchedUser.credits != undefined) {
        //Limit to 2 decimal places for credits
        fetchedUser.credits = Number(fetchedUser.credits.toFixed(2));
    }

    return (
        <div className="flex flex-col sticky top-0 z-10 w-4/5 mx-auto mt-8">
            <div className="bg-gray-900 border border-gray-800 shadow-lg rounded-2xl p-4">
                <div className="flex-none sm:flex">
                    <div className="flex-auto sm:ml-5 justify-evenly">
                        <div className="flex flex-col">
                            <div className="w-full flex-none text-1x1 text-gray-200 font-bold leading-none mt-2">{fetchedUser.firstName + " " + fetchedUser.lastName}</div>
                            <div className="flex-auto text-gray-400 my-1">
                                <span className="mr-3">{fetchedUser.email}</span>
                                
                            </div>
                        </div>


                         {/* Right side box */}
                    <div className="flex-none bg-gray-600 h-95p w-5p rounded-2xl flex flex-col items-center justify-center text-white p-5">
                        <p className="font-bold text-lg">Credits: </p>
                        <div className="text-2xl font-bold">
                            {"$" + fetchedUser.credits}
                        </div>
                    </div>
                    </div>
                </div>
            </div>

            {/* Display user's bets */}
            <div className="mt-4">
                <h2 className="text-xl font-bold text-gray-200 mb-5 mt-5">Your Bets</h2>
                <ul className="list-none ml-6">
                    {userBets.map((bet, index) => (
                        <li key={index} className="text-gray-300">


                            <UserBetsView gameInformation={bet}></UserBetsView>
                        </li>

                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ProfileComponent;