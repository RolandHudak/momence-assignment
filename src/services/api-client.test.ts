import { describe, it, expect } from 'vitest';
import { parseConversionRatesCsv } from './api-client';

describe('parseConversionRates', () => {
    it('should parse CSV text into ConversionRate objects', () => {
        const csvText =
            '07 Mar 2025 #46\nCountry|Currency|Amount|Code|Rate\nAustralia|dollar|1|AUD|14.702';
        const rates = parseConversionRatesCsv(csvText);
        expect(rates).toEqual([
            {
                country: 'Australia',
                currency: 'dollar',
                amount: 1,
                code: 'AUD',
                rate: 14.702,
            },
        ]);
    });

    it('should throw an error if parsing fails', () => {
        const invalidCsvText = 'invalid,csv,text';
        expect(() => parseConversionRatesCsv(invalidCsvText)).toThrow();
    });
});
