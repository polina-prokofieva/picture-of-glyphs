const Tweakpane = require('tweakpane');

const params = {
  cell: 8,
  picture: true,
  wordAmout: 0.5,
  words: 'Peony, Flowers, Summer',
  symbols: '@#&~*'
};

const createPane = manager => {
  const pane = new Tweakpane.Pane();
  let folder;

  folder = pane.addFolder({ title: 'Settings' });
  folder.addInput(params, 'cell', { min: 2, max: 50, step: 4 });
  folder.addInput(params, 'picture');
  folder.addInput(params, 'wordAmout', {
    label: 'amout of words in %',
    min: 0,
    max: 1,
    step: 0.01
  });
  folder.addInput(params, 'words');
  folder.addInput(params, 'symbols');

  pane.on('change', () => {
    manager && manager.render();
  });
}

module.exports = { params, createPane };
