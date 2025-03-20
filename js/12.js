jQuery(document).ready(function ($) {
  $("#etp-registration-form").on("submit", function (event) {
    event.preventDefault();
    var isChecked = $('input[name="event_date[]"]:checked').length > 0;
    if (!isChecked) {
      $("#etp-response-2").html(
        "<p style='color: red;'>Unable to submit your form. Please select at least one date.</p>"
      );
      return;
    }
    var formData = $(this).serializeArray();
    formData.push({ name: "action", value: "etp_handle_registration" });
    $("#error-loader-2").show();
    $(".ticket_form_footer").prop("disabled", !0);
    $.ajax({
      type: "POST",
      url: etp_ajax_object.ajax_url,
      data: $.param(formData),
      success: function (response) {
        try {
          const data = JSON.parse(response);
          if (data.status === "success") {
            $("#etp-response-2").html(
              "<p style='color: green;'>Registration Successful! Check your email for the tickets PDF.</p>"
            );
            console.log("PDF generated and emailed successfully.");
            fbq("track", "Lead");
          } else {
            $("#etp-response-2").html(
              "<p style='color: red;'>An issue occurred. Please try again.</p>"
            );
          }
        } catch (e) {
          console.error("Error parsing JSON:", e);
          $("#etp-response-2").html(
            "<p style='color: red;'>An error occurred. Please try again.</p>"
          );
        }
        $("#error-loader-2").hide();
        $(".ticket_form_footer").prop("disabled", !1);
        $("#etp-registration-form")[0].reset();
      },
      error: function (xhr, status, error) {
        console.error("AJAX Error:", xhr, status, error);
        $("#etp-response-2").html(
          "<p style='color: red;'>An error occurred. Please try again.</p>"
        );
        $("#error-loader-2").hide();
        $(".ticket_form_footer").prop("disabled", !1);
      },
    });
  });
  function generatePDF(htmlContent) {
    $.ajax({
      type: "POST",
      url: etp_ajax_object.ajax_url,
      data: { action: "etp_generate_pdf", html_content: htmlContent },
      success: function (response) {
        console.log("PDF generated and emailed successfully.");
      },
      error: function (xhr, status, error) {
        console.error("PDF generation error:", xhr, status, error);
      },
    });
  }
  $("#mark-attendance-button").click(function () {
    const uniqueId = $(this).data("unique-id");
    $("#error-loader").show();
    $.ajax({
      type: "POST",
      url: etp_ajax_object.ajax_url,
      data: { action: "etp_mark_attendance", unique_id: uniqueId },
      success: function (response) {
        const data = JSON.parse(response);
        $("#error-loader").hide();
        if (data.status === "success") {
          $(".response-message").html(
            "<p style='color: green;'>Attendance marked successfully.</p>"
          );
          $("#user-info-modal").hide();
        } else {
          $(".response-message").html(
            "<p style='color: red;'>" + data.message + "</p>"
          );
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.error("Error:", textStatus, errorThrown);
      },
    });
  });
  jQuery(document).click(function (event) {
    if (
      !$(event.target).closest("#user-info-modal").length &&
      !$(event.target).is("#scan-button")
    ) {
      $("#user-info-modal").hide();
    }
  });
});
