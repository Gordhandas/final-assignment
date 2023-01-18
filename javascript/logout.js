let LogOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        window.location.assign("./log-in.html");
      });
  };
  