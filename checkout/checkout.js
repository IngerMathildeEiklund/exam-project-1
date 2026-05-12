import { renderOrderSummary } from "../cart/cart.js";
import { toastNotification } from "../messages.js";

const cart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
const summaryWrapper = document.getElementById("summary-wrapper");

if (summaryWrapper) {
  renderOrderSummary(cart, summaryWrapper);

  const payOrderBtn = document.getElementById("pay-order-button");
  const detailsForm = document.getElementById("details-wrapper");
  detailsForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const detailInputs = document.querySelectorAll(".details-input");
    let isFormValid = true;

    detailInputs.forEach((input) => {
      if (!input.value.trim()) {
        input.classList.add("empty-input");
        isFormValid = false;
      }
    });
    if (!isFormValid) {
      toastNotification("Fields cannot be empty!", "warning", 2);
      return;
    }
    window.location.href = "/success/index.html";
  });
}
