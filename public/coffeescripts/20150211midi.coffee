$(document).ready ()->
	notes = ['c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#', 'a', 'a#', 'b']
	success = (midi)->
		console.log 'midi access success!'
		inputs = midi.inputs.values()
		while !(input = inputs.next()).done
			console.log 'input: ', input.value
			input.value.onmidimessage = onmidimessage
	failure = (message)->
		console.log "midi access failed: " + message
	toName = (noteNumber)->
		oct = Math.floor (noteNumber - 12) / 12
		note = (noteNumber - 12) % 12
		notes[note] + oct
	onmidimessage = (e)->
		console.log e.data[0].toString(16), e.data[1].toString(16), e.data[2].toString(16)
		status = e.data[0] >> 4
		channel = e.data[0] % 16
		console.log 'status: ', status.toString(16), ',channel: ', channel.toString(16)
		if status >= 0x8 && status <= 0xE
			console.log 'channel message'
			if status == 0x8
				console.log 'note on: ', toName(e.data[1])
			if status == 0x9
				console.log 'note off: ', toName(e.data[1])
		if status >= 0xF && status <= 0xF
			console.log 'system message'
	navigator.requestMIDIAccess().then success, failure
