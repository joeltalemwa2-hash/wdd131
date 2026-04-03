// Dynamic tagline
document.getElementById("tagline").textContent =
  "Helping students build smart money habits 💡";

// Scenario list (ARRAY + DOM)
const scenarios = [
  "How can I budget my small monthly allowance?",
  "What is the best way to save money as a student?"
];

const scenarioList = document.getElementById("scenarioList");

scenarios.forEach(item => {
  const li = document.createElement("li");
  li.textContent = item;
  scenarioList.appendChild(li);
});

// Money tips (EVENT + ARRAY + FUNCTION)
const tips = [
  "Track your expenses daily.",
  "Save at least 10% of your income.",
  "Avoid unnecessary spending.",
  "Plan before you buy."
];

document.getElementById("tipBtn").addEventListener("click", () => {
  const random = tips[Math.floor(Math.random() * tips.length)];
  document.getElementById("tipDisplay").textContent = random;
});

// Footer dynamic data
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent =
  "Last Modified: " + document.lastModified;