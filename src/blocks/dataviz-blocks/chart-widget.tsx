import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';
import { cn } from '../../components/ui/utils';

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string;
    borderWidth?: number;
  }[];
}

export interface ChartWidgetProps {
  title: string;
  subtitle?: string;
  data: ChartData;
  type: 'line' | 'bar' | 'pie' | 'doughnut' | 'area';
  height?: number;
  className?: string;
  loading?: boolean;
  error?: string;
  showLegend?: boolean;
  showGridlines?: boolean;
  exportable?: boolean;
  refreshable?: boolean;
  onRefresh?: () => void;
  onExport?: (format: 'png' | 'svg' | 'pdf') => void;
  customActions?: React.ReactNode;
}

export function ChartWidget({
  title,
  subtitle,
  data,
  type,
  height = 300,
  className,
  loading = false,
  error,
  showLegend = true,
  showGridlines = true,
  exportable = false,
  refreshable = false,
  onRefresh,
  onExport,
  customActions,
}: ChartWidgetProps) {

  // สร้าง mock chart สำหรับ demo (ในการใช้งานจริงจะใช้ chart library เช่น Chart.js, Recharts)
  const renderMockChart = () => {
    if (!data.datasets.length || !data.labels.length) {
      return (
        <div className="flex items-center justify-center h-full text-muted-foreground">
          ไม่มีข้อมูลสำหรับแสดงกราฟ
        </div>
      );
    }

    // Mock chart visualization based on type
    switch (type) {
      case 'line':
      case 'area':
        return (
          <div className="relative w-full h-full">
            <svg width="100%" height="100%" viewBox="0 0 400 200" className="border rounded">
              {/* Grid lines */}
              {showGridlines && (
                <g className="stroke-muted opacity-30">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <line key={i} x1={i * 80} y1="0" x2={i * 80} y2="200" strokeWidth="1" />
                  ))}
                  {[0, 1, 2, 3, 4].map((i) => (
                    <line key={i} x1="0" y1={i * 40} x2="400" y2={i * 40} strokeWidth="1" />
                  ))}
                </g>
              )}
              {/* Mock line chart */}
              <polyline
                points={data.datasets[0]?.data?.map((value, index) =>
                  `${(index / ((data.datasets[0]?.data?.length || 1) - 1)) * 380 + 10},${190 - (value / Math.max(...(data.datasets[0]?.data || [1]))) * 180}`
                ).join(' ') || ''}
                fill={type === 'area' ? (Array.isArray(data.datasets[0]?.backgroundColor) ? data.datasets[0]?.backgroundColor[0] : data.datasets[0]?.backgroundColor) || 'hsl(var(--chart-1) / 0.2)' : 'none'}
                stroke={data.datasets[0]?.borderColor || 'hsl(var(--chart-1))'}
                strokeWidth={data.datasets[0]?.borderWidth || 2}
                className="transition-all duration-300"
              />
              {/* Data points */}
              {data.datasets[0]?.data?.map((value, index) => (
                <circle
                  key={index}
                  cx={(index / ((data.datasets[0]?.data?.length || 1) - 1)) * 380 + 10}
                  cy={190 - (value / Math.max(...(data.datasets[0]?.data || [1]))) * 180}
                  r="3"
                  fill={data.datasets[0]?.borderColor || 'hsl(var(--chart-1))'}
                  className="transition-all duration-300 hover:r-4"
                />
              )) || []}
            </svg>
          </div>
        );

      case 'bar':
        return (
          <div className="relative w-full h-full">
            <svg width="100%" height="100%" viewBox="0 0 400 200" className="border rounded">
              {/* Grid lines */}
              {showGridlines && (
                <g className="stroke-muted opacity-30">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <line key={i} x1="0" y1={i * 40} x2="400" y2={i * 40} strokeWidth="1" />
                  ))}
                </g>
              )}
              {/* Mock bar chart */}
              {data.datasets[0]?.data?.map((value, index) => {
                const dataLength = data.datasets[0]?.data?.length || 1;
                const dataArray = data.datasets[0]?.data || [];
                const barWidth = 300 / dataLength - 10;
                const barHeight = (value / Math.max(...dataArray)) * 180;
                return (
                  <rect
                    key={index}
                    x={50 + index * (barWidth + 10)}
                    y={190 - barHeight}
                    width={barWidth}
                    height={barHeight}
                    fill={Array.isArray(data.datasets[0]?.backgroundColor)
                      ? data.datasets[0]?.backgroundColor?.[index] || 'hsl(var(--chart-1))'
                      : data.datasets[0]?.backgroundColor || 'hsl(var(--chart-1))'}
                    className="transition-all duration-300 hover:opacity-80"
                  />
                );
              }) || []}
            </svg>
          </div>
        );

      case 'pie':
      case 'doughnut':
        const total = data.datasets[0]?.data?.reduce((sum, value) => sum + value, 0) || 0;
        let cumulativeAngle = 0;
        const centerX = 100;
        const centerY = 100;
        const radius = type === 'doughnut' ? 70 : 80;
        const innerRadius = type === 'doughnut' ? 35 : 0;

        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <svg width="200" height="200" viewBox="0 0 200 200">
              {data.datasets[0]?.data?.map((value, index) => {
                const angle = (value / total) * 360;
                const startAngle = cumulativeAngle;
                const endAngle = cumulativeAngle + angle;

                // Calculate path for arc
                const startX = centerX + radius * Math.cos((startAngle - 90) * Math.PI / 180);
                const startY = centerY + radius * Math.sin((startAngle - 90) * Math.PI / 180);
                const endX = centerX + radius * Math.cos((endAngle - 90) * Math.PI / 180);
                const endY = centerY + radius * Math.sin((endAngle - 90) * Math.PI / 180);

                const largeArcFlag = angle > 180 ? 1 : 0;

                let pathData = '';
                if (type === 'doughnut') {
                  const innerStartX = centerX + innerRadius * Math.cos((startAngle - 90) * Math.PI / 180);
                  const innerStartY = centerY + innerRadius * Math.sin((startAngle - 90) * Math.PI / 180);
                  const innerEndX = centerX + innerRadius * Math.cos((endAngle - 90) * Math.PI / 180);
                  const innerEndY = centerY + innerRadius * Math.sin((endAngle - 90) * Math.PI / 180);

                  pathData = `
                    M ${startX} ${startY}
                    A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}
                    L ${innerEndX} ${innerEndY}
                    A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${innerStartX} ${innerStartY}
                    Z
                  `;
                } else {
                  pathData = `
                    M ${centerX} ${centerY}
                    L ${startX} ${startY}
                    A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}
                    Z
                  `;
                }

                cumulativeAngle += angle;

                const colors = [
                  'hsl(var(--chart-1))',
                  'hsl(var(--chart-2))',
                  'hsl(var(--chart-3))',
                  'hsl(var(--chart-4))',
                  'hsl(var(--chart-5))',
                  'hsl(var(--primary))'
                ];

                return (
                  <path
                    key={index}
                    d={pathData}
                    fill={Array.isArray(data.datasets[0]?.backgroundColor)
                      ? data.datasets[0]?.backgroundColor?.[index] || colors[index % colors.length]
                      : colors[index % colors.length]}
                    stroke="white"
                    strokeWidth="2"
                    className="transition-all duration-300 hover:opacity-80"
                  />
                );
              }) || []}
            </svg>
          </div>
        );

      default:
        return <div className="flex items-center justify-center h-full">Unsupported chart type</div>;
    }
  };

  const handleExport = (format: 'png' | 'svg' | 'pdf') => {
    if (onExport) {
      onExport(format);
    } else {
      // Default export logic here
      console.log(`Exporting chart as ${format}`);
    }
  };

  const renderLegend = () => {
    if (!showLegend || !data.datasets.length) return null;

    const colors = [
      'hsl(var(--chart-1))',
      'hsl(var(--chart-2))',
      'hsl(var(--chart-3))',
      'hsl(var(--chart-4))',
      'hsl(var(--chart-5))',
      'hsl(var(--primary))'
    ];

    return (
      <div className="flex flex-wrap gap-2 mt-2">
        {(type === 'pie' || type === 'doughnut') ? (
          data.labels.map((label, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded-full bg-[var(--legend-color)]"
                style={{
                  '--legend-color': Array.isArray(data.datasets[0]?.backgroundColor)
                    ? data.datasets[0]?.backgroundColor?.[index] || colors[index % colors.length]
                    : colors[index % colors.length]
                } as React.CSSProperties}
              />
              <span className="text-xs text-muted-foreground">{label}</span>
            </div>
          ))
        ) : (
          data.datasets.map((dataset, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded-sm bg-[var(--dataset-color)]"
                style={{
                  '--dataset-color': dataset.borderColor || (Array.isArray(dataset.backgroundColor) ? dataset.backgroundColor[0] : dataset.backgroundColor) || colors[index % colors.length]
                } as React.CSSProperties}
              />
              <span className="text-xs text-muted-foreground">{dataset.label}</span>
            </div>
          ))
        )}
      </div>
    );
  };

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">{title}</CardTitle>
            {subtitle && (
              <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {refreshable && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onRefresh}
                disabled={loading}
              >
                <svg
                  className={cn('w-4 h-4', loading && 'animate-spin')}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </Button>
            )}

            {exportable && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M9 5h6a2 2 0 012 2v10a2 2 0 01-2 2H9a2 2 0 01-2-2V7a2 2 0 012-2z" />
                    </svg>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => handleExport('png')}>
                    ส่งออกเป็น PNG
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleExport('svg')}>
                    ส่งออกเป็น SVG
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleExport('pdf')}>
                    ส่งออกเป็น PDF
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {customActions}
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div style={{ height }} className="w-full">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center h-full text-destructive">
              <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <p className="text-sm">{error}</p>
            </div>
          ) : (
            renderMockChart()
          )}
        </div>

        {renderLegend()}
      </CardContent>
    </Card>
  );
}