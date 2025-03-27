"use client"

import { TrendingUp } from "lucide-react"
import { Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
  { status: "NeedToApply", number: 275, fill: "hsl(210 40% 98%)" },
  { status: "Pending", number: 200, fill: "var(--chart-3)" },
  { status: "Interview", number: 187, fill: "var(--chart-1)" },
  { status: "TechinalTest", number: 173, fill: "var(--chart-4)" },
  { status: "Accepted", number: 90, fill: "var(--chart-2)" },
  { status: "Rejected", number: 90, fill: "var(--chart-5)" },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  NeedToApply: {
    label: "Need to apply",
    color: "hsl(210 40% 98%)",
  },
  Pending: {
    label: "Pending",
    color: "hsl(var(--chart-2))",
  },
  Interview: {
    label: "Interview",
    color: "hsl(var(--chart-3))",
  },
  TechinalTest: {
    label: "Techinal Test",
    color: "hsl(var(--chart-4))",
  },
  Accepted: {
    label: "Accepted",
    color: "hsl(var(--chart-5))",
  },
  Rejected: {
    label: "Rejected",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

function Chart() {
  return (
    <Card className="flex flex-col w-md min-w-xs">
      <CardHeader className="items-center pb-0">
        <CardTitle>Status</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Pie data={chartData} dataKey="number" label nameKey="status" />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default Chart;