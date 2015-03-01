var DecibelMeter;

DecibelMeter = (function() {
  function DecibelMeter(canvas) {
    this.canvas = canvas;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.context = this.canvas.getContext('2d');
    this.context.fillRect(0, 50, 50, 50);
  }

  DecibelMeter.prototype.set = function(decibel) {
    var i, unitWidth, _i, _results;
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    unitWidth = this.canvas.width / 63;
    _results = [];
    for (i = _i = 0; _i <= 62; i = ++_i) {
      if (decibel + 60 > i) {
        if (i > 60) {
          this.context.fillStyle = "red";
        } else {
          this.context.fillStyle = "blue";
        }
        _results.push(this.context.fillRect(i * unitWidth - 5, 0, unitWidth + 5, this.canvas.height));
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  return DecibelMeter;

})();

$(document).ready(function() {
  var context, data, decibel, decibelMeter, draw, playing, processor, source, stream;
  decibelMeter = new DecibelMeter($('canvas').get(0));
  context = new AudioContext();
  source = context.createBufferSource();
  processor = context.createScriptProcessor(4096, 1, 1);
  stream = null;
  playing = true;
  data = [];
  decibel = -60;
  navigator.webkitGetUserMedia({
    audio: true
  }, function(stream) {
    console.log('microphone ready');
    stream = context.createMediaStreamSource(stream);
    stream.connect(processor);
    return processor.connect(context.destination);
  }, function(e) {
    return console.log(e);
  });
  processor.onaudioprocess = function(e) {
    var i, input, len, rms, total;
    input = e.inputBuffer.getChannelData(0);
    len = input.length;
    total = i = 0;
    while (i < len) {
      total += Math.abs(input[i++]);
      rms = Math.sqrt(total / len);
    }
    return decibel = Math.round(20 * (Math.log(rms) / Math.log(10)));
  };
  draw = function() {
    console.log(decibel);
    window.requestAnimationFrame(draw);
    return decibelMeter.set(decibel);
  };
  return window.requestAnimationFrame(draw);
});
