const axios = require('axios');
const { NetworkError } = require('../core/errors/DictionaryError');

// Configuration
const DEFAULT_TIMEOUT = 10000; // 10 seconds
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second base delay

/**
 * Delays execution for specified milliseconds
 * @param {number} ms - Milliseconds to delay
 * @returns {Promise} Promise that resolves after delay
 */
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Makes HTTP GET request with retry logic and error handling
 * @param {string} url - URL to fetch
 * @param {Object} options - Request options
 * @param {number} options.timeout - Request timeout in ms
 * @param {number} options.retries - Number of retries
 * @param {boolean} options.debug - Enable debug logging
 * @returns {Promise<any>} Response data
 * @throws {NetworkError} If request fails after all retries
 */
async function fetchWithRetry(url, options = {}) {
    const {
        timeout = DEFAULT_TIMEOUT,
        retries = MAX_RETRIES,
        debug = false
    } = options;

    let lastError = null;

    for (let attempt = 0; attempt <= retries; attempt++) {
        try {
            if (debug && attempt > 0) {
                console.log(`[TDK-Sözlük] Retry attempt ${attempt}/${retries} for ${url}`);
            }

            const response = await axios.get(url, {
                timeout,
                headers: {
                    'User-Agent': 'tdk-sozluk-npm-module/4.0.0',
                    'Accept': 'application/json'
                },
                validateStatus: (status) => status >= 200 && status < 500
            });

            // Handle HTTP errors
            if (response.status >= 400) {
                throw new NetworkError(
                    `HTTP ${response.status}: ${response.statusText}`,
                    response.status
                );
            }

            if (debug) {
                console.log(`[TDK-Sözlük] Success: ${url}`);
            }

            return response.data;

        } catch (error) {
            lastError = error;

            // Don't retry on validation errors or 404s
            if (error.response?.status === 404 || error.code === 'VALIDATION_ERROR') {
                throw error;
            }

            // Don't retry if it's the last attempt
            if (attempt < retries) {
                // Exponential backoff
                const delayMs = RETRY_DELAY * Math.pow(2, attempt);
                if (debug) {
                    console.log(`[TDK-Sözlük] Retrying in ${delayMs}ms...`);
                }
                await delay(delayMs);
            }
        }
    }

    // All retries failed
    if (lastError instanceof NetworkError) {
        throw lastError;
    }

    if (lastError.code === 'ECONNABORTED') {
        throw new NetworkError(
            `Request timeout after ${timeout}ms: ${url}`,
            null
        );
    }

    if (lastError.code === 'ENOTFOUND' || lastError.code === 'ECONNREFUSED') {
        throw new NetworkError(
            `Cannot connect to TDK servers: ${lastError.message}`,
            null
        );
    }

    throw new NetworkError(
        `Network request failed: ${lastError.message}`,
        lastError.response?.status || null
    );
}

/**
 * Simple fetch function (backward compatible)
 * @param {string} url - URL to fetch
 * @returns {Promise<any>} Response data
 */
async function fetch(url) {
    return fetchWithRetry(url);
}

module.exports = { 
    fetch,
    fetchWithRetry 
};