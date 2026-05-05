import { URL } from "../api.js";
const registerEndpoint = URL + "/auth/register";

async function registerUser(url, data) {
  if (!registrationForm) {
    return;
  }

  try {
    const postOptions = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(url, postOptions);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Registration failed: ${JSON.stringify(errorData)}`);
    }
    const json = await response.json();
    console.log("User registered successfully", json);
    return json;
  } catch (error) {
    console.error("There was en error", error);
  }
}
const registrationForm = document.getElementById("registration-form");

registrationForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const userNameRegistrationInput = document.getElementById(
    "username-registration-input",
  ).value;
  const emailRegistrationInput = document.getElementById(
    "email-registration-input",
  ).value;
  const passwordRegistrationInput = document.getElementById(
    "password-registration-input",
  ).value;

  const passwordRepeatRegistrationInput = document.getElementById(
    "password-repeat-registration-input",
  ).value;

  const userData = {
    name: userNameRegistrationInput,
    email: emailRegistrationInput,
    password: passwordRegistrationInput,
  };

  const signUpBtn = document.getElementById("signup-button");

  if (passwordRepeatRegistrationInput !== passwordRegistrationInput) {
    console.log("Entered passwords do not match!");
    //add toast notif
  }
  registerUser(registerEndpoint, userData);
  //relocate to login, show toast notif on loginpage of successful signup//
});
