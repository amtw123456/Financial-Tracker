import { useMemo } from "react";
import * as d3 from "d3";

type DataItem = {
    name: string;
    value: number;
};
type DonutChartProps = {
    width: number;
    height: number;
    data: DataItem[];
};

const MARGIN = 20;

const colors = [
    "#e0ac2b",
    "#e85252",
    "#6689c6",
    "#9a6fb0",
    "#a53253",
    "#69b3a2",
];

export const SunburstChart = ({ width, height, data }: DonutChartProps) => {
    const radius = Math.min(width, height) / 2 - MARGIN;
    const radius1 = Math.min(width, height) / 4 - MARGIN + 20;

    const pie = useMemo(() => {
        const pieGenerator = d3.pie<any, DataItem>().value((d) => d.value);
        return pieGenerator(data);
    }, [data]);

    const arcs = useMemo(() => {
        const arcPathGenerator = d3.arc();
        return pie.map((p) =>
            arcPathGenerator({
                innerRadius: 250,
                outerRadius: radius,
                startAngle: p.startAngle,
                endAngle: p.endAngle,
            })
        );
    }, [radius, pie]);

    const arcs1 = useMemo(() => {
        const arcPathGenerator = d3.arc();
        return pie.map((p) =>
            arcPathGenerator({
                innerRadius: 100,
                outerRadius: radius1,
                startAngle: p.startAngle,
                endAngle: p.endAngle,

            })
        );
    }, [radius1, pie]);


    return (
        <svg width={width} height={height} style={{ display: "inline-block" }}>
            <g transform={`translate(${width / 2}, ${height / 2})`}>
                {arcs.map((arc, i) => {
                    return <path key={i} d={arc!} fill={colors[i]} stroke="black" strokeWidth={2} />;
                })}
            </g>
            <g transform={`translate(${width / 2}, ${height / 2})`}>
                {arcs1.map((arc, i) => {
                    return <path key={i} d={arc!} fill={colors[i]} stroke="black" strokeWidth={2} />;
                })}
            </g>
        </svg>
    );
};
