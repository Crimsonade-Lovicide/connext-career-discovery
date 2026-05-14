"use client"

import React, { useState, useRef } from 'react';
import { Sparkles, Loader2, BookOpen, Scale, Upload, X, FileText, AlertCircle } from 'lucide-react';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const SUPPORTED_TYPES = {
  'application/pdf': 'PDF',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'DOCX',
  'text/plain': 'TXT',
  'image/jpeg': 'JPG',
  'image/png': 'PNG',
};

interface AttachedFile {
  name: string;
  type: string;
  content: string;
}

async function extractTextFromPDF(file: File): Promise<string> {
  const pdfjsLib = await import('pdfjs-dist');
  pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
  
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  
  let fullText = '';
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items
      .map((item: { str?: string }) => item.str || '')
      .join(' ');
    fullText += pageText + '\n\n';
  }
  
  return fullText.trim();
}

async function extractTextFromDOCX(file: File): Promise<string> {
  const mammoth = await import('mammoth');
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value;
}

async function extractTextFromFile(file: File): Promise<string> {
  if (file.type === 'application/pdf') {
    return extractTextFromPDF(file);
  } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    return extractTextFromDOCX(file);
  } else if (file.type === 'text/plain') {
    return file.text();
  } else if (file.type.startsWith('image/')) {
    return `[Image file: ${file.name}. Image analysis is not yet supported. Please describe the content of the image in the text area above, or copy and paste any text from the image.]`;
  }
  throw new Error('Unsupported file type');
}

export function AILegalAssistant() {
  const [aiInput, setAiInput] = useState('');
  const [aiOutput, setAiOutput] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiError, setAiError] = useState('');
  const [attachedFile, setAttachedFile] = useState<AttachedFile | null>(null);
  const [fileError, setFileError] = useState('');
  const [isProcessingFile, setIsProcessingFile] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setFileError('');
    
    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      setFileError(`File too large. Maximum size is 5MB. Your file is ${(file.size / (1024 * 1024)).toFixed(1)}MB.`);
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }
    
    // Check file type
    if (!Object.keys(SUPPORTED_TYPES).includes(file.type)) {
      setFileError(`Unsupported file type. Please upload PDF, DOCX, TXT, JPG, or PNG files.`);
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }
    
    setIsProcessingFile(true);
    
    try {
      const content = await extractTextFromFile(file);
      setAttachedFile({
        name: file.name,
        type: SUPPORTED_TYPES[file.type as keyof typeof SUPPORTED_TYPES],
        content,
      });
    } catch (err) {
      console.error('Error processing file:', err);
      setFileError('Failed to process file. Please try again or paste the text manually.');
    } finally {
      setIsProcessingFile(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const removeFile = () => {
    setAttachedFile(null);
    setFileError('');
  };

  const getFullInput = () => {
    let fullInput = aiInput;
    if (attachedFile) {
      const fileContent = attachedFile.content;
      if (aiInput.trim()) {
        fullInput = `User's question/context:\n${aiInput}\n\n---\n\nAttached document (${attachedFile.name}):\n${fileContent}`;
      } else {
        fullInput = `Attached document (${attachedFile.name}):\n${fileContent}`;
      }
    }
    return fullInput;
  };

  const hasInput = () => {
    return aiInput.trim() || attachedFile;
  };

  const callOpenAI = async (prompt: string, systemPrompt: string) => {
    if (!hasInput()) return;
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
      getFullInput(),
      "You are a friendly, expert legal educator. Your task is to take any legal text, contract clause, court document, or confusing legal jargon the user provides and explain it in simple, everyday language that anyone can understand. Break down complex terms, explain what they mean in practice, and highlight any important implications. Be clear, concise, and helpful. End with a brief disclaimer: 'This explanation is for informational purposes only and does not constitute legal advice. For guidance on your specific situation, please schedule a free consultation with one of our licensed attorneys.'"
    );
  };

  const handleStrategy = () => {
    callOpenAI(
      getFullInput(),
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
            
            <div className="relative">
              <textarea
                id="ai-input"
                rows={5}
                className="w-full p-4 bg-[#08080C] border border-white/10 rounded-xl focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] outline-none transition-all resize-none text-white placeholder-gray-500"
                placeholder="e.g., 'The party of the first part shall indemnify...' OR 'My landlord locked me out yesterday and won't give me my stuff back...'"
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
              ></textarea>
            </div>

            {/* File Upload Section */}
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept=".pdf,.docx,.txt,.jpg,.jpeg,.png"
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white cursor-pointer transition-all text-sm ${isProcessingFile ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isProcessingFile ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Upload className="w-4 h-4" />
                )}
                {isProcessingFile ? 'Processing...' : 'Upload Document'}
              </label>
              
              <span className="text-xs text-gray-500">PDF, DOCX, TXT, JPG, PNG (max 5MB)</span>
            </div>

            {/* Attached File Pill */}
            {attachedFile && (
              <div className="mt-3 inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#2563EB]/20 border border-[#2563EB]/30 text-sm">
                <FileText className="w-4 h-4 text-[#2563EB]" />
                <span className="text-gray-200">{attachedFile.name}</span>
                <span className="text-gray-500">({attachedFile.type})</span>
                <button
                  onClick={removeFile}
                  className="ml-1 p-1 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                  aria-label="Remove file"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* File Error Message */}
            {fileError && (
              <div className="mt-3 flex items-center gap-2 text-sm text-red-400">
                <AlertCircle className="w-4 h-4" />
                {fileError}
              </div>
            )}

            <p className="text-xs text-slate-400 italic mt-3">
              This tool provides general information only. It does not create an attorney-client relationship and is not a substitute for advice from a licensed attorney regarding your specific situation. For advice on your matter, schedule a free consultation.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <button
                onClick={handleExplain}
                disabled={isAiLoading || !hasInput()}
                className="w-full bg-gradient-to-r from-teal-500/20 to-blue-500/20 hover:from-teal-500/30 hover:to-blue-500/30 disabled:from-teal-500/5 disabled:to-blue-500/5 disabled:text-gray-600 text-white px-6 py-5 rounded-xl font-bold flex items-center justify-center gap-3 transition-all border border-teal-500/30 text-lg"
              >
                {isAiLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <BookOpen className="w-6 h-6 text-teal-400" />}
                Explain in Plain English
              </button>
              <button
                onClick={handleStrategy}
                disabled={isAiLoading || !hasInput()}
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
