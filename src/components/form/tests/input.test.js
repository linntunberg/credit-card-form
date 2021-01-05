import { render } from "@testing-library/react";
import { Form } from "../index";

test("check required input fields", () => {
  render(<Form />);

  var cardNumberInput = document.getElementById("cardnumber");
  var cardNameInput = document.getElementById("cardname");
  var cvvInput = document.getElementById("cvv");

  expect(cardNumberInput).toBeRequired();
  expect(cardNameInput).toBeRequired();
  expect(cvvInput).toBeRequired();
});
