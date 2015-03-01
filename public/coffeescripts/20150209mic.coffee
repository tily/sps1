
$(document).ready ()->
	plotter = new Plotter($('canvas').get(0))
	context = new AudioContext()
	source = context.createBufferSource()
	processor = context.createScriptProcessor(4096, 1, 1)
	stream = null
	playing = true
	data = []
	navigator.webkitGetUserMedia {audio: true}, (stream)->
		console.log 'microphone ready'
		stream = context.createMediaStreamSource(stream)
		stream.connect(processor)
		processor.connect(context.destination)
		processor.onaudioprocess = (e)->
			data = e.inputBuffer.getChannelData(0)
	, (e)-> console.log e
	plot = ()->
		plotter.clear()
		plotter.plot data
		window.requestAnimationFrame(plot)
	window.requestAnimationFrame(plot)
