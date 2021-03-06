class Post < ApplicationRecord
  validates :title, presence: true
  validates :content, presence: true
  validates :user_id, presence: true

  belongs_to :user
  has_many :comments, dependent: :destroy
  has_many :post_categories
  has_many :categories, through: :post_categories

  def self.search(search)
    where("title || content LIKE ?", "%" + search + "%")
  end
end
