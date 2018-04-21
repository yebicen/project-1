$(document).ready(function () {
    var config = {
        apiKey: "AIzaSyC0rCQY0jzdWe5AhcQpvIuKMr9XbnRWDsk",
        authDomain: "project1-e7460.firebaseapp.com",
        databaseURL: "https://project1-e7460.firebaseio.com",
        projectId: "project1-e7460",
        storageBucket: "project1-e7460.appspot.com",
        messagingSenderId: "87795057294"
    };
    firebase.initializeApp(config);

    $('#myAcct').hide();
    $('#logOutBtn').hide();
    $('#loginLaunch').hide();

    $('#myAcctNew').show();
    $('#homeBtn').show();


    var database = firebase.database();

<<<<<<< HEAD
    
=======


>>>>>>> master
    firebase.auth().onAuthStateChanged(function (user) {
        user = firebase.auth().currentUser;
        if (user) {
            console.log('signed in! Auth state change detected!');

            var userUID = firebase.auth().currentUser.uid;
            console.log(userUID);

            var ref = database.ref('/Users/' + userUID);

            //////
            ref.on("child_added", function (snapshot) {
                console.log(snapshot.val().term);
                $("#content").prepend('<button type="button" class="btn btn-primary">' + snapshot.val().term + '</button>');
            });

        } else {
            // No user is signed in.
            console.log('not signed in. Auth state change detected!');
        }
<<<<<<< HEAD
    });
=======

    });


>>>>>>> master
})