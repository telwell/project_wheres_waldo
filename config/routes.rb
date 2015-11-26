Rails.application.routes.draw do
  root 'waldo#show'
  resource :waldo, only: [:show]
  resources :tags, only: [:create]
  resource :session, only: [:destroy]
  resources :users, only: [:create]
  post 'show_all_tags' => 'tags#show_all_tags'
  post 'save_time' => 'sessions#save_time'
  get 'victory' => 'waldo#victory'

  # TODO: Remove the line below. It's only for debugging.
  get 'show_all_tags' => 'tags#show_all_tags'
end