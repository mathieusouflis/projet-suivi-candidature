import { Pie, PieChart } from "recharts";
import { TrendingUp } from "lucide-react";
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { getStats } from "@/services/statsService";
import { useEffect, useState } from "react";

export function ChartPerStatus() {
  interface ChartDataItem {
    status: string;
    number: number;
    fill: string;
  }
  interface ChartDataMonth {
    month: string;
    desktop: number;
  }

  const [chartData, setChartData] = useState<ChartDataItem[]>([]);
  const [lineData, setLineData] = useState<ChartDataMonth[]>([]);

  const getData = async (): Promise<{
    status: ChartDataItem[];
    month: ChartDataMonth[];
  }> => {
    const stats = await getStats();
    return {
      status: [
        {
          status: "NeedToApply",
          number: stats.data.byStatus["Need to apply"],
          fill: "hsl(210 40% 98%)",
        },
        {
          status: "Pending",
          number: stats.data.byStatus["Pending"],
          fill: "var(--chart-3)",
        },
        {
          status: "Interview",
          number: stats.data.byStatus["Interview"],
          fill: "var(--chart-1)",
        },
        {
          status: "TechinalTest",
          number: stats.data.byStatus["Technical Test"],
          fill: "var(--chart-4)",
        },
        {
          status: "Accepted",
          number: stats.data.byStatus["Accepted"],
          fill: "var(--chart-2)",
        },
        {
          status: "Rejected",
          number: stats.data.byStatus["Rejected"],
          fill: "var(--chart-5)",
        },
      ],
      month: stats.data.byMonth.map((item: ChartDataMonth) => ({
        month: item.month,
        desktop: item.desktop,
      })),
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      setChartData(data.status);
      setLineData(data.month);
    };

    fetchData();
  }, []);

  const camembertConfig = {
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
  } satisfies ChartConfig;
  const lineConfig = {
    desktop: {
      label: "Desktop",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  return (
    <>
      <Card className="flex flex-col w-md min-w-xs">
        <CardHeader className="items-center pb-0">
          <CardTitle>Status</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={camembertConfig}
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
      <Card className="min-w-sm">
        <CardHeader>
          <CardTitle>Total applications per month</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={lineConfig}>
            <LineChart
              accessibilityLayer
              data={lineData}
              margin={{
                top: 20,
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Line
                dataKey="desktop"
                type="natural"
                stroke="var(--chart-2)"
                strokeWidth={2}
                dot={{
                  fill: "var(--chart-2)",
                }}
                activeDot={{
                  r: 6,
                }}
              >
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Line>
            </LineChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium leading-none">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">
            Showing total visitors for the last 6 months
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
