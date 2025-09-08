const { fetch } = require('../utils/request');

async function getEtmsWord(word) {
    const url = `https://sozluk.gov.tr/etms?ara=${encodeURIComponent(word)}`;
    const data = await fetch(url);
    if (!Array.isArray(data) || data.length === 0) return null;

    const entry = data[0];
    return {
        madde: entry.madde,
        anlamlar: [entry.anlam1, entry.anlam2, entry.anlam3, entry.anlam4, entry.anlam5, entry.anlam6, entry.anlam7, entry.anlam8].filter(Boolean),
        aciklama: entry.aciklama ? entry.aciklama.replace(/<\/?i>/g, '') : null,
        kaynak: entry.kaynak,
        tur: entry.tur,
        bk: [entry.bk1, entry.bk2, entry.bk3, entry.bk4].filter(Boolean)
    };
}

module.exports = { getEtmsWord };