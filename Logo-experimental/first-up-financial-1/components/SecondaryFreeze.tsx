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
    <div className="space-y-6">
      <header>
        <h2 className="text-2xl font-bold text-gray-900">Pre-Dispute Prep: The "Freeze"</h2>
        <p className="text-gray-600 mt-2">
          Before sending any letters, you must freeze these secondary data exchanges. 
          This prevents the major bureaus from easily verifying incorrect data through third parties.
        </p>
      </header>

      {/* Progress Bar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="flex justify-between text-sm font-medium mb-2">
          <span>Freeze Progress</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <div className="grid gap-4">
        {AGENCIES.map((agency) => (
          <div 
            key={agency.name} 
            className={`flex items-start p-5 rounded-xl border transition-all ${
              checked.has(agency.name) 
                ? 'bg-green-50 border-green-200' 
                : 'bg-white border-gray-200 hover:border-indigo-300 shadow-sm'
            }`}
          >
            <div className="flex-shrink-0 pt-1">
              <input
                type="checkbox"
                checked={checked.has(agency.name)}
                onChange={() => toggleCheck(agency.name)}
                className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
            </div>
            <div className="ml-4 flex-1">
              <div className="flex justify-between items-center">
                <h3 className={`font-semibold ${checked.has(agency.name) ? 'text-green-800' : 'text-gray-900'}`}>
                  {agency.name}
                </h3>
                <a 
                  href={agency.url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-3 py-1 rounded-full"
                >
                  Visit Portal &rarr;
                </a>
              </div>
              <p className={`text-sm mt-1 ${checked.has(agency.name) ? 'text-green-700' : 'text-gray-500'}`}>
                {agency.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
        <div className="flex">
          <div className="flex-shrink-0">
             <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              <strong>Tip:</strong> Keep your PINs in a safe place. You will need them to unfreeze your reports when you apply for new credit (e.g., buying a house).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondaryFreeze;
