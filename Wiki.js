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

            var newPanelGroup = $("<div>").attr({"class":"panel-group","class":"w-100 p-3"});
            var newPanel = $("<div>").attr("class","panel panel-primary panel-transparent");
            var newPanelHeading = $("<div>").attr("class","panel-heading");
            var newPanelbody = $("<div>").attr("class","panel-body panel-transparent");
            var externalWikiLink = $("<div>").attr("class","alert alert-secondary");

            console.log(response.content_urls.desktop.page)

            var pThree = "<a href="  + response.content_urls.desktop.page + " target='_blank'><strong>Check more on Wikipedia</strong></a>";
            $(pThree).attr("class","alert-link");
         

            var pFour = "<a href= https://en.wikipedia.org/api/rest_v1/page/pdf/"  + searchID + "><strong>Download PDF</strong></a>";
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
         var minCt = Math.min(4,JSON.parse(response).docs.length);
         console.log(JSON.parse(response).docs.length);
         console.log(minCt);
         for (var i = 0; i < minCt; i++) {
             n=i+1;   
             var cardgroup = $("<div>").attr("class", "card-group")
             cardgroup.appendTo("#suggestedBooks")
             $('<div>').attr({"id":"book"+n,"class":"book card"}).appendTo(cardgroup);
             //console.log("i: "+ i+ " n: "+n);
             var isbnText =JSON.parse(response).docs[i].isbn[0]+'; '+JSON.parse(response).docs[i].isbn[1];
             $("<div>").text("ISBN: "+isbnText).attr("class", "isbn").prependTo("#book"+n);
             var bookAuthor = JSON.parse(response).docs[i].author_name;
             $("<div>").text("Author: "+bookAuthor).attr("class","bookauthor").prependTo("#book"+n);
             if (JSON.parse(response).docs[i].subtitle) {
                 bookName = JSON.parse(response).docs[i].title +" "+ JSON.parse(response).docs[i].subtitle;
                 $("<h4>").text("Book Title: "+bookName).attr("class","bookname card-header").prependTo("#book"+n);
               } else {
                 bookName = JSON.parse(response).docs[i].title;
                 $("<h4>").text("Book Title: "+bookName).attr("class","bookname card-header").prependTo("#book"+n);
               }
            
             var bottom = $("<div>").attr("class","card-footer")
             $("<a role=button>").attr({"class":"btn btn-warning bookbtn", "id":"buy"+n}).text("Buy").appendTo(bottom);
             $("<button type=button>").attr({"class":"btn btn-warning save", "id":"save"+n}).text("Save").appendTo(bottom);
             bottom.appendTo("#book"+n);
        
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
                 $("#buy"+x).attr("target", "_blank");
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
     var docType = "pdf";
     var onlineSearch = topic + " " + docType;
     var params2 = {
       // Request parameters
         "q": onlineSearch,
         "customconfig": customConfigId,
         "mkt": "en-US",
         "safe-search": "Moderate",
         count: 5,
         offset: 0
     
      };
      
     $.ajax({
       url: "https://api.cognitive.microsoft.com/bingcustomsearch/v7.0/search?" + $.param(params2),
       beforeSend: function(xhrObj){
           // Request headers
          xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", apikey);
       },
       type: "GET",
       // Request body 
       data: "",
     })
     .done(function(data) {
       //alert("success");
       console.log(data);
       var y=0;
       for (var i = 0; i < 5; i++) {
         y=i+1;   
       
         var panelgroup2 = $("<div>").attr({"class":"panel-group", "class":"w-100 p-3"})
         panelgroup2.appendTo("#onlineResources")
         
         $("<div>").attr({"id":"doc"+y, "class":"panel panel-primary panel-transparent"}).appendTo(panelgroup2);

         var panelgroup2body = $("<div>").attr("class", "panel-body")  
         panelgroup2body.prependTo("#doc"+y); 

         $("<div>").text("Digital Book Name: "+data.webPages.value[i].name).attr("class", "docName panel-heading").prependTo("#doc"+y); 

         $("<div>").text("Description: "+data.webPages.value[i].snippet).attr("class", "docDesc").prependTo(panelgroup2body);   

        

        
         var panelbottom = $("<div>").attr("class","alert alert-secondary panel-transparent");
         panelbottom.appendTo(panelgroup2body);
         $('<a role="button" class="btn btn-primary">').attr("id","download"+y).text("Download").appendTo(panelbottom);
         $('<button type="button" class="btn btn-dark">').text("Save").appendTo(panelbottom);
         $(("#download"+y)).attr("href",data.webPages.value[i].url);
                                   
         }
     })
     .fail(function() {
       console.log("error");
     });
 
 
 
    }

    //onclick the term items    
    $(".term").on("click", displayWikipedia);
     
    $('#bookList').on("click", 'button[class=save]',function(){

    });
//end of ducoment ready	
});
    
    
    
    
    
    
    
    
    
    
    
    