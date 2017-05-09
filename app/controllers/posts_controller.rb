class PostsController < ApplicationController
  def show
    @post = Post.find(params[:id])
  end

  def new
    @post = current_user.posts.build
  end

  def create
    @post = current_user.posts.build(post_params)
    if @post.save
      flash[:success] = "Your post was successfully created!"
      redirect_to post_path(@post)
    else
      render :new
    end
  end

  private

  def post_params
    params.require(:post).permit(:title, :content, :user_id)
  end
end
