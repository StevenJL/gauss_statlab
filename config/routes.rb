GaussLab::Application.routes.draw do

  root :to => "univariates#show"

  match 'about' => 'about#show'

  match "/univariate/compute" => "univariates#compute"

end
