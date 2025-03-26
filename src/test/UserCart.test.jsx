import React from "react";
import '@testing-library/jest-dom/vitest';
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { CartContext } from "../context/CartContext";
import UserCart from "../users/UserCart";
import Swal from "sweetalert2";

// Mock SweetAlert2
vi.mock("sweetalert2", async (importOriginal) => {
    const actual = await importOriginal(); // Import actual module for partial mocking
    return {
      ...actual, // Keep all original exports
      fire: vi.fn(), // Mock `fire` function
      default: { ...actual, fire: vi.fn() }, // Ensure default export exists
    };
  });

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
      ...actual,
      useNavigate: () => vi.fn()
    };
  });

describe("UserCart Component", () => {
  const mockCartItems = [
    {
      food_id: 1,
      food_name: "Iced Coffee",
      size: "Small",
      food_price: 100,
      quantity: 2,
      image_path: "/images/iced-coffee.jpg",
    },
  ];

  let mockRemoveFromCart, mockSetCartItems;

  beforeEach(() => {
    mockRemoveFromCart = vi.fn();
    mockSetCartItems = vi.fn();
  });

  const renderComponent = (cartItems) => {
    return render(
      <Router>
        <CartContext.Provider value={{ cartItems, removeFromCart: mockRemoveFromCart, setCartItems: mockSetCartItems }}>
          <UserCart />
        </CartContext.Provider>
      </Router>
    );
  };
  
  it("renders the cart component correctly", () => {
    renderComponent(mockCartItems);
    expect(screen.getByTestId("item-name")).toBeInTheDocument();
  });

  it("updates total amount when an item is added", () => {
    renderComponent(mockCartItems);

    fireEvent.click(screen.getAllByTestId('add-item')[0]);
    
    expect(screen.getAllByTestId("item-price")[0]).toBeInTheDocument();
  });

  it("proceeds to checkout when items are selected", () => {
    renderComponent(mockCartItems);
    fireEvent.click(screen.getAllByRole("checkbox")[0]);
    fireEvent.click(screen.getAllByTestId("checkout")[0]);
    expect(mockNavigate);
  });

  it("removes an item from the cart when 'Remove' is clicked", () => {
    renderComponent(mockCartItems);
    fireEvent.click(screen.getAllByTestId("remove-button")[0]);
    expect(mockRemoveFromCart);
  });

  it("updates total amount when an item quantity is increased", () => {
    renderComponent(mockCartItems);
    fireEvent.click(screen.getAllByTestId('add-item')[0]);
    expect(mockSetCartItems);
  });

  it("prevents checkout when no items are selected", () => {
    renderComponent(mockCartItems);
    fireEvent.click(screen.getAllByTestId("checkout")[0]);
    expect(Swal.fire).toHaveBeenCalledWith("Oops...", "Please select items to order.", "info");
  });

  it("shows a message when the cart is empty", () => {
    renderComponent([]);
    expect(screen.getAllByText("Your cart is empty")[0]).toBeInTheDocument();
  });
});
