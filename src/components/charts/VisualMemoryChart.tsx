import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { generateBellCurvePoints } from '../../utils/statistics';

interface VisualMemoryChartProps {
  maxLevel: number;
}

export function VisualMemoryChart({ maxLevel }: VisualMemoryChartProps) {
  // Define level ranges and their descriptions
  const ranges = [
    { max: 3, label: 'Beginner', color: 'text-yellow-600' },
    { max: 6, label: 'Average', color: 'text-blue-600' },
    { max: 9, label: 'Above Average', color: 'text-green-600' },
    { max: 12, label: 'Exceptional', color: 'text-purple-600' },
    { max: 15, label: 'Elite', color: 'text-red-600' },
    { max: Infinity, label: 'Legendary', color: 'text-indigo-600' },
  ];

  // Find where the user's level falls
  const userRange = ranges.find(range => maxLevel <= range.max) || ranges[ranges.length - 1];
  
  // Generate bell curve data points (mean of 6, std dev of 2)
  const data = generateBellCurvePoints(6, 2);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 shadow-lg rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">{`${payload[0].value.toFixed(2)}% of people`}</p>
          <p className="text-sm font-medium">{`Level ${payload[0].payload.ms}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-md space-y-6">
      <div className="flex justify-between items-baseline">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Your Memory Score</h3>
          <p className="text-sm text-gray-500">Based on maximum level reached</p>
        </div>
        <div className="text-right">
          <span className={`text-lg font-bold ${userRange.color}`}>{userRange.label}</span>
          <p className="text-sm text-gray-500">Level {maxLevel}</p>
        </div>
      </div>
      
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
          >
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis
              dataKey="ms"
              type="number"
              domain={[1, 15]}
              ticks={[1, 3, 6, 9, 12, 15]}
              tickFormatter={(value) => `${value}`}
              stroke="#6B7280"
              fontSize={12}
            />
            <YAxis hide />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#4F46E5"
              strokeWidth={2}
              fill="url(#colorValue)"
              isAnimationActive={true}
            />
            {/* Vertical line for user's score */}
            <line
              x1={maxLevel}
              y1="0%"
              x2={maxLevel}
              y2="100%"
              stroke="#4F46E5"
              strokeWidth={2}
              strokeDasharray="5 5"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {ranges.map((range) => (
          <div 
            key={range.max}
            className={`p-3 rounded-lg ${
              userRange.label === range.label 
                ? 'bg-indigo-50 ring-1 ring-indigo-500'
                : 'bg-gray-50'
            }`}
          >
            <div className={`font-medium ${
              userRange.label === range.label ? range.color : 'text-gray-600'
            }`}>
              {range.label}
            </div>
            <div className="text-sm text-gray-500">
              {range.max === Infinity ? '15+' : `≤${range.max}`} levels
            </div>
          </div>
        ))}
      </div>

      <div className="text-center text-sm text-gray-500 mt-4">
        Average person reaches level 6
      </div>
    </div>
  );
}