import styled from 'styled-components';

const StyledMain = styled.main`
    margin: 0 auto;
    max-width: ${(props) => props.theme.breakpoints.md};
    padding: 1rem;
    margin-bottom: 4rem;
`;

interface Props {
    children: React.ReactNode;
}

export const Layout = (props: Props) => {
    return <StyledMain>{props.children}</StyledMain>;
};
