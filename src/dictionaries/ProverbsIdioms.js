const BaseDictionary = require('../core/BaseDictionary');
const { formatArray, stripSpecificTags } = require('../utils/formatter');

/**
 * Proverbs and Idioms Dictionary (Atasözleri ve Deyimler)
 */
class ProverbsDictionary extends BaseDictionary {
    constructor() {
        super('Proverbs and Idioms Dictionary', 'atasozu');
    }

    /**
     * Searches for proverbs and idioms
     * @param {string} text - Text to search for
     * @param {Object} options - Search options
     * @returns {Promise<Array>} Array of proverbs/idioms
     */
    async search(text, options = {}) {
        const data = await this.fetchData(text, options);
        this.validateResponse(data, text);

        return data.map(entry => ({
            proverb: entry.sozum || '',
            meaning: entry.anlami || '',
            keywords: formatArray(entry.anahtar),
            type: entry.turu2 || entry.turu || null
        }));
    }
}

/**
 * Foreign Words Guide Dictionary (Yabancı Sözlere Karşılıklar Kılavuzu)
 */
class ForeignWordsDictionary extends BaseDictionary {
    constructor() {
        super('Foreign Words Guide', 'kilavuz');
    }

    /**
     * Searches for foreign word equivalents
     * @param {string} word - Foreign word to search for
     * @param {Object} options - Search options
     * @returns {Promise<Array>} Array of Turkish equivalents
     */
    async search(word, options = {}) {
        const params = { prm: 'ysk', ...options.params };
        const data = await this.fetchData(word, { ...options, params });
        this.validateResponse(data, word);

        return data.map(entry => ({
            word: entry.kkelime || '',
            origin: entry.kkoken || '',
            equivalent: entry.kkarsilik ? stripSpecificTags(entry.kkarsilik, ['i']) : null,
            meaning: entry.anlam || null
        }));
    }
}

// Export singleton instances
const proverbsInstance = new ProverbsDictionary();
const foreignWordsInstance = new ForeignWordsDictionary();

/**
 * Search for proverbs and idioms
 * @param {string} text - Text to search for
 * @param {Object} options - Search options
 * @returns {Promise<Array>} Array of proverbs/idioms
 */
async function searchProverbs(text, options = {}) {
    return proverbsInstance.search(text, options);
}

/**
 * Search for foreign word equivalents
 * @param {string} word - Foreign word to search for
 * @param {Object} options - Search options
 * @returns {Promise<Array>} Array of Turkish equivalents
 */
async function searchForeignWords(word, options = {}) {
    return foreignWordsInstance.search(word, options);
}

module.exports = {
    ProverbsDictionary,
    ForeignWordsDictionary,
    searchProverbs,
    searchForeignWords
};
