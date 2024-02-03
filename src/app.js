import React, { useEffect, useState } from 'react';
import { fetchDataFromFirebase } from './data/database';

const App = () => {
  const [dataFromFirebase, setDataFromFirebase] = useState([]);

  const fetchData = async () => {
    try {
      const data = await fetchDataFromFirebase();
      setDataFromFirebase(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    // Fetch data from Firebase when the component mounts
    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const handleButtonClick = () => {
    // Fetch data from Firebase when the button is clicked
    fetchData();
  };

  return (
    <div>
      <h1>Your App</h1>
      <button onClick={handleButtonClick}>Fetch Data</button>
      <ul>
        {dataFromFirebase.map((item, index) => (
          <li key={index}>{JSON.stringify(item)}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;