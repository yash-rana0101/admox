'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';

export function CTA() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'video-editing',
    message: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const validate = () => {
    const tempErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) tempErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Email address is invalid';
    }
    if (!formData.message.trim()) tempErrors.message = 'Message is required';
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('loading');

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus('success');
      setFormData({ name: '', email: '', projectType: 'video-editing', message: '' });
    } catch {
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <section
      id="contact"
      className="py-24 px-6 md:px-12 bg-brand-onyx text-white relative z-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Column: Heading & Content */}
        <div className="space-y-6 max-w-xl">
          <span className="font-space text-[12px] font-bold tracking-widest uppercase text-brand-teal">
            Get in Touch
          </span>
          <h2 className="font-sora text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            Ready to Build Something <span className="text-brand-teal">Extraordinary?</span>
          </h2>
          <p className="font-sans text-brand-linen/80 text-lg leading-relaxed font-light">
            Let's combine creativity and AI to take your brand to the next level. We're ready when you are.
          </p>
          <div className="pt-6 border-t border-brand-linen/10 space-y-2">
            <span className="font-space text-xs uppercase tracking-wider text-brand-teal block">
              Direct Contact
            </span>
            <a
              href="mailto:hello@admoxmedia.com"
              className="font-sora text-lg hover:text-brand-teal transition-colors duration-300"
            >
              hello@admoxmedia.com
            </a>
          </div>
        </div>

        {/* Right Column: Stateful Lead Form */}
        <div className="bg-white/5 border border-brand-teal/20 p-8 shadow-[0_4px_30px_rgba(37,105,81,0.05)] backdrop-blur-sm relative">
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12 space-y-4"
              >
                <div className="w-16 h-16 border-2 border-brand-teal flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8 text-brand-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-sora text-xl font-bold text-white">Project Inquiry Received</h3>
                <p className="font-sans text-sm text-brand-linen/75 max-w-sm mx-auto">
                  Thank you! We will review your request and get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="font-space text-xs text-brand-teal hover:underline tracking-wider uppercase pt-4 cursor-pointer"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
                noValidate
              >
                {/* Name */}
                <div className="space-y-1">
                  <label htmlFor="name" className="font-space text-xs uppercase tracking-wider text-brand-linen/70 block">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full bg-brand-onyx border ${
                      errors.name ? 'border-red-500' : 'border-brand-teal/30 focus:border-brand-teal'
                    } py-2.5 px-4 font-sans text-white focus:outline-none transition-colors duration-300`}
                  />
                  {errors.name && <p className="text-red-500 text-xs font-space">{errors.name}</p>}
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label htmlFor="email" className="font-space text-xs uppercase tracking-wider text-brand-linen/70 block">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full bg-brand-onyx border ${
                      errors.email ? 'border-red-500' : 'border-brand-teal/30 focus:border-brand-teal'
                    } py-2.5 px-4 font-sans text-white focus:outline-none transition-colors duration-300`}
                  />
                  {errors.email && <p className="text-red-500 text-xs font-space">{errors.email}</p>}
                </div>

                {/* Project Type */}
                <div className="space-y-1">
                  <label htmlFor="projectType" className="font-space text-xs uppercase tracking-wider text-brand-linen/70 block">
                    Project Type
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full bg-brand-onyx border border-brand-teal/30 focus:border-brand-teal py-2.5 px-4 font-space text-xs text-white uppercase tracking-wider focus:outline-none transition-colors duration-300"
                  >
                    <option value="video-editing">Video Editing</option>
                    <option value="brand-shoots">Brand Shoots</option>
                    <option value="ai-content">AI Content & Design</option>
                    <option value="social-media">Social Media Creatives</option>
                    <option value="other">Other Inquiry</option>
                  </select>
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <label htmlFor="message" className="font-space text-xs uppercase tracking-wider text-brand-linen/70 block">
                    Project details
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full bg-brand-onyx border ${
                      errors.message ? 'border-red-500' : 'border-brand-teal/30 focus:border-brand-teal'
                    } py-2.5 px-4 font-sans text-white focus:outline-none transition-colors duration-300 resize-none`}
                  />
                  {errors.message && <p className="text-red-500 text-xs font-space">{errors.message}</p>}
                </div>

                {status === 'error' && (
                  <p className="text-red-500 text-sm font-space">
                    An error occurred. Please try again later.
                  </p>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full"
                  onClick={() => {}}
                >
                  {status === 'loading' ? 'Sending Inquiry...' : 'Submit Project Inquiry →'}
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
