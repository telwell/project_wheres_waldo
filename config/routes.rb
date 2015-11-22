Rails.application.routes.draw do
  root 'waldo#show'
  resource :waldo, only: [:show]
end