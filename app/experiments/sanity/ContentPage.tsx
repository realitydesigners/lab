"use client";
import React, { useState } from "react";
import DynamicTable from "./DynamicTable";
import Navigation from "./Navigation";
import PostsChart from "./PostsChart";
import { getDataForContentType } from "./renderUtils";

const ContentPage = ({ data }) => {
	const [selectedContentType, setSelectedContentType] =
		useState<string>("posts");

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

			<PostsChart posts={data.posts} />

			<DynamicTable data={allData} />
		</div >
	);
};

export default ContentPage;
