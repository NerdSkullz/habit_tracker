module PageHelper
  def page_title
    if current_page.data.title
      "#{config[:site_title]} | #{current_page.data.title}"
    else
      config[:site_title]
    end
  end
end
