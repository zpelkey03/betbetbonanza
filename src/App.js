import React from 'react';
import "tailwindcss/tailwind.css"; 
import LogInComponent from './presentation/LogInComponent';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import UserDashboard from './presentation/UserDashboard';
import AdminDashboard from './presentation/adminComponents/AdminDashboard';

const App = () => {
  

  // useEffect(() => {
  //   // Fetch data from Firebase when the component mounts
  //   fetchData();
  // }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <div>
      <Router>

        <Routes>
          <Route path="/" element={<LogInComponent />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          
        </Routes>

      </Router>
      
      
     
    </div>
  );
};

export default App;
