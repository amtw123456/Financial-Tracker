import React, { useEffect, useRef } from "react";
import * as d3 from "d3";


interface DataItem {
    group: string;
    Income: number;
    Expense: number;
}

type StackedBarChartProps = {
    width: number;
    height: number;
};

export const DoubleBarChart: React.FC<StackedBarChartProps> = ({
    width,
    height,
}) => {
    const svgRef = useRef<SVGSVGElement>(null);

    // Hardcoded data based on your CSV
    const data: DataItem[] = [
        { group: "June", Income: 12, Expense: 1 },
        { group: "July", Income: 6, Expense: 6 },
        { group: "August", Income: 11, Expense: 5 },
        { group: "September", Income: 19, Expense: 5 },
    ];

    // const data: DataItem[] = [
    //     { group: "banana", Nitrogen: 12, normal: 1, stress: 13 },
    //     { group: "poacee", Nitrogen: 6, normal: 6, stress: 33 },
    //     { group: "sorgho", Nitrogen: 11, normal: 28, stress: 12 },
    //     { group: "triticum", Nitrogen: 19, normal: 6, stress: 1 },
    // ];

    useEffect(() => {
        const margin = { top: 10, right: 30, bottom: 20, left: 50 };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        // Clear previous chart content before re-rendering
        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        const g = svg
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const subgroups = ["Income", "Expense"];
        const groups = data.map((d) => d.group);

        // X axis
        const x = d3
            .scaleBand()
            .domain(groups)
            .range([0, innerWidth])
            .padding(0.2);

        g.append("g")
            .attr("transform", `translate(0, ${innerHeight})`)
            .call(d3.axisBottom(x).tickSize(0));

        // Y axis
        const y = d3
            .scaleLinear()
            .domain([0, 40])
            .range([innerHeight, 0]);
        g.append("g").call(d3.axisLeft(y));

        // Subgroup position within groups
        const xSubgroup = d3
            .scaleBand()
            .domain(subgroups)
            .range([0, x.bandwidth()])
            .padding(0.05);

        // Color palette
        const color = d3
            .scaleOrdinal<string>()
            .domain(subgroups)
            .range(["#e41a1c", "#377eb8", "#4daf4a"]);

        // Add bars to the chart
        g.append("g")
            .selectAll("g")
            .data(data)
            .join("g")
            .attr("transform", (d) => `translate(${x(d.group)}, 0)`)
            .selectAll("rect")
            .data((d) =>
                subgroups.map((key) => ({ key, value: d[key as keyof DataItem] as number }))
            )
            .join("rect")
            .attr("x", (d) => xSubgroup(d.key)!)
            .attr("y", (d) => y(d.value))
            .attr("width", xSubgroup.bandwidth())
            .attr("height", (d) => innerHeight - y(d.value))
            .attr("fill", (d) => color(d.key)!);
    }, [width, height, data]);

    return <svg ref={svgRef} width={width} height={height} />;
};
