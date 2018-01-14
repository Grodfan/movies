$(document).ready(function(){
  $("#formAdd").submit(function(event) {
    event.preventDefault();
    $.get('/movie/add', $("#formAdd").serialize());
  });
});
