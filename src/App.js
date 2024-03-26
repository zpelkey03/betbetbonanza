import React from 'react';
import "tailwindcss/tailwind.css"; 
import LogInComponent from './presentation/LogInComponent';
import { BrowserRouter as Router, Route, Routes, useNavigate} from 'react-router-dom';
import UserDashboard from './presentation/UserDashboard';
import AdminDashboard from './presentation/adminComponents/AdminDashboard';
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useEffect } from 'react';



const App = () => {
  
  //When refresh is pressed, perform the firebase sign out function 
  const LogoutOnRefresh = () => {
    useEffect(() => {
      const handleBeforeUnload = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
         
        }).catch((error) => {

          // An error happened during sign-out.
          console.error("Error during sign-out on refresh:", error);
        });
  
        
      };
  
      //add this event so that it always listens 
      window.addEventListener('beforeunload', handleBeforeUnload);
  
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }, []);
  
    return null; // This component does not render anything
  };
  
  //This code will run all the time and monitors the users authentication status
  //If it detects that the user is null, then it will navigate back to / 
  const AuthenticationListener = () => {
    const navigate = useNavigate();
  
    useEffect(() => {
      const auth = getAuth();
      const unsubscribe = onAuthStateChanged(auth, user => {
        if (!user) {

          //redirect to login page
          navigate("/");
        }
      });
  
      
      return () => unsubscribe();
    }, [navigate]);
  

    return null;
  };


  return (
    <div>
      <Router>
        
        
        <LogoutOnRefresh />

        <AuthenticationListener />
        
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
