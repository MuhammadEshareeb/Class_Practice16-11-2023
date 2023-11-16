const firebaseConfig = {
  apiKey: "AIzaSyCV2S7sXPrZ0L2W-qzwWtKCdp2T2qGVQ5c",
  authDomain: "authclass1.firebaseapp.com",
  databaseURL: "https://authclass1-default-rtdb.firebaseio.com",
  projectId: "authclass1",
  storageBucket: "authclass1.appspot.com",
  messagingSenderId: "612199620507",
  appId: "1:612199620507:web:3c49e7a60a848b491d0b3e",
  measurementId: "G-SX6R0ZQBB1"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


var sign_in_btn = document.querySelector("#sign-in-btn");
var sign_up_btn = document.querySelector("#sign-up-btn");
var container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});
// ================*****Login*****=================
function login(){
  var email = document.getElementById("email");
  var password = document.getElementById("password");
  firebase.auth().signInWithEmailAndPassword(email.value, password.value)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    console.log(user);
    firebase.auth().currentUser.sendEmailVerification()
  .then(() => {
    Swal.fire({
      title: "Sweet!",
      text: "Salam, Check your Verification Email.",
      imageUrl: "https://img.freepik.com/free-vector/thank-you-background-with-lettering-watercolor-stain_23-2147826444.jpg?size=338&ext=jpg&ga=GA1.1.1826414947.1699228800&semt=ais",
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: "https://img.freepik.com/free-vector/thank-you-background-with-lettering-watercolor-stain_23-2147826444.jpg?size=338&ext=jpg&ga=GA1.1.1826414947.1699228800&semt=ais"
    });    
  });
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage);
  }); 
}
// ******once*******
// function getDataFormFirebase(){
//   firebase.database()
//   .ref("UserDetails")
//   .once("value",function(data){
//     console.log(data.val());
//   });
// }
// getDataFormFirebase();
// ********on*********
// function getDataFormFirebase(){
//   firebase.database()
//   .ref("UserDetails")
//   .on("child_added",function(data){
//     console.log(data.val());
//   });
// }
// getDataFormFirebase();
// *******remove********
// function removeFirebase(){
//   firebase.database().ref("UserDetails/93475954").remove();
// }
// removeFirebase();

// ================*****Singup*****================
function singup(){
  var Username = document.getElementById("Username");
  var email1 = document.getElementById("email1");
  var Address = document.getElementById("Address");
  var Age = document.getElementById("Age");
  var password1 = document.getElementById("password1");
  firebase.auth().createUserWithEmailAndPassword(email1.value, password1.value)
.then((userCredential) => {
  // Signed in 
  var user = userCredential.user;
  console.log(user)

})
.catch((error) => {
  var errorCode = error.code;
  var errorMessage = error.message;
  console.log(errorMessage)
});
  // *******DataBAse*******
  var userValue = {
    Username : Username.value,
    email : email1.value,
    Address : Address.value,
    Age : Age.value,
    password: password1.value,

  }
  console.log(userValue);
  var key = Math.random() * 123456789;
firebase.database().ref("UserDetails/" + Math.round(key)).set(userValue)
}
// =================*****Forgot Password*****=============
function forgetpassword() {
  var email = document.getElementById("email");

  firebase
    .auth()
    .sendPasswordResetEmail(email.value)
    .then(() => {
      Swal.fire({
        title: "Are you sure?",
        text: "ForGet your Password!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Done!",
            text: "Your Password has been deleted.Check your email and change your password",
            icon: "success"
          });
        }
      });
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
    });
}
// ==========*****SingIn Google*****=======
var googleLogin = document.getElementById("googleLogin");
var googleprovider = new firebase.auth.GoogleAuthProvider();
googleLogin.addEventListener("click", function () {

  firebase
    .auth()
    .signInWithPopup(googleprovider)
    .then((result) => {
      var credential = result.credential;
      var token = credential.accessToken;
      var user = result.user;
      console.log(user);
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      var email = error.email;
      var credential = error.credential;
    });
});

// ============*****SingIn GitHub *****==============
var githublogin = document.getElementById("githublogin");
var provider = new firebase.auth.GithubAuthProvider();

firebase
.auth()
.signInWithPopup(provider)
.then((result) => {
  /** @type {firebase.auth.OAuthCredential} */
  var credential = result.credential;

  // This gives you a GitHub Access Token. You can use it to access the GitHub API.
  var token = credential.accessToken;

  // The signed-in user info.
  var user = result.user;
  console.log(user);
  // IdP data available in result.additionalUserInfo.profile.
  // ...
})
.catch((error) => {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  console.log(errorMessage);
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
});



