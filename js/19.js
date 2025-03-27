jQuery(document).ready(function ($) {
  $("#menu-item-2624, #menu-item-2625").wrapAll(
    '<div class="header-button-wrapper"></div>'
  );
});
jQuery(document).ready(function ($) {
  let lastScrollTop = 0;
  $(window).scroll(function () {
    const testElement = $(".scrolled");
    const currentScrollTop = $(this).scrollTop();
    if (currentScrollTop > lastScrollTop) {
      testElement.addClass("scroll-top");
      testElement.removeClass("scroll-down");
    } else {
      testElement.addClass("scroll-down");
      testElement.removeClass("scroll-top");
    }
    lastScrollTop = currentScrollTop;
  });
});
jQuery(".vendor_slider").slick({
  dots: !0,
  infinite: !0,
  speed: 300,
  slidesToShow: 2,
  slidesToScroll: 1,
  arrows: !1,
  responsive: [{ breakpoint: 980, settings: { slidesToShow: 1 } }],
});
var swiper = new Swiper(".mySwiper", {
  effect: "cards",
  grabCursor: !0,
  centeredSlides: !0,
  pagination: { el: ".swiper-pagination", clickable: !0 },
});
jQuery(".testimonial_slider").slick({
  dots: !0,
  infinite: !0,
  speed: 300,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: !1,
  draggable: !1,
  responsive: [{ breakpoint: 980, settings: { slidesToShow: 1 } }],
});
var defaultIndex = 0;
swiper.slideTo(defaultIndex);
jQuery(".testimonial_slider").slick("slickGoTo", defaultIndex);
jQuery(".testimonial_slider").on(
  "beforeChange",
  function (event, slick, currentSlide, nextSlide) {
    swiper.slideTo(nextSlide);
  }
);
swiper.on("slideChange", function () {
  var activeIndex = swiper.realIndex;
  jQuery(".testimonial_slider").slick("slickGoTo", activeIndex);
});
swiper.on("slideChange", function () {
  var activeIndex = swiper.realIndex;
  jQuery(".testimonial_slider").slick("slickGoTo", activeIndex);
});
jQuery(document).ready(function ($) {
  $("#date").on("change", function () {
    if ($(this).val()) {
      $(this).addClass("has-value");
    } else {
      $(this).removeClass("has-value");
    }
  });
});
jQuery(document).ready(function ($) {
  function toggleDropdown() {
    $(".dropdown").toggleClass("show");
  }
  $(window).on("click", function (event) {
    if (!$(event.target).closest(".dropdown-toggle").length) {
      $(".dropdown").removeClass("show");
    }
  });
  const $readMoreBtn = $("#read-more-btn");
  const $contractText = $("#contract-tex");
  let isExpanded = !1;
  $readMoreBtn.on("click", function (e) {
    e.preventDefault();
    if (!isExpanded) {
      $contractText.css("webkitLineClamp", "unset");
      $readMoreBtn.text("Read Less");
      isExpanded = !0;
    } else {
      $contractText.css("webkitLineClamp", "3");
      $readMoreBtn.text("Read More");
      isExpanded = !1;
    }
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const counters = [
    { id: "total-tickets", start: 0, end: 28000, display: "k" },
    { id: "vendors", start: 0, end: 43 },
    { id: "media-partners", start: 0, end: 7, leadingZero: !0 },
    { id: "influencers", start: 0, end: 15 },
  ];
  const duration = 1000;
  const fps = 20;
  const interval = duration / fps;
  function runCounter(counter) {
    const element = document.getElementById(counter.id);
    const step = (counter.end - counter.start) / fps;
    let current = counter.start;
    const counterInterval = setInterval(() => {
      current += step;
      if (current >= counter.end) {
        current = counter.end;
        clearInterval(counterInterval);
      }
      let value = Math.floor(current);
      if (counter.leadingZero && value < 10) {
        value = "0" + value;
      }
      if (counter.display === "k") {
        element.textContent = Math.floor(current / 1000) + "k";
      } else {
        element.textContent = value;
      }
    }, interval);
  }
  const observerOptions = { root: null, threshold: 0.1 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        counters.forEach((counter) => {
          document.getElementById(counter.id).textContent = "0";
          runCounter(counter);
        });
      }
    });
  }, observerOptions);
  const eidFairSection = document.getElementById("eid-fair");
  observer.observe(eidFairSection);
});

