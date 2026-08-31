// ============================================================
// SmartMoney UG — Money Tips
// Renders the tip cards from a data array using the DOM API.
// ============================================================

const tips = [
  {
    icon: "📒",
    title: "Track every shilling",
    text: "Write down what you spend for one week. Most people are surprised by where the money actually goes.",
  },
  {
    icon: "🍲",
    title: "Cook more, eat out less",
    text: "Home-cooked meals are almost always cheaper than takeout, even when you factor in the time it takes.",
  },
  {
    icon: "🐷",
    title: "Save before you spend",
    text: "As soon as money comes in, move a small amount aside first, even if it's just a little. What's saved early rarely gets spent.",
  },
  {
    icon: "🎯",
    title: "Give your savings a goal",
    text: "\u201cSaving for something\u201d is easier to stick to than \u201csaving in general.\u201d Name the goal and the amount.",
  },
  {
    icon: "🚫",
    title: "Be careful with mobile loans",
    text: "Quick loans are convenient, but the fees add up fast. Treat them as a last resort, not a backup plan.",
  },
  {
    icon: "🛒",
    title: "Separate wants from needs",
    text: "Before a purchase, ask if it's something you need now or something you want. Both are fine \u2014 just be honest about which is which.",
  },
  {
    icon: "👥",
    title: "Split costs where you can",
    text: "Textbooks, data bundles, and rides are often cheaper shared with a roommate or classmate.",
  },
  {
    icon: "🧾",
    title: "Review your budget monthly",
    text: "A budget isn't a one-time task. Check in every month and adjust it as your income or expenses change.",
  },
  {
    icon: "🌱",
    title: "Start an emergency fund",
    text: "Even a small buffer helps you handle a surprise cost without derailing the rest of your month.",
  },
];

/**
 * Build a single tip card as a DOM element.
 * @param {{icon: string, title: string, text: string}} tip
 * @returns {HTMLLIElement}
 */
function createTipCard(tip) {
  const li = document.createElement("li");
  li.className = "tip-card";

  const icon = document.createElement("span");
  icon.className = "tip-icon";
  icon.setAttribute("aria-hidden", "true");
  icon.textContent = tip.icon;

  const heading = document.createElement("h3");
  heading.textContent = tip.title;

  const desc = document.createElement("p");
  desc.textContent = tip.text;

  li.append(icon, heading, desc);
  return li;
}

function renderTips() {
  const grid = document.getElementById("tipsGrid");
  if (!grid) return;

  grid.innerHTML = "";

  if (tips.length === 0) {
    const empty = document.createElement("li");
    empty.className = "tips-loading";
    empty.textContent = "No tips available right now.";
    grid.appendChild(empty);
    return;
  }

  const fragment = document.createDocumentFragment();
  tips.forEach((tip) => fragment.appendChild(createTipCard(tip)));
  grid.appendChild(fragment);
}

renderTips();
