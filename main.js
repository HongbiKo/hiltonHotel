// main slide

const slide = document.querySelector(".slide");
const prevBtn = document.querySelector(".slide_arrow_left");
const nextBtn = document.querySelector(".slide_arrow_right");
let slideItems = document.querySelectorAll(".slide_img");
const currentIndex = document.querySelector(".current_number");
const totalIndex = document.querySelector(".total_number");

let slideWidth = slide.clientWidth;
const maxSlide = slideItems.length;
let currSlide = 1;

const startSlide = slideItems[0];
const endSlide = slideItems[slideItems.length - 1];
const startElem = document.createElement("div");
const endElem = document.createElement("div");

endSlide.classList.forEach((c) => endElem.classList.add(c));
endElem.innerHTML = endSlide.innerHTML;

startSlide.classList.forEach((c) => startElem.classList.add(c));
startElem.innerHTML = startSlide.innerHTML;

slideItems[0].before(endElem);
slideItems[slideItems.length - 1].after(startElem);

let offset = slideWidth + currSlide;
slideItems.forEach((i) => {
  i.setAttribute("style", `left: ${-offset}px`);
});

currentIndex.textContent = `0${currSlide}`;
totalIndex.textContent = `/ ${maxSlide}`;

function nextMove() {
  currSlide++;
  currentIndex.textContent = `0${currSlide}`;
  if (currSlide <= maxSlide) {
    const offset = slideWidth * currSlide;
    slideItems.forEach((i) => {
      i.setAttribute("style", `left: ${-offset}px`);
    });
  } else {
    currSlide = 0;
    let offset = slideWidth * currSlide;
    slideItems.forEach((i) => {
      i.setAttribute("style", `transition: ${0}s; left: ${-offset}px`);
    });
    currSlide++;
    currentIndex.textContent = `0${currSlide}`;
    offset = slideWidth * currSlide;
    setTimeout(() => {
      slideItems.forEach((i) => {
        i.setAttribute("style", `transition: ${0.25}s; left: ${-offset}px`);
      });
    }, 0);
  }
}

function prevMove() {
  currSlide--;
  currentIndex.textContent = `0${currSlide}`;
  if (currSlide > 0) {
    const offset = slideWidth * currSlide;
    slideItems.forEach((i) => {
      i.setAttribute("style", `left: ${-offset}px`);
    });
  } else {
    currSlide = maxSlide + 1;
    let offset = slideWidth * currSlide;
    slideItems.forEach((i) => {
      i.setAttribute("style", `transition: ${0}s; left: ${-offset}px`);
    });
    currSlide--;
    currentIndex.textContent = `0${currSlide}`;
    offset = slideWidth * currSlide;
    setTimeout(() => {
      slideItems.forEach((i) => {
        i.setAttribute("style", `transition: ${0.25}s; left: ${-offset}px`);
      });
    }, 0);
  }
}

nextBtn.addEventListener("click", () => {
  nextMove();
});

prevBtn.addEventListener("click", () => {
  prevMove();
});

window.addEventListener("resize", () => {
  slideWidth = slide.clientWidth;
  prevMove();
  nextMove();
});

let startPoint = 0;
let endPoint = 0;

slide.addEventListener("mousedown", (e) => {
  startPoint = e.pageX;
});

// pc click evenet (drag)

slide.addEventListener("mouseup", (e) => {
  endPoint = e.pageX;
  if (startPoint < endPoint) {
    // 마우스 오른쪽으로 드래그 됐을때
    prevMove();
  } else if (startPoint > endPoint) {
    // 마우스 왼쪽으로 드래그 됐을때
    nextMove();
  }
});

// mobile touch event (swipe)
slide.addEventListener("touchstart", (e) => {
  startPoint = e.touches[0].pageX;
});
slide.addEventListener("touchend", (e) => {
  endPoint = e.changedTouches[0].pageX;
  if (startPoint < endPoint) {
    prevMove();
  } else if (startPoint > endPoint) {
    nextMove();
  }
});

// auto slide
let loopInterval = setInterval(() => {
  nextMove();
}, 5000);

// mouseon -> stop loop
slide.addEventListener("mouseover", () => {
  clearInterval(loopInterval);
});

// mouseout -> start loop
slide.addEventListener("mouseout", () => {
  loopInterval = setInterval(() => {
    nextMove();
  }, 5000);
});

