module ApplicationHelper
  
  def logo
    logo = image_tag("logo.png", :alt => "Michiels Vleeswaren | 100% uw smaak", :class => "logo", :width => "381", :height => "83")
  end

  
  #Return a title on a per-page basis
  def title
    base_title = "Michiels Vleeswaren"
    if @title.nil?
      base_title
    else
      "#{base_title} | #{@title}"
    end
  end
  
end
