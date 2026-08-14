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

////////////////STICKY CONTACT AT FOOTER FOR HOME PAGE////////////
const stickyContactCta = document.querySelector(".stickyContactCta");
const homeSection = document.querySelector("#home");

if (stickyContactCta && homeSection) {
  window.addEventListener("scroll", () => {
    const homeBottom = homeSection.offsetTop + homeSection.offsetHeight;

    if (window.scrollY > homeBottom - 120) {
      stickyContactCta.classList.add("active");
    } else {
      stickyContactCta.classList.remove("active");
    }
  });
}

// CAROUSEL SECTION IN SERVICES 
const reviews = [
  {
    quote: "Nick made the entire process seamless.",
    name: "Jessica M.",
    location: "Lancaster"
  },
  {
    quote: "Professional, responsive, and knowledgeable. The best realtor we’ve worked with.",
    name: "Rogelio Diaz",
    location: "Sylmar"
  },
  {
    quote: "Nick helped us sell our home quickly and for top dollar. We couldn’t be happier.",
    name: "Alex Cardenas",
    location: "Palmdale"
  },
  {
    quote: "He went above and beyond for us. Highly recommend Nick to anyone looking to buy or sell.",
    name: "Morales Family",
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


// ///////////CALENDAR LOGIC ///////////////

const timeButtons = document.querySelectorAll(".timeGrid button");
const bookAppointmentBtn = document.querySelector(".bookAppointmentBtn");
const appointmentMessage = document.querySelector(".appointmentMessage");

const calendarMonthLabel = document.querySelector(".calendarMonthLabel");
const calendarDates = document.querySelector(".calendarDates");
const prevMonthBtn = document.querySelector(".prevMonthBtn");
const nextMonthBtn = document.querySelector(".nextMonthBtn");

const fullNameInput = document.querySelector("#fullName");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");
const interestInput = document.querySelector("#interest");
const messageSubmitBtn = document.querySelector(".messageSubmitBtn");
 
let selectedDate = null;
let selectedTime = null;
let appointmentConfirmed = false;
let currentMonthDate = new Date();



function updateSubmitButton() {
  if (!messageSubmitBtn || !fullNameInput || !emailInput || !phoneInput || !interestInput) {
    return;
  }

  const hasContactInfo =
    fullNameInput.value.trim() &&
    emailInput.value.trim() &&
    phoneInput.value.trim() &&
    interestInput.value;

  const isTourRequest = intent === "tour";

  if (isTourRequest) {
    messageSubmitBtn.innerHTML = appointmentConfirmed
      ? 'Send Tour Request <i class="fa-regular fa-paper-plane"></i>'
      : "Select and Confirm a Tour Time";

    messageSubmitBtn.disabled = !(hasContactInfo && appointmentConfirmed);
  } else {
    messageSubmitBtn.innerHTML = 'Send Message <i class="fa-regular fa-paper-plane"></i>';
    messageSubmitBtn.disabled = !hasContactInfo;
  }

  messageSubmitBtn.classList.toggle("ready", !messageSubmitBtn.disabled);
}

if (fullNameInput && emailInput && phoneInput && interestInput) {
  [fullNameInput, emailInput, phoneInput, interestInput].forEach((input) => {
    input.addEventListener("input", updateSubmitButton);
    input.addEventListener("change", updateSubmitButton);
  });
}
function resetAppointmentSelection() {
  selectedDate = null;
  selectedTime = null;
  appointmentConfirmed = false;

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
        appointmentConfirmed = false;

        updateSubmitButton();
        

        timeButtons.forEach((button) => {
          button.classList.remove("selectedTime");
        });

        appointmentMessage.textContent = "";
        appointmentMessage.classList.remove("error", "success");

        // console.log("Selected date:", selectedDate);
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
      appointmentConfirmed = false;

      appointmentMessage.textContent = "";
      appointmentMessage.classList.remove("error", "success");

      updateSubmitButton();
    
    });
  });

  bookAppointmentBtn.addEventListener("click", () => {
    if (!selectedDate || !selectedTime) {
      appointmentMessage.textContent = "Please select an available date and time.";
      appointmentMessage.classList.add("error");
      appointmentMessage.classList.remove("success");
      return;
    }
    
    appointmentConfirmed = true;

    updateSubmitButton();

    const appointmentData = {
      year: selectedDate.year,
      month: selectedDate.month + 1,
      day: selectedDate.day,
      time: selectedTime
    };
    
    appointmentMessage.innerHTML =
      `Preferred time selected: ${appointmentData.month}/${appointmentData.day}/${appointmentData.year} at ${appointmentData.time}. <br><br>
      Complete the form and click <strong>"Send Tour Request"</strong>`;

    appointmentMessage.classList.add("success");
    appointmentMessage.classList.remove("error");

    // console.log(appointmentData);
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


////////////////////// CONTACT FORM SECTION////////////
const contactForm = document.querySelector(".contactForm");
const formMessage = document.querySelector(".formMessage");

function submitContactRequest(contactData, messageElement, formElement) {

  fetch("http://127.0.0.1:5001/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(contactData)
  })
  .then((response) => {
    return response.json().then((data) => {
      if (response.ok) {
        messageElement.textContent = data.message;
        messageElement.classList.add("success");
        messageElement.classList.remove("error");
        formElement.reset();
      } else {
        messageElement.textContent = data.message;
        messageElement.classList.add("error");
        messageElement.classList.remove("success");
      }
    });
  })
  .catch(() => {
    messageElement.textContent = "Something went wrong. Please try again.";
    messageElement.classList.add("error");
    messageElement.classList.remove("success");
  });
}

function setFormMessage(messageElement, message, type) {
  messageElement.textContent = message;
  messageElement.classList.add(type);
  messageElement.classList.remove(type === "error" ? "success" : "error");
}

function validateContactData(contactData, messageElement) {
  const allowedInterests = ["buying", "selling", "investing", "general"];

  if (!contactData.fullName || !contactData.email || !contactData.phone || !contactData.interest) {
    setFormMessage(messageElement, "Please fill out your name, email, phone number, and interest please.", "error");
    return false;
  }

  if (!allowedInterests.includes(contactData.interest)) {
    setFormMessage(messageElement, "Please Select Interest", "error");
    return false;
  }

  if (!contactData.email.includes("@")) {
    setFormMessage(messageElement, "Please enter a valid email address", "error");
    return false;
  }

  let phoneDigits = "";
  const digits = "0123456789";
  const allowedCharacters = "() -";

  for (const character of contactData.phone) {
    if (digits.includes(character)) {
      phoneDigits = phoneDigits + character;
    } else if (allowedCharacters.includes(character)) {
      // Intentionally allow common phone separators.
    } else {
      setFormMessage(messageElement, "Please Enter a Valid Phone Number", "error");
      return false;
    }
  }

  if (phoneDigits.length !== 10) {
    setFormMessage(messageElement, "Please Enter a Valid Phone Number", "error");
    return false;
  }

  if (contactData.message && contactData.message.length > 1000) {
    setFormMessage(messageElement, "Message Too Long", "error");
    return false;
  }

  return true;
}

if (contactForm && formMessage) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const fullName = document.querySelector("#fullName").value.trim();
    const email = document.querySelector("#email").value.trim();
    const phone = document.querySelector("#phone").value.trim();
    const interest = document.querySelector("#interest").value;
    const message = document.querySelector("#message").value.trim();
    

    const allowedInterests = ["buying", "selling", "investing", "general"];
    

    if (!fullName || !email || !phone || !interest) {
      formMessage.textContent = "Please fill out your name, email, phone number, and interest please.";
      formMessage.classList.add("error");
      formMessage.classList.remove("success");
      return;
    } 
    
    if (intent == "tour" && (!selectedDate || !selectedTime || !appointmentConfirmed)) {
      formMessage.textContent =
      "Please Select a Preferred Tour Date and Time"
      
      formMessage.classList.add("error");
      formMessage.classList.remove("success");
      return;  
    }

    if (!allowedInterests.includes(interest)) {
      formMessage.textContent = "Please Select Interest";
      formMessage.classList.add("error");
      formMessage.classList.remove("success");
      return;
    }
    const preferredDate = selectedDate
    ? `${selectedDate.year}-${String(selectedDate.month + 1).padStart(2,"0")}-${String(selectedDate.day).padStart(2,"0")}`
    :"";
    const preferredTime = selectedTime || "";
    
    if (!email.includes("@")) {
      formMessage.textContent = "Please enter a valid email address"
      formMessage.classList.add("error");
      formMessage.classList.remove("success");
      return;
    }

    let phoneDigits = "";
    const digits = "0123456789";
    const allowedCharacters = "() -";

    for (const character of phone) {
      if (digits.includes(character)) {
        phoneDigits = phoneDigits + character;
      }
      else if (allowedCharacters.includes(character)) {
        // intntionally empty to run next piece and to allow characters
      } else {
        formMessage.textContent = "Please Enter a Valid Phone Number";
          formMessage.classList.add("error");
          formMessage.classList.remove("success");
          return;
      }
    }
        if (phoneDigits.length !== 10) {
          formMessage.textContent = "Please Enter a Valid Phone Number";
          formMessage.classList.add("error");
          formMessage.classList.remove("success");
          return
      }

      if (message && message.length > 1000) {
        formMessage.textContent = "Message Too Long";
          formMessage.classList.add("error");
          formMessage.classList.remove("success");
          return
      }

    const contactData = {
      fullName,
      email,
      phone,
      interest,
      message,
      listingId:  listingId || "",
      intent: intent || "",
      listingPrice: selectedListing ? selectedListing.price : "",
      listingCity: selectedListing ? selectedListing.city : "",
      listingAddress: selectedListing ? selectedListing.address : "",

      preferredDate,
      preferredTime
    };
    console.log(contactData);
    submitContactRequest(
      contactData,
      formMessage,
      contactForm
    );
  });
  }
  // Modal
