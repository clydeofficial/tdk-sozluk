# tdk-sozluk v4.0.0

![Downloads](https://img.shields.io/npm/dt/tdk-sozluk.svg?style=flat-square)
![Weekly Downloads](https://img.shields.io/npm/dw/tdk-sozluk.svg?style=flat-square)
![Version](https://img.shields.io/npm/v/tdk-sozluk.svg?style=flat-square)
![License](https://img.shields.io/npm/l/tdk-sozluk.svg?style=flat-square)

**Comprehensive Node.js module for accessing Turkish Language Association (TDK) dictionaries** with modern architecture, TypeScript support, and robust error handling.

## 🎉 What's New in v4.0

- ⭐ **Two New Dictionaries**: Turkic Dialects (Comparative) & International Metrology
- 🏗️ **Better Architecture**: Base classes, consistent error handling, retry logic
- 📝 **TypeScript Support**: Full TypeScript definitions included
- 🎯 **Improved API**: More descriptive function names and better response structures
- ⚡ **Enhanced Performance**: Request retry with exponential backoff, configurable timeouts
- 🛡️ **Robust Error Handling**: Custom error classes for different failure scenarios

## 📚 Available Dictionaries

<table>
<tr><th>Dictionary</th><th>Function</th><th>Description</th></tr>
<tr>
  <td>Güncel Türkçe Sözlük</td>
  <td><code>searchCurrentTurkish</code></td>
  <td>Official comprehensive Turkish dictionary</td>
</tr>
<tr>
  <td>Sesli Okunuş</td>
  <td><code>getPronunciationAudio</code></td>
  <td>Audio pronunciation files</td>
</tr>
<tr>
  <td>Batı Kökenli Kelimeler</td>
  <td><code>searchWesternOrigin</code></td>
  <td>Western origin words</td>
</tr>
<tr>
  <td>Tarama Sözlüğü</td>
  <td><code>searchScanning</code></td>
  <td>Historical scanning dictionary</td>
</tr>
<tr>
  <td>Derleme Sözlüğü</td>
  <td><code>searchCompilation</code></td>
  <td>Compilation dictionary</td>
</tr>
<tr>
  <td>Atasözleri ve Deyimler</td>
  <td><code>searchProverbs</code></td>
  <td>Proverbs and idioms</td>
</tr>
<tr>
  <td>Yabancı Sözlere Karşılıklar</td>
  <td><code>searchForeignWords</code></td>
  <td>Turkish equivalents of foreign words</td>
</tr>
<tr>
  <td>Eren Etimoloji</td>
  <td><code>searchEtymologyETMS</code></td>
  <td>Eren's etymological dictionary</td>
</tr>
<tr>
  <td>Köken Bilgisi</td>
  <td><code>searchEtymology</code></td>
  <td>Etymology dictionary</td>
</tr>
<tr>
  <td>⭐ Türk Lehçeleri</td>
  <td><code>searchTurkicDialects</code></td>
  <td>Comparative Turkic dialects (NEW)</td>
</tr>
<tr>
  <td>⭐ Metroloji</td>
  <td><code>searchMetrology</code></td>
  <td>International metrology terms (NEW)</td>
</tr>
</table>

## 📦 Installation

```bash
npm install tdk-sozluk
```

## 🚀 Quick Start

```javascript
const { searchCurrentTurkish, searchTurkicDialects } = require('tdk-sozluk');

// Search Current Turkish Dictionary
const word = await searchCurrentTurkish('ev');
console.log(word.meanings[0].definition);

// Compare across Turkic dialects (NEW!)
const dialects = await searchTurkicDialects('adam');
console.log(dialects[0].dialects.azerbaijani); // ['adam']
console.log(dialects[0].dialects.kazakh);      // ['adam', 'kisi']
```

## 📖 Detailed Usage

### Current Turkish Dictionary

```javascript
const { searchCurrentTurkish, getPronunciationAudio } = require('tdk-sozluk');

const result = await searchCurrentTurkish('araba', {
    includeCompounds: true,
    includeProverbs: true,
    includeSignLanguage: true
});

console.log(result);
/*
{
  word: 'araba',
  meanings: [
    {
      definition: 'Motorlu veya motorsuz kara taşıtlarının genel adı',
      properties: ['isim'],
      examples: ['Araba sürmek', 'At arabası'],
      pronunciation: null
    }
  ],
  compounds: ['araba vapuru', 'araba sürücüsü'],
  proverbs: ['Arabanın beşinci tekeri olmak'],
  audioUrl: 'https://sozluk.gov.tr/ses/araba.wav',
  signLanguageGifs: [...]
}
*/

// Get just the audio
const audioUrl = await getPronunciationAudio('araba');
// https://sozluk.gov.tr/ses/araba.wav
```

### Proverbs and Idioms

```javascript
const { searchProverbs } = require('tdk-sozluk');

const proverbs = await searchProverbs('damlaya damlaya göl olur');
console.log(proverbs[0]);
/*
{
  proverb: 'Damlaya damlaya göl olur',
  meaning: 'Küçük küçük biriken şeyler zamanla çok olur',
  keywords: ['göl', 'damla'],
  type: 'atasözü'
}
*/
```

### Foreign Words Guide

```javascript
const { searchForeignWords } = require('tdk-sozluk');

const words = await searchForeignWords('basketbol');
console.log(words[0]);
/*
{
  word: 'basketbol',
  origin: 'İngilizce',
  equivalent: 'sepet topu',
  meaning: 'Basketbol oyunu'
}
*/
```

### ⭐ NEW: Turkic Dialects (Comparative)

Compare word equivalents across 9 Turkic languages/dialects:

```javascript
const { searchTurkicDialects } = require('tdk-sozluk');

const dialects = await searchTurkicDialects('adam');
console.log(dialects[0]);
/*
{
  dialectId: '51',
  originalWord: 'adam',
  turkish: 'adam',
  dialects: {
    azerbaijani: ['adam'],
    bashkir: ['kişi', 'äⱬäm'],
    kazakh: ['adam', 'kisi'],
    kyrgyz: ['adam', 'kişi'],
    uzbek: ['àdäm'],
    tatar: ['kişi', 'adäm'],
    turkmen: ['ãdam'],
    uyghur: ['adäm'],
    russian: ['çelovek']
  }
}
*/
```

**Supported Languages:**
- 🇦🇿 Azerbaijani (Azerbaycan Türkçesi)
- Bashkir (Başkurt Türkçesi)
- 🇰🇿 Kazakh (Kazak Türkçesi)
- 🇰🇬 Kyrgyz (Kırgız Türkçesi)
- 🇺🇿 Uzbek (Özbek Türkçesi)
- Tatar (Tatar Türkçesi)
- 🇹🇷 Turkish (Türkiye Türkçesi)
- 🇹🇲 Turkmen (Türkmen Türkçesi)
- Uyghur (Uygur Türkçesi)
- 🇷🇺 Russian (Rusça - for reference)

### ⭐ NEW: International Metrology

Technical dictionary for measurement science:

```javascript
const { searchMetrology } = require('tdk-sozluk');

const terms = await searchMetrology('büyüklük');
console.log(terms[0]);
/*
{
  termId: '33',
  term: 'büyüklük',
  definition: 'Bir olgu, cisim veya maddeye ait olan ve miktarı sayı ve referans olarak ifade edilebilen özellik...'
}
*/
```

## 🛡️ Error Handling

The module provides custom error classes for different scenarios:

```javascript
const {
    searchCurrentTurkish,
    NotFoundError,
    NetworkError,
    ValidationError,
    DictionaryError
} = require('tdk-sozluk');

try {
    const result = await searchCurrentTurkish('xyz123nonexistent');
} catch (error) {
    if (error instanceof NotFoundError) {
        console.log(`Word "${error.word}" not found in ${error.dictionaryType}`);
    } else if (error instanceof NetworkError) {
        console.log(`Network error (${error.statusCode}): ${error.message}`);
    } else if (error instanceof ValidationError) {
        console.log(`Validation error in ${error.field}: ${error.message}`);
    } else if (error instanceof DictionaryError) {
        console.log(`Dictionary error: ${error.code} - ${error.message}`);
    }
}
```

## ⚙️ Advanced Options

All search functions support advanced options:

```javascript
const result = await searchCurrentTurkish('ev', {
    timeout: 5000,      // Request timeout in ms (default: 10000)
    retries: 2,         // Number of retries (default: 3)
    debug: true         // Enable debug logging
});
```

## 📝 TypeScript Support

Full TypeScript definitions are included:

```typescript
import { 
    searchCurrentTurkish, 
    searchTurkicDialects,
    CurrentTurkishResult,
    TurkicDialectResult 
} from 'tdk-sozluk';

const word: CurrentTurkishResult | null = await searchCurrentTurkish('ev');
const dialects: TurkicDialectResult[] = await searchTurkicDialects('adam');

// Full IntelliSense support!
console.log(word.meanings[0].definition);
console.log(dialects[0].dialects.azerbaijani);
```

## 📊 Testing

Run the comprehensive test suite:

```bash
npm test
```

Or test manually:

```bash
node examples/test-all-dictionaries.js
node examples/basic-usage.js
```

## 🔄 Migration from v3.x

<details>
<summary>Click to see migration guide</summary>

Function names have been improved for clarity:

| v3.x | v4.0 |
|------|------|
| `getGtsWord` | `searchCurrentTurkish` |
| `getPronunciation` | `getPronunciationAudio` |
| `getBatiWord` | `searchWesternOrigin` |
| `getTaramaWord` | `searchScanning` |
| `getDerlemeWord` | `searchCompilation` |
| `getAtasozu` | `searchProverbs` |
| `getKilavuz` | `searchForeignWords` |
| `getEtmsWord` | `searchEtymologyETMS` |
| `getEtimolojiWord` | `searchEtymology` |

**New in v4.0:**
- `searchTurkicDialects()` - Comparative Turkic dialects
- `searchMetrology()` - International metrology terms
- Custom error classes for better error handling
- TypeScript definitions
- Retry logic and better timeout handling

</details>

## 📋 API Reference

See [full API documentation](https://sozluk.clydeis.me) for detailed information about all functions and response structures.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under [CC BY-NC-SA 4.0](LICENSE).

## 🔗 Links

- **Homepage**: https://sozluk.clydeis.me
- **GitHub**: https://github.com/clydeofficial/tdk-sozluk
- **NPM**: https://www.npmjs.com/package/tdk-sozluk
- **TDK Official**: https://sozluk.gov.tr

---

**Made with ❤️ by Clyde**

*Türk Dil Kurumu (TDK) sözlüklerinden veri çeken kapsamlı Node.js modülü*