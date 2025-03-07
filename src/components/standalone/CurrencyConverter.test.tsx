import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ConversionRate } from 'services/api-client';
import { renderWithProviders } from 'tests/test-utils';
import { CurrencyConverter } from './CurrencyConverter';

const mockRates: ConversionRate[] = [
    { country: 'USA', currency: 'dollar', amount: 1, code: 'USD', rate: 22.0 },
    {
        country: 'Eurozone',
        currency: 'euro',
        amount: 1,
        code: 'EUR',
        rate: 25.0,
    },
];

describe('CurrencyConverter', () => {
    it('renders input and select elements', () => {
        renderWithProviders(<CurrencyConverter rates={mockRates} />);
        expect(screen.getByTestId('amount')).toBeInTheDocument();
        expect(screen.getByTestId('currency')).toBeInTheDocument();
    });

    it('converts CZK to selected currency', () => {
        renderWithProviders(<CurrencyConverter rates={mockRates} />);

        fireEvent.change(screen.getByTestId('amount'), {
            target: { value: '100' },
        });
        fireEvent.change(screen.getByTestId('currency'), {
            target: { value: 'USD' },
        });

        expect(
            screen.getByText((_, element) => {
                return element?.textContent === '100 CZK is 4.55 USD';
            }),
        ).toBeInTheDocument();
    });

    it('shows a message when no value or currency is selected', () => {
        renderWithProviders(<CurrencyConverter rates={mockRates} />);
        expect(
            screen.getByText(
                'Please enter a CZK amount and select a target currency',
            ),
        ).toBeInTheDocument();
    });
});
