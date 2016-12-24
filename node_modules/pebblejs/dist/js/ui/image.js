var util2 = require('../lib/util2');
var myutil = require('../lib/myutil');
var Propable = require('./propable');
var StageElement = require('./element');

var imageProps = [
  'image',
  'compositing',
];

var defaults = {
  backgroundColor: 'clear',
  borderColor: 'clear',
  borderWidth: 1,
};

var ImageElement = function(elementDef) {
  StageElement.call(this, myutil.shadow(defaults, elementDef || {}));
  this.state.type = StageElement.ImageType;
};

util2.inherit(ImageElement, StageElement);

Propable.makeAccessors(imageProps, ImageElement.prototype);

module.exports = ImageElement;
