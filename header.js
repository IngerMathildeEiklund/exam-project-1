function HamburgerMenu() {
  const userIcon = document.getElementById("user");
  const shoppingcartIcon = document.getElementById("shoppingcart");
  const hamburgerButton = document.querySelector(".hamburger-menu");
  const hamburgerIcon = document.getElementById("hamburger");
  const hamburgerCloseIcon = document.getElementById("hamburger-close");
  const mobileNav = document.querySelector(".mobile-navigation");

  if (!mobileNav || !hamburgerIcon) return;

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
