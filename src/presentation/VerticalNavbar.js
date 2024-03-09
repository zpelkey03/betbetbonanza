import Images from "./images/images";


const VerticalNavbar = ({ onSportButtonClick }) => {

    const nhlLogo = Images.nhl_logo;
    const nbaLogo = Images.nba_logo;


    return (
        <aside className="bg-gray-800 text-white w-64 min-h-screen p-4">
            <nav>
                <ul className="space-y-2">
                    <li className="opcion-con-desplegable">
                        <div className="flex items-center justify-between p-2 hover:bg-gray-700">
                            <div className="flex items-center">
                                <i className="fas fa-calendar-alt mr-2"></i>
                                <button onClick={() => onSportButtonClick('main')}>Main Page</button>
                            </div>
                            <i className="fas fa-chevron-down text-xs"></i>
                        </div>
                    </li>
                    <li className="opcion-con-desplegable">
                        <div className="flex items-center justify-between p-2 hover:bg-gray-700">
                            <div className="flex items-center">
                                <img src={nhlLogo} className="mr-2 h-6" />
                                <button onClick={() => onSportButtonClick('hockey')}>View NHL Bets</button>
                            </div>
                            <i className="fas fa-chevron-down text-xs"></i>
                        </div>
                    </li>
                    <li className="opcion-con-desplegable">
                        <div className="flex items-center justify-between p-2 hover:bg-gray-700">
                            <div className="flex items-center">
                                <img src={nbaLogo} className="mr-2 h-6" />
                                <button onClick={() => onSportButtonClick('basketball')}>View NBA Bets</button>
                            </div>
                            <i className="fas fa-chevron-down text-xs"></i>
                        </div>
                    </li>
                    <li className="opcion-con-desplegable">
                        <div className="flex items-center justify-between p-2 hover:bg-gray-700">
                            <div className="flex items-center">
                                <i className="fas fa-chart-bar mr-2"></i>
                                <button onClick={() => onSportButtonClick('soccer')}>View Soccer Bets</button>
                            </div>
                            <i className="fas fa-chevron-down text-xs"></i>
                        </div>
                    </li>
                    <li className="opcion-con-desplegable">
                        <div className="flex items-center justify-between p-2 hover:bg-gray-700">
                            <div className="flex items-center">
                                <i className="fas fa-chart-bar mr-2"></i>
                                <button onClick={() => onSportButtonClick('profile')}>View Profile</button>
                            </div>
                            <i className="fas fa-chevron-down text-xs"></i>
                        </div>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};
export default VerticalNavbar; 