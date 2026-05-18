const signOutBtn = document.getElementById("sign-out-button");

signOutBtn.addEventListener("click", () => {
  const cart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
  localStorage.removeItem("access_token");
  localStorage.removeItem("shoppingCart");
  window.location.href = "login.html";
});
