// Prototype
function Comment(attributes) {
  this.id = attributes.id;
  this.content = attributes.content;
}

$(function() {
  Comment.source = $("#comment-template").html();
  Comment.template = Handlebars.compile(Comment.source);
});

Comment.prototype.renderComment = function() {
  // Use handlebars
  return Comment.template(this);
}

// Submit comment form using ajax
$(function() {
  // rails will generate the '#new_comment' in the html markup
  $("form#new_comment").on("submit", function(e) {
    e.preventDefault();
    console.log("stop")
    var $form = $(this);
    var action = $form.attr("action");
    var params = $form.serialize();

    $.ajax({
      url: action,
      data: params,
      dataType: "json",
      method: "POST"
    })
      .success(function(json) {
        // i want json to be a js obj of the comment that was created
        console.log(json)

        var comment = new Comment(json)
        console.log(comment)
        var displayComment = comment.renderComment();
        console.log(displayComment)
        $("comment").append(displayComment);
      })
      .error(function(resp) {
        console.log('You broke it?', resp)
      })
  });
});
