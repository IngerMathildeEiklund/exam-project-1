"use strict";

import { URL, ALL_PRODUCTS_ENDPOINT } from "../api.js";
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

const oneProductEndpoint = `${ALL_PRODUCTS_ENDPOINT}/${id}`;

let oneProduct = {};

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

  // add something about rating here, remember to target the correct one//

  const productImage = document.createElement("img");
  const productName = document.createElement("h2");
  const productDesc = document.createElement("p");
  const productPrice = document.createElement("p");
  const productTags = document.createElement("p");
  const priceWrapper = document.createElement("div");

  productImage.src = oneProduct.image.url;
  productImage.alt = oneProduct.title;
  productName.textContent = oneProduct.title;
  productDesc.textContent = oneProduct.description;
  productTags.textContent = oneProduct.tags;
  productPrice.textContent = oneProduct.price;

  oneProductImgWrapper.appendChild(productImage);
  oneProductInfoWrapper.appendChild(productName);
  oneProductInfoWrapper.appendChild(productDesc);

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
  // add display reviews here //
  displayReviews();
}
if (id) {
  fetchOneProduct();
} else if (oneProductWrapper) {
  oneProductWrapper.innerHTML = `<p> Product not found, please try another product. </p>`;
}

const reviewsWrapper = document.getElementById("reviews-wrapper");

function displayReviews() {
  if (!reviewsWrapper) {
    return;
  }

  console.log(oneProduct.reviews);
  console.log(oneProduct.reviews[0].rating);
  console.log(oneProduct.reviews[0].username);
  console.log(oneProduct.reviews[0].description);

  if (oneProduct.reviews === []) {
    reviewsWrapper.innerHTML = `<p> No reviews found for this product. </p>`;
  }

  const reviewsTitle = document.createElement("h3");
  reviewsTitle.textContent = `Reviews of ${oneProduct.title}`;

  reviewsWrapper.appendChild(reviewsTitle);

  for (const review of reviews) {
    const userImage = document.createElement("img");
    const reviewUsername = document.createElement("h4");
    const reviewDescription = document.createElement("p");
    const reviewRating = document.createElement("p");

    reviewUsername = review.reviews.username;
    reviewDescription = review.reviews.description;
  }
}
