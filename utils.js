const random = require('canvas-sketch-util/random');
const { image } = require('./image');

const loadImage = path => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject();
    img.src = path;
  });
};

const getGlyph = v => {
  let glyphs;

  if (v < 10) return '';
  if (v < 100) return '#';
  if (v < 150) return '/';
  if (v < 200) {
    glyphs = ['Spring', 'green', 'May', 'April', '@']
  } else {
    glyphs = ['#', '@', 'A'];
  }

  return random.pick(glyphs); 
}

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
}

module.exports = { loadImage, getGlyph, generateCanvasForParseImage };