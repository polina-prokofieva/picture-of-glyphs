const Tweakpane = require('tweakpane');

const params = {
  cell: 8,
  picture: true,
  words: 'Peony, Flowers, Summer',
  wordsAmout: 0.5,
  symbols: '@#&~*',
  symbolsAmount: 0.5,
  defaultSymbol: '*'
};

const createPane = manager => {
  const pane = new Tweakpane.Pane();
  let folder;

  folder = pane.addFolder({ title: 'General' });
  folder.addInput(params, 'cell', { min: 2, max: 50, step: 4 });
  folder.addInput(params, 'picture');
  folder = pane.addFolder({ title: 'Words' });
  folder.addInput(params, 'words');
  folder.addInput(params, 'wordsAmout', {
    label: 'amout (%)',
    min: 0,
    max: 1,
    step: 0.01
  });
  folder = pane.addFolder({ title: 'Symbols' });
  folder.addInput(params, 'symbols');
  folder.addInput(params, 'symbolsAmount', {
    label: 'amout (%)',
    min: 0,
    max: 2,
    step: 0.02
  });
  folder.addInput(params, 'defaultSymbol', {
    label: 'default symbol'
  })

  pane.on('change', () => {
    manager && manager.render();
  });
}

module.exports = { params, createPane };
