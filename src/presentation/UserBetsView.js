
const UserBetsView = ({ gameInformation }) => {


    const { away_team, home_team, id, commence_time } = gameInformation.game;

    return (

        <div className="bg-gray-900 border border-gray-800 shadow-lg rounded-2xl p-4 relative mb-2">
            {/* Main content */}
            <div className="flex-none sm:flex">
                <div className="flex-auto sm:ml-5 justify-evenly flex w-95p">
                    {/* Left side content */}
                    <div className="flex flex-col w-full">
                        <div className="w-full flex-none text-1x1 text-gray-200 font-bold leading-none mt-2">
                            {gameInformation.team}
                        </div>
                        <div className="flex-auto text-gray-400 my-1">
                            <span className="mr-3">{"Game: " + home_team + " vs " + away_team + " (" + gameInformation.sport + ")"}</span>
                            <br />
                            <span className="mr-3">{"Wager Amount: - FIX FORMAT: " + gameInformation.wagerAmount}</span>
                            <br />
                            <span className="mr-3">{"Date - FIX FORMAT: " + commence_time}</span>
                        </div>
                    </div>

                    {/* Right side box */}
                    <div className="flex-none bg-gray-600 h-95p w-5p rounded-2xl flex flex-col items-center justify-center text-white p-5">
                        <p className="font-bold text-lg">Winning Amount:</p>
                        <div className="text-2xl font-bold">
                            {"$" + gameInformation.returnAmount}
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )


}

export default UserBetsView; 