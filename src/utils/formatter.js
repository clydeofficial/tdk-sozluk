/**
 * Removes HTML tags from string
 * @param {string} str - String with HTML tags
 * @returns {string} Clean string without HTML tags
 */
function stripHtmlTags(str) {
    if (!str || typeof str !== 'string') {
        return '';
    }
    return str.replace(/<\/?[^>]+(>|$)/g, '');
}

/**
 * Removes only specific HTML tags (like <i>, </i>)
 * @param {string} str - String with HTML tags
 * @param {Array<string>} tags - Array of tag names to remove (e.g., ['i', 'b'])
 * @returns {string} String with specified tags removed
 */
function stripSpecificTags(str, tags = ['i', 'b']) {
    if (!str || typeof str !== 'string') {
        return '';
    }
    
    let result = str;
    tags.forEach(tag => {
        const regex = new RegExp(`<\/?${tag}>`, 'gi');
        result = result.replace(regex, '');
    });
    
    return result;
}

/**
 * Normalizes whitespace in a string
 * @param {string} str - String to normalize
 * @returns {string} String with normalized whitespace
 */
function normalizeWhitespace(str) {
    if (!str || typeof str !== 'string') {
        return '';
    }
    return str.replace(/\s+/g, ' ').trim();
}

/**
 * Filters out null/undefined/empty values from array
 * @param {Array} arr - Array to filter
 * @returns {Array} Filtered array
 */
function filterEmptyValues(arr) {
    if (!Array.isArray(arr)) {
        return [];
    }
    return arr.filter(item => item !== null && item !== undefined && item !== '');
}

/**
 * Safely gets nested property from object
 * @param {Object} obj - Object to get property from
 * @param {string} path - Dot-separated path (e.g., 'user.name')
 * @param {*} defaultValue - Default value if property doesn't exist
 * @returns {*} Property value or default
 */
function getNestedProperty(obj, path, defaultValue = null) {
    if (!obj || typeof obj !== 'object') {
        return defaultValue;
    }
    
    return path.split('.').reduce((current, prop) => {
        return current?.[prop] ?? defaultValue;
    }, obj);
}

/**
 * Formats array by splitting comma-separated string and trimming
 * @param {string|Array} value - Value to format
 * @returns {Array<string>} Formatted array
 */
function formatArray(value) {
    if (Array.isArray(value)) {
        return filterEmptyValues(value.map(v => String(v).trim()));
    }
    
    if (typeof value === 'string' && value.length > 0) {
        return value.split(',').map(v => v.trim()).filter(v => v.length > 0);
    }
    
    return [];
}

/**
 * Cleans complex HTML content while preserving structure
 * @param {string} html - HTML content to clean
 * @returns {string} Cleaned text with preserved formatting
 */
function cleanHtmlContent(html) {
    if (!html || typeof html !== 'string') {
        return '';
    }
    
    let cleaned = html;
    
    // Replace <br>, <p> with newlines
    cleaned = cleaned.replace(/<br\s*\/?>/gi, '\n');
    cleaned = cleaned.replace(/<\/p>/gi, '\n');
    cleaned = cleaned.replace(/<p[^>]*>/gi, '');
    
    // Remove all other HTML tags
    cleaned = stripHtmlTags(cleaned);
    
    // Normalize whitespace but preserve newlines
    cleaned = cleaned.split('\n').map(line => normalizeWhitespace(line)).join('\n');
    
    // Remove excessive newlines
    cleaned = cleaned.replace(/\n{3,}/g, '\n\n');
    
    return cleaned.trim();
}

module.exports = {
    stripHtmlTags,
    stripSpecificTags,
    normalizeWhitespace,
    filterEmptyValues,
    getNestedProperty,
    formatArray,
    cleanHtmlContent
};
