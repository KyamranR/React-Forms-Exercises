import { render, fireEvent } from "@testing-library/react";
import NewBoxForm from "./NewBoxForm";
import { vi } from "vitest";

test("renders without crashing", () => {
  render(<NewBoxForm addBox={() => {}} />);
});

test("matches snapshot", () => {
  const { asFragment } = render(<NewBoxForm addBox={() => {}} />);
  expect(asFragment()).toMatchSnapshot();
});

test("can add new box and clears form on submit", () => {
  const addBox = vi.fn();
  const { getByLabelText, getByText } = render(<NewBoxForm addBox={addBox} />);

  fireEvent.change(getByLabelText("Width:"), { target: { value: "100" } });
  fireEvent.change(getByLabelText("Height:"), { target: { value: "100" } });
  fireEvent.change(getByLabelText("Background Color:"), {
    target: { value: "#000000" },
  });

  fireEvent.click(getByText("Add Box"));

  expect(addBox).toHaveBeenCalledWith({
    width: "100",
    height: "100",
    backgroundColor: "#000000",
    id: expect.any(String),
  });
  expect(getByLabelText("Width:").value).toBe("");
  expect(getByLabelText("Height:").value).toBe("");
  expect(getByLabelText("Background Color:").value).toBe("#000000");
});
