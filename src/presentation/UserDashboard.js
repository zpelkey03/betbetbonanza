import { useEffect, useState } from 'react';
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { fetchedUser } from './LogInComponent';
import { fetchUpcomingNHLGames } from '../business/SportsApi';
import "./UserDashboard.css"
import BettingItemView from './BettingItemView';
import VerticalNavbar from './VerticalNavbar';
import ProfileComponent from './ProfileComponent';
import Images from './images/images';
import MainPageComponent from './MainPageComponent';

function UserDashboard() {

    //This will store the state of what button was presesed inside the VerticalNavbar component
    const [selectedSport, setSelectedSport] = useState(null);
    const [imageToLoad, setImageToLoad] = useState('');


    const handleSportButtonClick = (sport) => {
        setSelectedSport(sport);

        if (sport === "hockey") {
            setImageToLoad(Images.hockey_image);
        } else if (sport === "basketball") {
            setImageToLoad(Images.bball_image);
        } else if (sport === "soccer") {
            setImageToLoad(Images.soccer_image);
        } else if (sport === "profile") {
            setImageToLoad(Images.profile_supprt);
        } else {
            setImageToLoad(null);
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
        <div data-testid="UserDashboard">

            {/*Nav bar code */}

            <nav className="bg-gray-900 border-gray-200 dark:bg-gray-900 dark:border-gray-700">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Betbetbonanza</span>
                    </a>
                    <button data-collapse-toggle="navbar-multi-level" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-multi-level" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                    <div className="hidden w-full md:block md:w-auto" id="navbar-multi-level">
                        <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">

                            <li>
                                <button onClick={signOutClicked} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> Sign out</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>


            <div className="flex h-full">

                {/* Vertical Navbar */}
                <VerticalNavbar onSportButtonClick={handleSportButtonClick}/>

                {/* The list of bets */}
                <div className="bg-white flex-1 p-4 ">

                    {/* Load the image */}

                    

                    {selectedSport && (
                    <div>

                    <img src={imageToLoad} style={{ maxHeight: '400px', width: '95%' }} className="mb-4 ml-5 rounded-md shadow-md"/>
                    
                    
                    <BettingItemView sport={selectedSport} />

                    </div> 
                    )}

                    {/*Default component that shows when you login*/}
                    {!selectedSport && (

                        <div>
                            <BettingItemView sport={selectedSport} />
                        </div> 



                    )}

                </div>
            </div>

        </div>
    );
}

export default UserDashboard;
