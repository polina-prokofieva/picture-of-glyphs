const canvasSketch = require('canvas-sketch');
const { loadImage } = require('./utils');
const { image } = require('./image');
const { sketch } = require('./sketch');
const { createPane } = require('./pane');

const settings = {
  dimensions: [ 1080, 1080 ]
};

const start = async () => {
  const manager = await canvasSketch(sketch, settings);  
  const img = await loadImage(image.path);

  image.element = img;
  manager.render();
  createPane(manager);
};

start();
