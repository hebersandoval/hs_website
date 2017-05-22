class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :created_at

  has_many :tags

  # make a method that formats the created_at being returned
  def created_at
    object.created_at.strftime("%B %d, %Y")
  end
end
