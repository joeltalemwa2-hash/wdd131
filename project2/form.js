// ============================================================
// SmartMoney UG — Budget Tool
// Reads the form, computes a balance and savings rate, and
// shows a tailored, human-sounding result — no page reload.
// ============================================================

const budgetForm = document.getElementById("budgetForm");
const resultsEmpty = document.getElementById("resultsEmpty");
const resultsBody = document.getElementById("resultsBody");
const resultsGreeting = document.getElementById("resultsGreeting");
const statusBadge = document.getElementById("statusBadge");
const resultIncome = document.getElementById("resultIncome");
const resultExpenses = document.getElementById("resultExpenses");
const resultBalance = document.getElementById("resultBalance");
const resultRate = document.getElementById("resultRate");
const resultsMessage = document.getElementById("resultsMessage");

/**
 * Format a number of Ugandan shillings with thousands separators.
 * @param {number} amount
 * @returns {string}
 */
function formatUGX(amount) {
  const rounded = Math.round(amount);
  return "UGX " + rounded.toLocaleString("en-US");
}

/**
 * Work out a tailored message by comparing the computed numbers
 * against how the person rated their own saving habit.
 * @param {{balance: number, rate: number, habit: string, name: string}} data
 * @returns {string}
 */
function buildMessage({ balance, rate, habit, name }) {
  const who = name ? name.trim() + ", " : "";
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  if (balance < 0) {
    return cap(
      `${who}right now you're spending more than you earn each month. Whatever your saving habit has looked like so far, the first goal is simple: bring expenses back under income. Trimming the smallest recurring cost first often adds up faster than people expect.`
    );
  }

  if (rate >= 20) {
    if (habit === "good") {
      return cap(`${who}this is what a good saving habit looks like on paper. You're keeping a healthy share of what you earn — keep an eye on it as your income or expenses change.`);
    }
    if (habit === "average") {
      return cap(`${who}your numbers look better than "average" — you're actually saving a strong share of your income. It might be worth calling this a good habit and building on it.`);
    }
    return cap(`${who}your numbers look strong, even though you rated your habit as poor. Whatever you're doing is working — it may just not feel that way day to day.`);
  }

  if (rate >= 5) {
    if (habit === "poor") {
      return cap(`${who}you're saving something every month, which is more than "poor" usually looks like. A small, consistent boost would move this into healthier territory.`);
    }
    return cap(`${who}you're saving a modest amount each month. It's a fine starting point — see if there's one expense you could trim to grow that margin.`);
  }

  // 0 <= rate < 5
  if (habit === "good") {
    return cap(`${who}your margin is thin right now, even though you feel your habit is good. It might be worth tracking a week of spending to see where the gap is.`);
  }
  return cap(`${who}you're just about breaking even. That's a reasonable place to start — the next step is finding a little room to save, even a small amount.`);
}

function getStatus(balance, rate) {
  if (balance < 0) return { key: "bad", label: "Overspending" };
  if (rate >= 20) return { key: "good", label: "Healthy margin" };
  if (rate >= 5) return { key: "warn", label: "Modest margin" };
  return { key: "warn", label: "Thin margin" };
}

if (budgetForm) {
  budgetForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!budgetForm.reportValidity()) {
      return; // native browser validation UI handles the messaging
    }

    const name = document.getElementById("name").value;
    const income = parseFloat(document.getElementById("income").value) || 0;
    const expenses = parseFloat(document.getElementById("expenses").value) || 0;
    const habitInput = budgetForm.querySelector('input[name="habit"]:checked');
    const habit = habitInput ? habitInput.value : "average";

    const balance = income - expenses;
    const rate = income > 0 ? (balance / income) * 100 : 0;
    const status = getStatus(balance, rate);

    resultsGreeting.textContent = name.trim() ? `Here's how you're doing, ${name.trim()}` : "Here's how you're doing";

    statusBadge.textContent = status.label;
    statusBadge.className = "status-badge status-" + status.key;

    resultIncome.textContent = formatUGX(income);
    resultExpenses.textContent = formatUGX(expenses);
    resultBalance.textContent = formatUGX(balance);
    resultBalance.style.color = balance < 0 ? "#F08080" : "#7ED957";
    resultRate.textContent = (income > 0 ? rate.toFixed(1) : "0.0") + "%";

    resultsMessage.textContent = buildMessage({ balance, rate, habit, name });

    resultsEmpty.style.display = "none";
    resultsBody.classList.add("show");
  });
}
