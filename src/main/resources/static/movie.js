$(document).ready(function(){
  var $content = $('#content');

  $('#list').on('click', function(){
    $content.empty();
    $.get("movie/all", function(data) {
        createTable(data);
    });
  });

  $('#add').on('click', function(){
    $content.empty();
    createAddForm();
  });

    $('#searchInput').on('change', function (event){
        $content.empty();
        var $searchInput = $('#searchInput').val();
        var url = "movie/find/" + $searchInput;

        $.get(url, function(data) {
            createTable(data);
        });
    });

  $content.on('submit', '#formAdd', function(event) {
    event.preventDefault();
    $.get('movie/add', $('#formAdd').serialize());
    $(this)[0].reset();
  });

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

    $content.append(table);
  }

  function createAddForm(){
    var form = '<div class="offset-1 mt-5"><form id="formAdd" class="col-4" >' +
                '<div>' +
                  '<div class="form-group">' +
                    '<label for="movieTitle">Titel</label>' +
                    '<input type="text" class="form-control" name="movieTitle" placeholder="Titel"/>' +
                  '</div>' +
                  '<div class="form-group">' +
                    '<label for="storyLine">Storyline</label>' +
                    '<input type="text" class="form-control" name="storyLine" placeholder="Storyline" />' +
                  '</div>' +
                  '<div class="form-group">' +
                    '<label for="language">Language</label>' +
                    '<input type="text" class="form-control" name="language" placeholder="Language" />' +
                  '</div>' +
                  '<div class="form-group">' +
                    '<label for="runtime">Runtime</label>' +
                    '<input type="text" class="form-control" name="runtime" placeholder="Runtime" />' +
                  '</div>' +
                '</div>' +
                '<button type="submit" class="btn btn-primary">Add</button>' +
              '</form></div>';

      $content.append(form);
  }

});
