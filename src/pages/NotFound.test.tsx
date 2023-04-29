import { render, screen } from "@testing-library/react";
import NotFound from "./NotFound";

test("renders NotFound component", () => {
 render(<NotFound />);
  const headingElement = screen.getByText(/NotFound/i);
  expect(headingElement).toBeInTheDocument();
});
