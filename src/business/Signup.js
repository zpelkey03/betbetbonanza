//Handles the user sign up process
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import firebaseApp from '../config/database/firebaseConfig';


// Use the initialized Firebase app
const db = getFirestore(firebaseApp);

// Function to add user data to the database
export const addUserToDatabase = async ({email, firstName, lastName}) => {
    try {
      // Replace 'users' with the name of your collection
      const usersCollection = collection(db, 'users');
  
      // Add a new document with the provided data
      const newUserRef = await addDoc(usersCollection, {
        email: email,
        firstName: firstName,
        lastName: lastName,
        credits: 100
      });
  
      console.log('User added with ID: ', newUserRef.id);
      return newUserRef.id; // Return the ID of the newly added user document
    } catch (error) {
      console.error('Error adding user to database:', error);
      throw error;
    }
  };