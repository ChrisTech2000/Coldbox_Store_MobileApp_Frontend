Pod::Spec.new do |s|
  s.name         = "CldtFS"
  s.version      = "1.0.0"
  s.summary      = "Custom filesystem module for React Native"
  s.homepage     = "https://github.com/your-repo"
  s.license      = "MIT"
  s.author       = { "Author" => "author@example.com" }
  s.platform     = :ios, "11.0"
  s.source       = { :path => "." }
  s.source_files = "CldtFS.{h,m,swift}"
  s.requires_arc = true

  s.dependency "React-Core"
end