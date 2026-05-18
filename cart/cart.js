"use strict";

import { toastNotification } from "../messages.js";

let cart = [];

function saveCart() {
  localStorage.setItem("shoppingCart", JSON.stringify(cart));
}

export function loadCart() {
  const savedCart = localStorage.getItem("shoppingCart");
  if (savedCart) {
    cart = JSON.parse(savedCart);
  }
}

export function addToCart(product) {
  const alreadyInCart = cart.find((item) => item.id === product.id);
  if (alreadyInCart) {
    alreadyInCart.quantity += 1;
  } else {
    cart.push(product);
  }
  saveCart();
  toastNotification(`${product.title} added to cart!`, "success", 0);
}
let clearCartBtn = null;
let popupToggle = null;

function clearCartPopUp(triggerBtn) {
  const main = document.querySelector("main");
  const popUpWrapper = document.getElementById("clear-cart-popup-wrapper");
  const popUp = document.getElementById("clear-cart-popup");
  const cancelBtn = document.getElementById("cancel-clear");
  const confirmClearBtn = document.getElementById("confirm-clear");

  const toggle = () => {
    main.classList.toggle("popup-active");
    popUp.classList.toggle("active");

    if (popUp.classList.contains("active")) {
      cancelBtn.focus();
    } else {
      triggerBtn.focus();
    }
  };
  if (popUp.classList.contains("active")) {
    main.inert = true;
    cancelBtn.focus();
  } else {
    main.inert = false;
    triggerBtn.focus();
  }
  cancelBtn.addEventListener("click", toggle);

  confirmClearBtn.addEventListener("click", () => {
    cart.splice(0, cart.length);
    saveCart();
    toggle();
    displayCart();
  });
  popUpWrapper.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && popUp.classList.contains("active")) {
      toggle();
    }
  });
  return toggle;
}

loadCart();

const cartAndSummaryWrapper = document.getElementById(
  "cart-and-summary-wrapper",
);
const cartWrapper = document.getElementById("cart-wrapper");
const summaryWrapper = document.getElementById("summary-wrapper");

export function renderOrderSummary(cart, summaryWrapper) {
  if (!cart || cart.length === 0) return;

  const total = cart.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  summaryWrapper.innerHTML = "";
  summaryWrapper.innerHTML = `<h1> Cart summary </h1>`;

  const template2 = document.getElementById("summary-template");
  const totalWrapper = template2.content.cloneNode(true);

  let quantityAmount = 0;

  cart.map((item) => {
    quantityAmount += item.quantity;
  });

  totalWrapper.querySelector(".products-amount").textContent =
    `${quantityAmount} products`;

  if (cart.length < 2) {
    totalWrapper.querySelector(".products-amount").textContent =
      `${cart.length} product`;
  }
  if (cart.length < 2 && quantityAmount > 1) {
    totalWrapper.querySelector(".products-amount").textContent =
      `${quantityAmount} products`;
  }
  totalWrapper.querySelector(".products-total").textContent =
    `${total.toFixed(2)} kr`;
  const totalWithShipping = total + 200;
  totalWrapper.querySelector(".order-total").textContent =
    `${totalWithShipping.toFixed(2)} kr`;
  totalWrapper
    .querySelector(".order-total")
    .setAttribute(
      "aria-label",
      `Order total ${totalWithShipping.toFixed(2)} kr`,
    );
  summaryWrapper.innerHTML = `<h1> Cart summary </h1>`;
  summaryWrapper.appendChild(totalWrapper);
}

