"use strict";
const toastContainer = document.getElementById("toast-container");

export function toastNotification(message, type, iconIndex) {
  if (!toastContainer) {
    ("Toast container not found");
    return;
  }
  const messageIcons = [
    "/svgs/rosette-discount-check.svg", //success0//
    "/svgs/exclamation-circle.svg", //error1//
    "/svgs/alert-triangle.svg", //warning2//
  ];

  const toastIconWrapper = document.createElement("div");
  const iconImg = document.createElement("img");

  iconImg.src = messageIcons[iconIndex];
  iconImg.classList.add("toast-icon");
  iconImg.alt = type;

  toastIconWrapper.appendChild(iconImg);

  const toastElement = document.createElement("div");
  toastElement.setAttribute("role", "status");
  toastElement.classList.add("toast", type);
  toastElement.textContent = message;

  toastElement.appendChild(toastIconWrapper);
  toastContainer.appendChild(toastElement);

  const timeoutID = setTimeout(() => {
    toastElement.remove();
  }, 5000);

  toastElement.addEventListener("click", () => {
    clearTimeout(timeoutID);
    toastElement.remove();
  });
}

const backBtn = document.getElementById("back-button");

if (backBtn) {
  backBtn.addEventListener("click", () => {
    window.history.back();
  });
}

export function loadingSpinner() {
  const body = document.getElementsByTagName("body")[0];
  const spinner = document.createElement("div");
  spinner.classList.add("spinner");
  spinner.id = "loading-spinner";
  spinner.setAttribute("role", "status");
  spinner.setAttribute("aria-live", "polite");
  spinner.setAttribute("aria-label", "Loading");
  document.body.appendChild(spinner);
}

export function removeLoadingSpinner() {
  const spinner = document.getElementById("loading-spinner");
  if (spinner) {
    spinner.remove();
  }
}
