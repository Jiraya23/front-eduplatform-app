'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

// ── ContactHero ──────────────────────────────────────────────
export function ContactHero() {
  return (
    <section
      aria-label="Contact hero"
      className="mb-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-end"
    >
      {/* ── Left: Headline ── */}
      <div className="lg:col-span-7">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0 }}
          className="text-5xl md:text-7xl font-headline font-bold tracking-tight text-on-surface mb-6"
          style={{ letterSpacing: '-0.02em' }}
        >
          {"Let's build the "}
          <span className="text-primary">future of learning</span>
          {' together.'}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.15 }}
          className="text-lg text-on-surface-variant max-w-xl leading-relaxed"
          style={{ color: '#3d4a3d' }}
        >
          Have questions about our courses or need technical support? Our team of
          academic advisors is here to guide you through your elevated scholar
          journey.
        </motion.p>
      </div>

      {/* ── Right: Image ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
        className="lg:col-span-5 hidden lg:block"
      >
        <div className="h-64 w-full bg-surface-container-high rounded-2xl relative overflow-hidden">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2Ynpk5yg62y-zjwYsxW-5ITvzo3pkQtE51JZhle0btumgPkQIiFmWZRmXGhg4btQJ-VxS6m4qmF8_38xfb4U8ln4Z2hXNx--vZxBwkWW0UQinBphqkEi_K3SlDd4JylAQSsW7D4G0PT1gkaSP3Yf6kWHi8GxRQ-qiXlQWivovniYDwWnL_JUGsIGXeVEYsChvtN5NLmSumoX9j-SrrzXMw2XRzEKxk5pUdhuAguwTgKEQuszEIITGtBHp1pGpd2GcbIXvSC4JVko"
            alt="Team collaboration — modern collaborative workspace with professionals working on laptops"
            fill
            className="object-cover opacity-80"
          />
          <div
            className="absolute inset-0"
            style={{ background: 'rgba(0,110,47,0.10)', mixBlendMode: 'multiply' }}
          />
        </div>
      </motion.div>
    </section>
  );
}
