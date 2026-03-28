const { get } = require('../core/http');
const { kelimeDogrula } = require('../core/validators');

async function guncel(kelime) {
  return get('/gts', { ara: kelimeDogrula(kelime) });
}

module.exports = guncel;
