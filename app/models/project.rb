class Project < ApplicationRecord
  validates :title, presence: true
  validates :description, presence: true

  has_many :project_tags
  has_many :tags, through: :project_tags
end