const modal = document.querySelector("#contactModal");
const modalForm = document.querySelector(".modalForm");
const modalFormMessage = document.querySelector(".modalFormMessage");

const openModalBtns = document.querySelectorAll("[data-open-modal]");
const closeModalBtns = document.querySelectorAll("[data-close-modal]");

if (modal) {

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
}
  if (modalForm && modalFormMessage) {
    modalForm.addEventListener("submit", (event) => {
      event.preventDefault();
      
      const fullName = modalForm
      .querySelector('[name="fullName"]')
      .value
      .trim();
      
      const phone = modalForm
      .querySelector('[name="phone"]')
      .value
      .trim();
      
      const email = modalForm
      .querySelector('[name="email"]')
      .value
      .trim();
      
      const interest = modalForm
      .querySelector('[name="interest"]')
      .value
      .trim();
      
      const message = modalForm
      .querySelector('[name="message"]')
      .value
      .trim();
      const modalContactData = {
        fullName,
        phone,
        email,
        interest,
        message,
      
        listingId: "",
        intent: "",
        listingPrice: "",
        listingCity: "",
        listingAddress: ""
      };
      console.log(modalContactData);

      if (!validateContactData(modalContactData, modalFormMessage)) {
        return;
      }

      submitContactRequest(
        modalContactData,
        modalFormMessage,
        modalForm
      );
    });
  }




