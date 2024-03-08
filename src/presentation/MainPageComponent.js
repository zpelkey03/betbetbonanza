import Images from './images/images';
import { useEffect, useState } from 'react';
import BettingItemView from './BettingItemView';


const MainPageComponent = () => {

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


    const contentToDisplay = () => {

        return (
            <div>

                <h1> Featured Sports </h1>

                <div class="flex gap-6 mt-10">

                    <button class="bg-white w-1/3 shadow rounded-lg overflow-hidden" onClick={() => handleSportButtonClick("hockey")} >
                        <img src={Images.hockey_image} class="object-cover h-52 w-full" alt=""></img>
                        <div class="p-6">
                            <span class="block text-slate-400 font-semibold text-sm">Hockey Betting</span>
                            <h3 class="mt-3 font-bold text-lg pb-4 border-b border-slate-300">
                                <p> NHL </p> </h3>
                            <div class="flex mt-4 gap-4 items-center">
                            </div>
                        </div>
                    </button>

                    <button class="bg-white w-1/3 shadow rounded-lg overflow-hidden" onClick={() => handleSportButtonClick("basketball")}>
                        <img src={Images.bball_image} class="object-cover h-52 w-full" alt=""></img>
                        <div class="p-6">
                            <span class="block text-slate-400 font-semibold text-sm">Basketball Betting</span>
                            <h3 class="mt-3 font-bold text-lg pb-4 border-b border-slate-300">
                                <p> NBA </p></h3>
                            <div class="flex mt-4 gap-4 items-center">
                            </div>
                        </div>
                    </button>

                    <button class="bg-white w-1/3 shadow rounded-lg overflow-hidden" onClick={() => handleSportButtonClick("soccer")}>
                        <img src={Images.soccer_image} class="object-cover h-52 w-full" alt=""></img>
                        <div class="p-6">
                            <span class="block text-slate-400 font-semibold text-sm">Soccer Betting</span>
                            <h3 class="mt-3 font-bold text-lg pb-4 border-b border-slate-300">
                                <p> MLS? </p></h3>
                            <div class="flex mt-4 gap-4 items-center">
                            </div>
                        </div>
                    </button>
                </div>
            </div>
        );

    }



    // Rendering logic using if/else
    let content;
    if (selectedSport) {
        content = (
            <div>
                <img src={imageToLoad} style={{ maxHeight: '400px', width: '95%' }} className="mb-4 ml-5 rounded-md shadow-md" />
                <BettingItemView sport={selectedSport} />
            </div>
        );
    } else {
        content = contentToDisplay();
    }

    return <div>{content}</div>;




}

export default MainPageComponent;