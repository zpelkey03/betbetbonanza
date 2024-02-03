// database.js

import { getFirestore, collection, getDocs } from 'firebase/firestore';
import firebaseApp from '../config/database/firebaseConfig';

// Use the initialized Firebase app
const db = getFirestore(firebaseApp);

export const fetchDataFromFirebase = async () => {
  try {
    // Replace 'test' with the name of your collection
    const querySnapshot = await getDocs(collection(db, 'test'));
    // Get the data from the query snapshot
    const dataFromFirebase = querySnapshot.docs.map(doc => doc.data());
  
    // Return the data
    return dataFromFirebase;
  } catch (error) {
    console.error('Error fetching data from Firebase:', error);
    throw error;
  }
};