// >>>>>>>>>>MODAL FOR LISTINGS PAGE>>>>>>>>>>


const listingData = {
  "horace-st": {
    id: "horace-st",
    price: "$959,000",
    address: "15708 Horace St",
    city: "Granada Hills, CA 91344",
    beds: "3",
    baths: "2",
    sqft: "1,400",
    year: "-",
    status: "For Sale",
    heroImage: "assets/images/listings/15708 Horace/horace front view.webp",
    heroPosition: "center 45%",
    heroSize: "95%",
    images: ["assets/images/listings/15708 Horace/15708 Horace Listing.webp",
      "assets/images/listings/15708 Horace/15708 Horace Kitchen.webp",
      "assets/images/listings/15708 Horace/15708 Kitchen 2.webp",
      "assets/images/listings/15708 Horace/Horace Kitchen 3.webp",
      "assets/images/listings/15708 Horace/15708 Horace St Living Room.webp",
      "assets/images/listings/15708 Horace/1508 Horace Den.webp",
      "assets/images/listings/15708 Horace/15708 Horace Lroom 2.webp",
      "assets/images/listings/15708 Horace/15708 Horace Bathroom 1.webp",
      "assets/images/listings/15708 Horace/Horace Bathroom 2.webp",
      "assets/images/listings/15708 Horace/horace bedroom 1.webp",
      "assets/images/listings/15708 Horace/horace bedroom 1 of 2.webp",
      "assets/images/listings/15708 Horace/horace bedroom 2 of 1.webp",
      "assets/images/listings/15708 Horace/horace bedroom 2 of 2.webp",
      "assets/images/listings/15708 Horace/horace bedroom 3 of 1.webp",
      "assets/images/listings/15708 Horace/horace bedroom 3 of 2.webp",
      "assets/images/listings/15708 Horace/horace bathroom 2 of 1.webp",
      "assets/images/listings/15708 Horace/horace bathroom 2 of 2.webp",
      "assets/images/listings/15708 Horace/horace backyard 1 of 2.webp",
      "assets/images/listings/15708 Horace/horace backyard 2 of 2.webp",
      "assets/images/listings/15708 Horace/Horace Backyard.webp",
      "assets/images/listings/15708 Horace/horace front view.webp",
      "assets/images/listings/15708 Horace/horace street view.webp",
      "assets/images/listings/15708 Horace/horace front street view.webp"
    ],
    description: "Updated Granada Hills home with pool, privacy, and major upgrades! This move-in-ready 3-bedroom, 2-bathroom home features high-value improvements including NEW plumbing, flooring, and a beautifully remodeled bathroom. Enjoy great curb appeal with low-maintenance artificial turf in the front yard, plus added privacy and safety with new redwood fencing and a secure pool enclosure. Inside, the home offers an open, sun-filled living space, while the backyard is perfect for entertaining and summer gatherings. Ideally located on a quiet street, this home is commuter-friendly with easy access to the 118, 405, and 5 freeways. Conveniently close to Brand Park, the San Fernando Mission Museum, shopping, dining, and more. Situated near well-regarded schools including Haskell Elementary and John F. Kennedy High School. This home offers the perfect balance of comfort, privacy, and convenience--a true move-in-ready gem you won't want to miss!",
    highlights: [
      "Has fireplace",
      "Has Cooling",
      "Includes, Gas Oven, Gas Range, Microwave",
      "Pool In Ground",
      "Move in Ready!"
    ]
  },
  "persimmon-ln": {
    id: "persimmon-ln",
    price: "$569,900",
    address: "37633 Persimmon Ln",
    city: "Palmdale, CA 93551",
    beds: "4",
    baths: "3",
    sqft: "2,691",
    year: "2005",
    status: "For Sale",
    heroImage: "assets/images/listings/37633 Persimmons/aerial view  3.webp",
    heroPosition: "center 25%",
    heroSize: "100%",
    images: ["assets/images/listings/37633 Persimmons/37633 Persimmos Ln.webp",
      "assets/images/listings/37633 Persimmons/persimmons living room 1 of 2 .webp",
      "assets/images/listings/37633 Persimmons/persimmons living room 2 of 2.webp",
      "assets/images/listings/37633 Persimmons/persimmons room 1.webp",
      "assets/images/listings/37633 Persimmons/persimmons bath 1.webp",
      "assets/images/listings/37633 Persimmons/persimonns den 1 of 2.webp",
      "assets/images/listings/37633 Persimmons/persimmons living room 2 of 3.webp",
      "assets/images/listings/37633 Persimmons/persimmons living room 3 of 3.webp",
      "assets/images/listings/37633 Persimmons/persimmons kitchen 1 of 3.webp",
      "assets/images/listings/37633 Persimmons/persimmons kitchen 2 of 3.webp",
      "assets/images/listings/37633 Persimmons/persimmons kitchen 3 of 3 .webp",
      "assets/images/listings/37633 Persimmons/persimmons upstairs den 2 of 3 .webp",
      "assets/images/listings/37633 Persimmons/persimmons upstairs den 1 of 3 .webp",
      "assets/images/listings/37633 Persimmons/persimmons upstairs den 3 of 3.webp",
      "assets/images/listings/37633 Persimmons/persimmons bedroom 2 first image.webp",
      "assets/images/listings/37633 Persimmons/persimmons bedroom 2 second image.webp",
      "assets/images/listings/37633 Persimmons/persimmons bed 2  third image.webp",
      "assets/images/listings/37633 Persimmons/persimmons bathroom 2 first image.webp",
      "assets/images/listings/37633 Persimmons/persimmons bathroom 2 second image.webp",
      "assets/images/listings/37633 Persimmons/persimmons bathroom 2 third image.webp",
      "assets/images/listings/37633 Persimmons/persimmons closet in bathroom 2.webp",
      "assets/images/listings/37633 Persimmons/persimmons closet in bathroom 2 second image.webp",
      "assets/images/listings/37633 Persimmons/bedroom 3 img 1.webp",
      "assets/images/listings/37633 Persimmons/bedroom 3 img 2.webp",
      "assets/images/listings/37633 Persimmons/bathroom 3.webp",
      "assets/images/listings/37633 Persimmons/bedroom 4 img 1.webp",
      "assets/images/listings/37633 Persimmons/bedroom 4 img 2.webp",
      "assets/images/listings/37633 Persimmons/laundry 1 .webp",
      "assets/images/listings/37633 Persimmons/outside patio.webp",
      "assets/images/listings/37633 Persimmons/backyard view 1.webp",
      "assets/images/listings/37633 Persimmons/backyard view 2.webp",
      "assets/images/listings/37633 Persimmons/backyard view 3.webp",
      "assets/images/listings/37633 Persimmons/backyard view 4.webp",
      "assets/images/listings/37633 Persimmons/backyard pergola.webp",
      "assets/images/listings/37633 Persimmons/aerial view 1.webp",
      "assets/images/listings/37633 Persimmons/aerial view 2.webp",
      "assets/images/listings/37633 Persimmons/aerial view  3.webp",
      "assets/images/listings/37633 Persimmons/aerial view 4.webp"
    ],
    description: "Welcome to this beautiful West Palmdale home located in the highly desirable Anaverde Community. Situated on a quiet cul-de-sac, this spacious residence offers comfortable living with an open floor plan, generous living areas, and a family-friendly layout. Residents enjoy access to scenic neighborhood parks, playgrounds, walking and biking trails, and the highly regarded Anaverde Hills School, located nearby. The Anaverde community is known for its welcoming atmosphere, beautiful mountain views, and abundance of outdoor recreation opportunities. Conveniently located near shopping, dining, and commuter routes, this home combines suburban tranquility with everyday convenience. Experience the lifestyle that has made Anaverde one of West Palmdale's most sought-after neighborhoods.",
    highlights: [
      "Has fireplace",
      "Has Cooling",
      "Includes, Dishwasher, Gas Oven, Microwave",
      "2 Stories",
      "Move in Ready!"
    ]
  },

  "center-ct": {
    id: "center-ct",
    price: "$549,900",
    address: "1629 Centre Ct",
    city: "Palmdale, CA 93551",
    beds: "4",
    baths: "3",
    sqft: "1,941",
    year: "1987",
    status: "For Sale",
    heroImage: "assets/images/listings/1629 Centre Ct/centre ct-27.webp",
    heroPosition: "center 35%",
    heroSize: "100%",
    images: ["assets/images/listings/1629 Centre Ct/1629 Centre Ct.webp",
      "assets/images/listings/1629 Centre Ct/centre ct-01.webp",
      "assets/images/listings/1629 Centre Ct/centre ct-02.webp",
      "assets/images/listings/1629 Centre Ct/centre ct-03.webp",
      "assets/images/listings/1629 Centre Ct/centre ct-04.webp",
      "assets/images/listings/1629 Centre Ct/centre ct-05.webp",
      "assets/images/listings/1629 Centre Ct/centre ct-06.webp",
      "assets/images/listings/1629 Centre Ct/centre ct-07.webp",
      "assets/images/listings/1629 Centre Ct/centre ct-08.webp",
      "assets/images/listings/1629 Centre Ct/centre ct-09.webp",
      "assets/images/listings/1629 Centre Ct/centre ct-10.webp",
      "assets/images/listings/1629 Centre Ct/centre ct-11.webp",
      "assets/images/listings/1629 Centre Ct/centre ct-12.webp",
      "assets/images/listings/1629 Centre Ct/centre ct-13.webp",
      "assets/images/listings/1629 Centre Ct/centre ct-14.webp",
      "assets/images/listings/1629 Centre Ct/centre ct-15.webp",
      "assets/images/listings/1629 Centre Ct/centre ct-16.webp",
      "assets/images/listings/1629 Centre Ct/centre ct-17.webp",
      "assets/images/listings/1629 Centre Ct/centre ct-18.webp",
      "assets/images/listings/1629 Centre Ct/centre ct-19.webp",
      "assets/images/listings/1629 Centre Ct/centre ct-20.webp",
      "assets/images/listings/1629 Centre Ct/centre ct-21.webp",
      "assets/images/listings/1629 Centre Ct/centre ct-22.webp",
      "assets/images/listings/1629 Centre Ct/centre ct-23.webp",
      "assets/images/listings/1629 Centre Ct/centre ct-24.webp",
      "assets/images/listings/1629 Centre Ct/centre ct-25.webp",
      "assets/images/listings/1629 Centre Ct/centre ct-26.webp",
      "assets/images/listings/1629 Centre Ct/centre ct-27.webp",
      "assets/images/listings/1629 Centre Ct/centre ct-28.webp",
      "assets/images/listings/1629 Centre Ct/centre ct-29.webp"

    ],
    description: "Welcome to this beautifully maintained home where comfort, style, and outdoor living come together. From the moment you step inside, you'll be captivated by soaring ceilings, abundant natural light, and an inviting floor plan designed for both everyday living and entertaining. The updated kitchen is the heart of the home, featuring gorgeous granite countertops, crisp white cabinetry, stainless steel appliances, ample prep space, and a seamless flow into the dining and living areas. The spacious primary suite offers a peaceful retreat with generous windows, an ensuite bath, and plenty of room to unwind after a long day. Step outside to your own private backyard oasis complete with a sparkling pool and spa, covered patio, and mature landscaping that creates the perfect setting for summer gatherings, weekend barbecues, or simply relaxing in your own slice of paradise.",
    highlights: [
      "Pool and Spa",
      "Abundant Natural Light",
      "Includes, Dishwasher, Refrigerator, Trash Compactor",
      "2 Stories",
      "Move in Ready!"
    ]
  },

  "joshua-hills": {
    id: "joshua-hills",
    price: "$519,999",
    address: "2614 Joshua Hills Dr",
    city: "Palmdale, CA 93550",
    beds: "3",
    baths: "2",
    sqft: "1,434",
    year: "1980",
    status: "For Sale",
    heroImage: "assets/images/listings/2614 Joshua Hills/joshua-hills-04.webp",
    heroPosition: "center 70%",
    heroSize: "100%",
    images: ["assets/images/listings/2614 Joshua Hills/finalhome.webp",
      "assets/images/listings/2614 Joshua Hills/joshua-hills-01.webp",
      "assets/images/listings/2614 Joshua Hills/joshua-hills-02.webp",
      "assets/images/listings/2614 Joshua Hills/joshua-hills-03.webp",
      "assets/images/listings/2614 Joshua Hills/joshua-hills-04.webp",
      "assets/images/listings/2614 Joshua Hills/joshua-hills-05.webp",
      "assets/images/listings/2614 Joshua Hills/joshua-hills-06.webp",
      "assets/images/listings/2614 Joshua Hills/joshua-hills-07.webp",
      "assets/images/listings/2614 Joshua Hills/joshua-hills-08.webp",
      "assets/images/listings/2614 Joshua Hills/joshua-hills-09.webp",
      "assets/images/listings/2614 Joshua Hills/joshua-hills-10.webp",
      "assets/images/listings/2614 Joshua Hills/joshua-hills-11.webp",
      "assets/images/listings/2614 Joshua Hills/joshua-hills-12.webp",
      "assets/images/listings/2614 Joshua Hills/joshua-hills-13.webp",
      "assets/images/listings/2614 Joshua Hills/joshua-hills-14.webp",
      "assets/images/listings/2614 Joshua Hills/joshua-hills-15.webp",
      "assets/images/listings/2614 Joshua Hills/joshua-hills-16.webp",
      "assets/images/listings/2614 Joshua Hills/joshua-hills-17.webp",
      "assets/images/listings/2614 Joshua Hills/joshua-hills-18.webp"

    ],
    description: "Tucked on a spacious corner lot, this renovated home welcomes you with the kind of warmth that instantly makes everyday life feel a little slower and more enjoyable. Mornings begin with sunlight pouring through refreshed interiors, while the thoughtfully redesigned living spaces create an easy flow from room to room, balancing comfort with modern style across 1,434 square feet. With 3 bedrooms and 2 bathrooms, the home feels both intimate and functional, offering spaces that work just as well for quiet evenings as they do for lively weekends with friends and family. Beyond the front door, the story continues outdoors where over $35,000 in backyard upgrades have transformed the space into a private escape. As the sun sets, the gas firepit becomes the heart of the yard, creating the perfect setting for late-night conversations, weekend gatherings, or peaceful moments under the open sky. The corner lot provides an added sense of openness, while RV access brings flexibility for travel, recreation, or extra storage. Solar adds efficiency to everyday living, complementing the extensive interior and exterior renovations that give the entire property a polished yet welcoming feel. Every detail has been carefully considered to create a home that feels less like a listing and more like the beginning of a new chapter.",
    highlights: [
      "Laundry in Unit",
      "Has Cooling",
      "Includes, Dishwasher, Refrigerator, Gas Oven",
      "1 Story",
      "Move in Ready!"
    ]
  },

  "danya-ln": {
    id: "danya-ln",
    price: "$460,000",
    address: "44237 Danya Ln",
    city: "Lancaster, CA 93536",
    beds: "3",
    baths: "3",
    sqft: "1,529",
    year: "1986",
    status: "For Sale",
    heroImage: "assets/images/listings/44237 Danya Ln/44237 Danya Ln Listing.webp",
    heroPosition: "center 40%",
    heroSize: "100%",
    images: ["assets/images/listings/44237 Danya Ln/44237 Danya Ln Listing.webp",
      "assets/images/listings/44237 Danya Ln/danya-ln-01.webp",
      "assets/images/listings/44237 Danya Ln/danya-ln-02.webp",
      "assets/images/listings/44237 Danya Ln/danya-ln-03.webp",
      "assets/images/listings/44237 Danya Ln/danya-ln-04.webp",
      "assets/images/listings/44237 Danya Ln/danya-ln-05.webp",
      "assets/images/listings/44237 Danya Ln/danya-ln-06.webp",
      "assets/images/listings/44237 Danya Ln/danya-ln-07.webp",
      "assets/images/listings/44237 Danya Ln/danya-ln-08.webp",
      "assets/images/listings/44237 Danya Ln/danya-ln-09.webp",
      "assets/images/listings/44237 Danya Ln/danya-ln-10.webp",
      "assets/images/listings/44237 Danya Ln/danya-ln-11.webp",
      "assets/images/listings/44237 Danya Ln/danya-ln-12.webp",
      "assets/images/listings/44237 Danya Ln/danya-ln-13.webp",
      "assets/images/listings/44237 Danya Ln/danya-ln-14.webp",
      "assets/images/listings/44237 Danya Ln/danya-ln-15.webp",
      "assets/images/listings/44237 Danya Ln/danya-ln-16.webp",
      "assets/images/listings/44237 Danya Ln/danya-ln-17.webp",
      "assets/images/listings/44237 Danya Ln/danya-ln-18.webp",
      "assets/images/listings/44237 Danya Ln/danya-ln-19.webp",
      "assets/images/listings/44237 Danya Ln/danya-ln-20.webp",
      "assets/images/listings/44237 Danya Ln/danya-ln-21.webp"

    ],
    description: "Welcome to this beautifully updated home in one of West Lancaster's desirable neighborhoods, where thoughtful upgrades and modern finishes create a space that's truly move-in ready. Step inside to discover updated flooring throughout, complemented by elegant quartz countertops featured throughout the home for a clean, cohesive look. The home has been enhanced with recessed lighting and updated light fixtures, creating a bright and inviting atmosphere in every room. Major system improvements include a new A/C and furnace installed in 2022, providing year-round comfort and peace of mind. Outside, you'll appreciate the spacious 2½-car garage, offering plenty of room for vehicles, storage, a workshop, or recreational equipment. With tasteful upgrades already completed and pride of ownership evident throughout, this home is ready for its next owner to move in and enjoy.",
    highlights: [
      "Laundry in Unit",
      "Has Cooling",
      "Includes, Dishwasher, Refrigerator, Gas Oven",
      "2 Stories",
      "Move in Ready!"
    ]
  },

  "bay-ave": {
    id: "bay-ave",
    price: "$239,900",
    address: "8736 Bay Ave",
    city: "California City, CA 93505",
    beds: "3",
    baths: "2",
    sqft: "1,250",
    year: "1972",
    status: "Pending",
    heroImage: "assets/images/listings/8736 Bay Ave/bay-ave-01.webp",
    heroPosition: "center 25%%",
    heroSize: "85%",
    images: ["assets/images/listings/8736 Bay Ave/bay-ave-01.webp",
      "assets/images/listings/8736 Bay Ave/bay-ave-02.webp",
      "assets/images/listings/8736 Bay Ave/bay-ave-03.webp",
      "assets/images/listings/8736 Bay Ave/bay-ave-04.webp",
      "assets/images/listings/8736 Bay Ave/bay-ave-05.webp",
      "assets/images/listings/8736 Bay Ave/bay-ave-06.webp",
      "assets/images/listings/8736 Bay Ave/bay-ave-07.webp",
      "assets/images/listings/8736 Bay Ave/bay-ave-08.webp",
      "assets/images/listings/8736 Bay Ave/bay-ave-09.webp",
      "assets/images/listings/8736 Bay Ave/bay-ave-10.webp",
      "assets/images/listings/8736 Bay Ave/bay-ave-11.webp",
      "assets/images/listings/8736 Bay Ave/bay-ave-12.webp",
      "assets/images/listings/8736 Bay Ave/bay-ave-13.webp"
    ],
    description: "Welcome to this well-maintained 3-bedroom, 2-bathroom home offering approximately 1,250 sq ft of comfortable living space. Situated on a spacious 9,583 sq ft lot, this property provides plenty of room for outdoor use, storage, or future possibilities. The home has been cared for over the years and presents a great opportunity for a buyer to move in as-is or gradually update to their personal taste. The large lot features two generously sized sheds/workshops, ideal for hobbies, storage, or workspace needs. Equipped with solar for energy efficiency, this property offers added value and long-term utility savings. Conveniently located with easy access to main roads, this home is a solid option for buyers looking for space, functionality, and potential.",
    highlights: [
      "Laundry in Unit",
      "Has Cooling",
      "Includes, Dishwasher, Refrigerator, Gas Oven",
      "1 Story",
      "Move in Ready!"
    ]
  },
};

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

