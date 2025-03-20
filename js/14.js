jQuery(document).ready(function ($) {
  $("#add-booth").click(function () {
    var newBoothRow = $("#booth-wrap .booth-row:first").clone();
    newBoothRow.find('input[type="number"]').val("");
    newBoothRow.find(".remove-booth").show();
    newBoothRow.appendTo("#booth-wrap");
  });
  $("#booth-wrap").on("click", ".remove-booth", function () {
    if ($("#booth-wrap .booth-row").length > 1) {
      $(this).parent(".booth-row").remove();
    } else {
      alert("At least one booth must be present.");
    }
  });
  $("#gta-ramadan-registration").submit(function (e) {
    e.preventDefault();
    $("#form-message").remove();
    if ($("#iframe-container").length === 0) {
      $("#gta-ramadan-registration").append(
        '<div id="iframe-container" style="display: block; margin-right: 10px;"></div>'
      );
      $("#iframe-container").append(
        '<iframe src="https://lottie.host/embed/7b1s96e63-490d-470c-a9d9-b5229cadb4f0/VXjje2Qd4t.json" style="width: 100px; height: 100px; border: none;"></iframe>'
      );
      console.log($("#iframe-container iframe").attr("src"));
    }
    setTimeout(function () {
      $("#iframe-container").show();
    }, 100);
    $('button[type="submit"]').addClass("disabled").prop("disabled", !0);
    var formData = new FormData(this);
    formData.append("action", "gta_register_user");
    formData.append("nonce", ajax_object.nonce);
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    $.ajax({
      url: ajax_object.ajax_url,
      type: "POST",
      data: formData,
      processData: !1,
      contentType: !1,
      success: function (response) {
        console.log(response);
        $("#iframe-container").hide();
        $("#iframe-container iframe").attr("src", "");
        $("#form-message").remove();
        if (response.success) {
          fbq("track", "Lead");
          $("#gta-ramadan-registration").append(
            '<p id="form-message" style="color:green;">We have received your request and currently under review. Our team will get back to you soon.</p>'
          );
          $("#gta-ramadan-registration")[0].reset();
        } else {
          $("#gta-ramadan-registration").append(
            '<p id="form-message" style="color:red;">Error: ' +
            response.data.message +
            "</p>"
          );
        }
      },
      error: function () {
        $("#iframe-container").hide();
        $("#iframe-container iframe").attr("src", "");
        $("#form-message").remove();
        $("#gta-ramadan-registration").append(
          '<p id="form-message" style="color:red;">There was an error submitting your form. Please try again.</p>'
        );
      },
      complete: function () {
        $('button[type="submit"]').removeClass("disabled").prop("disabled", !1);
      },
    });
  });
  $("#login-form").submit(function (event) {
    event.preventDefault();
    var formData = $(this).serialize();
    $.post(
      ajax_object.ajax_url + "?action=login_user",
      formData,
      function (response) {
        $("#login-message").html(response.data || response.error);
        if (response.success) {
          window.location.reload();
        }
      }
    );
  });
});
