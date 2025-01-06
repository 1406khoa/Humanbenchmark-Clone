import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { generateBellCurvePoints } from '../../utils/statistics';

interface TypingSpeedChartProps {
  wpm: number;
  accuracy: number;
}

export function TypingSpeedChart({ wpm, accuracy }: TypingSpeedChartProps) {
  const ranges = [
    { max: 30, label: 'Beginner', color: 'text-yellow-600' },
    { max: 50, label: 'Average', color: 'text-blue-600' },
    { max: 70, label: 'Above Average', color: 'text-green-600' },
    { max: 90, label: 'Fast', color: 'text-purple-600' },
    { max: 120, label: 'Expert', color: 'text-red-600' },
    { max: Infinity, label: 'Elite', color: 'text-indigo-600' },
  ];

  const userRange = ranges.find(range => wpm <= range.max) || ranges[ranges.length - 1];
  const data = generateBellCurvePoints(50, 20); // Average typing speed is 50 WPM

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 shadow-lg rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">{`${payload[0].value.toFixed(2)}% of people`}</p>
          <p className="text-sm font-medium">{`${payload[0].payload.ms} WPM`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-md space-y-6">
      <div className="flex justify-between items-baseline">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Your Typing Speed</h3>
          <p className="text-sm text-gray-500">Words per minute with {accuracy}% accuracy</p>
        </div>
        <div className="text-right">
          <span className={`text-lg font-bold ${userRange.color}`}>{userRange.label}</span>
          <p className="text-sm text-gray-500">{wpm} WPM</p>
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
              domain={[0, 140]}
              ticks={[0, 30, 50, 70, 90, 120, 140]}
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
            <line
              x1={wpm}
              y1="0%"
              x2={wpm}
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
              {range.max === Infinity ? '120+' : `≤${range.max}`} WPM
            </div>
          </div>
        ))}
      </div>

      <div className="text-center text-sm text-gray-500 mt-4">
        Average typing speed is 50 WPM
      </div>
    </div>
  );
}