function displayCart() {
  if (!cartAndSummaryWrapper) {
    return;
  }
  cartWrapper.innerHTML = "";
  summaryWrapper.innerHTML = "";
  cartWrapper.innerHTML = `<h1> Your shopping cart </h1>`;

  if (cart.length === 0) {
    document.querySelector(".breadcrumbs").innerHTML = "";
    cartAndSummaryWrapper.innerHTML = `<div id="empty-cart-wrapper" class="drop-shadow section-smaller"> <h1> No items found in cart </h1> <p> Let's fix that! </p> 
    <svg id="shopping-bags" fill="#483D3A" height="800px" width="800px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	 viewBox="0 0 512 512" xml:space="preserve">
<g>
	<g>
		<g>
			<path d="M273.067,315.733c0-14.114-11.486-25.6-25.6-25.6s-25.6,11.486-25.6,25.6c0,11.11,7.151,20.489,17.067,24.03V358.4
				c0,47.053,38.281,85.333,85.333,85.333S409.6,405.453,409.6,358.4v-18.637c9.916-3.533,17.067-12.919,17.067-24.03
				c0-14.114-11.486-25.6-25.6-25.6c-14.114,0-25.6,11.486-25.6,25.6c0,11.11,7.151,20.489,17.067,24.03V358.4
				c0,37.641-30.626,68.267-68.267,68.267c-37.641,0-68.267-30.626-68.267-68.267v-18.637
				C265.916,336.23,273.067,326.844,273.067,315.733z M401.067,307.2c4.702,0,8.533,3.831,8.533,8.533s-3.823,8.525-8.525,8.533
				h-0.008h-0.009c-4.702-0.009-8.525-3.831-8.525-8.533S396.365,307.2,401.067,307.2z M247.475,324.267h-0.009h-0.009
				c-4.702-0.009-8.525-3.831-8.525-8.533s3.831-8.533,8.533-8.533c4.702,0,8.533,3.831,8.533,8.533
				S252.177,324.258,247.475,324.267z"/>
			<path d="M93.867,204.8c14.114,0,25.6-11.486,25.6-25.6c0-11.11-7.151-20.497-17.067-24.03v-35.703h145.067
				c4.71,0,8.533-3.823,8.533-8.533c0-4.719-3.823-8.533-8.533-8.533H102.4c0-47.053,38.281-85.333,85.333-85.333
				s85.333,38.281,85.333,85.333v52.77C263.151,158.703,256,168.09,256,179.2c0,14.114,11.486,25.6,25.6,25.6s25.6-11.486,25.6-25.6
				c0-11.11-7.151-20.497-17.067-24.03v-35.703H358.4v93.867c0,4.71,3.823,8.533,8.533,8.533s8.533-3.823,8.533-8.533v-102.05
				c0-0.06-0.034-0.111-0.034-0.179c0-0.06,0.034-0.111,0.034-0.171c0-4.719-3.823-8.533-8.533-8.533h-76.8
				c0-56.465-45.935-102.4-102.4-102.4s-102.4,45.935-102.4,102.4v52.77c-9.916,3.533-17.067,12.919-17.067,24.03
				C68.267,193.314,79.753,204.8,93.867,204.8z M281.6,170.667c4.702,0,8.533,3.831,8.533,8.533c0,4.702-3.831,8.533-8.533,8.533
				c-4.702,0-8.533-3.831-8.533-8.533C273.067,174.498,276.898,170.667,281.6,170.667z M93.867,170.667
				c4.702,0,8.533,3.831,8.533,8.533c0,4.702-3.831,8.533-8.533,8.533c-4.702,0-8.533-3.831-8.533-8.533
				C85.333,174.498,89.165,170.667,93.867,170.667z"/>
			<path d="M119.467,494.933h-76.8c-14.114,0-25.6-11.486-25.6-25.6V409.6h93.867c4.71,0,8.533-3.823,8.533-8.533
				c0-4.719-3.823-8.533-8.533-8.533H17.067V119.467h42.317c4.71,0,8.533-3.823,8.533-8.533c0-4.719-3.823-8.533-8.533-8.533H8.533
				c-4.71,0-8.533,3.814-8.533,8.533v358.4C0,492.851,19.14,512,42.667,512h76.8c4.71,0,8.533-3.823,8.533-8.533
				C128,498.748,124.177,494.933,119.467,494.933z"/>
			<path d="M509.295,241.647c-1.553-1.656-3.729-2.714-6.178-2.714H179.2c-4.71,0-8.533,3.814-8.533,8.533
				c0,4.71,3.823,8.533,8.533,8.533h315.733v213.333c0,14.114-11.486,25.6-25.6,25.6H179.2c-14.114,0-25.6-11.486-25.6-25.6V247.467
				c0-4.71-3.823-8.533-8.533-8.533c-4.71,0-8.533,3.823-8.533,8.533v221.867c0,23.518,19.14,42.667,42.667,42.667h290.133
				C492.86,512,512,492.851,512,469.333V247.817C512,245.367,510.942,243.2,509.295,241.647z"/>
		</g>
	</g>
</g>
</svg>
<button id="go-shopping-button" class="button blue" aria-label="Continue shopping"> Go shopping </button> 
</div>`;

    document
      .querySelector("#shopping-bags")
      .setAttribute("aria-hidden", "true");
    const goShoppingBtn = document.getElementById("go-shopping-button");
    setTimeout(() => goShoppingBtn.focus(), 0);
    goShoppingBtn.addEventListener("click", () => {
      window.location.href = "/index.html";
    });
    cartAndSummaryWrapper.classList.add("empty-cart-styling");
  }

  cart.forEach((item, index) => {
    const template = document.getElementById("cart-item-template");
    const productWrapper = template.content.cloneNode(true);

    productWrapper.querySelector(".cart-image").src = item.image;
    productWrapper.querySelector(".cart-image").alt = item.title;
    productWrapper.querySelector(".product-title").textContent = item.title;
    productWrapper.querySelector(".product-price").textContent =
      `${(item.price * item.quantity).toFixed(2)} kr`;
    productWrapper.querySelector("#product-price-sale").textContent =
      item.discountedPrice.toFixed(2);
    productWrapper.querySelector(".product-quantity").textContent =
      `Quantity: ${item.quantity}`;

    if (item.price > item.discountedPrice) {
      productWrapper
        .querySelector("#product-price-sale")
        .classList.remove("hidden");
      productWrapper.querySelector(".product-price").classList.add("strike");
      productWrapper.querySelector("#product-price-sale").textContent =
        `${(item.discountedPrice * item.quantity).toFixed(2)} kr`;
      productWrapper.querySelector("#product-price-sale").classList.add("sale");
    }

    const minusBtn = productWrapper.querySelector("#minus-button");
    const plusBtn = productWrapper.querySelector("#plus-button");
    const quantityInput = productWrapper.querySelector("#quantity-input");
    quantityInput.value = item.quantity;

    function increment() {
      cart[index].quantity += 1;
      quantityInput.value = cart[index].quantity;
      quantityInput.setAttribute(
        "aria-label",
        `Quantity: ${cart[index].quantity}`,
      );
      saveCart();

      renderOrderSummary(cart, summaryWrapper);
    }

    function decrement() {
      if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
        quantityInput.value = cart[index].quantity;
        quantityInput.setAttribute(
          "aria-label",
          `Quantity: ${cart[index].quantity}`,
        );

        saveCart();

        renderOrderSummary(cart, summaryWrapper);
      } else if (cart[index].quantity === 1) {
        cart.splice(index, 1);
        saveCart();
        toastNotification(`${item.title} removed from cart`, "success", 0);
        displayCart();
      }
    }

    minusBtn.addEventListener("click", () => {
      decrement();
      displayCart();
    });

    plusBtn.addEventListener("click", () => {
      increment();
      displayCart();
    });

    const deleteBtn = productWrapper.querySelector(".trashcan-button");
    deleteBtn.setAttribute("aria-label", `Delete ${item.title} from cart`);
    deleteBtn.addEventListener("click", () => {
      cart.splice(index, 1);
      saveCart();
      toastNotification(`${item.title} removed from cart`, "success", 0);
      displayCart();
    });

    cartWrapper.appendChild(productWrapper);
  });
  clearCartBtn = document.createElement("button");
  clearCartBtn.textContent = "Clear all items from cart";
  clearCartBtn.setAttribute("aria-label", "Remove all items from cart");
  clearCartBtn.classList.add("clear-cart-button");

  if (!popupToggle) {
    popupToggle = clearCartPopUp(clearCartBtn);
  }
  clearCartBtn.addEventListener("click", () => {
    popupToggle();
  });

  cartWrapper.appendChild(clearCartBtn);
  renderOrderSummary(cart, summaryWrapper);
  const checkoutBtn = document.getElementById("continue-to-checkout-button");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      window.location.href = "../checkout/index.html";
    });
  }
}

displayCart();
