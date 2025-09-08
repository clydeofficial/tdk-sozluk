const { fetch } = require('../utils/request');

async function getKilavuz(word) {
    const url = `https://sozluk.gov.tr/kilavuz?prm=ysk&ara=${encodeURIComponent(word)}`;
    const data = await fetch(url);
    if (!Array.isArray(data) || data.length === 0) return null;

    return data.map(entry => ({
        kelime: entry.kkelime,
        kok: entry.kkoken,
        karsilik: entry.kkarsilik ? entry.kkarsilik.replace(/<\/?i>/g, '') : null,
        anlam: entry.anlam
    }));
}

module.exports = { getKilavuz };