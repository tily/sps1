
class DecibelMeter
	constructor: (canvas)->
		canvas.width = window.innerWidth
		canvas.height = window.innerHeight
		@stage = new createjs.Stage(canvas)
		@drawScaleMarks()
		@drawMeterBars()
		@drawThresholdControl()
		@update = true
		@stage.update()
		createjs.Ticker.addEventListener("tick", @tick)
		createjs.Touch.enable(@stage)
		@stage.enableMouseOver(10)
	tick: ()=>
		@stage.update()
	drawMeterBars: (decibel)->
		console.log decibel
		for i in [0..60]
			shape = new createjs.Shape()
			if decibel > i-60
				shape.graphics.beginFill('#666666').drawRect(i*2+100, 30, 1, 10)
			else
				shape.graphics.beginFill('#cccccc').drawRect(i*2+100, 30, 1, 10)
			@stage.addChild(shape)
		shape.graphics.beginFill('#cccccc').drawRect(61*2+100, 30, 6, 10)
	drawThresholdControl: ()->
		container = new createjs.Container()
		triangle = new createjs.Shape()
		triangle.graphics.beginFill('#333333')
		triangle.graphics.lineTo(5.5+95, 30)
		triangle.graphics.lineTo(0+95, 20)
		triangle.graphics.lineTo(11+95, 20)
		triangle.name = 'triangle'
		line = new createjs.Shape()
		line.graphics.beginFill('#333333').drawRect(5+95, 20, 1, 20)
		triangle.name = 'line'
		container.addChild(triangle)
		container.addChild(line)
		container.on "mousedown", (evt)->
			@offset = {x: @x - evt.stageX, y: @y - evt.stageY}
		container.on "pressmove", (evt)->
			x = evt.stageX + @offset.x
			if x >= 0 && x <= 120
				@x = x
		@stage.addChild(container)
	drawScaleMarks: ()->
		shape = new createjs.Shape()
		for i in [-6..0]
			text = new createjs.Text((Math.abs(i)*10).toString(), "Arial", "#333333")
			text.y = 50
			text.x = (i+6)*20+100-5
			shape = new createjs.Shape()
			shape.graphics.beginFill('#333333').drawRect((i+6)*20+100, 45, 1, 3)
			@stage.addChild(text)
			@stage.addChild(shape)

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
		#console.log decibel
		window.requestAnimationFrame(draw)
		decibelMeter.drawMeterBars(decibel)
	window.requestAnimationFrame(draw)
