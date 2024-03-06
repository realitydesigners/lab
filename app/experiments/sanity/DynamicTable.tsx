"use client";
import React, { useState } from "react";
import {
    extractKeysFromData,
    preprocessDataForTable,
    renderNestedContent,
} from "./renderUtils";

const RenderItemDetails = ({ content, indent = 0 }) => {
    if (!content) return null;

    if (Array.isArray(content)) {
        return (
            <ul>
                {content.map((item) => (
                    <li key={item}>
                        <RenderItemDetails content={item} indent={indent + 1} />
                    </li>
                ))}
            </ul>
        );
    }
    if (typeof content === "object") {
        return (
            <div style={{ marginLeft: `${indent * 5}px` }}>
                {Object.entries(content)
                    .filter(([, value]) => value != null)
                    .map(([key, value]) => {
                        if (
                            [
                                "_type",
                                "_key",
                                "_ref",
                                "_rev",
                                "asset",
                                "markDefs",
                            ].includes(key)
                        ) {
                            return null;
                        }
                        if (key === "slug") {
                            const slugValue = value as {
                                current: string;
                            };
                            return (
                                <div key={key}>
                                    <strong className="mr-2 text-gray-200">
                                        {key}:
                                    </strong>
                                    <span className="text-gray-400">
                                        {slugValue.current}
                                    </span>
                                </div>
                            );
                        }

                        return (
                            <div key={key}>
                                <strong className="mr-2 text-gray-200">
                                    {key}:
                                </strong>
                                <span className="text-gray-400">
                                    <RenderItemDetails
                                        content={value}
                                        indent={indent + 1}
                                    />
                                </span>
                            </div>
                        );
                    })}
            </div>
        );
    }
    if (typeof content === "string") {
        return <span className="text-gray-400">{content}</span>;
    }

    return <span className="text-gray-400">{String(content)}</span>;
};

const DetailModal = ({ item, onClose }) => {
    return (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-70">
            <div className="relative w-full max-w-[70vw] overflow-y-auto rounded-lg border border-gray-700 bg-black p-5">
                <h2 className="mb-4 text-2xl font-bold uppercase  text-gray-200">
                    Schema Details
                </h2>
                {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
                <button
                    onClick={onClose}
                    className="absolute right-0  top-0 m-4 rounded-full bg-gray-700/50 px-4 py-2 text-lg uppercase text-white hover:bg-gray-700"
                >
                    Close
                </button>
                <div className="mt-4 max-h-[80vh] overflow-y-auto">
                    <RenderItemDetails content={item} />
                </div>
            </div>
        </div>
    );
};

const DynamicTable = ({ data }) => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleRowClick = (item) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedItem(null);
    };

    const processedData = preprocessDataForTable(data);
    const headers = extractKeysFromData(processedData);

    return (
        <div className="relative overflow-x-auto">
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
                        // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
                        <tr
                            key={`${item.id}-${itemIndex}`} // Generate a unique key using a unique identifier from the data
                            className="cursor-pointer border-b border-gray-600 hover:bg-gray-700/50"
                            onClick={() => handleRowClick(data[itemIndex])} // Use original data here for modal
                        >
                            {headers.map((header) => (
                                <td
                                    key={`${header}-${item.id}-${itemIndex}`} // Generate a unique key using a combination of header, unique identifier, and index
                                    className="whitespace-nowrap px-6 py-4 text-gray-400"
                                >
                                    {renderNestedContent(item, header)}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            {isModalOpen && (
                <DetailModal item={selectedItem} onClose={handleCloseModal} />
            )}
        </div>
    );
};

export default DynamicTable;