const listingModal = document.querySelector("#listingModal");
const closeListingModalBtns = document.querySelectorAll("[data-close-listing-modal]");

const modalImageWrap = document.querySelector(".listingModalImageWrap")
const galleryPrev = document.querySelector(".galleryPrev");
const galleryNext = document.querySelector(".galleryNext");
const galleryCurrent = document.querySelector(".galleryCurrent");
const galleryTotal = document.querySelector(".galleryTotal");

const descriptionToggleBtn = document.querySelector(".descriptionToggleBtn");
const descriptionToggleText = document.querySelector(".descriptionToggleBtn span");


if (listingModal) {

  listingCards.forEach((card) => {
    card.addEventListener("click", () => {
      const listingId = card.dataset.listingId;
      const listing = listingData[listingId];

      if (!listing) {
        return;
      }

      activeListing = listing;
      activeListingId = listingId;
      currentImageIndex = 0;


      console.log(listingId);
      console.log(listing);
      modalPrice.textContent = listing.price;
      modalAddress.textContent = `${listing.address}, ${listing.city}`;
      modalBeds.textContent = listing.beds;
      modalBaths.textContent = listing.baths;
      modalSqft.textContent = listing.sqft;
      modalYear.textContent = listing.year;
      modalStatus.textContent = listing.status;

      descriptionExpanded = false;
      activeDescription = listing.description;

      activeShortDescription =
        listing.description.length > 150
          ? `${listing.description.slice(0, 150)}...`
          : listing.description

      modalDescription.textContent = activeShortDescription;

      descriptionToggleBtn.hidden = listing.description.length <= 150;
      descriptionToggleText.textContent = "Read More";
      descriptionToggleBtn.classList.remove("expanded");

      modalHighlights.innerHTML = "";

      listing.highlights.forEach((highlight) => {
        const li = document.createElement("li");
        li.textContent = highlight;
        modalHighlights.appendChild(li);
      });

      updateGalleryImage();
      modalImage.alt = listing.address;

      listingModal.classList.add("active");

    });
  });

  let currentImageIndex = 0;
  let activeListing = null;

  let descriptionExpanded = false;
  let activeDescription = "";
  let activeShortDescription = "";

  let touchStartX = 0;
  let touchEndX = 0;

  if (descriptionToggleBtn) {
    descriptionToggleBtn.addEventListener("click", () => {
      descriptionExpanded = !descriptionExpanded;

      if (descriptionExpanded) {
        modalDescription.textContent = activeDescription;
        descriptionToggleText.textContent = "Show Less";
        descriptionToggleBtn.classList.add("expanded");
      }
      else {
        modalDescription.textContent = activeShortDescription;
        descriptionToggleText.textContent = "Read More"
        descriptionToggleBtn.classList.remove("expanded");
      };
    });
  }

  closeListingModalBtns.forEach((button) => {
    button.addEventListener("click", () => {
      listingModal.classList.remove("active");
    });


  });


  function updateGalleryImage() {
    if (!activeListing) {
      return;
    }

    modalImage.src = activeListing.images[currentImageIndex];
    galleryCurrent.textContent = currentImageIndex + 1;
    galleryTotal.textContent = activeListing.images.length;
  }

  function showNextImage() {
    if (!activeListing) {
      return;
    }

    currentImageIndex = currentImageIndex + 1;

    if (currentImageIndex >= activeListing.images.length) {
      currentImageIndex = 0;
    }

    updateGalleryImage();
  }

  function showPrevImage() {
    if (!activeListing) {
      return;
    }

    currentImageIndex = currentImageIndex - 1;

    if (currentImageIndex < 0) {
      currentImageIndex = activeListing.images.length - 1;
    }

    updateGalleryImage();
  }

  galleryNext.addEventListener("click", showNextImage);
  galleryPrev.addEventListener("click", showPrevImage);

  modalImageWrap.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0].screenX;
    console.log("start:", touchStartX);
  });


  modalImageWrap.addEventListener("touchend", (event) => {
    touchEndX = event.changedTouches[0].screenX;

    const swipeDistance = touchStartX - touchEndX;
    const minimumSwipeDistance = 50;
    if (swipeDistance > minimumSwipeDistance) {
      showNextImage();
    }

    if (swipeDistance < -minimumSwipeDistance) {
      showPrevImage();
    }
    console.log("end:", touchEndX);
  });


  const listingInterestBtn = document.querySelector(".listingInterestBtn");
  const listingTourBtn = document.querySelector(".listingTourBtn");

  let activeListingId = null;


  listingInterestBtn.addEventListener("click", (event) => {
    event.preventDefault();
    if (!activeListing || !activeListingId) {
      return;
    }

    const encodedListingId = encodeURIComponent(activeListingId);

    window.location.href =
      `contact.html?listing=${encodedListingId}&intent=interest#requestInformationSection`;
  });

  listingTourBtn.addEventListener("click", (event) => {
    event.preventDefault();
    if (!activeListing || !activeListingId) {
      return;
    }
    const encodedListingId = encodeURIComponent(activeListingId);

    window.location.href =
      `contact.html?listing=${encodedListingId}&intent=tour#calendarSection`;
  });
}

