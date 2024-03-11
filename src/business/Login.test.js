import { fetchUserByEmail } from '../../src/business/Login';
import { getDocs } from 'firebase/firestore';

/*
 * Test suite for Login.js
 * 1. fetchUserByEmail - verifying that fetching of user emails from database works.
*/

// mock the Firestore to prevent actual database operations during testing methods in Login.js
jest.mock('firebase/firestore');

// test Suite for Login.js
describe('Login business logic', () => {

    // before each test - clear previous calls to get a clean environment
    beforeEach(() => {
        jest.clearAllMocks();
    });

    // test case: fetch user by email
    it('fetches user by their email', async () => {
        //Mocking the database to return a specific user when getDocs is called.
        const userData = { id: 'dgIWMFQXtCGs0O64vWT6', firstName: 'Mahmood', lastName: "Alnasleh", email: 'testing@gmail.com' };
        const querySnapshot = { empty: false, docs: [{ data: () => userData }] };
        getDocs.mockResolvedValueOnce(querySnapshot);

        //Calling the method under test
        const userEmail = 'tesing@gmail.com';
        const user = await fetchUserByEmail(userEmail);

        // Verifying that the right user is returned
        expect(user).toEqual(userData);
    });

    it('should return null if no user found with the provided email', async () => {
        // Mocking database response to query to be empty.
        const querySnapshot = { empty: true };
        getDocs.mockResolvedValueOnce(querySnapshot);

        // Calling the method under test with a nonexisting email.
        const userEmail = 'something@gmail.com';
        const user = await fetchUserByEmail(userEmail);

        // Verifying that null is returned since no user exists with that email.
        expect(user).toBeNull();
    });



});

