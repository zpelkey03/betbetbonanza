import Images from "./images/images";


const VerticalNavbar = ({ onSportButtonClick }) => {

    const nhlLogo = Images.nhl_logo;
    const nbaLogo = Images.nba_logo;
    const mlsLogo = Images.mls_logo; 
    const profileLogo = Images.profileLogo;


    return (
        <aside className="bg-gray-800 text-white w-64 min-h-screen p-4">
            <nav>
                <ul className="space-y-2">
                    <li
                        className="transition-transform duration-300"
                        style={{ transform: "scale(1)", transition: "transform 0.3s ease" }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                        onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                    >
                        <div className="flex items-center justify-between p-2 hover:bg-gray-700 border-b border-slate-300">
                            <div className="flex items-center ">
                                
                                <button onClick={() => onSportButtonClick('main')}>Main Page</button>
                            </div>
                            <i className="fas fa-chevron-down text-xs"></i>
                        </div>
                    </li>
                    <li
                        className="transition-transform duration-300"
                        style={{ transform: "scale(1)", transition: "transform 0.3s ease" }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                        onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                    >
                        <div className="flex items-center justify-between p-2 hover:bg-gray-700 ">
                            <div className="flex items-center">
                                <img src={nhlLogo} className="mr-2 h-6 w-6" />
                                <button onClick={() => onSportButtonClick('hockey')}>View NHL Bets</button>
                            </div>
                            <i className="fas fa-chevron-down text-xs"></i>
                        </div>
                    </li>
                    <li
                        className="transition-transform duration-300"
                        style={{ transform: "scale(1)", transition: "transform 0.3s ease" }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                        onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                    >
                        <div className="flex items-center justify-between p-2 hover:bg-gray-700">
                            <div className="flex items-center">
                                <img src={nbaLogo} className="mr-2 h-6" />
                                <button onClick={() => onSportButtonClick('basketball')}>View NBA Bets</button>
                            </div>
                            <i className="fas fa-chevron-down text-xs"></i>
                        </div>
                    </li>
                    <li
                        className="transition-transform duration-300"
                        style={{ transform: "scale(1)", transition: "transform 0.3s ease" }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                        onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                    >
                        <div className="flex items-center justify-between p-2 hover:bg-gray-700">
                            <div className="flex items-center">
                            <img src={mlsLogo} className="mr-2 h-6 max-h-6 max-w-6" />                                <button onClick={() => onSportButtonClick('soccer')}>View Soccer Bets</button>
                         </div>
                            <i className="fas fa-chevron-down text-xs"></i>
                        </div>
                    </li>
                    <li
                        className="transition-transform duration-300"
                        style={{ transform: "scale(1)", transition: "transform 0.3s ease" }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                        onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                    >
                        <div className="flex items-center justify-between p-2 hover:bg-gray-700">
                            <div className="flex items-center">
                            <img src={profileLogo} className="mr-2 h-6" />
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