//
//
// navigation icon & toggle

let clickBox = document.querySelector(".check-menu");
let menuBar = document.querySelectorAll(".menu-bar");
let animateClass = ["top-bar", "middle-bar", "last-bar"];
const navigation = document.querySelector(".navigation");
const navigationList = document.querySelector(".navigation_list");

clickBox.addEventListener("click", function () {
  for (let i = 0; i < menuBar.length; i++) {
    menuBar[i].classList.toggle(animateClass[i]);
    menuBar[i].classList.toggle("color-change");
  }
  navigation.classList.toggle("on");
  navigationList.classList.toggle("on");
});

//
//
//
// headerbar color change
const header = document.querySelector(".header");
const headerBtns = document.querySelectorAll(".header_simple_menu_btn");
const headerLogo = document.querySelector(".header_logo");
const datePart = document.querySelector(".date");
const winScrollTop = window.scrollY;
const datePartStart = datePart.getBoundingClientRect().top + winScrollTop;

document.addEventListener("scroll", () => {
  if (window.scrollY > datePartStart) {
    header.classList.add("on");
    menuBar.forEach((item) => {
      item.classList.add("on");
    });
    headerBtns.forEach((item) => {
      item.classList.add("on");
    });
    headerLogo.classList.add("on");
  } else {
    header.classList.remove("on");
    menuBar.forEach((item) => {
      item.classList.remove("on");
    });
    headerBtns.forEach((item) => {
      item.classList.remove("on");
    });
    headerLogo.classList.remove("on");
  }
});

//
//
//
// hotel list drag

const list = document.querySelectorAll(".hotel_list_container");

function hotelListDrag() {
  list.forEach((list) => {
    const listScrollWidth = list.scrollWidth;
    const listClientWidth = list.clientWidth;

    let startX = 0;
    let nowX = 0;
    let endX = 0;
    let listX = 0;

    const getClientX = (e) => {
      const isTouches = e.touches ? true : false;
      return isTouches ? e.touches[0].clientX : e.clientX;
    };

    const getTranslateX = () => {
      return parseInt(getComputedStyle(list).transform.split(/[^\-0-9]+/g)[5]);
    };

    const setTranslateX = (x) => {
      list.style.transform = `translateX(${x}px)`;
    };

    const onScrollStart = (e) => {
      startX = getClientX(e);
      window.addEventListener("mousemove", onScrollMove);
      window.addEventListener("touchmove", onScrollMove);
      window.addEventListener("mouseup", onScrollEnd);
      window.addEventListener("touchend", onScrollEnd);
    };

    const onScrollMove = (e) => {
      nowX = getClientX(e);
      setTranslateX(listX + nowX - startX);
    };

    const bindEvents = () => {
      list.addEventListener("mousedown", onScrollStart);
      list.addEventListener("touchstart", onScrollStart);
      list.addEventListener("click", onClick);
    };

    const onScrollEnd = (e) => {
      endX = getClientX(e);
      listX = getTranslateX();

      if (listX > 0) {
        setTranslateX(0);
        list.style.transition = `all 0.3s ease`;
        listX = 0;
      } else if (listX < listClientWidth - listScrollWidth) {
        setTranslateX(listClientWidth - listScrollWidth);
        list.style.transition = `all 0.3s ease`;
        listX = listClientWidth - listScrollWidth;
      }

      window.removeEventListener("mousedown", onScrollStart);
      window.removeEventListener("touchstart", onScrollStart);
      window.removeEventListener("mousemove", onScrollMove);
      window.removeEventListener("touchmove", onScrollMove);
      window.removeEventListener("mouseup", onScrollEnd);
      window.removeEventListener("touchend", onScrollEnd);
      window.removeEventListener("click", onClick);

      setTimeout(() => {
        bindEvents();
        list.style.transition = "";
      }, 300);
    };

    const onClick = (e) => {
      if (startX - endX !== 0) {
        e.preventDefault();
      }
    };

    bindEvents();
  });
}

hotelListDrag();

window.addEventListener("resize", hotelListDrag);

//
//
//
// date picker
var dateSelector = document.querySelector(".date_select_bar_option_date");

dateSelector.flatpickr({
  mode: "range",
  dateFormat: "Y.m.d",
  minDate: "today",
});
