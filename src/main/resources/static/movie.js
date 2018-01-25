$(document).ready(function(){
  var $content = $('#content');
  var url = "http://www.omdbapi.com/";
  var apiKey = "86e1e674";

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
    event.preventDefault();
    $content.empty();
    var $searchInput = $('#searchInput').val();
    var input = $searchInput.replace(" ", "+");


    $.get(url, { apikey: apiKey, r: "json", s: input }, function(data) {
      console.log(data);
      createTable(data);
    });
  });

  $content.on('submit', '#formAdd', function(event) {
    event.preventDefault();
    $.get('movie/add', $('#formAdd').serialize());
    $(this)[0].reset();
  });

  $content.on('click', ".addMovie", function(event) {
    var imdbId = $(this).attr('id');
    $.get(url, { apikey: apiKey, r: "json", i: imdbId}, function(data) {
      console.log(data);
    });
  });

  function createTable(data){
    var title = 'Title';
    var year = 'Year';
    var poster = 'Poster'
    var table = '<table class="table table-striped">' +
                '<thead' +
                  '<tr>' +
                  '<th scope="col">' + '#' + '</th>' +
                  '<th scope="col">' + poster + '</th>' +
                  '<th scope="col">' + title + '</th>' +
                  '<th scope="col">' + year + '</th>' +
                  '<th scope="col"></th>' +
                  '</tr>' +
                  '</thead>' +
                  '<tbody>';
    $.each(data.Search, function (index, item) {
        console.log(item);
        table += '<tr><th scope="row">' + (index + 1) + '</th>';
        table += '<td><img width="100" height="150" src=" ' + item.Poster + '" /></td>';
        table += '<td>' + item.Title + '</td>';
        table += '<td>' + item.Year + '</td>';
        table += '<td><button type="button" id="' + item.imdbID + '"class="addMovie btn btn-primary btn-xs">Add</button></td></tr>';
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
