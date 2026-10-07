"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";

const socials = [
  { label: "WhatsApp", href: "https://wa.me/971565095690", bg: "#25D366", icon: <WhatsAppIcon />, delay: "0ms" },
  { label: "Instagram", href: "https://www.instagram.com/flaztechnicalsevices/", bg: "linear-gradient(135deg, #E1306C, #833AB4)", icon: <InstagramIcon />, delay: "60ms" },
  { label: "TikTok", href: "https://www.tiktok.com/@flaztechnicalservices", bg: "#010101", icon: <TikTokIcon />, delay: "120ms" },
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61572318343723", bg: "#1877F2", icon: <FacebookIcon />, delay: "180ms" },
];

type Message = { role: "ai" | "user"; text: string };

const greeting: Message = {
  role: "ai",
  text: "Hi! 👋 I'm the Flaz AI assistant. I can help you with questions about our technical services, pricing, and projects. How can I help you today?",
};

function getAIResponse(input: string): string {
  const q = input.toLowerCase();
  if (q.includes("price") || q.includes("cost") || q.includes("how much"))
    return "Our pricing depends on the scope of work. You can use the cost calculator on our homepage, or leave your contact details and our team will contact you about a quote.";
  if (q.includes("service") || q.includes("offer") || q.includes("do you"))
    return "We offer electrical works, plumbing & sanitary, civil works, MEP services, fit-out & renovation, NOC & permits, and smart home integration. Which service are you interested in?";
  if (q.includes("contact") || q.includes("call") || q.includes("reach") || q.includes("phone"))
    return "You can reach us at +971 56 509 5690 or +971 54 292 8360 or email us at info@flaztechnicalservices.com. We're available Saturday–Thursday, 8am–6pm.";
  if (q.includes("location") || q.includes("where") || q.includes("office"))
    return "Our office is at Office 510 B, 5th Floor, Al Barsha Business Center, Al Barsha 1, Dubai. We service properties across the UAE.";
  if (q.includes("time") || q.includes("long") || q.includes("duration"))
    return "Project timelines vary — a standard apartment fit-out takes 4–8 weeks, while larger villa or commercial projects range from 2–6 months.";
  return "Thanks for your message! Our team will follow up with you shortly. You can also reach us directly on WhatsApp for a faster response.";
}

