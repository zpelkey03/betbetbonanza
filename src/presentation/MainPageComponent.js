import Images from './images/images';
import { useEffect, useState } from 'react';
import BettingItemView from './BettingItemView';


const MainPageComponent = ( {onSportSelect}) => {


    const handleSportButtonClick = (sport) => {

        onSportSelect(sport);

    };


    return (
        <div>
            <h1> Featured Sports </h1>
            <div className="flex gap-6 mt-10">
            
                <button className="bg-white w-1/3 shadow rounded-lg overflow-hidden" onClick={() => handleSportButtonClick("hockey")}>
                    <img src={Images.hockey_image} className="object-cover h-52 w-full" alt=""></img>
                    <div className="p-6">
                        <span className="block text-slate-400 font-semibold text-sm">Hockey Betting</span>
                        <h3 className="mt-3 font-bold text-lg pb-4 border-b border-slate-300">
                            <p> NHL </p>
                        </h3>
                        <div className="flex mt-4 gap-4 items-center"></div>
                    </div>
                </button>
                <button className="bg-white w-1/3 shadow rounded-lg overflow-hidden" onClick={() => handleSportButtonClick("basketball")}>
                    <img src={Images.bball_image} className="object-cover h-52 w-full" alt=""></img>
                    <div className="p-6">
                        <span className="block text-slate-400 font-semibold text-sm">Basketball Betting</span>
                        <h3 className="mt-3 font-bold text-lg pb-4 border-b border-slate-300">
                            <p> NBA </p>
                        </h3>
                        <div className="flex mt-4 gap-4 items-center"></div>
                    </div>
                </button>
                <button className="bg-white w-1/3 shadow rounded-lg overflow-hidden" onClick={() => handleSportButtonClick("soccer")}>
                    <img src={Images.soccer_image} className="object-cover h-52 w-full" alt=""></img>
                    <div className="p-6">
                        <span className="block text-slate-400 font-semibold text-sm">Soccer Betting</span>
                        <h3 className="mt-3 font-bold text-lg pb-4 border-b border-slate-300">
                            <p> MLS? </p>
                        </h3>
                        <div className="flex mt-4 gap-4 items-center"></div>
                    </div>
                </button>
            </div>
        </div>
    );



}

export default MainPageComponent;