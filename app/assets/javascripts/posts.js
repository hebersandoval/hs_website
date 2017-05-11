// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
// You can use CoffeeScript in this file: http://coffeescript.org/

// Get the next post on the show page
$(function() {
  $(".js-next").on("click", function(e) {
    var nextId = parseInt($(".js-next").attr("data-id")) + 1;
    $.get("/posts/" + nextId + ".json", function(data) {
      // get post
      console.log(data)
      var post = data;
      $(".post-title").text(post["title"]);
      $(".post-article").text(post["content"]);
      $(".post-created").text(post["created_at"]);
      // re-set the id to current on the link
      $(".js-next").attr("data-id", post["id"]);
    });
    e.preventDefault();
  });
});

// Get the previous post on the show page
$(function() {
  $(".js-prev").on("click", function(e) {
    var nextId = parseInt($(".js-next").attr("data-id")) - 1;
    $.get("/posts/" + nextId + ".json", function(data) {
      // get post
      console.log(data)
      var post = data;
      $(".post-title").text(post["title"]);
      $(".post-article").text(post["content"]);
      $(".post-created").text(post["created_at"]);
      // re-set the id to current on the link
      $(".js-next").attr("data-id", post["id"]);
    });
    e.preventDefault();
  });
});
