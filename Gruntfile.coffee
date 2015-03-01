module.exports = (grunt)->
	grunt.initConfig
		coffee:
			app:
				options: {bare: true}
				bare: true
				expand: true
				cwd: 'public/coffeescripts'
				src: ['**/*.coffee']
				dest: 'public/javascripts'
				ext: '.js'
		watch:
			app:
				files: ['public/coffeescripts/*.coffee']
				tasks: 'coffee'
	grunt.loadNpmTasks('grunt-contrib-coffee')
	grunt.loadNpmTasks('grunt-contrib-watch')
	grunt.registerTask('default', ['coffee'])
