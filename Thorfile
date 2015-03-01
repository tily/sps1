require 'thor'
require 'erubis'
require 'nokogiri'

class Default < Thor
	desc 'index', 'generate index.html'
	def index
		files = Dir['public/*.html']
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
		FileUtils.copy("public/#{source}.html", "public/#{target}.html")
		FileUtils.copy("public/coffeescripts/#{source}.coffee", "public/coffeescripts/#{target}.coffee")
		FileUtils.copy("public/stylesheets/#{source}.css", "public/stylesheets/#{target}.css")
		doc = Nokogiri::HTML File.read("public/#{target}.html")
		doc.xpath('//title').first.content = target
		doc.xpath(%Q|//script[@src="javascripts/#{source}.js"]|).first['src'] = "javascripts/#{target}.js"
		doc.xpath(%Q|//link[@href="stylesheets/#{source}.css"]|).first['href'] = "stylesheets/#{target}.css"
		File.write("public/#{target}.html", doc.to_html)
		system 'grunt coffee && thor index'
	end

	desc 'del', 'delete study'
	def del(target)
		File.unlink("public/#{target}.html")
		File.unlink("public/coffeescripts/#{target}.coffee")
		File.unlink("public/javascripts/#{target}.js")
		File.unlink("public/stylesheets/#{target}.css")
		system 'thor index'
	end

	option :commit, :alias => :c, :type => :string
	desc 'gitadd', 'git add study'
	def gitadd(target)
		system "git add public/#{target}.html"
		system "git add public/coffeescripts/#{target}.coffee"
		system "git add public/javascripts/#{target}.js"
		system "git add public/stylesheets/#{target}.css"
		system "git commit -m '#{options[:commit]}: #{target}'"
	end
end
