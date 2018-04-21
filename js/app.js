$(document).ready(function () {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyC0rCQY0jzdWe5AhcQpvIuKMr9XbnRWDsk",
        authDomain: "project1-e7460.firebaseapp.com",
        databaseURL: "https://project1-e7460.firebaseio.com",
        projectId: "project1-e7460",
        storageBucket: "project1-e7460.appspot.com",
        messagingSenderId: "87795057294"
    };
    firebase.initializeApp(config);
    // Get a reference to the database service
    var database = firebase.database();
    var user;
    var userUID;
    $("#registerBtn").on("click", function (event) {
        event.preventDefault();
        var email = $("#uEmailRegister").val().trim();
        var password = $("#uRegPassword").val().trim();
        var passwordConfirm = $("#uRegReenterPassword").val().trim();
        if (password === passwordConfirm) {
            console.log('trying to create!');
            firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
            }).then(function (user) {
                $('#loginLaunch').click();
                console.log('User created!');
                userUID = firebase.auth().currentUser.uid;
                console.log(user.uid);
                //set userID in firebaseDB
                firebase.database().ref('/Users/' + userUID).set({
                    email: email,
                });

            })
        } else {
            console.log("password does not match!");
            $('#nav-register .modal-body').append('<div class="error">'+ 'Passwords do not match. Please enter matching passwords to register'+'</div>');
        }

    });


    $("#signInBtn").on("click", function (event) {
        event.preventDefault();
        var email = $("#uEmailLogin").val().trim();
        var password = $("#uLoginPassword").val().trim();
        console.log('trying to log in!');

        firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);

            if (errorCode == "auth/user-not-found") {
                $('#nav-login .modal-body').append('<div class="error">'+ 'This username does not exist. Please register.'+'</div>');
            }

            else if (errorCode == "auth/wrong-password") {
                $('#nav-login .modal-body').append('<div class="error">'+ 'Wrong Password. Please try again.'+'</div>');
            }
            // ...
        }).then(function(){
            //toggle modal off
            $('#loginLaunch').click();
            //show "my collections" link
            $('#myAcct').show();
        });
    });

    $("#logOutBtn").on("click", function (event) {
        event.preventDefault();
        console.log('trying Sign out in!');
        firebase.auth().signOut().then(function () {
            console.log('signed out!');
            // Sign-out successful.
            $('#logOutBtn').hide();
        }).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
        });
    });
    firebase.auth().onAuthStateChanged(function (user) {
        user = firebase.auth().currentUser;
        if (user) {
            var user = firebase.auth().currentUser;
            userUID = user.uid;
            $(".term").on("click", function (event) {
                var term = $(this).attr("data-name");
                var dateAdded = new Date().toUTCString();
                firebase.database().ref('/Users/' + userUID).push({
                    term: term,
                    dateAdded: dateAdded
                });
                console.log("worked!");
                console.log(term);
            });

            console.log('signed in! Auth state change detected!');
            console.log(user.uid);
            $('#loginLaunch').hide();
            $('#logOutBtn').show();
            $('#myAcct').show();
            // User is signed in.
        } else {
            // No user is signed in.
            console.log('not signed in. Auth state change detected!');
            $('#loginLaunch').show();
            $('#logOutBtn').hide();
            $('#myAcct').hide();
        }
        
    });


});