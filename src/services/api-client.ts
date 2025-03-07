import * as papa from 'papaparse';

export interface ConversionRate {
    country: string;
    currency: string;
    amount: number;
    code: string;
    rate: number;
}

export async function fetchConversionRates() {
    const resp = await fetch(import.meta.env.VITE_API_URL);
    const text = await resp.text();
    return parseConversionRatesCsv(text);
}

export function parseConversionRatesCsv(text: string): ConversionRate[] {
    const lines = text.split('\n');
    lines.shift();
    const withoutFirstLine = lines.join('\n');

    const result = papa.parse<ConversionRate>(withoutFirstLine, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true,
        transformHeader: (header) => header.toLowerCase(),
    });

    if (result.errors.length) {
        throw new Error(result.errors[0].message);
    }

    return result.data;
}
