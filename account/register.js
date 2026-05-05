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
    const status = response.status;
    console.log(status);
    if (status === 400) {
      console.log("incorrect form data");
      // toast notif
    }

    if (status === 409) {
      console.log("credentials already in use");
      //show toast notif of user with these credentials already exists//
    }
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Registration failed: ${JSON.stringify(errorData)}`);
    }
    const json = await response.json();
    console.log("User registered successfully", json);
    return json;
  } catch (error) {
    console.error("There was an error", error);
  }
}
const registrationForm = document.getElementById("registration-form");

registrationForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const userNameRegistrationInput = document
    .getElementById("username-registration-input")
    .value.trim();
  const emailRegistrationInput = document
    .getElementById("email-registration-input")
    .value.trim();
  const passwordRegistrationInput = document
    .getElementById("password-registration-input")
    .value.trim();

  const passwordRepeatRegistrationInput = document
    .getElementById("password-repeat-registration-input")
    .value.trim();

  const userData = {
    name: userNameRegistrationInput,
    email: emailRegistrationInput,
    password: passwordRegistrationInput,
  };

  const signUpBtn = document.getElementById("signup-button");
  const emailTemplate = "@stud.noroff.no";

  if (passwordRepeatRegistrationInput !== passwordRegistrationInput) {
    document
      .querySelector("#passwords-do-not-match")
      .classList.remove("hidden");
    return;
  }
  if (!emailRegistrationInput.includes(emailTemplate)) {
    document.querySelector("#email-format-error").classList.remove("hidden");
    return;
  }
  if (passwordRegistrationInput.length < 8) {
    document.querySelector("#passwords-length").classList.remove("hidden");
    return;
  }
  document.querySelector("#email-format-error").classList.add("hidden");
  document.querySelector("#passwords-do-not-match").classList.add("hidden");
  document.querySelector("#passwords-length").classList.add("hidden");

  registerUser(registerEndpoint, userData);
  //relocate to login, show toast notif on loginpage of successful signup//
});