export default function FloatingWidget() {
  const [socialsOpen, setSocialsOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([greeting]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isChatOpen) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isChatOpen, isTyping]);

  function handleSend() {
    const text = input.trim();
    if (!text) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", text }]);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((m) => [...m, { role: "ai", text: getAIResponse(text) }]);
    }, 1000 + Math.random() * 800);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
  }

  return (
    <div className="fixed bottom-6 right-6 z-[51] flex flex-col items-center gap-3">

      {/* ── Chat window ── */}
      <div
        className="absolute bottom-0 flex flex-col shadow-2xl"
        style={{
          width: "340px",
          height: "500px",
          right: "80px",
          borderRadius: "6px",
          overflow: "hidden",
          border: "1px solid rgba(44,44,44,0.12)",
          transition: "opacity 260ms ease, transform 260ms ease",
          opacity: isChatOpen ? 1 : 0,
          transform: isChatOpen ? "translateY(0) scale(1)" : "translateY(12px) scale(0.97)",
          pointerEvents: isChatOpen ? "auto" : "none",
        }}
      >
        {/* Header — teal branded */}
        <div
          className="px-5 pt-5 pb-4 shrink-0 relative"
          style={{ background: "linear-gradient(135deg, var(--flaz-teal) 0%, var(--flaz-teal-dark) 100%)" }}
        >
          {/* Subtle grid texture — matches page header language */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute", inset: 0, pointerEvents: "none",
              backgroundImage: "linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          <div className="relative flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-sm flex items-center justify-center shrink-0"
                style={{ backgroundColor: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.25)" }}
              >
                <Image src="/logo.png" alt="Flaz" width={22} height={22} className="object-contain" style={{ filter: "brightness(0) invert(1)" }} />
              </div>
              <div>
                <p className="text-white text-[14px] font-medium leading-tight tracking-tight">
                  Flaz AI Assistant
                </p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.9)" }} />
                  <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.82)" }}>
                    Online — usually replies instantly
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsChatOpen(false)}
              aria-label="Close chat"
              className="w-7 h-7 rounded-sm flex items-center justify-center focus-visible:outline-none"
              style={{ color: "rgba(255,255,255,0.75)", backgroundColor: "rgba(255,255,255,0.12)" }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.22)"; e.currentTarget.style.color = "white"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "rgba(255,255,255,0.75)"; }}
            >
              <CloseIcon />
            </button>
          </div>
        </div>

        {/* Messages — cream bg matching site palette */}
        <div
          className="flex-1 overflow-y-auto px-4 py-5 flex flex-col gap-3"
          style={{ backgroundColor: "#ECEAE6" }}
        >
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex items-end gap-2 ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {m.role === "ai" && (
                <div
                  className="w-6 h-6 rounded-sm shrink-0 flex items-center justify-center mb-0.5"
                  style={{ backgroundColor: "var(--flaz-teal)" }}
                >
                  <Image src="/logo.png" alt="" width={14} height={14} className="object-contain" style={{ filter: "brightness(0) invert(1)" }} />
                </div>
              )}
              <div
                className="max-w-[80%] px-4 py-2.5 text-[13px] leading-relaxed"
                style={{
                  backgroundColor: m.role === "user" ? "var(--flaz-teal)" : "white",
                  color: m.role === "user" ? "white" : "#1a1a1a",
                  borderRadius: m.role === "user"
                    ? "12px 3px 12px 12px"
                    : "3px 12px 12px 12px",
                  boxShadow: m.role === "user"
                    ? "0 2px 8px rgba(77,200,200,0.28)"
                    : "0 1px 4px rgba(0,0,0,0.07)",
                }}
              >
                {m.text}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex items-end gap-2 justify-start" aria-live="polite" aria-label="AI is typing">
              <div
                className="w-6 h-6 rounded-sm shrink-0 flex items-center justify-center mb-0.5"
                style={{ backgroundColor: "var(--flaz-teal)" }}
              >
                <Image src="/logo.png" alt="" width={14} height={14} className="object-contain" style={{ filter: "brightness(0) invert(1)" }} />
              </div>
              <div
                className="px-4 py-3 flex items-center gap-1.5 bg-white"
                style={{ borderRadius: "3px 12px 12px 12px", boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-gray-300 motion-safe:animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-gray-300 motion-safe:animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-gray-300 motion-safe:animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div
          className="px-3.5 py-3 shrink-0 flex items-center gap-2.5"
          style={{ backgroundColor: "white", borderTop: "1px solid rgba(44,44,44,0.08)" }}
        >
          <label htmlFor="chat-input" className="sr-only">Message</label>
          <textarea
            id="chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything…"
            rows={1}
            aria-label="Message"
            className="flex-1 text-[13px] px-4 py-2.5 resize-none text-gray-800 placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--flaz-teal)]"
            style={{
              maxHeight: "80px",
              backgroundColor: "#ECEAE6",
              borderRadius: "6px",
              border: "none",
            }}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            aria-label="Send message"
            className="w-9 h-9 rounded-full flex items-center justify-center text-white shrink-0 transition-all disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--flaz-teal)]"
            style={{ backgroundColor: "var(--flaz-teal)", flexShrink: 0 }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--flaz-teal-dark)")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--flaz-teal)")}
          >
            <SendIcon />
          </button>
        </div>
      </div>

      {/* ── Social bubbles ── */}
      {socials.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.label}
          className="w-11 h-11 rounded-full flex items-center justify-center text-white shadow-lg"
          style={{
            background: s.bg,
            transition: "opacity 250ms ease, transform 250ms ease",
            transitionDelay: socialsOpen ? s.delay : "0ms",
            opacity: socialsOpen ? 1 : 0,
            transform: socialsOpen ? "translateY(0) scale(1)" : "translateY(16px) scale(0.8)",
            pointerEvents: socialsOpen ? "auto" : "none",
          }}
        >
          {s.icon}
        </a>
      ))}

      {/* ── Share toggle ── */}
      <button
        onClick={() => { setSocialsOpen((o) => !o); setIsChatOpen(false); }}
        aria-label="Social media links"
        className="w-11 h-11 rounded-full flex items-center justify-center text-white shadow-lg"
        style={{
          backgroundColor: "#5a8f8f",
          transform: socialsOpen ? "rotate(45deg)" : "rotate(0deg)",
          transition: "transform 300ms ease, background-color 200ms",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#4a7a7a")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#5a8f8f")}
      >
        <ShareIcon />
      </button>

      {/* ── Main chat bubble ── */}
      <button
        onClick={() => { setIsChatOpen((o) => !o); setSocialsOpen(false); }}
        aria-label="Open AI chat"
        className="w-16 h-16 rounded-full flex items-center justify-center text-white shadow-xl"
        style={{ backgroundColor: "var(--flaz-teal)", transition: "background-color 200ms, transform 200ms" }}
        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--flaz-teal-dark)"; e.currentTarget.style.transform = "scale(1.06)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "var(--flaz-teal)"; e.currentTarget.style.transform = "scale(1)"; }}
      >
        <span style={{ display: "inline-flex", transition: "transform 300ms ease", transform: isChatOpen ? "rotate(45deg)" : "rotate(0deg)" }}>
          {isChatOpen ? <CloseIcon /> : <ChatIcon />}
        </span>
      </button>
    </div>
  );
}

function ChatIcon() {
  return <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>;
}
function CloseIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>;
}
function SendIcon() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>;
}
function ShareIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></svg>;
}
function WhatsAppIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>;
}
function InstagramIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>;
}
function TikTokIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" /></svg>;
}
function FacebookIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>;
}
