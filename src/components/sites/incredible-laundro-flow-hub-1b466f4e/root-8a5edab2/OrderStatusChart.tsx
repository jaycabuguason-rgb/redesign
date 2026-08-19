import React from "react";

interface StatusData {
  name: string;
  count: number;
  color: string;
}

interface OrderStatusChartProps {
  data: StatusData[];
}

export function OrderStatusChart({ data }: OrderStatusChartProps) {
  const total = data.reduce((acc, item) => acc + item.count, 0);

  // Calculate SVG donut paths without mutating variables in map
  const radius = 65;
  const strokeWidth = 24;
  const center = 100;
  const circumference = 2 * Math.PI * radius;

  const slices = data.map((item, index) => {
    const percentage = total > 0 ? item.count / total : 0;
    const previousSum = data
      .slice(0, index)
      .reduce((sum, d) => sum + (total > 0 ? d.count / total : 0), 0);

    const strokeDasharray = `${percentage * circumference} ${circumference}`;
    const strokeDashoffset = -previousSum * circumference;

    return {
      ...item,
      strokeDasharray,
      strokeDashoffset,
    };
  });

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-[200px] h-[200px]">
        <svg viewBox="0 0 200 200" className="w-full h-full transform -rotate-90">
          {slices.map((slice, i) => (
            <circle
              key={i}
              cx={center}
              cy={center}
              r={radius}
              fill="transparent"
              stroke={slice.color}
              strokeWidth={strokeWidth}
              strokeDasharray={slice.strokeDasharray}
              strokeDashoffset={slice.strokeDashoffset}
              className="transition-all duration-300 hover:opacity-80"
            />
          ))}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-2xl font-heading font-bold text-foreground">{total}</span>
          <span className="text-xs text-muted-foreground">Active Orders</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
        {data.map((item, i) => (
          <div key={i} className="flex items-center gap-1.5 text-xs">
            <span
              className="w-2.5 h-2.5 rounded-full inline-block shrink-0"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-muted-foreground">
              {item.name} ({item.count})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
