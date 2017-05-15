class CategoriesController < ApplicationController
  before_action :authenticate_user!, except: [:index]
  before_action :admin_only, except:[:index]

  def index
    @categories = Category.all
  end

  def new
    @category = Category.new
  end

  def create
    @category = Category.create(category_params)
    if @category.save
      flash[:notice] = "Successfully created category!"
      redirect_to categories_path
    else
      render :new
    end
  end

  def edit
    @category = Category.find(params[:id])
  end

  def update
    @category = Category.find(params[:id])
    if @category.update_attributes(category_params)
      flash[:notice] = "Successfully updated category!"
      redirect_to categories_path
    else
      render :edit
    end
  end

  def destroy
    Category.find(params[:id]).destroy
    flash[:notice] = "Successfully deleted category!"
    redirect_to categories_path
  end

  private

  def category_params
    params.require(:category).permit(:name)
  end

  def admin_only
    unless current_user.admin?
      redirect_to root_path, :alert => "Access denied."
    end
  end
end
