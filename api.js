"use strict";

export const URL = "https://v2.api.noroff.dev";
export const ALL_PRODUCTS_ENDPOINT = "/online-shop";

let allProducts = [];

const productWrapper = document.getElementById("products-wrapper");

async function fetchProducts(url, endpoint) {
  if (!productWrapper) {
    return;
  }
  try {
    const response = await fetch(url + endpoint);

    if (!response.ok) {
      throw new Error(`HTTP error status: ${response.status}`);
    }
    const result = await response.json();
    if (!Array.isArray(result.data)) {
      throw new Error("Unexpected API response format");
    }
    allProducts = result.data;
    renderProducts(allProducts);
  } catch (error) {
    productWrapper.innerHTML =
      "<p> Could not load products, please try again later. </p>";
  }
}

function renderProducts(products) {
  if (!productWrapper) {
    return;
  }
  try {
    for (const product of products) {
      const card = document.createElement("div");
      const imageWrapper = document.createElement("div");
      const cardImage = document.createElement("img");
      const productInfoWrapper = document.createElement("div");
      const productName = document.createElement("h3");
      const productDesc = document.createElement("p");
      const productPrice = document.createElement("p");
      const priceWrapper = document.createElement("div");

      card.classList.add("card");
      imageWrapper.classList.add("card-img-wrapper");
      productInfoWrapper.classList.add("card-info-wrapper");
      priceWrapper.classList.add("price-wrapper");

      card.setAttribute("role", "button");
      card.setAttribute("tabindex", 0);
      card.setAttribute("aria-label", `View ${product.title}`);

      card.addEventListener("click", () => {
        window.location.href = `product/index.html?id=${product.id}`;
      });

      cardImage.src = product.image.url;
      cardImage.alt = product.title;
      productDesc.textContent = product.description;

      productName.textContent = product.title;
      productPrice.textContent = `${product.price} kr`;

      imageWrapper.appendChild(cardImage);
      card.appendChild(imageWrapper);
      card.appendChild(productInfoWrapper);
      card.appendChild(productName);
      card.appendChild(productDesc);
      productWrapper.appendChild(card);

      if (product.price > product.discountedPrice) {
        productPrice.classList.add("strike");
        const salePrice = document.createElement("p");
        salePrice.textContent = `${product.discountedPrice} kr`;
        salePrice.classList.add("sale");

        priceWrapper.appendChild(productPrice);
        priceWrapper.appendChild(salePrice);
        card.appendChild(priceWrapper);
      } else {
        priceWrapper.appendChild(productPrice);
        card.appendChild(priceWrapper);
      }
    }
  } catch (error) {
    productWrapper.innerHTML =
      "<p> Could not load products, please try again later. </p>";
  }
}

fetchProducts(URL, ALL_PRODUCTS_ENDPOINT);
