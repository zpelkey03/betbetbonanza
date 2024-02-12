import { fetchedUser } from './LogInComponent';

function ProfileComponent() {

    return (

        <div className="flex flex-col sticky top-0 z-10 w-4/5 mx-auto mt-8">
            <div className="bg-gray-900 border border-gray-800 shadow-lg rounded-2xl p-4">
                <div className="flex-none sm:flex">

                    <div className="flex-auto sm:ml-5 justify-evenly">


                        <div className="flex flex-col">
                            <div className="w-full flex-none text-1x1 text-gray-200 font-bold leading-none mt-2"> {fetchedUser.firstName + " " + fetchedUser.lastName}  </div>

                            <div className="flex-auto text-gray-400 my-1">
                                <span className="mr-3">{fetchedUser.email} </span>

                                <span className="mr-3">{"Total Credits: " + fetchedUser.credits} </span>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    )


}

export default ProfileComponent; 