import styled from 'styled-components';

interface Props<T> {
    testid?: string;
    placeholder?: string;
    options: { label: React.ReactNode; value: T }[];
    value?: T;
    onChange: (value: T) => void;
}

const StyledSelect = styled.select`
    width: 100%;
    background: ${(props) => props.theme.colors.white};
    padding: ${(props) => props.theme.inputs.padding};
    border: 1px solid ${(props) => props.theme.colors.border};
    border-radius: ${(props) => props.theme.inputs.radius};
    font-size: 1rem;
    font-family: inherit;
`;

export const Select = <T extends Readonly<string> | undefined>(
    props: Props<T>,
) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        props.onChange(e.target.value as T);
    };

    return (
        <StyledSelect
            value={props.value || ''}
            onChange={handleChange}
            data-testid={props.testid}
        >
            <option value="" disabled>
                {props.placeholder}
            </option>
            {props.options.map((o) => (
                <option key={o.value} value={o.value}>
                    {o.label}
                </option>
            ))}
        </StyledSelect>
    );
};
