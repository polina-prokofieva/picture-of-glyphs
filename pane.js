const Tweakpane = require('tweakpane');

const params = {
  cell: 8,
  picture: true
};

const createPane = manager => {
  const pane = new Tweakpane.Pane();
  let folder;

  folder = pane.addFolder({ title: 'Settings' });
  folder.addInput(params, 'cell', { min: 2, max: 50, step: 4 });
  folder.addInput(params, 'picture');

  pane.on('change', () => {
    manager && manager.render();
  });
}

module.exports = { params, createPane };