const contactFormHeading = document.querySelector(".contactFormHeading");
const selectedPropertyPreview = document.querySelector(".selectedPropertyPreview");
const selectedPropertyImage = document.querySelector(".selectedPropertyImage");
const selectedPropertyAddress = document.querySelector(".selectedPropertyAddress");
const selectedPropertyCity = document.querySelector(".selectedPropertyCity");
const selectedPropertyBeds = document.querySelector(".selectedPropertyBeds");
const selectedPropertyBaths = document.querySelector(".selectedPropertyBaths");
const selectedPropertySqft = document.querySelector(".selectedPropertySqft");
const selectedPropertyPrice = document.querySelector(".selectedPropertyPrice");

const tourCalendarSection = document.querySelector(".tourCalendarSection");
const listingIdInput = document.querySelector(".listingIdInput");
const intentInput = document.querySelector(".intentInput");

const contactHero = document.querySelector(".contactHero");
const openCalendarBtn = document.querySelector(".openCalendarBtn");

const params = new URLSearchParams(window.location.search);

const listingId = params.get("listing");
const intent = params.get("intent");

const selectedListing = listingId ? listingData[listingId] : null;

if (listingIdInput) {
  listingIdInput.value = listingId || "";
}
if (intentInput) {
  intentInput.value = intent || "";
}
if (contactFormHeading) {
  

  console.log(listingId);
  console.log(intent);
  console.log(selectedListing);
  
  if (!listingId || !selectedListing) {
    selectedPropertyPreview.hidden = true;
    tourCalendarSection.hidden = true;
    contactFormHeading.textContent = "Send Me a Message";
  }
  
  else {
    
    selectedPropertyPreview.hidden = false;
    selectedPropertyImage.src = selectedListing.images[0];
    selectedPropertyImage.alt = selectedListing.address;
    selectedPropertyAddress.textContent = selectedListing.address;
    selectedPropertyCity.textContent = selectedListing.city;
    selectedPropertyBeds.textContent = `${selectedListing.beds} Beds`;
    selectedPropertyBaths.textContent = `${selectedListing.baths} Baths`;
    selectedPropertySqft.textContent = `${selectedListing.sqft} Sq Ft`;
    selectedPropertyPrice.textContent = selectedListing.price;
    
    if (contactHero && selectedListing.images.length > 0) {
      contactHero.style.backgroundImage =
      `url("${selectedListing.heroImage || selectedListing.images[0]}")`;
      
      contactHero.style.backgroundPosition =
      selectedListing.heroPosition || "center center";
      
      contactHero.style.backgroundSize =
      selectedListing.heroSize || "cover";
    }
    
    if (intent === "tour") {
      contactFormHeading.textContent = "Schedule a Private Tour";
      tourCalendarSection.hidden = false;
    }
    else {
      contactFormHeading.textContent = "Request Information";
      tourCalendarSection.hidden = true;
    }
  }
  if (openCalendarBtn && tourCalendarSection) {
    openCalendarBtn.addEventListener("click", () => {
      tourCalendarSection.hidden = !tourCalendarSection.hidden;
    });
  }
}
    




