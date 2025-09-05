document.addEventListener("DOMContentLoaded", () => {
  console.log("Portfolio loaded for Sumit Singh 🚀");
});

const roles = [
  "Senior Analyst – Data Science @ Infosys",
  "M.Tech (IIT Goa)",
  "Data Science Enthusiast",
  "Machine Learning Engineer"
];

let currentRole = 0;
let currentChar = 0;
const typingElement = document.querySelector(".typing");

function type() {
  if (currentChar < roles[currentRole].length) {
    typingElement.textContent += roles[currentRole].charAt(currentChar);
    currentChar++;
    setTimeout(type, 100);
  } else {
    setTimeout(erase, 2000); // wait before erasing
  }
}

function erase() {
  if (currentChar > 0) {
    typingElement.textContent = roles[currentRole].substring(0, currentChar - 1);
    currentChar--;
    setTimeout(erase, 50);
  } else {
    currentRole = (currentRole + 1) % roles.length;
    setTimeout(type, 500);
  }
}

// Start animation
document.addEventListener("DOMContentLoaded", () => {
  if (typingElement) {
    type();
  }
});
