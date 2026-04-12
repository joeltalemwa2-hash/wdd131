// FOOTER
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// MENU
const menu = document.getElementById("menu");
const nav = document.getElementById("nav");

if (menu) {
  menu.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
}

// ARRAY + OBJECTS
const tips = [
  { title: "Save First", desc: "Always save before spending." },
  { title: "Track Expenses", desc: "Monitor your spending habits." },
  { title: "Avoid Debt", desc: "Limit unnecessary borrowing." }
];

// FUNCTION + DOM
function displayTips() {
  const container = document.querySelector(".cards");
  if (!container) return;

  container.innerHTML = tips.map(tip => `
    <div>
      <h3>${tip.title}</h3>
      <p>${tip.desc}</p>
    </div>
  `).join("");
}

displayTips();

// LOCAL STORAGE
let count = localStorage.getItem("reviews") || 0;

if (window.location.pathname.includes("review.html")) {
  count++;
  localStorage.setItem("reviews", count);

  const counter = document.getElementById("counter");
  if (counter) {
    counter.textContent = `${count}`;
  }
}