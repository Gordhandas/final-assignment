// var uid;
// let loading = document.getElementById("loading");
// let postShow = document.getElementById("postShow");
// firebase.auth().onAuthStateChanged((user) => {
//   if (user) {
//     uid = user.uid;
//     if (user.emailVerified) {
//       console.log("verified");
//       // get all posts
//       firebase
//         .firestore()
//         .collection("Posts/")
//         .where("fileType", "==","video/mp4")
        
//           loading.style.display = "none";
//           postShow.style.display = "block";
//           postShow.innerHTML = "";
//           var allPosts = [];
//           // querySnapshot.docChanges().forEach((change) => {
//           //   console.log(change.doc.data());
//           // });
//           if ("fileURl" === 0) {
//             var message = document.createElement("h1");
//             postShow.appendChild(message);
//             message.innerHTML = "No data available";
//           } else {
//             querySnapshot.forEach((res) => {
//               allPosts.push(res.data());
//             });
//             // loop
//             for (var postIndex = 0; postIndex < allPosts.length; postIndex++) {
//               let likeArray = allPosts[postIndex].like;
//               let dislikeArray = allPosts[postIndex].dislike;
//               let commentArray = allPosts[postIndex].comment;
//               // show post details
//               var post = document.createElement("div");
//               postShow.appendChild(post);
//               post.setAttribute("class", "post");
//               // post header
//               var postHeader = document.createElement("div");
//               post.appendChild(postHeader);
//               postHeader.setAttribute("class", "postHeader");
//               // user profile
//               let userProfile = document.createElement("img");
//               postHeader.appendChild(userProfile);
//               userProfile.setAttribute("class", "postProfile");

//               // user name
//               var userName = document.createElement("p");
//               postHeader.appendChild(userName);
//               // console.log(userName);
//               // get user data
//               firebase
//                 .firestore()
//                 .collection("users/")
//                 .doc(allPosts[postIndex].uid)
//                 .get()
//                 .then((userData) => {

//                   //////
//                   userProfile.setAttribute(
//                     "src",
//                     userData.data().profileImagePath === ""
//                       ? "https://cdn.pixabay.com/photo/2018/08/28/12/41/avatar-3637425__340.png"
//                       : userData.data().profileImagePath
//                   );
//                   let userNameText = document.createTextNode(
//                     // console.log(userData.data())
//                     `${userData.data().Name} ${userData.data().LastName}`
//                   );

//                   userName.appendChild(userNameText);
//                   userName.setAttribute("class", "userName")

                  

//                   // console.log(userData.data())
//                   // console.log( `${userData.data().Name} ${userData.data().LastName}`);
//                 });
            
//               // created date
//               var createdDate = document.createElement("p");
//               userName.appendChild(createdDate);
//               let createdDateText = document.createTextNode("10 08, 2022");
//               createdDate.appendChild(createdDateText);
//               createdDate.setAttribute("class", "date")

//               // post details

//               var postDetails = document.createElement("p");
//               post.appendChild(postDetails);
//               postDetails.setAttribute("id", "postDetail")
//               let postDetailsText = document.createTextNode(
//                 allPosts[postIndex].PostValue
//               );
//               postDetails.appendChild(postDetailsText);

