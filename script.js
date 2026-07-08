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

    if (!fullName || !email || !phone) {
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

const timeButtons = document.querySelectorAll(".timeGrid button");
const bookAppointmentBtn = document.querySelector(".bookAppointmentBtn");
const appointmentMessage = document.querySelector(".appointmentMessage");

const calendarMonthLabel = document.querySelector(".calendarMonthLabel");
const calendarDates = document.querySelector(".calendarDates");
const prevMonthBtn = document.querySelector(".prevMonthBtn");
const nextMonthBtn = document.querySelector(".nextMonthBtn");

let selectedDate = null;
let selectedTime = null;
let currentMonthDate = new Date();

function resetAppointmentSelection() {
  selectedDate = null;
  selectedTime = null;

  timeButtons.forEach((button) => {
    button.classList.remove("selectedTime");
  });

  appointmentMessage.textContent = "";
  appointmentMessage.classList.remove("error", "success");
}

if (
  calendarMonthLabel &&
  calendarDates &&
  prevMonthBtn &&
  nextMonthBtn &&
  timeButtons.length &&
  bookAppointmentBtn &&
  appointmentMessage
) {
  function renderCalendar() {
    const year = currentMonthDate.getFullYear();
    const month = currentMonthDate.getMonth();

    const monthName = currentMonthDate.toLocaleDateString("default", {
      month: "long"
    });

    calendarMonthLabel.textContent = `${monthName} ${year}`;

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const totalDaysInMonth = new Date(year, month + 1, 0).getDate();

    calendarDates.innerHTML = "";

    for (let i = 0; i < firstDayOfMonth; i++) {
      const emptySpace = document.createElement("span");
      emptySpace.classList.add("emptyDate");
      calendarDates.appendChild(emptySpace);
    }

    for (let day = 1; day <= totalDaysInMonth; day++) {
      const dayButton = document.createElement("button");

      dayButton.type = "button";
      dayButton.textContent = day;

      dayButton.addEventListener("click", () => {
        const allDateButtons = calendarDates.querySelectorAll("button");

        allDateButtons.forEach((button) => {
          button.classList.remove("selectedDate");
        });

        dayButton.classList.add("selectedDate");

        selectedDate = {
          day: day,
          month: currentMonthDate.getMonth(),
          year: currentMonthDate.getFullYear()
        };

        selectedTime = null;

        timeButtons.forEach((button) => {
          button.classList.remove("selectedTime");
        });

        appointmentMessage.textContent = "";
        appointmentMessage.classList.remove("error", "success");

        console.log("Selected date:", selectedDate);
      });

      calendarDates.appendChild(dayButton);
    }
  }

  timeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (!selectedDate) {
        appointmentMessage.textContent = "Please select a date first.";
        appointmentMessage.classList.add("error");
        appointmentMessage.classList.remove("success");
        return;
      }

      timeButtons.forEach((time) => {
        time.classList.remove("selectedTime");
      });

      button.classList.add("selectedTime");
      selectedTime = button.textContent.trim();

      appointmentMessage.textContent = "";
      appointmentMessage.classList.remove("error", "success");

      console.log("Selected time:", selectedTime);
    });
  });

  bookAppointmentBtn.addEventListener("click", () => {
    if (!selectedDate || !selectedTime) {
      appointmentMessage.textContent = "Please select an available date and time.";
      appointmentMessage.classList.add("error");
      appointmentMessage.classList.remove("success");
      return;
    }

    const appointmentData = {
      year: selectedDate.year,
      month: selectedDate.month + 1,
      day: selectedDate.day,
      time: selectedTime
    };

    appointmentMessage.textContent =
      `Appointment selected for ${appointmentData.month}/${appointmentData.day}/${appointmentData.year} at ${appointmentData.time}.`;

    appointmentMessage.classList.add("success");
    appointmentMessage.classList.remove("error");

    console.log(appointmentData);
  });

  prevMonthBtn.addEventListener("click", () => {
    currentMonthDate.setDate(1);
    currentMonthDate.setMonth(currentMonthDate.getMonth() - 1);
    resetAppointmentSelection();
    renderCalendar();
  });

  nextMonthBtn.addEventListener("click", () => {
    currentMonthDate.setDate(1);
    currentMonthDate.setMonth(currentMonthDate.getMonth() + 1);
    resetAppointmentSelection();
    renderCalendar();
  });

  renderCalendar();
}

