document.addEventListener("DOMContentLoaded", function () {

  document
    .getElementById("sign-up-btn")
    .addEventListener("click", function (event) {
      event.preventDefault();
      const username = document.getElementById("register-username").value;
      const password = document.getElementById("register-password").value;
      fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          window.location.href = "/tasks";
          console.debug("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
  document
    .getElementById("login-btn")
    .addEventListener("click", function (event) {
      event.preventDefault();
      const username = document.getElementById("login-username").value;
      const password = document.getElementById("login-password").value;
      fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          window.location.href = "/tasks";
          console.debug("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
  document
    .getElementById("register-username")
    .addEventListener("input", function () {
      const username = this.value;
      const feedbackElement = document.getElementById("username-feedback");
      if (username.length < 3) {
        feedbackElement.textContent = "Username must be at least 3 characters";
        feedbackElement.style.color = "red";
        return;
      }
      fetch(`/api/auth/check-username?username=${encodeURIComponent(username)}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.isAvailable) {
            feedbackElement.textContent = "";
          } else {
            feedbackElement.textContent = "Username is already taken";
            feedbackElement.style.color = "red";
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          feedbackElement.textContent = "Error checking username";
          feedbackElement.style.color = "red";
        });
      updateSignUpButtonState();
    });
  document
    .getElementById("register-password")
    .addEventListener("input", function () {
      const password = this.value;
      const passwordFeedback = document.getElementById("password-feedback");
      // Check the length
      if (password.length < 8) {
        passwordFeedback.textContent =
          "Password must be at least 8 characters long";
        passwordFeedback.style.color = "red";
        return;
      }
      // Check for a mix of upper and lower case letters
      if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
        passwordFeedback.textContent =
          "Password must include both upper and lower case letters";
        passwordFeedback.style.color = "red";
        return;
      }
      // Check for numbers
      if (!/\d/.test(password)) {
        passwordFeedback.textContent =
          "Password must include at least one number";
        passwordFeedback.style.color = "red";
        return;
      }
      // Check for special characters
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        passwordFeedback.textContent =
          "Password must include at least one special symbol like !, @, #, etc.";
        passwordFeedback.style.color = "red";
        return;
      }
      // All checks passed
      passwordFeedback.textContent = "";
      updateSignUpButtonState();
    });
});
