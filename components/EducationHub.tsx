import React from 'react';

const ARTICLES = [
  {
    title: "Understanding FCRA Section 609",
    category: "Legal Rights",
    readTime: "5 min",
    excerpt: "Contrary to internet myths, 609 letters don't magically delete debt. Learn what they actually do."
  },
  {
    title: "The Metro 2 Format Explained",
    category: "Technical",
    readTime: "8 min",
    excerpt: "Credit reporting is just a data file. Learn how to spot coding errors in the raw data."
  },
  {
    title: "Why 'Pay for Delete' is Rare",
    category: "Negotiation",
    readTime: "4 min",
    excerpt: "Most major banks won't delete for payment. Here is the better strategy for settled accounts."
  }
];

const EducationHub: React.FC = () => {
  return (
    <div className="space-y-6">
       <header className="border-b border-white/10 pb-6">
        <h2 className="text-3xl font-display font-semibold text-white tracking-tight">Knowledge Base</h2>
        <p className="text-gray-400 mt-2">
          Knowledge is power. Understanding the laws (FCRA, FDCPA) is more effective than any template.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ARTICLES.map((article, idx) => (
          <div key={idx} className="glass-panel spotlight-card rounded-xl border border-white/10 hover:border-accent/20 transition-all cursor-pointer flex flex-col h-full relative">
            <div className="h-2 bg-accent rounded-t-xl relative z-10"></div>
            <div className="p-6 flex-1 flex flex-col relative z-10">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-bold text-accent uppercase tracking-wide font-mono">{article.category}</span>
                <span className="text-xs text-gray-500">{article.readTime}</span>
              </div>
              <h3 className="text-lg font-display font-semibold text-white mb-2">{article.title}</h3>
              <p className="text-sm text-gray-400 flex-1">{article.excerpt}</p>
              <div className="mt-4 pt-4 border-t border-white/10">
                <span className="text-accent text-sm font-medium hover:underline">Read Article &rarr;</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="glass-panel rounded-2xl p-8 border border-accent/20 mt-8 relative overflow-hidden bg-accent/5">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-32 h-32 bg-accent/20 rounded-full opacity-50 blur-2xl"></div>
        <div className="relative z-10">
          <h3 className="text-xl font-display font-semibold text-white mb-2">Weekly Live Q&A</h3>
          <p className="text-gray-300 mb-6 max-w-lg">Join our Chief Compliance Officer every Thursday at 6PM EST for a breakdown of recent FDCPA court cases.</p>
          <button className="bg-accent text-black px-6 py-2 rounded-lg font-semibold text-sm hover:bg-white transition-colors">
            Register for Webinar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EducationHub;
