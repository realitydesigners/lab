"use client";
import * as d3 from "d3";
import React, { useEffect, useRef } from "react";

interface Props {
	posts: any[]; // Adjust the type as per your actual data structure
}

const PostsChart: React.FC<Props> = ({ posts }) => {
	const svgRef = useRef<SVGSVGElement | null>(null);
	const divRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (!svgRef.current || !divRef.current) return;

		const svg = d3.select(svgRef.current);
		const div = divRef.current;

		const width = div.clientWidth;
		const height = div.clientHeight;

		processData(svg, posts, width, height);

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [posts]);

	const handleResize = () => {
		if (!svgRef.current || !divRef.current) return;

		const svg = d3.select(svgRef.current);
		const div = divRef.current;

		const width = div.clientWidth;
		const height = div.clientHeight;

		processData(svg, posts, width, height);
	};

	const processData = (
		svg: any,
		posts: any[],
		width: number,
		height: number,
	) => {
		const dailyCounts: { [key: string]: number } = {};
		const currentDate = new Date();
		const dateTwoWeeksAgo = new Date(
			currentDate.getTime() - 14 * 24 * 60 * 60 * 1000,
		);
		const dateArray: string[] = [];

		for (let i = 0; i < 14; i++) {
			const date = new Date(
				dateTwoWeeksAgo.getTime() + i * 24 * 60 * 60 * 1000,
			);
			dateArray.push(
				date.toLocaleDateString("en-US", {
					month: "short",
					day: "2-digit",
				}),
			);
		}

		// biome-ignore lint/complexity/noForEach: <explanation>
		dateArray.forEach((dateString) => {
			dailyCounts[dateString] = 0;
		});

		// biome-ignore lint/complexity/noForEach: <explanation>
		posts.forEach((post) => {
			const createdAt = new Date(post._createdAt);
			const dateString = createdAt.toLocaleDateString("en-US", {
				month: "short",
				day: "2-digit",
			});

			if (dailyCounts[dateString]) {
				dailyCounts[dateString]++;
			} else {
				dailyCounts[dateString] = 1;
			}
		});

		const margin = { top: 10, right: 10, bottom: 40, left: 10 };
		const svgWidth = width - margin.left - margin.right;
		const svgHeight = height - margin.top - margin.bottom; // Added margin bottom

		const x = d3
			.scaleBand()
			.domain(dateArray)
			.range([0, svgWidth])
			.padding(0.1);

		const y = d3
			.scaleLinear()
			.domain([0, d3.max(Object.values(dailyCounts)) || 0])
			.range([svgHeight, 0]);

		const line = d3
			.line<any>()
			.defined((d: any) => !isNaN(d[1]))
			.x((d) => x(d[0]) + x.bandwidth() / 2)
			.y((d) => y(d[1]) as number);

		svg.selectAll("*").remove();

		svg
			.append("g")
			.selectAll("line")
			.data(y.ticks())
			.enter()
			.append("line")
			.attr("x1", 0)
			.attr("x2", svgWidth)
			.attr("y1", (d) => y(d))
			.attr("y2", (d) => y(d))
			.attr("stroke", "#111")
			.attr("stroke-width", 1)
			.attr("shape-rendering", "crispEdges");

		svg
			.append("path")
			.datum(Object.entries(dailyCounts))
			.attr("fill", "none")
			.attr("stroke", "white")
			.attr("stroke-width", 3)
			.attr("d", line);

		svg
			.append("g")
			.attr("transform", `translate(0,${svgHeight})`)
			.call(d3.axisBottom(x))
			.selectAll("text")
			.attr("transform", "rotate(-90)")
			.style("text-anchor", "end")
			.attr("y", 0 - margin.top / 0)
			.style("fill", "#555");

		svg
			.append("text")
			.attr("transform", "rotate(-90)")
			.attr("x", 0 - svgHeight / 2)
			.attr("dy", "1em")
			.style("text-anchor", "middle")
			.style("fill", "#777")
			.text("Number of Posts");

		svg
			.append("text")
			.attr("x", svgWidth / 2)
			.attr("y", 30 - margin.top / 2)
			.attr("text-anchor", "middle")
			.style("font-size", "16px")
			.style("fill", "#777")
			.text("Number of Posts Over Time");
	};

	return (
		<div
			ref={divRef}
			className="h-full w-full items-center justify-center rounded-[1em] border border-gray-700 px-4  "
		>
			<svg ref={svgRef} width="100%" height="100%" />
		</div>
	);
};

export default PostsChart;
