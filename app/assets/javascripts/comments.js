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

Comment.success = function(json) {
  // i want json to be a js obj of the comment that was created
  var comment = new Comment(json)
  var displayComment = comment.renderComment();
  $("#comment_content").val("")
  $(".comment").append(displayComment);
}

Comment.error = function(resp) {
  console.log('Did it break?', resp);
}

// Submit comment form using ajax
$(function() {
  // rails will generate the '#new_comment' in the html markup
  $("form#new_comment").on("submit", function(e) {
    e.preventDefault();
    var $form = $(this);
    var action = $form.attr("action");
    var params = $form.serialize();

    $.ajax({
      url: action,
      data: params,
      dataType: "json",
      method: "POST"
    })
      .success(Comment.success)
      .error(Comment.error)
  });
});
