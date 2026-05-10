import { renderOrderSummary } from "../cart/cart.js";

const cart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
const summaryWrapper = document.getElementById("summary-wrapper");

if (summaryWrapper) {
  renderOrderSummary(cart, summaryWrapper);
  const payOrderBtn = document.getElementById("pay-order-button");
  payOrderBtn.addEventListener("click", () => {
    window.location.href = "/success/index.html";
  });
}
