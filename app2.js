$(document).ready(function () {



    var database = firebase.database();



    firebase.auth().onAuthStateChanged(function (user) {
        user = firebase.auth().currentUser;
        if (user) {
            console.log('signed in! Auth state change detected!');

            var userUID = firebase.auth().currentUser.uid;
            console.log(userUID);

            var ref = database.ref('/Users/' + userUID);

            //
            ref.on("child_added", function (snapshot) {
                console.log(snapshot.val().term);
                if (snapshot.val().term != undefined) {
                $("#termList tbody").prepend('<tr><td>' + snapshot.val().term + '</td><td>' + snapshot.val().dateAdded + '</td></tr>');
                }
                else {
                    return false;
                }
            });

        } else {
            // No user is signed in.
            console.log('not signed in. Auth state change detected!');
        }

    });


})