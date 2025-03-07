import { useQuery } from '@tanstack/react-query';
import { CurrencyConverter } from 'components/standalone/CurrencyConverter';
import { Table, TableColumn } from 'components/ui/Table';
import { ConversionRate, fetchConversionRates } from 'services/api-client';

export const ConversionToolFeature = () => {
    const {
        data: rates,
        isLoading,
        error,
    } = useQuery({
        queryKey: ['conversion-rates'],
        queryFn: fetchConversionRates,
    });

    const columns: TableColumn<ConversionRate>[] = [
        { dataIndex: 'country', title: 'Country' },
        { dataIndex: 'currency', title: 'Currency' },
        { dataIndex: 'amount', title: 'Amount' },
        { dataIndex: 'code', title: 'Code' },
        { dataIndex: 'rate', title: 'Rate' },
    ];

    return (
        <>
            <h1>Currency Exchange App</h1>
            {rates && (
                <>
                    <CurrencyConverter rates={rates} />
                    <Table columns={columns} data={rates} />
                </>
            )}
            {isLoading && <p data-testid="loading">Loading...</p>}
            {error && <p data-testid="error">Error: {error.message}</p>}
        </>
    );
};
