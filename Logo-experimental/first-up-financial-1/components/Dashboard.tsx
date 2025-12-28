import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MOCK_SCORES, SCORE_HISTORY } from '../services/mockData';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <header>
        <h2 className="text-2xl font-bold text-gray-900">Financial Overview</h2>
        <p className="text-sm text-gray-500 mt-1">Updated: Just now via Secure API</p>
      </header>

      {/* Score Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {MOCK_SCORES.map((bureau) => (
          <div key={bureau.name} className={`bg-white p-6 rounded-xl shadow-sm border-t-4 ${bureau.borderColor}`}>
            <h3 className="text-gray-500 font-medium text-sm uppercase tracking-wider">{bureau.name}</h3>
            <div className="mt-4 flex items-baseline">
              <span className={`text-4xl font-extrabold ${bureau.color}`}>{bureau.score}</span>
              <span className="ml-2 text-sm text-gray-400">/ 850</span>
            </div>
            <div className="mt-4 text-xs font-medium text-gray-500 bg-gray-50 rounded-full px-3 py-1 inline-block">
              Fair Credit
            </div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-6">Score History (6 Months)</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={SCORE_HISTORY}>
              <defs>
                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
              <YAxis hide domain={['dataMin - 20', 'dataMax + 20']} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Area 
                type="monotone" 
                dataKey="score" 
                stroke="#4F46E5" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorScore)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Compliance Notice */}
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-start space-x-3">
        <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-sm text-blue-800">
          <strong>Compliance Reminder:</strong> First Up Financial provides software tools for you to manage your own credit. We do not perform credit repair services on your behalf. All disputes are generated for you to print and mail.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
