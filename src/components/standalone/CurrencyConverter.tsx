import { ChangeEvent, useMemo, useState } from 'react';
import styled from 'styled-components';

import { Select } from 'components/ui/Select';
import { ConversionRate } from 'services/api-client';
import { Input } from 'components/ui/Input';

const InputGroup = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;

    @media (max-width: ${(props) => props.theme.breakpoints.md}) {
        grid-template-columns: 1fr;
    }
`;

interface Props {
    rates: ConversionRate[];
}

export const CurrencyConverter = (props: Props) => {
    const [selectedCurrency, setSelectedCurrency] = useState<string>();
    const [inputValue, setInputValue] = useState<string>('');

    const selectedRate = useMemo<ConversionRate | undefined>(
        () => props.rates?.find((e) => e.code === selectedCurrency),
        [props.rates, selectedCurrency],
    );

    const convertedValue = useMemo<string>(() => {
        const numberValue = Number(inputValue);
        if (!selectedRate?.rate || !inputValue || isNaN(numberValue)) {
            return '0';
        }
        const convertedAmount =
            (numberValue / selectedRate.rate) * selectedRate.amount;
        return convertedAmount.toFixed(2);
    }, [selectedRate, inputValue]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const numberValue = Number(e.currentTarget.value);
        if (isNaN(numberValue) || numberValue < 0) {
            return;
        }
        setInputValue(e.currentTarget.value);
    };

    return (
        <>
            <InputGroup>
                <Input
                    type="number"
                    value={inputValue}
                    inputMode="decimal"
                    placeholder='Enter an amount in "CZK"'
                    onChange={handleInputChange}
                    $testid="amount"
                />
                <Select
                    value={selectedCurrency}
                    onChange={setSelectedCurrency}
                    placeholder="Select a currency"
                    options={props.rates.map((e) => ({
                        label: e.code,
                        value: e.code,
                    }))}
                    $testid="currency"
                />
            </InputGroup>
            {selectedRate && inputValue ? (
                <p data-testid="result">
                    {inputValue} <i>CZK</i> is{' '}
                    <strong>{`${convertedValue} ${selectedRate.code}`}</strong>
                </p>
            ) : (
                <p data-testid="result">
                    Please enter a CZK amount and select a target currency
                </p>
            )}
        </>
    );
};
