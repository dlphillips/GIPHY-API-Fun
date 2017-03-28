$(document).ready(function() {

    var myButtons = ["Joyful", "Proud", "Enthusiastic", "Guilty", "Vengeful", "Worried", "Shocked", "Embarrassed", "Enamored", "Fearful", "Humiliated", "Cautious", "Relieved", "Insulted", "Frustrated", "Depressed", "Confused", "Overwhelmed", "Annoyed", "Grumpy"];

    var imageUrl = [];
    var stillimageUrl = [];
    var imgState = "still"

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

    function subjectClick() {
        var bClick = $(this).attr("data-id");
        $("#images-1").empty();
        $("#images-2").empty();
        $("#images-3").empty();
        $("#images-4").empty();
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + bClick + "&rating=pg-13&limit=10&api_key=dc6zaTOxFJmzC";
        // var queryURL = "http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag="+bClick;
        $.ajax({
                url: queryURL,
                method: "GET"
            })
            .done(function(response) {
                // console.log(response);
                // var imageUrl = response.data.image_original_url;

                for (var i = 0; i < 10; i++) {
                    imageUrl[i] = response.data[i].images.fixed_width.url;
                    stillimageUrl[i] = response.data[i].images.fixed_width_still.url;
                    var imgDiv = $("<div>");
                    imgDiv.addClass("imageDiv");
                    var cImage = $("<img>");
                    cImage.attr("src", stillimageUrl[i]);
                    cImage.attr("alt", bClick + " Image #" + i);
                    cImage.attr("alt_src", imageUrl[i]);
                    cImage.addClass("image");
                    cImage.attr("data-imgid", i);
                    imgDiv.append(cImage);
                    var imgRating = $("<h3>");
                    imgRating.text("Rating: " + response.data[i].rating);
                    imgDiv.append(imgRating);
                    switch (i) {
                        case 0:
                        case 4:
                            $("#images-1").append(imgDiv);
                            break;
                        case 1:
                        case 5:
                        case 8:
                            $("#images-2").append(imgDiv);
                            break;
                        case 2:
                        case 6:
                        case 9:
                            $("#images-3").append(imgDiv);
                            break;
                        case 3:
                        case 7:
                            $("#images-4").append(imgDiv);
                            break;
                    }

                }
            });
    }

    function imageSwitch() {
        tmp = $(this).attr('src');
        $(this).attr('src', $(this).attr('alt_src'));
        $(this).attr('alt_src', tmp);
    }

    $(document).on("click", ".subject", subjectClick);
    $(document).on("click", ".image", imageSwitch);

    createButtons();

});
