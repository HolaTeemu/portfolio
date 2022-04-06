/* Site elements needed*/
const body = document.querySelector(".site-body");
const hamburgerButton = document.querySelector(".hamburger-icon");
const header = document.querySelector(".header");
const links = document.querySelectorAll(".nav-links a");
const scrollUpButton = document.querySelector(".top-scroll");

/* Language selection elements needed */
const languageSelectors = document.querySelectorAll(".language-selector a");
const finButton = document.querySelector("#fin");
const engButton = document.querySelector("#eng");
const langSlash = document.querySelector(".lang-slash");
const currentLang = localStorage.getItem("lang");
let userLanguage = window.navigator.userLanguage || window.navigator.language;
let newLang = "en";

/* Form elements needed */
const errorMessage = document.querySelector(".error-message-container");
const formMessageField = document.querySelector("#message");
const nameLabel = document.querySelector("#name-label");
const emailLabel = document.querySelector("#email-label");
const messageLabel = document.querySelector("#message-label");
const submitButton = document.querySelector(".submit-button");
const inputFields = document.querySelectorAll("input");

/* Other needed variables */
let didScroll;
let lastScrollTop = 0;
let delta = 5;
let navbarHeight = $("header").outerHeight();

/* Helper functions for form language changing */
changeFormToFinnish = () => {
  formMessageField.placeholder = "Kirjoita viestisi tähän";
  nameLabel.innerHTML = "Koko Nimi";
  emailLabel.innerHTML = "Sähköposti";
  messageLabel.innerHTML = "Viesti";
  errorMessage.innerHTML =
    "<p>Jokin meni pieleen!<br />Kokeile uudestaan, kiitos.</p>";
};

changeFormToEnglish = () => {
  formMessageField.placeholder = "Type your message";
  nameLabel.innerHTML = "Full Name";
  emailLabel.innerHTML = "Email";
  messageLabel.innerHTML = "Message";
  errorMessage.innerHTML =
    "<p>Something went wrong! <br />Try again please.</p>";
};

/* Set lanauage according to the use preference
Check if there is already local storage variable saved or the user prefers Finnish,
if one of those is true, change the language to Finnish.
If both are false, the language is English.
*/
if (currentLang === "fi" || userLanguage === "fi") {
  newLang = "fi";
  $('[language="en"]').toggle();
  finButton.classList.toggle("selected");
  if (finButton.classList.contains("selected")) {
    langSlash.style.transform = "rotate(-25deg)";
    scrollUpButton.ariaLabel = "Skrollaa ylös";
    changeFormToFinnish();
  } else {
    langSlash.style.transform = "rotate(25deg)";
  }
} else {
  $('[language="fi"]').toggle();
  engButton.classList.toggle("selected");
  if (finButton.classList.contains("selected")) {
    langSlash.style.transform = "rotate(-25deg)";
  } else {
    langSlash.style.transform = "rotate(25deg)";
  }
}
localStorage.setItem("lang", newLang);

/* Add classes which open the hamburger menu */
mobileMenu = () => {
  if ($(hamburgerButton).css("display") !== "none") {
    header.classList.toggle("active");
    hamburgerButton.classList.toggle("active");
  }
};

/* Open hamburger menu on hamburger icon click */
hamburgerButton.addEventListener("click", mobileMenu);

/* Close the Hamburger menu content when a link is clicked */
links.forEach((link) => {
  link.addEventListener("click", mobileMenu);
});

$(window).scroll(function (event) {
  didScroll = true;
});

setInterval(function () {
  if (didScroll) {
    hasScrolled();
    didScroll = false;
  }
}, 250);

function hasScrolled() {
  var st = $(this).scrollTop();

  // Make sure they scroll more than delta
  if (Math.abs(lastScrollTop - st) <= delta) return;

  if (
    st > lastScrollTop &&
    st > navbarHeight &&
    !header.classList.contains("active")
  ) {
    // Scroll Down
    $("header").removeClass("header-down").addClass("header-up");
  } else {
    // Scroll Up
    if (st + $(window).height() < $(document).height()) {
      $("header").removeClass("header-up").addClass("header-down");
    }
  }

  lastScrollTop = st;
}

$(window).scroll(function (e) {
  if ($(window).scrollTop() >= 200) {
    scrollUpButton.classList.add("visible");
  } else {
    scrollUpButton.classList.remove("visible");
  }
});

changeLanguage = () => {
  event.preventDefault();
  $('[language="en"]').toggle();
  $('[language="fi"]').toggle();
  engButton.classList.toggle("selected");
  finButton.classList.toggle("selected");
  if (finButton.classList.contains("selected")) {
    langSlash.style.transform = "rotate(-25deg)";
    scrollUpButton.ariaLabel = "Skrollaa ylös";
    changeFormToFinnish();
    newLanguage = "fi";
  } else {
    langSlash.style.transform = "rotate(25deg)";
    scrollUpButton.ariaLabel = "Scroll to top";
    changeFormToEnglish();
    newLanguage = "en";
  }
  localStorage.setItem("lang", newLanguage);
};

languageSelectors.forEach((lang) => {
  lang.addEventListener("click", changeLanguage);
});

/* Form handler */
$(document).ready(function () {
  $(".contact-form").submit(function (event) {
    if (currentLang === "fi") {
      errorMessage.innerHTML =
        "<p>Jokin meni pieleen!<br />Kokeile uudestaan, kiitos.</p>";
    }
    $.ajax({
      method: "POST",
      url: "https://formsubmit.co/ajax/c2b806c4276cc2082c34c3ee1b4c99b5",
      dataType: "json",
      accepts: "application/json",
      data: {
        _subject: "Contact from website",
        name: document.querySelector("#fullname").value,
        email: document.querySelector("#email").value,
        message: document.querySelector("#message").value,
      },
    })
      .done(function (data) {
        if (errorMessage.classList.contains("visible")) {
          errorMessage.classList.remove("visible");
        }
        submitButton.classList.add("success");
        submitButton.disabled = true;
        inputFields.forEach((field) => {
          field.value = "";
        });
        formMessageField.value = "";
      })
      .fail(function (data) {
        if (!errorMessage.classList.contains("visible")) {
          errorMessage.classList.toggle("visible");
        }
      }),
      event.preventDefault();
  });
});

easyScrollDots({
  fixedNav: true,
  fixedNavId: "header",
  fixedNavUpward: true,
  offset: 0,
});
