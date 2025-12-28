import React, { useState, useEffect } from 'react';
import { CreditAccount } from '../types';
import { analyzeCreditAccount, generateDisputeLetter } from '../services/geminiService';

interface DisputeWizardProps {
  account: CreditAccount;
  onBack: () => void;
}

enum WizardStep {
  ANALYSIS = 'ANALYSIS',
  STRATEGY = 'STRATEGY',
  PREVIEW = 'PREVIEW'
}

const DisputeWizard: React.FC<DisputeWizardProps> = ({ account, onBack }) => {
  const [step, setStep] = useState<WizardStep>(WizardStep.ANALYSIS);
  const [analysisText, setAnalysisText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [letterType, setLetterType] = useState<'ROUND_1_CREDITOR' | 'ROUND_2_BUREAU'>('ROUND_1_CREDITOR');
  const [generatedLetter, setGeneratedLetter] = useState<string>('');

  // Step 1: Auto-analyze with Gemini on mount
  useEffect(() => {
    let mounted = true;
    const runAnalysis = async () => {
      setIsLoading(true);
      const result = await analyzeCreditAccount(account);
      if (mounted) {
        setAnalysisText(result);
        setIsLoading(false);
      }
    };
    runAnalysis();
    return () => { mounted = false; };
  }, [account]);

  const handleGenerate = async () => {
    setIsLoading(true);
    const letter = await generateDisputeLetter(account, analysisText, letterType);
    setGeneratedLetter(letter);
    setIsLoading(false);
    setStep(WizardStep.PREVIEW);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 min-h-[500px] flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50 rounded-t-xl">
        <button onClick={onBack} className="text-gray-500 hover:text-gray-800 text-sm font-medium flex items-center">
          &larr; Back to List
        </button>
        <h3 className="font-bold text-gray-800">Dispute Generator AI</h3>
        <div className="w-6"></div> {/* Spacer */}
      </div>

      <div className="p-6 flex-1 overflow-y-auto">
        {step === WizardStep.ANALYSIS && (
          <div className="space-y-6">
             <div className="flex items-center space-x-3 mb-4">
               <div className="bg-indigo-100 p-2 rounded-lg">
                 <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                 </svg>
               </div>
               <h4 className="text-lg font-bold text-gray-900">AI Analysis Result</h4>
             </div>
             
             {isLoading ? (
               <div className="flex flex-col items-center justify-center py-12 space-y-4">
                 <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
                 <p className="text-gray-500 text-sm">Scanning {account.creditorName} across 3 bureaus...</p>
               </div>
             ) : (
               <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 prose prose-sm max-w-none text-gray-700">
                 <pre className="whitespace-pre-wrap font-sans text-sm">{analysisText}</pre>
               </div>
             )}

             {!isLoading && (
               <button 
                 onClick={() => setStep(WizardStep.STRATEGY)}
                 className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg shadow transition-all"
               >
                 Proceed to Strategy
               </button>
             )}
          </div>
        )}

        {step === WizardStep.STRATEGY && (
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-gray-900">Select Dispute Strategy</h4>
            <div className="grid grid-cols-1 gap-4">
              <label className={`block p-4 rounded-xl border-2 cursor-pointer transition-all ${letterType === 'ROUND_1_CREDITOR' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200 hover:border-indigo-300'}`}>
                <div className="flex items-center">
                  <input 
                    type="radio" 
                    name="strategy" 
                    className="w-4 h-4 text-indigo-600"
                    checked={letterType === 'ROUND_1_CREDITOR'} 
                    onChange={() => setLetterType('ROUND_1_CREDITOR')}
                  />
                  <div className="ml-3">
                    <span className="block text-sm font-bold text-gray-900">Round 1: Creditor Direct</span>
                    <span className="block text-xs text-gray-500 mt-1">Send a "Validation Demand" to {account.creditorName}. Best for first contact.</span>
                  </div>
                </div>
              </label>

              <label className={`block p-4 rounded-xl border-2 cursor-pointer transition-all ${letterType === 'ROUND_2_BUREAU' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200 hover:border-indigo-300'}`}>
                <div className="flex items-center">
                  <input 
                    type="radio" 
                    name="strategy" 
                    className="w-4 h-4 text-indigo-600"
                    checked={letterType === 'ROUND_2_BUREAU'} 
                    onChange={() => setLetterType('ROUND_2_BUREAU')}
                  />
                  <div className="ml-3">
                    <span className="block text-sm font-bold text-gray-900">Round 2: Bureau MOV</span>
                    <span className="block text-xs text-gray-500 mt-1">Send "Method of Verification" request to bureaus. Use only if Round 1 failed.</span>
                  </div>
                </div>
              </label>
            </div>

            <div className="flex space-x-3 pt-4">
              <button 
                 onClick={() => setStep(WizardStep.ANALYSIS)}
                 className="flex-1 bg-white border border-gray-300 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-50"
               >
                 Back
               </button>
              <button 
                 onClick={handleGenerate}
                 className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg shadow"
               >
                 {isLoading ? 'Generating...' : 'Generate Letter'}
               </button>
            </div>
          </div>
        )}

        {step === WizardStep.PREVIEW && (
          <div className="space-y-4 h-full flex flex-col">
            <h4 className="text-lg font-bold text-gray-900 flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Letter Ready
            </h4>
            
            <div className="flex-1 bg-gray-100 p-4 rounded-lg overflow-y-auto border border-gray-300 shadow-inner font-mono text-xs md:text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">
              {generatedLetter}
            </div>

            <div className="flex space-x-3 pt-2">
              <button 
                 onClick={() => setStep(WizardStep.STRATEGY)}
                 className="flex-1 bg-white border border-gray-300 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-50"
               >
                 Edit Strategy
               </button>
              <button 
                 className="flex-[2] bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg shadow flex justify-center items-center"
                 onClick={() => alert("In a real app, this generates a PDF for download.")}
               >
                 <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                 </svg>
                 Download PDF
               </button>
            </div>
             <p className="text-center text-xs text-gray-500 mt-2">
               *You must print and mail this via USPS Certified Mail.
             </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DisputeWizard;
