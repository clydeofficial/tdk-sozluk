/**
 * TDK Sözlük - Test Dosyası
 * Tüm modüllerin doğru çalıştığını doğrular
 */

const tdk = require('../src/index');

const BASARILI = '✅';
const BASARISIZ = '❌';
const BILGI = '📋';

let toplam = 0;
let basarili = 0;
let basarisiz = 0;

async function test(ad, fn) {
  toplam++;
  try {
    const sonuc = await fn();
    if (sonuc !== undefined && sonuc !== null) {
      basarili++;
      console.log(`${BASARILI} ${ad}`);
      return sonuc;
    } else {
      basarisiz++;
      console.log(`${BASARISIZ} ${ad} - Sonuç boş döndü`);
      return null;
    }
  } catch (err) {
    basarisiz++;
    console.log(`${BASARISIZ} ${ad} - ${err.message}`);
    return null;
  }
}

async function testleriCalistir() {
  console.log('');
  console.log('═══════════════════════════════════════════════');
  console.log('       TDK SÖZLÜK MODÜLÜ - TEST RAPORU');
  console.log('═══════════════════════════════════════════════');
  console.log('');

  // === Güncel Türkçe Sözlük ===
  console.log(`${BILGI} Güncel Türkçe Sözlük`);
  const gts = await test('  guncelSozluk.ara("araba")', () => tdk.guncelSozluk.ara('araba'));
  if (gts && gts.length > 0) {
    console.log(`   → Kelime: ${gts[0].madde}`);
    console.log(`   → Anlam sayısı: ${gts[0].anlam_say}`);
    console.log(`   → İlk anlam: ${gts[0].anlamlarListe[0].anlam}`);
  }
  console.log('');

  // === Batı Kökenli Kelimeler ===
  console.log(`${BILGI} Batı Kökenli Kelimeler Sözlüğü`);
  const bati = await test('  batiKokenli.ara("argo")', () => tdk.batiKokenli.ara('argo'));
  if (bati && bati.length > 0) {
    console.log(`   → Kelime: ${bati[0].sozcuk}`);
    console.log(`   → Köken: ${bati[0].kistdil} ${bati[0].dilacik}`);
  }
  console.log('');

  // === Tarama Sözlüğü ===
  console.log(`${BILGI} Tarama Sözlüğü`);
  const tarama = await test('  tarama.ara("bitik")', () => tdk.tarama.ara('bitik'));
  if (tarama && tarama.length > 0) {
    console.log(`   → Kelime: ${tarama[0].kelime}`);
  }
  await test('  tarama.getirId(2087)', () => tdk.tarama.getirId(2087));
  console.log('');

  // === Derleme Sözlüğü ===
  console.log(`${BILGI} Derleme Sözlüğü`);
  const der = await test('  derleme.ara("çellig")', () => tdk.derleme.ara('çellig'));
  if (der && der.length > 0) {
    console.log(`   → Kelime: ${der[0].madde}`);
    console.log(`   → Anlam: ${der[0].anlam}`);
  }
  console.log('');

  // === Atasözleri ve Deyimler ===
  console.log(`${BILGI} Atasözleri ve Deyimler Sözlüğü`);
  const ata = await test('  atasozu.ara("bir kalem geçmek")', () => tdk.atasozu.ara('bir kalem geçmek'));
  if (ata && ata.length > 0) {
    console.log(`   → Söz: ${ata[0].sozum}`);
    console.log(`   → Tür: ${ata[0].turu2}`);
  }
  console.log('');

  // === Yabancı Sözlere Karşılıklar ===
  console.log(`${BILGI} Yabancı Sözlere Karşılıklar Kılavuzu`);
  const yab = await test('  yabanciKarsiliklar.ara("voleybol")', () => tdk.yabanciKarsiliklar.ara('voleybol'));
  if (yab && yab.length > 0) {
    console.log(`   → Kelime: ${yab[0].kkelime}`);
    console.log(`   → Köken: ${yab[0].kkoken}`);
    console.log(`   → Karşılık: ${tdk.htmlTemizle(yab[0].kkarsilik)}`);
  }
  console.log('');

  // === Eren Etimolojik Sözlük ===
  console.log(`${BILGI} Eren Etimolojik Sözlüğü`);
  const etms = await test('  erenEtimoloji.ara("aba")', () => tdk.erenEtimoloji.ara('aba'));
  if (etms && etms.length > 0) {
    console.log(`   → Kelime: ${etms[0].madde}`);
  }
  console.log('');

  // === Köken Bilgisi Sözlüğü ===
  console.log(`${BILGI} Köken Bilgisi Sözlüğü`);
  const etim = await test('  kokenBilgisi.ara("araba")', () => tdk.kokenBilgisi.ara('araba'));
  if (etim && etim.length > 0) {
    console.log(`   → Kelime: ${etim[0].word}`);
    console.log(`   → Anlam: ${etim[0].meaning}`);
  }
  console.log('');

  // === Günlük İçerik ===
  console.log(`${BILGI} Günlük İçerik`);
  const icerik = await test('  icerik.getir()', () => tdk.icerik.getir());
  if (icerik) {
    console.log(`   → Günün kelimesi: ${icerik.kelime?.[0]?.madde || 'yok'}`);
    console.log(`   → Günün deyimi: ${icerik.atasoz?.[0]?.madde || 'yok'}`);
    console.log(`   → Günün kuralı: ${icerik.kural?.[0]?.adi || 'yok'}`);
  }
  await test('  icerik.gununKelimesi()', () => tdk.icerik.gununKelimesi());
  await test('  icerik.gununAtasozu()', () => tdk.icerik.gununAtasozu());
  await test('  icerik.gununKurali()', () => tdk.icerik.gununKurali());
  await test('  icerik.karistirilanSozler()', () => tdk.icerik.karistirilanSozler());
  await test('  icerik.sikYapilanYanlislar()', () => tdk.icerik.sikYapilanYanlislar());
  await test('  icerik.gununYabanciKarsiligi()', () => tdk.icerik.gununYabanciKarsiligi());
  console.log('');

  // === Yazım & Ses ===
  console.log(`${BILGI} Yazım & Ses`);
  const yz = await test('  yazim.ara("araba")', () => tdk.yazim.ara('araba'));
  if (yz && yz.length > 0) {
    console.log(`   → Ses kodu: ${yz[0].seskod}`);
  }
  const sesLink = await test('  yazim.sesGetir("araba")', () => tdk.yazim.sesGetir('araba'));
  if (sesLink) {
    console.log(`   → Ses URL: ${sesLink}`);
  }
  console.log('');

  // === Yardımcı Fonksiyonlar ===
  console.log(`${BILGI} Yardımcı Fonksiyonlar`);
  await test('  sesUrl("a3672")', () => {
    const url = tdk.sesUrl('a3672');
    console.log(`   → ${url}`);
    return url;
  });
  await test('  isaretDiliUrl("a")', () => {
    const url = tdk.isaretDiliUrl('a');
    console.log(`   → ${url}`);
    return url;
  });
  await test('  htmlTemizle("<strong>test</strong>")', () => {
    const temiz = tdk.htmlTemizle('<strong>test</strong>');
    console.log(`   → ${temiz}`);
    return temiz;
  });
  console.log('');

  // === Sonuçlar ===
  console.log('═══════════════════════════════════════════════');
  console.log(`  TOPLAM: ${toplam} | ${BASARILI} ${basarili} Başarılı | ${BASARISIZ} ${basarisiz} Başarısız`);
  console.log('═══════════════════════════════════════════════');
  console.log('');

  process.exit(basarisiz > 0 ? 1 : 0);
}

testleriCalistir();
