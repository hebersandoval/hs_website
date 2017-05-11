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

// Pagination
// $(function() {
//   $(document.body).off('click', 'pagination a');
//   $(document.body).on('click', 'pagination a', function(e) {
//     e.preventDefault();
//     var loadingHTML = "<div class='loading'>Loading...</div>";
//     $("#blog_pagination").html(loadingHTML).load($(this).attr("href"));
//     return false;
//   });
// });
