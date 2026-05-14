"use client"

import React, { useState } from 'react';
import { Sparkles, Loader2, BookOpen, Scale } from 'lucide-react';

export function AILegalAssistant() {
  const [aiInput, setAiInput] = useState('');
  const [aiOutput, setAiOutput] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiError, setAiError] = useState('');

  const callOpenAI = async (prompt: string, systemPrompt: string) => {
    if (!aiInput.trim()) return;
    setIsAiLoading(true);
    setAiError('');
    setAiOutput('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: prompt }],
          systemPrompt
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('No response body');
      }

      const decoder = new TextDecoder();
      let result = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value, { stream: true });
        result += chunk;
        setAiOutput(result);
      }

      if (!result) {
        throw new Error("No response generated.");
      }
    } catch (err) {
      setAiError("Failed to connect to the A.I. Esquire core. Please try again later.");
      console.error(err);
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleExplain = () => {
    callOpenAI(
      aiInput,
      "You are a friendly, expert legal educator. Your task is to take any legal text, contract clause, court document, or confusing legal jargon the user provides and explain it in simple, everyday language that anyone can understand. Break down complex terms, explain what they mean in practice, and highlight any important implications. Be clear, concise, and helpful. End with a brief disclaimer: 'This explanation is for informational purposes only and does not constitute legal advice. For guidance on your specific situation, please schedule a free consultation with one of our licensed attorneys.'"
    );
  };

  const handleStrategy = () => {
    callOpenAI(
      aiInput,
      "You are a strategic legal analyst for A.I. Esquire Legal. Analyze the user's situation, contract, or legal issue thoroughly. Provide: 1) A clear assessment of the situation including key strengths and weaknesses, 2) Potential risks or red flags to watch out for, 3) Recommended next steps they should consider, and 4) If applicable, draft professional demand language or negotiation talking points they could use. Be strategic, professional, and actionable. End with a brief disclaimer: 'This analysis is for informational purposes only and does not constitute legal advice. For representation or specific legal guidance, please schedule a free consultation with one of our licensed attorneys.'"
    );
  };

  return (
    <section id="ai-assistant" className="py-20 bg-gradient-to-b from-[#08080C] to-[#0A0A0F] border-y border-white/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2563EB]/20 text-[#2563EB] font-semibold mb-4 text-sm">
            <Sparkles className="w-4 h-4" /> Powered by A.I. Esquire
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Your 24/7 Virtual Legal Assistant</h2>
          <p className="text-gray-400 text-lg">Confused by a contract clause? Unsure how to explain your situation to a lawyer? Let our AI assistant help you prepare.</p>
        </div>

        <div className="bg-[#0D0D12] rounded-2xl shadow-xl border border-white/10 overflow-hidden">
          <div className="p-6 md:p-8">
            <label htmlFor="ai-input" className="block text-sm font-semibold text-gray-300 mb-2">
              Paste your legal text or describe your situation:
            </label>
            <textarea
              id="ai-input"
              rows={5}
              className="w-full p-4 bg-[#08080C] border border-white/10 rounded-xl focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] outline-none transition-all resize-none text-white placeholder-gray-500"
              placeholder="e.g., 'The party of the first part shall indemnify...' OR 'My landlord locked me out yesterday and won't give me my stuff back...'"
              value={aiInput}
              onChange={(e) => setAiInput(e.target.value)}
            ></textarea>
            <p className="text-xs text-slate-400 italic mt-2">
              This tool provides general information only. It does not create an attorney-client relationship and is not a substitute for advice from a licensed attorney regarding your specific situation. For advice on your matter, schedule a free consultation.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <button
                onClick={handleExplain}
                disabled={isAiLoading || !aiInput.trim()}
                className="w-full bg-gradient-to-r from-teal-500/20 to-blue-500/20 hover:from-teal-500/30 hover:to-blue-500/30 disabled:from-teal-500/5 disabled:to-blue-500/5 disabled:text-gray-600 text-white px-6 py-5 rounded-xl font-bold flex items-center justify-center gap-3 transition-all border border-teal-500/30 text-lg"
              >
                {isAiLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <BookOpen className="w-6 h-6 text-teal-400" />}
                Explain in Plain English
              </button>
              <button
                onClick={handleStrategy}
                disabled={isAiLoading || !aiInput.trim()}
                className="w-full bg-gradient-to-r from-amber-500/20 to-yellow-500/20 hover:from-amber-500/30 hover:to-yellow-500/30 disabled:from-amber-500/5 disabled:to-yellow-500/5 disabled:text-gray-600 text-white px-6 py-5 rounded-xl font-bold flex items-center justify-center gap-3 transition-all border border-amber-500/30 text-lg"
              >
                {isAiLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Scale className="w-6 h-6 text-amber-400" />}
                Get Legal Strategy
              </button>
            </div>

            {aiError && (
              <div className="mt-6 p-4 bg-red-500/10 text-red-400 rounded-xl border border-red-500/20">
                {aiError}
              </div>
            )}

            {aiOutput && (
              <div className="mt-8">
                <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#2563EB]" /> AI Output
                </h4>
                <div className="bg-[#2563EB]/10 p-6 rounded-xl border border-[#2563EB]/20 text-gray-200 leading-relaxed whitespace-pre-wrap">
                  {aiOutput}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AILegalAssistant;
