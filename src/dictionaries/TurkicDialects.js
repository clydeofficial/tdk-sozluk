const BaseDictionary = require('../core/BaseDictionary');
const { filterEmptyValues } = require('../utils/formatter');

/**
 * Turkic Dialects Dictionary (Karşılaştırmalı Türk Lehçeleri Sözlüğü)
 * Comparative dictionary showing word equivalents across Turkic languages/dialects
 * 
 * Supported dialects:
 * - Azerbaijani (Azerbaycan Türkçesi)
 * - Bashkir (Başkurt Türkçesi)
 * - Kazakh (Kazak Türkçesi)
 * - Kyrgyz (Kırgız Türkçesi)
 * - Uzbek (Özbek Türkçesi)
 * - Tatar (Tatar Türkçesi)
 * - Turkish (Türkiye Türkçesi)
 * - Turkmen (Türkmen Türkçesi)
 * - Uyghur (Uygur Türkçesi)
 * - Russian (Rusça - for reference)
 */
class TurkicDialectsDictionary extends BaseDictionary {
    constructor() {
        super('Turkic Dialects Dictionary', 'lehceler');
    }

    /**
     * Searches the comparative Turkic dialects dictionary
     * @param {string} word - Word to search for
     * @param {Object} options - Search options
     * @returns {Promise<Array>} Array of dialect entries with comparative data
     */
    async search(word, options = {}) {
        const data = await this.fetchData(word, options);
        this.validateResponse(data, word);

        return data.map(entry => this.formatDialectEntry(entry));
    }

    /**
     * Formats a single dialect entry
     * @private
     * @param {Object} entry - Raw API entry
     * @returns {Object} Formatted dialect entry
     */
    formatDialectEntry(entry) {
        return {
            dialectId: entry.lehce_id || null,
            originalWord: entry.asil || '',
            turkish: entry.turkce || '',
            dialects: {
                azerbaijani: this.collectDialectVariants(entry, 'azerice'),
                bashkir: this.collectDialectVariants(entry, 'baskurtca'),
                kazakh: this.collectDialectVariants(entry, 'kazakca'),
                kyrgyz: this.collectDialectVariants(entry, 'kirgizca'),
                uzbek: this.collectDialectVariants(entry, 'ozbekce'),
                tatar: this.collectDialectVariants(entry, 'tatarca'),
                turkmen: this.collectDialectVariants(entry, 'turkmence'),
                uyghur: this.collectDialectVariants(entry, 'uygurca'),
                russian: this.collectDialectVariants(entry, 'rusca')
            }
        };
    }

    /**
     * Collects all variants for a specific dialect
     * @private
     * @param {Object} entry - Raw API entry
     * @param {string} dialectPrefix - Dialect field prefix (e.g., 'azerice')
     * @returns {Array<string>} Array of dialect variants (filtered for nulls/empties)
     */
    collectDialectVariants(entry, dialectPrefix) {
        const variants = [];
        
        // API provides up to 4 variants per dialect (e.g., azerice1, azerice2, etc.)
        for (let i = 1; i <= 4; i++) {
            const key = `${dialectPrefix}${i}`;
            const value = entry[key];
            
            if (value !== null && value !== undefined && value !== '') {
                variants.push(value);
            }
        }
        
        return filterEmptyValues(variants);
    }
}

// Export singleton instance
const instance = new TurkicDialectsDictionary();

/**
 * Search for word equivalents across Turkic dialects
 * @param {string} word - Word to search for
 * @param {Object} options - Search options
 * @returns {Promise<Array>} Array of dialect entries showing comparative data
 * 
 * @example
 * const dialects = await searchTurkicDialects('adam');
 * console.log(dialects[0].dialects.azerbaijani); // ['adam']
 * console.log(dialects[0].dialects.kazakh); // ['adam', 'kisi']
 */
async function searchTurkicDialects(word, options = {}) {
    return instance.search(word, options);
}

module.exports = {
    TurkicDialectsDictionary,
    searchTurkicDialects
};
