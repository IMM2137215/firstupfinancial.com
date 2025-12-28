import React, { useState } from 'react';

interface ContactProps {
  onNavigateToHome?: () => void;
}

const Contact: React.FC<ContactProps> = ({ onNavigateToHome }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Create mailto link with form data
    const subject = encodeURIComponent(`Contact Form Submission from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Company: ${formData.company}\n` +
      `Phone: ${formData.phone}\n\n` +
      `Message:\n${formData.message}`
    );

    // Try to send to both email addresses
    const email1 = `mailto:info@firstupfinancial.com?subject=${subject}&body=${body}`;
    const email2 = `mailto:immanuel@firstupfinancial.com?subject=${subject}&body=${body}`;

    try {
      // Open email client (user will need to send manually)
      window.location.href = email1;
      
      // Small delay to show success message
      setTimeout(() => {
        setSubmitStatus('success');
        setIsSubmitting(false);
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          message: ''
        });
      }, 500);
    } catch (error) {
      setSubmitStatus('error');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-2">
              <button onClick={onNavigateToHome} className="hover:opacity-80 transition-opacity">
                <img 
                  src="/logo.svg" 
                  alt="First Up Financial" 
                  className="h-24 w-auto"
                  style={{ maxHeight: '96px' }}
                />
              </button>
            </div>

            <div className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-widest">
              <a href="#" onClick={(e) => { e.preventDefault(); onNavigateToHome?.(); }} className="text-gray-200 hover:text-white transition-colors cursor-pointer">Home</a>
            </div>

            <div className="flex items-center gap-4">
              <button onClick={onNavigateToHome} className="hidden md:block text-gray-200 hover:text-white transition-colors text-sm font-medium">
                Sign In
              </button>
              <button onClick={onNavigateToHome} className="bg-accent text-black px-6 py-2 rounded-lg font-semibold text-sm hover:bg-white transition-all">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-32 pb-16 px-6 lg:px-12 flex-1">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-8 animate-fade-in">
            <header className="border-b border-white/10 pb-8 mb-12">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight">Contact Us</h2>
              <p className="text-gray-200 mt-4 leading-relaxed text-lg max-w-2xl">
                Ready to take control of your financial data? Get in touch with our team.
              </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Information */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-panel rounded-xl p-6 border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-accent/20 border border-accent/30 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Email</h3>
                <a href="mailto:info@firstupfinancial.com" className="text-sm text-gray-300 hover:text-accent transition-colors">
                  info@firstupfinancial.com
                </a>
                <br />
                <a href="mailto:immanuel@firstupfinancial.com" className="text-sm text-gray-300 hover:text-accent transition-colors">
                  immanuel@firstupfinancial.com
                </a>
              </div>
            </div>
          </div>

          <div className="glass-panel rounded-xl p-6 border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-accent/20 border border-accent/30 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Phone</h3>
                <a href="tel:+16235217345" className="text-sm text-gray-300 hover:text-accent transition-colors">
                  (623) 521-7345
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="glass-panel rounded-xl p-8 border border-white/10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                    Name <span className="text-accent">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all"
                    placeholder="Your name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                    Email <span className="text-accent">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Company */}
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-white mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all"
                    placeholder="Company name"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all"
                    placeholder="(123) 456-7890"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                  Message <span className="text-accent">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all resize-none"
                  placeholder="Tell us how we can help..."
                />
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-between pt-4">
                <p className="text-xs text-gray-400">
                  <span className="text-accent">*</span> Required fields
                </p>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-accent text-black px-8 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                      </svg>
                    </>
                  )}
                </button>
              </div>

              {/* Success/Error Messages */}
              {submitStatus === 'success' && (
                <div className="mt-4 p-4 bg-accent/10 border border-accent/30 rounded-lg">
                  <p className="text-sm text-accent font-medium">
                    ✓ Your message has been prepared. Please check your email client to send.
                  </p>
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <p className="text-sm text-red-400 font-medium">
                    There was an error. Please try again or email us directly.
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6 lg:px-12" style={{ background: '#050505' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <p className="text-sm text-gray-400 font-mono">
              First Up Financial LLC, Phoenix, AZ, 85015
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Contact;

