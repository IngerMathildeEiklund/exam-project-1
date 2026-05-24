import { URL } from "../api.js";
import { toastNotification } from "../messages.js";
import { loadingSpinner, removeLoadingSpinner } from "../messages.js";
const registerEndpoint = URL + "/auth/register";

async function registerUser(url, data) {
  const postOptions = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(url, postOptions);
  const status = response.status;

  if (status === 400) {
    toastNotification("Entered information already in use", "warning", 2);
    throw new Error("Email or username already in use");
  }
  if (!response.ok) {
    throw new Error(`Registration failed: ${status}`);
  }
  const json = await response.json();
  return json;
}
const registrationForm = document.getElementById("registration-form");

registrationForm.addEventListener("submit", async (e) => {
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

  loadingSpinner();

  try {
    await registerUser(registerEndpoint, userData);
    removeLoadingSpinner();
    window.location.href = "login.html";
  } catch (error) {
    removeLoadingSpinner();
    toastNotification(
      "Something went wrong, please try again later",
      "error",
      1,
    );
  }
});
