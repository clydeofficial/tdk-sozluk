const { getGtsWord } = require('./src/tdk/gts');
const { getPronunciation } = require('./src/tdk/yazim');
const { getBatiWord } = require('./src/tdk/bati');
const { getTaramaWord } = require('./src/tdk/tarama');
const { getDerlemeWord } = require('./src/tdk/derleme');
const { getAtasozu } = require('./src/tdk/atasozu');
const { getKilavuz } = require('./src/tdk/kilavuz');
const { getEtmsWord } = require('./src/tdk/etms');
const { getEtimolojiWord } = require('./src/tdk/etimoloji');

module.exports = {
    getGtsWord,
    getPronunciation,
    getBatiWord,
    getTaramaWord,
    getDerlemeWord,
    getAtasozu,
    getKilavuz,
    getEtmsWord,
    getEtimolojiWord
};