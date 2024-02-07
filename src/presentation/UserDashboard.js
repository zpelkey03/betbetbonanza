import { useEffect, useState } from 'react';
import { getAuth, signOut  } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { fetchedUser } from './LogInComponent';
import { fetchUpcomingNHLGames } from '../business/SportsApi';

function UserDashboard() {

    // Define a state to store the upcoming NHL games
    const [upcomingNHLGames, setUpcomingNHLGames] = useState([]);

    // Function to fetch upcoming NHL games when the button is clicked
    const handleFetchUpcomingNHLGames = async () => {
        try {
        const games = await fetchUpcomingNHLGames(); // Call the function to fetch upcoming NHL games
        setUpcomingNHLGames(games); // Update the state with the fetched games
        } catch (error) {
        console.error('Error fetching upcoming NHL games:', error);
        }
    };

    const navigate = useNavigate();
    
    // console.log("DASHBOARD FETCHED USER:", fetchedUser); 

    const signOutClicked = () => {

        const auth = getAuth();

        signOut(auth).then(() => {
            // Sign-out successful.

            navigate('/')
        }).catch((error) => {
            // An error happened.
        });
    }
  

    return (
        <div>

    


            <nav class="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <a href="#" class="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo" />
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
    </a>
    <button data-collapse-toggle="navbar-multi-level" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-multi-level" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
    <div class="hidden w-full md:block md:w-auto" id="navbar-multi-level">
      <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <li>
          <a href="#" class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent" aria-current="page">Home</a>
        </li>
        <li>
            <button id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar" class="flex items-center justify-between w-full py-2 px-3 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent">Dropdown <svg class="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
  </svg></button>
            
        </li>
        <li>
          <a href="#" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Services</a>
        </li>
        <li>
          <a href="#" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Pricing</a>
        </li>
        <li>
        <button onClick={signOutClicked} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Get started</button>
        </li>
      </ul>
    </div>
  </div>
</nav>
<p> Welcome back: {fetchedUser.firstName} </p>
<p> Welcome back: {fetchedUser.lastName} </p>
<p> Total Credits: {fetchedUser.credits} </p>
<li>
    <button onClick={handleFetchUpcomingNHLGames}>Fetch Upcoming NHL Games</button>
</li>
{upcomingNHLGames.length > 0 && (
    <div>
        <h2>Upcoming NHL Games:</h2>
        <ul>
            {upcomingNHLGames.map((game, index) => (
                <li key={index}>
                    {/* Render individual game details */}
                    <p>{game.home_team} vs {game.away_team}</p>
                    <p>Date: {game.commence_time}</p>
                    {/* Additional details */}
                    {game.draftkings_odds && (
                        <p>
                            DraftKings Odds:
                            Home Team: {game.draftkings_odds.home_team_odds}, 
                            Away Team: {game.draftkings_odds.away_team_odds}
                        </p>
                    )}
                    {/* Add more details as needed */}
                </li>
            ))}
        </ul>
    </div>
)}
        </div>
    

    )

}


export default UserDashboard; 