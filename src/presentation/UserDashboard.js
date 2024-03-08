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
import DashboardNavbar from './DashboardNavbar';

function UserDashboard() {

    // //This will store the state of what button was presesed inside the VerticalNavbar component
    // const [selectedSport, setSelectedSport] = useState(null);
    // const [imageToLoad, setImageToLoad] = useState('');


    // const handleSportButtonClick = (sport) => {
    //     setSelectedSport(sport);

    //     if (sport === "hockey") {
    //         setImageToLoad(Images.hockey_image);
    //     } else if (sport === "basketball") {
    //         setImageToLoad(Images.bball_image);
    //     } else if (sport === "soccer") {
    //         setImageToLoad(Images.soccer_image);
    //     } else if (sport === "profile") {
    //         setImageToLoad(Images.profile_supprt);
    //     } else {
    //         setImageToLoad(null);
    //     }
    // };


    const [selectedSport, setSelectedSport] = useState("main"); // default to main page
    const [imageToLoad, setImageToLoad] = useState('');

    useEffect(() => {
        switch (selectedSport) {
            case "hockey":
                setImageToLoad(Images.hockey_image);
                break;
            case "basketball":
                setImageToLoad(Images.bball_image);
                break;
            case "soccer":
                setImageToLoad(Images.soccer_image);
                break;
            case "profile":
                setImageToLoad(Images.profile_supprt);
                break; 
            default:
                setImageToLoad(null);
        }
    }, [selectedSport]);

    const navigate = useNavigate();

    const renderContent = () => {
        // Check if the selected sport is not 'main', implying it's either a sport or 'profile'
        const isSportOrProfile = selectedSport !== "main";
    
        // Handle rendering the MainPageComponent separately
        if (selectedSport === "main") {
          return <MainPageComponent />;
        }
    
        // For all other cases, return the appropriate content with the image included
        return (
          <div>
            {isSportOrProfile && imageToLoad && (
              <img src={imageToLoad} style={{ maxHeight: '400px', width: '95%' }} className="mb-4 ml-5 rounded-md shadow-md" />
            )}
            {/* Render BettingItemView or ProfileComponent based on selectedSport */}
            {selectedSport === "profile" ? <ProfileComponent /> : <BettingItemView sport={selectedSport} />}
          </div>
        );
      };
    
      return (
        <div>
          {/* NavBar and other components remain unchanged */}
          <DashboardNavbar></DashboardNavbar>
          <div className="flex h-full">
            <VerticalNavbar onSportButtonClick={(sport) => {
              setSelectedSport(sport);
              // Update imageToLoad based on the sport selected
              switch(sport) {
                case "hockey":
                  setImageToLoad(Images.hockey_image);
                  break;
                case "basketball":
                  setImageToLoad(Images.bball_image);
                  break;
                // Include other cases as necessary
                default:
                  setImageToLoad(null); // No image for 'main' or invalid sport
              }
            }}/>
            <div className="bg-white flex-1 p-4">
              {renderContent()}
            </div>
          </div>
        </div>
      );
}

export default UserDashboard;
