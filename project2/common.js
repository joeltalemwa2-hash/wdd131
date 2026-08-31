// ============================================================
// SmartMoney UG — shared across all pages
// Mobile nav toggle + a subtle scroll-reveal for content blocks.
// ============================================================

// ---- Mobile navigation toggle ----
const navToggle = document.getElementById("navToggle");
const primaryNav = document.getElementById("primaryNav");

if (navToggle && primaryNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = primaryNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  primaryNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      primaryNav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// ---- Scroll reveal ----
// Content is visible by default in the CSS. Only once we know we can both
// hide *and* reveal an element do we opt it into the animated state, so
// the page stays fully readable if this script fails to load.
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealEls = document.querySelectorAll(".reveal");

if (!prefersReducedMotion && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          entry.target.classList.remove("pre-reveal");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -30px 0px" }
  );

  revealEls.forEach((el) => {
    el.classList.add("pre-reveal");
    observer.observe(el);
  });
}
