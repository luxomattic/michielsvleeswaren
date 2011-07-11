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
  
  it "should have a signup page at '/signup'" do
    get '/signup'
    response.should have_selector('title', :content => "Gebruikers")
  end
  
  it "should have the right links on the layout" do
    visit root_path
    click_link "Home"
    response.should have_selector('title', :content => "Home")
    click_link "Verkoop"
    response.should have_selector('title', :content => "Verkoop")
    click_link "Productie"
    response.should have_selector('title', :content => "Productie")
    click_link "Administratie"
    response.should have_selector('title', :content => "Administratie")
    click_link "Gebruikers"
    response.should have_selector('title', :content => "Gebruikers")
  end
  
  describe "when not signed in" do
    it "should have a signin link" do
      visit root_path
      response.should have_selector("a", :href => signin_path, :content => "Sign in")
    end
  end
  
  describe "when signed in" do
    
    before(:each) do
      @user = Factory(:user)
      visit signin_path
      fill_in :email, :with => @user.email
      fill_in :password, :with => @user.password
      click_button
    end
    
    it "should have a signout link" do
      visit root_path
      response.should have_selector("a", :href => signout_path, :content => "Sign out")
    end
    
    it "should have a profile link" do
      visit root_path
      response.should have_selector("a", :href => user_path(@user), :content => "Profiel")
    end    
  end
end
