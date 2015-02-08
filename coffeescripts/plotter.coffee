class Plotter
	constructor: (canvas)->
		console.log "Plotter#constructor"
		@canvas = canvas	
		@context = @canvas.getContext('2d')
		@context.fillStyle = 'black'
	plot: (samples)-> # samples should be array of float numbers
		for x1 in [0..@canvas.width - 2]
			i = Math.floor(samples.length / @canvas.width * x1)
			j = Math.floor(samples.length / @canvas.width * (x1 + 1))
			x2 = x1 + 1
			y1 = (samples[i] + 1) / 2 * @canvas.height
			y2 = (samples[j] + 1) / 2 * @canvas.height
			#console.log x1, y1, x2, y2
			@context.beginPath()
			@context.moveTo(x1, y1)
			@context.lineTo(x2, y2)
			@context.closePath()
			@context.stroke()
	clear: ()->
		@context.clearRect(0, 0, @canvas.width, @canvas.height)
