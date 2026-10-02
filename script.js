document.addEventListener("DOMContentLoaded", function () {
  // Show current date and time on every page.
  const clock = document.getElementById("dateTime");
  function showDateTime() {
    if (clock) clock.textContent = new Date().toLocaleString();
  }
  showDateTime();
  setInterval(showDateTime, 1000);

  // Contact form validation and confirmation popup.
  const form = document.getElementById("contactForm");
  if (form) {
    const phone = document.getElementById("phone");
    phone.addEventListener("input", function () {
      this.value = this.value.replace(/\D/g, "").slice(0, 11);
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      event.stopPropagation();

      const email = document.getElementById("email");
      const phonePattern = /^[0-9]{11}$/;
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      phone.setCustomValidity(phonePattern.test(phone.value) ? "" : "Enter exactly 11 digits.");
      email.setCustomValidity(emailPattern.test(email.value) ? "" : "Enter a valid email.");
      form.classList.add("was-validated");

      if (form.checkValidity()) {
        const modalElement = document.getElementById("confirmationModal");
        if (modalElement && window.bootstrap) {
          const modal = new bootstrap.Modal(modalElement);
          modal.show();
        } else {
          alert("Thank you! Your contact form has been submitted successfully.");
        }
        form.reset();
        form.classList.remove("was-validated");
      }
    });
  }

  // Five-question collapsible FAQ using JavaScript.
  const faqButtons = document.querySelectorAll(".faq-question");
  faqButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const item = button.parentElement;
      const answer = item.querySelector(".faq-answer");
      const isOpen = item.classList.contains("open");

      document.querySelectorAll(".faq-item.open").forEach(function (openItem) {
        if (openItem !== item) {
          openItem.classList.remove("open");
          openItem.querySelector(".faq-answer").style.maxHeight = null;
        }
      });

      item.classList.toggle("open", !isOpen);
      answer.style.maxHeight = !isOpen ? answer.scrollHeight + "px" : null;
    });
  });
});
