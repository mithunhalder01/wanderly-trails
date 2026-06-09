import { useEffect, useState, useRef } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot, ChevronDown, ChevronUp } from "lucide-react";
import {
  CONTACT_PHONE_DISPLAY,
  CONTACT_WHATSAPP_NUMBER,
} from "@/lib/contact";
const WHATSAPP_MSG = encodeURIComponent("Hi! I'm interested in booking a travel package with Wanderly Trails.");

const chatResponses: Record<string, string> = {
  default: "Hi there! I'm WanderBot 🌍 I can help you with destinations, packages, bookings, and travel tips. What are you looking for?",
  goa: "Goa is perfect year-round but best from October–March! We have packages starting at ₹8,999. Check out our Goa Beach Paradise package 🏖️",
  bali: "Bali is magical! Our Bali Honeymoon Special (7 days) starts at ₹49,999 with a private villa included 🌺",
  kashmir: "Kashmir — Paradise on Earth! Our Kashmir Valley Romance (7 days) starts at ₹22,999 🏔️",
  honeymoon: "We have amazing honeymoon packages! Bali, Maldives, and Kashmir are our top picks. Prices start at ₹22,999 💑",
  budget: "We have packages for every budget, starting from just ₹8,999! Check our Packages page for full details 💰",
  booking: `To book a trip, visit our Booking page or call us at ${CONTACT_PHONE_DISPLAY}. We're available 24/7! 📞`,
  help: "I can help with:\n• Destination info\n• Package details\n• Booking queries\n• Visa guidance\n• Travel tips\n\nJust ask away! 😊",
};

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("goa")) return chatResponses.goa;
  if (lower.includes("bali")) return chatResponses.bali;
  if (lower.includes("kashmir")) return chatResponses.kashmir;
  if (lower.includes("honeymoon") || lower.includes("couple")) return chatResponses.honeymoon;
  if (lower.includes("budget") || lower.includes("cheap") || lower.includes("price") || lower.includes("cost")) return chatResponses.budget;
  if (lower.includes("book") || lower.includes("reserve") || lower.includes("confirm")) return chatResponses.booking;
  if (lower.includes("help") || lower.includes("hi") || lower.includes("hello") || lower.includes("hey")) return chatResponses.help;
  return `That's a great question! For detailed help, our travel experts are just a call away at ${CONTACT_PHONE_DISPLAY}, or you can WhatsApp us for a quick reply 😊`;
}

interface Message {
  from: "bot" | "user";
  text: string;
  time: string;
}

const now = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

