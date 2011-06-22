require 'spec_helper'

describe "LayoutLinks" do
  
  it "should have a Home page at '/'" do
    get '/'
    response.should have_selector('title', :content => "Home")
  end
  
  it "should have a Verkoop page at '/verkoop'" do
    get '/verkoop'
    response.should have_selector('title', :content => "Verkoop")
  end
  
  it "should have a Productie page at '/productie'" do
    get '/productie'
    response.should have_selector('title', :content => "Productie")
  end
  
  it "should have a Adminstratie page at '/administratie'" do
    get '/administratie'
    response.should have_selector('title', :content => "Administratie")
  end
end
