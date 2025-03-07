import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';

import { theme } from 'styles/theme';

const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
});

export const renderWithProviders = (ui: React.ReactElement) => {
    return render(
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>{ui}</ThemeProvider>
        </QueryClientProvider>,
    );
};
