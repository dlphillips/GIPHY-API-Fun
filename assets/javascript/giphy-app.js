$(document).ready(function() {

    var myButtons = ["Joyful", "Proud", "Enthusiastic", "Guilty", "Vengeful", "Worried", "Shocked", "Embarrassed", "Enamored", "Fearful", "Humiliated", "Cautious", "Relieved", "Insulted", "Frustrated", "Depressed", "Confused", "Overwhelmed", "Annoyed", "Grumpy"];
    var imageUrl = [];
    var stillimageUrl = [];

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
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + bClick + "&rating=pg-13&limit=10&api_key=dc6zaTOxFJmzC";
        $.ajax({
                url: queryURL,
                method: "GET"
            })
            .done(function(response) {
                for (var i = 0; i < 10; i++) {
                    imageUrl[i] = response.data[i].images.fixed_height.url;
                    stillimageUrl[i] = response.data[i].images.fixed_height_still.url;
                    var imgDiv = $("<div>");
                    imgDiv.addClass("imageDiv image well well-sm");
                    var cImage = $("<img>");
                    cImage.attr("src", stillimageUrl[i]);
                    cImage.attr("alt", bClick + " Image #" + i);
                    cImage.attr("alt_src", imageUrl[i]);
                    cImage.addClass("image well well-sm");
                    imgDiv.append(cImage);
                    var imgRating = $("<h3>");
                    imgRating.text("Rating: " + response.data[i].rating.toUpperCase());
                    imgDiv.append(imgRating);
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

    function imageSwitch() {
        tmp = $(this).attr('src');
        $(this).attr('src', $(this).attr('alt_src'));
        $(this).attr('alt_src', tmp);
    }

    function addBtn() {
        event.preventDefault();
        var tFeeling = $("#feeling").val().trim();
        myButtons.push(tFeeling);
        createButtons();
    }

    $(document).on("click", ".subject", subjectClick);
    $(document).on("click", ".image", imageSwitch);
    $("#feelingSubmit").on("click", addBtn);

    createButtons();

});
