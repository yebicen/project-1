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
                console.log('User created!');
                userUID = firebase.auth().currentUser.uid;
                console.log(user.uid);
                //?????????????????????????????????????????????????????????????????
                firebase.database().ref('/Users/' + userUID).set({
                    email: email,
                });
                //?????????????????????????????????????????????????????????????????
            })
        } else {
            console.log("password does not match!");
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
            // ...
        }).then(function (user) {
            var user = firebase.auth().currentUser;
            console.log(user);
            if (user) {
                console.log('signed in! Auth state change detected!');
                console.log(user);
                $('#loginLaunch').hide();
                $('#logout').show();
                $('.close').click();
            } else {
                console.log('not signed in. Auth state change detected!');
                $('#loginLaunch').show();
                $('#logout').hide();
            }
        });
    });
    $("#logOutBtn").on("click", function (event) {
        event.preventDefault();
        console.log('trying Sign out in!');
        firebase.auth().signOut().then(function () {
            console.log('signed out!');
            // Sign-out successful.
            $('#logout').hide();
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
                firebase.database().ref('/Users/' + userUID).push({
                    term: term,
                    dateAdded: firebase.database.ServerValue.TIMESTAMP
                });
                console.log("worked!");
                console.log(term);
            });
            console.log('signed in! Auth state change detected!');
            console.log(user.uid);
            $('#loginLaunch').hide();
            $('#logout').show();
            $('.close').click();
            // User is signed in.
        } else {
            // No user is signed in.
            console.log('not signed in. Auth state change detected!');
            $('#loginLaunch').show();
            $('#logout').hide();

        }
    });

    
});