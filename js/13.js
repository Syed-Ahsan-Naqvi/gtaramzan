jQuery(function ($) {
  $(document).ready(function () {
    var stripe = Stripe(gta_stripe_script.public_key);
    var elements = stripe.elements();
    var card = elements.create("card", {
      style: { base: { fontSize: "16px", color: "#32325d" } },
    });
    card.mount("#card-element");
    jQuery("#payment-form").submit(function (event) {
      event.preventDefault();
      $("#card-errors").text("");
      $('input[type="submit"]').css("display", "none");
      $("#error-loader").css("display", "flex");
      stripe.createToken(card).then(function (result) {
        if (result.error) {
          $("#card-errors").text(result.error.message);
          $("#error-loader").css("display", "none");
          $('input[type="submit"]').css("display", "block");
        } else {
          const formData = stripeTokenHandler(result.token, "#payment-form");
          jQuery.post(
            gta_stripe_script.ajax_url + "?action=gta_payment_stripe",
            formData,
            function (response) {
              if (response.success) {
                $("#error-loader").css("display", "none");
                window.location.reload();
              } else {
                $("#card-errors").text(response.data.message);
                $("#error-loader").css("display", "none");
                $('input[type="submit"]').css("display", "block");
              }
            }
          );
        }
      });
    });
    function stripeTokenHandler(token, formName) {
      jQuery('input[name="stripeToken"]').val(token.id);
      jQuery('input[name="stripeToken"]').attr("value", token.id);
      var formData = jQuery(formName).serialize();
      return formData;
    }
    $(document).on("click", ".gta-update-card", function () {
      $(".gta-payment-form-wrapper").slideToggle();
    });
    jQuery("#update-payment-form").submit(function (event) {
      event.preventDefault();
      $("#card-errors").text("");
      $('input[type="submit"]').css("display", "none");
      $("#error-loader").css("display", "flex");
      stripe.createToken(card).then(function (result) {
        if (result.error) {
          $("#card-errors").text(result.error.message);
          $("#error-loader").css("display", "none");
          $('input[type="submit"]').css("display", "block");
        } else {
          const formData = stripeTokenHandler(
            result.token,
            "#update-payment-form"
          );
          jQuery
            .post(
              gta_stripe_script.ajax_url + "?action=gta_update_payment_method",
              formData,
              function (response) {
                if (response.success) {
                  $("#error-loader").css("display", "none");
                  $("#card-errors").html(
                    "<span style='color: green;'>Payment method updated successfully!</span>"
                  );
                  setTimeout(function () {
                    window.location.reload();
                  }, 2000);
                } else {
                  $("#card-errors").text(response.data.message);
                  $("#error-loader").css("display", "none");
                  $('input[type="submit"]').css("display", "block");
                }
              }
            )
            .fail(function () {
              $("#card-errors").text(
                "An unexpected error occurred. Please try again."
              );
              $("#error-loader").css("display", "none");
              $('input[type="submit"]').css("display", "block");
            });
        }
      });
    });
  });
});
