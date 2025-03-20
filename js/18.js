jQuery(document).ready(function () {
  window.onload = function () {
    if (window.location.hash === "#testimonial-review") {
      setTimeout(function () {
        if (jQuery("#testimonial-review").length) {
          jQuery("html, body").animate(
            { scrollTop: jQuery("#testimonial-review").offset().top },
            600
          );
        }
      }, 1000);
    }
  };
});
jQuery(document).ready(function ($) {
  const $checkbox = $("#read-accept-checkbox");
  const $submitBtn = $(".submit-bttn");
  function toggleSubmitButton() {
    if ($checkbox.is(":checked")) {
      $submitBtn.addClass("enabled");
    } else {
      $submitBtn.removeClass("enabled");
    }
  }
  toggleSubmitButton();
  $checkbox.on("change", toggleSubmitButton);
});
document.addEventListener(
  "wpcf7mailsent",
  function (event) {
    if (event.detail.contactFormId == "7016e40") {
      fbq("track", "Lead");
    }
  },
  !1
);
jQuery(document).ready(function ($) {
  var currentUrl = window.location.href;
  $(".header_navigation a").each(function () {
    if (this.href === currentUrl) {
      $(this).addClass("active");
    }
  });
});
jQuery(".image-wrapper").slick({
  dots: !1,
  arrows: !1,
  infinite: !0,
  speed: 300,
  slidesToShow: 7,
  slidesToScroll: 1,
  autoplay: !0,
  autoplaySpeed: 0,
  speed: 5000,
  cssEase: "linear",
  pauseOnFocus: !1,
  pauseOnHover: !1,
  responsive: [
    {
      breakpoint: 1275,
      settings: { slidesToShow: 3, slidesToScroll: 1, infinite: !0, dots: !1 },
    },
    {
      breakpoint: 600,
      settings: { slidesToShow: 3, slidesToScroll: 1, infinite: !0, dots: !1 },
    },
    {
      breakpoint: 480,
      settings: { slidesToShow: 2, slidesToScroll: 1, infinite: !0, dots: !1 },
    },
  ],
});
jQuery(document).ready(function ($) {
  $(".logo-wrapper").slick({
    dots: !1,
    arrows: !1,
    infinite: !0,
    speed: 300,
    slidesToShow: 8,
    slidesToScroll: 1,
    autoplay: !0,
    autoplaySpeed: 0,
    speed: 5000,
    cssEase: "linear",
    pauseOnFocus: !1,
    pauseOnHover: !1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: !0,
          dots: !1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: !0,
          dots: !1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: !0,
          dots: !1,
        },
      },
    ],
  });
});
jQuery(document).ready(function ($) {
  $(".logo-wrapper1")
    .attr("dir", "rtl")
    .slick({
      dots: !1,
      arrows: !1,
      infinite: !0,
      speed: 300,
      slidesToShow: 8,
      slidesToScroll: 1,
      autoplay: !0,
      autoplaySpeed: 0,
      speed: 5000,
      cssEase: "linear",
      pauseOnFocus: !1,
      pauseOnHover: !1,
      rtl: !0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
            infinite: !0,
            dots: !1,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
            infinite: !0,
            dots: !1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: !0,
            dots: !1,
          },
        },
      ],
    });
});
jQuery(document).ready(function ($) {
  $(window).scroll(function () {
    var scrollTop = $(this).scrollTop();
    if (scrollTop > 50) {
      $(".scroll-header").addClass("scrolled");
    } else {
      $(".scroll-header").removeClass("scrolled");
    }
  });
});
jQuery(document).ready(function ($) {
  var slider = $(".custom-gallery").slick({
    dots: !1,
    arrows: !1,
    infinite: !0,
    speed: 25000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: !0,
    autoplaySpeed: 0,
    cssEase: "linear",
    pauseOnFocus: !0,
    pauseOnHover: !0,
    focusOnSelect: !0,
  });
  jQuery('[data-fancybox="gallery"]').fancybox({
    buttons: ["slideShow", "thumbs", "zoom", "fullScreen", "share", "close"],
    loop: !1,
    protect: !0,
  });
});
jQuery(document).ready(function ($) {
  $("#reset-password-form").on("submit", function (e) {
    e.preventDefault();
    $("#password-reset-message").empty();
    $("#error-loader").css("display", "flex");
    $('input[type="submit"]').addClass("disabled").prop("disabled", !0);
    var data = {
      action: "custom_reset_password",
      user_login: $('input[name="user_login"]').val(),
      reset_key: $('input[name="reset_key"]').val(),
      new_password: $("#password").val(),
    };
    $.post(ajaxurl, data, function (response) {
      $("#error-loader").css("display", "none");
      if (response.success) {
        console.log("Password reset successful");
        window.location.href = "/login?set_success=true";
      } else {
        console.log("Password reset failed");
        $("#password-reset-message").html(
          "<p style='color: red;'>" + response.data.message + "</p>"
        );
      }
    })
      .fail(function (xhr, textStatus, errorThrown) {
        console.log("Request failed: ", textStatus, errorThrown);
        $("#error-loader").css("display", "none");
        $("#password-reset-message").html(
          "<p style='color: red;'>An error occurred. Please try again.</p>"
        );
      })
      .always(function () {
        $('input[type="submit"]').removeClass("disabled").prop("disabled", !1);
      });
  });
});
jQuery(document).ready(function ($) {
  $("#custom-login-form").on("submit", function (e) {
    e.preventDefault();
    $("#error-message").empty();
    var userEmail = $('input[name="user_email"]').val();
    var userPassword = $("#password").val();
    $("#error-loader").css("display", "flex");
    if (!userEmail || !userPassword) {
      $("#error-message").html(
        '<p style="color: red;">Both email and password are required.</p>'
      );
      $("#error-loader").css("display", "none");
      return;
    }
    var data = {
      action: "custom_login_assets",
      user_login: userEmail,
      user_password: userPassword,
    };
    $.post(ajaxurl, data, function (response) {
      if (response.success) {
        console.log("success");
        window.location.href = response.data.redirect_url;
      } else {
        $("#error-message").html(
          '<p style="color: red;">Invalid email or password.</p>'
        );
        $("#error-loader").css("display", "none");
      }
    }).fail(function (xhr, textStatus, errorThrown) {
      console.error("Request failed: ", textStatus, errorThrown);
      $("#error-message").html(
        '<p style="color: red;">An error occurred. Please try again.</p>'
      );
      $("#error-loader").css("display", "none");
    });
  });
});
jQuery(document).ready(function ($) {
  $(".tabs-link").on("click", function (e) {
    e.preventDefault();
    if (!$(this).hasClass("active")) {
      $(".tabs-link").removeClass("active");
      $(this).addClass("active");
      const target = $(this).attr("href");
      $(".tabs1").hide();
      $(".tabs2").hide();
      if (target === "#tab1") {
        $(".tabs1").show();
      } else if (target === "#tab2") {
        $(".tabs2").show();
      }
    }
  });
});
jQuery(document).ready(function ($) {
  $(".book-now").on("click", function (e) {
    e.preventDefault();
    $('select[name="business_category"]').val("");
    var selectedDate = $(this).data("date");
    var selectedBooth = $(this).data("booth");
    $("html, body").animate(
      { scrollTop: $("#gta-ramadan-registration").offset().top },
      500
    );
    var eventDateSelect = $(".event_date");
    eventDateSelect.val(selectedDate).trigger("change");
    var selectedDateBox = eventDateSelect.val(selectedDate);
    setTimeout(function () {
      eventDateSelect.each(function () {
        updateBoothOptions($(this));
      });
      $(".booth_type").each(function () {
        var boothTypeSelect = $(this);
        if (boothTypeSelect.find(`option[value="${selectedBooth}"]`).length) {
          boothTypeSelect.val(selectedBooth).trigger("change");
        }
        if (`${selectedBooth}` === "Food Table") {
          $('select[name="business_category"]').val("food").trigger("change");
        }
        if (`${selectedBooth}` === "Henna Court") {
          $('select[name="business_category"]').val("henna").trigger("change");
          $('select[name="booth_type[]"]').val("Henna Court").trigger("change");
        }
      });
      calculateTotal();
    }, 300);
  });
  var prices = {
    "15-16 March": {
      "Single Booth": 800,
      "Double Booth": 1550,
      "Food Table": 600,
      "Henna Court": 200,
    },
    "28-29-30 March": {
      "Single Booth": 1200,
      "Double Booth": 2350,
      "Food Table": 900,
      "Henna Court": 300,
    },
  };
  function updateBoothOptions(select) {
    var selectedDate = select.val();
    var boothTypeSelect = select.closest(".booth-row").find(".booth_type");
    boothTypeSelect.empty();
    if (selectedDate) {
      var selectedCategory = $('select[name="business_category"]').val();
      $.each(prices[selectedDate], function (boothType, price) {
        var isDisabled = !1;
        if (
          selectedCategory === "henna" ||
          selectedCategory === "nail" ||
          selectedCategory === "face"
        ) {
          if (boothType === "Henna Court") {
            isDisabled = !1;
            boothTypeSelect.val("Henna Court");
          }
          if (
            boothType === "Single Booth" ||
            boothType === "Food Table" ||
            boothType === "Double Booth"
          ) {
            isDisabled = !0;
          }
        }
        if (
          selectedCategory === "ladies-clothing" ||
          selectedCategory === "jewelry"
        ) {
          if (
            boothType === "Single Booth" ||
            boothType === "Food Table" ||
            boothType === "Henna Court"
          ) {
            isDisabled = !0;
          }
        }
        if (
          selectedCategory !== "henna" &&
          selectedCategory !== "nail" &&
          selectedCategory !== "face"
        ) {
          if (
            selectedCategory === "ladies-clothing" ||
            selectedCategory === "jewelry"
          ) {
            if (
              boothType === "Single Booth" ||
              boothType === "Food Table" ||
              boothType === "Henna Court"
            ) {
              isDisabled = !0;
            }
            boothTypeSelect.val("Double Booth");
          } else {
            if (boothType === "Henna Court" || boothType === "Food Table") {
              isDisabled = !0;
            }
          }
        }
        if (selectedCategory == "food") {
          if (
            boothType === "Single Booth" ||
            boothType === "Double Booth" ||
            boothType === "Henna Court"
          ) {
            isDisabled = !0;
          }
          if (boothType === "Food Table") {
            isDisabled = !1;
            boothTypeSelect.val("Food Table");
          }
        }
        boothTypeSelect.append(
          `<option value="${boothType}" data-price="${price}" ${isDisabled ? "disabled" : ""
          }>${boothType} - ${price} CAD</option>`
        );
      });
      if (selectedCategory === "food") {
        boothTypeSelect.val("Food Table");
      }
    }
  }
  $('select[name="business_category"]').on("change", function () {
    $("select.booth_date").each(function () {
      updateBoothOptions($(this));
    });
    calculateTotal();
  });
  $("select.booth_date").on("change", function () {
    updateBoothOptions($(this));
  });
  function calculateTotal() {
    var total = 0;
    $("#booth-wrap .booth-row").each(function () {
      var price =
        $(this).find(".booth_type option:selected").data("price") || 0;
      var count = parseInt($(this).find(".booth_count").val(), 10);
      total += price * (isNaN(count) ? 0 : count);
    });
    $("#display_total_price").text(total);
  }
  $('select[name="business_category"]').change(function () {
    $(".event_date").each(function () {
      updateBoothOptions($(this));
    });
    calculateTotal();
  });
  $("#booth-wrap").on("change", ".event_date", function () {
    updateBoothOptions($(this));
    calculateTotal();
  });
  $("#booth-wrap").on("change input", ".booth_type, .booth_count", function () {
    calculateTotal();
  });
  $("#add-booth")
    .off("click")
    .on("click", function () {
      var newRow = $(".booth-row:first").clone();
      newRow.find("select").val("");
      newRow
        .find(".booth_type")
        .empty()
        .append(
          '<option value="" disabled selected>Select Booth Type</option>'
        );
      newRow.find(".booth_count").val(1);
      newRow.find(".remove-booth").show();
      $("#booth-wrap").append(newRow);
      calculateTotal();
    });
  $("#booth-wrap").on("click", ".remove-booth", function () {
    $(this).closest(".booth-row").remove();
    calculateTotal();
  });
});
jQuery(document).ready(function ($) {
  $("#gta-ramadan-registration").on("submit", function (e) {
    let isValid = !0;
    $(this)
      .find(
        'input[type="text"], input[type="email"], input[type="tel"], input[type="url"]'
      )
      .each(function () {
        let value = $(this).val().trim();
        if (value === "") {
          $(this).css("border-color", "red");
          isValid = !1;
        } else {
          $(this).css("border-color", "");
        }
      });
  });
});
jQuery(document).ready(function ($) { });
// document.addEventListener("DOMContentLoaded", function () {
//   var targetDate = new Date("2025-03-15T12:00:00-04:00").getTime();
//   var countdownFunction = setInterval(function () {
//     var now = new Date().getTime();
//     var distance = targetDate - now;
//     var days = Math.floor(distance / (1000 * 60 * 60 * 24));
//     var hours = Math.floor(
//       (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
//     );
//     var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//     var seconds = Math.floor((distance % (1000 * 60)) / 1000);
//     document.getElementById("ticket-days").innerHTML = days
//       .toString()
//       .padStart(2, "0");
//     document.getElementById("ticket-hours").innerHTML = hours
//       .toString()
//       .padStart(2, "0");
//     document.getElementById("ticket-minutes").innerHTML = minutes
//       .toString()
//       .padStart(2, "0");
//     document.getElementById("ticket-seconds").innerHTML = seconds
//       .toString()
//       .padStart(2, "0");
//     document.getElementById("countdown1").style.visibility = "visible";
//     if (distance < 0) {
//       clearInterval(countdownFunction);
//       document.getElementById("countdown1").innerHTML = "EXPIRED";
//     }
//   }, 1000);
// });
jQuery(document).ready(function ($) {
  $(".other-banner").hide();
  $('select[name="business_category"]').change(function () {
    if ($(this).val() === "other") {
      $(".other-banner").show();
    } else {
      $(".other-banner").hide();
    }
  });
});
jQuery(document).ready(function ($) {
  if ($("#business_category").val() === "other") {
    $("#other-tr").show();
  } else {
    $("#other-tr").hide();
  }
  $("#business_category").change(function () {
    var selectedValue = $(this).val();
    if (selectedValue === "other") {
      $("#other-tr").show();
      $("#other-tr input").val("");
    } else {
      $("#other-tr").hide();
    }
  });
});
jQuery(document).ready(function ($) {
  $(
    'a[href="https://www.s-sols.com/products/wordpress/accelerator?utm_source=usersite&utm_medium=banner&utm_campaign=free_lim_ver&utm_term=accel"]'
  ).remove();
  if ($("#read-accept-checkbox").is(":checked")) {
    $(".disclaimer").hide();
  }
  $("#read-accept-checkbox").change(function () {
    if ($(this).is(":checked")) {
      $(".disclaimer").hide();
    } else {
      $(".disclaimer").show();
    }
  });
});
