const email = document.getElementById("email");
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log(user);
    if (user.emailVerified) {
      window.location.assign("./../pages/home.html");
    } else {
      email.innerHTML = user.email;
      console.log("verified false");
    }
  } else {
    window.location.assign("./../pages/log-in.html");
  }
});
let message = document.getElementById("message");
const ResendEmail = () => {
  firebase
    .auth()
    .currentUser.sendEmailVerification()
    .then(() => {
      message.innerHTML = "A verification link has been sent to your email account!";
      message.style.color = "green";
      message.style.display = "block";

      setTimeout(function () {
        message.style.display = "none";
      }, 2000);
    })
    .catch((err) => {
      message.innerHTML = err.message;
      message.style.color = "red";
      message.style.display = "block";

      setTimeout(function () {
        message.style.display = "none";
      }, 2000);
    });
};

let Home = () => {
  location.reload();
};
