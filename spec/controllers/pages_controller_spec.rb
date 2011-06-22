require 'spec_helper'

describe PagesController do
	render_views

  before(:each) do
    @base_title = "Michiels Vleeswaren"
  end
  
  describe "GET 'home'" do
    it "should be successful" do
      get 'home'
      response.should be_success
    end
    
    it "should have the right title" do
      get 'home'
      response.should have_selector("title",
                                    :content => @base_title + " | Home")
    end
  end

  describe "GET 'verkoop'" do
    it "should be successful" do
      get 'verkoop'
      response.should be_success
    end
    
    it "should have the right title" do
      get 'verkoop'
      response.should have_selector("title",
                                    :content => @base_title + " | Verkoop")
    end
  end

  describe "GET 'productie'" do
    it "should be successful" do
      get 'productie'
      response.should be_success
    end
    
    it "should have the right title" do
      get 'productie'
      response.should have_selector("title",
                                    :content => @base_title + " | Productie")
    end
  end
  
  describe "GET 'administratie'" do
    it "should be successful" do
      get 'administratie'
      response.should be_success
    end
    
    it "should have the right title" do
      get 'administratie'
      response.should have_selector("title",
                                    :content => @base_title + " | Administratie")
    end
  end

end
