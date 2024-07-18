const axios = require('axios');

async function kelimeVerisiAl(kelime) {
    try {
        const url = `https://sozluk.gov.tr/gts?ara=${encodeURIComponent(kelime)}`;
        const cevap = await axios.get(url);
        const veri = cevap.data;

        if (!veri[0]) {
            throw new Error('Kelime bulunamadı');
        }

        const anlamlar = veri.flatMap(entry => entry.anlamlarListe.map(girdi => ({
            anlam: girdi.anlam,
            ornekCumleler: girdi.orneklerListe ? girdi.orneklerListe.map(ornek => ornek.ornek) : [],
            ozellikler: girdi.ozelliklerListe ? girdi.ozelliklerListe.map(ozellik => ozellik.tam_adi) : [],
            telaffuz: entry.telaffuz || null
        })));

        const birlesikKelimeler = veri.flatMap(entry => entry.birlesikler ? entry.birlesikler.split(', ') : []);
        const atasozleri = veri.flatMap(entry => entry.atasozu ? entry.atasozu.map(atasozu => atasozu.madde) : []);
        const isaretDiliGifleri = kelime.split('').map(harf => `https://sozluk.gov.tr/assets/img/isaret/${harf}.gif`);

        const sesliOkunusUrl = await sesliOkunusAl(kelime);

        return {
            kelime: kelime,
            anlamlar: anlamlar,
            birlesikKelimeler: birlesikKelimeler,
            atasozleri: atasozleri,
            isaretDiliGifleri: isaretDiliGifleri,
            sesliOkunusUrl: sesliOkunusUrl
        };
    } catch (hata) {
        console.error('Hata:', hata.message);
        return null;
    }
}

async function sesliOkunusAl(kelime) {
    try {
        const url = `https://sozluk.gov.tr/yazim?ara=${encodeURIComponent(kelime)}`;
        const cevap = await axios.get(url);
        const veri = cevap.data;

        if (!veri[0]) {
            return null;
        }

        const sesKod = veri[0].seskod;
        return `https://sozluk.gov.tr/ses/${sesKod}.wav`;
    } catch (hata) {
        console.error('Ses kodu alırken hata:', hata.message);
        return null;
    }
}

module.exports = {
    kelimeVerisiAl,
    sesliOkunusAl
};
