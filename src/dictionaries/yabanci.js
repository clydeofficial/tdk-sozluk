const { get } = require('../core/http');
const { kelimeDogrula } = require('../core/validators');

async function yabanciKarsiliklar(kelime) {
  return get('/kilavuz', {
    prm: 'ysk',
    ara: kelimeDogrula(kelime),
  });
}

module.exports = yabanciKarsiliklar;
