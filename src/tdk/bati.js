const { fetch } = require('../utils/request');

async function getBatiWord(word) {
    const url = `https://sozluk.gov.tr/bati?ara=${encodeURIComponent(word)}`;
    const data = await fetch(url);
    if (!data[0]) return null;
    return data[0];
}

module.exports = { getBatiWord };