//               // image or videos
//               if (allPosts[postIndex].fileURl !== "") {
//                 // image
//                 if (
//                   allPosts[postIndex].fileType === "image/png" ||
//                   allPosts[postIndex].fileType === "image/jpeg" ||
//                   allPosts[postIndex].fileType === "image/jpg"
//                 ) {
//                   let postImage = document.createElement("img");
//                   post.appendChild(postImage);
//                   postImage.setAttribute("class", "postImage");
//                   postImage.setAttribute("src", allPosts[postIndex].fileURl);
//                 } else {
//                   // video
//                   let video = document.createElement("video");
//                   post.appendChild(video);
//                   video.setAttribute("controls", "true");
//                   video.setAttribute("class", "postVideo");
//                   let source = document.createElement("source");
//                   video.appendChild(source);
//                   source.setAttribute("src", allPosts[postIndex].fileURl);
//                   source.setAttribute("type", "video/mp4");
//                 }
//               }
//               // post footer
//               let footerMain = document.createElement("div");
//               post.appendChild(footerMain);
//               footerMain.setAttribute("class", "footerMain");
//               // like button
//               let likeButton = document.createElement("button");
//               footerMain.appendChild(likeButton);
//               likeButton.innerHTML = `Like ${likeArray.length}`;
//               likeButton.setAttribute("id", postIndex);
//               if (likeArray.length === 0) {
//                 likeButton.style.color = "red";
//               } else {
//                 for (
//                   let checkLikeIndex = 0;
//                   checkLikeIndex < likeArray.length;
//                   checkLikeIndex++
//                 ) {
//                   if (likeArray[checkLikeIndex] === uid) {
//                     likeButton.style.color = "green";
//                   } else {
//                     likeButton.style.color = "red";
//                   }
//                 }
//               }
//               // dislike button
//               let dislikeButton = document.createElement("button");
//               footerMain.appendChild(dislikeButton);
//               dislikeButton.innerHTML = `Dislike ${dislikeArray.length}`;
//               dislikeButton.setAttribute("id", postIndex);
//               if (dislikeArray.length === 0) {
//                 dislikeButton.style.color = "red";
//               } else {
//                 for (
//                   let checkDislikeIndex = 0;
//                   checkDislikeIndex < dislikeArray.length;
//                   checkDislikeIndex++
//                 ) {
//                   if (dislikeArray[checkDislikeIndex] === uid) {
//                     dislikeButton.style.color = "green";
//                   } else {
//                     dislikeButton.style.color = "red";
//                   }
//                 }
//               }


//               // comment button
//               let commentButton = document.createElement("button");
//               footerMain.appendChild(commentButton);
//               commentButton.innerHTML = `Comment ${commentArray.length}`;
//               {
//                 // show comment
//                 if (commentArray.length !== 0) {
//                   let showCommentMain = document.createElement("div");
//                   post.appendChild(showCommentMain);
//                   // comment
//                   for (var i = 0; i < commentArray.length; i++) {
//                     let comment = document.createElement("div");
//                     showCommentMain.appendChild(comment);
//                     comment.setAttribute("class", "comment");
//                     // comment profile
//                     let comentProfile = document.createElement("img");
//                     comment.appendChild(comentProfile);
//                     comentProfile.setAttribute("class", "comentProfile");
//                     // comment user name
//                     let commentUserName = document.createElement("p");
//                     comment.appendChild(commentUserName);
//                     commentUserName.setAttribute("id", "commentUserName")
//                     // get user data
//                     console.log("all comments", commentArray[i]);
//                     firebase
//                       .firestore()
//                       .collection("users/")
//                       .doc(commentArray[i].uid)
//                       .get()
//                       .then((commentUserData) => {
//                         console.log(commentUserData.data());
//                         comentProfile.setAttribute(
//                           "src",
//                           commentUserData.data().profileImagePath === ""
//                             ? "https://image.shutterstock.com/image-vector/human-head-vector-isolated-260nw-147002768.jpg"
//                             : commentUserData.data().profileImagePath
//                         );

//                         let commentUserNamerText =
//                           document.createTextNode(`${commentUserData.data().Name} ${commentUserData.data().LastName}`);
//                         commentUserName.appendChild(commentUserNamerText);
//                       });


