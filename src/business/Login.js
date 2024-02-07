//Handles the login process
//login.js

import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import firebaseApp from '../config/database/firebaseConfig';

// Use the initialized Firebase app
const db = getFirestore(firebaseApp);

// Function to fetch user by email
export const fetchUserByEmail = async (email) => {
  try {
    // Replace 'users' with the name of your collection
    const usersCollection = collection(db, 'users');

    // Create a query to find the user with the provided email
    const q = query(usersCollection, where('email', '==', email));
    
    // Execute the query
    const querySnapshot = await getDocs(q);

    // Log the query snapshot
    console.log('Query Snapshot:', querySnapshot);
    
    // Check if a user with the provided email exists
    if (querySnapshot.empty) {
      console.log('No user found with email:', email);
      return null;
    }

    // Get the first user document from the query snapshot
    const user = querySnapshot.docs[0].data();
    console.log('User found:', user);
    return user;
  } catch (error) {
    console.error('Error fetching user by email:', error);
    throw error;
  }
};