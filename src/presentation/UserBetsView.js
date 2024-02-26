
const UserBetsView = ({ gameInformation }) => {


    // const { id, home_team, away_team, commence_time, draftkings_odds } = gameInformation;

    return (

        <div className="bg-gray-900 border border-gray-800 shadow-lg rounded-2xl p-4">
            <div className="flex-none sm:flex">
                <div className="flex-auto sm:ml-5 justify-evenly">
                    <div className="flex flex-col">
                        <div className="w-full flex-none text-1x1 text-gray-200 font-bold leading-none mt-2">{"Game: " + gameInformation.game.awayTeam + " vs " + gameInformation.awayTeam}</div>
                        <div className="flex-auto text-gray-400 my-1">
                            <span className="mr-3">{"Team Chosen: " + gameInformation.sport}</span>
                            <span className="mr-3">{"Wager Amount: " + gameInformation.wagerAmount}</span>
                            <span className="mr-3">{"Wager Amount: " + gameInformation.wagerAmount}</span>
                            <span className="mr-3">{"Wager Amount: " + gameInformation.wagerAmount}</span>

                        </div>
                    </div>
                </div>
            </div>
        </div>


    )


}

export default UserBetsView; 