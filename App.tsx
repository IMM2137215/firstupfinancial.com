import React, { useState } from 'react';
import { AppView, CreditAccount } from './types';
import { NAV_ITEMS } from './constants';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import SecondaryFreeze from './components/SecondaryFreeze';
import AnalysisTool from './components/AnalysisTool';
import DisputeWizard from './components/DisputeWizard';
import EducationHub from './components/EducationHub';
import Contact from './components/Contact';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);
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
      case AppView.HOME:
        return <LandingPage onNavigateToDashboard={() => setCurrentView(AppView.DASHBOARD)} onNavigateToContact={() => setCurrentView(AppView.CONTACT)} />;
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
      case AppView.CONTACT:
        return <Contact onNavigateToHome={() => setCurrentView(AppView.HOME)} />;
      default:
        return <LandingPage onNavigateToDashboard={() => setCurrentView(AppView.DASHBOARD)} />;
    }
  };

  // Landing page and Contact page get full-width layout, dashboard gets sidebar
  if (currentView === AppView.HOME || currentView === AppView.CONTACT) {
    return (
      <div className="min-h-screen bg-[#050505] font-sans text-gray-100">
        {renderContent()}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col md:flex-row font-sans text-gray-100">

      {/* Mobile Header */}
      <div className="md:hidden bg-[#0a0a0a] border-b border-white/5 backdrop-blur-md p-4 flex justify-between items-center sticky top-0 z-20">
        <h1 className="text-xl font-display font-semibold tracking-tighter text-white">
          <img src="/logo.svg" alt="First Up Financial" className="h-20 w-auto" style={{ maxHeight: '80px' }} />
        </h1>
        <button className="text-gray-400 hover:text-white transition-colors">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>

      {/* Sidebar Navigation (Desktop) */}
      <aside className="hidden md:flex flex-col w-64 glass-panel border-r border-white/10 fixed h-full z-10 bg-[#0a0a0a]/90">
        <div className="p-6 border-b border-white/5">
          <h1 className="cursor-pointer" onClick={() => setCurrentView(AppView.HOME)}>
            <img src="/logo.svg" alt="First Up Financial" className="h-24 w-auto" style={{ maxHeight: '96px' }} />
          </h1>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = currentView === item.view;
            return (
              <button
                key={item.view}
                onClick={() => setCurrentView(item.view)}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-accent/10 text-accent border border-accent/20'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white border border-transparent'
                }`}
              >
                <item.icon className={`w-5 h-5 mr-3 ${isActive ? 'text-accent' : 'text-gray-500'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>
        <div className="p-4 border-t border-white/5">
          <div className="bg-white/5 rounded-lg p-3 border border-white/10">
             <div className="flex items-center">
               <div className="h-8 w-8 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center text-accent font-bold text-xs">
                 JD
               </div>
               <div className="ml-3">
                 <p className="text-sm font-medium text-white">John Doe</p>
                 <p className="text-xs text-gray-500">Pro Member</p>
               </div>
             </div>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0a0a0a]/90 backdrop-blur-md border-t border-white/5 z-30 flex justify-around pb-safe">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.view}
            onClick={() => setCurrentView(item.view)}
            className={`flex flex-col items-center py-2 px-1 ${
              currentView === item.view ? 'text-accent' : 'text-gray-500'
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
