$(document).ready(function() {

    // declare variables and load list for buttons to array
    var myButtons = ["Joyful", "Proud", "Enthusiastic", "Guilty", "Vengeful", "Worried", "Shocked", "Embarrassed", "Enamored", "Fearful", "Humiliated", "Cautious", "Relieved", "Insulted", "Frustrated", "Depressed", "Confused", "Overwhelmed", "Annoyed", "Grumpy"];
    var imageUrl = [];
    var stillimageUrl = [];

    // function to iterate through myButtons array adding each as a new button.
    // "subject" class allows for listening for clicks on these buttons.
    // "data-id" stores the identifier for each that is passed to the subjectClick function.  
    function createButtons() {
        $("#buttons").empty();
        for (var i = 0; i < myButtons.length; i++) {
            var buttonTag = $("<button>");
            buttonTag.text(myButtons[i]);
            buttonTag.addClass("subject");
            buttonTag.attr("data-id", myButtons[i]);
            $("#buttons").append(buttonTag);
        }
    }

    // function called on button clicks
    function subjectClick() {
        // get id from clicked button
        var bClick = $(this).attr("data-id");
        // clear image divs
        $("#images-1").empty();
        $("#images-2").empty();
        // make image divs visible
        $("#images-1").show();
        $("#images-2").show();

        // AJAX query string based on value from button click.
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + bClick + "&rating=pg-13&limit=10&api_key=dc6zaTOxFJmzC";

        $.ajax({
                url: queryURL,
                method: "GET"
            })
            .done(function(response) {
                // query returns array of 10 objects. cycle through all to get needed values.
                for (var i = 0; i < 10; i++) {
                    // animated gif
                    imageUrl[i] = response.data[i].images.fixed_height.url;
                    // still gif
                    stillimageUrl[i] = response.data[i].images.fixed_height_still.url;
                    // add div for image
                    var imgDiv = $("<div>");
                    // add class for image div
                    imgDiv.addClass("imageDiv well well-sm");
                    // add image tag
                    var cImage = $("<img>");
                    // add image properties
                    cImage.attr("src", stillimageUrl[i]);
                    cImage.attr("alt", bClick + " Image #" + i);
                    cImage.attr("alt_src", imageUrl[i]);
                    cImage.addClass("image well well-sm");
                    // append img to div
                    imgDiv.append(cImage);
                    // create tag to hold rating
                    var imgRating = $("<h3>");
                    imgRating.text("Rating: " + response.data[i].rating.toUpperCase());
                    // append rating to image div
                    imgDiv.append(imgRating);
                    // add image divs to left or right divs based on i.
                    switch (i) {
                        case 0:
                        case 2:
                        case 4:
                        case 6:
                        case 8:
                            $("#images-1").append(imgDiv);
                            break;
                        case 1:
                        case 3:
                        case 5:
                        case 7:
                        case 9:
                            $("#images-2").append(imgDiv);
                            break;
                    }
                }
            });
    }

    // swap image src with alt_arc value to create animation affect. swap back when clicked again.
    function imageSwitch() {
        tmp = $(this).attr('src');
        $(this).attr('src', $(this).attr('alt_src'));
        $(this).attr('alt_src', tmp);
    }

    // read value from text input, add value to buttons array reset buttons. 
    function addBtn() {
        event.preventDefault();
        var tFeeling = $("#feeling").val().trim();
        myButtons.push(tFeeling);
        createButtons();
    }

    // listen for click on buttons and pass to subjectClick function
    $(document).on("click", ".subject", subjectClick);
    // listen for click on image and pass to imageSwitch function
    $(document).on("click", ".image", imageSwitch);
    // listen for click on submit button and call addBtn function
    $("#feelingSubmit").on("click", addBtn);

    // create buttons on initial page load and clear image divs for clean appearance
    createButtons();
    $("#images-1").hide();
    $("#images-2").hide();

});
