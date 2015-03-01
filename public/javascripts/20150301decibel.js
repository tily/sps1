$(document).ready(function() {
  var context, data, playing, plot, plotter, processor, source, stream;
  plotter = new Plotter($('canvas').get(0));
  context = new AudioContext();
  source = context.createBufferSource();
  processor = context.createScriptProcessor(4096, 1, 1);
  stream = null;
  playing = true;
  data = [];
  navigator.webkitGetUserMedia({
    audio: true
  }, function(stream) {
    console.log('microphone ready');
    stream = context.createMediaStreamSource(stream);
    stream.connect(processor);
    processor.connect(context.destination);
    return processor.onaudioprocess = function(e) {
      return data = e.inputBuffer.getChannelData(0);
    };
  }, function(e) {
    return console.log(e);
  });
  plot = function() {
    plotter.clear();
    plotter.plot(data);
    return window.requestAnimationFrame(plot);
  };
  return window.requestAnimationFrame(plot);
});
