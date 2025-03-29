import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import SignIn from '../pages/SignIn';
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
  fire: vi.fn().mockResolvedValue({ isConfirmed: true })
}));
  
  

describe('SignIn Component', () => {
  const renderComponent = () => {
    return render(
      <MemoryRouter initialEntries={['/signIn']}>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/login" element={<div>Login Page</div>} />
        </Routes>
      </MemoryRouter>
    );
  };

  it('renders sign-up form with necessary fields', () => {
    renderComponent();

    expect(screen.getByTestId("firstname-input")).toBeInTheDocument();
    expect(screen.getByTestId("lastname-input")).toBeInTheDocument();
    expect(screen.getByTestId("address-input")).toBeInTheDocument();
    expect(screen.getByTestId("phone-number-input")).toBeInTheDocument();
    expect(screen.getByTestId("email-input")).toBeInTheDocument();
    expect(screen.getByTestId("username-input")).toBeInTheDocument();
    expect(screen.getByTestId("password-input")).toBeInTheDocument();
    expect(screen.getByTestId('signup-btn')).toBeInTheDocument();
  });

  it('allows user to type input values', async () => {
    const user = userEvent.setup();
    renderComponent();

    const emailInputs = screen.getAllByTestId("email-input");
    const emailInput = emailInputs[0]; // Pick the first instance

    await user.type(emailInput, 'test@example.com');
    expect(emailInput).toHaveValue('test@example.com');
  });

  it('toggles password visibility', async () => {
    const user = userEvent.setup();
    renderComponent();

    const passwordInputs = screen.getAllByTestId("password-input");
    const passwordInput = passwordInputs[0];
    const toggleButtons = screen.getAllByTestId("toggle-password");
    const toggleButton = toggleButtons[0];

    expect(passwordInput).toHaveAttribute('type', 'password');
    await user.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'text');
  });

  it('handles successful signup', async () => {
    
    global.fetch = vi.fn().mockResolvedValue({
      text: () => Promise.resolve(JSON.stringify({ 
        success: true, 
        message: "Signup successful" 
      }))
    });
    
    const user = userEvent.setup();

    renderComponent();

    const firstnameInput = screen.getAllByTestId("firstname-input")[0];

    const lastnameInput = screen.getAllByTestId("lastname-input")[0];

    const emailInput = screen.getAllByTestId("email-input")[0];

    const usernameInput = screen.getAllByTestId("username-input")[0];

    const addressInput = screen.getAllByTestId("address-input")[0];
    
    const phonenumberInput = screen.getAllByTestId("phone-number-input")[0]; 

    const passwordInput = screen.getAllByTestId("password-input")[0];

    const confirmpasswordInput = screen.getAllByTestId("confirm-password-input")[0];

    const signupBTN = screen.getAllByTestId("signup-btn")[0];

    await user.type(firstnameInput, 'test');
    await user.type(lastnameInput, 'example');
    await user.type(emailInput, 'test@example.com');
    await user.type(usernameInput, 'testexample');
    await user.type(addressInput, '220 A. Luna St., Brgy. Poblacion, Mandaluyong City');
    await user.type(phonenumberInput, '09123456789');
    await user.type(passwordInput, 'Password123');
    await user.type(confirmpasswordInput, 'Password123');

    await user.click(signupBTN);

    expect(signupBTN).toBeInTheDocument();
  });

  it("shows an error if required fields are empty", async () => {
    const user = userEvent.setup();

    renderComponent();

    const emailInput = screen.getAllByTestId("email-input")[0];

    const addressInput = screen.getAllByTestId("address-input")[0];
    
    const phonenumberInput = screen.getAllByTestId("phone-number-input")[0]; 

    const passwordInput = screen.getAllByTestId("password-input")[0];

    const confirmpasswordInput = screen.getAllByTestId("confirm-password-input")[0];

    const signupBTN = screen.getAllByTestId("signup-btn")[0];

    const form = screen.getAllByTestId("signup-form")[0];

    await user.type(emailInput, 'test@example.com');
    await user.type(addressInput, '220 A. Luna St., Brgy. Poblacion, Mandaluyong City');
    await user.type(phonenumberInput, '09936540896');
    await user.type(passwordInput, 'Password123');
    await user.type(confirmpasswordInput, 'Password123');
  
    await user.click(signupBTN);

    fireEvent.submit(form);

    // Expect error message to appear
    const errorMessage = screen.getAllByTestId('error')[0];
    expect(errorMessage).toBeInTheDocument();
  });

  it('navigates to login page', async () => {
    const user = userEvent.setup();
    renderComponent();

    const logins = screen.getAllByTestId("log-in");
    const login = logins[0];

    await user.click(login);
    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });
});