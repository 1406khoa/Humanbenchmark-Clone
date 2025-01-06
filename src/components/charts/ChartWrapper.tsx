import React, { memo } from 'react';
import { ResponsiveContainer } from 'recharts';

interface ChartWrapperProps {
  children: React.ReactNode;
  height?: number;
}

export const ChartWrapper = memo(function ChartWrapper({ 
  children, 
  height = 300 
}: ChartWrapperProps) {
  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer>
        {children}
      </ResponsiveContainer>
    </div>
  );
});