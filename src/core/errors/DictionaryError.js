/**
 * Base error class for all dictionary-related errors
 */
class DictionaryError extends Error {
    constructor(message, code = 'DICTIONARY_ERROR') {
        super(message);
        this.name = 'DictionaryError';
        this.code = code;
        this.timestamp = new Date().toISOString();
        Error.captureStackTrace(this, this.constructor);
    }
}

/**
 * Error thrown when network request fails
 */
class NetworkError extends DictionaryError {
    constructor(message, statusCode = null) {
        super(message, 'NETWORK_ERROR');
        this.name = 'NetworkError';
        this.statusCode = statusCode;
    }
}

/**
 * Error thrown when requested word/term is not found
 */
class NotFoundError extends DictionaryError {
    constructor(word, dictionaryType = 'unknown') {
        super(`Word "${word}" not found in ${dictionaryType} dictionary`, 'NOT_FOUND');
        this.name = 'NotFoundError';
        this.word = word;
        this.dictionaryType = dictionaryType;
    }
}

/**
 * Error thrown when input validation fails
 */
class ValidationError extends DictionaryError {
    constructor(message, field = null) {
        super(message, 'VALIDATION_ERROR');
        this.name = 'ValidationError';
        this.field = field;
    }
}

module.exports = {
    DictionaryError,
    NetworkError,
    NotFoundError,
    ValidationError
};
