"use client";
import { useTheme } from "next-themes";
import {
    BarChart as BarGraph,
    ResponsiveContainer,
    XAxis,
    YAxis,
    Bar
} from "recharts";

const data = [
    {
        name: "Jan",
        total: Math.floor(Math.random() * 5000) + 1000
    },
    {
        name: "Feb",
        total: Math.floor(Math.random() * 5000) + 1000
    },
    {
        name: "Mar",
        total: Math.floor(Math.random() * 5000) + 1000
    },
    {
        name: "Apr",
        total: Math.floor(Math.random() * 5000) + 1000
    },
    {
        name: "May",
        total: Math.floor(Math.random() * 5000) + 1000
    },
    {
        name: "Jun",
        total: Math.floor(Math.random() * 5000) + 1000
    },
    {
        name: "Jul",
        total: Math.floor(Math.random() * 5000) + 1000
    },
    {
        name: "Aug",
        total: Math.floor(Math.random() * 5000) + 1000
    },
    {
        name: "Sep",
        total: Math.floor(Math.random() * 5000) + 1000
    },
    {
        name: "Oct",
        total: Math.floor(Math.random() * 5000) + 1000
    },
    {
        name: "Nov",
        total: Math.floor(Math.random() * 5000) + 1000
    },
    {
        name: "Dec",
        total: Math.floor(Math.random() * 5000) + 1000
    }
];

const BarChart = () => {
    const { theme } = useTheme();

    return (
        <ResponsiveContainer className="!h-[350px] sm:!h-[400px] md:!h-[500px]" width={"100%"}>
            <BarGraph data={data}>
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