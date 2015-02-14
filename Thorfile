require 'thor'
require 'erubis'
require 'nokogiri'

class Default < Thor
	desc 'index', 'generate index.html'
	def index
		files = Dir['*.html']
		pages = []
		files.each do |file|
			if time = file[/^(\d{8})/, 1]
				doc = Nokogiri::HTML(File.read(file))
				title = doc.xpath('//title').text
				description = doc.xpath('//meta[@name="description"]').first['content'] rescue nil
				pages << {title: title, time: time, file: file, description: description}
			end
		end
		html = Erubis::Eruby.new(File.read('templates/index.html.eruby')).result(binding)
		File.write('index.html', html)
	end

	desc 'copy', 'clone one study for new one'
	def copy(source, target)
		FileUtils.copy("#{source}.html", "#{target}.html")
		FileUtils.copy("coffeescripts/#{source}.coffee", "coffeescripts/#{target}.coffee")
		FileUtils.copy("stylesheets/#{source}.css", "stylesheets/#{target}.css")
		doc = Nokogiri::HTML File.read("#{target}.html")
		doc.xpath('//title').first.content = target
		doc.xpath(%Q|//script[@src="javascripts/#{source}.js"]|).first['src'] = "javascripts/#{target}.js"
		doc.xpath(%Q|//link[@href="stylesheets/#{source}.css"]|).first['href'] = "stylesheets/#{target}.css"
		File.write("#{target}.html", doc.to_html)
		system 'grunt coffee && thor index'
	end

	desc 'del', 'delete study'
	def del(target)
		File.unlink("#{target}.html")
		File.unlink("coffeescripts/#{target}.coffee")
		File.unlink("javascripts/#{target}.js")
		File.unlink("stylesheets/#{target}.css")
		system 'thor index'
	end

	option :commit, :alias => :c, :type => :string
	desc 'gitadd', 'git add study'
	def gitadd(target)
		system "git add #{target}.html"
		system "git add coffeescripts/#{target}.coffee"
		system "git add javascripts/#{target}.js"
		system "git add stylesheets/#{target}.css"
		system "git commit -m '#{options[:commit]}: #{target}'"
	end
end
