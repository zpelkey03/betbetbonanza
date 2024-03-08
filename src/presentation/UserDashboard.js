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

    //Renders the content re-written
    //Much simpler and better logic 
    const renderContent = () => {

        //The "main" is simply the 3 "Featured Sports" that are rendered when you first log in! 
        const isSportOrProfile = selectedSport !== "main";

        //Since this is not a sport, the BetterItemView component should not be run
        //That is why we do a seperate if/else for this part
        if (selectedSport === "main") {
            return <MainPageComponent />;
        }

        //In all other cases, return the correct content witch also includes an image!
        return (
            <div>

                {isSportOrProfile && imageToLoad && (
                    <img src={imageToLoad} style={{ maxHeight: '400px', width: '95%' }} className="mb-4 ml-5 rounded-md shadow-md" />
                )}

                {/* Render BettingItemView or ProfileComponent based on selectedSport.
            Ternary operator is used instead of regular if/else so that it doesnt
            have to be moved outside of the renderContent code block */}

                {selectedSport === "profile" ? <ProfileComponent /> : <BettingItemView sport={selectedSport} />}

            </div>
        );
    };

    return (
        <div>

            {/* Call the horizontal Dashboard component which shows at the top of the page ALL the time*/}
            <DashboardNavbar></DashboardNavbar>

            <div className="flex h-full">

                {/* Vertical navbar is called here, always shows as well*/}

                <VerticalNavbar onSportButtonClick={(sport) => {
                    setSelectedSport(sport);

                    // Update imageToLoad based on the sport selected
                    switch (sport) {
                        case "hockey":
                            setImageToLoad(Images.hockey_image);
                            break;
                        case "basketball":
                            setImageToLoad(Images.bball_image);
                            break;

                        default:

                            //The 'main' doesnt have an image, so there shouldnt be an image set at all 
                            setImageToLoad(null);
                    }

                }} />
                <div className="bg-white flex-1 p-4">

                    {/* Call the render content here! */}
                    {renderContent()}

                </div>
            </div>
        </div>
    );
}

export default UserDashboard;
