export interface LineChartDataPoint {
  month: string;
  sales: number;
  profit: number;
}

export interface BarChartDataPoint {
  category: string;
  value: number;
  color: string;
}

export interface PieChartDataPoint {
  name: string;
  value: number;
  color: string;
}

export interface ProgressDataPoint {
  label: string;
  value: number;
  color: string;
}

export interface StatCardData {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
}

export interface ChartFeature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

export interface ChartDimensions {
  width?: number;
  height?: number;
}