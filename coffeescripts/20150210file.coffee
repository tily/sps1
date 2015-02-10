
$(document).ready ()->
	reader = new FileReader()
	plotter = new Plotter($('canvas').get(0))
	context = new AudioContext()
	source = context.createBufferSource()
	processor = context.createScriptProcessor(4096, 1, 1)
	stream = null
	playing = true
	data = []
	reader.onload = ()->
		console.log 'read done'
		context.decodeAudioData reader.result, (buffer)->
			console.log buffer
			data = buffer.getChannelData(0)
			plotter.plot(data)
	$('#file').on 'change', (e) ->
		console.log 'change'
		reader.readAsArrayBuffer(e.target.files[0])
