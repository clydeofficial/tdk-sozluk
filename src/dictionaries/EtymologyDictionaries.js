const BaseDictionary = require('../core/BaseDictionary');
const { stripHtmlTags, cleanHtmlContent } = require('../utils/formatter');

/**
 * ETMS Etymology Dictionary (Eren Türk Dilinin Etimolojik Sözlüğü)
 */
class ETMSDictionary extends BaseDictionary {
    constructor() {
        super('ETMS Etymology Dictionary', 'etms');
    }

    /**
     * Searches the ETMS etymology dictionary
     * @param {string} word - Word to search for
     * @param {Object} options - Search options
     * @returns {Promise<Object>} Etymology entry
     */
    async search(word, options = {}) {
        const data = await this.fetchData(word, options);
        this.validateResponse(data, word);

        const entry = data[0];
        return {
            word: entry.madde || entry.kelime || '',
            meaning: entry.anlam ? stripHtmlTags(entry.anlam) : null,
            etymology: entry.etimoloji ? stripHtmlTags(entry.etimoloji) : null
        };
    }
}

/**
 * Etymology Dictionary (Köken Bilgisi Sözlüğü)
 */
class EtymologyDictionary extends BaseDictionary {
    constructor() {
        super('Etymology Dictionary', 'etimoloji');
    }

    /**
     * Searches the etymology dictionary
     * @param {string} word - Word to search for
     * @param {Object} options - Search options
     * @returns {Promise<Object>} Etymology entry
     */
    async search(word, options = {}) {
        const data = await this.fetchData(word, options);
        this.validateResponse(data, word);

        const entry = data[0];
        return {
            word: entry.word || entry.madde || '',
            meaning: entry.meaning || null,
            etymology: entry.etimology ? stripHtmlTags(entry.etimology) : null,
            structure: entry.structure || null,
            references: entry.referances ? stripHtmlTags(entry.referances) : null
        };
    }
}

// Export singleton instances
const etmsInstance = new ETMSDictionary();
const etymologyInstance = new EtymologyDictionary();

/**
 * Search ETMS etymology dictionary
 */
async function searchEtymologyETMS(word, options = {}) {
    return etmsInstance.search(word, options);
}

/**
 * Search etymology dictionary
 */
async function searchEtymology(word, options = {}) {
    return etymologyInstance.search(word, options);
}

module.exports = {
    ETMSDictionary,
    EtymologyDictionary,
    searchEtymologyETMS,
    searchEtymology
};
