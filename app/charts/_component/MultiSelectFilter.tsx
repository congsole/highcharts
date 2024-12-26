import { useEffect, useState } from "react";
import { Select } from "antd";

interface IProps {
    // typCd: string;
    // defNm: string | undefined;
    filterName: string;
    filterOptions: string[];
    selectedItems: any;
    setSelectedItems: any;
}

const MultiSelectFilter: React.FC<IProps> = ({ filterName, filterOptions, selectedItems, setSelectedItems }) => {
    const [placeholder, setPlaceholder] = useState<string>("");
    const [options, setOptions] = useState<{ value: string, label: string }[]>(
        [],
    );

    const handleChange = (value: string[]) => {
        const values = value.length === 0 ? [] : value;
        setSelectedItems(values);
    };


    useEffect(() => {
        setPlaceholder(`${filterName} 전체`);
        const ops: { value: string, label: string }[] = [];
        filterOptions.map((option) => {
            ops.push({ value: option, label: option });
        });
        setOptions(ops);
    }, []);

    return (
        <Select
            className={"multi-slct"}
            placeholder={placeholder}
            options={options}
            onChange={handleChange}
            showSearch={false}
            mode={"multiple"}
            style={{ width: 210 }}
            value={selectedItems}
            maxTagCount={1}
            allowClear
        />
    );
};

export default MultiSelectFilter;
