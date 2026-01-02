const BaseDictionary = require('../core/BaseDictionary');

/**
 * Pronunciation Dictionary (Yazım ve Telaffuz)
 * Provides audio pronunciation for Turkish words
 */
class PronunciationDictionary extends BaseDictionary {
    constructor() {
        super('Pronunciation Dictionary', 'yazim');
    }

    /**
     * Gets pronunciation audio URL for a word
     * @param {string} word - Word to get pronunciation for
     * @param {Object} options - Search options
     * @returns {Promise<string|null>} Audio URL or null if not found
     */
    async search(word, options = {}) {
        try {
            const data = await this.fetchData(word, options);
            
            if (!data || !Array.isArray(data) || data.length === 0 || !data[0].seskod) {
                return null;
            }

            return `https://sozluk.gov.tr/ses/${data[0].seskod}.wav`;
        } catch (error) {
            // If not found, return null instead of throwing
            if (error.name === 'NotFoundError') {
                return null;
            }
            throw error;
        }
    }
}

// Export singleton instance
const instance = new PronunciationDictionary();

/**
 * Get pronunciation audio URL for a word
 * @param {string} word - Word to get pronunciation for
 * @returns {Promise<string|null>} Audio URL or null
 */
async function getPronunciationAudio(word) {
    return instance.search(word);
}

module.exports = {
    PronunciationDictionary,
    getPronunciationAudio
};
