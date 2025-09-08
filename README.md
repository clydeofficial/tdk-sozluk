# tdk-sozluk

![Downloads](https://img.shields.io/npm/dt/tdk-sozluk.svg?style=flat-square)
![Weekly Downloads](https://img.shields.io/npm/dw/tdk-sozluk.svg?style=flat-square)
![License](https://img.shields.io/npm/l/tdk-sozluk.svg?style=flat-square)

Türk Dil Kurumu (TDK) sözlük API'lerinden veri çekmek ve Türkçe kelimelerle ilgili detaylı bilgilere kolayca erişmek için hazırlanmış kapsamlı bir Node.js modülüdür.

## Özellikler

- Güncel Türkçe Sözlük (GTS) verileri
- Yazım ve telaffuz bilgileri
- Batı kökenli kelimeler sözlüğü
- Tarama sözlüğü
- Derleme sözlüğü
- Atasözleri ve deyimler sözlüğü
- Yabancı sözlere karşılıklar kılavuzu
- Eren Türk Dilinin Etimolojik Sözlüğü
- Köken Bilgisi Sözlüğü

## Kurulum

```sh
npm install tdk-sozluk
```

## Kullanım

Tüm fonksiyonlar asenkron çalışır ve kelimeyi parametre olarak alır.

```js
const {
    getGtsWord,
    getPronunciation,
    getBatiWord,
    getTaramaWord,
    getDerlemeWord,
    getAtasozu,
    getKilavuz,
    getEtmsWord,
    getEtimolojiWord
} = require('tdk-sozluk');

(async () => {
    const kelime = 'araba';

    // Güncel Türkçe Sözlük
    const gts = await getGtsWord(kelime);
    console.log('GTS:', gts);

    // Yazım ve telaffuz
    const pronunciationUrl = await getPronunciation(kelime);
    console.log('Sesli Okunuş:', pronunciationUrl);

    // Batı kökenli kelime
    const bati = await getBatiWord('jeton');
    console.log('Batı Kökenli:', bati);

    // Tarama sözlüğü
    const tarama = await getTaramaWord('Türk');
    console.log('Tarama:', tarama);

    // Derleme sözlüğü
    const derleme = await getDerlemeWord('Türk');
    console.log('Derleme:', derleme);

    // Atasözleri ve deyimler
    const atasozu = await getAtasozu('damlaya damlaya göl olur');
    console.log('Atasözü:', atasozu);

    // Yabancı sözlere karşılıklar kılavuzu
    const kilavuz = await getKilavuz('basketbol');
    console.log('Kılavuz:', kilavuz);

    // Eren Türk Dilinin Etimolojik Sözlüğü
    const etms = await getEtmsWord('abajur');
    console.log('Etimolojik Sözlük:', etms);

    // Köken Bilgisi Sözlüğü
    const etimoloji = await getEtimolojiWord('abajur');
    console.log('Köken Bilgisi:', etimoloji);
})();
```

## API Fonksiyonları

| Fonksiyon            | Açıklama                                               |
|----------------------|--------------------------------------------------------|
| `getGtsWord`         | Güncel Türkçe Sözlük verisi döndürür                   |
| `getPronunciation`   | Kelimenin sesli okunuş URL'sini döndürür               |
| `getBatiWord`        | Batı kökenli kelime verisi döndürür                    |
| `getTaramaWord`      | Tarama sözlüğü verisi döndürür                         |
| `getDerlemeWord`     | Derleme sözlüğü verisi döndürür                        |
| `getAtasozu`         | Atasözleri ve deyimler sözlüğü verisi döndürür         |
| `getKilavuz`         | Yabancı sözlere karşılıklar kılavuzu verisi döndürür   |
| `getEtmsWord`        | Eren Türk Dilinin Etimolojik Sözlüğü verisi döndürür   |
| `getEtimolojiWord`   | Köken Bilgisi Sözlüğü verisi döndürür                  |

## Lisans

Bu proje [CC BY-NC-SA 4.0](LICENSE) lisansı ile korunmaktadır.

---

Daha fazla bilgi ve güncellemeler için [siteyi ziyaret edin](https://sozluk.clydeis.me).