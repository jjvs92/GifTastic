$(document).ready(function(){

    //create array with topics
    var topics= ["Boston Terrier", "Dalmation", "Golden Retriever", "French Poodle", "Great Dane", "Chihuahua", "Pug", "German Shepherd", "English Bull Dog", "Saint Bernard", "Rottweiler", "Beagle", "Dobermann", "Siberian Huskey"]

    // Create function that displays the buttons
    function showButtons(){
        // create for loop to display buttons
        $(".buttons").empty();

        for(var i=0; i<topics.length; i++){
        $(".buttons").append(`<button type="button" class="breedButtons" data-name="${topics[i]}">${topics[i]}`)        
        }
    }

    // creating function to get the gifs when clicking on button    

    function pullGifs(){

        var breed = $(this).attr("data-name");
        var apiKey = "noUBPJjYfo00Ox801Irpg8NqhNawzmLB";
        var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + breed + "&api_key=" + apiKey + "&limit=10&rating=PG-13"
        
        //console.log(breed);
        $.ajax({
            url: queryUrl,
            method: "GET",
        }).then(function(response){
            $(".gifDisplay").text("");
            var results = response.data;
            console.log(results);

            for(var i=0; i<results.length; i++){
                var gifStill= results[i].images.fixed_height_still.url;
                var gifAnimate= results[i].images.fixed_height.url;

                var breedDiv= $("<div class= 'giphyClicks'>");

                var p= $("<p>").text("Rating: " + results[i].rating);

                var breedImage= $("<img>");
                
                breedImage.attr("src", gifStill);
                breedImage.attr("class", "clickableGif sizingGif");
                breedImage.attr("data-state", "still");
                breedImage.attr("data-still", gifStill);
                breedImage.attr("data-animate", gifAnimate);
                breedDiv.attr("class", "sizingGif");
                breedDiv.append(breedImage);
                breedDiv.append(p);
                $(".gifDisplay").prepend(breedDiv);
            }                           
        })
    }

    showButtons();
    
    $("body").on("click", ".breedButtons", pullGifs)

    $("#addBreed").on("click", function(event){
        event.preventDefault();
        var userBreed = $("#userBreed").val().trim();
        console.log(userBreed);
        topics.push(userBreed);
        console.log(topics)
        showButtons();
        $("#userBreed").val("");
    })

    $(".gifDisplay").on("click", ".clickableGif", function(){
        console.log(this);
        var state = $(this).attr("data-state");

        if(state === "still"){
           $(this).attr("data-state", "animate");
           $(this).attr("src", $(this).attr("data-animate"));
        }else{
            $(this).attr("data-state", "still");
            $(this).attr("src", $(this).attr("data-still"));
        }

    })
})



