import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

// Define the type for the data
type DataPoint = {
    date: Date;
    value: number;
};

type LineChartProps = {
    height: number;    // Accept height as a prop
    data: [Date, number][]; // Accept data as a prop
};

export const ConnectedScatterplot = ({ height, data }: LineChartProps) => {
    const svgRef = useRef<SVGSVGElement | null>(null);
    const [width, setWidth] = useState(0);  // Dynamically set width

    // Function to update width based on parent container or window size
    const updateWidth = () => {
        if (svgRef.current) {
            const parentWidth = svgRef.current.parentElement?.offsetWidth || 0;
            setWidth(parentWidth);  // Set the width based on the container's width
        }
    };

    useEffect(() => {
        // Set initial width
        updateWidth();

        // Update width when window is resized
        window.addEventListener("resize", updateWidth);
        return () => window.removeEventListener("resize", updateWidth);
    }, []);

    // Format the data for the scatter plot
    const connectedScatterplotData: DataPoint[] = data.map((item) => ({
        date: new Date(item[0]), // Convert to Date object
        value: item[1],   // Second element as Expense
    }));

    useEffect(() => {
        if (width === 0) return;  // Prevent rendering until width is set

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
            .domain(d3.extent(connectedScatterplotData, (d) => d.date) as [Date, Date])
            .range([0, innerWidth]);

        // Create X axis
        g.append("g")
            .attr("transform", `translate(0, ${innerHeight})`)
            .call(d3.axisBottom(x));

        // Create Y axis scale
        const y = d3.scaleLinear()
            .domain([0, d3.max(connectedScatterplotData, (d) => d.value) as number])
            .range([innerHeight, 0]);

        // Create Y axis
        g.append("g").call(d3.axisLeft(y));

        // Create the line
        g.append("path")
            .datum(connectedScatterplotData)
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
            .data(connectedScatterplotData)
            .join("circle")
            .attr("cx", (d) => x(d.date) as number) // Use x scale for positioning
            .attr("cy", (d) => y(d.value))         // Use y scale for positioning
            .attr("r", 5)
            .attr("fill", "#69b3a2");

    }, [data, width, height]); // Re-render when data, width or height changes

    return (
        <svg
            ref={svgRef}
            width={width}  // Dynamic width
            height={height} // Set height from props
        />
    );
};
