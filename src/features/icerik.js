const { get } = require('../core/http');

async function getir() {
  return get('/icerik');
}

async function bolumGetir(alan, varsayilanDeger) {
  const icerik = await getir();
  return icerik[alan] ?? varsayilanDeger;
}

async function gununKelimesi() {
  return bolumGetir('kelime', []);
}

async function gununAtasozu() {
  return bolumGetir('atasoz', []);
}

async function gununKurali() {
  return bolumGetir('kural', []);
}

async function karistirilanSozler() {
  return bolumGetir('karistirma', []);
}

async function sikYapilanYanlislar() {
  return bolumGetir('syyd', []);
}

async function gununYabanciKarsiligi() {
  return bolumGetir('yabanci', null);
}

module.exports = {
  getir,
  gununAtasozu,
  gununKelimesi,
  gununKurali,
  gununYabanciKarsiligi,
  karistirilanSozler,
  sikYapilanYanlislar,
};
