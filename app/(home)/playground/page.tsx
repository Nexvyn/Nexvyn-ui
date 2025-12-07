"use client";
import { motion, useMotionValue, useAnimation } from "framer-motion";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import React, { useEffect, useRef } from "react";
export const description = "A line chart with dots";
const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

const Page = () => {
  const deltaX = useRef(0);
  const deltaY = useRef(0);
  const controls = useAnimation();

  const text =
    "Pixel Perfect UI library give it a start right fucking now hehehehe :)";
  const letter = text.split(" ");

  console.log(letter);

  useEffect(() => {
    let oldX = 0;
    let oldY = 0;

    const handleUpdateDelta = (e: MouseEvent) => {
      deltaX.current = e.clientX - oldX;
      deltaY.current = e.clientY - oldY;

      oldX = e.clientX;
      oldY = e.clientY;
    };

    window.addEventListener("mousemove", handleUpdateDelta);

    return () => {
      window.removeEventListener("mousemove", handleUpdateDelta);
    };
  }, []);

  const handleMouseEnter = () => {
    controls.start({
      x: 0,
      y: 0,
      rotate: 0,
      transition: {
        x: { type: "inertia", velocity: deltaX.current * 20, bounce: 0 },
        y: { type: "inertia", velocity: deltaY.current * 20, bounce: 0 },
        rotate: {
          type: "inertia",
          velocity: (Math.random() - 0.5) * 300,
          bounce: 0,
        },
      },
    });
  };

  return (
    <div className=" flex justify-center items-center h-screen w-full">
      {/* <Card>
        <CardContent className=" w-md mt-4">
          <ChartContainer config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
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
                content={
                  <ChartTooltipContent
                    indicator="dashed"
                    className=" rounded-none font-pixelify border-none"
                    hideLabel
                  />
                }
              />
              <defs>
                <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-desktop)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-desktop)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <Line
                dataKey="desktop"
                type="linear"
                stroke="var(--color-desktop)"
                strokeWidth={2}
                dot={{
                  fill: "var(--color-desktop)",
                }}
                activeDot={{
                  r: 6,
                }}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card> */}
      <div className=" flex gap-1.5  flex-wrap">
        {letter.map((char, index) => {
          const controls = useAnimation(); // <-- moved inside map so each has its own controller

          const handleMouseEnter = () => {
            controls.start({
              x: 0,
              y: 0,
              rotate: 0,
              transition: {
                x: {
                  type: "inertia",
                  velocity: deltaX.current * 4,
                  bounce: 0,
                },
                y: {
                  type: "inertia",
                  velocity: deltaY.current * 4,
                  bounce: 0,
                },
                rotate: {
                  type: "inertia",
                  velocity: (Math.random() - 0.5) * 50,
                  bounce: 0,
                },
              },
            });
          };

          return (
            <motion.div
              key={index}
              onMouseEnter={handleMouseEnter}
              animate={controls}
              drag
              dragTransition={{ power: 0.3, timeConstant: 200 }}
              className="border px-1"
            >
              {char}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Page;
