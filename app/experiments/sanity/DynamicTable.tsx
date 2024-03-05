"use client";
// DynamicTable.js

import React, { useState } from "react";
import {
    extractKeysFromData,
    preprocessDataForTable,
    renderNestedContent,
} from "./renderUtils";

const DynamicTable = ({ data }) => {
    const [selectedItem, setSelectedItem] = useState(null);

    const handleRowClick = (item) => {
        setSelectedItem(item);
    };

    const processedData = preprocessDataForTable(data); // Preprocess the data
    const headers = extractKeysFromData(processedData); // Generate headers dynamically

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
                <thead>
                    <tr>
                        {headers.map((header) => (
                            <th
                                key={header}
                                className="text-md px-6 py-3 text-left font-bold uppercase tracking-wider text-gray-200"
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {processedData.map((item, itemIndex) => (
                        <tr
                            key={itemIndex}
                            className="cursor-pointer border-b border-gray-600 hover:bg-gray-700/50"
                        >
                            {headers.map((header) => (
                                <td
                                    key={`${header}-${itemIndex}`}
                                    className="whitespace-nowrap px-6 py-4 text-gray-400"
                                >
                                    {renderNestedContent(item, header)}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DynamicTable;
