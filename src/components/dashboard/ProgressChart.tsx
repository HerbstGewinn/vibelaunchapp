
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { useTaskProgress } from '@/hooks/useTaskProgress';
import { useDaysSinceStart } from '@/hooks/useDaysSinceStart';

const ProgressChart = () => {
  const { tasks } = useTaskProgress();
  const daysSinceStart = useDaysSinceStart();

  const generateChartData = () => {
    const completedTasks = tasks
      .filter(task => task.completed && task.completed_at)
      .map(task => ({
        day: Math.ceil(
          Math.abs(new Date(task.completed_at!).getTime() - new Date(task.created_at).getTime()) /
          (1000 * 60 * 60 * 24)
        ),
        count: 1
      }));

    const chartData = Array.from({ length: daysSinceStart + 1 }, (_, i) => ({
      day: i,
      tasks: 0
    }));

    let accumulator = 0;
    completedTasks.forEach(task => {
      if (chartData[task.day]) {
        accumulator += task.count;
        chartData[task.day].tasks = accumulator;
      }
    });

    for (let i = 1; i < chartData.length; i++) {
      if (chartData[i].tasks === 0) {
        chartData[i].tasks = chartData[i - 1].tasks;
      }
    }

    return chartData;
  };

  return (
    <div className="w-full h-[300px] bg-launch-dark-blue rounded-lg p-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={generateChartData()}
          margin={{ top: 10, right: 10, left: -20, bottom: 20 }}
        >
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="rgba(255,255,255,0.1)" 
            vertical={false} 
          />
          <XAxis
            dataKey="day"
            stroke="#8A93A6"
            fontSize={12}
            tickLine={false}
            axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
            label={{ 
              value: 'Days Since Start', 
              position: 'bottom', 
              offset: 0,
              fill: '#8A93A6',
              fontSize: 12
            }}
          />
          <YAxis
            stroke="#8A93A6"
            fontSize={12}
            tickLine={false}
            axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
            label={{ 
              value: 'Tasks Completed', 
              angle: -90, 
              position: 'left',
              offset: 35,
              fill: '#8A93A6'
            }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1A1F2C',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              padding: '8px 12px'
            }}
            labelStyle={{ color: '#8A93A6' }}
            itemStyle={{ color: '#00E5FF' }}
          />
          <Line
            type="monotone"
            dataKey="tasks"
            stroke="#00E5FF"
            strokeWidth={3}
            dot={{ r: 4, fill: '#00E5FF', strokeWidth: 2, stroke: 'rgba(0,229,255,0.5)' }}
            activeDot={{ r: 6, fill: '#00E5FF', strokeWidth: 3, stroke: 'rgba(0,229,255,0.7)' }}
            isAnimationActive={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProgressChart;