//                     // comment details
//                     let commnetDetails = document.createElement("p");
//                     comment.appendChild(commnetDetails);
//                     commnetDetails.setAttribute("id", "commnetDetails")
//                     let commnetDetailsText = document.createTextNode(
//                       commentArray[i].commentValue
//                     );
//                     commnetDetails.appendChild(commnetDetailsText);
//                   }
//                 }
//               }
//               // write comment
//               var writeCommentMain = document.createElement("div");
//               post.appendChild(writeCommentMain);
//               var textarea = document.createElement("input");
//               writeCommentMain.appendChild(textarea);
//               textarea.setAttribute("id", `input${postIndex}`);
//               textarea.setAttribute("placeholder", "Write comment ...")
//               textarea.setAttribute("class", "textarea")
//               // add commnet
//               let addCommnet = document.createElement("button");
//               writeCommentMain.appendChild(addCommnet);
//               addCommnet.innerHTML = "Add";
//               addCommnet.setAttribute("class", "button");
//               addCommnet.setAttribute("id", postIndex);
//               // like function
//               likeButton.addEventListener("click", () => {
//                 let like = false;
//                 for (
//                   let likeIndex = 0;
//                   likeIndex < likeArray.length;
//                   likeIndex++
//                 ) {
//                   if (likeArray[likeIndex] === uid) {
//                     like = true;
//                     likeArray.splice(likeIndex, 1);
//                   }
//                 }
//                 if (!like) {
//                   likeArray.push(uid);
//                 }
//                 // update like
//                 firebase
//                   .firestore()
//                   .collection("Posts/")
//                   .doc(allPosts[likeButton.id].id)
//                   .update({
//                     like: likeArray,
//                   });
//               });
//               // dislike function
//               dislikeButton.addEventListener("click", () => {
//                 let dislike = false;
//                 for (
//                   let dislikeIndex = 0;
//                   dislikeIndex < dislikeArray.length;
//                   dislikeIndex++
//                 ) {
//                   if (dislikeArray[dislikeIndex] === uid) {
//                     dislike = true;
//                     dislikeArray.splice(dislikeIndex, 1);
//                   }
//                 }
//                 if (!dislike) {
//                   dislikeArray.push(uid);
//                 }
//                 //
//                 firebase
//                   .firestore()
//                   .collection("Posts/")
//                   .doc(allPosts[dislikeButton.id].id)
//                   .update({
//                     dislike: dislikeArray,
//                   });
//               });
//               // comment function
//               addCommnet.addEventListener("click", () => {
//                 let targetTextarea = document.getElementById(
//                   `input${addCommnet.id}`
//                 );
//                 if (targetTextarea.value === "") {
//                   alert("Type something...");
//                 } else {
//                   let commentData = {
//                     commentValue: targetTextarea.value,
//                     uid: uid,
//                   };
//                   commentArray.push(commentData);
//                   // comment update
//                   firebase
//                     .firestore()
//                     .collection("Posts/")
//                     .doc(allPosts[addCommnet.id].id)
//                     .update({
//                       comment: commentArray,
//                     });
//                 }
//               });
//             }
//           }
//     } else {
//       window.location.assign("./email-ver.html");
//     }
//   } else {
//     window.location.assign("./log-in.html");
//   }
// });
// let LogOut = () => {
//   firebase
//     .auth()
//     .signOut()
//     .then(() => {
//       window.location.assign("./log-in.html");
//     });
// };






































// // var uid;
// // let loading = document.getElementById("loading");
// // let postShow = document.getElementById("postShow");
// // firebase.auth().onAuthStateChanged((user) => {
// //   if (user) {
// //     uid = user.uid;
// //     if (user.emailVerified) {
// //       console.log("verified");

// //       firebase
// //         .firestore()
// //         .collection("Posts/")
// //         .where("fileType", "==","video/mp4")
// //         .get()
// //         .then((res) => {
// //           console.log(res);
// //           res.forEach((userData) => {
// //             console.log(userData.data());
// //             loading.style.display = "none";
// //           postShow.style.display = "block";
// //           postShow.innerHTML = "";
// //           var allPosts = [];
// //           // querySnapshot.docChanges().forEach((change) => {
// //           //   console.log(change.doc.data());
// //           // });
// //           if ("fileType" === 0) {
// //             var message = document.createElement("h1");
// //             postShow.appendChild(message);
// //             message.innerHTML = "No data available";
// //           } else {
// //             // querySnapshot.forEach((res) => {
// //             //   allPosts.push(res.data());
            
// //             // });
            
// //             let video = document.createElement("video");
// //             postShow.appendChild(video);
// //             video.setAttribute("controls", "true");
// //             video.setAttribute("class", "postVideo");
// //             let source = document.createElement("source");
// //             video.appendChild(source);
// //             source.setAttribute("src", allPosts[postIndex].fileURl);
// //             source.setAttribute("type", "video/mp4");
// //           }
// //           });
          
// //         });
// //     }
// //   }
// // });
