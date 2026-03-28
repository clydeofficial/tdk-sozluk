const { get } = require('../core/http');
const { kelimeDogrula } = require('../core/validators');

async function atasozu(kelime) {
  return get('/atasozu', {
    ara: kelimeDogrula(kelime, 'Geçerli bir atasözü veya deyim giriniz.'),
  });
}

module.exports = atasozu;
