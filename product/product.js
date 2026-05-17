"use strict";

import { URL, ALL_PRODUCTS_ENDPOINT } from "../api.js";
import { addToCart, loadCart } from "../cart/cart.js";
import { toastNotification } from "../messages.js";
import { loadingSpinner, removeLoadingSpinner } from "../messages.js";

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

const oneProductEndpoint = `${ALL_PRODUCTS_ENDPOINT}/${id}`;

let oneProduct = {};

const removeTokenBtn = document.getElementById("remove-token");

// removeTokenBtn.addEventListener("click", () => {
//   if (localStorage.getItem("access_token") === null) {
//     console.log("token already removed");
//   } else {
//     localStorage.removeItem("access_token");
//     console.log("Token removed");
//   }
// });
const addToCartBtn = document.getElementById("add-to-cart-button");
const shareBtn = document.getElementById("share-button");
addToCartBtn.setAttribute("aria-label", "Add item to cart");
shareBtn.setAttribute("aria-label", "Copy link to clipboard");

function copyCurrentURL() {
  navigator.clipboard.writeText(window.location.href);
}
function loginPopUp(triggerBtn) {
  const main = document.querySelector("main");
  const popUpWrapper = document.getElementById("login-popup-wrapper");
  const popUp = document.getElementById("login-popup");
  const cancelBtn = document.getElementById("cancel-popup");
  const loginBtn = document.getElementById("login-button");

  const toggle = () => {
    main.classList.toggle("popup-active");
    popUp.classList.toggle("active");

    if (popUp.classList.contains("active")) {
      cancelBtn.focus();
    } else {
      triggerBtn.focus();
    }
  };
  loginBtn.addEventListener("click", () => {
    window.location.href = "../account/login.html";
  });
  if (popUp.classList.contains("active")) {
    main.inert = true;
    cancelBtn.focus();
  } else {
    main.inert = false;
    triggerBtn.focus();
  }
  cancelBtn.addEventListener("click", toggle);

  popUpWrapper.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && popUp.classList.contains("active")) {
      toggle();
    }
  });
  return toggle;
}
const popupToggle = loginPopUp(addToCartBtn);

const oneProductWrapper = document.getElementById("one-product-wrapper");
const oneProductImgWrapper = document.getElementById("one-product-img-wrapper");
const oneProductInfoWrapper = document.getElementById(
  "one-product-info-wrapper",
);

async function fetchOneProduct() {
  if (!oneProductWrapper) {
    return;
  }
  loadingSpinner();
  try {
    const response = await fetch(URL + oneProductEndpoint);
    if (!response.ok) {
      throw new Error(`Something went wrong. ${response.status}`);
    }
    const result = await response.json();

    oneProduct = result.data;

    displayOneProduct();
    removeLoadingSpinner();
  } catch (error) {
    removeLoadingSpinner();
    const errorMsg = document.createElement("p");
    errorMsg.setAttribute("role", "alert");
    errorMsg.textContent = "Something went wrong, please try again later.";
    oneProductWrapper.appendChild(errorMsg);
  }
}
shareBtn.addEventListener("click", () => {
  copyCurrentURL();
  toastNotification("Link copied to clipboard", "success", 0);
});

