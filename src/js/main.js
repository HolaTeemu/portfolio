const body = document.querySelector(".site-body");
const hamburgerButton = document.querySelector(".hamburger-icon");
const header = document.querySelector(".header");
const links = document.querySelectorAll(".nav-links a");
const scrollUpButton = document.querySelector(".top-scroll");
const languageSelectors = document.querySelectorAll(".language-selector a");
const finButton = document.querySelector("#fin");
const engButton = document.querySelector("#eng");
const langSlash = document.querySelector(".lang-slash");

let didScroll;
let lastScrollTop = 0;
let delta = 5;
let navbarHeight = $("header").outerHeight();

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

easyScrollDots({
  fixedNav: true,
  fixedNavId: "header",
  fixedNavUpward: true,
  offset: 0,
});
