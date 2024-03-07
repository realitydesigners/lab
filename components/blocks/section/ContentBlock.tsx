"use client";
import {
	DarkTemplate,
	LightTemplate,
} from "@/components/blocks/templates/Templates";
import {
	ContentBlockProps,
	LayoutTheme,
	TemplateTheme,
} from "@/components/blocks/types";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import React from "react";

const templateStyles: Record<TemplateTheme, string> = {
	dark: "w-full bg-black",
	light: "w-full bg-gray-200",
};

const templateComponents: Record<LayoutTheme, PortableTextComponents> = {
	dark: DarkTemplate as PortableTextComponents,
	light: LightTemplate as PortableTextComponents,
};

const ContentBlock: React.FC<ContentBlockProps> = ({ block }) => {
	const { content, layout } = block;
	const theme = layout || "light";
	const styles = templateStyles[theme];

	return (
		<div className={` h-auto min-h-screen w-screen ${styles} relative w-full`}>
			<PortableText
				value={content}
				components={templateComponents[theme] || templateComponents.light}
			/>
		</div>
	);
};

export default React.memo(ContentBlock);
