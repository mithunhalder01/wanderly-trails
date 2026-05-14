import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot, ChevronDown } from "lucide-react";

const WHATSAPP_NUMBER = "911234567890";
const WHATSAPP_MSG = encodeURIComponent("Hi! I'm interested in booking a travel package with Wanderly Trails.");

const chatResponses: Record<string, string> = {
  default: "Hi there! I'm WanderBot 🌍 I can help you with destinations, packages, bookings, and travel tips. What are you looking for?",
  goa: "Goa is perfect year-round but best from October–March! We have packages starting at ₹8,999. Check out our Goa Beach Paradise package 🏖️",
  bali: "Bali is magical! Our Bali Honeymoon Special (7 days) starts at ₹49,999 with a private villa included 🌺",
  dubai: "Dubai is an incredible experience! Our Dubai City of Dreams package (6 days) starts at ₹55,000 🌆",
  kashmir: "Kashmir — Paradise on Earth! Our Kashmir Valley Romance (7 days) starts at ₹22,999 🏔️",
  honeymoon: "We have amazing honeymoon packages! Bali, Maldives, and Kashmir are our top picks. Prices start at ₹22,999 💑",
  budget: "We have packages for every budget, starting from just ₹8,999! Check our Packages page for full details 💰",
  booking: "To book a trip, visit our Booking page or call us at +91 12345 67890. We're available 24/7! 📞",
  help: "I can help with:\n• Destination info\n• Package details\n• Booking queries\n• Visa guidance\n• Travel tips\n\nJust ask away! 😊",
};

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("goa")) return chatResponses.goa;
  if (lower.includes("bali")) return chatResponses.bali;
  if (lower.includes("dubai")) return chatResponses.dubai;
  if (lower.includes("kashmir")) return chatResponses.kashmir;
  if (lower.includes("honeymoon") || lower.includes("couple")) return chatResponses.honeymoon;
  if (lower.includes("budget") || lower.includes("cheap") || lower.includes("price") || lower.includes("cost")) return chatResponses.budget;
  if (lower.includes("book") || lower.includes("reserve") || lower.includes("confirm")) return chatResponses.booking;
  if (lower.includes("help") || lower.includes("hi") || lower.includes("hello") || lower.includes("hey")) return chatResponses.help;
  return "That's a great question! For detailed help, our travel experts are just a call away at +91 12345 67890, or you can WhatsApp us for a quick reply 😊";
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

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg: Message = { from: "user", text: input, time: now() };
    const botReply: Message = { from: "bot", text: getResponse(input), time: now() };
    setMessages((m) => [...m, userMsg, botReply]);
    setInput("");
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Chat window */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="w-80 bg-white rounded-3xl shadow-2xl overflow-hidden border border-border mb-1"
            data-testid="chatbot-window"
          >
            {/* Header */}
            <div className="bg-primary px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">WanderBot</p>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full" />
                    <span className="text-white/70 text-xs">Online</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setChatOpen(false)} className="text-white/80 hover:text-white transition-colors">
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="h-64 overflow-y-auto p-4 space-y-3 bg-gray-50">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                  {msg.from === "bot" && (
                    <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center shrink-0 mr-2 mt-auto">
                      <Bot className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}
                  <div className={`max-w-[80%] ${msg.from === "user" ? "items-end" : "items-start"} flex flex-col`}>
                    <div className={`px-3 py-2 rounded-2xl text-xs leading-relaxed whitespace-pre-line ${
                      msg.from === "user"
                        ? "bg-primary text-white rounded-br-sm"
                        : "bg-white text-foreground shadow-sm rounded-bl-sm border border-border"
                    }`}>
                      {msg.text}
                    </div>
                    <span className="text-[10px] text-muted-foreground mt-1 px-1">{msg.time}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick replies */}
            <div className="px-3 py-2 bg-gray-50 border-t border-border flex gap-1.5 overflow-x-auto">
              {["Goa", "Bali", "Honeymoon", "Budget"].map((q) => (
                <button
                  key={q}
                  onClick={() => {
                    setInput(q);
                    setMessages((m) => [
                      ...m,
                      { from: "user", text: q, time: now() },
                      { from: "bot", text: getResponse(q), time: now() },
                    ]);
                  }}
                  className="text-[11px] font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full whitespace-nowrap hover:bg-primary/20 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="px-3 py-3 bg-white border-t border-border flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Type a message..."
                data-testid="chatbot-input"
                className="flex-1 text-xs bg-muted border-none outline-none rounded-full px-3 py-2 text-foreground placeholder:text-muted-foreground"
              />
              <button
                onClick={sendMessage}
                data-testid="chatbot-send"
                className="w-8 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-primary/90 transition-colors shrink-0"
              >
                <Send className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Widget buttons */}
      <div className="flex items-center gap-3">
        {/* WhatsApp */}
        <motion.a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
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

        {/* Chatbot */}
        <motion.button
          onClick={() => setChatOpen(!chatOpen)}
          data-testid="chatbot-float-btn"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-14 h-14 rounded-full shadow-xl flex items-center justify-center bg-primary hover:bg-primary/90 transition-colors relative"
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
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full flex items-center justify-center">
              <span className="text-white text-[9px] font-bold">1</span>
            </span>
          )}
        </motion.button>
      </div>
    </div>
  );
}
