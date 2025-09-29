'use client';

import React from 'react';
import { BarChartDataPoint, ChartDimensions } from './types';

interface BarChartProps extends ChartDimensions {
  data: BarChartDataPoint[];
  className?: string;
}

export function BarChart({
  data,
  width = 400,
  height = 200,
  className = ""
}: BarChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className={`flex items-center justify-center ${className}`} style={{ width, height }}>
        <p className="text-muted-foreground">No data available</p>
      </div>
    );
  }

  const maxValue = Math.max(...data.map(d => d.value));
  const barWidth = width / data.length - 10;

  return (
    <div className={`space-y-4 ${className}`}>
      <svg width={width} height={height + 60} className="border rounded">
        {data.map((item, i) => {
          const barHeight = (item.value / maxValue) * height;
          const x = i * (width / data.length) + 5;
          const y = height - barHeight;

          return (
            <g key={i}>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                className={item.color}
                rx="4"
              />
              <text
                x={x + barWidth / 2}
                y={y - 5}
                textAnchor="middle"
                className="text-xs fill-gray-600"
              >
                {item.value}%
              </text>
              <text
                x={x + barWidth / 2}
                y={height + 20}
                textAnchor="middle"
                className="text-xs fill-gray-600"
              >
                {item.category}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}