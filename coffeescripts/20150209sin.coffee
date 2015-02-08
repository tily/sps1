
$(document).ready ()->
	plotter = new Plotter($('canvas').get(0))
	context = new AudioContext()
	source = context.createBufferSource()
	processor = context.createScriptProcessor(4096, 1, 1)
	playing = true
	data = []
	x = 0
	angle = 2 * Math.PI * 440 / 44100
	processor.onaudioprocess = (e)->
		data = e.outputBuffer.getChannelData(0)
		for i in [0..e.outputBuffer.length]
			data[i] = Math.sin(x)
			x += angle
		#console.log 'len ' + data.length + ', max ' + Math.max.apply(Math, data) + ', min ' + Math.min.apply(Math, data)
	$('canvas').click ()->
		if playing then pause() else play()
		playing = !playing
	play = ()->
		source.connect(processor)
		processor.connect(context.destination)
		source.start()
	pause = ()->
		processor.disconnect()
		source.disconnect()
	play()

	plot = ()->
		console.log 'plot'
		plotter.clear()
		plotter.plot data
		window.requestAnimationFrame(plot)
	window.requestAnimationFrame(plot)
