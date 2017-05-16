class CommentsController < ApplicationController
  def create
    @post = Post.find(params[:post_id])
    @comment = @post.comments.build(comment_params)
    @comment.user_id = current_user.id
    if @comment.save
      flash[:notice] = "Successfully created comment!"
      # redirect_to post_comments_path(@comment)
      redirect_to @comment.post
    else
      redirect_to :back, alert: "Your comment was not saved!"
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:content)
  end
end
