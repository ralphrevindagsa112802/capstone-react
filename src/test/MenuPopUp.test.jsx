import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom/vitest';
import { describe, it, expect, vi } from "vitest";
import MenuPopup from "../components/MenuPopUp";
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
  

describe("MenuPopup Component", () => {
  const mockFood = {
    food_name: "Iced Coffee",
    category: "Classic Coffee",
    description: "A refreshing iced coffee.",
    allergen: "Milk",
    image_path: "/images/iced-coffee.jpg",
    availability_small: "Available",
    availability_medium: "Available",
    availability_large: "Unavailable",
    price_small: 100,
    price_medium: 150,
    price_large: 200,
  };

  const mockOnClose = vi.fn();
  const mockOnAddToCart = vi.fn();

  it("renders the popup correctly when food data is provided", () => {
    render(<MenuPopup food={mockFood} onClose={mockOnClose} onAddToCart={mockOnAddToCart} />);

    expect(screen.getByText("Iced Coffee")).toBeInTheDocument();
    expect(screen.getByText("A refreshing iced coffee.")).toBeInTheDocument();
    expect(screen.getByText("₱100")).toBeInTheDocument();
    expect(screen.getByText("Contains: Milk")).toBeInTheDocument();
  });

  it("does not render the popup when food is null", () => {
    const { container } = render(<MenuPopup food={null} onClose={mockOnClose} onAddToCart={mockOnAddToCart} />);
    expect(container.firstChild).toBeNull();
  });

  it("closes the popup when the back button is clicked", () => {
    render(<MenuPopup food={mockFood} onClose={mockOnClose} onAddToCart={mockOnAddToCart} />);

    fireEvent.click(screen.getAllByTestId("back-button")[0]);

    expect(mockOnClose).toHaveBeenCalled();
  });

  it("displays the correct size options based on food availability", () => {
    render(<MenuPopup food={mockFood} onClose={mockOnClose} onAddToCart={mockOnAddToCart} />);

    const sizeDropdown = screen.getAllByTestId("combobox")[0];
    const options = screen.getAllByRole("option").map((option) => option.textContent);

    expect(options).toContain("Small");
    expect(options).toContain("Medium");
    expect(options).not.toContain("Large"); // Large is unavailable
  });

  it("allows the user to change the selected size", () => {
    render(<MenuPopup food={mockFood} onClose={mockOnClose} onAddToCart={mockOnAddToCart} />);

    const sizeDropdown = screen.getAllByTestId("combobox")[0];
    fireEvent.change(sizeDropdown, { target: { value: "Medium" } });

    expect(screen.getAllByTestId("price")[0]).toBeInTheDocument();
  });

  it("adds an item to the cart when 'Add to Cart' is clicked", () => {
    render(<MenuPopup food={mockFood} onClose={mockOnClose} onAddToCart={mockOnAddToCart} />);

    fireEvent.click(screen.getAllByTestId("add-to-cart")[0]);

    expect(mockOnAddToCart).toHaveBeenCalledWith({
      ...mockFood,
      size: "Small",
      food_price: 100,
      quantity: 1,
    });
  });

  it("shows a success popup when adding to cart", async () => {
    render(<MenuPopup food={mockFood} onClose={mockOnClose} onAddToCart={mockOnAddToCart} />);

    fireEvent.click(screen.getAllByTestId("add-to-cart")[0]);

    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledWith(
        "Success",
        "Iced Coffee (Small) added to your cart for ₱100!",
        "success",
        { timer: 3000 }
      );
    });
  });

  it("calls onClose after adding an item to the cart", () => {
    render(<MenuPopup food={mockFood} onClose={mockOnClose} onAddToCart={mockOnAddToCart} />);

    fireEvent.click(screen.getAllByTestId("add-to-cart")[0]);

    expect(mockOnClose).toHaveBeenCalled();
  });
});
