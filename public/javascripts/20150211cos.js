$(document).ready(function() {
  var angle, context, data, pause, play, playing, plot, plotter, processor, source, x;
  plotter = new Plotter($('canvas').get(0));
  context = new AudioContext();
  source = context.createBufferSource();
  processor = context.createScriptProcessor(4096, 1, 1);
  playing = true;
  data = [];
  x = 0;
  angle = 2 * Math.PI * 440 / 44100;
  processor.onaudioprocess = function(e) {
    var i, _i, _ref, _results;
    data = e.outputBuffer.getChannelData(0);
    _results = [];
    for (i = _i = 0, _ref = e.outputBuffer.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
      data[i] = Math.cos(x);
      _results.push(x += angle);
    }
    return _results;
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
