// Menu Bar and Header
const menuIcon = document.querySelector("#menu-icon");
const navbar = document.querySelector(".navbar")
const header = document.querySelector(".header")

menuIcon.addEventListener("click", () => {
    navbar.classList.toggle("active")
    menuIcon.classList.toggle("fa-xmark");
});

window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 50);
});
// Modal
const modal = document.querySelector("#contactModal");
const openModalBtns = document.querySelectorAll("[data-open-modal]");
const closeModalBtns = document.querySelectorAll("[data-close-modal]");

openModalBtns.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    event.preventDefault();
    modal.classList.add("active");
  });
});

closeModalBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    modal.classList.remove("active");
  });
});

// CAROUSEL SECTION IN SERVICES 
const reviews = [
  {
    quote: "Nick made the entire process seamless.",
    name: "Jessica M.",
    location: "Lancaster"
  },
  {
    quote: "Nick is my closest friend we do everything together",
    name: "Hugh Janus",
    location: "Palmdale"
  },
  {
    quote: "Nick was the nicest person to mee but out of nowhere i caught him flirting with another girl in front of me",
    name: "Ashley",
    location: "Anaheim"
  },
  {
    quote: "nick is gay",
    name: "steven",
    location: "Palmdale"
  }
];
const feedbackQuote = document.querySelector(".feedbackQuote");
const feedbackName = document.querySelector(".feedbackName");
const feedbackDots = document.querySelector(".feedbackDots");

let currentReviewIndex = 0;
let reviewTimer;
const reviewDuration = 5000;

function showReview(index) {
  const review = reviews[index];

  feedbackQuote.textContent = review.quote;
  feedbackName.textContent = `${review.name}, ${review.location}`;

  currentReviewIndex = index;

const dots = document.querySelectorAll(".feedbackDot");

  dots.forEach((dot) => {
    dot.classList.remove("active");
  });

  if (dots[index]) {
    dots[index].classList.add("active");
  }

  currentReviewIndex = index;
}


function showNextReview(){
   currentReviewIndex++;

   if (currentReviewIndex >= reviews.length) {
    currentReviewIndex = 0;
   }
   showReview(currentReviewIndex)
}

  function createDots() {
    reviews.forEach((review, index) => {
      const dot = document.createElement("button");

      dot.classList.add("feedbackDot");
      dot.type = "button";

      dot.addEventListener("click", () => {
        showReview(index);
        resetTimer();
      });
      feedbackDots.appendChild(dot);
    });
  };

  function startTimer () {
    reviewTimer = setInterval(showNextReview, reviewDuration);
  }

function resetTimer () {
  clearInterval(reviewTimer);
  startTimer();
}

if (feedbackQuote && feedbackName && feedbackDots) {
  console.log("Review carousel started");
  createDots();
  showReview(0);
  startTimer();
}