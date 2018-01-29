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
    //var input = $searchInput.replace(" ", "+");

    $.get(url, { apikey: apiKey, r: "json", s: $searchInput }, function(data) {
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
    //Change url to backend, and get to post.
    $.get(url, { apikey: apiKey, r: "json", i: imdbId}, function(data) {
      console.log(data);
    });
  });

  function createTable(data){
    var movieSearchResult = "";
    $.each(data.Search, function (index, item) {
        console.log(item);
        movieSearchResult += '<div class="gallery">' +
          '<img src=" ' + item.Poster + '" /> ' +
          '<div class"desc">' + item.Title + '<br/> ' +
          '<button type="button" id="' + item.imdbID + '"class="infoMovie btn btn-primary btn-xs">Info</button>' +
          '<button type="button" id="' + item.imdbID + '"class="addMovie btn btn-primary btn-xs">Add</button>' +
          '</div>' +
          '</div>';
    });

    $content.append(movieSearchResult);
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
