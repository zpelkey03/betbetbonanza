import { updateUserCredits } from "../../business/Bets";
import { useState } from "react";

const SingleUser = ({ user, shadeRow }) => {
    const [creditAdjustment, setCreditAdjustment] = useState(100);

    const handleCreditChange = async (adjustment) => {
        const adjustmentAmount = adjustment > 0 ? adjustment : -Math.min(user.credits, Math.abs(adjustment)); // dont let credits go below 0
        const newCreditAmount = user.credits + adjustmentAmount;
        await updateUserCredits(user.email, newCreditAmount);
    };

    const incrementCredits = () => {
        handleCreditChange(creditAdjustment);
    };
    const decrementCredits = () => {
        handleCreditChange(-creditAdjustment);
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
        <tr className={`hover:bg-gray-100 ${shadeRow ? "bg-gray-50" : ""}`}>
            <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                <div className="text-sm">
                    <div className="font-medium text-gray-700">
                        <p>
                            {user.firstName} {user.lastName}
                        </p>
                    </div>
                    <div className="text-gray-400">{user.email}</div>
                </div>
            </th>

            <td className="px-6 py-4">
                <div className="flex gap-2">
                    <span className={classToShow}>{roleToShow}</span>
                </div>
            </td>
            <td className="px-6 py-4">{user.email !== "admin@gmail.com" && <p>${user.credits}</p>}</td>
            <td className="px-6 py-4">
                {user.email !== "admin@gmail.com" && (
                    <div className="flex justify-end gap-4">
                        <button
                            className="rounded-lg bg-blue-500 py-1 px-3 text-xl font-bold text-white shadow-md hover:shadow-lg focus:opacity-[0.85] active:opacity-[0.85] transition-all"
                            onClick={decrementCredits}
                        >
                            -
                        </button>
                        <input
                            type="number"
                            className="w-20 rounded-md border px-2 text-center"
                            value={creditAdjustment}
                            onChange={(e) => setCreditAdjustment(Math.max(1, parseInt(e.target.value, 10) || 0))}
                        />
                        <button
                            className="rounded-lg bg-blue-500 py-1 px-2.5 text-xl font-bold text-white shadow-md hover:shadow-lg focus:opacity-[0.85] active:opacity-[0.85] transition-all"
                            onClick={incrementCredits}
                        >
                            +
                        </button>
                    </div>
                )}
            </td>
        </tr>
    );
};

export default SingleUser;