///////////////?REVIEWS SECTION//////////////
const featuredReviews = [
  {
    quote: "“Nick made the entire process stress free and helped us find the perfect home for our family. He truly cares about his clients!”",
    name: "Diaz Family",
    location: "Sylmar, CA",
    rating: 5,
    image: "assets/images/clients/happyclient3.webp",
  },
  {
    quote: "“Professional, responsive, and knowledgeable. The best realtor we’ve worked with.”",
    name: "Lopez Family",
    location: "Palmdale, CA",
    rating: 5,
    image: "assets/images/clients/happyclient2.webp",
  },
  {
    quote: "“Nick helped us sell our home quickly and for top dollar. We couldn’t be happier.”",
    name: "Cardenas Family",
    location: "Palmdale, CA",
    rating: 5,
    image: "assets/images/clients/happyclient1.webp",
  }
]
console.log(featuredReviews[0].quote);
console.log(featuredReviews[1].name);


const featuredReviewImg = document.querySelector(".featuredReviewImg");
const featuredReviewQuote = document.querySelector(".featuredReviewQuote");
const featuredReviewName = document.querySelector(".featuredReviewName");
const featuredReviewLocation = document.querySelector(".featuredReviewLocation");
const featuredReviewRating = document.querySelector(".featuredReviewRating");
const featuredReviewDots = document.querySelector(".featuredReviewDots");

