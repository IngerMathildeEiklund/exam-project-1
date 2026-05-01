"use strict";

export const URL = "https://v2.api.noroff.dev";
export const ALL_PRODUCTS_ENDPOINT = "/online-shop";

let allProducts = [];
const prevBtn = document.getElementById("prev-button");
const nextBtn = document.getElementById("next-button");

let currentPage = 1;
let items_per_page = 2;
let highestRated = [];

const productWrapper = document.getElementById("products-wrapper");
const carouselWrapper = document.getElementById("carousel-wrapper");

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
    checkScreenSize();
    renderProducts(allProducts);

    highestRated = sort();
    currentPage = 1;

    renderCarouselCards(highestRated);
    rerenderCards();
  } catch (error) {
    productWrapper.innerHTML =
      "<p> Could not load products, please try again later. </p>";
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
    currentPage = 1;
    clearCarousel();
    renderCarouselCards(highestRated);
  });
}

function showCards(products, currentPage, items_per_page) {
  checkScreenSize();
  const startIndex = (currentPage - 1) * items_per_page;
  const endIndex = startIndex + items_per_page;
  return products.slice(startIndex, endIndex);
}

function navigateCarousel(direction, products) {
  const totalPages = Math.ceil(products.length / items_per_page);

  if (direction === "next") {
    currentPage = currentPage >= totalPages ? 1 : currentPage + 1;
  } else if (direction === "prev") {
    currentPage = currentPage <= 1 ? totalPages : currentPage - 1;
  }

  clearCarousel();
  renderCarouselCards(products);
}
// When reaching the end of the list, i want the carousel to return to the beginning of the list //
//when clicking the prev on the first items it will go to the end of the list//

function clearCarousel() {
  carouselWrapper.innerHTML = "";
}

function renderCarouselCards(products) {
  const visibleProducts = showCards(products, currentPage, items_per_page);
  for (const product of visibleProducts) {
    const card = document.createElement("div");
    const imageWrapper = document.createElement("div");
    const cardImage = document.createElement("img");
    const productInfoWrapper = document.createElement("div");
    const productName = document.createElement("h3");
    // const productDesc = document.createElement("p");
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
    // productDesc.textContent = product.description;

    productName.textContent = product.title;
    productPrice.textContent = `${product.price} kr`;

    imageWrapper.appendChild(cardImage);
    card.appendChild(imageWrapper);
    card.appendChild(productInfoWrapper);
    card.appendChild(productName);
    // card.appendChild(productDesc);
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

prevBtn.addEventListener("click", () => {
  if (highestRated.length > 0) {
    navigateCarousel("prev", highestRated);
  }
});

nextBtn.addEventListener("click", () => {
  if (highestRated.length > 0) {
    navigateCarousel("next", highestRated);
  }
});
