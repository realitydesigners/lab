"use client";
import * as d3 from "d3";
import React, { useEffect, useRef } from "react";

const PostsChart = ({ posts }) => {
	const svgRef = useRef(null);
	const divRef = useRef(null);

	useEffect(() => {
		if (!svgRef.current || !divRef.current) return;

		const svg = d3.select(svgRef.current);
		const div = divRef.current;

		const width = div.clientWidth;
		const height = div.clientHeight;

		processData(svg, posts, width, height);

		const handleResize = () => {
			if (!svgRef.current || !divRef.current) return;

			const svg = d3.select(svgRef.current);
			const div = divRef.current;

			const width = div.clientWidth;
			const height = div.clientHeight;

			processData(svg, posts, width, height);
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [posts]);

	const processData = (svg, posts, width, height) => {
		const dailyCounts = {};
		const currentDate = new Date();
		const dateTwoWeeksAgo = new Date(
			currentDate.getFullYear(),
			currentDate.getMonth(),
			currentDate.getDate() - 13 // Adjusting to include today
		);
		const dateArray = [];

		for (let i = 0; i < 14; i++) {
			const date = new Date(
				dateTwoWeeksAgo.getFullYear(),
				dateTwoWeeksAgo.getMonth(),
				dateTwoWeeksAgo.getDate() + i
			);
			const dateString = date.toLocaleDateString("en-US", {
				month: "short",
				day: "2-digit",
			});
			dateArray.push(dateString);
			dailyCounts[dateString] = 0;
		}

		for (const post of posts) {
			const createdAt = new Date(post._createdAt);
			const dateKey = createdAt.toLocaleDateString("en-US", {
				month: "short",
				day: "2-digit",
			});
			if (dailyCounts[dateKey] !== undefined) {
				dailyCounts[dateKey]++;
			} else {
				dailyCounts[dateKey] = 1;
			}
		}

		const margin = { top: 40, right: 40, bottom: 40, left: 0 };
		const svgWidth = width - margin.left - margin.right;
		const svgHeight = height - margin.top - margin.bottom;

		const x = d3
			.scaleBand()
			.domain(dateArray)
			.range([0, svgWidth])
			.padding(0.1);

		const y = d3
			.scaleLinear()
			.domain([0, Math.ceil(d3.max(Object.values(dailyCounts)) || 1)])
			.range([svgHeight, 0]);

		const line = d3
			.line()
			.defined((d) => !isNaN(d[1]))
			.x((d) => x(d[0]) + x.bandwidth() / 2)
			.y((d) => y(d[1]));

		svg.selectAll("*").remove();

		const g = svg.append("g")
			.attr("transform", `translate(${margin.left},${margin.top})`);

		// Draw the dots first
		g.selectAll("dot")
			.data(dateArray.map((date) => [date, dailyCounts[date] || 0]))
			.enter()
			.append("circle")
			.attr("cx", (d) => x(d[0]) + x.bandwidth() / 2)
			.attr("cy", (d) => y(d[1]))
			.attr("r", 4)
			.attr("fill", "white");

		// Draw the axes
		g.append("g")
			.attr("transform", `translate(0,${svgHeight})`)
			.call(d3.axisBottom(x))
			.selectAll("text")
			.style("text-anchor", "middle") // Center the text
			.attr("dy", "1.5em") // Add more padding for the bottom
			.style("fill", "#555");

		g.append("g")
			.attr("transform", `translate(${svgWidth}, 0)`)
			.call(d3.axisRight(y).ticks(Math.ceil(d3.max(Object.values(dailyCounts)) || 1)))
			.selectAll("text")
			.style("fill", "#555");

		// Draw the line last
		g.append("path")
			.datum(dateArray.map((date) => [date, dailyCounts[date] || 0]))
			.attr("fill", "none")
			.attr("stroke", "white")
			.attr("stroke-width", 3)
			.attr("d", line);
	};

	return (
		<div
			ref={divRef}
			className="h-[400px] w-full items-center justify-center border border-[#181818] my-6"
		>
			<svg ref={svgRef} width="100%" height="100%" />
		</div>
	);
};

export default PostsChart;
