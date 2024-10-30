import { render, fireEvent } from "@testing-library/react";
import BoxList from "./BoxList";

test("renders without crashing", () => {
  render(<BoxList />);
});

test("matches snapshot", () => {
  const { asFragment } = render(<BoxList />);
  expect(asFragment()).toMatchSnapshot();
});

test("can add a new box", () => {
  const { getByLabelText, getByText, queryByText } = render(<BoxList />);

  const widthInput = getByLabelText("Width:");
  const heightInput = getByLabelText("Height:");
  const colorInput = getByLabelText("Background Color:");
  const addButton = getByText("Add Box");

  fireEvent.change(widthInput, { target: { value: "100" } });
  fireEvent.change(heightInput, { target: { value: "100" } });
  fireEvent.change(colorInput, { target: { value: "#0000FF" } });
  fireEvent.click(addButton);

  expect(queryByText("X")).toBeInTheDocument();
});

test("can remove a box", () => {
  const { getByLabelText, getByText, queryByText } = render(<BoxList />);

  const widthInput = getByLabelText("Width:");
  const heightInput = getByLabelText("Height:");
  const colorInput = getByLabelText("Background Color:");
  const addButton = getByText("Add Box");

  fireEvent.change(widthInput, { target: { value: "100" } });
  fireEvent.change(heightInput, { target: { value: "100" } });
  fireEvent.change(colorInput, { target: { value: "#0000FF" } });
  fireEvent.click(addButton);

  const removeButton = getByText("X");
  expect(removeButton).toBeInTheDocument();

  fireEvent.click(removeButton);
  expect(queryByText("X")).not.toBeInTheDocument();
});
