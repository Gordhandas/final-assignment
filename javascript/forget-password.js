const email = document.getElementById("email");
const message = document.getElementById("message");
const ForgotPassword = () => {
  if (email.value === "") {
    message.innerHTML = "Email Requried!";
    message.style.color = "red";
    message.style.display = "block";
    setTimeout(function () {
        message.style.display = "none";
      }, 2000);
  }else if(!email.value.match(/^[\w\-\.\+]+\@[a-zA-Z0-9\. \-]+\.[a-zA-z0-9]{2,4}$/)){
    message.innerHTML = "Please correct email address!";
    message.style.display = "block";
    message.style.color = "red";

    setTimeout(function () {
      message.style.display = "none";
    }, 2000);

  }else {
    // message.innerHTML = "Forgot password sent!";
    // message.style.display = "block";
    // message.style.color = "green";

    // setTimeout(function () {
    //   message.style.display = "none";
    // }, 2000);
    firebase
    .auth()
    .sendPasswordResetEmail(email.value)
    .then(() => {
      message.innerHTML = "Password reset email sent ,Please check email.";
      message.style.color = "green";
      setTimeout(function () {
          message.style.display = "none";
        }, 2000);
    })
    .catch((err) => {
      message.innerHTML = err.message;
      message.style.color = "red";
      setTimeout(function () {
        message.style.display = "none";
      }, 2000);
    });
  }
};
