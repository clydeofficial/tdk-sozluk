function kelimeDogrula(kelime, hataMesaji = 'Geçerli bir kelime giriniz.') {
  if (typeof kelime !== 'string') {
    throw new Error(hataMesaji);
  }

  const temizKelime = kelime.trim();
  if (!temizKelime) {
    throw new Error(hataMesaji);
  }

  return temizKelime;
}

function idDogrula(id, hataMesaji = 'Geçerli bir ID giriniz.') {
  if (id === undefined || id === null) {
    throw new Error(hataMesaji);
  }

  if (typeof id === 'string') {
    const temizId = id.trim();
    if (!temizId) {
      throw new Error(hataMesaji);
    }
    return temizId;
  }

  return id;
}

module.exports = {
  idDogrula,
  kelimeDogrula,
};
