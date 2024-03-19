import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

// mock firebase and associated functions in LoginComponent
jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  signInWithEmailAndPassword: jest.fn()
}));

// mock useNavigate since used directly in the component - will get many errors without
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),        // actual implementation from react-router-dom
  useNavigate: () => jest.fn(), 
}));

import LogInComponent from './LogInComponent';

describe('LogInComponent', () => {

    // helper function to render with routing
    const renderWithRouter = (ui, { route = '/' } = {}) => {
        window.history.pushState({}, 'Test Page', route);
        return render(ui, { wrapper: BrowserRouter });
    };

    // simple test to see LogInComponent render
    test('renders LogInComponent correctly', () => {
        renderWithRouter(<LogInComponent />);
        expect(screen.getByTestId('LoginComponent')).toBeInTheDocument();
    });

    // test to verify LoginComponent can switch to the sign-up view
    test('switches to sign up view when "No account? Sign Up" is clicked', async () => {
        renderWithRouter(<LogInComponent />);
        fireEvent.click(await screen.findByText(/No account\? Sign Up/i));      // click sign up
  
        expect(await screen.findByText(/Create Account/i)).toBeInTheDocument();     // text related to creating an account should be present, assert the view changed
    });

    // test to verify error message displayed on a failed login
    test('displays error message on failed login attempt', async () => {
        // mock signInWithEmailAndPassword to simulate login failure
        const { signInWithEmailAndPassword } = require("firebase/auth");
        signInWithEmailAndPassword.mockImplementationOnce(() => Promise.reject(new Error('Login failed')));
  
        renderWithRouter(<LogInComponent />);
  
        // simulate user input
        fireEvent.change(screen.getByPlaceholderText(/example@example.com/i), { target: { value: 'user@example.com' } });
        fireEvent.change(screen.getByPlaceholderText(/Your Password/i), { target: { value: 'incorrectpassword' } });
        
        // click the sign in button
        fireEvent.click(screen.getByRole('button', { name: /Sign In/i }));
    
        // checks for popup that error message happened on screen - text is what is displayed on invalid attempt
        await waitFor(() => {
            expect(screen.getByText(/Invalid email or password./i)).toBeInTheDocument();
        });
  });
  
});
