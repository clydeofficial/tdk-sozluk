const { fetch } = require('../utils/request');

async function getEtimolojiWord(word) {
    const url = `https://sozluk.gov.tr/etimoloji?ara=${encodeURIComponent(word)}`;
    const data = await fetch(url);
    if (!Array.isArray(data) || data.length === 0) return null;

    const entry = data[0];
    return {
        kelime: entry.word,
        anlam: entry.meaning,
        etimoloji: entry.etimology ? entry.etimology.replace(/<\/?[^>]+(>|$)/g, '') : null,
        yapi: entry.structure,
        kaynaklar: entry.referances ? entry.referances.replace(/<\/?[^>]+(>|$)/g, '') : null
    };
}

module.exports = { getEtimolojiWord };