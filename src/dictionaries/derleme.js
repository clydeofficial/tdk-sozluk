const { get } = require('../core/http');
const { kelimeDogrula } = require('../core/validators');

async function derleme(kelime) {
  return get('/derleme', { ara: kelimeDogrula(kelime) });
}

module.exports = derleme;
