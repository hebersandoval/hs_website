class CommentsController < ApplicationController
  before_action :authenticate_user!, except: [:index, :show]
  before_action :admin_only, except: [:index, :show, :create]

  def create
    @post = Post.find(params[:post_id])
    @comment = @post.comments.build(comment_params)
    @comment.user_id = current_user.id
    if @comment.save
      flash[:notice] = "Successfully created comment!"
      respond_to do |format|
        format.html { redirect_to @comment.post }
        format.json { render json: @comment }
      end
      # redirect_to post_comments_path(@comment)
      # redirect_to @comment.post
    else
      redirect_to :back, alert: "Your comment was not saved!"
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:content)
  end

  def admin_only
    unless current_user.admin?
      redirect_to :back, alert: "Access denied!"
    end
  end
end
