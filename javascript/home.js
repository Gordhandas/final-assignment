var uid;
let loading = document.getElementById("loading");
let postShow = document.getElementById("postShow");
let container_inner_2 = document.getElementById("container_inner_2");

let topprofile = document.createElement("img");
container_inner_2.appendChild(topprofile);
topprofile.setAttribute("class", "topprofile");
var FullName = document.createElement("h6");
container_inner_2.appendChild(FullName);
FullName.setAttribute("id", "FullName");

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    uid = user.uid;
    if (user.emailVerified) {
      console.log("verified");
      // get all posts
      firebase
        .firestore()
        .collection("Posts/")
        .onSnapshot(async (querySnapshot) => {
          loading.style.display = "none";
          postShow.style.display = "block";
          postShow.innerHTML = "";
          var allPosts = [];
          
          if (querySnapshot.size === 0) {
            var message = document.createElement("h1");
            postShow.appendChild(message);
            message.innerHTML = "No data available";
          } else {
            querySnapshot.forEach((res) => {
              allPosts.push(res.data());
            });
            // loop
            for (var postIndex = 0; postIndex < allPosts.length; postIndex++) {
              let likeArray = allPosts[postIndex].like;
              let dislikeArray = allPosts[postIndex].dislike;
              let commentArray = allPosts[postIndex].comment;
              // show post details
              var post = document.createElement("div");
              postShow.appendChild(post);
              post.setAttribute("class", "post");
              // post header
              var postHeader = document.createElement("div");
              post.appendChild(postHeader);
              postHeader.setAttribute("class", "postHeader");
              // user profile
              let userProfile = document.createElement("img");
              postHeader.appendChild(userProfile);
              userProfile.setAttribute("class", "postProfile");

              // user name
              var userName = document.createElement("p");
              postHeader.appendChild(userName);
              // console.log(userName);
              // get user data
              await firebase
                .firestore()
                .collection("users/")
                .doc(allPosts[postIndex].uid)
                .get()
                .then((userData) => {
                  //////
                  userProfile.setAttribute(
                    "src",
                    userData.data().ProfilePath === ""
                      ? "https://cdn.pixabay.com/photo/2018/08/28/12/41/avatar-3637425__340.png"
                      : userData.data().ProfilePath
                  );
                  let userNameText = document.createTextNode(
                    // console.log(userData.data())
                    `${userData.data().Name} ${userData.data().LastName}`
                  );

                  userName.appendChild(userNameText);
                  userName.setAttribute("class", "userName");

                  //
                  
              
                  topprofile.setAttribute(
                    "src",
                    userData.data().ProfilePath === ""
                      ? "https://cdn.pixabay.com/photo/2018/08/28/12/41/avatar-3637425__340.png"
                      : userData.data().ProfilePath
                  );
                  let Full = document.createTextNode(
                    `${userData.data().Name} ${userData.data().LastName}`
                  );
                  FullName.appendChild(Full);
                });
              // created date
              var createdDate = document.createElement("p");
              userName.appendChild(createdDate);
              let createdDateText = document.createTextNode("10 08, 2022");
              createdDate.appendChild(createdDateText);
              createdDate.setAttribute("class", "date");

              // post details

              var postDetails = document.createElement("p");
              post.appendChild(postDetails);
              postDetails.setAttribute("id", "postDetail");
              let postDetailsText = document.createTextNode(
                allPosts[postIndex].PostValue
              );
              postDetails.appendChild(postDetailsText);

              // image or videos
              if (allPosts[postIndex].fileURl !== "") {
                // image
                if (
                  allPosts[postIndex].fileType === "image/png" ||
                  allPosts[postIndex].fileType === "image/jpeg" ||
                  allPosts[postIndex].fileType === "image/jpg"
                ) {
                  let postImage = document.createElement("img");
                  post.appendChild(postImage);
                  postImage.setAttribute("class", "postImage");
                  postImage.setAttribute("src", allPosts[postIndex].fileURl);
                } else {
                  // video
                  let video = document.createElement("video");
                  post.appendChild(video);
                  video.setAttribute("controls", "true");
                  video.setAttribute("class", "postVideo");
                  let source = document.createElement("source");
                  video.appendChild(source);
                  source.setAttribute("src", allPosts[postIndex].fileURl);
                  source.setAttribute("type", "video/mp4");
                }
              }
              // post footer
              let footerMain = document.createElement("div");
              post.appendChild(footerMain);
              footerMain.setAttribute("class", "footerMain");
              // like button
              let likeButton = document.createElement("img");
              footerMain.appendChild(likeButton);
              likeButton.setAttribute("class", "likepic");
              let likeValue = document.createElement("p");
              footerMain.appendChild(likeValue);
              likeValue.setAttribute("id", "LikeValue");
              likeValue.innerHTML = `Like (${likeArray.length})`;

              likeButton.setAttribute("id", postIndex);
              if (likeArray.length === 0) {
                likeButton.setAttribute("src", "./../assets/icon/thumb-up.png");

                likeValue.style.color = "black";
              } else {
                for (
                  let checkLikeIndex = 0;
                  checkLikeIndex < likeArray.length;
                  checkLikeIndex++
                ) {
                  if (likeArray[checkLikeIndex] === uid) {
                    likeValue.style.color = "blue";
                    likeButton.setAttribute(
                      "src",
                      "https://cdn-icons-png.flaticon.com/128/889/889140.png"
                    );
                  } else {
                    likeValue.style.color = "black";
                    likeButton.setAttribute(
                      "src",
                      "./../assets/icon/thumb-up.png"
                    );
                  }
                }
              }
              // dislike button
              let dislikeButton = document.createElement("img");
              footerMain.appendChild(dislikeButton);
              dislikeButton.setAttribute(
                "src",
                "./../assets/icon/thumb-up (1).png"
              );
              dislikeButton.setAttribute("class", "dislikepic");
              let dislikeValue = document.createElement("p");
              footerMain.appendChild(dislikeValue);
              dislikeValue.setAttribute("id", "DisLikeValue");
              dislikeValue.innerHTML = `Dislike (${dislikeArray.length})`;
              dislikeButton.setAttribute("id", postIndex);
              if (dislikeArray.length === 0) {
                dislikeValue.style.color = "black";
              } else {
                for (
                  let checkDislikeIndex = 0;
                  checkDislikeIndex < dislikeArray.length;
                  checkDislikeIndex++
                ) {
                  if (dislikeArray[checkDislikeIndex] === uid) {
                    dislikeValue.style.color = "blue";
                    dislikeButton.setAttribute(
                      "src",
                      "https://cdn-icons-png.flaticon.com/128/889/889139.png"
                    );
                    
                  } else {
                    dislikeValue.style.color = "black";
                  }
                }
              }

              // comment button
              let commentButton = document.createElement("img");
              footerMain.appendChild(commentButton);
              commentButton.setAttribute("src", "./../assets/icon/comment.png");
              commentButton.setAttribute("class", "Commentpic");
              let commentValue = document.createElement("p");
              footerMain.appendChild(commentValue);
              commentValue.innerHTML = `Comment (${commentArray.length})`;
              {
                // show comment
                if (commentArray.length !== 0) {
                  let showCommentMain = document.createElement("div");
                  post.appendChild(showCommentMain);
                  // comment
                  for (var i = 0; i < commentArray.length; i++) {
                    let comment = document.createElement("div");
                    showCommentMain.appendChild(comment);
                    comment.setAttribute("class", "comment");
                    // comment profile
                    let comentProfile = document.createElement("img");
                    comment.appendChild(comentProfile);
                    comentProfile.setAttribute("class", "comentProfile");
                    // comment user name
                    let commentUserName = document.createElement("p");
                    comment.appendChild(commentUserName);
                    commentUserName.setAttribute("id", "commentUserName");
                    // get user data
                    console.log("all comments", commentArray[i]);
                    firebase
                      .firestore()
                      .collection("users/")
                      .doc(commentArray[i].uid)
                      .get()
                      .then((commentUserData) => {
                        console.log(commentUserData.data());
                        comentProfile.setAttribute(
                          "src",
                          commentUserData.data().ProfilePath === ""
                            ? "https://image.shutterstock.com/image-vector/human-head-vector-isolated-260nw-147002768.jpg"
                            : commentUserData.data().ProfilePath
                        );

                        let commentUserNamerText = document.createTextNode(
                          `${commentUserData.data().Name} ${
                            commentUserData.data().LastName
                          }`
                        );
                        commentUserName.appendChild(commentUserNamerText);
                      });

                    // comment details
                    let commnetDetails = document.createElement("p");
                    comment.appendChild(commnetDetails);
                    commnetDetails.setAttribute("id", "commnetDetails");
                    let commnetDetailsText = document.createTextNode(
                      commentArray[i].commentValue
                    );
                    commnetDetails.appendChild(commnetDetailsText);
                  }
                }
              }
              // write comment
              var writeCommentMain = document.createElement("div");
              post.appendChild(writeCommentMain);
              var textarea = document.createElement("textarea");
              writeCommentMain.appendChild(textarea);
              textarea.setAttribute("id", `textarea${postIndex}`);
              textarea.setAttribute("placeholder", "Write comment ...");
              textarea.setAttribute("class", "textarea");
              // add commnet
              let addCommnet = document.createElement("img");
              addCommnet.setAttribute("src", "./../assets/icon/message.png");
              addCommnet.setAttribute("class", "button");

              writeCommentMain.appendChild(addCommnet);
              // addCommnet.innerHTML = "Add";
              // addCommnet.setAttribute("class", "button");
              addCommnet.setAttribute("id", postIndex);
              // like function
              likeButton.addEventListener("click", () => {
                let like = false;
                for (
                  let likeIndex = 0;
                  likeIndex < likeArray.length;
                  likeIndex++
                ) {
                  if (likeArray[likeIndex] === uid) {
                    like = true;
                    likeArray.splice(likeIndex, 1);
                  }
                }
                if (!like) {
                  likeArray.push(uid);
                }
                // update like
                firebase
                  .firestore()
                  .collection("Posts/")
                  .doc(allPosts[likeButton.id].id)
                  .update({
                    like: likeArray,
                  });
              });
              // dislike function
              dislikeButton.addEventListener("click", () => {
                let dislike = false;
                for (
                  let dislikeIndex = 0;
                  dislikeIndex < dislikeArray.length;
                  dislikeIndex++
                ) {
                  if (dislikeArray[dislikeIndex] === uid) {
                    dislike = true;
                    dislikeArray.splice(dislikeIndex, 1);
                  }
                }
                if (!dislike) {
                  dislikeArray.push(uid);
                }
                //
                firebase
                  .firestore()
                  .collection("Posts/")
                  .doc(allPosts[dislikeButton.id].id)
                  .update({
                    dislike: dislikeArray,
                  });
              });
              // comment function
              addCommnet.addEventListener("click", () => {
                let targetTextarea = document.getElementById(
                  `textarea${addCommnet.id}`
                );
                if (targetTextarea.value === "") {
                  alert("Type something...");
                } else {
                  let commentData = {
                    commentValue: targetTextarea.value,
                    uid: uid,
                  };
                  commentArray.push(commentData);
                  // comment update
                  firebase
                    .firestore()
                    .collection("Posts/")
                    .doc(allPosts[addCommnet.id].id)
                    .update({
                      comment: commentArray,
                    });
                }
              });
            }
          }
        });
    } else {
      window.location.assign("./email-ver.html");
    }
  } else {
    window.location.assign("./log-in.html");
  }
});
let LogOut = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      window.location.assign("./log-in.html");
    });
};
