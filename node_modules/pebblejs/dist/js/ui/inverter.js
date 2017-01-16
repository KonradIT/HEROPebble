var util2 = require('../lib/util2');
var myutil = require('../lib/myutil');
var StageElement = require('./element');

var Inverter = function(elementDef) {
  StageElement.call(this, elementDef);
  this.state.type = StageElement.InverterType;
};

util2.inherit(Inverter, StageElement);

module.exports = Inverter;
