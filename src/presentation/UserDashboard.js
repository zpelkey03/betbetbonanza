import { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import DashboardNavbar from "./DashboardNavbar";

function UserDashboard() {
    return (
        <div>
            <DashboardNavbar />
        </div>
    );
}

export default UserDashboard;
