$(document).ready(function (){
    loadAllMovies();
});

function loadAllMovies() {
    $.getJSON("movie/all", function(data) {
        createTable(data);
    });
}

function createTable(data){
    var movieTitle = 'Title';
    var storyLine = 'Storyline';
    var language = 'Language';
    var runtime = 'Runtime';
    var table = '<table class="table table-striped">' +
                '<thead' +
                '<tr>' +
                '<th scope="col">' + '#' + '</th>' +
                '<th scope="col">' + movieTitle + '</th>' +
                '<th scope="col">' + storyLine + '</th>' +
                '<th scope="col">' + language + '</th>' +
                '<th scope="col">' + runtime + '</th>' +
                '</tr>' +
                '</thead>' +
                '<tbody>';

    $.each(data, function (index) {
        table += '<tr><th scope="row">' + (index + 1) + '</th>'
        table += '<td>' + data[index].movieTitle + '</td>';
        table += '<td>' + data[index].storyline + '</td>';
        table += '<td>' + data[index].language + '</td>';
        table += '<td>' + data[index].runtime + '</td></tr>';
    });

    table += '</tbody></table>';

    $(".table-container").html(table);
}
