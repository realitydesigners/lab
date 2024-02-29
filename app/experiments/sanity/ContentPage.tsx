"use client";
import React, { useState } from "react";
import Navigation from "./Navigation";
import PostsChart from "./PostsChart";
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
        <main className="flex min-h-screen w-full flex-col items-center px-[120px]">
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
            <div className="h-[400px] w-full py-6">
                <PostsChart posts={posts} />
            </div>
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
        <div className="flex w-full rounded-[1em] border border-gray-700 p-6">
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
                        onClick={() => setSelectedItem(item)}
                    >
                        {fieldsConfig.map((field) => {
                            const fieldValue = getNestedValue(
                                item,
                                field.key.replace(/\[(\d+)\]/, ".$1"),
                            );
                            // Check if the field is a category field and apply getCategoryStyle if available
                            const isCategoryField =
                                field.key.includes("category.title");
                            const baseClass = "w-1/4 p-2 text-sm";
                            const categoryClass =
                                isCategoryField && field.getCategoryStyle
                                    ? field.getCategoryStyle(fieldValue)
                                    : "text-gray-400";
                            const additionalClass = isCategoryField
                                ? "rounded-xl text-black font-bold uppercase  flex justify-center items-center"
                                : ""; // Conditionally add rounded-xl for category fields

                            return (
                                <div
                                    key={field.key}
                                    className={`${baseClass} ${categoryClass} ${additionalClass}`}
                                >
                                    {fieldValue}
                                </div>
                            );
                        })}
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
                <CurrentItemFields
                    key={field.key}
                    label={field.label}
                    value={getNestedValue(
                        item,
                        field.key.replace(/\[(\d+)\]/, ".$1"),
                    )}
                    className={
                        field.key === "block[0].category.title" &&
                        field.getCategoryStyle
                            ? field.getCategoryStyle(
                                  getNestedValue(
                                      item,
                                      field.key.replace(/\[(\d+)\]/, ".$1"),
                                  ),
                              )
                            : ""
                    }
                />
            ))}
        </div>
    );
};

const CurrentItemFields: React.FC<{
    label: string;
    value?: string;
    className?: string; // className now applies to the value
}> = ({ label, value, className }) => (
    <div className="flex flex-col p-2">
        <span className="py-2 text-xs text-gray-400">{label}:</span>
        <span
            className={`${className ? `${className} rounded-xl p-2 text-xs font-bold uppercase text-black` : "rounded-xl text-xl font-bold uppercase text-gray-200"}`}
        >
            {value || "No Data"}
        </span>
    </div>
);

export default ContentPage;
