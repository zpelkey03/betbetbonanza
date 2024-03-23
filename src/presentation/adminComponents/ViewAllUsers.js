import { useEffect, useState } from "react";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import app from "../../config/database/firebaseConfig";
import SingleUser from "./SingleUser";

function ViewAllUsers() {
    const db = getFirestore(app);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const usersRef = collection(db, "users");
        const unsubscribe = onSnapshot(usersRef, (snapshot) => {
            const usersArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setUsers(usersArray);
        });

        return () => unsubscribe(); // Detach listener on unmount
    }, [db]);

    return (
        <div class="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
            <table class="w-full border-collapse bg-white text-left text-sm text-gray-500">
                <thead class="bg-gray-700">
                    <tr>
                        <th scope="col" class="px-6 py-4 font-bold text-gray-100">
                            Name
                        </th>
                        <th scope="col" class="px-6 py-4 font-bold text-gray-100">
                            Role
                        </th>
                        <th scope="col" class="px-6 py-4 font-bold text-gray-100">
                            Credit Amount
                        </th>
                        <th scope="col" class="px-6 py-4 font-bold text-gray-100"></th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-100 border-t border-gray-100">
                    {
                        //GPT code to sort so admin displays first
                        [...users]
                            .sort((a, b) => {
                                if (a.email === "admin@gmail.com") return -1;
                                if (b.email === "admin@gmail.com") return 1;
                                return 0; // Keep the original order for other users
                            })
                            .map((user, index) => (
                                <SingleUser key={user.id} user={user} shadeRow={index % 2 !== 0}/> // shade user background slightly grey if index is odd
                            ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default ViewAllUsers;
