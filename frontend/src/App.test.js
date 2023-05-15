import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from './components/User/Login';
import { BrowserRouter } from 'react-router-dom';
import SignUp from './components/User/Signup';
import Reviews from './components/Reviews/Reviews';
import UpdateUsername from './components/User/UpdateUsername';
import UpdatePassword from './components/User/UpdatePassword';
import DeleteUser from './components/User/DeleteUser';
import CreateReview from './components/Reviews/CreateReview';

describe("Did pages render correctly test", () => {

  test('Login page rendered correctly', () => {
    render(<BrowserRouter> <Login /> </BrowserRouter>);
    const element = screen.getByText("Don't have an account? Sign Up");
    expect(element).toBeInTheDocument();
  });
  
  test('Login page rendered correctly', () => {
    render(<BrowserRouter> <SignUp /> </BrowserRouter>);
    const element = screen.getByText("Already have an account? Sign in");
    expect(element).toBeInTheDocument();
  });

  test('Login page rendered correctly', () => {
    sessionStorage.setItem("username", "Test")
    render(<BrowserRouter> <Reviews /> </BrowserRouter>);
    const element = screen.getByText("Write a Review");
    expect(element).toBeInTheDocument();
  });

  test('Login page rendered correctly', () => {
    sessionStorage.setItem("username", "Test")
    render(<BrowserRouter> <UpdateUsername /> </BrowserRouter>);
    const element = screen.getByText("Update");
    expect(element).toBeInTheDocument();
  });

  test('Login page rendered correctly', () => {
    sessionStorage.setItem("username", "Test")
    render(<BrowserRouter> <UpdatePassword /> </BrowserRouter>);
    const element = screen.getByText("Update");
    expect(element).toBeInTheDocument();
  });

  test('Login page rendered correctly', () => {
    sessionStorage.setItem("username", "Test")
    render(<BrowserRouter> <DeleteUser /> </BrowserRouter>);
    const element = screen.getByText("Delete");
    expect(element).toBeInTheDocument();
  });

  test('Login page rendered correctly', () => {
    sessionStorage.setItem("username", "Test")
    render(<BrowserRouter> <CreateReview /> </BrowserRouter>);
    const element = screen.getByText("Submit Review");
    expect(element).toBeInTheDocument();
  });

});
