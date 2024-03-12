import { addUserToDatabase } from './Signup';
import { addDoc, getDocs } from 'firebase/firestore';

/*
 * Test suite for Signup.js
 * 1. addUserToDatabase - verifying that fetching of user emails from database works.
*/

// mock the Firestore to prevent actual database operations during testing methods in SignUp.js
jest.mock('firebase/firestore');

// test Suite for Login.js
describe('Signup business logic', () => {

    // before each test - clear previous calls to get a clean environment
    beforeEach(() => {
        jest.clearAllMocks();
    });

    // test case: fetch user by email
    it('add user to the database', async () => {

        //input data for test.
        const userData = {
            email: "newUser@gmail.com",
            firstName: "firstName",
            lastName: "lastName",
            credits: 100
        };

        const newUserID = {id: '123456789'}

        addDoc.mockResolvedValueOnce(newUserID)

        //Calling the method under test
        const user = await addUserToDatabase("newUser@gmail.com", "firstName", "lastName",);

        expect(addDoc).toHaveBeenCalledWith(expect.toBeUndefined, userData);

        // Verifying that the right user is returned
        expect(user).toEqual(newUserID.id);
    });


});

