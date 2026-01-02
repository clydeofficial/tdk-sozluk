// TDK Sözlük - Comprehensive Turkish Language Dictionary Module v4.0.0
// Main entry point exporting all dictionary functions

// Current Turkish Dictionary
const { searchCurrentTurkish } = require('./src/dictionaries/CurrentTurkish');
const { getPronunciationAudio } = require('./src/dictionaries/Pronunciation');

// Specialized Historical Dictionaries
const { 
    searchWesternOrigin,
    searchScanning,
    searchCompilation
} = require('./src/dictionaries/SpecializedDictionaries');

// Proverbs and Foreign Words
const { 
    searchProverbs,
    searchForeignWords
} = require('./src/dictionaries/ProverbsIdioms');

// Etymology Dictionaries
const { 
    searchEtymologyETMS,
    searchEtymology
} = require('./src/dictionaries/EtymologyDictionaries');

// NEW: Comparative and Technical Dictionaries
const { searchTurkicDialects } = require('./src/dictionaries/TurkicDialects');
const { searchMetrology } = require('./src/dictionaries/InternationalMetrology');

// Error classes for advanced error handling
const {
    DictionaryError,
    NetworkError,
    NotFoundError,
    ValidationError
} = require('./src/core/errors/DictionaryError');

/**
 * TDK Sözlük Module
 * 
 * Comprehensive Node.js module for accessing Turkish Language Association (TDK) dictionaries
 * 
 * @module tdk-sozluk
 * @version 4.0.0
 * @author Clyde
 * @license CC BY-NC-SA 4.0
 */

module.exports = {
    // ==========================================
    // CURRENT TURKISH DICTIONARY
    // ==========================================
    
    /**
     * Search Current Turkish Dictionary (Güncel Türkçe Sözlük)
     * @function searchCurrentTurkish
     * @param {string} word - Word to search for
     * @param {Object} [options] - Search options
     * @returns {Promise<Object|null>} Dictionary entry with meanings, examples, compounds, etc.
     */
    searchCurrentTurkish,
    
    /**
     * Get pronunciation audio URL for a word
     * @function getPronunciationAudio
     * @param {string} word - Word to get pronunciation for
     * @returns {Promise<string|null>} Audio URL or null if not available
     */
    getPronunciationAudio,
    
    // ==========================================
    // SPECIALIZED DICTIONARIES
    // ==========================================
    
    /**
     * Search Western Origin Words Dictionary (Batı Kökenli Kelimeler)
     * @function searchWesternOrigin
     * @param {string} word - Word to search for
     * @returns {Promise<Object>} Dictionary entry
     */
    searchWesternOrigin,
    
    /**
     * Search Scanning Dictionary (Tarama Sözlüğü)
     * @function searchScanning
     * @param {string} word - Word to search for
     * @returns {Promise<Object>} Dictionary entry
     */
    searchScanning,
    
    /**
     * Search Compilation Dictionary (Derleme Sözlüğü)
     * @function searchCompilation
     * @param {string} word - Word to search for
     * @returns {Promise<Object>} Dictionary entry
     */
    searchCompilation,
    
    // ==========================================
    // PROVERBS & FOREIGN WORDS
    // ==========================================
    
    /**
     * Search Proverbs and Idioms (Atasözleri ve Deyimler)
     * @function searchProverbs
     * @param {string} text - Text to search for
     * @returns {Promise<Array>} Array of proverbs/idioms with meanings
     */
    searchProverbs,
    
    /**
     * Search Foreign Words Guide (Yabancı Sözlere Karşılıklar Kılavuzu)
     * @function searchForeignWords
     * @param {string} word - Foreign word to search for
     * @returns {Promise<Array>} Array of Turkish equivalents
     */
    searchForeignWords,
    
    // ==========================================
    // ETYMOLOGY
    // ==========================================
    
    /**
     * Search ETMS Etymology Dictionary (Eren Türk Dilinin Etimolojik Sözlüğü)
     * @function searchEtymologyETMS
     * @param {string} word - Word to search for
     * @returns {Promise<Object>} Etymology entry
     */
    searchEtymologyETMS,
    
    /**
     * Search Etymology Dictionary (Köken Bilgisi Sözlüğü)
     * @function searchEtymology
     * @param {string} word - Word to search for
     * @returns {Promise<Object>} Etymology entry with references
     */
    searchEtymology,
    
    // ==========================================
    // NEW: COMPARATIVE & TECHNICAL (v4.0)
    // ==========================================
    
    /**
     * Search Turkic Dialects Dictionary (Karşılaştırmalı Türk Lehçeleri Sözlüğü)
     * Compare word equivalents across Turkic languages
     * @function searchTurkicDialects
     * @param {string} word - Word to search for
     * @returns {Promise<Array>} Comparative dialect data
     * @since 4.0.0
     */
    searchTurkicDialects,
    
    /**
     * Search International Metrology Dictionary (Uluslararası Metroloji Sözlüğü)
     * Technical metrology and measurement science terms
     * @function searchMetrology
     * @param {string} term - Term to search for
     * @returns {Promise<Array>} Metrology term definitions
     * @since 4.0.0
     */
    searchMetrology,
    
    // ==========================================
    // ERROR CLASSES (for advanced users)
    // ==========================================
    
    /**
     * Base error class for all dictionary errors
     * @class DictionaryError
     */
    DictionaryError,
    
    /**
     * Network-related errors
     * @class NetworkError
     */
    NetworkError,
    
    /**
     * Word/term not found errors
     * @class NotFoundError
     */
    NotFoundError,
    
    /**
     * Input validation errors
     * @class ValidationError
     */
    ValidationError
};