import { render } from "@testing-library/react";
import { Form } from "../index";

test("form render", () => {
  render(<Form />);

  var form = document.getElementById("form");

  expect(form).toBeTruthy();
});
