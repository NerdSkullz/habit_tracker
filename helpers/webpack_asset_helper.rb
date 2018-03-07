MANIFEST_PATH = File.join(Dir.pwd, 'tmp', 'dist', 'manifest.json')

module WebpackAssetHelper
  def webpack_asset_path(path)
    manifest = JSON.parse(File.read(MANIFEST_PATH)) if File.exist?(MANIFEST_PATH)
    raise "#{MANIFEST_PATH} is missing." unless manifest
    hashed_asset_path = manifest[path]
    raise "Can't find #{path} in webpack assets. See `manifest.json` for complete list." unless hashed_asset_path
    hashed_asset_path
  end

  def webpack_image_path(path)
    webpack_asset_path("images/#{path}")
  end

  def webpack_font_path(path)
    webpack_asset_path("fonts/#{path}")
  end
end
