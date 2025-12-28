import { Bureau, CreditAccount } from '../types';

export const MOCK_CREDIT_ACCOUNTS: CreditAccount[] = [
  {
    id: 'acct_123',
    creditorName: 'JPMORGAN CHASE',
    type: 'Credit Card',
    data: {
      [Bureau.EXPERIAN]: {
        balance: 5400,
        status: 'Late 30',
        dateOpened: '2019-05-12',
        lastActivity: '2023-11-01',
        accountNumber: '****1234'
      },
      [Bureau.EQUIFAX]: {
        balance: 5400,
        status: 'Current',
        dateOpened: '2019-05-15', // Factual inconsistency
        lastActivity: '2023-10-28', // Factual inconsistency
        accountNumber: '****1234'
      },
      [Bureau.TRANSUNION]: {
        balance: 5450, // Factual inconsistency
        status: 'Late 30',
        dateOpened: '2019-05-12',
        lastActivity: '2023-11-01',
        accountNumber: '****1234'
      }
    }
  },
  {
    id: 'acct_456',
    creditorName: 'MIDLAND CREDIT MGMT',
    type: 'Collection',
    data: {
      [Bureau.EXPERIAN]: {
        balance: 1200,
        status: 'Collection',
        dateOpened: '2020-01-10',
        lastActivity: '2022-04-15',
        accountNumber: '889900**'
      },
      [Bureau.EQUIFAX]: {
        balance: 1200,
        status: 'Collection',
        dateOpened: '2020-01-10',
        lastActivity: '2022-04-15',
        accountNumber: '889900**'
      }
      // Missing TransUnion data - potential dispute point
    }
  },
  {
    id: 'acct_789',
    creditorName: 'CAPITAL ONE AUTO',
    type: 'Auto Loan',
    data: {
      [Bureau.EXPERIAN]: {
        balance: 15400,
        status: 'Current',
        dateOpened: '2021-08-01',
        lastActivity: '2023-12-01',
        accountNumber: '5566****'
      },
      [Bureau.EQUIFAX]: {
        balance: 15400,
        status: 'Current',
        dateOpened: '2021-08-01',
        lastActivity: '2023-12-01',
        accountNumber: '5566****'
      },
      [Bureau.TRANSUNION]: {
        balance: 15400,
        status: 'Current',
        dateOpened: '2021-08-01',
        lastActivity: '2023-12-01',
        accountNumber: '5566****'
      }
    }
  }
];

export const MOCK_SCORES = [
  { name: 'TransUnion', score: 642, color: 'text-yellow-600', borderColor: 'border-yellow-500' },
  { name: 'Equifax', score: 658, color: 'text-yellow-600', borderColor: 'border-yellow-500' },
  { name: 'Experian', score: 635, color: 'text-red-600', borderColor: 'border-red-500' },
];

export const SCORE_HISTORY = [
  { name: 'Jan', score: 610 },
  { name: 'Feb', score: 615 },
  { name: 'Mar', score: 620 },
  { name: 'Apr', score: 618 },
  { name: 'May', score: 625 },
  { name: 'Jun', score: 642 },
];
