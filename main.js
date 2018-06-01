var anime = ["Castle in the Sky", "Princess Mononoke", "Attack on Titan", "Naruto"];
console.log(anime);

function getGifs() {

    $("#gifs").html("");

    var animeData = $(this).attr("data-name");
    var apiURL = "https://api.giphy.com/v1/gifs/search?q=" + animeData + "&api_key=P4i1tg8uwwsiy6GdiVj9aOOsE3vDMHfP&limit=10&rating=pg&offset=10";

    // api call and response
    $.ajax({
        url: apiURL,
        method: "GET"
    }).then(function(apiResponse) {
        console.log(apiResponse);

        var responseData = apiResponse.data;

        for (var i = 0; i<responseData.length; i++) {

            var ratings = responseData[i].rating;
            $('#gifs').append("Rating: " + ratings + "<br>");
            
            var gifImage = responseData[i].images.fixed_height.url;
            
            $('#gifs').append($(`<img src="${gifImage}">` + "<br><br>"));
            
            }
        });

    }

    //   Function for displaying animeData as a button

    function createButtons() {

        $("#buttons").empty();

        for (var i = 0; i < anime.length; i++) {

            var newButton = $("<button>");

            newButton.addClass("anime");
            newButton.attr("data-name", anime[i]);
            newButton.text(anime[i]);

            $("#buttons").append(newButton);
        }
            // Adds user input into the array anime[], creating a new button
        $("#add-button").on("click", function(event) {
            event.preventDefault();
        
            var userInput = $("#user-input").val().trim();
            console.log(userInput);
        
            anime.push(userInput);
            $("#add-button").off("click");

            createButtons();
        });
    }

    $(document).on("click", ".anime", getGifs);

    createButtons();