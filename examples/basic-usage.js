/**
 * Basic Usage Examples - TDK Sözlük v4.0.0
 * Demonstrates simple usage of all dictionary functions
 */

const {
    searchCurrentTurkish,
    getPronunciationAudio,
    searchProverbs,
    searchForeignWords,
    searchWesternOrigin,
    searchScanning,
    searchCompilation,
    searchEtymologyETMS,
    searchEtymology,
    searchTurkicDialects,
    searchMetrology
} = require('../index');

async function demonstrateBasicUsage() {
    console.log('='.repeat(60));
    console.log('TDK SÖZLÜK v4.0.0 - BASIC USAGE EXAMPLES');
    console.log('='.repeat(60));
    console.log();

    try {
        // 1. Current Turkish Dictionary
        console.log('1️⃣  CURRENT TURKISH DICTIONARY (Güncel Türkçe Sözlük)');
        console.log('-'.repeat(60));
        const word = await searchCurrentTurkish('araba');
        console.log(`Word: ${word.word}`);
        console.log(`Meanings: ${word.meanings.length}`);
        console.log(`First Meaning: ${word.meanings[0].definition}`);
        console.log();

        // 2. Pronunciation
        console.log('2️⃣  PRONUNCIATION (Ses Dosyası)');
        console.log('-'.repeat(60));
        const audioUrl = await getPronunciationAudio('araba');
        console.log(`Audio URL: ${audioUrl}`);
        console.log();

        // 3. Proverbs and Idioms
        console.log('3️⃣  PROVERBS & IDIOMS (Atasözleri ve Deyimler)');
        console.log('-'.repeat(60));
        const proverbs = await searchProverbs('damlaya');
        console.log(`Found ${proverbs.length} proverb(s)`);
        console.log(`First: ${proverbs[0].proverb}`);
        console.log(`Meaning: ${proverbs[0].meaning}`);
        console.log();

        // 4. Foreign Words Guide
        console.log('4️⃣  FOREIGN WORDS GUIDE (Yabancı Sözlere Karşılıklar)');
        console.log('-'.repeat(60));
        const foreign = await searchForeignWords('basketbol');
        console.log(`Found ${foreign.length} equivalent(s)`);
        console.log(`Word: ${foreign[0].word}`);
        console.log(`Turkish Equivalent: ${foreign[0].equivalent}`);
        console.log();

        // 5. Etymology
        console.log('5️⃣  ETYMOLOGY (Etimoloji)');
        console.log('-'.repeat(60));
        const etymology = await searchEtymology('abajur');
        console.log(`Word: ${etymology.word}`);
        console.log(`Etymology: ${etymology.etymology}`);
        console.log();

        // 6. ⭐ NEW: Turkic Dialects (Comparative)
        console.log('6️⃣  ⭐ NEW: TURKIC DIALECTS (Türk Lehçeleri)');
        console.log('-'.repeat(60));
        const dialects = await searchTurkicDialects('adam');
        console.log(`Turkish: ${dialects[0].turkish}`);
        console.log(`Azerbaijani: ${dialects[0].dialects.azerbaijani.join(', ')}`);
        console.log(`Kazakh: ${dialects[0].dialects.kazakh.join(', ')}`);
        console.log(`Kyrgyz: ${dialects[0].dialects.kyrgyz.join(', ')}`);
        console.log();

        // 7. ⭐ NEW: International Metrology
        console.log('7️⃣  ⭐ NEW: INTERNATIONAL METROLOGY (Metroloji)');
        console.log('-'.repeat(60));
        const metrology = await searchMetrology('büyüklük');
        console.log(`Term: ${metrology[0].term}`);
        console.log(`Definition (first 200 chars):`);
        console.log(metrology[0].definition.substring(0, 200) + '...');
        console.log();

        console.log('='.repeat(60));
        console.log('✅ All examples completed successfully!');
        console.log('='.repeat(60));

    } catch (error) {
        console.error('❌ Error:', error.message);
        console.error('Error details:', error);
    }
}

// Run if executed directly
if (require.main === module) {
    demonstrateBasicUsage();
}

module.exports = { demonstrateBasicUsage };
