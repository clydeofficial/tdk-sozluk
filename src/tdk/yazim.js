const { fetch } = require('../utils/request');

async function getPronunciation(word) {
    const url = `https://sozluk.gov.tr/yazim?ara=${encodeURIComponent(word)}`;
    const data = await fetch(url);
    if (!data[0]) return null;
    return `https://sozluk.gov.tr/ses/${data[0].seskod}.wav`;
}

module.exports = { getPronunciation };