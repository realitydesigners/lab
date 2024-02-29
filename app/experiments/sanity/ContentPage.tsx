"use client";
import React, { useState } from "react";
import Navigation from "./Navigation";
import PostsChart from "./PostsChart";
import {
    fieldLabels,
    getDataForContentType,
    renderFieldValue,
} from "./renderUtils";

const ContentPage = ({ posts, categories, videos }) => {
    const [selectedContentType, setSelectedContentType] = useState<string>("");

    const onSelectContentType = (contentType: string) => {
        setSelectedContentType(contentType);
    };

    const allData = { posts, categories, videos };
    const data = getDataForContentType(selectedContentType, allData);

    return (
        <main className="flex min-h-screen w-full flex-col items-center px-[120px]">
            <Navigation
                initialSelection={selectedContentType}
                contentTypes={Object.keys(allData)} // Dynamically generate content types from allData keys
                onSelectContentType={onSelectContentType}
            />
            <div className="h-[400px] w-full py-6">
                <PostsChart posts={posts} />
            </div>
            <DynamicTable data={data} />
        </main>
    );
};
const DynamicTable = ({ data }) => {
    const [selectedItem, setSelectedItem] = useState(null);
    const fields = data.length > 0 ? Object.keys(data[0]) : [];

    return (
        <div className="flex w-full rounded-[1em] border border-gray-700 p-6">
            <div className="flex w-3/4 flex-col">
                <div className="flex w-full border-b border-gray-700">
                    {fields.map((field) => (
                        <div
                            key={field}
                            className="w-1/4 p-2 font-bold uppercase tracking-wide text-gray-200"
                        >
                            {fieldLabels[field] || field}{" "}
                        </div>
                    ))}
                </div>
                {data.map((item, index) => (
                    // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
                    <div
                        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                        key={index}
                        className="flex w-full cursor-pointer border-b border-gray-700 hover:bg-gray-700/50"
                        onClick={() => setSelectedItem(item)}
                    >
                        {fields.map((field) => (
                            <div
                                key={field}
                                className="w-1/4 p-2 text-sm text-gray-400"
                            >
                                {renderFieldValue(item, field)}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            {selectedItem && (
                <div className="w-1/4 rounded-xl border border-gray-700 p-4">
                    <CurrentItem item={selectedItem} />
                </div>
            )}
        </div>
    );
};
const CurrentItem = ({ item }) => {
    const fields = item ? Object.keys(item) : [];

    return (
        <>
            {fields.map((field) => {
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
                        <span className="rounded-xl p-2 text-xs font-bold uppercase text-gray-200">
                            {content}
                        </span>
                    </div>
                );
            })}
        </>
    );
};

export default ContentPage;
