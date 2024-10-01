import React, { useEffect, useRef } from "react";
import * as d3 from "d3";


interface DataItem {
    group: any;
    expense: any;
    income: any;
}

type DoubleBarplotProps = {
    width: number;
    height: number;
    data: [string, number, number][];
};

export const DoubleBarChart = ({ width, height, data }: DoubleBarplotProps) => {
    const svgRef = useRef<SVGSVGElement>(null);
    console.log(data)

    const doubleBarPlotData: DataItem[] = data.map((item) => ({
        group: item[0],     // First element as group
        expense: item[1],   // Second element as Expense
        income: item[2],     // Third element as Income
    }));

    console.log(doubleBarPlotData)

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

        const subgroups = ["income", "expense"];
        const groups = doubleBarPlotData.map((d) => d.group);

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
            .domain([0, d3.max(doubleBarPlotData, (d) => Math.max(d.income, d.expense)) || 0])
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
            .data(doubleBarPlotData)
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
