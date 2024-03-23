import Images from './images/images';

const MainPageComponent = ({ onSportSelect }) => {


    const handleSportButtonClick = (sport) => {

        onSportSelect(sport);

    };


    return (
        <div>
            <h1 className="font-bold text-2xl ml-1 mt-5"> Featured Sports </h1>
            <div className="flex gap-6 mt-5">

                <button
                    className="bg-white w-1/3 shadow rounded-lg overflow-hidden transition-transform duration-300"
                    onClick={() => handleSportButtonClick("hockey")}
                    style={{ transform: "scale(1)", transition: "transform 0.3s ease" }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                    onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                >
                    <img src={Images.hockey_image} className="object-cover h-52 w-full" alt=""></img>
                    <div className="bg-gray-800 p-6 text-white">
                        <span className="block text-slate-400 font-semibold text-sm">Hockey Betting</span>
                        <h3 className="mt-3 font-bold text-lg pb-4 border-b border-slate-300">
                            <p> NHL </p>
                        </h3>
                        <div className="flex mt-4 gap-4 items-center"></div>
                    </div>
                </button>
                <button
                    className="bg-white w-1/3 shadow rounded-lg overflow-hidden transition-transform duration-300"
                    onClick={() => handleSportButtonClick("basketball")}
                    style={{ transform: "scale(1)", transition: "transform 0.3s ease" }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                    onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                >
                    <img src={Images.bball_image} className="object-cover h-52 w-full" alt=""></img>
                    <div className="bg-gray-800 p-6 text-white">
                        <span className="block text-slate-400 font-semibold text-sm">Basketball Betting</span>
                        <h3 className="mt-3 font-bold text-lg pb-4 border-b border-slate-300">
                            <p> NBA </p>
                        </h3>
                        <div className="flex mt-4 gap-4 items-center"></div>
                    </div>
                </button>
                <button
                    className="bg-white w-1/3 shadow rounded-lg overflow-hidden transition-transform duration-300"
                    onClick={() => handleSportButtonClick("soccer")}
                    style={{ transform: "scale(1)", transition: "transform 0.3s ease" }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                    onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                >
                    <img src={Images.soccer_image} className="object-cover h-52 w-full" alt=""></img>
                    <div className="bg-gray-800 p-6 text-white">
                        <span className="block text-slate-400 font-semibold text-sm">Soccer Betting</span>
                        <h3 className="mt-3 font-bold text-lg pb-4 border-b border-slate-300">
                            <p> MLS </p>
                        </h3>
                        <div className="flex mt-4 gap-4 items-center"></div>
                    </div>
                </button>

            </div>
        </div>
    );



}

export default MainPageComponent;