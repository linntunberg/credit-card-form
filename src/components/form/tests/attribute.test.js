import { render } from "@testing-library/react";
import { Form } from "../index";

test("check alt attribute on images", () => {
  render(<Form />);

  var mastercardLogoFront = document.getElementById("mastercard-logo-front");
  var cardChip = document.getElementById("card-chip");
  var mastercardLogoBack = document.getElementById("mastercard-logo-back");

  expect(mastercardLogoFront).toHaveAttribute("alt");
  expect(cardChip).toHaveAttribute("alt");
  expect(mastercardLogoBack).toHaveAttribute("alt");
});
