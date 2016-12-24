var util2 = require('../lib/util2');
var myutil = require('../lib/myutil');
var Propable = require('./propable');
var StageElement = require('./element');

var accessorProps = [
  'radius',
  'angle',
  'angle2',
];

var defaults = {
  backgroundColor: 'white',
  borderColor: 'clear',
  borderWidth: 1,
  radius: 0,
  angle: 0,
  angle2: 360,
};

var checkProps = function(def) {
  if (!def) return;
  if ('angleStart' in def) {
    console.warn('`angleStart` has been deprecated in favor of `angle` in order to match\n\t' +
                 "Line's `position` and `position2`. Please use `angle` intead.");
  }
  if ('angleEnd' in def) {
    console.warn('`angleEnd` has been deprecated in favor of `angle2` in order to match\n\t' +
                 "Line's `position` and `position2`. Please use `angle2` intead.");
  }
};

var Radial = function(elementDef) {
  checkProps(elementDef);
  StageElement.call(this, myutil.shadow(defaults, elementDef || {}));
  this.state.type = StageElement.RadialType;
};

util2.inherit(Radial, StageElement);

Propable.makeAccessors(accessorProps, Radial.prototype);

Radial.prototype._prop = function(def) {
  checkProps(def);
  StageElement.prototype._prop.call(this, def);
};

module.exports = Radial;
