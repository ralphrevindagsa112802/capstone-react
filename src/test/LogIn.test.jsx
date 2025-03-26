import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Login from '../pages/LogIn';
import Swal from 'sweetalert2';

// Mock dependencies
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn()
  };
});

vi.mock('sweetalert2', () => ({
  default: {
    fire: vi.fn().mockResolvedValue({ isConfirmed: true })
  }
}));

describe('Login Component', () => {
  // Utility function to render component with required context
  const renderComponent = () => {
    return render(
      <MemoryRouter initialEntries={['/login']}>
        <GoogleOAuthProvider clientId="test-client-id">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/user/home" element={<div>Home Page</div>} />
            <Route path="/signIn" element={<div>Sign In Page</div>} />
          </Routes>
        </GoogleOAuthProvider>
      </MemoryRouter>
    );
  };

  // Test Case 1: Component Renders Correctly
  it('renders login form with all necessary elements', () => {
    renderComponent();

    expect(screen.getByTestId("username-input")).toBeInTheDocument();
    expect(screen.getByTestId("password-input")).toBeInTheDocument();
    expect(screen.getByText('Log In')).toBeInTheDocument();
    expect(screen.getByText('Login with Google')).toBeInTheDocument();
  });

  // Test Case 2: Input Interaction
  it('allows user to type username and password', async () => {
    const user = userEvent.setup();
    renderComponent();

    const usernameInput = screen.getAllByTestId("username-input")[0];
    const passwordInput = screen.getAllByTestId("password-input")[0];    

    await user.type(usernameInput, 'testuser');
    await user.type(passwordInput, 'password123');

    // Use getAttribute or check displayed value
    expect(usernameInput).toHaveValue('testuser');
    expect(passwordInput).toHaveValue('password123');
  });

  // Test Case 3: Password Visibility Toggle
  it('toggles password visibility', async () => {
    const user = userEvent.setup();
    renderComponent();

    const passwordInput = screen.getAllByTestId("password-input")[0];
    const toggleButton = screen.getAllByTestId("toggle password visibility")[0];

    // Initially password should be hidden
    expect(passwordInput).toHaveAttribute('type', 'password');

    // Toggle visibility
    await user.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'text');
  });

  // Test Case 4: Successful Login
  it('handles successful login', async () => {
    const user = userEvent.setup();
    
    // Mock fetch for login
    global.fetch = vi.fn().mockResolvedValue({
      text: () => Promise.resolve(JSON.stringify({
        success: true,
        user: {
          id: '123',
          username: 'testuser',
          f_name: 'Test',
          l_name: 'User'
        }
      }))
    });

    renderComponent();

    const usernameInput = screen.getAllByTestId("username-input")[0];
    const passwordInput = screen.getAllByTestId("password-input")[0];
    const loginButton = screen.getAllByTestId("log-in")[0];

    await user.type(usernameInput, 'testuser');
    await user.type(passwordInput, 'password123');
    await user.click(loginButton);

    // Wait for and check Swal fire method
    await vi.waitUntil(() => Swal.fire.mock.calls.length > 0);
    expect(Swal.fire).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Success!',
        text: 'Welcome back, Test User!'
      })
    );
  });

  // Test Case 5: Failed Login
  it('handles login failure', async () => {
    const user = userEvent.setup();
    
    global.fetch = vi.fn().mockResolvedValue({
      text: () => Promise.resolve(JSON.stringify({
        success: false,
        error: 'Invalid credentials'
      }))
    });

    renderComponent();

    const usernameInput = screen.getAllByTestId("username-input")[0];
    const passwordInput = screen.getAllByTestId("password-input")[0];
    const loginButton = screen.getAllByTestId("log-in")[0];

    await user.type(usernameInput, 'wronguser');
    await user.type(passwordInput, 'wrongpassword');
    await user.click(loginButton);

    // Check for error message
    const errorMessage = await screen.findByText('Invalid credentials');
    expect(errorMessage).toBeInTheDocument();
  });

  // Test Case 6: Navigation Links
  it('navigates to sign up page', async () => {
    const user = userEvent.setup();
    renderComponent();

    const signUpLink = screen.getAllByTestId("sign-up")[0];
    await user.click(signUpLink);

    // Check that we've navigated to sign in page
    expect(screen.getByText('Sign In Page')).toBeInTheDocument();
  });
});