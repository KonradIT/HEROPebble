var util2 = require('../lib/util2');
var myutil = require('../lib/myutil');
var Propable = require('./propable');
var StageElement = require('./element');

var accessorProps = [
  'radius',
];

var defaults = {
  backgroundColor: 'white',
  borderColor: 'clear',
  borderWidth: 1,
};

var Circle = function(elementDef) {
  StageElement.call(this, myutil.shadow(defaults, elementDef || {}));
  this.state.type = StageElement.CircleType;
};

util2.inherit(Circle, StageElement);

Propable.makeAccessors(accessorProps, Circle.prototype);

module.exports = Circle;
