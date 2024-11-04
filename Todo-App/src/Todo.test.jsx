import { fireEvent, render } from "@testing-library/react";
import Todo from "./Todo";
import { vi } from "vitest";

test("renders without crashing", () => {
  render(<Todo id="1" task="Test Todo" removeTodo={() => {}} />);
});

test("matches snapshot", () => {
  const { asFragment } = render(
    <Todo id="1" task="Test Todo" removeTodo={() => {}} />
  );
  expect(asFragment()).toMatchSnapshot();
});

test("calls removeTodo on button click", () => {
  const removeTodo = vi.fn();
  const { getByText } = render(
    <Todo id="1" task="Test todo" removeTodo={removeTodo} />
  );

  fireEvent.click(getByText("X"));
  expect(removeTodo).toHaveBeenCalledWith("1");
});

test("displays edit form and updates task", () => {
  const updateTodo = vi.fn();
  const { getByText, getByDisplayValue, queryByDisplayValue } = render(
    <Todo
      id="1"
      task="Test Todo"
      removeTodo={() => {}}
      updateTodo={updateTodo}
    />
  );

  fireEvent.click(getByText("Edit"));
  expect(getByDisplayValue("Test Todo")).toBeInTheDocument();

  const input = getByDisplayValue("Test Todo");
  fireEvent.change(input, { target: { value: "Updated Todo" } });
  fireEvent.click(getByText("Save"));

  expect(updateTodo).toHaveBeenCalledWith("1", "Updated Todo");

  expect(queryByDisplayValue("Updated Todo")).not.toBeInTheDocument();
});
