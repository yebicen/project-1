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
    }

    //onclick the term items    
    $(".term").on("click", displayWikipedia);
   
//end of ducoment ready	
});
    
    
    
    
    
    
    
    
    
    
    
    