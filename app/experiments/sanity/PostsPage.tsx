"use client";
import React, { useState } from "react";
import Navigation from "./Navigation";

// Simplified component props with `any` type for posts and categories
const ContentPage: React.FC<{ posts: any[]; categories: any[] }> = ({
    posts,
    categories,
}) => {
    const [selectedContentType, setSelectedContentType] = useState<string>("");

    const onSelectContentType = (contentType: string) => {
        setSelectedContentType(contentType);
    };

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
            {selectedContentType === "posts" && (
                <DataTable data={posts} itemType="posts" />
            )}
            {selectedContentType === "categories" && (
                <DataTable data={categories} itemType="categories" />
            )}
        </main>
    );
};

const DataTable: React.FC<{ data: any[]; itemType: string }> = ({
    data,
    itemType,
}) => {
    const [selectedItem, setSelectedItem] = useState<any | null>(null);

    return (
        <div className="flex h-full p-12">
            <div className="flex w-3/4 flex-col p-4">
                <DataTableHeader itemType={itemType} />
                {data.map((item, index) => (
                    <div
                        key={index}
                        className="flex w-full cursor-pointer border-b border-gray-700 hover:bg-gray-700/50"
                        onClick={() => setSelectedItem(item)}
                    >
                        <DataFields item={item} itemType={itemType} />
                    </div>
                ))}
            </div>
            <div className="flex w-1/4 flex-col p-6">
                {selectedItem && (
                    <div className="rounded-xl border border-gray-700 p-4">
                        <CurrentItem item={selectedItem} itemType={itemType} />
                    </div>
                )}
                {!selectedItem && (
                    <p className="w-1/4 text-gray-400">
                        Select an item to see its details.
                    </p>
                )}
            </div>
        </div>
    );
};

const DataTableHeader: React.FC<{ itemType: string }> = ({ itemType }) => (
    <div className="flex w-full border-b border-gray-700">
        <div className="w-1/4 p-2 font-bold uppercase tracking-wide text-gray-200">
            {itemType === "posts" ? "Heading" : "Title"}
        </div>
        <div className="w-1/4 p-2 font-bold uppercase tracking-wide text-gray-200">
            Publication Date
        </div>
        <div className="w-1/4 p-2 font-bold uppercase tracking-wide text-gray-200">
            Slug
        </div>
        {itemType === "posts" && (
            <div className="w-1/4 p-2 font-bold uppercase tracking-wide text-gray-200">
                Category
            </div>
        )}
    </div>
);

const DataFields: React.FC<{ item: any; itemType: string }> = ({
    item,
    itemType,
}) => {
    let heading = "N/A";
    let publicationDate = "N/A";
    let slug = "N/A";
    let categoryName = "N/A";

    if (itemType === "posts") {
        heading = item.block[0]?.heading || "N/A";
        publicationDate = item.block[0]?.publicationDate || "N/A";
        slug = item.slug?.current || "N/A";
        categoryName = item.block[0]?.category?.title || "N/A";
    } else if (itemType === "categories") {
        heading = item.title || "N/A";
        publicationDate = item._createdAt || "N/A";
        slug = item.slug?.current || "N/A";
    }

    return (
        <div className="flex w-full text-sm">
            <div className="w-1/4 p-2">
                <span className="capitalize text-gray-400">{heading}</span>
            </div>
            <div className="w-1/4 p-2">
                <span className="text-gray-400">{publicationDate}</span>
            </div>
            <div className="w-1/4 p-2">
                <span className="text-gray-400">/{slug}</span>
            </div>
            {itemType === "posts" && (
                <div className="w-1/4 p-2">
                    <span className="whitespace-nowrap rounded-md bg-gray-600/25 px-2 py-1 font-bold uppercase text-gray-400 hover:bg-gray-600/50">
                        {categoryName}
                    </span>
                </div>
            )}
        </div>
    );
};

const CurrentItem: React.FC<{ item: any; itemType: string }> = ({
    item,
    itemType,
}) => {
    // Reuse logic from DataFields for consistency; adjust as necessary for your use case
    let heading = "N/A";
    let publicationDate = "N/A";
    let slug = "N/A";
    let categoryName = "N/A";

    if (itemType === "posts") {
        heading = item.block[0]?.heading || "N/A";
        publicationDate = item.block[0]?.publicationDate || "N/A";
        slug = item.slug?.current || "N/A";
        categoryName = item.block[0]?.category?.title || "N/A";
    } else if (itemType === "categories") {
        heading = item.title || "N/A";
        publicationDate = item._createdAt || "N/A";
        slug = item.slug?.current || "N/A";
    }

    return (
        <div className="flex flex-col gap-2">
            <FieldWithLabel label="Heading" value={heading} />
            <FieldWithLabel label="Publication Date" value={publicationDate} />
            <FieldWithLabel label="Slug" value={slug} />
            {itemType === "posts" && categoryName && (
                <FieldWithLabel label="Category" value={categoryName} />
            )}
        </div>
    );
};

const FieldWithLabel: React.FC<{ label: string; value?: string }> = ({
    label,
    value,
}) => (
    <div className="flex flex-col">
        <span className="text-sm text-gray-400">{label}:</span>
        <span className="p-2 text-2xl text-gray-200">{value || "No Data"}</span>
    </div>
);

export default ContentPage;
