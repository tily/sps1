$(document).ready(function() {
  var failure, notes, onmidimessage, success, toName;
  notes = ['c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#', 'a', 'a#', 'b'];
  success = function(midi) {
    var input, inputs, _results;
    console.log('midi access success!');
    inputs = midi.inputs.values();
    _results = [];
    while (!(input = inputs.next()).done) {
      console.log('input: ', input.value);
      _results.push(input.value.onmidimessage = onmidimessage);
    }
    return _results;
  };
  failure = function(message) {
    return console.log("midi access failed: " + message);
  };
  toName = function(noteNumber) {
    var note, oct;
    oct = Math.floor((noteNumber - 12) / 12);
    note = (noteNumber - 12) % 12;
    return notes[note] + oct;
  };
  onmidimessage = function(e) {
    var channel, status;
    console.log(e.data[0].toString(16), e.data[1].toString(16), e.data[2].toString(16));
    status = e.data[0] >> 4;
    channel = e.data[0] % 16;
    console.log('status: ', status.toString(16), ',channel: ', channel.toString(16));
    if (status >= 0x8 && status <= 0xE) {
      console.log('channel message');
      if (status === 0x8) {
        console.log('note on: ', toName(e.data[1]));
      }
      if (status === 0x9) {
        console.log('note off: ', toName(e.data[1]));
      }
    }
    if (status >= 0xF && status <= 0xF) {
      return console.log('system message');
    }
  };
  return navigator.requestMIDIAccess().then(success, failure);
});
