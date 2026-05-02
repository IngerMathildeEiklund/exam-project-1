"use strict";

import { URL, ALL_PRODUCTS_ENDPOINT } from "../api.js";
import { addToCart } from "/cart/cart.js";
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

const oneProductEndpoint = `${ALL_PRODUCTS_ENDPOINT}/${id}`;

let oneProduct = {};
export let cart = [];

const oneProductWrapper = document.getElementById("one-product-wrapper");
const oneProductImgWrapper = document.getElementById("one-product-img-wrapper");
const oneProductInfoWrapper = document.getElementById(
  "one-product-info-wrapper",
);

async function fetchOneProduct() {
  if (!oneProductWrapper) {
    return;
  }
  try {
    const response = await fetch(URL + oneProductEndpoint);
    if (!response.ok) {
      throw new Error(`Something went wrong. ${response.status}`);
    }
    const result = await response.json();

    oneProduct = result.data;

    displayOneProduct();
  } catch (error) {
    console.error("Full error object:", error);
    console.error("Error message:", error.message);

    const errorMsg = document.createElement("p");
    errorMsg.setAttribute("role", "alert");
    errorMsg.textContent = "Something went wrong, please try again later.";
    oneProductWrapper.appendChild(errorMsg);
  }
}

function displayOneProduct() {
  if (!oneProductWrapper || !oneProductImgWrapper || !oneProductInfoWrapper) {
    return;
  }
  const productImage = document.createElement("img");
  const productName = document.createElement("h2");
  const productDesc = document.createElement("p");
  const productRating = document.createElement("p");
  const productPrice = document.createElement("p");
  const productTags = document.createElement("p");
  const priceWrapper = document.createElement("div");

  productImage.src = oneProduct.image.url;
  productImage.alt = oneProduct.title;
  productName.textContent = oneProduct.title;
  productDesc.textContent = oneProduct.description;
  productTags.textContent = oneProduct.tags;
  productPrice.textContent = `${oneProduct.price} kr`;
  productRating.textContent = ` ${oneProduct.rating.toFixed(1)}`;
  if (oneProduct.rating === 0) {
    productRating.textContent = "No rating for this item yet";
  }
  const addToCartBtn = document.getElementById("add-to-cart-button");
  addToCartBtn.setAttribute("aria-label", "Add item to cart");
  addToCartBtn.addEventListener("click", () => {
    const selectedItem = {
      id: oneProduct.id,
      title: oneProduct.title,
      price: oneProduct.price,
      image: oneProduct.image.url,
      quantity: 1,
    };
    addToCart(selectedItem);
  });

  oneProductImgWrapper.appendChild(productImage);
  oneProductInfoWrapper.appendChild(productName);
  oneProductInfoWrapper.appendChild(productDesc);
  oneProductInfoWrapper.appendChild(productRating);

  if (oneProduct.price > oneProduct.discountedPrice) {
    productPrice.classList.add("strike");
    const salePrice = document.createElement("p");
    salePrice.textContent = `${oneProduct.discountedPrice} kr`;
    salePrice.classList.add("sale");

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

const reviewsWrapper = document.getElementById("reviews-wrapper");
reviewsWrapper.classList.add("drop-shadow");

function displayReviews() {
  if (!reviewsWrapper) {
    return;
  }
  try {
    const reviewsTitle = document.createElement("h3");
    reviewsTitle.classList.add("padding");

    reviewsWrapper.appendChild(reviewsTitle);
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

      reviewUsername.textContent = review.username;
      reviewDescription.textContent = review.description;
      reviewRating.textContent = `Rating: ${review.rating} / 5`;
      userImage.src = getRandomAvatar();
      userImage.alt = "User avatar";

      userImage.classList.add("avatar");
      reviewUsername.classList.add("padding");
      reviewDescription.classList.add("padding");
      reviewRating.classList.add("padding");

      userImageWrapper.appendChild(userImage);
      reviewsWrapper.appendChild(userImage);
      reviewsWrapper.appendChild(reviewUsername);
      reviewsWrapper.appendChild(reviewDescription);
      reviewsWrapper.appendChild(reviewRating);
    }
  } catch (error) {
    console.log("something went wrong");
  }
}

const avatars = [
  "/svgs/avatar1.svg",
  "/svgs/avatar2.svg",
  "/svgs/avatar3.svg",
  "/svgs/avatar4.svg",
  "/svgs/avatar5.svg",
];

function getRandomAvatar() {
  const randomIndex = Math.floor(Math.random() * avatars.length);
  return avatars[randomIndex];
}
