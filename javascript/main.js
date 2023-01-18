setTimeout(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        if (user.emailVerified) {
          window.location.assign("./pages/home.html");
        } else {
          window.location.assign("./pages/email-ver.html");
        }
      } else {
        window.location.assign("./pages/log-in.html");
      }
    });
  }, 2000);