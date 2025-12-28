import React from 'react';

const BlindSpotDashboard: React.FC = () => {
  return (
    <div className="relative p-8 z-10 h-full flex flex-col min-h-[400px]">
      {/* Top Section: The Public View */}
      <div className="mb-6 opacity-60">
        <h3 className="font-display font-semibold text-lg md:text-xl mb-4 tracking-tight text-gray-400 uppercase">
          Standard Credit Monitoring
        </h3>
        
        <div className="space-y-4">
          {/* Credit Score - Dimmed */}
          <div className="flex items-center gap-4">
            <div className="text-5xl font-display font-bold text-gray-500">720</div>
            <div className="text-sm text-gray-500">/ 850</div>
          </div>

          {/* Standard Bureaus - Dimmed Icons */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-gray-700/50 flex items-center justify-center">
                <span className="text-xs text-gray-500 font-bold">E</span>
              </div>
              <span className="text-xs text-gray-500 font-mono">Equifax</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-gray-700/50 flex items-center justify-center">
                <span className="text-xs text-gray-500 font-bold">T</span>
              </div>
              <span className="text-xs text-gray-500 font-mono">TransUnion</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-gray-700/50 flex items-center justify-center">
                <span className="text-xs text-gray-500 font-bold">X</span>
              </div>
              <span className="text-xs text-gray-500 font-mono">Experian</span>
            </div>
          </div>

          {/* Status Badge - Gray */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-800/50 border border-gray-700/50">
            <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6.11 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
            <span className="text-xs font-mono text-gray-500 font-semibold">No Issues Detected</span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/20 my-6"></div>

      {/* Bottom Section: The First Up View */}
      <div className="flex-1">
        <h3 className="font-display font-bold text-xl md:text-2xl mb-4 tracking-tight" style={{ color: '#ffffff' }}>
          True Risk Architecture
        </h3>

        <div className="space-y-4">
          {/* Risk Gauge */}
          <div className="relative">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono uppercase tracking-wider" style={{ color: 'rgba(251, 146, 60, 0.9)' }}>
                Risk Level
              </span>
              <span className="text-lg font-display font-bold" style={{ color: '#F59E0B' }}>HIGH RISK</span>
            </div>
            {/* Risk Bar */}
            <div className="h-3 bg-white/5 rounded-full overflow-hidden border border-white/10">
              <div 
                className="h-full bg-gradient-to-r from-amber-500 to-red-500 rounded-full"
                style={{ 
                  width: '85%',
                  boxShadow: '0 0 10px rgba(245, 158, 11, 0.5)'
                }}
              ></div>
            </div>
          </div>

          {/* Hidden Data List */}
          <div className="space-y-3">
            {/* ChexSystems with Warning */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-red-500/10 border border-red-500/30">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-red-500 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
                <span className="font-mono font-semibold text-sm" style={{ color: '#ffffff' }}>ChexSystems</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-red-400 animate-pulse">⚠️</span>
                <span className="text-xs font-mono text-red-400 font-semibold">BLOCKING APPROVAL</span>
              </div>
            </div>

            {/* LexisNexis with Warning */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-amber-500 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
                <span className="font-mono font-semibold text-sm" style={{ color: '#ffffff' }}>LexisNexis</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-amber-400 animate-pulse">⚠️</span>
                <span className="text-xs font-mono text-amber-400 font-semibold">DATA MISMATCH</span>
              </div>
            </div>

            {/* Innovis */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6.11 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
                <span className="font-mono font-semibold text-sm" style={{ color: '#ffffff' }}>Innovis</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-8 pt-6 border-t border-white/20">
        <button 
          className="w-full py-4 px-6 rounded-lg font-mono font-bold text-sm uppercase tracking-wider transition-all relative overflow-hidden group"
          style={{
            border: '2px solid #10B981',
            background: 'rgba(16, 185, 129, 0.1)',
            color: '#10B981',
            boxShadow: '0 0 20px rgba(16, 185, 129, 0.3), inset 0 0 20px rgba(16, 185, 129, 0.1)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 0 30px rgba(16, 185, 129, 0.5), inset 0 0 30px rgba(16, 185, 129, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 0 20px rgba(16, 185, 129, 0.3), inset 0 0 20px rgba(16, 185, 129, 0.1)';
          }}
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            RESOLVE BLIND SPOTS
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
};

export default BlindSpotDashboard;

