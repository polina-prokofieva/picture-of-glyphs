const { getGlyph } = require('./utils');
const { image } = require('./image');
const { generateCanvasForParseImage, getRGBA } = require('./utils');
const { params } = require('./pane');

const sketch = () => { 
  return ({ context: ctx, width, height }) => {
    const { cell, picture } = params;
    const { imgData, cols, numCells } = generateCanvasForParseImage({ width, height, cell });

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, width, height);

    if (picture) {
      image.element && ctx.drawImage(image.element, 0, 0, width, height);
    }

    for(let i = 0; i < numCells; i++) {
      const col = i % cols;      
      const row = Math.floor(i / cols);

      const x = col * cell;
      const y = row * cell;

      const { r, g, b, a } = getRGBA(imgData, i);
      const glyph = getGlyph(r);

      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;

      ctx.save();
      ctx.translate(x, y);

      ctx.font = `${cell * 2}px serif`;

      if(Math.random() < 0.1) {
        ctx.font = `${cell * Math.random() * 10}px serif`;
      }

      ctx.fillText(glyph, 0, 0);
      ctx.restore();
    }
  };
};

module.exports = { sketch };
