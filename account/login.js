import { URL } from "../api.js";
import { toastNotification } from "../messages.js";

const loginEndpoint = URL + "/auth/login";

function checkReferrer() {
  if (document.referrer.includes("register.html")) {
    toastNotification("Successful register! You can now log in.", "success", 0);
  }
}

checkReferrer();

async function logIn(data) {
  const response = await fetch(loginEndpoint, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const status = response.status;

  if (status === 401) {
    toastNotification("Incorrect email or password", "error", 1);
    return;
  }
  if (!response.ok) {
    throw new Error(`Login failed: ${status}`);
  }

  const result = await response.json();
  return result;

  // const accessToken = result.data.accessToken;
  // return accessToken;
}

const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const emailLoginInput = document
    .getElementById("email-login-input")
    .value.trim();

  const passwordLoginInput = document
    .getElementById("password-login-input")
    .value.trim();

  // const logInBtn = document.getElementById("login-button");

  if (!emailLoginInput || !passwordLoginInput) {
    toastNotification("Please enter email and password", "error", 1);
    return;
  }
  const credentials = {
    email: emailLoginInput,
    password: passwordLoginInput,
  };
  try {
    await logIn(credentials);
    window.location.href = "/index.html";
  } catch (error) {
    toastNotification("Something went wrong", "error", 1);
  }
});
