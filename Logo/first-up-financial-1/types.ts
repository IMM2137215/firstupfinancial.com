export enum Bureau {
  EQUIFAX = 'Equifax',
  EXPERIAN = 'Experian',
  TRANSUNION = 'TransUnion'
}

export interface BureauData {
  balance: number;
  status: string;
  dateOpened: string;
  lastActivity: string;
  accountNumber: string; // Often masked differently
}

export interface CreditAccount {
  id: string;
  creditorName: string;
  type: 'Credit Card' | 'Auto Loan' | 'Collection' | 'Student Loan';
  data: {
    [key in Bureau]?: BureauData;
  };
}

export interface AnalysisResult {
  accountId: string;
  inconsistencies: string[];
  recommendedAction: 'VALIDATION_LETTER' | 'METHOD_OF_VERIFICATION' | 'NONE';
  confidenceScore: number;
}

export enum AppView {
  HOME = 'HOME',
  DASHBOARD = 'DASHBOARD',
  ANALYSIS = 'ANALYSIS',
  DISPUTE_WIZARD = 'DISPUTE_WIZARD',
  EDUCATION = 'EDUCATION',
  SECONDARY_FREEZE = 'SECONDARY_FREEZE',
  CONTACT = 'CONTACT'
}
