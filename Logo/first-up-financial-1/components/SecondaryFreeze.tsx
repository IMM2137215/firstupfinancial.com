import React, { useState } from 'react';

interface Agency {
  name: string;
  url: string;
  description: string;
}

const AGENCIES: Agency[] = [
  { name: 'LexisNexis', url: '#', description: 'Major data aggregator. Essential to freeze before disputing public records.' },
  { name: 'SageStream', url: '#', description: 'Focuses on auto loans and credit cards. Subsidiary of LexisNexis.' },
  { name: 'Innovis', url: '#', description: 'The "fourth" bureau. Often used for identity verification.' },
  { name: 'ARS', url: '#', description: 'Advanced Resolution Services. Used by major financial institutions.' },
];

const SecondaryFreeze: React.FC = () => {
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const toggleCheck = (name: string) => {
    const newChecked = new Set(checked);
    if (newChecked.has(name)) {
      newChecked.delete(name);
    } else {
      newChecked.add(name);
    }
    setChecked(newChecked);
  };

  const progress = (checked.size / AGENCIES.length) * 100;

  return (
    <div className="space-y-8 animate-fade-in">
      <header className="border-b border-white/10 pb-6">
        <h2 className="text-4xl font-display font-bold text-white tracking-tight">Pre-Dispute Prep: The "Freeze"</h2>
        <p className="text-gray-200 mt-3 leading-relaxed text-lg">
          Before sending any letters, you must freeze these secondary data exchanges.
          This prevents the major bureaus from easily verifying incorrect data through third parties.
        </p>
      </header>

      {/* Progress Bar */}
      <div className="glass-panel p-6 rounded-xl border-2 border-white/20">
        <div className="flex justify-between text-sm font-semibold mb-3 text-white">
          <span className="font-mono uppercase tracking-wider">Freeze Progress</span>
          <span className="text-accent font-mono text-lg">{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-3 border border-white/10">
          <div className="bg-accent h-3 rounded-full transition-all duration-500 shadow-[0_0_15px_rgba(16,185,129,0.6)]" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <div className="grid gap-6">
        {AGENCIES.map((agency) => (
          <div
            key={agency.name}
            className={`glass-panel spotlight-card flex items-start p-6 rounded-xl border-2 transition-all relative hover:scale-[1.02] ${
              checked.has(agency.name)
                ? 'bg-accent/10 border-accent/40 shadow-[0_0_20px_rgba(16,185,129,0.2)]'
                : 'border-white/20 hover:border-accent/30'
            }`}
          >
            <div className="flex-shrink-0 pt-1 relative z-10">
              <input
                type="checkbox"
                checked={checked.has(agency.name)}
                onChange={() => toggleCheck(agency.name)}
                className="w-6 h-6 text-accent border-gray-400 rounded focus:ring-2 focus:ring-accent focus:ring-offset-0 bg-white/10 cursor-pointer"
              />
            </div>
            <div className="ml-5 flex-1 relative z-10">
              <div className="flex justify-between items-center mb-2">
                <h3 className={`font-display font-bold text-xl ${checked.has(agency.name) ? 'text-accent' : 'text-white'}`}>
                  {agency.name}
                </h3>
                <a
                  href={agency.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-semibold text-accent hover:text-white bg-accent/10 hover:bg-accent/20 border-2 border-accent/30 px-4 py-2 rounded-lg transition-all hover:scale-105 flex items-center gap-2"
                >
                  Visit Portal
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
              <p className={`text-base leading-relaxed ${checked.has(agency.name) ? 'text-gray-200' : 'text-gray-300'}`}>
                {agency.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-warning/10 border-2 border-warning/40 p-6 rounded-xl flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-warning/20 border border-warning/40 flex items-center justify-center flex-shrink-0">
          <svg className="h-6 w-6 text-warning" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <div>
          <p className="text-base text-gray-200 leading-relaxed">
            <strong className="text-warning font-semibold">Important Tip:</strong> Keep your PINs in a safe place. You will need them to unfreeze your reports when you apply for new credit (e.g., buying a house).
          </p>
        </div>
      </div>
    </div>
  );
};

export default SecondaryFreeze;
