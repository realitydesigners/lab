"use client";
import React, { useState } from "react";
import DynamicTable from "./DynamicTable";
import Navigation from "./Navigation";
import PostsChart from "./PostsChart";
import { getDataForContentType, preprocessDataForTable } from "./renderUtils";

const ContentPage = ({ posts, categories, videos, experiments }) => {
    const [selectedContentType, setSelectedContentType] = useState<string>("");

    const onSelectContentType = (contentType: string) => {
        setSelectedContentType(contentType);
    };
    const allData = { posts, categories, videos, experiments };

    const data = getDataForContentType(selectedContentType, allData);

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
            <div className="w-full overflow-x-auto border border-gray-700">
                <DynamicTable data={data} />
            </div>
        </div>
    );
};

export default ContentPage;
