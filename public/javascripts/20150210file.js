$(document).ready(function() {
  var context, data, playing, plotter, processor, reader, source, stream;
  reader = new FileReader();
  plotter = new Plotter($('canvas').get(0));
  context = new AudioContext();
  source = context.createBufferSource();
  processor = context.createScriptProcessor(4096, 1, 1);
  stream = null;
  playing = true;
  data = [];
  reader.onload = function() {
    console.log('read done');
    return context.decodeAudioData(reader.result, function(buffer) {
      console.log(buffer);
      data = buffer.getChannelData(0);
      return plotter.plot(data);
    });
  };
  return $('#file').on('change', function(e) {
    console.log('change');
    return reader.readAsArrayBuffer(e.target.files[0]);
  });
});
