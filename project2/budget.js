// ============================================================
// SmartMoney UG — Budget Planner
// Saves each budget entry to localStorage so the history
// persists across visits, with a summary and delete support.
// ============================================================

const STORAGE_KEY = "smartmoney-ug-budgets";

const plannerForm = document.getElementById("plannerForm");
const budgetList = document.getElementById("budgetList");
const budgetEmpty = document.getElementById("budgetEmpty");
const summaryStrip = document.getElementById("summaryStrip");
const summaryCount = document.getElementById("summaryCount");
const summaryAvgIncome = document.getElementById("summaryAvgIncome");
const summaryAvgBalance = document.getElementById("summaryAvgBalance");

function formatUGX(amount) {
  return "UGX " + Math.round(amount).toLocaleString("en-US");
}

function formatDate(isoString) {
  const d = new Date(isoString);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

/**
 * Read saved budgets from localStorage.
 * @returns {Array<{id:number, income:number, expenses:number, balance:number, date:string}>}
 */
function loadBudgets() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error("Could not read saved budgets:", err);
    return [];
  }
}

/**
 * Persist the budgets array to localStorage.
 * @param {Array} budgets
 * @returns {boolean} whether the save succeeded
 */
function saveBudgetsToStorage(budgets) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(budgets));
    return true;
  } catch (err) {
    console.error("Could not save budgets:", err);
    return false;
  }
}

function createBudgetEntryEl(entry) {
  const li = document.createElement("div");
  li.className = "budget-entry";
  li.dataset.id = String(entry.id);

  const figures = document.createElement("div");
  figures.className = "budget-entry-figures";

  const makeFigure = (label, value, colorClass) => {
    const wrap = document.createElement("dl");
    const dt = document.createElement("dt");
    dt.textContent = label;
    const dd = document.createElement("dd");
    dd.textContent = value;
    if (colorClass) dd.className = colorClass;
    wrap.append(dt, dd);
    return wrap;
  };

  figures.append(
    makeFigure("Income", formatUGX(entry.income)),
    makeFigure("Expenses", formatUGX(entry.expenses)),
    makeFigure("Balance", formatUGX(entry.balance), entry.balance < 0 ? "balance-negative" : "balance-positive")
  );

  const dateEl = document.createElement("span");
  dateEl.className = "budget-entry-date";
  dateEl.textContent = "Saved " + formatDate(entry.date);

  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.className = "delete-btn";
  deleteBtn.textContent = "Delete";
  deleteBtn.setAttribute("aria-label", "Delete this saved budget");
  deleteBtn.dataset.id = String(entry.id);

  li.append(figures, dateEl, deleteBtn);
  return li;
}

function renderBudgets() {
  const budgets = loadBudgets();

  budgetList.innerHTML = "";

  if (budgets.length === 0) {
    budgetList.appendChild(budgetEmpty);
    summaryStrip.hidden = true;
    return;
  }

  // Newest first
  const sorted = [...budgets].sort((a, b) => new Date(b.date) - new Date(a.date));
  const fragment = document.createDocumentFragment();
  sorted.forEach((entry) => fragment.appendChild(createBudgetEntryEl(entry)));
  budgetList.appendChild(fragment);

  const count = budgets.length;
  const avgIncome = budgets.reduce((sum, b) => sum + b.income, 0) / count;
  const avgBalance = budgets.reduce((sum, b) => sum + b.balance, 0) / count;

  summaryCount.textContent = String(count);
  summaryAvgIncome.textContent = formatUGX(avgIncome);
  summaryAvgBalance.textContent = formatUGX(avgBalance);
  summaryStrip.hidden = false;
}

if (plannerForm) {
  plannerForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!plannerForm.reportValidity()) return;

    const income = parseFloat(document.getElementById("plannerIncome").value) || 0;
    const expenses = parseFloat(document.getElementById("plannerExpenses").value) || 0;
    const balance = income - expenses;

    const entry = {
      id: Date.now(),
      income,
      expenses,
      balance,
      date: new Date().toISOString(),
    };

    const budgets = loadBudgets();
    budgets.push(entry);

    if (saveBudgetsToStorage(budgets)) {
      plannerForm.reset();
      renderBudgets();
    }
  });
}

if (budgetList) {
  budgetList.addEventListener("click", (event) => {
    const btn = event.target.closest(".delete-btn");
    if (!btn) return;

    const id = Number(btn.dataset.id);
    const budgets = loadBudgets().filter((b) => b.id !== id);

    if (saveBudgetsToStorage(budgets)) {
      renderBudgets();
    }
  });
}

renderBudgets();
