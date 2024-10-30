import { render } from "@testing-library/react";
import App from "./App";
import "@testing-library/jest-dom";

test("renders without crashing", () => {
  render(<App />);
});

test("matches snapshot", () => {
  const { asFragment } = render(<App />);
  expect(asFragment()).toMatchSnapshot();
});
