import { getFirestore, collection, addDoc, query, where, getDocs, doc, updateDoc} from 'firebase/firestore';
import firebaseApp from '../config/database/firebaseConfig';

// Use the initialized Firebase app
const db = getFirestore(firebaseApp);


// Function to add a bet to the database
export const addBetToDatabase = async (sport, game, team, wagerAmount, returnAmount, userEmail, isCompleted) => {
    try {
        // Replace 'bets' with the name of your collection
        const betsCollection = collection(db, 'bets');

        // Add a new document with the provided data
        await addDoc(betsCollection, {
            sport: sport, 
            game: game,
            team: team,
            wagerAmount: wagerAmount,
            returnAmount: returnAmount,
            userEmail: userEmail,
            isCompleted: isCompleted
        });

        console.log('Bet added successfully');
    } catch (error) {
        console.error('Error adding bet to database:', error);
        throw error;
    }
};

// Function to update user credits based on email
export const updateUserCredits = async (email, creditsToUpdate) => {
    try {
        // Find the user document based on the email
        const usersCollection = collection(db, 'users');
        const userQuery = query(usersCollection, where('email', '==', email));
        const userSnapshot = await getDocs(userQuery);

        // Update the credits of the first user found with the specified email
        if (!userSnapshot.empty) {
            const userDoc = userSnapshot.docs[0];
            const userRef = doc(db, 'users', userDoc.id);

            // Update the user's credits
            await updateDoc(userRef, {
                credits: creditsToUpdate
            });

            console.log('User credits updated successfully');
        } else {
            console.log('No user found with email:', email);
        }
    } catch (error) {
        console.error('Error updating user credits:', error);
        throw error;
    }
};

export const getAllBetsByUserEmail = async (email) => {
    try {
        const betsCollection = collection(db, 'bets');
        const betsQuery = query(betsCollection, where("userEmail", "==", email));
        const snapshot = await getDocs(betsQuery);
        const bets = [];
        snapshot.forEach(doc => {
            bets.push({ id: doc.id, ...doc.data() });
        });
        console.log('Bets fetched successfully');
        console.log(bets);
        return bets;
    } catch (error) {
        console.error('Error fetching bets from database:', error);
        throw error;
    }
};

