import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, Info } from 'lucide-react';
import { usePortfolioContent } from '../lib/content';
import type { ContactDetail } from '../data/content';

const detailIconMap: Record<ContactDetail["type"], typeof Info> = {
  address: MapPin,
  email: Mail,
  phone: Phone,
  other: Info,
};

export default function Contact() {
  const { content } = usePortfolioContent();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const endpoint = content.contact.formspreeEndpoint || '/api/contact';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        const data = await response.json();
        console.error('Formspree error:', data);
        setStatus('error');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-5xl mx-auto relative"
    >
      <div
        className="fixed inset-0 z-[-1] bg-cover bg-center bg-no-repeat opacity-15 pointer-events-none"
        style={{ backgroundImage: "url('/contact.jpg')" }}
      />
      <div className="text-center mb-12">
        <h1 className="text-4xl font-serif font-bold text-white mb-4 title-effect">Contact Me</h1>
        <p className="text-lg text-slate-400">Get in touch for professional inquiries or collaborations.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>
          <p className="text-slate-300 mb-8 leading-relaxed">
            {content.contact.intro}
          </p>

          <div className="space-y-6">
            {content.contact.details.map((detail) => {
              const Icon = detailIconMap[detail.type] ?? Info;
              const href = detail.href || (detail.type === "email" ? `mailto:${detail.value}` : detail.type === "phone" ? `tel:${detail.value}` : undefined);

              return (
                <div key={detail.id} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0 border border-indigo-500/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{detail.label}</h3>
                    {href ? (
                      <a href={href} className="text-indigo-400 hover:text-indigo-300 hover:underline mt-1 block transition-colors">
                        {detail.value}
                      </a>
                    ) : (
                      <p className="text-slate-400 mt-1">{detail.value}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-slate-800/50 backdrop-blur-md rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.3),_inset_0_1px_1px_rgba(255,255,255,0.05)] border border-slate-700/50 p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Send a Message</h2>

          {status === 'success' ? (
            <div className="bg-emerald-500/20 text-emerald-300 p-4 rounded-xl border border-emerald-500/30 mb-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
              <p className="font-medium">Thank you for your message!</p>
              <p className="text-sm mt-1 text-emerald-400">I will get back to you as soon as possible.</p>
              <button
                onClick={() => setStatus('idle')}
                className="mt-4 text-sm text-emerald-400 hover:text-emerald-300 underline transition-colors"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 outline-none transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]"
                  placeholder="Your Name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 outline-none transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]"
                  placeholder="Your Email"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 outline-none transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] resize-none"
                  placeholder="How can I help you?"
                ></textarea>
              </div>

              {status === 'error' && (
                <div className="bg-red-500/20 text-red-300 p-4 rounded-xl border border-red-500/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                  <p className="text-sm">There was an error sending your message. Please try again or email me directly.</p>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0B1221] focus:ring-indigo-500 transition-all shadow-[0_4px_15px_rgba(99,102,241,0.4),_inset_0_1px_1px_rgba(255,255,255,0.2)] hover:shadow-[0_8px_25px_rgba(99,102,241,0.5),_inset_0_1px_1px_rgba(255,255,255,0.3)] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {status === 'submitting' ? 'Sending...' : (
                  <>
                    Send Message
                    <Send className="w-4 h-4 ml-2" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </motion.div>
  );
}
