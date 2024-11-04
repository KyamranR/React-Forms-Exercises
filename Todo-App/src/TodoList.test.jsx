import { render, fireEvent } from "@testing-library/react";
import TodoList from "./TodoList";

test("without crashing", () => {
  render(<TodoList />);
});

test("matches snapshot", () => {
  const { asFragment } = render(<TodoList />);
  expect(asFragment()).toMatchSnapshot();
});

test("can add and remove todo", () => {
  const { getByText, getByPlaceholderText, queryByText } = render(<TodoList />);
  const input = getByPlaceholderText("New task");
  const button = getByText("Add Todo");

  fireEvent.change(input, { target: { value: "Test Todo" } });
  fireEvent.click(button);
  expect(getByText("Test Todo")).toBeInTheDocument();

  fireEvent.click(getByText("X"));
  expect(queryByText("Test Todo")).not.toBeInTheDocument();
});
