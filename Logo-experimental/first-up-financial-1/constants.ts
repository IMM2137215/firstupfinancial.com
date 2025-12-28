import { AppView } from './types';
import React from 'react';

// Icons as simple SVG strings for portability
export const ICONS = {
  Home: (props: React.SVGProps<SVGSVGElement>) => (
    React.createElement("svg", { fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", ...props },
      React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" })
    )
  ),
  Chart: (props: React.SVGProps<SVGSVGElement>) => (
    React.createElement("svg", { fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", ...props },
      React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" })
    )
  ),
  Document: (props: React.SVGProps<SVGSVGElement>) => (
    React.createElement("svg", { fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", ...props },
      React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" })
    )
  ),
  Shield: (props: React.SVGProps<SVGSVGElement>) => (
    React.createElement("svg", { fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", ...props },
      React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" })
    )
  ),
  Academic: (props: React.SVGProps<SVGSVGElement>) => (
    React.createElement("svg", { fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", ...props },
      React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.499 5.216 50.59 50.59 0 00-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" })
    )
  )
};

export const NAV_ITEMS = [
  { view: AppView.DASHBOARD, label: 'Dashboard', icon: ICONS.Home },
  { view: AppView.SECONDARY_FREEZE, label: 'Freeze', icon: ICONS.Shield },
  { view: AppView.ANALYSIS, label: 'Analysis', icon: ICONS.Chart },
  { view: AppView.DISPUTE_WIZARD, label: 'Disputes', icon: ICONS.Document },
  { view: AppView.EDUCATION, label: 'Learn', icon: ICONS.Academic },
];