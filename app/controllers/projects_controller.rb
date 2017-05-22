class ProjectsController < ApplicationController
  before_action :authenticate_user!, except: [:index, :show]
  before_action :admin_only, except: [:index, :show]
  before_action :set_tag, only: [:index, :show, :new, :edit]

  def index
    @projects = Project.all
    respond_to do |format|
      format.html { render :index}
      format.json { render json: @projects }
    end
  end

  def show
    @project = Project.find(params[:id])
  end

  def new
    @project = Project.new
  end

  def create
    @project = Project.create(project_params)
    # Add tag to project
    if params[:tag_id]
      @tag = Tag.find(params[:tag_id])
      @project.tags << @tag
    end
    if @project.save
      flash[:notice] = "Successfully created project!"
      redirect_to project_path(@project)
    else
      render :new
    end
  end

  def edit
    @project = Project.find(params[:id])
    @project.tags.build
  end

  def update
    @project = Project.find(params[:id])
    if @project.update_attributes(project_params)
      flash[:notice] = "Your project was successfully updated!"
      redirect_to project_path(@project)
    else
      render :edit
    end
  end

  def destroy
    Project.find(params[:id]).destroy
    flash[:success] = "Your project was successfully deleted!"
    redirect_to projects_path
  end

  private

  def project_params
    params.require(:project).permit(:title, :description, tag_ids: [])
  end

  def set_tag
    @tags = Tag.all
  end

  def admin_only
    unless current_user.admin?
      redirect_to root_path, alert: "Access denied!"
    end
  end
end
