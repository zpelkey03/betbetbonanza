import { getFirestore, collection, addDoc, getDoc, query, where, getDocs, doc, updateDoc} from 'firebase/firestore';
import { getDatabase, ref, get, child } from 'firebase/database';
import firebaseApp from '../config/database/firebaseConfig';

// Use the initialized Firebase app
const db = getFirestore(firebaseApp);
const database = getDatabase();
const dbRef = ref(database);
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
            isCompleted: isCompleted,
            homescore: null,
            awayscore: null,
            winner:null
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

export const getGamesByIds = async (gameIds) => {
    try {
        // Initialize the Realtime Database service
        const database = getDatabase();

        // Reference to the root of the database
        const dbRef = ref(database);

        // Fetch all games once
        const snapshot = await get(child(dbRef, 'games'));

        // Check if any games exist
        if (snapshot.exists()) {
            const gamesData = snapshot.val();

            // Filter games based on gameIds
            const filteredGames = Object.keys(gamesData)
                .filter(gameId => gameIds.includes(gameId))
                .map(gameId => gamesData[gameId]);

            // Return filtered games
            return filteredGames;
        } else {
            console.log("No games available");
            return [];
        }
    } catch (error) {
        console.error('Error fetching games:', error);
        return [];
    }
};