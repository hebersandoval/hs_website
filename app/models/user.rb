class User < ApplicationRecord
  enum role: [:guest, :vip, :admin]
  after_initialize :set_default_role, :if => :new_record?
  validates :name, presence: true

  def set_default_role
    self.role ||= :guest
  end
  
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
end
