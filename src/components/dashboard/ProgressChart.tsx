
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const data = [
  { day: '1', tasks: 3, completion: 4 },
  { day: '3', tasks: 5, completion: 6 },
  { day: '6', tasks: 7, completion: 8 },
  { day: '9', tasks: 9, completion: 11 },
  { day: '12', tasks: 11, completion: 14 },
  { day: '15', tasks: 13, completion: 16 },
  { day: '18', tasks: 15, completion: 19 },
  { day: '21', tasks: 18, completion: 22 },
  { day: '24', tasks: 20, completion: 24 },
];

const ProgressChart = () => {
  return (
    <div className="h-[250px] md:h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
          <XAxis 
            dataKey="day" 
            stroke="#8A93A6" 
            fontSize={12}
            tickLine={false}
            axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
          />
          <YAxis 
            stroke="#8A93A6"
            fontSize={12}
            tickLine={false}
            axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
            ticks={[6, 12, 18, 24]}
          />
          <Line
            type="monotone"
            dataKey="completion"
            stroke="#00E5FF"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6 }}
            isAnimationActive={true}
          />
          <Line
            type="monotone"
            dataKey="tasks"
            stroke="#00806e"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6 }}
            isAnimationActive={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProgressChart;
