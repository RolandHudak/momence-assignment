import { screen, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import { renderWithProviders } from 'tests/test-utils';
import { ConversionToolFeature } from './ConversionTool';

const server = setupServer(
    http.get(import.meta.env.VITE_API_URL, () =>
        HttpResponse.text(
            '07 Mar 2025 #46\nCountry|Currency|Amount|Code|Rate\nAustralia|dollar|1|AUD|14',
        ),
    ),
);

describe('ConversionToolFeature', () => {
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    it('shows a loading indicator while fetching data', async () => {
        renderWithProviders(<ConversionToolFeature />);
        expect(screen.getByTestId('loading')).toBeInTheDocument();
    });

    it('fetches and displays currency exchange rates', async () => {
        renderWithProviders(<ConversionToolFeature />);

        await waitFor(
            () => {
                expect(screen.getByTestId('amount')).toBeInTheDocument();
            },
            { timeout: 3000 },
        );

        expect(screen.getByText('Australia')).toBeInTheDocument();
        expect(screen.getByText('dollar')).toBeInTheDocument();
        expect(screen.getByText('14')).toBeInTheDocument();
    });

    it('handles API errors gracefully', async () => {
        server.use(
            http.get(
                import.meta.env.VITE_API_URL,
                () => new HttpResponse(null, { status: 500 }),
            ),
        );

        renderWithProviders(<ConversionToolFeature />);

        await waitFor(() => {
            expect(screen.getByTestId('error')).toBeInTheDocument();
        });
    });
});
