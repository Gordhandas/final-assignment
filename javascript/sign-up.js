const SignUp = () => {
  const input = document.getElementsByTagName("input")
  const Name = document.getElementById("Name");
  const LastName = document.getElementById("LastName");
  const mobileNo = document.getElementById("mobileNo");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const re_enter_password = document.getElementById("re_enter_password");
  const message = document.getElementById("message");
  if (Name.value === "") {
    message.innerHTML = "First name requird!";
    message.style.display = "block";
    message.style.color = "red";

    setTimeout(function () {
      message.style.display = "none";
    }, 2000);
  } else if (LastName.value === "") {
    message.innerHTML = "Last name requird!";
    message.style.display = "block";
    message.style.color = "red";

    setTimeout(function () {
      message.style.display = "none";
    }, 2000);
  } else if (mobileNo.value === "") {
    message.innerHTML = "Mobile number requird!";
    message.style.display = "block";
    message.style.color = "red";

    setTimeout(function () {
      message.style.display = "none";
    }, 2000);
  }else if(mobileNo.value.length < 11 ){
    
    message.innerHTML = "Please enter at lest 11 digits Mobile number!";
    message.style.display = "block";
    message.style.color = "red";

    setTimeout(function () {
      message.style.display = "none";
    }, 2000);
   
    

  } else if (email.value === "") {
    message.innerHTML = "Email requird!";
    message.style.display = "block";
    message.style.color = "red";

    setTimeout(function () {
      message.style.display = "none";
    }, 2000);
  }else if(!email.value.match(/^[\w\-\.\+]+\@[a-zA-Z0-9\. \-]+\.[a-zA-z0-9]{2,4}$/)){
    message.innerHTML = "Please enter valid email address!";
    message.style.display = "block";
    message.style.color = "red";

    setTimeout(function () {
      message.style.display = "none";
    }, 2000);

  } else if (password.value === "") {
    message.innerHTML = "Password requird!";
    message.style.display = "block";
    message.style.color = "red";

    setTimeout(function () {
      message.style.display = "none";
    }, 2000);
  }else if(password.value.length < 6 ){
    
    message.innerHTML = "Please enter at lest 6 digits password!";
    message.style.display = "block";
    message.style.color = "red";

    setTimeout(function () {
      message.style.display = "none";
    }, 2000);
   
    

  } else if (re_enter_password.value === "") {
    message.innerHTML = "Please enter same password again!";
    message.style.display = "block";
    message.style.color = "red";

    setTimeout(function () {
      message.style.display = "none";
    }, 2000);
  } else if (re_enter_password.value !== password.value) {
    message.innerHTML = "Password doesn't match!";
    message.style.display = "block";
    message.style.color = "red";

    setTimeout(function () {
      message.style.display = "none";
    }, 2000);
  } else {
    // input.value = "";
    let userData = {
      Name: Name.value,
      LastName: LastName.value,
      mobileNo: mobileNo.value,
      re_enter_password: re_enter_password.value,
      email: email.value,
      password: password.value,
    };
    console.log(userData);

    // Name.value = "";
    // LastName.value = "";
    // mobileNo.value = "";
    // re_enter_password.value = "";
    // email.value = "";
    // password.value = "";

    firebase
    .auth()
    .createUserWithEmailAndPassword(userData.email, userData.password)
    .then((resolve) => {
      message.innerHTML = "successfully created new account.";
      message.style.color = "green";
      message.style.display = "block";

      // verification
      resolve.user.sendEmailVerification();
      // data base//////////////
      firebase
        .database()
        .ref("users/" + resolve.user.uid)
        .set(userData)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err.message);
        });



      //////////////

      // firestore
      firebase
        .firestore()
        .collection("users/").doc(resolve.user.uid)
        .set(userData)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      setTimeout(function () {
        message.style.display = "none";
        window.location.assign("./email-ver.html");
      }, 2000);
      // console.log(resolve.userData);
    })
    .catch((error) => {
      message.innerHTML = error.message;
      message.style.color = "red";
      message.style.display = "block";

      setTimeout(function () {
        message.style.display = "none";
      }, 2000);
    });
  }
};
