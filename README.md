# Türkçe Sözlük

![Download](https://img.shields.io/npm/dt/tdk-sozluk.svg?style=flat-square) ![Download](https://img.shields.io/npm/dm/tdk-sozluk.svg?style=flat-square) ![Download](https://img.shields.io/npm/dw/tdk-sozluk.svg?style=flat-square) ![License](https://img.shields.io/npm/l/tdk-sozluk.svg?style=flat-square)

Bu modül, Türk Dil Kurumu (TDK)'ndan Türkçe kelimelerin anlamlarını, örnek cümlelerini, birleşik kelimelerini, atasözlerini, kelimenin sesli okunuşunu, telaffuzunu ve Türk İşaret Dili GIF'lerini çekmek için tasarlanmıştır. Ayrıca [site](https://sozluk.iamemre.dev) ile API hizmeti de sağlamaktır. Değişiklik günlüğüne ulaşmak için [buraya](https://sozluk.iamemre.dev/degisiklik-gunlugu) tıklayabilirsin.

## Kurulum

Modülü npm ile yüklemek için:

```sh
npm install tdk-sozluk
```

# Örnek Kullanım

Modülün örnek kullanımı aşağıda verilmiştir:

```js
const { kelimeVerisiAl } = require('tdk-sozluk');

(async () => {
    const kelime = 'araba';
    const kelimeVerisi = await kelimeVerisiAl(kelime);
    if (!kelimeVerisi) {
        console.log('Kelime bulunamadı.');
        return;
    }

    console.log(`${kelimeVerisi.kelime} kelimesinin anlamları:`);
    kelimeVerisi.anlamlar.forEach((anlam, indeks) => {
        console.log(`${indeks + 1}. ${anlam.anlam}`);
        if (anlam.ozellikler.length > 0) {
            console.log(`   Özellikler: ${anlam.ozellikler.join(', ')}`);
        }
        if (anlam.ornekCumleler.length > 0) {
            console.log('   Örnek cümleler:');
            anlam.ornekCumleler.forEach((ornek, exIndex) => {
                console.log(`      ${exIndex + 1}. ${ornek}`);
            });
        }
        if (anlam.telaffuz) {
            console.log(`   Telaffuz: ${anlam.telaffuz}`);
        }
    });

    if (kelimeVerisi.birlesikKelimeler.length > 0) {
        console.log('\nBirleşik Kelimeler:');
        kelimeVerisi.birlesikKelimeler.forEach((birlesikKelime, indeks) => {
            console.log(`${indeks + 1}. ${birlesikKelime}`);
        });
    }

    if (kelimeVerisi.atasozleri.length > 0) {
        console.log('\nAtasözleri:');
        kelimeVerisi.atasozleri.forEach((atasozu, indeks) => {
            console.log(`${indeks + 1}. ${atasozu}`);
        });
    }

    if (kelimeVerisi.isaretDiliGifleri.length > 0) {
        console.log('\nTürk İşaret Dili GIF\'leri:');
        kelimeVerisi.isaretDiliGifleri.forEach((gif, indeks) => {
            console.log(`${indeks + 1}. ${gif}`);
        });
    }

    if (kelimeVerisi.sesliOkunusUrl) {
        console.log(`\nSesli Okunuş URL: ${kelimeVerisi.sesliOkunusUrl}`);
    } else {
        console.log('\nSesli okunuş bulunamadı.');
    }
})();
```
## Katkıda Bulunanlar
<a href="https://github.com/clydeofficial/tdk-sozluk/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=clydeofficial/tdk-sozluk" />
</a>

Proje ile ilgili geri bildirim, katkı veya önerileriniz için issue veya pull request açabilirsiniz. Katkılarınızı memnuniyetle karşılarız.
