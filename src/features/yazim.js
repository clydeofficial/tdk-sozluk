const { get } = require('../core/http');
const { sesUrl } = require('../core/normalize');
const { kelimeDogrula } = require('../core/validators');

async function ara(kelime) {
  return get('/yazim', { ara: kelimeDogrula(kelime) });
}

async function sesGetir(kelime) {
  const sonuc = await ara(kelime);

  if (!Array.isArray(sonuc) || !sonuc[0] || !sonuc[0].seskod) {
    return null;
  }

  return sesUrl(sonuc[0].seskod);
}

module.exports = {
  ara,
  sesGetir,
};
