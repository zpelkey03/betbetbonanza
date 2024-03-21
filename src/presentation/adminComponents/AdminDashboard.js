import DashboardNavbar from "../DashboardNavbar";
import ViewAllUsers from "./ViewAllUsers";

function AdminDashboard() {

    return (
        <div>

            <DashboardNavbar></DashboardNavbar>

            <div className="ml-10 mr-10 mt-20">
                <ViewAllUsers></ViewAllUsers>
            </div>


        </div>
    )



}

export default AdminDashboard; 