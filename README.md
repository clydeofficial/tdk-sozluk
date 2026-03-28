# 📖 tdk-sozluk

![Version](https://img.shields.io/npm/v/tdk-sozluk.svg?style=flat-square)
![Download Total](https://img.shields.io/npm/dt/tdk-sozluk.svg?style=flat-square)
![Download Monthly](https://img.shields.io/npm/dm/tdk-sozluk.svg?style=flat-square)
![Download Weekly](https://img.shields.io/npm/dw/tdk-sozluk.svg?style=flat-square)
![License](https://img.shields.io/npm/l/tdk-sozluk.svg?style=flat-square)

**TDK'nin (Türk Dil Kurumu) sözlük servislerini kolay ve düzenli bir API ile kullanmanızı sağlayan Node.js modülü.**

Kelime anlamlarını, atasözlerini, deyimleri, köken bilgilerini, günlük içerikleri ve sesli okunuş bağlantılarını tek paket üzerinden alabilirsiniz.

---

## ✨ Özellikler

- 📚 **8 farklı sözlükte arama**: Güncel Türkçe Sözlük, Tarama Sözlüğü, Derleme Sözlüğü, Atasözleri ve Deyimler Sözlüğü, Batı Kökenli Kelimeler Sözlüğü, Yabancı Sözlere Karşılıklar Kılavuzu, Eren Etimoloji, Köken Bilgisi
- 📅 **Günlük içerikler**: Günün kelimesi, atasözü, yazım kuralı ve sık yapılan yanlışlar
- 🔊 **Sesli okunuş**: Kelimelerin ses dosyası bağlantılarını alma
- 🤟 **Türk İşaret Dili bağlantıları**: Harf bazlı GIF adresleri
- 🧹 **Otomatik veri temizleme**: HTML etiketleri ve gereksiz boşluklar temizlenmiş JSON sonuçları
- 🧠 **VS Code desteği**: Otomatik tamamlama, açıklama ve tip ipuçları
- 📦 **CommonJS ve ESM desteği**: Hem `require`, hem `import` ile kullanım

---

## 📦 Kurulum

```bash
npm install tdk-sozluk
```

---

## 🚀 Hızlı Başlangıç

### CommonJS

```javascript
const tdk = require('tdk-sozluk');

(async () => {
  const sonuc = await tdk.guncel('araba');
  console.log(sonuc[0].anlamlarListe[0].anlam);

  const kelime = await tdk.gununKelimesi();
  console.log(kelime[0].madde);

  const sesLink = await tdk.sesGetir('araba');
  console.log(sesLink);
})();
```

### ESM

```javascript
import tdk, { guncel, gununKelimesi, sesGetir } from 'tdk-sozluk';

const sonuc = await guncel('araba');
console.log(sonuc[0].anlamlarListe[0].anlam);

const kelime = await gununKelimesi();
console.log(kelime[0].madde);

const sesLink = await sesGetir('araba');
console.log(sesLink);
```

### `await` kullanmak istemiyorsanız

```javascript
const tdk = require('tdk-sozluk');

tdk.guncel('araba').then((sonuc) => {
  console.log(sonuc[0].anlamlarListe[0].anlam);
});
```

> **Not:** Bu paket TDK servislerine HTTP isteği gönderdiği için sonuçlar `Promise` olarak döner. Bu nedenle `await` veya `.then()` kullanımı gereklidir.

---

## 📚 Sözlükler

### Güncel Türkçe Sözlük

```javascript
const sonuc = await tdk.guncel('araba');

// sonuc[0].madde
// sonuc[0].anlam_say
// sonuc[0].anlamlarListe
// sonuc[0].atasozu
// sonuc[0].birlesikler
```

### Batı Kökenli Kelimeler Sözlüğü

```javascript
const sonuc = await tdk.bati('argo');

// sonuc[0].sozcuk
// sonuc[0].kistdil
// sonuc[0].dilacik
// sonuc[0].anlam
```

### Tarama Sözlüğü

```javascript
const sonuc = await tdk.tarama('bitik');
const detay = await tdk.taramaDetay(2087);
```

### Derleme Sözlüğü

```javascript
const sonuc = await tdk.derleme('çellig');

// sonuc[0].madde
// sonuc[0].anlam
// sonuc[0].sehir
```

### Atasözleri ve Deyimler Sözlüğü

```javascript
const sonuc = await tdk.atasozu('bir kalem geçmek');

// sonuc[0].sozum
// sonuc[0].turu2
// sonuc[0].anlami
```

### Yabancı Sözlere Karşılıklar Kılavuzu

```javascript
const sonuc = await tdk.yabanciKarsiliklar('voleybol');

// sonuc[0].kkelime
// sonuc[0].kkoken
// sonuc[0].kkarsilik
// sonuc[0].anlam
```

### Eren Türk Dilinin Etimolojik Sözlüğü

```javascript
const sonuc = await tdk.erenEtimoloji('aba');

// sonuc[0].madde
// sonuc[0].anlam1
// sonuc[0].aciklama
```

### Köken Bilgisi Sözlüğü

```javascript
const sonuc = await tdk.kokenBilgisi('araba');

// sonuc[0].word
// sonuc[0].meaning
// sonuc[0].etimology
```

---

## 📅 Günlük İçerikler

```javascript
const icerik = await tdk.icerik();

// icerik.kelime
// icerik.atasoz
// icerik.kural
// icerik.karistirma
// icerik.syyd
// icerik.yabanci
// icerik.sayac
```

Ayrı ayrı kullanım:

```javascript
const kelime = await tdk.gununKelimesi();
const atasozu = await tdk.gununAtasozu();
const kural = await tdk.gununKurali();
const karistirilan = await tdk.karistirilanSozler();
const yanlislar = await tdk.sikYapilanYanlislar();
const yabanci = await tdk.gununYabanciKarsiligi();
```

İsterseniz servis nesnesi üzerinden de kullanabilirsiniz:

```javascript
const kelime = await tdk.icerik.gununKelimesi();
const atasozu = await tdk.icerik.gununAtasozu();
```

---

## 🔊 Yazım ve Sesli Okunuş

```javascript
const yazim = await tdk.yazim('araba');
const sesLink = await tdk.sesGetir('araba');
const url = tdk.sesUrl('a3672');
```

Servis nesnesiyle kullanım:

```javascript
const yazim = await tdk.yazim.ara('araba');
const sesLink = await tdk.yazim.sesGetir('araba');
```

> **Not:** Her kelimenin sesli okunuşu bulunmayabilir. Böyle durumlarda `sesGetir()` metodu `null` döner.

---

## 🤟 Türk İşaret Dili

```javascript
const gif = tdk.isaretDiliUrl('a');
```

---

## 🧹 Yardımcı Fonksiyonlar

```javascript
tdk.htmlTemizle('<strong>araba</strong>');
// "araba"

tdk.veriTemizle([{ anlam: '<b>örnek</b>' }]);
// [{ anlam: 'örnek' }]
```

---

## 🔁 Geriye Dönük Uyum

Eski kullanım biçimlerini korumak için aşağıdaki adlar da desteklenir:

```javascript
await tdk.guncelSozluk.ara('araba');
await tdk.batiKokenli.ara('argo');
await tdk.tarama.ara('bitik');
await tdk.tarama.getirId(2087);
await tdk.yazim.ara('araba');
await tdk.yazim.sesGetir('araba');
await tdk.icerik.gununKelimesi();
```

---

## 🧠 VS Code Otomatik Tamamlama

Bu paket artık tip tanımlarıyla birlikte gelir. Yani VS Code içinde:

- `tdk.` yazdığınızda metodlar listelenir
- metod açıklamaları görünür
- parametre ipuçları gösterilir
- dönen veri yapıları için alan önerileri alınır

Örneğin `tdk.guncel`, `tdk.gununKelimesi`, `tdk.sesGetir` ve `tdk.icerik.gununKurali` gibi alanlar düzenleyicide açıklamalı şekilde görünür.

---

## 📋 Hızlı Referans

| Modül | Metot | Açıklama |
|-------|-------|----------|
| `tdk.guncel` | `(kelime)` | Güncel Türkçe Sözlük'te arama yapar |
| `tdk.bati` | `(kelime)` | Batı kökenli kelimeleri arar |
| `tdk.derleme` | `(kelime)` | Derleme Sözlüğü'nde arama yapar |
| `tdk.atasozu` | `(kelime)` | Atasözleri ve deyimler arasında arama yapar |
| `tdk.yabanciKarsiliklar` | `(kelime)` | Yabancı sözlere önerilen Türkçe karşılıkları getirir |
| `tdk.erenEtimoloji` | `(kelime)` | Eren etimoloji verisini getirir |
| `tdk.kokenBilgisi` | `(kelime)` | Köken bilgisi verisini getirir |
| `tdk.tarama` | `(kelime)` | Tarama Sözlüğü'nde arama yapar |
| `tdk.taramaDetay` | `(id)` | Tarama kaydını kimliğine göre getirir |
| `tdk.icerik` | `()` | Tüm günlük içeriği getirir |
| `tdk.gununKelimesi` | `()` | Günün kelimesini getirir |
| `tdk.gununAtasozu` | `()` | Günün atasözü veya deyimini getirir |
| `tdk.gununKurali` | `()` | Günün yazım kuralını getirir |
| `tdk.karistirilanSozler` | `()` | Sıkça karıştırılan sözleri getirir |
| `tdk.sikYapilanYanlislar` | `()` | Sık yapılan yanlışları getirir |
| `tdk.gununYabanciKarsiligi` | `()` | Günün yabancı söz karşılığını getirir |
| `tdk.yazim` | `(kelime)` | Yazım bilgilerini getirir |
| `tdk.sesGetir` | `(kelime)` | Sesli okunuş bağlantısını getirir |
| `tdk.sesUrl` | `(sesKodu)` | Ses kodundan WAV bağlantısı üretir |
| `tdk.isaretDiliUrl` | `(harf)` | İşaret dili GIF bağlantısı üretir |
| `tdk.htmlTemizle` | `(html)` | HTML içeriğini düz metne çevirir |
| `tdk.veriTemizle` | `(veri)` | Nesne veya dizideki metin alanlarını temizler |

---

## ⚙️ Gereksinimler

- **Node.js** 14.0.0 veya üzeri
- **axios** bağımlılığı paketle birlikte kurulur

---

## 📝 Lisans

MIT © 2026
