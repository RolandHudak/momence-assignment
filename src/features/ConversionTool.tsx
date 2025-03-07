import { useQuery } from '@tanstack/react-query';
import { fetchConversionRates } from 'services/api-client';

export const ConversionToolFeature = () => {
    const { data } = useQuery({
        queryKey: ['conversion-rates'],
        queryFn: fetchConversionRates,
    });

    return (
        <>
            <h1>Currency Exchange App</h1>
            <pre>{JSON.stringify(data, null, 4)}</pre>
        </>
    );
};
