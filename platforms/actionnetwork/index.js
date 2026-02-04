const metadata = {
  name: 'github:frakture/engine9-plugins/actionnetwork',
  version: '1.0.0',
  schemas: ['schema.js']
};

const fromRemoteFile = require('./transforms/fromRemoteFile.js');

const transforms = {
  fromRemoteFile
};

module.exports = {
  metadata,
  transforms
};
