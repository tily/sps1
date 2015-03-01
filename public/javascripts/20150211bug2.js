$(document).ready(function() {
  var context, data, pause, play, playing, plot, plotter, processor, source, x;
  plotter = new Plotter($('canvas').get(0));
  context = new AudioContext();
  source = context.createBufferSource();
  processor = context.createScriptProcessor(512, 1, 1);
  playing = true;
  data = [];
  x = 0;
  processor.onaudioprocess = function(e) {
    var i, j, y, _i, _j, _ref;
    data = e.outputBuffer.getChannelData(0);
    for (j = _i = 1; _i < 44; j = ++_i) {
      if (j % 2 === 0) {
        continue;
      }
      y = x;
      for (i = _j = 0, _ref = e.outputBuffer.length; 0 <= _ref ? _j < _ref : _j > _ref; i = 0 <= _ref ? ++_j : --_j) {
        data[i] += 1.0 / j * Math.sin(2 * Math.PI * y * j * 440 / 44100);
        y++;
      }
    }
    x = y;
    return console.log('len ' + data.length + ', max ' + Math.max.apply(Math, data) + ', min ' + Math.min.apply(Math, data));
  };
  $('canvas').click(function() {
    if (playing) {
      pause();
    } else {
      play();
    }
    return playing = !playing;
  });
  play = function() {
    source.connect(processor);
    return processor.connect(context.destination);
  };
  pause = function() {
    processor.disconnect();
    return source.disconnect();
  };
  play();
  plot = function() {
    plotter.clear();
    plotter.plot(data);
    return window.requestAnimationFrame(plot);
  };
  return window.requestAnimationFrame(plot);
});
