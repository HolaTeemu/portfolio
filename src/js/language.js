const finB = document.querySelector("#fin");
const engB = document.querySelector("#eng");
const langS = document.querySelector(".lang-slash");
const currentLang = localStorage.getItem("lang");
let userLanguage = window.navigator.userLanguage || window.navigator.language;
let newLang = "en";
const formMessageBoxSetup = document.querySelector("#message");
const scrollUpButtonSetup = document.querySelector(".top-scroll");

const errorMessage = document.querySelector(".error-message-container");
const formMessageBox = document.querySelector("#message");
const nameLabel = document.querySelector("#name-label");
const emailLabel = document.querySelector("#email-label");
const messageLabel = document.querySelector("#message-label");

changeFormToFinnish = () => {
  formMessageBox.placeholder = "Kirjoita viestisi tähän";
  nameLabel.innerHTML = "Koko Nimi";
  emailLabel.innerHTML = "Sähköposti";
  messageLabel.innerHTML = "Viesti";
  errorMessage.innerHTML =
    "<p>Jokin meni pieleen!<br />Kokeile uudestaan, kiitos.</p>";
};

changeFormToEnglish = () => {
  formMessageBox.placeholder = "Type your message";
  nameLabel.innerHTML = "Full Name";
  emailLabel.innerHTML = "Email";
  messageLabel.innerHTML = "Message";
  errorMessage.innerHTML =
    "<p>Something went wrong! <br />Try again please.</p>";
};

if (currentLang === "fi" || userLanguage === "fi") {
  newLang = "fi";
  $('[language="en"]').toggle();
  finB.classList.toggle("selected");
  if (finB.classList.contains("selected")) {
    langS.style.transform = "rotate(-25deg)";
    scrollUpButtonSetup.ariaLabel = "Skrollaa ylös";
    changeFormToFinnish();
  } else {
    langS.style.transform = "rotate(25deg)";
  }
} else {
  $('[language="fi"]').toggle();
  engB.classList.toggle("selected");
  if (finB.classList.contains("selected")) {
    langS.style.transform = "rotate(-25deg)";
  } else {
    langS.style.transform = "rotate(25deg)";
  }
}
localStorage.setItem("lang", newLang);
