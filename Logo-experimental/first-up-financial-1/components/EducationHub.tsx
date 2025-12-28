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
       <header>
        <h2 className="text-2xl font-bold text-gray-900">Knowledge Base</h2>
        <p className="text-gray-600 mt-2">
          Knowledge is power. Understanding the laws (FCRA, FDCPA) is more effective than any template.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ARTICLES.map((article, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer flex flex-col h-full">
            <div className="h-2 bg-indigo-500 rounded-t-xl"></div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wide">{article.category}</span>
                <span className="text-xs text-gray-400">{article.readTime}</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{article.title}</h3>
              <p className="text-sm text-gray-600 flex-1">{article.excerpt}</p>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <span className="text-indigo-600 text-sm font-medium hover:underline">Read Article &rarr;</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-indigo-900 rounded-2xl p-8 text-white mt-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-32 h-32 bg-indigo-700 rounded-full opacity-50 blur-2xl"></div>
        <div className="relative z-10">
          <h3 className="text-xl font-bold mb-2">Weekly Live Q&A</h3>
          <p className="text-indigo-200 mb-6 max-w-lg">Join our Chief Compliance Officer every Thursday at 6PM EST for a breakdown of recent FDCPA court cases.</p>
          <button className="bg-white text-indigo-900 px-6 py-2 rounded-lg font-semibold text-sm hover:bg-gray-100 transition-colors">
            Register for Webinar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EducationHub;
