import { useEffect, useState } from 'react';
import { getAuth, signOut  } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

function UserDashboard() {

    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);

    const signOutClicked = () => {

        const auth = getAuth();

        signOut(auth).then(() => {
            // Sign-out successful.

            navigate('/')
        }).catch((error) => {
            // An error happened.
        });


    }

    return (
        <div>

            <div class="flex bg-gray-800 text-white top-0 py-3 flex-wrap justify-around bg-silver">
                <h1 class="text-lg font-semibold"> Welcome back:  </h1>
                <ul class="flex gap-[40px] text-m">
                    <li><button onClick={signOutClicked}> Sign Out </button></li>
                    
                </ul>
            </div>

        </div>
    )

}


export default UserDashboard; 