// >>>>>>>>>>MODAL FOR LISTINGS PAGE>>>>>>>>>>

// select all the listingsCard
// add event listener to the data-listing-Id
// when clicked unclick all the other listings and activate modal
// display the array that is inputed into javascript and present that with each data-list-id

// what ai gave me (notice unclick all the other functions was removed)

// 1. Select all listing cards
// 2. Select the listing modal
// 3. Create listing data in JavaScript
// 4. Add a click event to each listing card
// 5. When a card is clicked, get its data-listing-id
// 6. Use that id to find the matching listing data
// 7. Put that listing data into the modal
// 8. Open the modal
const listingData = {
  "horace-st": {
    price: "$959,00",
    address: "15708 Horace St",
    city: "Granada Hills, CA 91344",
    beds: "3",
    baths: "2",
    sqft: "1,400",
    year: "-",
    status: "For Sale",
    image: "assets/images/listings/15708 Horace Listing.webp",
    description: "Updated Granada Hills home with pool, privacy, and major upgrades! This move-in-ready 3-bedroom, 2-bathroom home features high-value improvements including NEW plumbing, flooring, and a beautifully remodeled bathroom. Enjoy great curb appeal with low-maintenance artificial turf in the front yard, plus added privacy and safety with new redwood fencing and a secure pool enclosure. Inside, the home offers an open, sun-filled living space, while the backyard is perfect for entertaining and summer gatherings. Ideally located on a quiet street, this home is commuter-friendly with easy access to the 118, 405, and 5 freeways. Conveniently close to Brand Park, the San Fernando Mission Museum, shopping, dining, and more. Situated near well-regarded schools including Haskell Elementary and John F. Kennedy High School. This home offers the perfect balance of comfort, privacy, and convenience--a true move-in-ready gem you won't want to miss!",
    highlights: [
      "Has fireplace",
      "Has Cooling",
      "Includes, Gas Oven, Gas Range, Microwave",
      "Pool In Ground",
      "Move in Ready!"
    ]
  }
}

const listingCards = document.querySelectorAll(".listingCardButton");
const modalImage = document.querySelector(".listingModalImage");
const modalStatus = document.querySelector(".listingModalStatus");
const modalPrice = document.querySelector(".listingModalPrice");
const modalAddress = document.querySelector(".listingModalAddress");
const modalBeds = document.querySelector(".modalBeds");
const modalBaths = document.querySelector(".modalBaths");
const modalSqft = document.querySelector(".modalSqft");
const modalYear = document.querySelector(".modalYear");
const modalDescription = document.querySelector(".listingModalDescription");
const modalHighlights = document.querySelector(".listingModalHighlights");
const listingModal = document.querySelector("#listingModal")

listingCards.forEach((card) => {
  card.addEventListener("click", () => {
    const listingId = card.dataset.listingId;
    const listing = listingData[listingId];

    console.log(listingId);
    console.log(listing);
    modalPrice.textContent = listing.price;
    modalAddress.textContent = `${listing.address}, ${listing.city}`;
    modalBeds.textContent = listing.beds;
    modalBaths.textContent = listing.baths;
    modalSqft.textContent = listing.sqft;
    modalYear.textContent = listing.year;
    modalStatus.textContent = listing.status;
    modalDescription.textContent = listing.description;
    modalHighlights.innerHTML = "";

    listing.highlights.forEach((highlight) => {
      const li = document.createElement("li");
      li.textContent = highlight;
      modalHighlights.appendChild(li);
    });

    modalImage.src = listing.image;
    modalImage.alt = listing.address;

    listingModal.classList.add("active");

  });
});

