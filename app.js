  

$(document).ready(function(){
   //book api https://openlibrary.org/dev/docs/api/search
    var topic = "HTML";
    var bookURL = "http://openlibrary.org/search.json?q=" + topic;
    

    var apikey ="789e45a2a4014a3aa4ab244aafe10ff2";
    var customConfigId="1120492719";
    var ecommerceWeb = "Amazon"

    $.ajax({
        url: bookURL,
        method: "GET"
      }).then(function(response) {
        //console.log(response.docs[1].title);
        console.log(JSON.parse(response).docs[0]);
        console.log(JSON.parse(response).docs.length);
        var n = 0;
        for (var i = 0; i < 4; i++) {
            n=i+1;   
            console.log("i: "+ i+ " n: "+n);
            $("<div>").text("ISBN: "+JSON.parse(response).docs[i].isbn[0]+'; '+JSON.parse(response).docs[i].isbn[1]).attr("class", "isbn").prependTo("#book"+n);
            var bookAuthor = JSON.parse(response).docs[i].author_name;
            $("<div>").text("Author: "+bookAuthor).attr("class","bookauthor").prependTo("#book"+n);
            if (JSON.parse(response).docs[i].subtitle) {
                bookName = JSON.parse(response).docs[i].title +" "+ JSON.parse(response).docs[i].subtitle;
                $("<div>").text("Title: "+bookName).attr("class","bookname").prependTo("#book"+n);
              } else {
                bookName = JSON.parse(response).docs[i].title;
                $("<div>").text("Title: "+bookName).attr("class","bookname").prependTo("#book"+n);
              }
              
              var searchTerm = bookName + " " + bookAuthor + " " + ecommerceWeb;
              console.log(searchTerm);
              var params = {
                // Request parameters
                  "q": searchTerm,
                  "customconfig": customConfigId,
                  "mkt": "en-US",
                  "safe-search": "Moderate",
                  count: 3,
                  offset: 0
              
               };
               var amaLink = "";
               var x="";
              $.ajax({
                url: "https://api.cognitive.microsoft.com/bingcustomsearch/v7.0/search?" + $.param(params),
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
                
                amaLink = data.webPages.value[0].url;
                x++;
                    $("#buy"+x).attr("href", amaLink);
                    console.log(x);
                
                console.log(amaLink);
                
                //console.log($("#buy"+n).attr("href"));
                //$("#buy"+n).attr("href", amaLink);
                // $('<a class="btn btn-primary" role="button">').attr("href",amaLink).text("Buy").appendTo("#book"+n);
              })
              .fail(function() {
                console.log("error");
              });
              //console.log(amaLink);
            //$("#buy"+n).attr("href", amaLink);  //need to test tmrw
            //<a class="btn btn-primary" href="#" role="button" id="buy4">Buy</a>
            //$('<a class="btn btn-primary" role="button">').attr("href",amaLink).text("Buy").appendTo("#book"+n);
         }
      });
            //assign href to buy button

    
              

         
         
 
    


    

    //custom bing search api
    var docType = "pdf";
    var onlineSearch = topic + " " + docType;
    console.log(onlineSearch);
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
        //console.log("i: "+ i+ " y: "+y);
          
        
        $("<div>").text("Description: "+data.webPages.value[i].snippet).attr("class", "docDesc").prependTo("#doc"+y);   
        $("<div>").text("Name: "+data.webPages.value[i].name).attr("class", "docName").prependTo("#doc"+y); 
        $(("#download"+y)).attr("href",data.webPages.value[i].url);
          
        }
    })
    .fail(function() {
      console.log("error");
    });


//click Doctype
     $('.docType').on("click",function(){
       console.log(this);
       docType = $(this).attr("id");
       $(".docDesc").remove();
       $(".docName").remove();
       var onlineSearch = topic + " " + docType;
       console.log(onlineSearch);
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
        //console.log("i: "+ i+ " y: "+y);
                 
           
           $("<div>").text("Description: "+data.webPages.value[i].snippet).attr("class", "docDesc").prependTo("#doc"+y);
           $("<div>").text("Name: "+data.webPages.value[i].name).attr("class", "docName").prependTo("#doc"+y);
           $(("#download"+y)).attr("href",data.webPages.value[i].url);
          
           }
        })
       .fail(function() {
        console.log("error");
        });



     });


    //https://www.bing.com/images/search?q=imgurl:https%3A%2F%2Fimages.furniture.com%2Fliving-rooms%2Fsofas%2Fnorthway-red-sofa-10192665.jpg%3Fw%3D680%26h%3D450&view=detailv2&iss=sbi&FORM=IRSBIQ&redirecturl=https%3A%2F%2Fwww.bing.com%2Fimages%2Fsearch%3Fq%3Dhttps%253a%252f%252fimages.furniture.com%252fliving-rooms%252fsofas%252fnorthway-red-sofa-10192665.jpg%253fw%253d680%2526h%253d450%26FORM%3DHDRSC2&ajaxhist=0



 })      //document.ready