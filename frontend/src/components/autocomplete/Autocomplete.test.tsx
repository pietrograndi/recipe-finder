import { describe, expect, it  } from "vitest";
import { Autocomplete } from "./Autocomplete";
import { render, screen } from "@testing-library/react";

describe("Autocomplete", () => {
    it("should render correclty", () => {
        render(<Autocomplete />)
        expect(screen.getByRole("textbox")).toHaveAttribute("type", "text")
    })
})
