import { URL } from "../api.js";
import { toastNotification } from "../messages.js";
import { loadingSpinner, removeLoadingSpinner } from "../messages.js";
const loginEndpoint = URL + "/auth/login";
const accessToken = [];

function checkReferrer() {
  if (document.referrer.includes("register.html")) {
    toastNotification("Successful register! You can now log in.", "success", 0);
    return;
  }

  const params = new URLSearchParams(window.location.search);

  if (params.get("redirected") === "cart") {
    toastNotification(
      "You need to be logged in to access this page",
      "warning",
      2,
    );
  }
  if (params.get("redirected") === "user") {
    toastNotification(
      "You need to be logged in to access this page",
      "warning",
      2,
    );
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
  return result.data.accessToken;
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

  if (!emailLoginInput || !passwordLoginInput) {
    toastNotification("Please enter email and password", "error", 1);
    return;
  }

  const credentials = {
    email: emailLoginInput,
    password: passwordLoginInput,
  };
  loadingSpinner();
  try {
    const accessToken = await logIn(credentials);
    if (!accessToken) {
      removeLoadingSpinner();
      return;
    }
    localStorage.setItem("access_token", accessToken);
    const value = localStorage.getItem("access_token");
    console.log(value); //remove this later, its just to see that it works
    window.location.href = "/index.html"; // see if i can make this relocate back to the page the user was on when being prompted to login//
  } catch (error) {
    removeLoadingSpinner();
    toastNotification("Something went wrong", "error", 1);
  }
});
