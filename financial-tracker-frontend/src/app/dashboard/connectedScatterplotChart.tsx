import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

// Define the type for the data
type DataPoint = {
    date: Date;
    value: number;
};

type LineChartProps = {
    data: DataPoint[]; // Accept data as a prop
    width: number;     // Accept width as a prop
    height: number;    // Accept height as a prop
};

export const ConnectedScatterplot: React.FC<LineChartProps> = ({ data, width, height }) => {
    const svgRef = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        // Set the dimensions and margins of the graph
        const margin = { top: 10, right: 30, bottom: 30, left: 60 };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        // Clear previous chart content
        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove(); // Clear previous content

        const g = svg
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // Parse the date and create x-axis scale
        const x = d3.scaleTime()
            .domain(d3.extent(data, (d) => d.date) as [Date, Date])
            .range([0, innerWidth]);

        // Create X axis
        g.append("g")
            .attr("transform", `translate(0, ${innerHeight})`)
            .call(d3.axisBottom(x));

        // Create Y axis scale
        const y = d3.scaleLinear()
            .domain([0, d3.max(data, (d) => d.value) as number])
            .range([innerHeight, 0]);

        // Create Y axis
        g.append("g").call(d3.axisLeft(y));

        // Create the line
        g.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "#69b3a2")
            .attr("stroke-width", 1.5)
            .attr("d", d3.line<DataPoint>()
                .x((d) => x(d.date) as number) // x positions
                .y((d) => y(d.value))         // y positions
            );

        // Add the points
        g.append("g")
            .selectAll("dot")
            .data(data)
            .join("circle")
            .attr("cx", (d) => x(d.date) as number) // Use x scale for positioning
            .attr("cy", (d) => y(d.value))         // Use y scale for positioning
            .attr("r", 5)
            .attr("fill", "#69b3a2");

    }, [data, width, height]); // Re-render when data, width or height changes

    return (
        <svg
            ref={svgRef}
            width={width}  // Set width from props
            height={height} // Set height from props
        />
    );
};
