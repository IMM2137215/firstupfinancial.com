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
      <header>
        <h2 className="text-2xl font-bold text-gray-900">Tri-Bureau Analysis</h2>
        <p className="text-gray-600 mt-2">
          We compare your data across Experian, Equifax, and TransUnion to find factual inconsistencies. 
          Under FCRA, if data doesn't match, it may be deemed inaccurate.
        </p>
      </header>

      <div className="space-y-4">
        {MOCK_CREDIT_ACCOUNTS.map((account) => (
          <div key={account.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div 
              className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => setSelectedAccount(selectedAccount === account.id ? null : account.id)}
            >
              <div>
                <h3 className="font-bold text-gray-900">{account.creditorName}</h3>
                <span className="text-xs font-medium px-2 py-0.5 rounded bg-gray-200 text-gray-700 mt-1 inline-block">
                  {account.type}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                 <span className="text-sm text-indigo-600 font-medium">
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
              <div className="p-4 overflow-x-auto">
                <table className="min-w-full text-sm text-left">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="py-2 pl-2 font-medium text-gray-500">Data Point</th>
                      <th className="py-2 px-2 font-bold text-red-600">Experian</th>
                      <th className="py-2 px-2 font-bold text-yellow-600">Equifax</th>
                      <th className="py-2 px-2 font-bold text-blue-600">TransUnion</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    <tr>
                      <td className="py-3 pl-2 font-medium text-gray-700">Balance</td>
                      <td className="py-3 px-2 text-gray-600">${account.data[Bureau.EXPERIAN]?.balance ?? '-'}</td>
                      <td className="py-3 px-2 text-gray-600">${account.data[Bureau.EQUIFAX]?.balance ?? '-'}</td>
                      <td className="py-3 px-2 text-gray-600">${account.data[Bureau.TRANSUNION]?.balance ?? '-'}</td>
                    </tr>
                    <tr>
                      <td className="py-3 pl-2 font-medium text-gray-700">Status</td>
                      <td className="py-3 px-2 text-gray-600">{account.data[Bureau.EXPERIAN]?.status ?? '-'}</td>
                      <td className="py-3 px-2 text-gray-600">{account.data[Bureau.EQUIFAX]?.status ?? '-'}</td>
                      <td className="py-3 px-2 text-gray-600">{account.data[Bureau.TRANSUNION]?.status ?? '-'}</td>
                    </tr>
                    <tr>
                      <td className="py-3 pl-2 font-medium text-gray-700">Date Opened</td>
                      <td className="py-3 px-2 text-gray-600">{account.data[Bureau.EXPERIAN]?.dateOpened ?? '-'}</td>
                      <td className="py-3 px-2 text-gray-600">{account.data[Bureau.EQUIFAX]?.dateOpened ?? '-'}</td>
                      <td className="py-3 px-2 text-gray-600">{account.data[Bureau.TRANSUNION]?.dateOpened ?? '-'}</td>
                    </tr>
                    <tr>
                      <td className="py-3 pl-2 font-medium text-gray-700">Last Active</td>
                      <td className="py-3 px-2 text-gray-600">{account.data[Bureau.EXPERIAN]?.lastActivity ?? '-'}</td>
                      <td className="py-3 px-2 text-gray-600">{account.data[Bureau.EQUIFAX]?.lastActivity ?? '-'}</td>
                      <td className="py-3 px-2 text-gray-600">{account.data[Bureau.TRANSUNION]?.lastActivity ?? '-'}</td>
                    </tr>
                  </tbody>
                </table>
                
                <div className="mt-6 flex justify-end">
                  <button 
                    onClick={() => onDispute(account)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold shadow-md hover:shadow-lg transition-all flex items-center"
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
