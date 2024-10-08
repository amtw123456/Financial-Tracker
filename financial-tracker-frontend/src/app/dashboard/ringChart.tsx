import { useMemo, useEffect, useRef, useState } from "react";
import * as d3 from "d3";

type DataItem = {
    name: string;
    value: number;
};

type DonutChartProps = {
    height: number; // Fixed height input
    categoryExpenseData: DataItem[];
};

const MARGIN = 20;

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

export const RingChart = ({ height, categoryExpenseData }: DonutChartProps) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const [width, setWidth] = useState(0); // Dynamically set width

    useEffect(() => {
        // Function to update width based on parent container or window size
        const updateWidth = () => {
            if (svgRef.current) {
                const parentWidth = svgRef.current.parentElement?.offsetWidth || 0;
                setWidth(parentWidth); // Set the width based on the container's width
            }
        };

        // Set initial width
        updateWidth();

        // Update width when window is resized
        window.addEventListener("resize", updateWidth);
        return () => window.removeEventListener("resize", updateWidth);
    }, []);

    const radius = Math.min(width, height) / 2 - MARGIN;

    // No sorting is performed here; it maintains the original order
    const pie = useMemo(() => {
        const pieGenerator = d3.pie<DataItem>().value((d) => d.value).sort(null); // Disable sorting to maintain original order
        return pieGenerator(categoryExpenseData); // This keeps the order intact
    }, [categoryExpenseData]);

    const arcs = useMemo(() => {
        const arcPathGenerator = d3.arc();
        return pie.map((p) =>
            arcPathGenerator({
                innerRadius: 100,
                outerRadius: radius,
                startAngle: p.startAngle,
                endAngle: p.endAngle,
            })
        );
    }, [radius, pie]);

    return (
        <svg ref={svgRef} width={width} height={height} style={{ display: "inline-block" }}>
            <g transform={`translate(${width / 2}, ${height / 2})`}>
                {arcs.map((arc, i) => {
                    return <path key={i} d={arc!} fill={colors[i % colors.length]} strokeWidth={2} />;
                })}
            </g>
        </svg>
    );
};
