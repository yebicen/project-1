$(document).ready(function () {
    var config = {
        apiKey: "AIzaSyBQKVvElJCzBRpp49UB1kXZVfnM_ty9fOU",
        authDomain: "project-1-97352.firebaseapp.com",
        databaseURL: "https://project-1-97352.firebaseio.com",
        projectId: "project-1-97352",
        storageBucket: "project-1-97352.appspot.com",
        messagingSenderId: "711415812320"
    };
    firebase.initializeApp(config);

    $('#myAcct').hide();
    $('#logOutBtn').hide();
    $('#loginLaunch').hide();

    $('#myAcctNew').show();
    $('#homeBtn').show();


    var database = firebase.database();



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

    });


})