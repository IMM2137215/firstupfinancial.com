export interface Agency {
    id: string;
    name: string;
    type: 'Primary' | 'Secondary';
    freezeUrl: string;
    description: string;
}

export const AGENCIES: Agency[] = [
    {
        id: 'equifax',
        name: 'Equifax',
        type: 'Primary',
        freezeUrl: 'https://www.equifax.com/personal/credit-report-services/credit-freeze/',
        description: 'One of the three major credit reporting agencies.'
    },
    {
        id: 'experian',
        name: 'Experian',
        type: 'Primary',
        freezeUrl: 'https://www.experian.com/freeze/center.html',
        description: 'One of the three major credit reporting agencies.'
    },
    {
        id: 'transunion',
        name: 'TransUnion',
        type: 'Primary',
        freezeUrl: 'https://www.transunion.com/credit-freeze',
        description: 'One of the three major credit reporting agencies.'
    },
    {
        id: 'chexsystems',
        name: 'ChexSystems',
        type: 'Secondary',
        freezeUrl: 'https://www.chexsystems.com/security-freeze/place-freeze',
        description: 'Tracks banking history; critical for opening new bank accounts.'
    },
    {
        id: 'innovis',
        name: 'Innovis',
        type: 'Secondary',
        freezeUrl: 'https://www.innovis.com/securityFreeze/index',
        description: 'A supplementary credit bureau often checked by lenders.'
    },
    {
        id: 'nctue',
        name: 'NCTUE',
        type: 'Secondary',
        freezeUrl: 'https://www.nctue.com/consumers',
        description: 'National Consumer Telecom & Utilities Exchange. Tracks utility/telecom history.'
    },
    {
        id: 'lexisnexis',
        name: 'LexisNexis',
        type: 'Secondary',
        freezeUrl: 'https://consumer.risk.lexisnexis.com/freeze',
        description: 'Aggregates public records and insurance data.'
    }
];
