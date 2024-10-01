import { useMemo } from "react";
import * as d3 from "d3";

type DataItem = {
    name: string;
    value: number;
};

type DonutChartProps = {
    width: number;
    height: number;
    categoryExpenseData: DataItem[];
};

const MARGIN = 20;

// const colors = [
//     "#3b82f6", // blue-500
//     "#22c55e", // green-500
//     "#eab308", // yellow-500
//     "#9333ea", // purple-500
//     "#ef4444", // red-500
//     "#fb923c", // orange-500
//     "#ec4899", // pink-500
//     "#1e40af", // blue-800
//     "#7c2d12", // yellow-800
//     "#60a5fa", // blue-200
// ];

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


export const RingChart = ({ width, height, categoryExpenseData }: DonutChartProps) => {
    const radius = Math.min(width, height) / 2 - MARGIN;

    const pie = useMemo(() => {
        const pieGenerator = d3.pie<any, DataItem>().value((d) => d.value);
        return pieGenerator(categoryExpenseData);
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
        <svg width={width} height={height} style={{ display: "inline-block" }}>
            <g transform={`translate(${width / 2}, ${height / 2})`}>
                {arcs.map((arc, i) => {
                    return <path key={i} d={arc!} fill={colors[i]} strokeWidth={2} />;
                })}
            </g>
        </svg>
    );
};
