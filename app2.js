$(document).ready(function () {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBQKVvElJCzBRpp49UB1kXZVfnM_ty9fOU",
        authDomain: "project-1-97352.firebaseapp.com",
        databaseURL: "https://project-1-97352.firebaseio.com",
        projectId: "project-1-97352",
        storageBucket: "project-1-97352.appspot.com",
        messagingSenderId: "711415812320"
    };
    firebase.initializeApp(config);


    var dataRef = firebase.database();


    var term = "";

    var email = "test@testemail.com";
    var password = "123456";
    var passwordConfirm = "123456";

    // var addToDatabase = function () {

    //     dataRef.ref().push({
    //         user: email,
    //         dateAdded: firebase.database.ServerValue.TIMESTAMP
    //     })
    // }
    var signInUser = function () {
        // email = $("#uEmailLogin").val().trim();
        // password = $("#uLoginPassword").val().trim();
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;

            // ...
        });
    }

    // Function = Register new user 
    function registerNewUser () {
        // email = $("#uEmailRegister").val().trim();
        // password = $("#uRegPassword").val().trim();
        // passwordConfirm = $("#uRegReenterPassword").val().trim();
        if (password === passwordConfirm) {
            console.log("password match!");
            firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
            });
            signInUser();




            // Call addToDatabase function
            // addToDatabase();
        } else {
            console.log("password does not match");
        }
    }

    registerNewUser();



    // Register user
    // $("#registerBtn").on("click", function (event) {
    //     console.log("registration clicked!");
    //     registerNewUser();
    // })

    // Sign In function
    



    // Sign In
    $("#signInBtn").on("click", function (event) {
        signInUser();
    })



    // Log out function
    function logOutUser() {
        firebase.auth().signOut().then(function () {
            // Sign-out successful.
        }).catch(function (error) {
            // An error happened.
        });
    }

    //  Log Out
    $("#logOutBtn").on("click", function (event) {
        console.log("log out clicked");
        logOutUser();
    })

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            user.getIdToken().then(function (data) {
                console.log(data)
            });
        }
    });

    // Auth State listener

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log(user);
            console.log(user.uid);
            Auth.currentUser.getIdToken().then(function (data) {
                console.log(data)
            });
            // User is signed in.
            console.log("User is signed in!");
            var email = user.email;
            var uid = user.uid;
            var providerData = user.providerData;
            console.log(email);
            console.log(uid);
            console.log(providerData);

            // ...
        } else {
            console.log("User is signed out!");
            // User is signed out.
            // ...
        }
    });







    // Save search term-------------------------------------------------------------
    // $(".term").on("click", function(event){
    //     term = $(this).text();
    //     console.log(term);
    //     dataRef.ref().push({
    //         term : term,
    //         dateAdded: firebase.database.ServerValue.TIMESTAMP
    //     })
    // })
    //-------------------------------------------------------------------------------    
})