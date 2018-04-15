$(document).ready(function(){

    function displayWikipedia() {
        $("#wiki").empty();

        var searchID = $(this).attr("data-name");
        console.log(searchID);

        var queryURL = "https://en.wikipedia.org/api/rest_v1/page/summary/" + searchID;


        // Creating an AJAX call 
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
        
            console.log(response)

            var newPanelGroup = $("<div>").attr("class","panel-group");
            var newPanel = $("<div>").attr("class","panel panel-primary");
            var newPanelHeading = $("<div>").attr("class","panel-heading");
            var newPanelbody = $("<div>").attr("class","panel-body");
            var externalWikiLink = $("<div>").attr("class","alert alert-secondary");

            console.log(response.content_urls.desktop.page)

            var pThree = "<a href="  + response.content_urls.desktop.page + " target='_blank'>Check more on Wikipedia</a>";
            $(pThree).attr("class","alert-link");
         

            var pFour = "<a href= https://en.wikipedia.org/api/rest_v1/page/pdf/"  + searchID + ">Download PDF</a>";
            $(pFour).attr("class","alert-link")

            var Title = $("<h3>").text(response.title);
            var pOne = $("<h4>").text(response.description);
            var pTwo = $("<p>").text(response.extract);
        
            $("#wiki").append(newPanelGroup)
            newPanelGroup.append(newPanel);
            newPanel.append(newPanelHeading);
            newPanelHeading.append(Title);
            newPanel.append(newPanelbody);

           newPanelbody.append(pOne);
           newPanelbody.append(pTwo);
           newPanelbody.append(externalWikiLink);
           externalWikiLink.append(pThree);
           externalWikiLink.append(pFour);
        
         });

     //end of displayWikipedia function   
     //list books
     $("#suggestedBooks").empty();
     $('#onlineResources').empty();
     var topic = $(this).attr("data-name");
     var bookURL = "http://openlibrary.org/search.json?q=" + topic;
     
 
     var apikey ="789e45a2a4014a3aa4ab244aafe10ff2";
     var customConfigId="1120492719";
     var ecommerceWeb = "Amazon"
 
     $.ajax({
         url: bookURL,
         method: "GET"
       }).then(function(response) {
         //console.log(response.docs[1].title);
         //console.log(JSON.parse(response).docs[0]);
         //console.log(JSON.parse(response).docs.length);
         var n = 0;
         for (var i = 0; i < 4; i++) {
             n=i+1;   
             $('<div>').attr({"id":"book"+n,"class":"book"}).appendTo("#suggestedBooks");
             //console.log("i: "+ i+ " n: "+n);
             var isbnText =JSON.parse(response).docs[i].isbn[0]+'; '+JSON.parse(response).docs[i].isbn[1];
             $("<div>").text("ISBN: "+isbnText).attr("class", "isbn").prependTo("#book"+n);
             var bookAuthor = JSON.parse(response).docs[i].author_name;
             $("<div>").text("Author: "+bookAuthor).attr("class","bookauthor").prependTo("#book"+n);
             if (JSON.parse(response).docs[i].subtitle) {
                 bookName = JSON.parse(response).docs[i].title +" "+ JSON.parse(response).docs[i].subtitle;
                 $("<div>").text("Title: "+bookName).attr("class","bookname").prependTo("#book"+n);
               } else {
                 bookName = JSON.parse(response).docs[i].title;
                 $("<div>").text("Title: "+bookName).attr("class","bookname").prependTo("#book"+n);
               }
             $("<a role=button>").attr({"class":"btn btn-primary", "id":"buy"+n}).text("Buy").appendTo("#book"+n);
             $("<button type=button>").attr({"class":"btn btn-dark save", "id":"save"+n}).text("Save").appendTo("#book"+n);
        
               var searchTerm = bookName + " " + bookAuthor + " " + ecommerceWeb;
               console.log(searchTerm);
               var params = {
                 // Request parameters
                   "q": searchTerm,
                   "customconfig": customConfigId,
                   "mkt": "en-US",
                   "safe-search": "Moderate",
                   count: 1,
                   offset: 0
               
                };
                var amaLink = "";
                var x=0;
               $.ajax({
                 url: "https://api.cognitive.microsoft.com/bingcustomsearch/v7.0/search?" + $.param(params),
                 beforeSend: function(xhrObj){
                     // Request headers
                    xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", apikey);
                 },
                 type: "GET",
                 data: "",
               })
               .done(function(data) {
                 //alert("success");
                 console.log(data);
                 amaLink = data.webPages.value[0].url;
                 x++;
                 $("#buy"+x).attr("href", amaLink);
                 console.log(x);               
                 console.log(amaLink);
                 console.log($("#buy"+x).attr("href"));
                 
               })
               .fail(function() {
                 console.log("error");
               });
              
          }
       });
             //assign href to buy button
 
     //custom bing search api
    //  var docType = "pdf";
    //  var onlineSearch = topic + " " + docType;
    //  var params2 = {
    //    // Request parameters
    //      "q": onlineSearch,
    //      "customconfig": customConfigId,
    //      "mkt": "en-US",
    //      "safe-search": "Moderate",
    //      count: 5,
    //      offset: 0
     
    //   };
      
    //  $.ajax({
    //    url: "https://api.cognitive.microsoft.com/bingcustomsearch/v7.0/search?" + $.param(params2),
    //    beforeSend: function(xhrObj){
    //        // Request headers
    //       xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", apikey);
    //    },
    //    type: "GET",
    //    // Request body 
    //    data: "",
    //  })
    //  .done(function(data) {
    //    //alert("success");
    //    console.log(data);
    //    var y=0;
    //    for (var i = 0; i < 5; i++) {
    //      y=i+1;   
    //      //console.log("i: "+ i+ " y: "+y);
           
    //      $("<div>").attr("id","doc"+y).appendTo("#onlineResources");
    //      $("<div>").text("Description: "+data.webPages.value[i].snippet).attr("class", "docDesc").prependTo("#doc"+y);   
    //      $("<div>").text("Name: "+data.webPages.value[i].name).attr("class", "docName").prependTo("#doc"+y); 
        
    //      $('<a role="button" class="btn btn-primary">').attr("id","download"+y).text("Download").appendTo("#doc"+y);
    //      $('<button type="button" class="btn btn-dark">').text("Save").appendTo("#doc"+y);
    //      $(("#download"+y)).attr("href",data.webPages.value[i].url);
    //      $('<hr>').appendTo("#doc"+y);
                                   
    //      }
    //  })
    //  .fail(function() {
    //    console.log("error");
    //  });
 
 
 
    }

    //onclick the term items    
    $(".term").on("click", displayWikipedia);
   
//end of ducoment ready	
});
    
    
    
    
    
    
    
    
    
    
    
    