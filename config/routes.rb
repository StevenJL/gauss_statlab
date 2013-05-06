GaussLab::Application.routes.draw do

  root :to => "univariates#show"

  match 'about' => 'about#show'

  match "/two_sample_test" => "two_sample_tests#show"

  match "/two_sample_test/compute" => "two_sample_tests#compute"

  match "/univariate/compute" => "univariates#compute"

  match "/confidence_intervals" => "confidence_intervals#show"

  match "/linear_regressions" => "linear_regressions#show"

  match "/one_way_anovas" => "one_way_anovas#show"

end
