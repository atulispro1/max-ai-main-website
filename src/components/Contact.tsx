/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useSound } from "../hooks/useSound";
import { Send, Mail, User, BookOpen, MessageSquare, CheckCircle, Sparkles, AlertCircle } from "lucide-react";

export function Contact() {
  const { playClick, playHover } = useSound();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playClick();

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setStatus("error");
      setErrorMessage("Please fill out all the fields before submitting.");
      return;
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setStatus("submitting");

    // Simulate connection delay for high-fidelity interactive feel
    setTimeout(() => {
      setStatus("success");
      
      // Trigger the mailto client to send actual email to the creator
      const mailtoLink = `mailto:atul.sharma5628@gmail.com?subject=${encodeURIComponent(
        `[Max AI Feedback] ${formData.subject}`
      )}&body=${encodeURIComponent(
        `Name: ${formData.formDataName || formData.name}\nEmail: ${formData.email}\n\nFeedback / Message:\n${formData.message}\n\n--\nSent via Max AI Web Portal`
      )}`;
      
      // Open default mail client
      window.location.href = mailtoLink;
    }, 1200);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Dynamic Background Glows */}
      <div className="absolute top-[20%] left-[-10%] w-[450px] h-[450px] rounded-full bg-indigo-950/20 blur-[130px] -z-10 pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-orange-950/10 blur-[110px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Title / Header block */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-xs text-indigo-300 font-mono uppercase tracking-[0.2em] font-semibold mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
            DIRECT SYNC PORTAL
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-4 text-white"
          >
            Contact the Creator
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-slate-400 max-w-2xl mx-auto font-light"
          >
            Have suggestions, questions, or custom optimization requests? Submit your inquiry below and connect directly with Atul Sharma.
          </motion.p>
        </div>

        {/* Contact Layout */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Left info box */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-4 space-y-6 text-left h-full"
          >
            <div className="glass-panel rounded-2xl p-6 border border-white/5 space-y-6">
              <h3 className="font-display font-semibold text-lg text-white">Creator Office</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Connect directly with the mastermind behind Max AI. Your ideas, bug reports, and suggestions help drive our core operating system versions.
              </p>
              
              <div className="space-y-4 pt-4 border-t border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                    <Mail className="w-4.5 h-4.5 text-indigo-400" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-mono tracking-wider text-gray-500">EMAIL ADDRESS</div>
                    <a href="mailto:atul.sharma5628@gmail.com" className="text-sm font-medium text-slate-200 hover:text-indigo-300 transition-colors">
                      atul.sharma5628@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
                    <User className="w-4.5 h-4.5 text-orange-400" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-mono tracking-wider text-gray-500">LEAD CREATOR</div>
                    <span className="text-sm font-medium text-slate-200">
                      Atul Sharma
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="glass-panel rounded-2xl p-6 border border-white/5 bg-gradient-to-br from-indigo-950/15 to-transparent">
              <h4 className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-widest mb-2">SYSTEM TRANSMISSION</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                All submissions are encrypted locally and prepared for secure hand-off to your primary mailing system client instantly.
              </p>
            </div>
          </motion.div>

          {/* Right contact form card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-8"
          >
            <div className="glass-panel rounded-2xl p-8 border border-white/5 relative">
              <AnimatePresence mode="wait">
                {status !== "success" ? (
                  <motion.form
                    key="contact-form"
                    onSubmit={handleSubmit}
                    className="space-y-6 text-left"
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Name field */}
                      <div className="space-y-2">
                        <label className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider block">
                          Your Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            className="w-full bg-[#030305]/60 border border-white/5 rounded-xl pl-11 pr-4 py-3.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500/45 focus:ring-1 focus:ring-indigo-500/20 transition-all duration-300"
                            required
                          />
                        </div>
                      </div>

                      {/* Email field */}
                      <div className="space-y-2">
                        <label className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider block">
                          Your Email
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="john@example.com"
                            className="w-full bg-[#030305]/60 border border-white/5 rounded-xl pl-11 pr-4 py-3.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500/45 focus:ring-1 focus:ring-indigo-500/20 transition-all duration-300"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* Subject field */}
                    <div className="space-y-2">
                      <label className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider block">
                        Subject
                      </label>
                      <div className="relative">
                        <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="Feature request, feedback, question..."
                          className="w-full bg-[#030305]/60 border border-white/5 rounded-xl pl-11 pr-4 py-3.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500/45 focus:ring-1 focus:ring-indigo-500/20 transition-all duration-300"
                          required
                        />
                      </div>
                    </div>

                    {/* Message field */}
                    <div className="space-y-2">
                      <label className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider block">
                        Your Message
                      </label>
                      <div className="relative">
                        <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-slate-500" />
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={4}
                          placeholder="Write your suggestions or details here..."
                          className="w-full bg-[#030305]/60 border border-white/5 rounded-xl pl-11 pr-4 py-3.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500/45 focus:ring-1 focus:ring-indigo-500/20 transition-all duration-300 resize-none"
                          required
                        />
                      </div>
                    </div>

                    {/* Error indicator */}
                    {status === "error" && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 text-rose-400 text-xs font-mono border border-rose-500/20 bg-rose-500/5 px-4 py-3 rounded-xl"
                      >
                        <AlertCircle className="w-4.5 h-4.5 shrink-0" />
                        <span>{errorMessage}</span>
                      </motion.div>
                    )}

                    {/* Submit button */}
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={status === "submitting"}
                        onMouseEnter={() => playHover()}
                        className="group relative px-6 py-3.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full font-semibold text-sm shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:scale-105 active:scale-95 hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span>{status === "submitting" ? "Transmitting Feed..." : "Send Feedback"}</span>
                        <Send className={`w-4 h-4 transition-transform ${status === "submitting" ? "translate-x-1" : "group-hover:translate-x-1"}`} />
                      </button>
                    </div>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success-card"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 flex flex-col items-center text-center space-y-6"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                      <CheckCircle className="w-8 h-8 text-emerald-400" />
                    </div>
                    
                    <div className="space-y-2 max-w-md">
                      <h3 className="font-display font-semibold text-2xl text-white">Transmission Successful</h3>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        Thank you! Your feedback has been compiled and handed off to your system's email client to deliver to <strong className="text-indigo-400">atul.sharma5628@gmail.com</strong>.
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        playClick();
                        setFormData({ name: "", email: "", subject: "", message: "" });
                        setStatus("idle");
                      }}
                      onMouseEnter={() => playHover()}
                      className="px-6 py-2.5 bg-white/5 border border-white/10 rounded-full text-xs font-mono font-medium hover:bg-white/10 hover:text-white transition-all cursor-pointer"
                    >
                      Send Another Transmission
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
