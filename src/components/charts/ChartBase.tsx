import React, { memo } from 'react';
import { ResponsiveContainer } from 'recharts';

interface ChartBaseProps {
  children: React.ReactNode;
  height?: number;
}

export const ChartBase = memo(function ChartBase({ 
  children, 
  height = 300 
}: ChartBaseProps) {
  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer>
        {children}
      </ResponsiveContainer>
    </div>
  );
});