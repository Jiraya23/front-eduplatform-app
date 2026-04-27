'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

// ── ContactForm ──────────────────────────────────────────────
export function ContactForm() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  const inputClass =
    'w-full bg-surface-container-low rounded-xl py-4 px-6 text-on-surface placeholder:text-on-surface/40 focus:outline-none focus:border-b-2 focus:border-primary transition-all text-sm font-body';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="lg:col-span-8 bg-white rounded-2xl p-8 md:p-12"
      style={{ boxShadow: '0 20px 50px -12px rgba(18,28,42,0.06)' }}
    >
      <form className="space-y-8" onSubmit={handleSubmit}>
        {/* ── Name + Email row ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider ml-1"
              style={{ color: '#3d4a3d' }}>
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="John Doe"
              className={inputClass}
            />
          </div>
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider ml-1"
              style={{ color: '#3d4a3d' }}>
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className={inputClass}
            />
          </div>
        </div>

        {/* ── Subject ── */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold uppercase tracking-wider ml-1"
            style={{ color: '#3d4a3d' }}>
            Subject
          </label>
          <select
            name="subject"
            value={form.subject}
            onChange={handleChange}
            className={`${inputClass} appearance-none`}
          >
            <option>General Inquiry</option>
            <option>Technical Support</option>
            <option>Course Admissions</option>
            <option>Business Partnerships</option>
          </select>
        </div>

        {/* ── Message ── */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold uppercase tracking-wider ml-1"
            style={{ color: '#3d4a3d' }}>
            Message
          </label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={5}
            placeholder="How can we help you reach your goals?"
            className={inputClass}
          />
        </div>

        {/* ── Submit ── */}
        <div className="flex justify-end pt-4">
          <motion.button
            type="submit"
            whileHover={{ y: -2 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="group flex items-center gap-3 px-10 py-5 text-white font-bold rounded-2xl text-sm font-body"
            style={{
              background: 'linear-gradient(135deg, #006e2f, #22c55e)',
              boxShadow: '0 20px 40px -8px rgba(0,110,47,0.25)',
            }}
          >
            Send Message
            <Send
              strokeWidth={1.5}
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
}
