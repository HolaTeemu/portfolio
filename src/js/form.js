$(document).ready(function () {
  const errorMessage = document.querySelector(".error-message-container");
  const submitButton = document.querySelector(".submit-button");
  const inputFields = document.querySelectorAll("input");
  const messageField = document.querySelector("#message");

  $(".contact-form").submit(function (event) {
    $.ajax({
      method: "POST",
      url: "https://formsubmit.co/ajax/c2b806c4276cc2082c34c3ee1b4c99b5",
      dataType: "json",
      accepts: "application/json",
      data: {
        _subject: "Contact from website",
        name: document.querySelector("#fullname").value,
        email: document.querySelector("#email").value,
        message: document.querySelector("#message").value,
      },
    })
      .done(function (data) {
        if (errorMessage.classList.contains("visible")) {
          errorMessage.classList.remove("visible");
        }
        submitButton.classList.add("success");
        submitButton.disabled = true;
        inputFields.forEach((field) => {
          field.value = "";
        });
        messageField.value = "";
      })
      .fail(function (data) {
        if (!errorMessage.classList.contains("visible")) {
          errorMessage.classList.toggle("visible");
        }
      }),
      event.preventDefault();
  });
});
