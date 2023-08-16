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

btnRoom.addEventListener("click", function () {
  popupRoom.classList.add("on");
});
btnGuest.addEventListener("click", function () {
  popupGuest.classList.add("on");
});
btnSpecialRate.addEventListener("click", function () {
  popupSpecialRate.classList.add("on");
});

closeBtn.forEach((i) => {
  i.addEventListener("click", function () {
    this.parentNode.classList.remove("on");
  });
});

// change value
const popupForm = document.querySelector(".popup_form");
const roomNumber = document.querySelector(".popup_input.room");
const roomBtnNum = document.querySelector(
  ".date_select_bar_option_btn_number_room"
);

popupForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const roomNumberValue = roomNumber.value;
  roomBtnNum.textContent = roomNumberValue;
  popupRoom.classList.toggle("on");
});
