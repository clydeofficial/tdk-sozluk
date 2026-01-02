const { ValidationError } = require('../core/errors/DictionaryError');

/**
 * Validates word/term input
 * @param {string} word - The word or term to validate
 * @param {string} fieldName - Name of the field for error messages
 * @throws {ValidationError} If validation fails
 * @returns {string} Trimmed and validated word
 */
function validateWord(word, fieldName = 'word') {
    if (typeof word !== 'string') {
        throw new ValidationError(`${fieldName} must be a string`, fieldName);
    }

    const trimmed = word.trim();

    if (trimmed.length === 0) {
        throw new ValidationError(`${fieldName} cannot be empty`, fieldName);
    }

    if (trimmed.length > 200) {
        throw new ValidationError(`${fieldName} is too long (maximum 200 characters)`, fieldName);
    }

    return trimmed;
}

/**
 * Sanitizes user input by removing potentially dangerous characters
 * @param {string} input - Input to sanitize
 * @returns {string} Sanitized input
 */
function sanitizeInput(input) {
    if (typeof input !== 'string') {
        return '';
    }
    
    // Remove any null bytes and control characters
    return input.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '').trim();
}

/**
 * Validates options object
 * @param {Object} options - Options to validate
 * @param {Array<string>} allowedKeys - Array of allowed option keys
 * @throws {ValidationError} If invalid options are provided
 */
function validateOptions(options, allowedKeys) {
    if (!options || typeof options !== 'object') {
        return;
    }

    const invalidKeys = Object.keys(options).filter(key => !allowedKeys.includes(key));
    
    if (invalidKeys.length > 0) {
        throw new ValidationError(
            `Invalid options: ${invalidKeys.join(', ')}. Allowed: ${allowedKeys.join(', ')}`,
            'options'
        );
    }
}

module.exports = {
    validateWord,
    sanitizeInput,
    validateOptions
};
