# frozen_string_literal: true

source "https://rubygems.org"

git_source(:github) {|repo_name| "https://github.com/#{repo_name}" }

# gem "rails"

gem "fastlane", "2.219.0"

plugins_path = File.join(File.dirname(__FILE__), 'fastlane', 'Pluginfile')
eval_gemfile(plugins_path) if File.exist?(plugins_path)

# Only install cocoapods on macOS
if RUBY_PLATFORM.include?('darwin')
  gem "cocoapods", "1.14.3"
end
