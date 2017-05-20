Rails.application.routes.draw do
  root 'pages#home'
  get 'portfolio', to: 'projects#index'
  get 'blog', to: 'posts#index'

  devise_for :users
  resources :users
  
  resources :posts do
    resources :comments, only: [:create]
  end

  resources :categories
  resources :projects
  resources :tags

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
