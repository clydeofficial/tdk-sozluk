const BaseDictionary = require('../core/BaseDictionary');

/**
 * Western Origin Words Dictionary (Batı Kökenli Kelimeler)
 */
class WesternOriginDictionary extends BaseDictionary {
    constructor() {
        super('Western Origin Dictionary', 'bati');
    }

    /**
     * Searches for Western origin words
     * @param {string} word - Word to search for
     * @param {Object} options - Search options
     * @returns {Promise<Object>} Dictionary entry
     */
    async search(word, options = {}) {
        const data = await this.fetchData(word, options);
        this.validateResponse(data, word);
        return data[0];
    }
}

/**
 * Scanning Dictionary (Tarama Sözlüğü)
 */
class ScanningDictionary extends BaseDictionary {
    constructor() {
        super('Scanning Dictionary', 'tarama');
    }

    /**
     * Searches the scanning dictionary
     * @param {string} word - Word to search for
     * @param {Object} options - Search options
     * @returns {Promise<Object>} Dictionary entry
     */
    async search(word, options = {}) {
        const data = await this.fetchData(word, options);
        this.validateResponse(data, word);
        return data[0];
    }
}

/**
 * Compilation Dictionary (Derleme Sözlüğü)
 */
class CompilationDictionary extends BaseDictionary {
    constructor() {
        super('Compilation Dictionary', 'derleme');
    }

    /**
     * Searches the compilation dictionary
     * @param {string} word - Word to search for
     * @param {Object} options - Search options
     * @returns {Promise<Object>} Dictionary entry
     */
    async search(word, options = {}) {
        const data = await this.fetchData(word, options);
        this.validateResponse(data, word);
        return data[0];
    }
}

// Export singleton instances
const westernOriginInstance = new WesternOriginDictionary();
const scanningInstance = new ScanningDictionary();
const compilationInstance = new CompilationDictionary();

/**
 * Search for Western origin words
 */
async function searchWesternOrigin(word, options = {}) {
    return westernOriginInstance.search(word, options);
}

/**
 * Search the scanning dictionary
 */
async function searchScanning(word, options = {}) {
    return scanningInstance.search(word, options);
}

/**
 * Search the compilation dictionary
 */
async function searchCompilation(word, options = {}) {
    return compilationInstance.search(word, options);
}

module.exports = {
    WesternOriginDictionary,
    ScanningDictionary,
    CompilationDictionary,
    searchWesternOrigin,
    searchScanning,
    searchCompilation
};
