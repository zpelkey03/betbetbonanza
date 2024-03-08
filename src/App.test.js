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

test('renders learn react link', () => {
  render(<App />);
  const loginComponent = screen.getByTestId('LoginComponent');
  // const userDashboard = screen.getByTestId('UserDashboard');
  expect(loginComponent).toBeInTheDocument();
  // expect(userDashboard).toBeInTheDocument();
});

test('renders learn react link', () => {

  window.history.pushState({}, 'Dashboard Page', '/dashboard');
  render(<App />);
  const loginComponent = screen.getByTestId('UserDashboard');
  // const userDashboard = screen.getByTestId('UserDashboard');
  expect(loginComponent).toBeInTheDocument();
  // expect(userDashboard).toBeInTheDocument();
});
