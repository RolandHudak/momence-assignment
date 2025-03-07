import styled from 'styled-components';

interface Props<T> {
    $testid?: string;
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
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    background-image: url('data:image/svg+xml;utf8,<svg fill="%23aaa" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/></svg>');
    background-repeat: no-repeat;
    background-position: right 0.75rem center;
    background-size: 1rem;
    color: ${(props) => props.theme.colors.black};
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
            data-testid={props.$testid}
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