if (featuredReviewImg && featuredReviewQuote && featuredReviewName) {
  let currentFeaturedReviewIndex = 0;
  let featuredReviewTimer;
  const featuredReviewDuration = 7000;

  function showFeaturedReview(index) {
    const featuredReview = featuredReviews[index];

    featuredReviewImg.src = featuredReview.image;
    featuredReviewImg.alt = `${featuredReview.name} review`

    featuredReviewQuote.textContent = featuredReview.quote;
    featuredReviewName.textContent = featuredReview.name;
    featuredReviewLocation.textContent = featuredReview.location;

    featuredReviewRating.innerHTML = "";
    for (let i = 0; i < featuredReview.rating; i++) {
      const star = document.createElement("i");
      star.classList.add("fa-solid", "fa-star");
      featuredReviewRating.appendChild(star);
    }
    currentFeaturedReviewIndex = index;
    const dots = featuredReviewDots.querySelectorAll(".featuredReviewDot")

    dots.forEach((dot) => {
      dot.classList.remove("active");
    });
    if (dots[index]) {
      dots[index].classList.add("active");
    }
  }
  function showNextFeaturedReview() {
    currentFeaturedReviewIndex++;

    if (currentFeaturedReviewIndex >= featuredReviews.length) {
      currentFeaturedReviewIndex = 0;
    }
    showFeaturedReview(currentFeaturedReviewIndex);
  }
  function showPrevFeaturedReview() {
    currentFeaturedReviewIndex--;

    if (currentFeaturedReviewIndex < 0) {
      currentFeaturedReviewIndex = featuredReviews.length - 1;
    }
    showFeaturedReview(currentFeaturedReviewIndex);
  }
  function createReviewDots() {
    featuredReviewDots.innerHTML = "";

    featuredReviews.forEach((featuredReview, index) => {
      const dot = document.createElement("button");

      dot.type = "button";
      dot.classList.add("featuredReviewDot")

      dot.addEventListener("click", () => {
        showFeaturedReview(index);
        resetFeatureReviewTimer();
      });
      featuredReviewDots.appendChild(dot);
    });
  }
  function startFeatureReviewTimer() {
    featuredReviewTimer = setInterval(showNextFeaturedReview, featuredReviewDuration);
  }
  function resetFeatureReviewTimer() {
    clearInterval(featuredReviewTimer);
    startFeatureReviewTimer();
  }

  createReviewDots();
  showFeaturedReview(0);
  startFeatureReviewTimer();


}
updateSubmitButton();
