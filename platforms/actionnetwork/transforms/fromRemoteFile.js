const handlebars = require('handlebars');

module.exports = {
  async transform({
    batch, options,
  }) {
    const scope = this;
    if (!scope.map) {
      if (!options?.map) {
        throw new Error('Error with transform, no options.map provided');
      }
      scope.map = {};
      Object.entries(options.map).forEach(([k, source]) => {
        if (k === '*') {
          scope.map['*'] = '*';// just applies all the other fields
        } else {
          scope.map[k] = handlebars.compile(source);
        }
      });
    }
    const newBatch = batch.map((o) => {
      const out = {};
      Object.entries(scope.map).forEach(([k, func]) => {
        if (k === '*') {
          Object.assign(out, o);
        } else if (out[k] === undefined) {
          // first one wins, specify it first if you want ahead of the '*'
          out[k] = func(o);
        }
      });
      return out;
    });

    return { batch: newBatch };
  },
};
