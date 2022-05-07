const random = require('canvas-sketch-util/random');
const { image } = require('./image');
const { lightestColor } = require('./constants');
const { params } = require('./pane');

const loadImage = path => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject();
    img.src = path;
  });
};

const getGlyph = v => {
  const part = params.wordAmout;
  const { words, symbols } = params;
  const wordsArr = words.replace(/\s/g, '').split(',');
  const symbolsArr = symbols.split('');

  if (v < lightestColor * part) return random.pick(wordsArr);
  return random.pick(symbolsArr); 
};

const generateCanvasForParseImage = ({ width, height, cell }) => {
  const imgCanvas = document.createElement('canvas');
  const imgContext = imgCanvas.getContext('2d');

  const rows = Math.floor(width  / cell);
  const cols = Math.floor(height / cell);
  const numCells = cols * rows;

  imgCanvas.width  = cols;
  imgCanvas.height = rows;

  imgContext.fillStyle = 'black';
  imgContext.fillRect(0, 0, cols, rows);

  image.element && imgContext.drawImage(image.element, 0, 0, cols, rows);
  const imgData = imgContext.getImageData(0, 0, cols, rows).data;

  return { imgData, cols, numCells };
};

const getRGBA = (data, index) => ({
  r: data[index * 4],
  g: data[index * 4 + 1],
  b: data[index * 4 + 2],
  a: data[index * 4 + 3]
});

const getColorString = (data, index) => {
  const { r, g, b, a } = getRGBA(data, index);

  return `rgba(${r}, ${g}, ${b}, ${a})`;
};

module.exports = {
  loadImage,
  getGlyph,
  generateCanvasForParseImage,
  getRGBA,
  getColorString
};