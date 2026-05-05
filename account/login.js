import { URL } from "../api.js";
const loginEndpoint = URL + "/auth/login";

async function logIn(data) {
  try {
    const response = await fetch(loginEndpoint, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Login failed: ${JSON.stringify(errorData)}`);
    }
    const status = response.status;
    if (status === 401) {
      console.log("incorrect email or password");
      //add incorrect email or password toast notif here.//
    }
    const accessToken = result.data.accessToken;

    console.log(status);
    console.log("Login successful!", result, accessToken);

    return result;
    return accessToken;
  } catch (error) {
    console.error("there was an error", error);
  }
}

const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const emailLoginInput = document
    .getElementById("email-login-input")
    .value.trim();

  const passwordLoginInput = document
    .getElementById("password-login-input")
    .value.trim();

  const logInBtn = document.getElementById("login-button");

  const credentials = {
    email: emailLoginInput,
    password: passwordLoginInput,
  };

  logIn(credentials);

  console.log("Successful login");
});
