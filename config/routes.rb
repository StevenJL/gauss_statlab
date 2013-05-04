GaussLab::Application.routes.draw do

  root :to => "univariates#show"

  match 'about' => 'about#show'

end
