let uid;
let fileURl = "";
let fileType = "";
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // console.log(user);
    uid = user.uid;
    if (user.emailVerified) {
      console.log("verified");
    } else {
      window.location.assign("./email-ver.html");
    }
  } else {
    window.location.assign("./log-in.html");
  }
});

let textarea = document.getElementById("textarea");
let message = document.getElementById("message");
let Post = () => {
  // console.log(textarea.value);
  if (textarea.value === "") {
    message.innerHTML = "Please type something ...";
    message.style.color = "red";
    setTimeout(() => {
      message.style.display= "none";
    }, 3000);
  } else {
    let Post = {
      PostValue: textarea.value,
      uid: uid,
      fileURl: fileURl,
      fileType: fileType,
      like: [],
      dislike: [],
      comment: [],
    };
    console.log(Post);
    firebase
      .firestore()
      .collection("Posts/")
      .add(Post)
      .then((res) => {
        console.log(res);
        message.innerHTML = "Your post created";
        message.style.color = "green";
        setTimeout(() => {
          message.style.display= "none";
        }, 3000);
        //
        setTimeout(() => {
          window.location.assign("./home.html");
        }, 2000);
        firebase
          .firestore()
          .collection("Posts/")
          .doc(res.id)
          .update({
            id: res.id,
          })
          .then(() => {
            setTimeout(() => {
              location.reload();
            }, 2000);
          });
      })
      // .catch((errer) => {
      //   console.error("Error writing document :", errer);
      //   console.log(textarea.value);
      // });
    //complete
  }
};
// upload post image or video
var myBar = document.getElementById("myBar");

let PostImage = (event) => {
  var targetFile = event.target.files[0];
  fileType = targetFile.type;
  var storageRef = firebase.storage().ref();
  var uploadTask = storageRef
    .child(`postfiles/${targetFile.name}`)
    .put(targetFile);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
         myBar.style.display = "block"
         
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      myBar.style.width = `${Math.floor(progress)}%`;
      myBar.innerHTML = `${Math.floor(progress)}%`
      console.log(progress)
      console.log("Uploded is" + progress + "% done");
    },
    (error) => {
      // Handle unsuccessful uploads
    },
    () => {
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        console.log("File available at", downloadURL);
        fileURl = downloadURL;
        myBar.style.display = "none"

      });

    }
  );
};
