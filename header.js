function HamburgerMenu() {
  const userIcons = document.querySelectorAll("#user");
  const shoppingcartIcons = document.querySelectorAll("#shoppingcart");
  const hamburgerButton = document.querySelector(".hamburger-menu");
  const hamburgerIcon = document.getElementById("hamburger");
  const hamburgerCloseIcon = document.getElementById("hamburger-close");
  const mobileNav = document.querySelector(".mobile-navigation");

  if (!mobileNav || !hamburgerIcon || !hamburgerButton) return;

  userIcons.forEach((icon) => {
    const userLink = icon.closest("a");
    if (userLink) {
      userLink.addEventListener("click", (e) => {
        e.preventDefault();
        if (localStorage.getItem("access_token") === null) {
          window.location.href = "/account/login.html?redirected=user";
        } else {
          window.location.href = userLink.href;
        }
      });
    }
  });

  shoppingcartIcons.forEach((icon) => {
    const shoppingcartLink = icon.closest("a");
    if (shoppingcartLink) {
      shoppingcartLink.addEventListener("click", (e) => {
        e.preventDefault();
        if (localStorage.getItem("access_token") === null) {
          window.location.href = "/account/login.html?redirected=cart";
        } else {
          window.location.href = shoppingcartLink.href;
        }
      });
    }
  });

  hamburgerButton.addEventListener("click", () => {
    hamburgerIcon.classList.toggle("hidden");
    hamburgerCloseIcon.classList.toggle("hidden");
    mobileNav.classList.toggle("active");

    const isExpanded = hamburgerButton.getAttribute("aria-expanded") === "true";
    hamburgerButton.setAttribute("aria-expanded", !isExpanded);
  });

  const mediaQuery = window.matchMedia("(min-width: 768px)");

  mediaQuery.addEventListener("change", (e) => {
    if (e.matches) {
      mobileNav.classList.remove("active");
      hamburgerCloseIcon.classList.add("hidden");
      hamburgerIcon.classList.remove("hidden");
    }
  });
}

HamburgerMenu();
