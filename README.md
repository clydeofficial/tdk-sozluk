# Türkçe Sözlük

![Download](https://img.shields.io/npm/dt/tdk-sozluk.svg?style=flat-square) ![Download](https://img.shields.io/npm/dm/tdk-sozluk.svg?style=flat-square) ![Download](https://img.shields.io/npm/dw/tdk-sozluk.svg?style=flat-square) ![License](https://img.shields.io/npm/l/tdk-sozluk.svg?style=flat-square)

Bu modül, Türk Dil Kurumu (TDK)'ndan Türkçe kelimelerin anlamlarını, örnek cümlelerini, birleşik kelimelerini, atasözlerini, kelimenin sesli okunuşu ve Türk İşaret Dili GIF'lerini çekmek için tasarlanmıştır.

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