const { get } = require('../core/http');
const { kelimeDogrula } = require('../core/validators');

async function bati(kelime) {
  return get('/bati', { ara: kelimeDogrula(kelime) });
}

module.exports = bati;
