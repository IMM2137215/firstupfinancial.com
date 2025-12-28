import React, { useState } from 'react';
import { AppView, CreditAccount } from './types';
import { NAV_ITEMS } from './constants';
import Dashboard from './components/Dashboard';
import SecondaryFreeze from './components/SecondaryFreeze';
import AnalysisTool from './components/AnalysisTool';
import DisputeWizard from './components/DisputeWizard';
import EducationHub from './components/EducationHub';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);
  const [selectedDisputeAccount, setSelectedDisputeAccount] = useState<CreditAccount | null>(null);

  const handleStartDispute = (account: CreditAccount) => {
    setSelectedDisputeAccount(account);
    setCurrentView(AppView.DISPUTE_WIZARD);
  };

  const handleDisputeBack = () => {
    setSelectedDisputeAccount(null);
    setCurrentView(AppView.ANALYSIS);
  };

  const renderContent = () => {
    switch (currentView) {
      case AppView.DASHBOARD:
        return <Dashboard />;
      case AppView.SECONDARY_FREEZE:
        return <SecondaryFreeze />;
      case AppView.ANALYSIS:
        return <AnalysisTool onDispute={handleStartDispute} />;
      case AppView.DISPUTE_WIZARD:
        if (selectedDisputeAccount) {
          return <DisputeWizard account={selectedDisputeAccount} onBack={handleDisputeBack} />;
        }
        return <AnalysisTool onDispute={handleStartDispute} />;
      case AppView.EDUCATION:
        return <EducationHub />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row font-sans text-gray-900">
      
      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b border-gray-200 p-4 flex justify-between items-center sticky top-0 z-20">
        <h1 className="text-xl font-bold text-indigo-900">First Up</h1>
        <button className="text-gray-500">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>

      {/* Sidebar Navigation (Desktop) */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 fixed h-full z-10">
        <div className="p-6 border-b border-gray-100">
          <h1 className="text-2xl font-extrabold text-indigo-700 tracking-tight">First Up <span className="text-gray-400 font-light">Financial</span></h1>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = currentView === item.view;
            return (
              <button
                key={item.view}
                onClick={() => setCurrentView(item.view)}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                  isActive 
                    ? 'bg-indigo-50 text-indigo-700' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon className={`w-5 h-5 mr-3 ${isActive ? 'text-indigo-600' : 'text-gray-400'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>
        <div className="p-4 border-t border-gray-100">
          <div className="bg-gray-50 rounded-lg p-3">
             <div className="flex items-center">
               <div className="h-8 w-8 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-700 font-bold text-xs">
                 JD
               </div>
               <div className="ml-3">
                 <p className="text-sm font-medium text-gray-900">John Doe</p>
                 <p className="text-xs text-gray-500">Pro Member</p>
               </div>
             </div>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30 flex justify-around pb-safe">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.view}
            onClick={() => setCurrentView(item.view)}
            className={`flex flex-col items-center py-2 px-1 ${
              currentView === item.view ? 'text-indigo-600' : 'text-gray-400'
            }`}
          >
            <item.icon className="w-6 h-6" />
            <span className="text-[10px] mt-1 font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 p-4 md:p-8 pb-24 md:pb-8 overflow-y-auto max-w-5xl mx-auto w-full">
        {renderContent()}
      </main>

    </div>
  );
};

export default App;
