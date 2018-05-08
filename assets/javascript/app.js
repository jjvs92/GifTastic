$(document).ready(function(){

    //create array with topics
    var topics= ["Boston Terrier", "Dalmation", "Golden Retriever", "French Poodle", "Great Dane", "Chihuahua", "Pug", "German Shepherd", "English Bull Dog", "Saint Bernard", "Rottweiler", "Beagle", "Dobermann", "Siberian Huskey"]

    // create for loop to display buttons
    for(var i=0; i<topics.length; i++){
       $(".buttons").append(`<button type="button" class="breedButtons" data-name="${topics[i]}">${topics[i]}`)        
    }

    // creating function to get the gifs when clicking on button    

    function pullGifs(){

        var breed = $(this).attr("data-name");
        var apiKey = "noUBPJjYfo00Ox801Irpg8NqhNawzmLB";
        var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + breed + "&api_key=" + apiKey + "&limit=10"
        //console.log(breed);
        $.ajax({
            url: queryUrl,
            method: "GET",
        }).then(function(response){
            $(".gifDisplay").text("");
            var results = response.data;
            console.log(results);

            for(var i=0; i<results.length; i++){

                var breedDiv= $("<div>");

                var p= $("<p>").text("Rating: " + results[i].rating);

                var breedImage= $("<img>");
                
                breedImage.attr("src", results[i].images.fixed_height.url)

                breedDiv.append(breedImage);
                breedDiv.append(p);
                $(".gifDisplay").prepend(breedDiv);
            }                           
        })
    }



    $("body").on("click", ".breedButtons", pullGifs)

})



