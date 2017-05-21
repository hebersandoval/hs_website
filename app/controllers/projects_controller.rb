class ProjectsController < ApplicationController
  def index
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

  private

  def project_params
    params.require(:project).permit(:title, :description, tag_ids: [])
  end
end
