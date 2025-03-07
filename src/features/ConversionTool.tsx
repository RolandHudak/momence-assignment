import { useQuery } from '@tanstack/react-query';
import { ConversionRate, fetchConversionRates } from 'services/api-client';
import { Table, TableColumn } from 'components/Table';
import { CurrencyConverter } from 'components/CurrencyConverter';

export const ConversionToolFeature = () => {
    const { data } = useQuery({
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
            {data && (
                <>
                    <CurrencyConverter rates={data} />
                    <Table data={data} columns={columns} />
                </>
            )}
        </>
    );
};
