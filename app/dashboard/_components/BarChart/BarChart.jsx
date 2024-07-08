"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
    total: {
        label: "Total",
        color: "#2563eb",
    }
}

const DashboardBarChart = ({ chartData }) => {
    return (
        <>
            <ChartContainer config={chartConfig} className="min-h-[10rem] w-full">
                <BarChart accessibilityLayer data={chartData}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                        dataKey="name"
                        tickLine={false}
                        tickMargin={8}
                        axisLine={false}
                        tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="total" fill="var(--color-total)" radius={4} />
                </BarChart>
            </ChartContainer>
        </>
    )
}

export default DashboardBarChart;