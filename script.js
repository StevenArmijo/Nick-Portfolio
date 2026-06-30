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


function showNextReview() {
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

function startTimer() {
  reviewTimer = setInterval(showNextReview, reviewDuration);
}

function resetTimer() {
  clearInterval(reviewTimer);
  startTimer();
}

if (feedbackQuote && feedbackName && feedbackDots) {
  console.log("Review carousel started");
  createDots();
  showReview(0);
  startTimer();
}

// PSEUDO CODE FOR FAQ ACCORDION
const faqItems = document.querySelectorAll(".faqItem");

faqItems.forEach((item) => {
  const question = item.querySelector(".faqQuestion");
  const icon = question.querySelector("i");

  // 3. Add a click event to each faqQuestion
  question.addEventListener("click", () => {
    const isActive = item.classList.contains("active");

    faqItems.forEach((faq) => {
      faq.classList.remove("active");

      const faqIcon = faq.querySelector(".faqQuestion i");
      faqIcon.classList.remove("fa-minus");
      faqIcon.classList.add("fa-plus");
    });
    if (!isActive) {
      item.classList.add("active");

      icon.classList.remove("fa-plus");
      icon.classList.add("fa-minus");
    }
  });
});
////////////////////// CONTACT FORM SECTION////////////
const contactForm = document.querySelector(".contactForm");
const formMessage = document.querySelector(".formMessage")

if (contactForm && formMessage) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const fullName = document.querySelector("#fullName").value.trim();
    const email = document.querySelector("#email").value.trim();
    const phone = document.querySelector("#phone").value.trim();
    const interest = document.querySelector("#interest").value;
    const message = document.querySelector("#message").value.trim();

    if(!fullName || !email || !phone) {
      formMessage.textContent = "Please fill out your name, email, and phone number please.";
      formMessage.classList.add("error");
      formMessage.classList.remove("success");
      return;
    }
    if (!email.includes("@")) {
      formMessage.textContent = "Please enter a valid email address"
      formMessage.classList.add("error");
      formMessage.classList.remove("success");
      return;
    }
      const contactData = {
        fullName,
        email,
        phone,
        interest,
        message
      };
      console.log(contactData);

    formMessage.textContent = "Thank you, will get back to you as soon as possible";
    formMessage.classList.add("success");
    formMessage.classList.remove("error");

    contactForm.reset();

    });
  }

// ///////////CALENDAR LOGIC ///////////////

const dateButtons = document.querySelectorAll(".calendarDates button");
const timeButtons = document.querySelectorAll(".timeGrid button");
const bookAppointmentBtn = document.querySelector(".bookAppointmentBtn");
const appointmentMessage = document.querySelector(".appointmentMessage")

let selectedDate = null;
let selectedTime = null;


if (dateButtons.length && timeButtons.length && bookAppointmentBtn && appointmentMessage) {
dateButtons.forEach((button) => {
  button.addEventListener("click", () => {
    dateButtons.forEach((date) => {
      date.classList.remove("selectedDate");
    });

    button.classList.add("selectedDate");
    selectedDate = button.textContent.trim();

    console.log("Selected date:", selectedDate);
  });
});

timeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    timeButtons.forEach((time) => {
      time.classList.remove("selectedTime");
    });

    button.classList.add("selectedTime");
    selectedTime = button.textContent.trim();

    console.log("Selected time:", selectedTime);
  });
});

bookAppointmentBtn.addEventListener(("click"), () => {
  if(!selectedDate || !selectedTime) {
    appointmentMessage.textContent = "Please select an available time and day";
    appointmentMessage.classList.add("error");
    appointmentMessage.classList.remove("success");

    return;
  }
    
    appointmentMessage.textContent = 
    `Appointment selected for June ${selectedDate}, 2026 at ${selectedTime}.`;

    appointmentMessage.classList.add("success");
    appointmentMessage.classList.remove("error");

  const appointmentData = {
    month: "June",
    year: 2026,
    day: selectedDate,
    time: selectedTime
  };
  console.log(appointmentData);
});
};



