import { fireEvent, render, screen } from "@testing-library/react";
import { Chips } from "./Chips";
import { describe, expect, it, vi } from "vitest";

describe("Chips", () => {
  it("should render correctly", () => {
    render(<Chips label="Ingredient 1" onDelete={() => {}} />);
    const deleteButton = screen.getByRole("button");
    expect(screen.getByText("Ingredient 1")).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
  }); 

  it("should call onDelete when the delete button is clicked", () => {
    const onDelete = vi.fn();
    render(<Chips label="Ingredient 1" onDelete={onDelete} />);
    const deleteButton = screen.getByRole("button");
    fireEvent.click(deleteButton);
    expect(onDelete).toHaveBeenCalled();
  });

});