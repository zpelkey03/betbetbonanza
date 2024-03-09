import React from "react";
import { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import DashboardNavbarButton from "./DashboardNavbarButton";

function DashboardNavbar() {
    const navigate = useNavigate();

    const signOutClicked = () => {
        const auth = getAuth();

        signOut(auth)
            .then(() => {
                // Sign-out successful.

                navigate("/");
            })
            .catch((error) => {
                // An error happened.
            });
    };


    return (
        <nav className="bg-gray-900 border-gray-200 dark:bg-gray-900 dark:border-gray-700">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="#" className="flex items-center space-x-2 rtl:space-x-reverse">
                    <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Betbetbonanza</span>
                </a>

                <div className="hidden w-full md:block md:w-auto" id="navbar-multi-level">
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">

                        <li>
                            <button onClick={signOutClicked} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> Sign out</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    );
}

export default DashboardNavbar;
