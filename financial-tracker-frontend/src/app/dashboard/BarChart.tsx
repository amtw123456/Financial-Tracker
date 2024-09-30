import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

// Define the type for the BarplotProps
type BarplotProps = {
    width: number;
    height: number;
    data: { name: string; value: number }[];
};

export const BarChart = ({ width, height, data }: BarplotProps) => {
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        // Set margins around the chart

        var barplotData = [
            { name: "House", value: 0 },
            { name: "Food", value: 0 },
            { name: "Utilities", value: 0 },
            { name: "Bills", value: 0 },
            { name: "Shopping", value: 0 },
            { name: "Transportation", value: 0 },
            { name: "Insurance", value: 0 },
            { name: "Healthcare", value: 0 },
            { name: "Clothes", value: 0 },
            { name: "Others", value: 0 },
        ]

        barplotData = barplotData.map((category) => {
            // Find if there's a matching category in `data`
            const matchingData = data.find((d) => d.name === category.name);

            // If matching data exists, update the value
            if (matchingData) {
                return {
                    ...category,
                    value: category.value + matchingData.value,
                };
            }

            // Otherwise, return the category unchanged
            return category;
        });

        data = barplotData

        const margin = { top: 30, right: 30, bottom: 70, left: 60 };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        // Select the SVG element and clear it for re-rendering
        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove(); // Clear previous chart content

        const g = svg
            .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        // Sort the data based on values
        // const sortedData = [...data].sort((a, b) => b.value - a.value);

        // X axis scale (for categorical names)
        const x = d3
            .scaleBand()
            .range([0, innerWidth])
            .domain(data.map((d) => d.name))
            .padding(0.2);

        // Y axis scale (for numeric values)
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
            .attr("fill", "#69b3a2");

        // Append the Y axis to the SVG
        g.append("g").call(d3.axisLeft(y));

        // Append the X axis to the SVG
        g.append("g")
            .attr("transform", `translate(0, ${innerHeight})`)
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end");



        // Draw the bars

    }, [width, height, data]); // Re-render if width, height, or data changes

    return (
        <svg
            ref={svgRef}
            width={width}
            height={height}
        />
    );
};
