"use client";
import React, { useState } from "react";
import Navigation from "./Navigation";
import { getNestedValue, schemaConfig } from "./schemaConfig";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const ContentPage: React.FC<{ posts: any[]; categories: any[] }> = ({
    posts,
    categories,
}) => {
    const [selectedContentType, setSelectedContentType] = useState<string>("");

    const onSelectContentType = (contentType: string) => {
        setSelectedContentType(contentType);
    };

    const data =
        selectedContentType === "posts"
            ? posts
            : selectedContentType === "categories"
              ? categories
              : [];

    return (
        <main className="flex min-h-screen w-full flex-col items-center bg-black">
            <Navigation
                initialSelection={selectedContentType}
                contentTypes={[
                    "posts",
                    "categories",
                    "videos",
                    "images",
                    "quotes",
                    "animations",
                ]}
                onSelectContentType={onSelectContentType}
            />
            <DynamicTable schemaType={selectedContentType} data={data} />
        </main>
    );
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const DynamicTable: React.FC<{ schemaType: string; data: any[] }> = ({
    schemaType,
    data,
}) => {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const [selectedItem, setSelectedItem] = useState<any | null>(null);

    const fieldsConfig = schemaConfig[schemaType] || [];

    return (
        <div className="flex w-full p-12">
            <div className="flex w-3/4 flex-col">
                <div className="flex w-full border-b border-gray-700">
                    {fieldsConfig.map((field) => (
                        <div
                            key={field.key}
                            className="w-1/4 p-2 font-bold uppercase tracking-wide text-gray-200"
                        >
                            {field.label}
                        </div>
                    ))}
                </div>
                {data.map((item, index) => (
                    // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
                    <div
                        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                        key={index}
                        className="flex w-full cursor-pointer border-b border-gray-700 hover:bg-gray-700/50"
                        onClick={() => setSelectedItem(item)} // Set the selected item on click
                    >
                        {fieldsConfig.map((field) => (
                            <div
                                key={field.key}
                                className="w-1/4 p-2 text-sm text-gray-400"
                            >
                                {field.formatter
                                    ? field.formatter(
                                          getNestedValue(
                                              item,
                                              field.key.replace(
                                                  /\[(\d+)\]/,
                                                  ".$1",
                                              ),
                                          ),
                                      )
                                    : getNestedValue(
                                          item,
                                          field.key.replace(/\[(\d+)\]/, ".$1"),
                                      )}
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {selectedItem && (
                <div className="flex w-1/4 flex-col rounded-lg p-4">
                    <CurrentItem item={selectedItem} schemaType={schemaType} />
                </div>
            )}
        </div>
    );
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const CurrentItem: React.FC<{ item: any; schemaType: string }> = ({
    item,
    schemaType,
}) => {
    const fieldsConfig = schemaConfig[schemaType] || [];

    return (
        <div className="rounded-xl border border-gray-700 p-4">
            {fieldsConfig.map((field) => (
                <FieldWithLabel
                    key={field.key}
                    label={field.label}
                    value={getNestedValue(
                        item,
                        field.key.replace(/\[(\d+)\]/, ".$1"),
                    )}
                />
            ))}
        </div>
    );
};
const FieldWithLabel: React.FC<{ label: string; value?: string }> = ({
    label,
    value,
}) => (
    <div className="mb-4 flex flex-col">
        <span className="text-sm text-gray-400">{label}:</span>
        <span className="p-2 text-lg text-gray-200">{value || "No Data"}</span>
    </div>
);

export default ContentPage;
