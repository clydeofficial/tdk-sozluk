const { get } = require('../core/http');
const { idDogrula, kelimeDogrula } = require('../core/validators');

async function tarama(kelime) {
  return get('/tarama', { ara: kelimeDogrula(kelime) });
}

async function taramaDetay(id) {
  return get('/taramaId', { id: idDogrula(id) });
}

module.exports = {
  tarama,
  taramaDetay,
};
