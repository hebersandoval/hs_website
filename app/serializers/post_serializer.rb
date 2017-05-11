class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :content, :created_at

  # make a method that formats the created_at being returned
  def created_at
    # post.created_at.strftime("%B %d, %Y")
    # time_ago_in_words(post.created_at)
  end
end
