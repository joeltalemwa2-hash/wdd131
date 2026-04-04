let count = localStorage.getItem("reviews");

if (!count) {
  count = 0;
}

count++;

localStorage.setItem("reviews", count);

document.getElementById("counter").textContent = count;

// Footer
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent =
  "Last Modified: " + document.lastModified;