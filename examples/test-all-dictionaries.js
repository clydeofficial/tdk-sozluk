/**
 * Test All Dictionaries - TDK Sözlük v4.0.0
 * Comprehensive test to verify all dictionaries are working correctly
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
    searchMetrology,
    NotFoundError
} = require('../index');

// Test results tracker
const results = {
    passed: 0,
    failed: 0,
    tests: []
};

function logTest(name, success, error = null) {
    const status = success ? '✅ PASS' : '❌ FAIL';
    console.log(`${status} - ${name}`);
    
    if (error) {
        console.log(`   Error: ${error.message}`);
    }
    
    results.tests.push({ name, success, error: error ? error.message : null });
    
    if (success) {
        results.passed++;
    } else {
        results.failed++;
    }
}

async function testDictionary(name, testFn) {
    try {
        await testFn();
        logTest(name, true);
    } catch (error) {
        logTest(name, false, error);
    }
}

async function runAllTests() {
    console.log('='.repeat(70));
    console.log('TESTING TDK SÖZLÜK v4.0.0 - ALL DICTIONARIES');
    console.log('='.repeat(70));
    console.log();

    // Test 1: Current Turkish Dictionary
    await testDictionary('Current Turkish Dictionary', async () => {
        const result = await searchCurrentTurkish('ev');
        if (!result || !result.word || !result.meanings) {
            throw new Error('Invalid response structure');
        }
        if (result.meanings.length === 0) {
            throw new Error('No meanings found');
        }
    });

    // Test 2: Pronunciation
    await testDictionary('Pronunciation Audio', async () => {
        const url = await getPronunciationAudio('ev');
        if (!url || !url.includes('.wav')) {
            throw new Error('Invalid audio URL');
        }
    });

    // Test 3: Western Origin
    await testDictionary('Western Origin Dictionary', async () => {
        const result = await searchWesternOrigin('jeton');
        if (!result) {
            throw new Error('No result found');
        }
    });

    // Test 4: Scanning Dictionary
    await testDictionary('Scanning Dictionary', async () => {
        const result = await searchScanning('Türk');
        if (!result) {
            throw new Error('No result found');
        }
    });

    // Test 5: Compilation Dictionary
    await testDictionary('Compilation Dictionary', async () => {
        const result = await searchCompilation('Türk');
        if (!result) {
            throw new Error('No result found');
        }
    });

    // Test 6: Proverbs
    await testDictionary('Proverbs Dictionary', async () => {
        const result = await searchProverbs('damlaya damlaya göl olur');
        if (!Array.isArray(result) || result.length === 0) {
            throw new Error('No proverbs found');
        }
        if (!result[0].proverb || !result[0].meaning) {
            throw new Error('Invalid proverb structure');
        }
    });

    // Test 7: Foreign Words
    await testDictionary('Foreign Words Guide', async () => {
        const result = await searchForeignWords('basketbol');
        if (!Array.isArray(result) || result.length === 0) {
            throw new Error('No results found');
        }
        if (!result[0].word || !result[0].equivalent) {
            throw new Error('Invalid foreign word structure');
        }
    });

    // Test 8: ETMS Etymology
    await testDictionary('ETMS Etymology Dictionary', async () => {
        const result = await searchEtymologyETMS('abajur');
        if (!result || !result.word) {
            throw new Error('Invalid result structure');
        }
    });

    // Test 9: Etymology
    await testDictionary('Etymology Dictionary', async () => {
        const result = await searchEtymology('abajur');
        if (!result || !result.word) {
            throw new Error('Invalid result structure');
        }
    });

    // Test 10: ⭐ NEW - Turkic Dialects
    await testDictionary('⭐ Turkic Dialects Dictionary', async () => {
        const result = await searchTurkicDialects('adam');
        if (!Array.isArray(result) || result.length === 0) {
            throw new Error('No dialect data found');
        }
        
        const first = result[0];
        if (!first.turkish || !first.dialects) {
            throw new Error('Invalid dialect structure');
        }
        
        // Verify dialect data structure
        if (!first.dialects.azerbaijani || !first.dialects.kazakh) {
            throw new Error('Missing dialect data');
        }
        
        // Verify matches example output from user
        if (first.turkish !== 'adam') {
            throw new Error('Turkish value mismatch');
        }
    });

    // Test 11: ⭐ NEW - International Metrology
    await testDictionary('⭐ International Metrology Dictionary', async () => {
        const result = await searchMetrology('büyüklük');
        if (!Array.isArray(result) || result.length === 0) {
            throw new Error('No metrology data found');
        }
        
        const first = result[0];
        if (!first.term || !first.definition) {
            throw new Error('Invalid metrology structure');
        }
        
        // Verify matches example
        if (first.term !== 'büyüklük') {
            throw new Error('Term value mismatch');
        }
    });

    // Test 12: Error Handling - Not Found
    await testDictionary('Error Handling (NotFoundError)', async () => {
        try {
            await searchCurrentTurkish('xyzqwertynonsenseword123456789');
            throw new Error('Should have thrown NotFoundError');
        } catch (error) {
            if (!(error instanceof NotFoundError)) {
                throw new Error('Expected NotFoundError, got: ' + error.constructor.name);
            }
        }
    });

    // Test 13: Error Handling - Empty String
    await testDictionary('Error Handling (ValidationError)', async () => {
        try {
            await searchCurrentTurkish('');
            throw new Error('Should have thrown ValidationError');
        } catch (error) {
            if (error.code !== 'VALIDATION_ERROR') {
                throw new Error('Expected ValidationError, got: ' + error.code);
            }
        }
    });

    // Print Summary
    console.log();
    console.log('='.repeat(70));
    console.log('TEST SUMMARY');
    console.log('='.repeat(70));
    console.log(`Total Tests: ${results.passed + results.failed}`);
    console.log(`✅ Passed: ${results.passed}`);
    console.log(`❌ Failed: ${results.failed}`);
    console.log();

    if (results.failed > 0) {
        console.log('Failed tests:');
        results.tests
            .filter(t => !t.success)
            .forEach(t => {
                console.log(`  - ${t.name}: ${t.error}`);
            });
        console.log();
    }

    const successRate = ((results.passed / (results.passed + results.failed)) * 100).toFixed(1);
    console.log(`Success Rate: ${successRate}%`);
    console.log('='.repeat(70));

    process.exit(results.failed > 0 ? 1 : 0);
}

// Run tests
runAllTests().catch(error => {
    console.error('Fatal error during testing:', error);
    process.exit(1);
});
