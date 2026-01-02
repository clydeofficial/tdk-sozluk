// Type definitions for tdk-sozluk v4.0.0
// Project: https://github.com/clydeofficial/tdk-sozluk
// Definitions by: Clyde

declare module 'tdk-sozluk' {
    // ==========================================
    // CURRENT TURKISH DICTIONARY
    // ==========================================

    export interface Meaning {
        definition: string;
        properties: string[];
        examples: string[];
        pronunciation: string | null;
    }

    export interface CurrentTurkishResult {
        word: string;
        meanings: Meaning[];
        compounds?: string[];
        proverbs?: string[];
        audioUrl?: string | null;
        signLanguageGifs?: string[];
    }

    export interface SearchOptions {
        includeCompounds?: boolean;
        includeProverbs?: boolean;
        includeSignLanguage?: boolean;
        timeout?: number;
        retries?: number;
        debug?: boolean;
    }

    export function searchCurrentTurkish(
        word: string,
        options?: SearchOptions
    ): Promise<CurrentTurkishResult | null>;

    export function getPronunciationAudio(word: string): Promise<string | null>;

    // ==========================================
    // SPECIALIZED DICTIONARIES
    // ==========================================

    export function searchWesternOrigin(word: string, options?: SearchOptions): Promise<any>;
    export function searchScanning(word: string, options?: SearchOptions): Promise<any>;
    export function searchCompilation(word: string, options?: SearchOptions): Promise<any>;

    // ==========================================
    // PROVERBS & FOREIGN WORDS
    // ==========================================

    export interface ProverbResult {
        proverb: string;
        meaning: string;
        keywords: string[];
        type: string | null;
    }

    export interface ForeignWordResult {
        word: string;
        origin: string;
        equivalent: string | null;
        meaning: string | null;
    }

    export function searchProverbs(text: string, options?: SearchOptions): Promise<ProverbResult[]>;
    export function searchForeignWords(
        word: string,
        options?: SearchOptions
    ): Promise<ForeignWordResult[]>;

    // ==========================================
    // ETYMOLOGY
    // ==========================================

    export interface EtymologyETMSResult {
        word: string;
        meaning: string | null;
        etymology: string | null;
    }

    export interface EtymologyResult {
        word: string;
        meaning: string | null;
        etymology: string | null;
        structure: string | null;
        references: string | null;
    }

    export function searchEtymologyETMS(
        word: string,
        options?: SearchOptions
    ): Promise<EtymologyETMSResult>;

    export function searchEtymology(
        word: string,
        options?: SearchOptions
    ): Promise<EtymologyResult>;

    // ==========================================
    // NEW: COMPARATIVE & TECHNICAL (v4.0)
    // ==========================================

    export interface TurkicDialects {
        azerbaijani: string[];
        bashkir: string[];
        kazakh: string[];
        kyrgyz: string[];
        uzbek: string[];
        tatar: string[];
        turkmen: string[];
        uyghur: string[];
        russian: string[];
    }

    export interface TurkicDialectResult {
        dialectId: string | null;
        originalWord: string;
        turkish: string;
        dialects: TurkicDialects;
    }

    export function searchTurkicDialects(
        word: string,
        options?: SearchOptions
    ): Promise<TurkicDialectResult[]>;

    export interface MetrologyResult {
        termId: string | null;
        term: string;
        definition: string;
    }

    export function searchMetrology(
        term: string,
        options?: SearchOptions
    ): Promise<MetrologyResult[]>;

    // ==========================================
    // ERROR CLASSES
    // ==========================================

    export class DictionaryError extends Error {
        code: string;
        timestamp: string;
        constructor(message: string, code?: string);
    }

    export class NetworkError extends DictionaryError {
        statusCode: number | null;
        constructor(message: string, statusCode?: number | null);
    }

    export class NotFoundError extends DictionaryError {
        word: string;
        dictionaryType: string;
        constructor(word: string, dictionaryType?: string);
    }

    export class ValidationError extends DictionaryError {
        field: string | null;
        constructor(message: string, field?: string | null);
    }
}
