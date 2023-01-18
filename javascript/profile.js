const Name = document.getElementById("Name");
const LastName = document.getElementById("LastName");
const mobileNo = document.getElementById("mobileNo");

const email = document.getElementById("email");
const Profile = document.getElementById("Profile");
const profileImage = document.getElementById("profileImage");

const textarea = document.getElementById("textarea");
const message = document.getElementById("message");
var uid;
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // console.log(user);
    uid = user.uid;
    if (user.emailVerified) {
      // console.log("verified");
      // get data current user data

      firebase
        .firestore()
        .collection("users/")
        .doc(uid)
        .get()
        .then((res) => {
          let currentUserData = res.data();
          Name.setAttribute("value", currentUserData.Name);
          LastName.setAttribute("value", currentUserData.LastName);
          mobileNo.setAttribute("value", currentUserData.mobileNo);
         
          email.setAttribute("value", currentUserData.email);
          console.log(currentUserData);
          profileImage.setAttribute(
            "src",
            currentUserData.profileImagePath === ""
            ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9eAY9D_ubKZBXbqIwpN5nxIPCGnf8PVWJAbm-6jiW-A&s"
            : currentUserData.profileImagePath
            );
            console.log(currentUserData);
            Profile.setAttribute(
              "src",
              currentUserData.ProfilePath === ""
                ? "https://cdn-icons-png.flaticon.com/128/4322/4322989.png"
                : currentUserData.ProfilePath
            );

           
        });
      //my posts
      //console.log(uid)
      firebase
        .firestore()
        .collection("posts/")
        .where("uid", "==", "uid")
        .get()
        .then((postsRes) => {
          // console.log("postsRes", postsRes);
        });
    } else {
      window.location.assign("./email-ver...html");
    }
  } else {
    window.location.assign("./login.html");
  }
});

//// Update....Profile

let Update = () => {
  let userData = {
    Name: Name.value,
    LastName: LastName.value,
    mobileNo: mobileNo.value,
   
    textarea: textarea.value,
  };
  // console.log(userData);
  firebase
    .firestore()
    .collection("users/")
    .doc(uid)
    .update(userData)
    .then((res) => {
      // console.log(res);
      message.innerHTML = "Document successfully updated :";
      message.style.color = "green";
      setTimeout(function () {
          message.style.display = "none";
        }, 2000);
     
    })
    .catch((error) => {
      message.innerHTML = err.message;
      message.style.color = "red";
      setTimeout(function () {
        message.style.display = "none";
      }, 2000);
    });
};

// get data

// firebase
//   .firestore()
//   .collection("users/")
//   .get()
//   .then((res) => {
//     console.log(res);
//     res.forEach((userData) => {
//       if(userData.data().uid === uid)
//       console.log(userData.data());
//     });
//   });

// firebase
//   .firestore()
//   .collection("users/")
//   .where("password", "==", "123456")
//   .get()
//   .then((res) => {
//     console.log(res);
//     res.forEach((uidData)=>{
//       console.log(uidData.data())
//     })
//   });



var myBar = document.getElementById("myBar");
let UploadProfile = (event) => {
 
  var ProfileImagee = event.target.files[0];
  // console.log(event.target.files[0]);
  var storageRef = firebase.storage().ref();
  var uploadTask = storageRef
    .child(`images/${uid}`)
    .put(ProfileImagee);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      myBar.style.display = "block";
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      myBar.style.width = `${Math.floor(progress)}%`;
      myBar.innerHTML = `${Math.floor(progress)}%`;
      console.log(progress);
    },
    (error) => {
      // Handle unsuccessful uploads
    },
    () => {
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        profileImage.setAttribute("src", downloadURL);
        firebase
          .firestore()
          .collection("users/")
          .doc(uid)
          .update({ profileImagePath: downloadURL })
          .then(() => {
            myBar.style.display = "none";
            
          });
        // console.log("File available at", downloadURL);
      });
    }
  );
};



var myBar = document.getElementById("myBar");
let ImageProfile = (event) => {
 
  var ProfileCover = event.target.files[0];
  // console.log(event.target.files[0]);
  var storageRef = firebase.storage().ref();
  var uploadTask = storageRef
    .child(`NewImages/${uid}`)
    .put(ProfileCover);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      myBar.style.display = "block";
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      myBar.style.width = `${Math.floor(progress)}%`;
      myBar.innerHTML = `${Math.floor(progress)}%`;
      console.log(progress);
    },
    (error) => {
      // Handle unsuccessful uploads
    },
    () => {
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        Profile.setAttribute("src", downloadURL);
        firebase
          .firestore()
          .collection("users/")
          .doc(uid)
          .update({ ProfilePath: downloadURL })
          .then(() => {
            myBar.style.display = "none";
            
          });
        // console.log("File available at", downloadURL);
      });
    }
  );
};