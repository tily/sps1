
class DecibelMeter
	constructor: (canvas)->
		@canvas = canvas
		@canvas.width = window.innerWidth
		@canvas.height = window.innerHeight
		@context = @canvas.getContext('2d')
		@context.fillRect(0, 50, 50, 50)
	set: (decibel)->
		@context.clearRect(0, 0, @canvas.width, @canvas.height)
		unitWidth = @canvas.width / 63
		for i in [0..62]
			if decibel + 60 > i
				if i > 60
					@context.fillStyle = "red"
				else
					@context.fillStyle = "blue"
				@context.fillRect(i * unitWidth - 5, 0, unitWidth + 5, @canvas.height)

		#@canvas.drawRect(0, 0, 50, 50)
$(document).ready ()->
	decibelMeter = new DecibelMeter($('canvas').get(0))
	context = new AudioContext()
	source = context.createBufferSource()
	processor = context.createScriptProcessor(4096, 1, 1)
	stream = null
	playing = true
	data = []
	decibel = -60
	navigator.webkitGetUserMedia {audio: true}, (stream)->
		console.log 'microphone ready'
		stream = context.createMediaStreamSource(stream)
		stream.connect(processor)
		processor.connect(context.destination)
	, (e)-> console.log e
	# http://stackoverflow.com/questions/13734710/is-there-a-way-get-something-like-decibel-levels-from-an-audio-file-and-transfor
	processor.onaudioprocess = (e)->
		input = e.inputBuffer.getChannelData(0)
		len = input.length   
		total = i = 0
		while i < len
			total += Math.abs( input[i++] )
	 	rms = Math.sqrt(total / len)
		decibel = Math.round (20 * (Math.log(rms) / Math.log(10)))
	draw = ()->
		console.log decibel
		window.requestAnimationFrame(draw)
		decibelMeter.set(decibel)
	window.requestAnimationFrame(draw)
