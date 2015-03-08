var DecibelMeter,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

DecibelMeter = (function() {
  function DecibelMeter(canvas) {
    this.tick = __bind(this.tick, this);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    this.stage = new createjs.Stage(canvas);
    this.drawScaleMarks();
    this.drawMeterBars();
    this.drawThresholdControl();
    this.update = true;
    this.stage.update();
    createjs.Ticker.addEventListener("tick", this.tick);
    createjs.Touch.enable(this.stage);
    this.stage.enableMouseOver(10);
  }

  DecibelMeter.prototype.tick = function() {
    return this.stage.update();
  };

  DecibelMeter.prototype.drawMeterBars = function(decibel) {
    var i, shape, _i;
    console.log(decibel);
    for (i = _i = 0; _i <= 60; i = ++_i) {
      shape = new createjs.Shape();
      if (decibel > i - 60) {
        shape.graphics.beginFill('#666666').drawRect(i * 2 + 100, 30, 1, 10);
      } else {
        shape.graphics.beginFill('#cccccc').drawRect(i * 2 + 100, 30, 1, 10);
      }
      this.stage.addChild(shape);
    }
    return shape.graphics.beginFill('#cccccc').drawRect(61 * 2 + 100, 30, 6, 10);
  };

  DecibelMeter.prototype.drawThresholdControl = function() {
    var container, line, triangle;
    container = new createjs.Container();
    triangle = new createjs.Shape();
    triangle.graphics.beginFill('#333333');
    triangle.graphics.lineTo(5.5 + 95, 30);
    triangle.graphics.lineTo(0 + 95, 20);
    triangle.graphics.lineTo(11 + 95, 20);
    triangle.name = 'triangle';
    line = new createjs.Shape();
    line.graphics.beginFill('#333333').drawRect(5 + 95, 20, 1, 20);
    triangle.name = 'line';
    container.addChild(triangle);
    container.addChild(line);
    container.on("mousedown", function(evt) {
      return this.offset = {
        x: this.x - evt.stageX,
        y: this.y - evt.stageY
      };
    });
    container.on("pressmove", function(evt) {
      var x;
      x = evt.stageX + this.offset.x;
      if (x >= 0 && x <= 120) {
        return this.x = x;
      }
    });
    return this.stage.addChild(container);
  };

  DecibelMeter.prototype.drawScaleMarks = function() {
    var i, shape, text, _i, _results;
    shape = new createjs.Shape();
    _results = [];
    for (i = _i = -6; _i <= 0; i = ++_i) {
      text = new createjs.Text((Math.abs(i) * 10).toString(), "Arial", "#333333");
      text.y = 50;
      text.x = (i + 6) * 20 + 100 - 5;
      shape = new createjs.Shape();
      shape.graphics.beginFill('#333333').drawRect((i + 6) * 20 + 100, 45, 1, 3);
      this.stage.addChild(text);
      _results.push(this.stage.addChild(shape));
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
    window.requestAnimationFrame(draw);
    return decibelMeter.drawMeterBars(decibel);
  };
  return window.requestAnimationFrame(draw);
});
