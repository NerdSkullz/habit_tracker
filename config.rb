###
# Site settings
###
set :site_url, 'http://example.com/'
set :site_title, 'Site Title'
set :site_name, '<site-name>'

# Replace 'nil' with your Google Analytics key, eg. 'XX-XXXXXXXX-X'
set :google_analytics, nil

###
# Page options, layouts, aliases and proxies
###
# Per-page layout changes:
#
# With no layout
page '/*.xml',  layout: false
page '/*.json', layout: false
page '/*.txt',  layout: false

# Disable directory_index for 404 page
page '/404.html', directory_index: false

# Ignore .keep files
ignore '*/.keep'

###
# Extensions
###
# Rsync deployment
activate :rsync do |rsync|
  rsync.production_server = 'UNKNOWN'
  rsync.staging_server = 'hhdclient.com.au'
  rsync.path  = "/var/www/apps/middleman/#{config[:site_name]}"
  rsync.user  = 'capistrano'
end

# Webpack asset pipeline
activate :external_pipeline,
  name: :webpack,
  command: build? ? 'yarn run build' : 'yarn run start',
  source: 'tmp/dist',
  latency: 1

# Pretty URLs (https://middlemanapp.com/advanced/pretty_urls/)
activate :directory_indexes

###
# Environment settings
###
# Development-specific configuration
configure :development do
  # Reload the browser automatically whenever files change
  # activate :livereload
end

# Build-specific configuration
configure :build do
  activate :minify_html
  activate :gzip, exts: %w(.css .html .js .json .svg .txt .xml)
end
