import React, { useState } from 'react';
import { MOCK_CREDIT_ACCOUNTS } from '../services/mockData';
import { Bureau, CreditAccount } from '../types';

interface AnalysisToolProps {
  onDispute: (account: CreditAccount) => void;
}

const AnalysisTool: React.FC<AnalysisToolProps> = ({ onDispute }) => {
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <header className="border-b border-white/10 pb-6">
        <h2 className="text-3xl font-display font-semibold text-white tracking-tight">Tri-Bureau Analysis</h2>
        <p className="text-gray-400 mt-2">
          We compare your data across Experian, Equifax, and TransUnion to find factual inconsistencies.
          Under FCRA, if data doesn't match, it may be deemed inaccurate.
        </p>
      </header>

      <div className="space-y-4">
        {MOCK_CREDIT_ACCOUNTS.map((account) => (
          <div key={account.id} className="glass-panel spotlight-card rounded-xl border border-white/10 overflow-hidden">
            <div
              className="p-4 bg-white/5 border-b border-white/10 flex justify-between items-center cursor-pointer hover:bg-white/10 transition-colors relative z-10"
              onClick={() => setSelectedAccount(selectedAccount === account.id ? null : account.id)}
            >
              <div>
                <h3 className="font-display font-semibold text-white">{account.creditorName}</h3>
                <span className="text-xs font-medium font-mono px-2 py-0.5 rounded bg-white/10 text-gray-300 border border-white/10 mt-1 inline-block">
                  {account.type}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                 <span className="text-sm text-accent font-medium">
                   {selectedAccount === account.id ? 'Hide Details' : 'Analyze'}
                 </span>
                 <svg
                  className={`w-5 h-5 text-gray-400 transform transition-transform ${selectedAccount === account.id ? 'rotate-180' : ''}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                 </svg>
              </div>
            </div>

            {selectedAccount === account.id && (
              <div className="p-4 overflow-x-auto relative z-10">
                <table className="min-w-full text-sm text-left">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="py-2 pl-2 font-medium text-gray-400 font-mono">Data Point</th>
                      <th className="py-2 px-2 font-bold text-danger">Experian</th>
                      <th className="py-2 px-2 font-bold text-warning">Equifax</th>
                      <th className="py-2 px-2 font-bold text-blue-400">TransUnion</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    <tr>
                      <td className="py-3 pl-2 font-medium text-gray-300">Balance</td>
                      <td className="py-3 px-2 text-gray-400">${account.data[Bureau.EXPERIAN]?.balance ?? '-'}</td>
                      <td className="py-3 px-2 text-gray-400">${account.data[Bureau.EQUIFAX]?.balance ?? '-'}</td>
                      <td className="py-3 px-2 text-gray-400">${account.data[Bureau.TRANSUNION]?.balance ?? '-'}</td>
                    </tr>
                    <tr>
                      <td className="py-3 pl-2 font-medium text-gray-300">Status</td>
                      <td className="py-3 px-2 text-gray-400">{account.data[Bureau.EXPERIAN]?.status ?? '-'}</td>
                      <td className="py-3 px-2 text-gray-400">{account.data[Bureau.EQUIFAX]?.status ?? '-'}</td>
                      <td className="py-3 px-2 text-gray-400">{account.data[Bureau.TRANSUNION]?.status ?? '-'}</td>
                    </tr>
                    <tr>
                      <td className="py-3 pl-2 font-medium text-gray-300">Date Opened</td>
                      <td className="py-3 px-2 text-gray-400">{account.data[Bureau.EXPERIAN]?.dateOpened ?? '-'}</td>
                      <td className="py-3 px-2 text-gray-400">{account.data[Bureau.EQUIFAX]?.dateOpened ?? '-'}</td>
                      <td className="py-3 px-2 text-gray-400">{account.data[Bureau.TRANSUNION]?.dateOpened ?? '-'}</td>
                    </tr>
                    <tr>
                      <td className="py-3 pl-2 font-medium text-gray-300">Last Active</td>
                      <td className="py-3 px-2 text-gray-400">{account.data[Bureau.EXPERIAN]?.lastActivity ?? '-'}</td>
                      <td className="py-3 px-2 text-gray-400">{account.data[Bureau.EQUIFAX]?.lastActivity ?? '-'}</td>
                      <td className="py-3 px-2 text-gray-400">{account.data[Bureau.TRANSUNION]?.lastActivity ?? '-'}</td>
                    </tr>
                  </tbody>
                </table>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => onDispute(account)}
                    className="bg-accent hover:bg-accent/80 text-black px-5 py-2.5 rounded-lg text-sm font-semibold shadow-md hover:shadow-lg transition-all flex items-center"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Draft Dispute Letter
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalysisTool;
