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

    return (
        <div className="flex flex-col sticky top-0 z-10 w-4/5 mx-auto mt-8">
            <div className="bg-gray-900 border border-gray-800 shadow-lg rounded-2xl p-4">
                <div className="flex-none sm:flex">
                    <div className="flex-auto sm:ml-5 justify-evenly">
                        <div className="flex flex-col">
                            <div className="w-full flex-none text-1x1 text-gray-200 font-bold leading-none mt-2">{fetchedUser.firstName + " " + fetchedUser.lastName}</div>
                            <div className="flex-auto text-gray-400 my-1">
                                <span className="mr-3">{fetchedUser.email}</span>
                                <span className="mr-3">{"Total Credits: " + fetchedUser.credits}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Display user's bets */}
            <div className="mt-4">
                <h2 className="text-xl font-semibold text-gray-200">Your Bets</h2>
                <ul className="list-disc ml-6">
                    {userBets.map((bet, index) => (
                        <li key={index} className="text-gray-300">

                            {/* Delete the above stuff and instead call UserBetsView cpompoent */}

                            <UserBetsView gameInformation={bet}></UserBetsView>
                        </li>

                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ProfileComponent;