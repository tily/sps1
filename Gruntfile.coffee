module.exports = (grunt)->
	grunt.initConfig
		connect:
			server:
				options:
					base: 'public/'
					port: 4567
					hostname: '*'
					#keepalive: true # not needed for connect + other tasks
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
	grunt.loadNpmTasks('grunt-contrib-connect')
	grunt.registerTask('default', ['coffee'])
	grunt.registerTask('serve', ['connect', 'watch'])
