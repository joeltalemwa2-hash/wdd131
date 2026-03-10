const menuButton = document.querySelector("#menu");
const navigation = document.querySelector(".navigation");

menuButton.addEventListener("click", () => {

navigation.classList.toggle("show");

if(menuButton.textContent === "☰"){
menuButton.textContent = "X";
}else{
menuButton.textContent = "☰";
}

});

const year = new Date().getFullYear();

document.getElementById("currentyear").textContent = year;

document.getElementById("lastModified").textContent =
"Last Modified: " + document.lastModified;