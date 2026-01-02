const { fetchWithRetry } = require('../utils/request');
const { validateWord } = require('../utils/validator');
const { NotFoundError } = require('./errors/DictionaryError');

/**
 * Base class for all TDK dictionary implementations
 * Provides common functionality for fetching and validating data
 */
class BaseDictionary {
    /**
     * @param {string} dictionaryName - Name of the dictionary
     * @param {string} apiEndpoint - API endpoint path (e.g., 'gts', 'lehceler')
     */
    constructor(dictionaryName, apiEndpoint) {
        this.dictionaryName = dictionaryName;
        this.apiEndpoint = apiEndpoint;
        this.baseUrl = 'https://sozluk.gov.tr';
    }

    /**
     * Builds the full API URL for a search query
     * @param {string} query - Search query
     * @param {Object} params - Additional URL parameters
     * @returns {string} Complete API URL
     */
    buildUrl(query, params = {}) {
        const url = new URL(`${this.baseUrl}/${this.apiEndpoint}`);
        url.searchParams.set('ara', query);
        
        // Add any additional parameters
        Object.entries(params).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                url.searchParams.set(key, value);
            }
        });
        
        return url.toString();
    }

    /**
     * Fetches data from the API
     * @param {string} word - Word to search for
     * @param {Object} options - Fetch options
     * @returns {Promise<any>} API response data
     * @throws {ValidationError|NetworkError} If validation or network fails
     */
    async fetchData(word, options = {}) {
        const validatedWord = validateWord(word);
        const url = this.buildUrl(validatedWord, options.params || {});
        
        return fetchWithRetry(url, {
            timeout: options.timeout,
            retries: options.retries,
            debug: options.debug
        });
    }

    /**
     * Validates that response contains data
     * @param {any} data - Response data to validate
     * @param {string} word - The searched word
     * @throws {NotFoundError} If no data found
     * @returns {any} Validated data
     */
    validateResponse(data, word) {
        // Handle array responses
        if (Array.isArray(data)) {
            if (data.length === 0) {
                throw new NotFoundError(word, this.dictionaryName);
            }
            return data;
        }

        // Handle object responses
        if (!data || (typeof data === 'object' && Object.keys(data).length === 0)) {
            throw new NotFoundError(word, this.dictionaryName);
        }

        return data;
    }

    /**
     * Main search method - to be implemented by subclasses
     * @param {string} word - Word to search
     * @param {Object} options - Search options
     * @returns {Promise<any>} Formatted results
     */
    async search(word, options = {}) {
        throw new Error(`search() method must be implemented by ${this.constructor.name}`);
    }
}

module.exports = BaseDictionary;
