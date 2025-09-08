const { fetch } = require('../utils/request');

async function getAtasozu(word) {
    const url = `https://sozluk.gov.tr/atasozu?ara=${encodeURIComponent(word)}`;
    const data = await fetch(url);
    if (!Array.isArray(data) || data.length === 0) return null;

    return data.map(entry => ({
        soz: entry.sozum,
        anlam: entry.anlami,
        anahtarlar: entry.anahtar ? entry.anahtar.split(',').map(a => a.trim()) : [],
        tur: entry.turu2
    }));
}

module.exports = { getAtasozu };