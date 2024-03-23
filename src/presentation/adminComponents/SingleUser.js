import { updateUserCredits } from "../../business/Bets";
import { useState } from "react";

const SingleUser = ({ user, shadeRow }) => {
    const [creditAdjustment, setCreditAdjustment] = useState(100);

    const handleAddCredits = async () => {
        // const newCredits = user.credits + creditAdjustment;
        await updateUserCredits(user.email, creditAdjustment);
    };

    const increment = () => {
        setCreditAdjustment((prev) => prev + 100);
        handleAddCredits();
    };
    const decrement = () => {
        setCreditAdjustment((prev) => prev - 100);
        handleAddCredits();
    };
    let roleToShow;
    let classToShow;

    if (user.email === "admin@gmail.com") {
        roleToShow = "Admin";
        classToShow = "inline-flex items-center gap-1 rounded-full bg-red-400 px-2 py-1 text-xs font-semibold text-white";
    } else {
        roleToShow = "User";
        classToShow = "inline-flex items-center gap-1 rounded-full bg-green-600 px-2 py-1 text-xs font-semibold text-white";
    }

    // //Add 100 credits to the user
    // const handleAddCredits = async () => {
    //     const newCredits = user.credits + 100;
    //     await updateUserCredits(user.email, newCredits);
    // };

    return (
        <tr class="hover:bg-gray-100">
            <th class="flex gap-3 px-6 py-4 font-normal text-gray-900">
                <div class="text-sm">
                    <div class="font-medium text-gray-700">
                        <p>
                            {user.firstName} {user.lastName}
                        </p>
                    </div>
                    <div class="text-gray-400">{user.email}</div>
                </div>
            </th>

            <td class="px-6 py-4">
                <div class="flex gap-2">
                    <span class={classToShow}>{roleToShow}</span>
                </div>
            </td>
            <td class="px-6 py-4">${user.credits}</td>
            <td class="px-6 py-4">
                <div class="flex justify-end gap-4">
                    <button
                        class="middle none center mr-4 rounded-lg bg-blue-500 py-1 px-3 font-sans text-xl font-bold text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        data-ripple-light="true"
                        onClick={handleAddCredits}
                    >
                        -
                    </button>
                    <input
                        type="number"
                        className="w-20 rounded-md border px-2 text-center"
                        value={creditAdjustment}
                        onChange={(e) => setCreditAdjustment(Math.max(0, parseInt(e.target.value, 10)))}
                    />
                    <button
                        class="middle none center mr-4 rounded-lg bg-blue-500 py-1 px-2.5 font-sans text-xl font-bold text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        data-ripple-light="true"
                        onClick={handleAddCredits}
                    >
                        +
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default SingleUser;
