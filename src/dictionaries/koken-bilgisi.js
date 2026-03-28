const { get } = require('../core/http');
const { kelimeDogrula } = require('../core/validators');

async function kokenBilgisi(kelime) {
  return get('/etimoloji', { ara: kelimeDogrula(kelime) });
}

module.exports = kokenBilgisi;
