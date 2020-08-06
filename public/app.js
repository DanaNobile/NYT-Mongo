

// Grab the articles as a json

$.getJSON("/articles", function (data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
        // Display the apropos information on the page

        $("#articles").append("<h2 data-id='" + data[i]._id + "'>" + data[i].title + "</h2>" + data[i].link + "<br />" + "<br />" + data[i].teaser + "<hr>" + "</hr>" + "</h2>");

        // Gives undefined title in note and disconnections from function 
        // $("#articles").append("<p data-id='" + data[i]._id + "'>" + "<h2>" + data[i].title + "</h2>" + data[i].link + "<br />" + "<br />" + data[i].teaser + "<hr>" + "</hr>" + "</p>");

        // Working with breaks and line but removed h2
        // $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + data[i].link + "<br />" + "<br />" + data[i].teaser + "<hr>" + "</hr>" + "</p>");

        // Original Working with No Stylying 
        // $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + data[i].teaser + "</p>");
    }
});



// Whenever someone clicks a h2 tag
$(document).on("click", "h2", function () {
    // Empty the notes from the note section
    $("#notes").empty();
    // Save the id from the p tag
    var thisId = $(this).attr("data-id");
    // console.log("data-id")

    // Now make an ajax call for the Article
    $.ajax({
        method: "GET",
        url: "/articles/" + thisId
    })
        // With that done, add the note information to the page
        .then(function (data) {
            console.log(data);
            // The title of the article
            $("#notes").append("<h2>" + data.title + "</h2>");
            // An input to enter a new title
            $("#notes").append("<input id='titleinput' name='title' >");
            // A textarea to add a new note body
            $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
            // A button to submit a new note, with the id of the article saved to it
            $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

            // If there's a note in the article
            if (data.note) {
                // Place the title of the note in the title input
                $("#titleinput").val(data.note.title);
                // Place the body of the note in the body textarea
                $("#bodyinput").val(data.note.body);
            }
        });
});

// When you click the savenote button
$(document).on("click", "#savenote", function () {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");

    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {
            // Value taken from title input
            title: $("#titleinput").val(),
            // Value taken from note textarea
            body: $("#bodyinput").val()
        }

    })

        // var note = $("#bodyinput").val()
        // var test = $("#test")

        // note.append(test)


        // With that done
        .then(function (data) {
            // Log the response
            console.log(data);
            // Empty the notes section
            $("#notes").empty();
        });

    // Also, remove the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
});






$(document).on("click", ".clear", function () {
    $("#articles").hide();
});

$(document).on("click", ".scrape-new", function () {
    $("#articles").show();
    $.get("/scrape", function (data) {
        console.log("scraped")
    })


});