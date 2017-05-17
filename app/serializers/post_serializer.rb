class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :content, :created_at

  belongs_to :user
  has_many :comments
  has_many :categories

  # make a method that formats the created_at being returned
  def created_at
    object.created_at.strftime("%B %d, %Y")
  end
end
