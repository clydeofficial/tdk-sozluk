const { BASE_URL } = require('./constants');

const HTML_TAG_TEST = /<\/?[a-z][\w:-]*(?:\s+[^<>]*?)?>/i;
const HTML_TAG_GLOBAL = /<\/?[a-z][\w:-]*(?:\s+[^<>]*?)?>/gi;
const HTML_ENTITY_TEST = /&(amp|lt|gt|quot|#039|nbsp);/i;
const HTML_ENTITIES = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#039;': "'",
  '&nbsp;': ' ',
};

function sesUrl(sesKodu) {
  if (!sesKodu) {
    throw new Error('Ses kodu belirtilmelidir.');
  }

  return `${BASE_URL}/ses/${sesKodu}.wav`;
}

function isaretDiliUrl(harf) {
  if (!harf) {
    throw new Error('Harf belirtilmelidir.');
  }

  return `${BASE_URL}/assets/img/isaret/${String(harf).toLowerCase()}.gif`;
}

function htmlTemizle(html) {
  if (!html) {
    return '';
  }

  return String(html)
    .replace(HTML_TAG_GLOBAL, ' ')
    .replace(/&(amp|lt|gt|quot|#039|nbsp);/gi, (entity) => HTML_ENTITIES[entity.toLowerCase()] || entity)
    .replace(/\s+/g, ' ')
    .trim();
}

function metinTemizle(metin) {
  if (typeof metin !== 'string') {
    return metin;
  }

  if (HTML_TAG_TEST.test(metin) || HTML_ENTITY_TEST.test(metin)) {
    return htmlTemizle(metin);
  }

  return metin.trim();
}

function veriTemizle(veri) {
  if (Array.isArray(veri)) {
    return veri.map(veriTemizle);
  }

  if (veri && typeof veri === 'object') {
    return Object.fromEntries(
      Object.entries(veri).map(([anahtar, deger]) => [anahtar, veriTemizle(deger)])
    );
  }

  if (typeof veri === 'string') {
    return metinTemizle(veri);
  }

  return veri;
}

module.exports = {
  htmlTemizle,
  isaretDiliUrl,
  metinTemizle,
  sesUrl,
  veriTemizle,
};
