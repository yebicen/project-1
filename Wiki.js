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

            var Title = $("<h3>").text(response.title);
            var pOne = $("<p><strong>").text(response.description);
            var pTwo = $("<p>").text(response.extract);
            var pThree = $("<p>").text(response.api_urls.summary);

         

            $("#wiki").append(newPanelGroup)
            newPanelGroup.append(newPanel);
            newPanel.append(newPanelHeading);
            newPanelHeading.append(Title);
            newPanel.append(newPanelbody);

           newPanelbody.append(pOne);
           newPanelbody.append(pTwo);
           newPanelbody.append(pThree);
        
         });

     //end of displayWikipedia function   
    }

    //onclick the term items    
    $(".term").on("click", displayWikipedia);
   
//end of ducoment ready	
});
    
    
    
    
    
    
    
    
    
    
    
    