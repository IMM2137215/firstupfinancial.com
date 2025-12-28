import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MOCK_SCORES, SCORE_HISTORY } from '../services/mockData';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <header className="border-b border-white/10 pb-6">
        <h2 className="text-4xl font-display font-bold text-white tracking-tight">Financial Overview</h2>
        <p className="text-sm text-gray-300 mt-2 font-mono flex items-center gap-2">
          <span className="inline-block w-2 h-2 bg-accent rounded-full animate-pulse"></span>
          Updated: Just now via Secure API
        </p>
      </header>

      {/* Score Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {MOCK_SCORES.map((bureau) => (
          <div key={bureau.name} className={`glass-panel spotlight-card p-6 rounded-xl border-2 ${bureau.borderColor} relative z-10 hover:scale-105 transition-transform duration-200`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-300 font-semibold text-sm uppercase tracking-wider font-mono">{bureau.name}</h3>
              <svg className={`w-6 h-6 ${bureau.color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div className="flex items-baseline relative z-10">
              <span className={`text-5xl font-display font-bold ${bureau.color}`}>{bureau.score}</span>
              <span className="ml-2 text-lg text-gray-300">/ 850</span>
            </div>
            <div className="mt-4 text-xs font-semibold text-gray-300 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 inline-block">
              Fair Credit
            </div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="glass-panel spotlight-card p-8 rounded-xl border-2 border-white/20 relative">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-display font-bold text-white relative z-10">Score History</h3>
          <span className="text-sm text-gray-300 font-mono bg-white/5 px-3 py-1 rounded-full border border-white/10">6 Months</span>
        </div>
        <div className="h-80 w-full relative z-10">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={SCORE_HISTORY}>
              <defs>
                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.08)" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 13}} />
              <YAxis hide domain={['dataMin - 20', 'dataMax + 20']} />
              <Tooltip
                contentStyle={{
                  borderRadius: '12px',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  backgroundColor: 'rgba(10,10,10,0.98)',
                  boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.3)',
                  color: '#fff',
                  padding: '12px'
                }}
                labelStyle={{ color: '#10B981', fontWeight: 'bold' }}
              />
              <Area
                type="monotone"
                dataKey="score"
                stroke="#10B981"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorScore)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button className="glass-panel p-6 rounded-xl border-2 border-white/20 hover:border-accent/40 transition-all hover:scale-105 group text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-white">Freeze Status</h4>
              <p className="text-sm text-gray-300">Manage freezes</p>
            </div>
          </div>
        </button>

        <button className="glass-panel p-6 rounded-xl border-2 border-white/20 hover:border-accent/40 transition-all hover:scale-105 group text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-white">Dispute Tool</h4>
              <p className="text-sm text-gray-300">Generate letters</p>
            </div>
          </div>
        </button>

        <button className="glass-panel p-6 rounded-xl border-2 border-white/20 hover:border-accent/40 transition-all hover:scale-105 group text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-white">Education</h4>
              <p className="text-sm text-gray-300">Learn more</p>
            </div>
          </div>
        </button>
      </div>

      {/* Compliance Notice */}
      <div className="bg-accent/10 border-2 border-accent/30 rounded-xl p-6 flex items-start space-x-4">
        <div className="w-10 h-10 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center flex-shrink-0">
          <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-sm text-gray-200 leading-relaxed">
          <strong className="text-white font-semibold">Compliance Reminder:</strong> First Up Financial provides software tools for you to manage your own credit. We do not perform credit repair services on your behalf. All disputes are generated for you to print and mail.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
