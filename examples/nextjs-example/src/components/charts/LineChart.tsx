'use client';

import React from 'react';
import { LineChartDataPoint, ChartDimensions } from './types';

interface LineChartProps extends ChartDimensions {
  data: LineChartDataPoint[];
  className?: string;
}

export function LineChart({
  data,
  width = 400,
  height = 200,
  className = ""
}: LineChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className={`flex items-center justify-center ${className}`} style={{ width, height }}>
        <p className="text-muted-foreground">No data available</p>
      </div>
    );
  }

  const maxValue = Math.max(...data.map(d => Math.max(d.sales, d.profit)));
  const points = data.map((d, i) => ({
    x: (i / (data.length - 1)) * width,
    sales: height - (d.sales / maxValue) * height,
    profit: height - (d.profit / maxValue) * height,
  }));

  const salesPath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.sales}`).join(' ');
  const profitPath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.profit}`).join(' ');

  return (
    <div className={`space-y-4 ${className}`}>
      <svg width={width} height={height + 60} className="border rounded">
        <defs>
          <linearGradient id="salesGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {Array.from({ length: 5 }, (_, i) => (
          <line
            key={i}
            x1="0"
            y1={(i / 4) * height}
            x2={width}
            y2={(i / 4) * height}
            stroke="#e5e7eb"
            strokeWidth="1"
          />
        ))}

        {/* Sales line */}
        <path
          d={salesPath}
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2"
        />

        {/* Profit line */}
        <path
          d={profitPath}
          fill="none"
          stroke="#10b981"
          strokeWidth="2"
        />

        {/* Data points */}
        {points.map((point, i) => (
          <g key={i}>
            <circle cx={point.x} cy={point.sales} r="4" fill="#3b82f6" />
            <circle cx={point.x} cy={point.profit} r="4" fill="#10b981" />
            <text
              x={point.x}
              y={height + 20}
              textAnchor="middle"
              className="text-xs fill-gray-600"
            >
              {data[i].month}
            </text>
          </g>
        ))}
      </svg>

      {/* Legend */}
      <div className="flex gap-4 justify-center">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded"></div>
          <span className="text-sm">Sales</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded"></div>
          <span className="text-sm">Profit</span>
        </div>
      </div>
    </div>
  );
}