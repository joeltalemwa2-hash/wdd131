// MENU
const menuBtn = document.querySelector("#menu");
const nav = document.querySelector("#nav");

if (menuBtn) {
  menuBtn.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
}

// TIPS ARRAY
const tips = [
  "Save at least 10% of your income",
  "Avoid unnecessary spending",
  "Track your expenses",
  "Use a budget",
  "Invest early"
];

// RANDOM TIP
const tipBtn = document.querySelector("#tipBtn");
const tipDisplay = document.querySelector("#tipDisplay");

if (tipBtn) {
  tipBtn.addEventListener("click", () => {
    const random = Math.floor(Math.random() * tips.length);
    tipDisplay.textContent = `${tips[random]}`;
  });
}

// LOAD TIPS PAGE
const tipsList = document.querySelector("#tipsList");

if (tipsList) {
  tips.forEach(tip => {
    const li = document.createElement("li");
    li.textContent = `${tip}`;
    tipsList.appendChild(li);
  });
}

// BUDGET FORM
const form = document.querySelector("#budgetForm");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const income = document.querySelector("#income").value;
    const expenses = document.querySelector("#expenses").value;

    const balance = income - expenses;

    const result = document.querySelector("#result");

    if (balance > 0) {
      result.textContent = `You saved ${balance}`;
    } else {
      result.textContent = `You overspent ${Math.abs(balance)}`;
    }

    localStorage.setItem("balance", balance);
  });
}

// FOOTER
document.querySelectorAll("#year").forEach(el => {
  el.textContent = new Date().getFullYear();
});

const lastModified = document.querySelector("#lastModified");
if (lastModified) {
  lastModified.textContent = `Last Modified: ${document.lastModified}`;
}