const { get } = require('../core/http');
const { kelimeDogrula } = require('../core/validators');

async function erenEtimoloji(kelime) {
  return get('/etms', { ara: kelimeDogrula(kelime) });
}

module.exports = erenEtimoloji;
