var util2 = require('../lib/util2');
var myutil = require('../lib/myutil');
var Propable = require('./propable');
var StageElement = require('./element');

var accessorProps = [
  'strokeColor',
  'strokeWidth',
  'position2',
];

var defaults = {
  strokeColor: 'white',
  strokeWidth: 1,
};

var Line = function(elementDef) {
  StageElement.call(this, myutil.shadow(defaults, elementDef || {}));
  this.state.type = StageElement.LineType;
};

util2.inherit(Line, StageElement);

Propable.makeAccessors(accessorProps, Line.prototype);

module.exports = Line;
