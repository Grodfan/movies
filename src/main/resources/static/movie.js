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
      var input = $searchInput.replace(" ", "+");
      var url = "http://www.omdbapi.com/?apikey=86e1e674&r=json&s=" + input;
      $.get(url, function(data) {
          console.log(data);
          createTable(data);
      });
  });



    $().on('change', function (event){
        $content.empty();
        var $searchInput = $('#searchInput').val();
        var url = "movie/find/" + $searchInput;

        $.get(url, function(data) {
            console.log(data);

            createTable(obj);
        });
    });

  $content.on('submit', '#formAdd', function(event) {
    event.preventDefault();
    $.get('movie/add', $('#formAdd').serialize());
    $(this)[0].reset();
  });

  function createTable(data){
    var title = 'Title';
    var year = 'Year';
    var poster = 'Poster'
    var table = '<table class="table table-striped">' +
                '<thead' +
                  '<tr>' +
                  '<th scope="col">' + '#' + '</th>' +
                  '<th scope="col">' + title + '</th>' +
                  '<th scope="col">' + year + '</th>' +
                  '<th scope="col">' + poster + '</th>' +
                  '</tr>' +
                  '</thead>' +
                  '<tbody>';
    $.each(data.Search, function (index, item) {
        console.log(item);
        table += '<tr><th scope="row">' + (index + 1) + '</th>';
        table += '<td>' + item.Title + '</td>';
        table += '<td>' + item.Year + '</td>';
      //  table += '<td><img src=" ' + item.Poster + ' /></td></tr>';
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

  function searchMovie(){
    $.getJSON("http://www.omdbapi.com/?apikey=86e1e674&t=Terminator&y=1984", function(data) {
      console.log(data);
    });
  }

});
