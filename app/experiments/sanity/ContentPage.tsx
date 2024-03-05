"use client";
import React, { useState } from "react";
import DynamicTable from "./DynamicTable";
import Navigation from "./Navigation";
import PostsChart from "./PostsChart";
import { getDataForContentType, preprocessDataForTable } from "./renderUtils";

const ContentPage = ({ data }) => {
    const [selectedContentType, setSelectedContentType] = useState<string>("");

    const onSelectContentType = (contentType: string) => {
        setSelectedContentType(contentType);
    };

    const allData = getDataForContentType(selectedContentType, data);

    return (
        <div className="flex min-h-screen w-full flex-col items-center px-[120px]">
            <Navigation
                initialSelection={selectedContentType}
                contentTypes={Object.keys(data)}
                onSelectContentType={onSelectContentType}
            />
            <div className="h-[400px] w-full py-6">
                <PostsChart posts={data.posts} />
            </div>
            <div className="w-full overflow-x-auto border border-gray-700">
                <DynamicTable data={allData} />
            </div>
        </div>
    );
};

export default ContentPage;
