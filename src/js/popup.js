const btnRoom = document.querySelector(".date_select_bar_option_btn.room");
const btnGuest = document.querySelector(".date_select_bar_option_btn.guest");
const btnSpecialRate = document.querySelector(
  ".date_select_bar_option_btn.specialrate"
);

const popup = document.querySelectorAll(".popup");
const popupRoom = document.querySelector(".pop_room");
const popupGuest = document.querySelector(".pop_guest");
const popupSpecialRate = document.querySelector(".pop_specialrate");

const closeBtn = document.querySelectorAll(".popup_close");

// open popup

btnRoom.addEventListener("click", function () {
  popupRoom.classList.add("on");
});
btnGuest.addEventListener("click", function () {
  popupGuest.classList.add("on");
});
btnSpecialRate.addEventListener("click", function () {
  popupSpecialRate.classList.add("on");
});

//close popup

closeBtn.forEach((i) => {
  i.addEventListener("click", function () {
    this.parentNode.classList.remove("on");
  });
});

//
//
// change value
const popupForm = document.querySelectorAll(".popup_form");
const roomNumber = document.querySelector(".popup_input.room");
const roomBtnNum = document.querySelector(
  ".date_select_bar_option_btn_number_room"
);
const adultsNum = document.querySelector(".popup_input.adults");
const kidsNum = document.querySelector(".popup_input.kids");
const guestBtnNum = document.querySelector(
  ".date_select_bar_option_btn_number_guest"
);

const specialRateNumber = document.querySelectorAll(".popup_input.checkbox");
const specialRateBtnNum = document.querySelector(
  ".date_select_bar_option_btn_number_specialrate"
);

popupForm.forEach((i) => {
  i.addEventListener("submit", function (e) {
    e.preventDefault();
    if (this.name === "room") {
      addRooms();
    } else if (this.name === "guest") {
      addGuests();
    } else if (this.name === "specialrate") {
      addSpecialRates();
    }
  });
});

function addRooms() {
  const roomNumberValue = roomNumber.value;
  roomBtnNum.textContent = roomNumberValue;
  popupRoom.classList.toggle("on");
}

function addGuests() {
  const adultsNumValue = adultsNum.value;
  const kidsNumValue = kidsNum.value;

  const guestNumber = parseInt(adultsNumValue) + parseInt(kidsNumValue);

  guestBtnNum.textContent = guestNumber;

  popupGuest.classList.toggle("on");
}

function addSpecialRates() {
  let count = 0;
  specialRateBtnNum.textContent = count;
  specialRateNumber.forEach((i) => {
    if (i.checked == true) {
      count++;
      specialRateBtnNum.textContent = count;
      specialRateBtnNum.classList.add("on");
    } else if (count === 0) {
      specialRateBtnNum.classList.remove("on");
    }
  });

  popupSpecialRate.classList.toggle("on");
}
