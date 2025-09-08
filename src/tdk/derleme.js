const { fetch } = require('../utils/request');

async function getDerlemeWord(word) {
    const url = `https://sozluk.gov.tr/derleme?ara=${encodeURIComponent(word)}`;
    const data = await fetch(url);
    if (!Array.isArray(data) || data.length === 0) return null;

    return data.map(entry => ({
        madde: entry.madde,
        anlam: entry.anlam,
        sehir: entry.sehir ? entry.sehir.replace(/<\/?b>/g, '') : null,
        eser: entry.eser_ad,
        yazar: entry.yazar_ad,
        yayinlayan: entry.yayinlayan,
        yayinYeri: entry.yayin_yeri,
        yayinTarihi: entry.yayin_tarihi,
        fiziksel: entry.fiziksel
    }));
}

module.exports = { getDerlemeWord };