"use strict";

export const URL = "https://v2.api.noroff.dev";
export const ALL_PRODUCTS_ENDPOINT = "/online-shop";
import { loadingSpinner } from "./messages.js";
import { removeLoadingSpinner } from "./messages.js";

let allProducts = [];

let currentStartIndex = 0;
let items_per_page = 2;
let highestRated = [];

const productWrapper = document.getElementById("products-wrapper");
const carouselWrapper = document.getElementById("carousel-wrapper");
const prevBtn = document.getElementById("prev-button");
const nextBtn = document.getElementById("next-button");

function accessibilityButtons() {
  if (!carouselWrapper) {
    return;
  } else {
    prevBtn.setAttribute("aria-label", `View previous product`);
    nextBtn.setAttribute("aria-label", `View next product`);
  }
}

async function fetchProducts(url, endpoint) {
  if (!productWrapper) {
    return;
  }
  loadingSpinner();
  productWrapper.setAttribute("aria-busy", "true");

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
    checkScreenSize();
    renderProducts(allProducts);

    highestRated = sort();

    renderCarouselCards(highestRated);
    rerenderCards();
    removeLoadingSpinner();
    productWrapper.setAttribute("aria-busy", "false");
  } catch (error) {
    removeLoadingSpinner();
    const errorMsg = document.createElement("div");
    errorMsg.role = "alert";
    errorMsg.setAttribute("aria-live", "assertive");
    errorMsg.textContent = `Could not fetch products. Please try again later`;
    productWrapper.appendChild(errorMsg);
  }
}
function sort() {
  const sorted = allProducts.sort((a, b) => b.rating - a.rating);
  const highestRated = sorted.slice(0, 12);
  return highestRated;
}
function checkScreenSize() {
  if (window.matchMedia("(min-width: 768px)").matches) {
    items_per_page = 3;
  } else {
    items_per_page = 2;
  }
}

function rerenderCards() {
  const mediaQuery = window.matchMedia("(min-width: 768px)");
  mediaQuery.addEventListener("change", (e) => {
    checkScreenSize();
    currentStartIndex = 0;
    clearCarousel();
    renderCarouselCards(highestRated);
  });
}

function showCards(products, currentStartIndex, itemsToShow) {
  checkScreenSize();
  const visibleProducts = [];
  for (let i = 0; i < itemsToShow; i++) {
    const index = (currentStartIndex + i) % products.length;
    visibleProducts.push(products[index]);
  }
  return visibleProducts;
}

function navigateCarousel(direction, products) {
  if (direction === "next") {
    currentStartIndex = (currentStartIndex + 1) % products.length;
  } else if (direction === "prev") {
    currentStartIndex =
      (currentStartIndex - 1 + products.length) % products.length;
  }

  clearCarousel();
  renderCarouselCards(products);
}

function clearCarousel() {
  if (!carouselWrapper) {
    return;
  } else {
    carouselWrapper.innerHTML = "";
  }
}

function renderCarouselCards(products) {
  if (!carouselWrapper) {
    return;
  } else {
    carouselWrapper.setAttribute("aria-label", "Highest reviewed products");
    carouselWrapper.setAttribute("aria-live", "polite");
    carouselWrapper.setAttribute("aria-atomic", "true");
  }
  const visibleProducts = showCards(
    products,
    currentStartIndex,
    items_per_page,
  );
  try {
    for (const product of visibleProducts) {
      const card = document.createElement("div");
      const imageWrapper = document.createElement("div");
      const cardImage = document.createElement("img");
      const productInfoWrapper = document.createElement("div");
      const productName = document.createElement("h3");
      const productPrice = document.createElement("p");
      const priceWrapper = document.createElement("div");
      const nameRatingWrapper = document.createElement("div");
      const cardCarouselRating = document.createElement("p");

      card.classList.add("card-carousel");
      nameRatingWrapper.classList.add("flex-row-spacing");
      imageWrapper.classList.add("card-img-wrapper");
      productInfoWrapper.classList.add("card-info-wrapper");
      priceWrapper.classList.add("price-wrapper");
      cardCarouselRating.classList.add("bold");

      card.setAttribute("role", "button");
      card.setAttribute("tabindex", 0);
      card.setAttribute("aria-label", `View ${product.title}`);

      card.addEventListener("click", () => {
        window.location.href = `product/index.html?id=${product.id}`;
      });

      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          window.location.href = `product/index.html?id=${product.id}`;
        }
      });

      cardImage.src = product.image.url;
      cardImage.alt = product.title;

      productName.textContent = product.title;
      productPrice.textContent = `${product.price} kr`;

      cardCarouselRating.textContent = `${product.rating.toFixed(1)}`;

      imageWrapper.appendChild(cardImage);
      card.appendChild(imageWrapper);
      card.appendChild(productInfoWrapper);
      nameRatingWrapper.appendChild(productName);
      nameRatingWrapper.appendChild(cardCarouselRating);
      card.appendChild(nameRatingWrapper);
      carouselWrapper.appendChild(card);

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
    const errorMsg = document.createElement("div");
    errorMsg.role = "alert";
    errorMsg.setAttribute("aria-live", "assertive");
    errorMsg.textContent = `Could not load products. Please try again later`;
    carouselWrapper.appendChild(errorMsg);
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
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          window.location.href = `product/index.html?id=${product.id}`;
        }
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

if (prevBtn) {
  prevBtn.addEventListener("click", () => {
    if (highestRated.length > 0) {
      navigateCarousel("prev", highestRated);
    }
  });
}
if (prevBtn) {
  prevBtn.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      navigateCarousel("prev", highestRated);
    }
  });
}
if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    if (highestRated.length > 0) {
      navigateCarousel("next", highestRated);
    }
  });
}
if (nextBtn) {
  nextBtn.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      navigateCarousel("next", highestRated);
    }
  });
}
