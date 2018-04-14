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

    $(".search-term").on("click", function(event){
        term = $(this).text();
        console.log(term);
        dataRef.ref().push({
            term : term,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        })
    })
})