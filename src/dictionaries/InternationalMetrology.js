const BaseDictionary = require('../core/BaseDictionary');
const { cleanHtmlContent } = require('../utils/formatter');

/**
 * International Metrology Dictionary (Uluslararası Metroloji Sözlüğü)
 * Technical dictionary for metrology and measurement science terms
 * 
 * Contains standardized definitions for:
 * - Measurement units and quantities
 * - Metrology terminology
 * - Scientific measurement concepts
 * - International standards references
 */
class InternationalMetrologyDictionary extends BaseDictionary {
    constructor() {
        super('International Metrology Dictionary', 'metroloji');
    }

    /**
     * Searches the international metrology dictionary
     * @param {string} term - Term to search for
     * @param {Object} options - Search options
     * @returns {Promise<Array>} Array of metrology term entries
     */
    async search(term, options = {}) {
        const data = await this.fetchData(term, options);
        this.validateResponse(data, term);

        return data.map(entry => this.formatMetrologyEntry(entry));
    }

    /**
     * Formats a single metrology entry
     * @private
     * @param {Object} entry - Raw API entry
     * @returns {Object} Formatted metrology entry
     */
    formatMetrologyEntry(entry) {
        return {
            termId: entry.soz_id || entry.id || null,
            term: entry.terim || entry.term || '',
            definition: entry.tanim ? this.formatDefinition(entry.tanim) : ''
        };
    }

    /**
     * Formats the definition by cleaning HTML while preserving structure
     * @private
     * @param {string} definition - Raw HTML definition
     * @returns {string} Cleaned definition text
     */
    formatDefinition(definition) {
        if (!definition) return '';
        
        // The API returns HTML with formatting, notes, examples, etc.
        // We clean it while preserving important structure
        let cleaned = cleanHtmlContent(definition);
        
        // Additional metrology-specific cleaning
        // Remove excessive whitespace around special markers
        cleaned = cleaned.replace(/\s*NOT\s+(\d+):/g, '\n\nNOT $1:');
        cleaned = cleaned.replace(/\s*ÖRNEK:/g, '\n\nÖRNEK:');
        
        return cleaned.trim();
    }
}

// Export singleton instance
const instance = new InternationalMetrologyDictionary();

/**
 * Search for metrology terms
 * @param {string} term - Metrology term to search for
 * @param {Object} options - Search options
 * @returns {Promise<Array>} Array of metrology term definitions
 * 
 * @example
 * const result = await searchMetrology('büyüklük');
 * console.log(result[0].term); // 'büyüklük'
 * console.log(result[0].definition); // Detailed definition with notes
 */
async function searchMetrology(term, options = {}) {
    return instance.search(term, options);
}

module.exports = {
    InternationalMetrologyDictionary,
    searchMetrology
};
