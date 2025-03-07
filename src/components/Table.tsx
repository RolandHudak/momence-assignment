export interface TableColumn<T> {
    dataIndex: keyof T;
    title: string;
}

interface TableProps<T> {
    data: T[];
    columns: TableColumn<T>[];
}

export const Table = <T extends object>(props: TableProps<T>) => {
    return (
        <table>
            <thead>
                <tr>
                    {props.columns.map((column) => (
                        <th key={String(column.dataIndex)}>{column.title}</th>
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
        </table>
    );
};
