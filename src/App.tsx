import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConversionToolFeature } from 'features/ConversionTool';

const queryClient = new QueryClient();

export const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <ConversionToolFeature />
        </QueryClientProvider>
    );
};
