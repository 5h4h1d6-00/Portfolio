import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Sparkles, User, RefreshCw } from "lucide-react";
import { Message } from "../types";

export function AIHelper() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I am Shahid's AI Assistant. Ask me anything about his projects, coding languages, typing speed, or availability for internships and roles!",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const presetQuestions = [
    "What are his top projects?",
    "What is his typing speed?",
    "Tell me about his education",
    "How can I contact him?"
  ];

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      role: "user",
      content: textToSend,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const history = messages.map((m) => ({
        role: m.role,
        content: m.content
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          history: history
        })
      });

      const data = await response.json();
      
      const assistantMsg: Message = {
        role: "assistant",
        content: data.text || "I'm sorry, I encountered an issue processing your request.",
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (error) {
      console.error("Error talking to AI:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I am having trouble connecting to my brain right now. Shahid is available at shahidsaleemitoo@gmail.com if you want to reach him directly!",
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend(input);
    }
  };

  const renderContent = (content: string) => {
    // Basic markdown replacement for lists, bolding, and line breaks
    const lines = content.split("\n");
    return lines.map((line, idx) => {
      let trimmed = line.trim();
      
      // Headers
      if (trimmed.startsWith("###")) {
        return <h4 key={idx} className="font-bold text-sm text-sky-400 mt-2 mb-1">{trimmed.replace("###", "").trim()}</h4>;
      }
      if (trimmed.startsWith("##")) {
        return <h3 key={idx} className="font-bold text-base text-sky-400 mt-2 mb-1">{trimmed.replace("##", "").trim()}</h3>;
      }
      
      // Bullets
      if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        const itemText = trimmed.substring(2);
        return (
          <ul key={idx} className="list-disc pl-4 my-1 text-slate-300">
            <li>{parseInlineFormatting(itemText)}</li>
          </ul>
        );
      }

      // Default text
      return <p key={idx} className="my-1 text-slate-300 leading-relaxed">{parseInlineFormatting(line)}</p>;
    });
  };

  const parseInlineFormatting = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={index} className="text-white font-semibold">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        id="ai-helper-fab"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white shadow-[0_0_20px_rgba(14,165,233,0.4)] transition-all duration-300 flex items-center justify-center group focus:outline-none"
        title="Chat with Shahid's AI Assistant"
      >
        {isOpen ? (
          <X className="w-6 h-6 transition-transform group-hover:rotate-90" />
        ) : (
          <div className="relative">
            <MessageSquare className="w-6 h-6" />
            <span className="absolute -top-1.5 -right-1.5 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border border-slate-900"></span>
            </span>
          </div>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          id="ai-helper-window"
          className="fixed bottom-24 right-6 z-50 w-[90vw] sm:w-[400px] h-[500px] rounded-2xl bg-slate-900/90 border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300"
        >
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-slate-950 to-slate-900 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h3 className="font-semibold text-white text-sm flex items-center gap-1.5">
                  Shahid's AI Agent
                  <span className="px-1.5 py-0.5 rounded text-[10px] bg-sky-500/20 text-sky-400 font-bold tracking-widest uppercase">
                    GEMINI
                  </span>
                </h3>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
                  Active Portfolio Representative
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white hover:bg-white/5 p-1 rounded transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-3 max-w-[85%] ${
                  msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                }`}
              >
                <div
                  className={`p-2 h-8 w-8 rounded-full flex items-center justify-center shrink-0 border ${
                    msg.role === "user"
                      ? "bg-indigo-500/20 border-indigo-500/30 text-indigo-300"
                      : "bg-slate-800 border-white/5 text-sky-400"
                  }`}
                >
                  {msg.role === "user" ? (
                    <User className="w-4 h-4" />
                  ) : (
                    <Sparkles className="w-4 h-4" />
                  )}
                </div>
                <div
                  className={`p-3 rounded-2xl text-xs sm:text-sm shadow-sm ${
                    msg.role === "user"
                      ? "bg-gradient-to-br from-indigo-600 to-indigo-700 text-white rounded-tr-none"
                      : "bg-slate-950/60 border border-white/5 text-slate-300 rounded-tl-none"
                  }`}
                >
                  {msg.role === "user" ? (
                    <p className="leading-relaxed">{msg.content}</p>
                  ) : (
                    <div>{renderContent(msg.content)}</div>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3 max-w-[85%] mr-auto">
                <div className="p-2 h-8 w-8 rounded-full bg-slate-800 border border-white/5 text-sky-400 flex items-center justify-center shrink-0">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                </div>
                <div className="p-3 rounded-2xl bg-slate-950/60 border border-white/5 text-slate-300 rounded-tl-none flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-bounce" style={{ animationDelay: "0ms" }}></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-bounce" style={{ animationDelay: "150ms" }}></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-bounce" style={{ animationDelay: "300ms" }}></span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Suggestions */}
          {messages.length === 1 && (
            <div className="px-4 pb-2 pt-1 flex flex-wrap gap-1.5">
              {presetQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(q)}
                  className="text-[10px] sm:text-xs px-2.5 py-1 rounded-full bg-slate-950 border border-white/5 text-sky-400 hover:bg-sky-500/10 hover:border-sky-500/20 transition duration-200 cursor-pointer text-left"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Footer Input */}
          <div className="p-3 bg-slate-950 border-t border-white/5 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask about Shahid's experience, code..."
              className="flex-1 px-3 py-2 text-xs sm:text-sm bg-slate-900 border border-white/5 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-sky-500/40"
              disabled={isLoading}
            />
            <button
              onClick={() => handleSend(input)}
              disabled={isLoading || !input.trim()}
              className="p-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 text-white hover:opacity-90 disabled:opacity-50 transition flex items-center justify-center cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