addToCartBtn.addEventListener("click", () => {
  if (localStorage.getItem("access_token") === null) {
    console.log("You are not logged in!");
    popupToggle();
  } else {
    const selectedItem = {
      id: oneProduct.id,
      title: oneProduct.title,
      price: oneProduct.price,
      discountedPrice: oneProduct.discountedPrice,
      image: oneProduct.image.url,
      quantity: 1,
    };
    addToCart(selectedItem);
  }
});
function displayOneProduct() {
  if (!oneProductWrapper || !oneProductImgWrapper || !oneProductInfoWrapper) {
    return;
  }
  const productImage = document.createElement("img");
  const productName = document.createElement("h2");
  const productDesc = document.createElement("p");
  const productRating = document.createElement("p");
  const nameDescRatingWrapper = document.createElement("div");
  nameDescRatingWrapper.classList.add("title-price-rating-spacing");
  const productPrice = document.createElement("p");
  const productTags = document.createElement("p");
  const priceWrapper = document.createElement("div");

  productImage.src = oneProduct.image.url;
  productImage.alt = oneProduct.title;
  productName.textContent = oneProduct.title;
  productDesc.textContent = oneProduct.description;
  productTags.textContent = `Tags: ${oneProduct.tags}`;
  productPrice.textContent = `${oneProduct.price} kr`;
  productPrice.classList.add("price");
  productRating.textContent = `Average rating: ${oneProduct.rating.toFixed(1)}`;
  if (oneProduct.rating === 0) {
    productRating.textContent = "Average rating: No rating for this item yet";
  }

  oneProductImgWrapper.appendChild(productImage);
  nameDescRatingWrapper.appendChild(productName);
  nameDescRatingWrapper.appendChild(productDesc);
  nameDescRatingWrapper.appendChild(productRating);
  oneProductInfoWrapper.appendChild(nameDescRatingWrapper);

  if (oneProduct.price > oneProduct.discountedPrice) {
    productPrice.classList.add("strike");
    const salePrice = document.createElement("p");
    salePrice.textContent = `${oneProduct.discountedPrice} kr`;
    salePrice.classList.add("sale");
    priceWrapper.classList.add("flex-row");
    priceWrapper.classList.add("margin");

    priceWrapper.appendChild(productPrice);
    priceWrapper.appendChild(salePrice);
  } else {
    priceWrapper.appendChild(productPrice);
  }

  oneProductInfoWrapper.appendChild(priceWrapper);
  oneProductInfoWrapper.appendChild(productTags);

  const buttonsWrapper = document.getElementById("buttons-wrapper");
  if (buttonsWrapper) {
    oneProductInfoWrapper.appendChild(buttonsWrapper);
  }
  displayReviews();
}
if (id) {
  fetchOneProduct();
} else if (oneProductWrapper) {
  oneProductWrapper.innerHTML = `<p> Product not found, please try another product. </p>`;
}
loadCart();

const reviewsWrapper = document.getElementById("reviews-wrapper");
reviewsWrapper.classList.add("drop-shadow");

function displayReviews() {
  if (!reviewsWrapper) {
    return;
  }
  try {
    const reviewsTitle = document.createElement("h3");
    reviewsTitle.classList.add("padding");

    reviewsTitle.textContent = `Reviews of ${oneProduct.title}`;
    reviewsWrapper.appendChild(reviewsTitle);

    if (oneProduct.reviews.length === 0) {
      const errorMsg = document.createElement("p");
      errorMsg.textContent = "No reviews for this product yet.";
      errorMsg.classList.add("padding");
      reviewsWrapper.appendChild(errorMsg);
    }

    for (const review of oneProduct.reviews) {
      const userImageWrapper = document.createElement("div");
      const userImage = document.createElement("img");
      const reviewUsername = document.createElement("h4");
      const reviewDescription = document.createElement("p");
      const reviewRating = document.createElement("p");
      const hr = document.createElement("hr");
      hr.classList.add("line");
      reviewUsername.textContent = review.username;
      reviewDescription.textContent = review.description;
      reviewRating.textContent = `Rating: ${review.rating} / 5`;
      userImage.src = getRandomAvatar();
      userImage.setAttribute("aria-hidden", "true");

      userImage.classList.add("avatar");
      reviewUsername.classList.add("padding");
      reviewDescription.classList.add("padding");
      reviewRating.classList.add("padding");

      userImageWrapper.appendChild(userImage);
      reviewsWrapper.appendChild(userImage);
      reviewsWrapper.appendChild(reviewUsername);
      reviewsWrapper.appendChild(reviewDescription);
      reviewsWrapper.appendChild(reviewRating);
      reviewRating.appendChild(hr);
    }
  } catch (error) {
    toastNotification(
      "Something went wrong, please try again later",
      "error",
      1,
    );
  }
}

const avatars = [
  "../svgs/avatar1.svg",
  "../svgs/avatar2.svg",
  "../svgs/avatar3.svg",
  "../svgs/avatar4.svg",
  "../svgs/avatar5.svg",
];

function getRandomAvatar() {
  const randomIndex = Math.floor(Math.random() * avatars.length);
  return avatars[randomIndex];
}
