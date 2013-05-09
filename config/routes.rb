GaussLab::Application.routes.draw do

  root :to => "univariates#show"

  get 'about' => 'about#show'

  get "/two_sample_test" => "two_sample_tests#show"

  match "/two_sample_test/compute" => "two_sample_tests#compute"

  match "/univariate/compute" => "univariates#compute"

  match "/linear_regressions" => "linear_regressions#show"

  match "/linear_regressions/compute" => "linear_regressions#compute"

  match "/one_way_anovas" => "one_way_anovas#show"

  match "/one_way_anovas/compute" => "one_way_anovas#compute"

  match "/chisquares" => "chisquares#show"

  match "/shpr-wlk-qqs" => "shapiro_wilks_qqs#show"

  match "/confidence_intervals" => "confidence_intervals#show"

  mathjax 'mathjax'

end

