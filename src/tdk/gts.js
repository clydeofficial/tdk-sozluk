const { fetch } = require('../utils/request');
const { getPronunciation } = require('./yazim');

async function getGtsWord(word) {
    const url = `https://sozluk.gov.tr/gts?ara=${encodeURIComponent(word)}`;
    const data = await fetch(url);
    if (!data[0]) return null;

    const entry = data[0];
    const sesliOkunusUrl = await getPronunciation(word);

    return {
        kelime: entry.madde,
        anlamlar: entry.anlamlarListe.map(anlam => ({
            anlam: anlam.anlam,
            ozellikler: anlam.ozelliklerListe ? anlam.ozelliklerListe.map(o => o.tam_adi) : [],
            ornekCumleler: anlam.orneklerListe ? anlam.orneklerListe.map(o => o.ornek) : [],
            telaffuz: entry.telaffuz || null
        })),
        birlesikKelimeler: entry.birlesikler ? entry.birlesikler.split(',').map(k => k.trim()) : [],
        atasozleri: entry.atasozu ? entry.atasozu.map(a => a.madde) : [],
        sesliOkunusUrl,
        isaretDiliGifleri: word
            .toLowerCase()
            .replace(/[^a-zçğıöşü]/g, '')
            .split('')
            .map(harf => `https://sozluk.gov.tr/assets/img/isaret/${harf}.gif`)
    };
}

module.exports = { getGtsWord };