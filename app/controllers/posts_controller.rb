class PostsController < ApplicationController
  before_action :authenticate_user!, except: [:index, :show]
  before_action :admin_only, except: [:index, :show]
  before_action :set_category, only: [:index, :show, :new, :edit]

  def index
    @posts = Post.all
    if params[:search]
      @posts = Post.search(params[:search]).order('created_at DESC')
    else
      @posts = Post.all.order('created_at DESC')
    end
    respond_to do |format|
      format.html { render :index}
      format.json { render json: @posts }
    end
  end

  def show
    @comment = Comment.new
    @post = Post.find(params[:id])
    respond_to do |format|
      format.html { render :show }
      format.json { render json: @post }
    end
  end

  def content
    post = Post.find(params[:id])
    render plain: post.content
  end

  def new
    @post = current_user.posts.build
    if params[:category_id]
      @category = Category.find(params[:category_id])
    end
  end

  def create
    @post = current_user.posts.build(post_params)
    if params[:category_id]
      @category = Category.find(params[:category_id])
      @post.categories << @category
    end
    if @post.save
      flash[:success] = "Your post was successfully created!"
      redirect_to post_path(@post)
    else
      render :new
    end
  end

  def edit
    @post = Post.find(params[:id])
    @post.categories.build
  end

  def update
    @post = Post.find(params[:id])
    if @post.update_attributes(post_params)
      flash[:success] = "Your post was successfully updated!"
      redirect_to post_path(@post)
    else
      render :edit
    end
  end

  def destroy
    Post.find(params[:id]).destroy
    flash[:success] = "Your post was successfully deleted!"
    redirect_to posts_path
  end

  private

  def post_params
    params.require(:post).permit(:title, :content, :user_id, category_ids: [])
  end

  def set_category
    @categories = Category.all
  end

  def admin_only
    unless current_user.admin?
      redirect_to root_path, alert: "Access denied!"
    end
  end
end
