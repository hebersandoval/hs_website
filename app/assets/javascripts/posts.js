// Get the next post on the show page
$(function() {
  $(".js-next").on("click", function(e) {
    e.preventDefault();
    var nextId = parseInt($(".js-next").attr("data-id")) + 1;
    history.pushState(null, null, "" + nextId)
    $.get("/posts/" + nextId + ".json", function(data) {
      // get post
      var post = data;
      $(".post-title").text(post["title"]);
      $(".post-article").text(post["content"]);
      $(".post-created").text(post["created_at"]);
      // re-set the id to current on the link
      $(".js-next").attr("data-id", post["id"]);
    });
  });
});

// Get the previous post on the show page
$(function() {
  $(".js-prev").on("click", function(e) {
    e.preventDefault();
    var prevId = parseInt($(".js-next").attr("data-id")) - 1;
    history.pushState(null, null, "" + prevId)
    $.get("/posts/" + prevId + ".json", function(data) {
      // get post
      var post = data;
      $(".post-title").text(post["title"]);
      $(".post-article").text(post["content"]);
      $(".post-created").text(post["created_at"]);
      // re-set the id to current on the link
      $(".js-next").attr("data-id", post["id"]);
    });
  });
});

// Display the rest of truncated post without full page refresh
$(function() {
  $(".js-more").on("click", function() {
    var id = $(this).data("id");
    $.get("/posts/" + id + ".json", function(data) {
      var contentText = "<p>" + data.content + "</p>";
      $("#content-" + id).html(contentText);
    });
  });
});
