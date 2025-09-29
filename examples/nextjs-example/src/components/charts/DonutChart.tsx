'use client';

import React from 'react';
import { PieChartDataPoint } from './types';

interface DonutChartProps {
  data: PieChartDataPoint[];
  className?: string;
}

interface ProcessedDataPoint extends PieChartDataPoint {
  pathData: string;
  percentage: number;
}

export function DonutChart({ data, className = "" }: DonutChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className={`flex items-center justify-center ${className}`} style={{ width: 400, height: 200 }}>
        <p className="text-muted-foreground">No data available</p>
      </div>
    );
  }

  const total = data.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = 0;
  const radius = 80;
  const innerRadius = 50;
  const centerX = 100;
  const centerY = 100;

  const paths: ProcessedDataPoint[] = data.map((item) => {
    const percentage = item.value / total;
    const angle = percentage * 2 * Math.PI;

    const x1 = centerX + radius * Math.cos(currentAngle);
    const y1 = centerY + radius * Math.sin(currentAngle);
    const x2 = centerX + radius * Math.cos(currentAngle + angle);
    const y2 = centerY + radius * Math.sin(currentAngle + angle);

    const x3 = centerX + innerRadius * Math.cos(currentAngle + angle);
    const y3 = centerY + innerRadius * Math.sin(currentAngle + angle);
    const x4 = centerX + innerRadius * Math.cos(currentAngle);
    const y4 = centerY + innerRadius * Math.sin(currentAngle);

    const largeArcFlag = angle > Math.PI ? 1 : 0;

    const pathData = [
      `M ${x1} ${y1}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
      `L ${x3} ${y3}`,
      `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4}`,
      'Z'
    ].join(' ');

    currentAngle += angle;

    return { ...item, pathData, percentage: Math.round(percentage * 100) };
  });

  return (
    <div className={`flex items-center gap-6 ${className}`}>
      <svg width="200" height="200" className="border rounded">
        {paths.map((item, i) => (
          <path
            key={i}
            d={item.pathData}
            className={item.color}
            stroke="white"
            strokeWidth="2"
          />
        ))}
        <text x={centerX} y={centerY} textAnchor="middle" className="text-sm font-medium fill-gray-600">
          Total
        </text>
        <text x={centerX} y={centerY + 15} textAnchor="middle" className="text-lg font-bold fill-gray-800">
          {total}%
        </text>
      </svg>

      <div className="space-y-2">
        {paths.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded ${item.color}`}></div>
            <span className="text-sm">{item.name}</span>
            <span className="text-sm text-gray-500">({item.percentage}%)</span>
          </div>
        ))}
      </div>
    </div>
  );
}