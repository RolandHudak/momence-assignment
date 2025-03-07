import styled from 'styled-components';

export interface TableColumn<T> {
    dataIndex: keyof T;
    title: string;
}

interface TableProps<T> {
    data: T[];
    columns: TableColumn<T>[];
}

const TableContainer = styled.div`
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
`;

const StyledTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    border: 1px solid ${(props) => props.theme.colors.gray};
    font-size: 1rem;

    thead tr {
        background-color: ${(props) => props.theme.colors.black};
        color: ${(props) => props.theme.colors.white};
        text-align: left;
    }

    th,
    td {
        padding: 0.6rem 0.8rem;
    }

    tbody tr {
        border-bottom: 1px solid ${(props) => props.theme.colors.gray};
    }

    tbody tr:nth-of-type(even) {
        background-color: ${(props) => props.theme.colors.lightGray};
    }
`;

export const Table = <T extends object>(props: TableProps<T>) => {
    return (
        <TableContainer>
            <StyledTable>
                <thead>
                    <tr>
                        {props.columns.map((column) => (
                            <th key={String(column.dataIndex)}>
                                {column.title}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {props.data.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {props.columns.map((column) => (
                                <td key={String(column.dataIndex)}>
                                    {String(row[column.dataIndex])}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </StyledTable>
        </TableContainer>
    );
};
