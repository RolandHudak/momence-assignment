interface Props<T> {
    testid?: string;
    placeholder?: string;
    options: { label: React.ReactNode; value: T }[];
    value?: T;
    onChange: (value: T) => void;
}

export const Select = <T extends Readonly<string> | undefined>(
    props: Props<T>,
) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        props.onChange(e.target.value as T);
    };

    return (
        <select
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
        </select>
    );
};
