var util2 = require('../lib/util2');
var myutil = require('../lib/myutil');
var StageElement = require('./element');

var defaults = {
  backgroundColor: 'white',
  borderColor: 'clear',
  borderWidth: 1,
};

var Rect = function(elementDef) {
  StageElement.call(this, myutil.shadow(defaults, elementDef || {}));
  this.state.type = StageElement.RectType;
};

util2.inherit(Rect, StageElement);

module.exports = Rect;
