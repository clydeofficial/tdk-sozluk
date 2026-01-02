const BaseDictionary = require('../core/BaseDictionary');
const { getNestedProperty, formatArray, filterEmptyValues } = require('../utils/formatter');

/**
 * Current Turkish Dictionary (Güncel Türkçe Sözlük)
 * Official comprehensive Turkish dictionary
 */
class CurrentTurkishDictionary extends BaseDictionary {
    constructor() {
        super('Current Turkish Dictionary', 'gts');
    }

    /**
     * Searches for a word in the Current Turkish Dictionary
     * @param {string} word - Word to search for
     * @param {Object} options - Search options
     * @param {boolean} options.includeCompounds - Include compound words (default: true)
     * @param {boolean} options.includeProverbs - Include proverbs (default: true)
     * @param {boolean} options.includeSignLanguage - Include sign language GIFs (default: true)
     * @returns {Promise<Object|null>} Formatted dictionary entry
     */
    async search(word, options = {}) {
        const {
            includeCompounds = true,
            includeProverbs = true,
            includeSignLanguage = true
        } = options;

        const data = await this.fetchData(word, options);
        this.validateResponse(data, word);

        const entry = data[0];
        
        // Get pronunciation audio
        let audioUrl = null;
        if (entry.telaffuz || entry.madde) {
            try {
                const { getPronunciationAudio } = require('./Pronunciation');
                audioUrl = await getPronunciationAudio(entry.madde || word);
            } catch (err) {
                // Audio not available, continue without it
                audioUrl = null;
            }
        }

        const result = {
            word: entry.madde,
            meanings: this.formatMeanings(entry.anlamlarListe || []),
        };

        if (includeCompounds && entry.birlesikler) {
            result.compounds = formatArray(entry.birlesikler);
        }

        if (includeProverbs && entry.atasozu) {
            result.proverbs = entry.atasozu.map(a => a.madde);
        }

        if (audioUrl) {
            result.audioUrl = audioUrl;
        }

        if (includeSignLanguage) {
            result.signLanguageGifs = this.generateSignLanguageGifs(entry.madde);
        }

        return result;
    }

    /**
     * Formats meanings array from API response
     * @private
     */
    formatMeanings(meaningsList) {
        return meaningsList.map(anlam => ({
            definition: anlam.anlam || '',
            properties: getNestedProperty(anlam, 'ozelliklerListe', [])
                .map(o => o.tam_adi || o.kisa_adi)
                .filter(p => p),
            examples: getNestedProperty(anlam, 'orneklerListe', [])
                .map(o => o.ornek)
                .filter(e => e),
            pronunciation: anlam.telaffuz || null
        }));
    }

    /**
     * Generates sign language GIF URLs for each letter
     * @private
     */
    generateSignLanguageGifs(word) {
        if (!word) return [];
        
        return word
            .toLowerCase()
            .replace(/[^a-zçğıöşü]/g, '')
            .split('')
            .map(letter => `https://sozluk.gov.tr/assets/img/isaret/${letter}.gif`);
    }
}

// Export singleton instance
const instance = new CurrentTurkishDictionary();

/**
 * Search for a word in the Current Turkish Dictionary
 * @param {string} word - Word to search for
 * @param {Object} options - Search options
 * @returns {Promise<Object|null>} Dictionary entry
 */
async function searchCurrentTurkish(word, options = {}) {
    return instance.search(word, options);
}

module.exports = {
    CurrentTurkishDictionary,
    searchCurrentTurkish
};
