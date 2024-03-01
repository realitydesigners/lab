"use client";
import React, { useState } from "react";
import PostsChart from "./PostsChart";
import {
	fieldLabels,
	fieldOrder,
	getDataForContentType,
	renderFieldValue,
} from "./renderUtils";

interface NavigationProps {
	initialSelection: string;
	contentTypes: string[];
	onSelectContentType: (contentType: string) => void;
}

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

const Navigation: React.FC<NavigationProps> = ({
	contentTypes,
	onSelectContentType,
}) => {
	const handleSelect = (contentType: string) => {
		onSelectContentType(contentType);
	};

	return (
		<div className="flex gap-2  py-10">
			{contentTypes.map((contentType) => (
				// biome-ignore lint/a11y/useButtonType: <explanation>
				<button
					key={contentType}
					onClick={() => handleSelect(contentType)}
					className="rounded-xl border  border-gray-700 px-3 py-1 text-gray-200 hover:bg-gray-700/50"
				>
					{contentType.charAt(0).toUpperCase() + contentType.slice(1)}
				</button>
			))}
		</div>
	);
};

const DynamicTable = ({ data, contentType }) => {
	const [selectedItem, setSelectedItem] = useState(null);
	const fields = data.length > 0 ? Object.keys(data[0]) : [];
	const fieldWidthPercentage = 100 / fields.length;

	const orderedFields = fieldOrder[contentType] || fields;

	const handleRowClick = (item) => {
		setSelectedItem(item);
	};

	return (
		<div className="flex w-full overflow-x-auto rounded-[1em] border border-gray-700 p-6">
			{selectedItem && (
				<div className=" mr-4 min-w-[500px] rounded-xl border border-gray-700 p-4">
					<CurrentItem item={selectedItem} contentType={contentType} />
				</div>
			)}
			<div className="flex w-full flex-col rounded-[1em] border border-gray-700 p-2">
				<div className="flex w-auto ">
					{orderedFields.map((field) => {
						if (fields.includes(field)) {
							return (
								<div
									key={field}
									className="min-w-[300px] max-w-[300px] border-b-2 border-gray-700  font-bold uppercase tracking-wide text-gray-400"
									style={{
										width: `${fieldWidthPercentage}%`,
									}}
								>
									<div className="h-full overflow-x-auto whitespace-nowrap  p-2">
										{/* biome-ignore lint/suspicious/noPrototypeBuiltins: <explanation> */}
										{fieldLabels?.hasOwnProperty(field)
											? fieldLabels[field]
											: field}
									</div>
								</div>
							);
						}
						return null;
					})}
				</div>
				{data.map((item, index) => (
					// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
					<div
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						key={index}
						className="flex w-full  hover:bg-gray-700/25"
						onClick={() => handleRowClick(item)}
					>
						{orderedFields.map((field) => {
							if (fields.includes(field)) {
								return (
									<div
										key={field}
										className="min-w-[300px] max-w-[300px] border-b border-gray-700 py-1   text-sm  text-gray-400"
										style={{
											width: `${fieldWidthPercentage}%`,
										}}
									>
										<div className="h-full overflow-x-auto whitespace-nowrap p-3  font-bold text-gray-200">
											{renderFieldValue(item, field)}
										</div>
									</div>
								);
							}
							return null;
						})}
					</div>
				))}
			</div>
		</div>
	);
};

const CurrentItem = ({ item, contentType }) => {
	const orderedFields = fieldOrder[contentType];

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
							<span className="py-2 text-xs font-bold uppercase tracking-wide text-gray-400">
								{label}:
							</span>
							<span className="rounded-xl p-2 text-3xl font-bold uppercase text-gray-200">
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
