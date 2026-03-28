const guncel = require('./dictionaries/guncel');
const bati = require('./dictionaries/bati');
const derleme = require('./dictionaries/derleme');
const atasozu = require('./dictionaries/atasozu');
const yabanciKarsiliklar = require('./dictionaries/yabanci');
const erenEtimoloji = require('./dictionaries/eren-etimoloji');
const kokenBilgisi = require('./dictionaries/koken-bilgisi');
const { tarama, taramaDetay } = require('./dictionaries/tarama');
const icerikServisi = require('./features/icerik');
const yazimServisi = require('./features/yazim');
const { htmlTemizle, isaretDiliUrl, sesUrl, veriTemizle } = require('./core/normalize');

guncel.ara = guncel;
bati.ara = bati;
derleme.ara = derleme;
atasozu.ara = atasozu;
yabanciKarsiliklar.ara = yabanciKarsiliklar;
erenEtimoloji.ara = erenEtimoloji;
kokenBilgisi.ara = kokenBilgisi;
tarama.ara = tarama;
tarama.getirId = taramaDetay;

async function icerik() {
  return icerikServisi.getir();
}

icerik.getir = icerikServisi.getir;
icerik.gununKelimesi = icerikServisi.gununKelimesi;
icerik.gununAtasozu = icerikServisi.gununAtasozu;
icerik.gununKurali = icerikServisi.gununKurali;
icerik.karistirilanSozler = icerikServisi.karistirilanSozler;
icerik.sikYapilanYanlislar = icerikServisi.sikYapilanYanlislar;
icerik.gununYabanciKarsiligi = icerikServisi.gununYabanciKarsiligi;

async function yazim(kelime) {
  return yazimServisi.ara(kelime);
}

yazim.ara = yazimServisi.ara;
yazim.sesGetir = yazimServisi.sesGetir;

const tdk = {
  guncel,
  bati,
  derleme,
  atasozu,
  yabanciKarsiliklar,
  erenEtimoloji,
  kokenBilgisi,
  tarama,
  taramaDetay,
  icerik,
  yazim,
  gununKelimesi: icerikServisi.gununKelimesi,
  gununAtasozu: icerikServisi.gununAtasozu,
  gununKurali: icerikServisi.gununKurali,
  karistirilanSozler: icerikServisi.karistirilanSozler,
  sikYapilanYanlislar: icerikServisi.sikYapilanYanlislar,
  gununYabanciKarsiligi: icerikServisi.gununYabanciKarsiligi,
  sesGetir: yazimServisi.sesGetir,
  sesUrl,
  isaretDiliUrl,
  htmlTemizle,
  veriTemizle,
};

tdk.guncelSozluk = guncel;
tdk.batiKokenli = bati;

module.exports = tdk;
Object.defineProperty(module.exports, 'default', {
  enumerable: false,
  value: tdk,
});
Object.defineProperty(module.exports, '__esModule', {
  enumerable: false,
  value: true,
});
