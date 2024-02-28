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
    itemType: "post" | "categories";
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
                <DataTable<PostsPayload> data={posts} itemType="post" />
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

const DataTable = <T extends PostsPayload | CategoryPayload>({
    data,
    itemType,
}: DataTableProps<T>) => {
    const [selectedItem, setSelectedItem] = useState<T | null>(null);

    return (
        <div className="flex h-full">
            <div className="flex w-1/2 flex-col p-4">
                {data.map((item) => (
                    // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
                    <div
                        key={item._id}
                        className="flex w-full cursor-pointer border-b border-gray-700 hover:bg-gray-700/50"
                        onClick={() => setSelectedItem(item)}
                    >
                        <div className="text-md p-2 font-bold uppercase tracking-wide text-gray-200">
                            {itemType === "post"
                                ? (item as PostsPayload).block?.[0]?.heading ||
                                  "No Heading"
                                : (item as CategoryPayload).title ||
                                  "No Heading"}
                        </div>
                        <div className="text-md p-2 text-gray-400">
                            {itemType === "post"
                                ? (item as PostsPayload).block?.[0]
                                      ?.publicationDate || "No Date"
                                : (item as CategoryPayload)._createdAt ||
                                  "No Date"}
                        </div>
                        <div className="text-md p-2 text-gray-400">
                            {itemType === "post"
                                ? (item as PostsPayload).slug?.current ||
                                  "No Date"
                                : (item as CategoryPayload).slug?.current ||
                                  "No Date"}
                        </div>

                        {/* Add more fields as needed */}
                    </div>
                ))}
            </div>
            <div className="flex w-1/2 flex-col p-6">
                {selectedItem && (
                    <div className="rounded-xl border border-gray-700 p-4">
                        <h2 className="text-4xl font-bold capitalize text-gray-200">
                            {itemType === "post"
                                ? (selectedItem as PostsPayload).block?.[0]
                                      ?.heading || "No Heading"
                                : (selectedItem as CategoryPayload).title ||
                                  "No Heading"}
                        </h2>
                        <h2 className="text-xl font-bold capitalize text-gray-400">
                            {itemType === "post"
                                ? (selectedItem as PostsPayload).block?.[0]
                                      ?.subheading || "No Heading"
                                : (selectedItem as CategoryPayload).title ||
                                  "No Heading"}
                        </h2>
                        <p className="text-md font-bold text-gray-400">
                            {itemType === "post"
                                ? (selectedItem as PostsPayload).block?.[0]
                                      ?.publicationDate || "No Date"
                                : (selectedItem as CategoryPayload)
                                      ._createdAt || "No Date"}
                        </p>
                        <p className="text-md font-bold text-gray-400">
                            {itemType === "post"
                                ? (selectedItem as PostsPayload).slug
                                      ?.current || "No Slug"
                                : (selectedItem as CategoryPayload).slug
                                      ?.current || "No Slug"}
                        </p>
                        {/* Add more details fields as needed */}
                    </div>
                )}
                {!selectedItem && (
                    <p className="w-1/2 text-gray-400">
                        Select an item to see its details.
                    </p>
                )}
            </div>
        </div>
    );
};
