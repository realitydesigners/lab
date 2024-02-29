"use client";
// ContentPage.tsx

import React, { useState } from "react";
import Navigation from "./Navigation";
import PostsChart from "./PostsChart";
import {
    fieldLabels,
    fieldOrder,
    getDataForContentType,
    renderFieldValue,
} from "./renderUtils"; // Import fieldOrders

const ContentPage = ({ posts, categories, videos }) => {
    const [selectedContentType, setSelectedContentType] = useState<string>("");

    const onSelectContentType = (contentType: string) => {
        setSelectedContentType(contentType);
    };

    const allData = { posts, categories, videos };
    const data = getDataForContentType(selectedContentType, allData);
    const contentType = selectedContentType;

    return (
        <div className="flex min-h-screen w-full flex-col items-center px-[120px]">
            <Navigation
                initialSelection={selectedContentType}
                contentTypes={Object.keys(allData)}
                onSelectContentType={onSelectContentType}
            />
            <div className="h-[400px] w-full py-6">
                <PostsChart posts={posts} />
            </div>
            <DynamicTable data={data} contentType={contentType} />
        </div>
    );
};

const DynamicTable = ({ data, contentType }) => {
    const [selectedItem, setSelectedItem] = useState(null);
    const fields = data.length > 0 ? Object.keys(data[0]) : [];
    const fieldWidthPercentage = 100 / fields.length;

    // Determine the ordered fields based on the content type
    const orderedFields = fieldOrder[contentType] || fields;

    // Function to handle row click
    const handleRowClick = (item) => {
        setSelectedItem(item); // Update selectedItem state when a row is clicked
    };

    return (
        <div className="flex w-full overflow-x-auto rounded-[1em] border border-gray-700 p-6">
            <div className="flex w-full flex-col rounded-[1em] border border-gray-700 p-2">
                <div className="flex w-full min-w-max ">
                    {orderedFields.map((field) => {
                        if (fields.includes(field)) {
                            return (
                                <div
                                    key={field}
                                    className="p-1 font-bold uppercase tracking-wide text-gray-200"
                                    style={{
                                        width: `${fieldWidthPercentage}%`,
                                        minWidth: "300px",
                                        maxWidth: "300px",
                                    }}
                                >
                                    <div className="h-full overflow-x-auto whitespace-nowrap rounded-md border border-gray-700/50  p-2">
                                        {fieldLabels?.hasOwnProperty(field)
                                            ? fieldLabels[field]
                                            : field}
                                    </div>
                                </div>
                            );
                        }
                        return null; // Skip rendering if the field doesn't exist in the data
                    })}
                </div>
                {data.map((item, index) => (
                    <div
                        key={index}
                        className="flex w-full min-w-max cursor-pointer  hover:bg-gray-700/5"
                        onClick={() => handleRowClick(item)}
                    >
                        {orderedFields.map((field) => {
                            if (fields.includes(field)) {
                                return (
                                    <div
                                        key={field}
                                        className=" p-1 text-sm text-gray-400"
                                        style={{
                                            width: `${fieldWidthPercentage}%`,
                                            minWidth: "300px",
                                            maxWidth: "300px",
                                        }}
                                    >
                                        <div className="h-full overflow-x-auto whitespace-nowrap rounded-md  border  border-gray-700/25  p-2">
                                            {renderFieldValue(item, field)}
                                        </div>
                                    </div>
                                );
                            }
                            return null; // Skip rendering if the field doesn't exist in the data
                        })}
                    </div>
                ))}
            </div>
            {selectedItem && (
                <div className=" ml-4 min-w-[500px] rounded-xl border border-gray-700 p-4">
                    <CurrentItem
                        item={selectedItem}
                        contentType={contentType}
                    />
                </div>
            )}
        </div>
    );
};

const CurrentItem = ({ item, contentType }) => {
    const orderedFields = fieldOrder[contentType] || Object.keys(item);

    return (
        <>
            {orderedFields.map((field) => {
                // biome-ignore lint/suspicious/noPrototypeBuiltins: <explanation>
                if (item.hasOwnProperty(field)) {
                    const content = renderFieldValue(item, field);
                    // biome-ignore lint/suspicious/noPrototypeBuiltins: <explanation>
                    const label = fieldLabels?.hasOwnProperty(field)
                        ? fieldLabels[field]
                        : field;

                    return (
                        <div key={field} className="flex flex-col p-2">
                            <span className="py-2 text-xs text-gray-400">
                                {label}:
                            </span>
                            <span className="rounded-xl p-2 text-2xl font-bold uppercase text-gray-200">
                                {content}
                            </span>
                        </div>
                    );
                }
                return null;
            })}
        </>
    );
};

export default ContentPage;
