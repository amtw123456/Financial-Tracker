import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

type BarplotProps = {
    height: number; // Fixed height
    data: { name: string; value: number }[];
};

const colors = [
    '#1E3A8A',  // Deep Blue
    '#3B82F6',  // Sky Blue
    '#22D3EE',  // Turquoise
    '#34D399',  // Mint Green
    '#A3E635',  // Lime Green
    '#FDE047',  // Sunshine Yellow
    '#F97316',  // Tangerine
    '#EF4444',  // Coral Red
    '#D946EF',  // Magenta
    '#8B5CF6',  // Violet
];

export const BarChart = ({ height, data }: BarplotProps) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const [width, setWidth] = useState(0);  // Dynamically set width

    useEffect(() => {
        // Function to update width based on parent container or window size
        const updateWidth = () => {
            if (svgRef.current) {
                const parentWidth = svgRef.current.parentElement?.offsetWidth || 0;
                setWidth(parentWidth);  // Set the width based on the container's width
            }
        };

        // Set initial width
        updateWidth();

        // Update width when window is resized
        window.addEventListener("resize", updateWidth);
        return () => window.removeEventListener("resize", updateWidth);
    }, []);

    useEffect(() => {
        if (width === 0) return;  // Prevent rendering until width is set

        const margin = { top: 30, right: 30, bottom: 70, left: 60 };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove(); // Clear previous chart content

        const g = svg
            .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        const x = d3
            .scaleBand()
            .range([0, innerWidth])
            .domain(data.map((d) => d.name))
            .padding(0.2);

        const y = d3
            .scaleLinear()
            .domain([0, d3.max(data, (d) => d.value) as number])
            .range([innerHeight, 0]);

        g.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", (d) => (x(d.name) as number))
            .attr("y", (d) => y(d.value))
            .attr("width", x.bandwidth())
            .attr("height", (d) => innerHeight - y(d.value))
            .attr("fill", (d, i) => colors[i % colors.length]);

        g.append("g").call(d3.axisLeft(y));

        g.append("g")
            .attr("transform", `translate(0, ${innerHeight})`)
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end");

    }, [width, height, data]);  // Re-render if width, height, or data changes

    return (
        <svg
            ref={svgRef}
            width={width}  // Dynamic width
            height={height}  // Fixed height
        />
    );
};
