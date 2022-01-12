const body = document.querySelector(".site-body");
const hamburgerButton = document.querySelector(".hamburger-icon");
const header = document.querySelector(".header");
const links = document.querySelectorAll(".nav-links a");

let didScroll;
let lastScrollTop = 0;
let delta = 5;
let navbarHeight = $("header").outerHeight();

/* Add classes which open the hamburger menu */
mobileMenu = () => {
  header.classList.toggle("active");
  hamburgerButton.classList.toggle("active");
};

/* Open hamburger menu on hamburger icon click */
hamburgerButton.addEventListener("click", mobileMenu);

/* Close the Hamburger menu content when a link is clicked */
links.forEach((link) => {
  link.addEventListener("click", mobileMenu);
});

// window.addEventListener("scroll", (element) => {
//   const currentScroll = window.pageYOffset;

//   if (currentScroll <= 0) {
//     body.classList.remove(scrollUp);
//     return;
//   }

//   if (currentScroll > lastScroll && !body.classList.contains(scrollDown)) {
//     body.classList.remove(scrollUp);
//     body.classList.add(scrollDown);
//   } else if (
//     currentScroll < lastScroll &&
//     body.classList.contains(scrollDown)
//   ) {
//     body.classList.remove(scrollDown);
//     body.classList.add(scrollUp);
//   }
//   lastScroll = currentScroll;
// });

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

  // If they scrolled down and are past the navbar, add class .nav-up.
  // This is necessary so you never see what is "behind" the navbar.
  if (st > lastScrollTop && st > navbarHeight) {
    // Scroll Down
    $("header").removeClass("header-down").addClass("header-up");
  } else {
    // Scroll Up
    if (st + $(window).height() < $(document).height()) {
      $("header").removeClass("header-up").addClass("header-down");
      // $("html").css("scroll-padding-top", "6.75em");
    }
  }

  lastScrollTop = st;
}

easyScrollDots({
  fixedNav: true,
  fixedNavId: "header",
  fixedNavUpward: true,
  offset: 0,
});
