import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'styled-components';
import { ConversionToolFeature } from 'features/ConversionTool';
import { theme } from 'styles/theme';
import { GlobalStyle } from 'styles/global';
import { Layout } from 'components/Layout';

const queryClient = new QueryClient();

export const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <GlobalStyle />
                <Layout>
                    <ConversionToolFeature />
                </Layout>
            </ThemeProvider>
        </QueryClientProvider>
    );
};
