var Plotter;

Plotter = (function() {
  function Plotter(canvas) {
    console.log("Plotter#constructor");
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
    this.context.fillStyle = 'black';
  }

  Plotter.prototype.plot = function(samples) {
    var i, j, x1, x2, y1, y2, _i, _ref, _results;
    _results = [];
    for (x1 = _i = 0, _ref = this.canvas.width - 2; 0 <= _ref ? _i <= _ref : _i >= _ref; x1 = 0 <= _ref ? ++_i : --_i) {
      i = Math.floor(samples.length / this.canvas.width * x1);
      j = Math.floor(samples.length / this.canvas.width * (x1 + 1));
      x2 = x1 + 1;
      y1 = (samples[i] + 1) / 2 * this.canvas.height;
      y2 = (samples[j] + 1) / 2 * this.canvas.height;
      this.context.beginPath();
      this.context.moveTo(x1, y1);
      this.context.lineTo(x2, y2);
      this.context.closePath();
      _results.push(this.context.stroke());
    }
    return _results;
  };

  Plotter.prototype.clear = function() {
    return this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  };

  return Plotter;

})();
