const signOutBtn = document.getElementById("sign-out-button");

signOutBtn.addEventListener("click", () => {
  localStorage.removeItem("access_token");
  window.location.href = "login.html";
});
