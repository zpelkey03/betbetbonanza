import { render, screen } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

jest.mock('firebase/auth', () => ({
  __esModule: true,
  getAuth: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
}));

test('renders login page', () => {
  render(<App />);
  const loginComponent = screen.getByTestId('LoginComponent');
  // const userDashboard = screen.getByTestId('UserDashboard');
  expect(loginComponent).toBeInTheDocument();
  // expect(userDashboard).toBeInTheDocument();
});
