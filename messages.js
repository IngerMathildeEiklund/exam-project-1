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
