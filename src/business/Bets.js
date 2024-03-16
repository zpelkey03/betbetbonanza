import { getFirestore, collection, addDoc, getDoc, query, where, getDocs, doc, updateDoc} from 'firebase/firestore';
import { getDatabase, ref, get, child } from 'firebase/database';
import firebaseApp from '../config/database/firebaseConfig';
import { writeBatch } from "firebase/firestore";
import { fetchedUser, setFetchedUser } from '../presentation/LogInComponent';

// Use the initialized Firebase app
const db = getFirestore(firebaseApp);
const database = getDatabase();
const dbRef = ref(database);
// Function to add a bet to the database
export const addBetToDatabase = async (sport, game, team, wagerAmount, returnAmount, userEmail, isCompleted) => {
    try {
        // Collection named bets
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
                .map(gameId => ({ id: gameId, ...gamesData[gameId] }));

            // Return filtered games
            console.log('Filtered Games fetched successfully:');
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

export const updateBetsInDatabase = async (userBets) => {
    try {
        const batch = writeBatch(db);

        // Update bets collection
        const betsCollection = collection(db, 'bets');
        userBets.forEach(bet => {
            const betRef = doc(betsCollection, bet.id);
            batch.update(betRef, {
                isCompleted: bet.isCompleted,
                homeScore: bet.homeScore,
                awayScore: bet.awayScore,
                winner: bet.winner
            });
        });

        // Commit the batch
        await batch.commit();
        
        console.log('User bets updated in the database successfully');
    } catch (error) {
        console.error('Error updating user bets in the database:', error);
        throw error;
    }
};


export const updateWinCredits = async (bet) => {
    try {
        // Collection containing user data
        const usersCollection = collection(db, 'users');

        // Query the users collection to find the user with the matching email
        const querySnapshot = await getDocs(query(usersCollection, where('email', '==', bet.userEmail)));
        
        if (!querySnapshot.empty) {
            querySnapshot.forEach(async (doc) => {
                const user = doc.data();
                // Check if the team field of the bet matches the winner field
                if (bet.team === bet.winner) {
                    // Update the user's credit by adding the return amount
                    const updatedCredit = (user.credits + parseFloat(bet.returnAmount)).toFixed(2);
                    const userRef = doc.ref;
                    await updateDoc(userRef, { credits: updatedCredit });
                    console.log('User credit updated successfully');

                    // After updating the user's credits, update fetchedUser
                    setFetchedUser({ ...fetchedUser, credits: updatedCredit });

                }
            });
        } else {
            console.error('User not found');
        }
    } catch (error) {
        console.error('Error updating user credit:', error);
        throw error;
    }
};