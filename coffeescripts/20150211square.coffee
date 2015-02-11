
$(document).ready ()->
	plotter = new Plotter($('canvas').get(0))
	context = new AudioContext()
	source = context.createBufferSource()
	processor = context.createScriptProcessor(512, 1, 1)
	playing = true
	data = []
	x = 0
	processor.onaudioprocess = (e)->
		data = e.outputBuffer.getChannelData(0)
		for i in [0...e.outputBuffer.length]
			data[i] = 0
		for j in [1...44]
			continue if j % 2 == 0
			y = x
			for i in [0...e.outputBuffer.length]
				data[i] += 1.0 / j * Math.sin(2 * Math.PI * y * j * 440 / 44100)
				y++
		x = y
		console.log 'len ' + data.length + ', max ' + Math.max.apply(Math, data) + ', min ' + Math.min.apply(Math, data)
	$('canvas').click ()->
		if playing then pause() else play()
		playing = !playing
	play = ()->
		source.connect(processor)
		processor.connect(context.destination)
	pause = ()->
		processor.disconnect()
		source.disconnect()
	play()
	plot = ()->
		plotter.clear()
		plotter.plot data
		window.requestAnimationFrame(plot)
	window.requestAnimationFrame(plot)
