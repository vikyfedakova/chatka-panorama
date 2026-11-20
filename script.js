"use strict";

const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector("#site-nav");
const lightbox = document.querySelector(".lightbox");
const lightboxImage = lightbox.querySelector("img");

function setMenuOpen(isOpen) {
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  siteNav.classList.toggle("is-open", isOpen);
}

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  setMenuOpen(!isOpen);
});

siteNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    setMenuOpen(false);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
    setMenuOpen(false);
    menuToggle.focus();
  }
});

window.matchMedia("(min-width: 701px)").addEventListener("change", (event) => {
  if (event.matches) {
    setMenuOpen(false);
  }
});

document.querySelector(".gallery-section").addEventListener("click", (event) => {
  const galleryLink = event.target.closest("[data-gallery]");
  if (!galleryLink || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
    return;
  }

  event.preventDefault();
  const image = galleryLink.querySelector("img");
  lightboxImage.src = galleryLink.href;
  lightboxImage.alt = image.alt;
  lightbox.showModal();
});

lightbox.querySelector(".lightbox-close").addEventListener("click", () => {
  lightbox.close();
});

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    lightbox.close();
  }
});