export default function FloatingWidgets() {
  const [chatOpen, setChatOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { from: "bot", text: chatResponses.default, time: now() },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [location] = useLocation();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateVisibility = () => setShowScrollTop(window.scrollY > 320);
    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  // Bottom bar se chatbot toggle karne ke liye listener
  useEffect(() => {
    const handleToggle = () => setChatOpen((prev) => !prev);
    window.addEventListener("toggle-chatbot", handleToggle);
    return () => window.removeEventListener("toggle-chatbot", handleToggle);
  }, []);

  // Auto scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isTyping]);

  // Page change hone par chat close kar dein
  useEffect(() => {
    setChatOpen(false);
  }, [location]);

  const sendMessage = (text: string = input) => {
    if (!text.trim() || isTyping) return;
    
    const userMsg: Message = { from: "user", text, time: now() };
    setMessages((m) => [...m, userMsg]);
    setInput("");

    // Simulate bot thinking
    setIsTyping(true);
    setTimeout(() => {
      const botReply: Message = { from: "bot", text: getResponse(text), time: now() };
      setMessages((m) => [...m, botReply]);
      setIsTyping(false);
    }, 1200);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="fixed right-6 bottom-24 z-50 flex flex-col items-end gap-2 md:bottom-6">
      {/* Chat window */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 400 }}
            className="w-[340px] bg-zinc-950/90 backdrop-blur-3xl rounded-[2.5rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.8)] overflow-hidden border border-white/[0.08] mb-2 relative"
            data-testid="chatbot-window"
          >
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
              <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-primary rounded-full blur-[80px] animate-pulse" />
              <div className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-amber-500/30 rounded-full blur-[80px]" />
            </div>

            {/* Header */}
            <div className="relative z-10 bg-white/[0.03] border-b border-white/[0.05] px-6 py-5 flex items-center justify-between backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-amber-600 flex items-center justify-center shadow-lg shadow-primary/20">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-zinc-950 animate-pulse" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm tracking-tight leading-none">WanderBot</p>
                  <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.15em] mt-1.5">Travel Assistant</p>
                </div>
              </div>
              <button 
                onClick={() => setChatOpen(false)} 
                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="relative z-10 h-80 overflow-y-auto p-6 space-y-5 scrollbar-hide">
              {messages.map((msg, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`flex items-end gap-2 ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.from === "bot" && (
                    <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center shrink-0 border border-white/10 mb-1">
                      <Bot className="w-3.5 h-3.5 text-primary" />
                    </div>
                  )}
                  <div className={`max-w-[85%] ${msg.from === "user" ? "items-end" : "items-start"} flex flex-col`}>
                    <div className={`px-4 py-3 rounded-[1.5rem] text-[13px] leading-relaxed whitespace-pre-line shadow-xl ${
                      msg.from === "user"
                        ? "bg-gradient-to-br from-[#BF953F] to-[#AA771C] text-white font-semibold rounded-br-sm"
                        : "bg-white/[0.08] text-white/90 border border-white/10 rounded-bl-sm backdrop-blur-md"
                    }`}>
                      {msg.text}
                    </div>
                    <span className="text-[8px] mt-1 px-1 text-white/20 font-bold uppercase">{msg.time}</span>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center shrink-0 border border-white/10 mb-1 mr-2">
                    <Bot className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div className="bg-white/5 border border-white/5 px-5 py-4 rounded-[1.5rem] rounded-bl-sm">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Quick replies */}
            <div className="relative z-10 px-5 py-4 bg-white/[0.02] border-t border-white/[0.05] flex gap-2.5 overflow-x-auto scrollbar-hide">
              {["Goa", "Bali", "Honeymoon", "Budget"].map((q) => (
                <button
                  key={q}
                  disabled={isTyping}
                  onClick={() => sendMessage(q)}
                  className="text-[10px] font-bold uppercase tracking-wider bg-white/[0.05] text-white/60 border border-white/10 px-4 py-2 rounded-full whitespace-nowrap hover:bg-primary hover:text-white hover:border-primary transition-all active:scale-95"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="relative z-10 p-5 bg-white/[0.03] border-t border-white/[0.05] flex items-center gap-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Type a message..."
                data-testid="chatbot-input"
                className="flex-1 text-[14px] bg-white/[0.05] border border-white/10 outline-none rounded-2xl px-5 py-3 text-white placeholder:text-white/20 focus:border-primary/50 focus:bg-white/[0.08] transition-all"
              />
              <button
                onClick={() => sendMessage()}
                data-testid="chatbot-send"
                className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all shrink-0 shadow-lg shadow-primary/30"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Widget buttons */}
      <div className="flex items-center gap-3">
        {/* WhatsApp */}
        <motion.a
          href={`https://wa.me/${CONTACT_WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
          target="_blank"
          rel="noreferrer"
          data-testid="whatsapp-float-btn"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-14 h-14 rounded-full shadow-xl flex items-center justify-center bg-[#25D366] hover:bg-[#20bd5c] transition-colors"
          title="Chat on WhatsApp"
        >
          <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </motion.a>

        {/* Chatbot (Desktop Only) */}
        <motion.button
          onClick={() => setChatOpen(!chatOpen)}
          data-testid="chatbot-float-btn"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="hidden md:flex w-14 h-14 rounded-full shadow-xl items-center justify-center bg-primary hover:bg-primary/90 transition-colors relative"
          title="Chat with WanderBot"
        >
          <AnimatePresence mode="wait">
            {chatOpen ? (
              <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                <X className="w-6 h-6 text-white" />
              </motion.div>
            ) : (
              <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                <Bot className="w-6 h-6 text-white" />
              </motion.div>
            )}
          </AnimatePresence>
          {!chatOpen && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full flex items-center justify-center animate-pulse">
              <span className="text-white text-[9px] font-bold">1</span>
            </span>
          )}
        </motion.button>

        {showScrollTop && (
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-12 h-12 rounded-full shadow-lg flex items-center justify-center bg-white text-foreground hover:bg-slate-100 transition-colors"
            title="Scroll to top"
          >
            <ChevronUp className="w-5 h-5" />
          </motion.button>
        )}
      </div>
    </div>
  );
}
