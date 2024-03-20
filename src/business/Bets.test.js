import { TextDecoder as ImportedTextDecoder, TextEncoder as ImportedTextEncoder, } from "util"; Object.assign(global, { TextDecoder: ImportedTextDecoder, TextEncoder: ImportedTextEncoder, });
import { addBetToDatabase, updateUserCredits, getAllBetsByUserEmail } from './Bets';
import { addDoc, getDocs, updateDoc } from 'firebase/firestore';


/*
 * Test suite for Bets.js
 * 1. updateUserCredits - verifies the update of user credits based on their email
 * 2. getAllBetsByUserEmail - verifies if all bets related to a user's email are fetched accurately
 * 3. addBetToDatabase - verifies that a bet is added to database correctly.
*/



// mock the Firestore to prevent actual database operations during testing methods in Bets.js
jest.mock('firebase/firestore');

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  signInWithEmailAndPassword: jest.fn()
}));

// test Suite for Bets.js
describe('Bets business logic', () => {

  // before each test - clear previous calls to get a clean environment
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // test case: Updating user credits successfully
  it('updates user credits successfully', async () => {
    // mock getDocs function to simulate fetching user documents - represents a non-empty query snapshot
    getDocs.mockResolvedValue({
      empty: false,
      docs: [{ id: 'userDocId', data: () => ({}) }]
    });

    // mock updateDoc function to simulate successful update operation
    updateDoc.mockResolvedValue();

    // test updateUserCredits function with mock data - should resolve with undefined (successful)
    // sidenote: undefined here is confirming that operation completed, and there was nothing more to report (no thrown errors)
    await expect(updateUserCredits('user@example.com', 500)).resolves.toBeUndefined();

    // verify that getDocs was called - showing a query was made
    expect(getDocs).toHaveBeenCalled();

    // verify that updateDoc was called - showing an update operation was done
    expect(updateDoc).toHaveBeenCalled();
  });


  // test case: Successfully fetching all bets associated with a user's email
  it('fetches all bets by user email successfully', async () => {

    // `getDocs` function is mocked to simulate the retrieval process - avoids actual db calls for testing
    getDocs.mockResolvedValue({
      // custom implementation of the `forEach` method - which firestor uses to iterate over documents
      forEach: (callback) => {

        // document snapshot contains a method `data` returning document's data -  mocked to represent bet on soccer (one of our supported sports)
        callback({ id: 'betDocId', data: () => ({ sport: 'soccer' }) });
      }
    });

    // call the `getAllBetsByUserEmail` function w/ mock email to retrieve bets
    const bets = await getAllBetsByUserEmail('user@example.com');         // expected to return all bets associated with the provided email

    // assert function returns an array containing single bet object
    expect(bets).toEqual([{ id: 'betDocId', sport: 'soccer' }]);

    // check `getDocs` called during the execution of `getAllBetsByUserEmail`
    expect(getDocs).toHaveBeenCalled();
  });

  //test case for placing a bet into the database.
  it('Adds the specified bet to the database', async () => {

    //Setting the input bet data for the test.
    const gameData = {
      away_team: "Charlotte Hornets",
      commence_time: "2024-03-11T23:10:00Z",
      draftkings_odds: { home_team_odds: 150, away_team_odds: -180 },
      home_team: "Detroit Pistons",
    }

    const betData = {
      sport: "basketball",
      game: gameData,
      team: "Detroit Pistons",
      wagerAmount: "5",
      returnAmount: "12.50",
      userEmail: "testing@gmail.com",
      isCompleted: false,
      homescore: null,
      awayscore: null,
      winner: null,
    };

    //calling the addBetToDatabase method to test it.
    await addBetToDatabase("basketball", gameData, "Detroit Pistons", "5", "12.50", "testing@gmail.com", false,);

    //Expect that a addDoc call was made with the correct data to add the bet to the database.
    //collection is expected to be undefined since we mocked the DB.
    expect(addDoc).toHaveBeenCalledWith(expect.toBeUndefined, betData);

    //Expect that addDoc was only called 1 time.
    expect(addDoc).toHaveBeenCalledTimes(1);

  })
});

