import { useEffect, useState } from 'react';
import { getAuth, signOut  } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { fetchedUser } from './LogInComponent';
import { fetchUpcomingNHLGames } from '../business/SportsApi';
import "./UserDashboard.css"
import BettingItemView from './BettingItemView';

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

  
        {/*Nav bar code */ }

          <nav class="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
            <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
              <a href="#" class="flex items-center space-x-3 rtl:space-x-reverse">
                <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo" />
                <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Betbetbonanza</span>
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
              <button onClick={signOutClicked} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> Signed out</button>
              </li>
            </ul>
              </div>
            </div>
            </nav>



            {/* Profile code section */}
      

            <div className="flex flex-col sticky top-0 z-10 w-4/5 mx-auto mt-8">
            <div className="bg-gray-900 border border-gray-800 shadow-lg rounded-2xl p-4">
    <div className="flex-none sm:flex">
   
      <div className="flex-auto sm:ml-5 justify-evenly">
       
          
            <div className="flex flex-col">
              <div style={{ fontSize: '1.5rem'}}className="w-full flex-none text-center text-gray-100 font-bold leading-none"> {"Welcome back"}  </div>
              <div className="w-full flex-none text-1x1 text-gray-200 font-bold leading-none mt-2"> {fetchedUser.firstName + " " + fetchedUser.lastName}  </div>

              <div className="flex-auto text-gray-400 my-1">
                <span className="mr-3">{fetchedUser.email} </span>

                <span className="mr-3">{"Total Credits: " + fetchedUser.credits} </span>
                
              </div>
            </div>
          
        
       
      </div>
    </div>
  </div>
</div>



      {/* This is the betting table code: */}
      <div className="bettingTableBG"> 

        <BettingItemView></BettingItemView>

      </div>
            

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