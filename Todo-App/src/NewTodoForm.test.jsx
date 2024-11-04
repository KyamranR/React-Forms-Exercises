import { render, fireEvent } from "@testing-library/react";
import NewTodoForm from "./NewTodoForm";
import { vi } from "vitest";

test("renders without crashing", () => {
  render(<NewTodoForm addTodo={() => {}} />);
});

test("matches snapshot", () => {
  const { asFragment } = render(<NewTodoForm addTodo={() => {}} />);
  expect(asFragment()).toMatchSnapshot();
});

test("can add a new todo", () => {
  const addTodo = vi.fn();
  const { getByText, getByPlaceholderText } = render(
    <NewTodoForm addTodo={addTodo} />
  );
  const input = getByPlaceholderText("New task");
  const button = getByText("Add Todo");

  fireEvent.change(input, { target: { value: "Test Todo" } });
  fireEvent.click(button);
  expect(addTodo).toHaveBeenCalledWith("Test Todo");
});
