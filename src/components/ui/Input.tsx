import { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
    font-family: inherit;
    padding: ${(props) => props.theme.inputs.padding};
    border: 1px solid ${(props) => props.theme.colors.border};
    border-radius: ${(props) => props.theme.inputs.radius};
    font-size: 1rem;
`;

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    $testid?: string;
}

export const Input = (props: Props) => {
    return <StyledInput {...props} data-testid={props.$testid} />;
};
