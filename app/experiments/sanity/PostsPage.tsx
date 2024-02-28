"use client";
import React, { useState } from "react";
import Navigation from "./Navigation";
import { CategoryPayload, PostsPayload } from "./types";

interface ContentPageProps {
    posts: PostsPayload[];
    categories: CategoryPayload[];
}

interface DataTableProps<T> {
    data: T[];
    itemType: "posts" | "categories";
}

interface DataFieldsProps<T> {
    item: T;
    itemType: "posts" | "categories";
}

const ContentPage: React.FC<ContentPageProps> = ({ posts, categories }) => {
    const [selectedContentType, setSelectedContentType] = useState("");

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
                <DataTable<PostsPayload> data={posts} itemType="posts" />
            )}
            {selectedContentType === "categories" && (
                <DataTable<CategoryPayload>
                    data={categories}
                    itemType="categories"
                />
            )}
        </main>
    );
};

export default ContentPage;

const DataTableHeader: React.FC = () => (
    <div className="flex w-full border-b border-gray-700">
        <div className="w-1/4 p-2 font-bold uppercase tracking-wide text-gray-200">
            Heading
        </div>
        <div className="w-1/4 p-2 font-bold uppercase tracking-wide text-gray-200">
            Publication Date
        </div>
        <div className="w-1/4 p-2 font-bold uppercase tracking-wide text-gray-200">
            Slug
        </div>
    </div>
);

const DataTable = <T extends PostsPayload | CategoryPayload>({
    data,
    itemType,
}: DataTableProps<T>) => {
    const [selectedItem, setSelectedItem] = useState<T | null>(null);

    return (
        <div className="flex h-full p-12">
            <div className="flex w-3/4 flex-col p-4">
                <DataTableHeader />
                {data.map((item) => (
                    // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
                    <div
                        key={item._id}
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

const DataFields = <T extends PostsPayload | CategoryPayload>({
    item,
    itemType,
}: DataFieldsProps<T>) => {
    let heading: string | undefined;
    let publicationDate: string | undefined;
    let slug: string | undefined;

    switch (itemType) {
        case "posts":
            heading = (item as PostsPayload).block?.[0]?.heading;
            publicationDate = (item as PostsPayload).block?.[0]
                ?.publicationDate;
            slug = (item as PostsPayload).slug?.current;
            break;
        case "categories":
            heading = (item as CategoryPayload).title;
            publicationDate = (item as CategoryPayload)._createdAt;
            slug = (item as CategoryPayload).slug?.current;
            break;
        default:
            break;
    }

    return (
        <div className="flex w-full">
            <div className="w-1/4 p-2">
                <span className="capitalize text-gray-400">{heading}</span>
            </div>
            <div className="w-1/4 p-2">
                <span className="text-gray-400">{publicationDate}</span>
            </div>
            <div className="w-1/4 p-2">
                <span className="text-gray-400">/{slug}</span>
            </div>
        </div>
    );
};

const CurrentItem = <T extends PostsPayload | CategoryPayload>({
    item,
    itemType,
}: DataFieldsProps<T>) => {
    let heading: string | undefined;
    let publicationDate: string | undefined;
    let slug: string | undefined;

    switch (itemType) {
        case "posts":
            heading = (item as PostsPayload).block?.[0]?.heading;
            publicationDate = (item as PostsPayload).block?.[0]
                ?.publicationDate;
            slug = (item as PostsPayload).slug?.current;
            break;
        case "categories":
            heading = (item as CategoryPayload).title;
            publicationDate = (item as CategoryPayload)._createdAt;
            slug = (item as CategoryPayload).slug?.current;
            break;
        default:
            break;
    }

    return (
        <div className="flex flex-col gap-2">
            <FieldWithLabel label="Heading" value={heading} />
            <FieldWithLabel label="Publication Date" value={publicationDate} />
            <FieldWithLabel label="Slug" value={slug} />
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
