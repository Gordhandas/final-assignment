const Login = () => {
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const message = document.getElementById("message");

  if (email.value === "") {
    message.innerHTML = "Email address requird!";
    message.style.display = "block";
    message.style.color = "red";
    message.focus();
    setTimeout(function () {
      message.style.display = "none";
    }, 3000);
  } else if (!email.value.match(/^[\w\-\.\+]+\@[a-zA-Z0-9\. \-]+\.[a-zA-z0-9]{2,4}$/)) {
    message.innerHTML = "Please enter vaild email address!";
    message.style.display = "block";
    message.style.color = "red";

    setTimeout(function () {
      message.style.display = "none";
    }, 3000);

  } else if (password.value === "") {
    message.innerHTML = "Password requird!";
    message.style.display = "block";

    message.style.color = "red";
    password.focus();
    setTimeout(function () {
      message.style.display = "none";
    }, 3000);
  }else if(password.value.length < 6 ){
    
    message.innerHTML = "Please enter at lest 6 digits password!";
    message.style.display = "block";
    message.style.color = "red";

    setTimeout(function () {
      message.style.display = "none";
    }, 3000);
   
    

  } else {
    let userData = {
      email: email.value,
      password: password.value,
    };
    console.log(userData);
    firebase
      .auth()
      .signInWithEmailAndPassword(userData.email, userData.password)
      .then((resolve) => {
        message.innerHTML = "successfully your account login.";
        message.style.color = "green";
        message.style.display = "block";
        if (resolve.user.emailVerified) {
          setTimeout(function () {
            message.style.display = "none";
            window.location.assign("./home.html");
          }, 3000);
        } else {
          setTimeout(function () {
            message.style.display = "none";
            window.location.assign("./email-ver.html");
          }, 2000);
        }

        console.log(resolve.userData);
      })
      .catch((error) => {
        message.innerHTML = error.message;
        message.setAttribute("id","padding")
        // message.style.padding_left= "40px";
        message.style.color = "red";
        message.style.display = "block";
        setTimeout(function () {
          message.style.display = "none";

        }, 2000);

      });
  }
};  