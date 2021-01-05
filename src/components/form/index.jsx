import React, { useState, useEffect } from "react";
import "./style.scss";
import mastercardLogo from "../../assets/mastercard.png";
import cardChip from "../../assets/cardchip.png";

export const Form = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cvv, setCvv] = useState("");
  const [expirationDate, setExpirationDate] = useState({ month: "", year: "" });

  useEffect(() => {
    // Populate month and year dropdown
    var months = document.getElementById("months");
    for (var month = 1; month <= 12; month++) {
      var monthOption = document.createElement("OPTION");
      monthOption.innerHTML = month;
      monthOption.value = month;
      months.appendChild(monthOption);
      if (month <= 9) {
        monthOption.innerHTML = "0" + month;
        monthOption.value = "0" + month;
      }
    }

    var years = document.getElementById("years");
    for (var year = 2019; year <= 2050; year++) {
      var yearOption = document.createElement("OPTION");
      yearOption.innerHTML = year;
      yearOption.value = year.toString().slice(-2);
      years.appendChild(yearOption);
    }
  }, []);

  const handleCardNumberChange = (event) => {
    setCardNumber(event.target.value);
  };

  // Submit form and also validate that every field is either filled in or filled in correctly
  const handleSubmit = (event) => {
    if (isNaN(cardNumber)) {
      event.preventDefault();
      alert("Card Number must be a number");
    }

    if (cardNumber.length !== 16) {
      alert("Card Number must consist of 16 numbers");
    }

    var cardNameValueMatch = cardName.match(/[a-z]/i);
    if (!cardNameValueMatch) {
      event.preventDefault();
      alert("Card Name must consist of only alphabetic letters");
    }

    if (expirationDate.month === "" || expirationDate.year === "") {
      event.preventDefault();
      alert("Month and year fields must be selected");
    }

    if (isNaN(cvv)) {
      event.preventDefault();
      alert("CVV must be a number");
    }

    if (cvv.length < 3) {
      alert("Cvv must be 3 numbers");
    }
  };

  // Flip animations for bank card
  const flip = () => {
    var flipDivInner = document.getElementById("container-inner");

    if (flipDivInner.classList.contains("form__credit-card--flip")) {
      flipDivInner.classList.remove("form__credit-card--flip");
    }
  };

  const cvvFlip = () => {
    var flipDivInner = document.getElementById("container-inner");
    flipDivInner.classList.add("form__credit-card--flip");
  };

  return (
    <form className="form" id="form" onSubmit={handleSubmit}>
      <div className="form__credit-card--container">
        <div
          className="form__credit-card--container-inner"
          id="container-inner"
        >
          <div className="form__credit-card form__credit-card--front">
            <img
              src={mastercardLogo}
              alt="Mastercard logo"
              id="mastercard-logo-front"
              data-testid="mastercard-logo-front"
            />
            <img
              src={cardChip}
              alt="Credit card chip"
              id="card-chip"
              data-testid="card-chip"
            />
            <div className="form__credit-card--card-number">
              <div className="form__credit-card--input-container">
                <input
                  id="credit-card-number"
                  type="number"
                  defaultValue={cardNumber}
                  disabled
                />
              </div>
            </div>
            <div className="form__credit-card--name-date">
              <div className="form__credit-card--input-container">
                <label id="card-holder">
                  Card Holder
                  <input type="text" defaultValue={cardName} disabled />
                </label>
                <label>
                  Expires
                  <span className="form__credit-card--expires">
                    <input
                      id="month"
                      type="number"
                      defaultValue={expirationDate.month}
                      disabled
                    />
                    <span>/</span>
                    <input
                      id="year"
                      type="number"
                      defaultValue={expirationDate.year}
                      disabled
                    />
                  </span>
                </label>
              </div>
            </div>
          </div>
          <div className="form__credit-card form__credit-card--back">
            <div className="form__credit-card--black-scan-line"></div>
            <div className="form__credit-card--white-cvv-line">
              <label>CVV</label>
              <input type="text" defaultValue={cvv} disabled />
            </div>
            <img
              src={mastercardLogo}
              alt="Mastercard logo"
              id="mastercard-logo-back"
              data-testid="mastercard-logo-back"
            />
          </div>
        </div>
      </div>
      <div className="form__input">
        <label>
          <span>Card Number</span>
          <input
            type="number"
            value={cardNumber}
            name="cardNumber"
            id="cardnumber"
            onChange={handleCardNumberChange}
            onInput={(e) => {
              e.target.value = Math.max(0, parseInt(e.target.value))
                .toString()
                .slice(0, 16);
            }}
            onClick={() => flip()}
            required
          />
        </label>
        <label>
          <span>Card Name</span>
          <input
            type="text"
            value={cardName}
            name="cardName"
            id="cardname"
            onChange={(event) => setCardName(event.target.value)}
            onClick={() => flip()}
            required
          />
        </label>
        <div className="form__input--expiration-cvv">
          <div className="form__input--expiration">
            <label htmlFor="months">Expiration Date</label>
            <select
              id="months"
              onClick={() => flip()}
              name="month"
              onChange={(event) =>
                setExpirationDate({
                  ...expirationDate,
                  month: event.target.value,
                })
              }
              defaultValue={"default"}
            >
              <option value="default" disabled>
                Month
              </option>
            </select>
            <select
              id="years"
              onClick={() => flip()}
              name="year"
              onChange={(event) =>
                setExpirationDate({
                  ...expirationDate,
                  year: event.target.value,
                })
              }
              defaultValue={"default"}
            >
              <option value="default" disabled>
                Year
              </option>
            </select>
          </div>
          <div className="form__input--cvv">
            <label htmlFor="cvv">CVV</label>
            <input
              type="number"
              name="cvv"
              id="cvv"
              value={cvv}
              onChange={(event) => setCvv(event.target.value)}
              onInput={(e) => {
                e.target.value = Math.max(0, parseInt(e.target.value))
                  .toString()
                  .slice(0, 3);
              }}
              onClick={() => cvvFlip()}
              required
            />
          </div>
        </div>
      </div>
      <input type="submit" value="Submit" className="form__submit" />
    </form>
  );
};
