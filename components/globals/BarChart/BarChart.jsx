"use client";
import { useTheme } from "next-themes";
import {
    BarChart as BarGraph,
    ResponsiveContainer,
    XAxis,
    YAxis,
    Bar,
} from "recharts";

const BarChart = ({ data }) => {
    const { theme } = useTheme();

    return (
        <ResponsiveContainer className="!h-[350px] sm:!h-[400px] md:!h-[500px]" width={"100%"}>
            <BarGraph
                data={data}
                margin={{
                    top: 5,
                    right: 20,
                    bottom: 5,
                }}
            >
                <XAxis
                    dataKey={"name"}
                    tickLine={false}
                    axisLine={false}
                    stroke="#a3a3a3"
                    fontSize={14}
                />
                <YAxis
                    tickLine={false}
                    axisLine={false}
                    stroke="#a3a3a3"
                    fontSize={14}
                    tickFormatter={(value) => `$${value}`}
                />
                <Bar
                    fill={theme === "system" ? "#64748b" : theme === "dark" ? "#cbd5e1" : "#1e293b"}
                    dataKey={"total"}
                    radius={[4, 4, 0, 0, 0, 4]}
                />
            </BarGraph>
        </ResponsiveContainer>
    );
}

export default BarChart;