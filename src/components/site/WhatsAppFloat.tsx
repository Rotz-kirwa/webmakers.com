import { MessageCircle, X } from "lucide-react";
import { useState } from "react";

const phoneNumber = "254791260817";
const defaultMessage =
  "Hi WebMakers, I want a professional website for my business. Please help me get started.";
const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;

function WhatsAppMark({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
      <path
        d="M16 4.2A11.64 11.64 0 0 0 6.1 22l-1.3 5.2 5.3-1.25A11.75 11.75 0 1 0 16 4.2Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.4"
      />
      <path
        d="M11.7 10.7c-.35.08-.75.57-.9 1.02-.22.66-.12 1.54.28 2.43.8 1.82 2.9 4.24 5.1 5.42 1.2.65 2.28.9 3.08.68.55-.15 1.2-.78 1.34-1.25l.18-.65c.09-.32-.06-.66-.36-.8l-2.08-.97c-.3-.14-.67-.06-.88.2l-.62.78c-.18.23-.5.3-.76.17-.62-.3-1.24-.75-1.84-1.34-.58-.58-1.03-1.18-1.32-1.78-.13-.27-.06-.6.18-.78l.72-.56c.25-.2.35-.55.24-.85l-.78-2.16a.68.68 0 0 0-.78-.43l-.8.18Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function WhatsAppFloat() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="fixed bottom-4 right-4 z-[80] flex flex-col items-end gap-2 sm:bottom-5 sm:right-5 sm:gap-3">
      {isOpen ? (
        <div className="max-h-[46vh] w-[min(19rem,calc(100vw-2rem))] overflow-hidden border border-emerald-500/30 bg-white shadow-[0_24px_70px_-28px_rgba(16,185,129,0.8)] sm:max-h-[70vh] sm:w-[calc(100vw-2.5rem)] sm:max-w-[360px]">
          <div className="flex items-center justify-between bg-[#1fa878] px-3 py-2.5 text-white sm:px-4 sm:py-3">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-full border border-white/35 bg-white/15 sm:h-10 sm:w-10">
                <WhatsAppMark className="h-5 w-5 sm:h-6 sm:w-6" />
              </span>
              <div>
                <p className="text-xs font-black sm:text-sm">WebMakers Support</p>
                <p className="mt-0.5 flex items-center gap-1.5 text-[0.68rem] text-white/82 sm:text-xs">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-200" />
                  Online · replies in minutes
                </p>
              </div>
            </div>
            <button
              type="button"
              aria-label="Close WhatsApp chat preview"
              onClick={() => setIsOpen(false)}
              className="grid h-7 w-7 place-items-center rounded-full bg-white/14 text-white transition hover:bg-white/24 sm:h-8 sm:w-8"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="max-h-[calc(46vh-3.5rem)] overflow-y-auto bg-[#f7fbf9] px-3 py-3 sm:max-h-none sm:px-4 sm:py-4">
            <div className="flex gap-2.5 sm:gap-3">
              <span className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#19b96f] text-white sm:h-8 sm:w-8">
                <WhatsAppMark className="h-4 w-4 sm:h-5 sm:w-5" />
              </span>
              <div className="rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-xs leading-relaxed text-slate-700 shadow-soft sm:px-4 sm:py-3 sm:text-sm">
                <p>
                  Hi there! Looking for a website for your business?
                  <br />
                  <strong className="text-slate-950">
                    We will help you build a website that looks professional and brings clients.
                  </strong>
                </p>
                <p className="mt-2 text-right text-[0.62rem] font-medium text-slate-400 sm:mt-3 sm:text-[0.68rem]">
                  Now
                </p>
              </div>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex w-full items-center justify-center gap-2 bg-[#19b96f] px-4 py-2.5 text-xs font-black text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-[#139e5e] sm:mt-4 sm:px-5 sm:py-3 sm:text-sm"
            >
              <WhatsAppMark className="h-4 w-4 sm:h-5 sm:w-5" />
              Start Chat on WhatsApp
            </a>
          </div>
        </div>
      ) : null}

      <button
        type="button"
        aria-label={isOpen ? "Close WhatsApp chat preview" : "Open WhatsApp chat preview"}
        onClick={() => setIsOpen((current) => !current)}
        className="relative grid h-14 w-14 place-items-center rounded-full border-[3px] border-[#062112] bg-[radial-gradient(circle_at_32%_28%,#41f08a,#16c86f_54%,#0b8f50)] text-white shadow-[0_22px_55px_-18px_rgba(22,200,111,1)] transition hover:-translate-y-1 hover:scale-105 sm:h-16 sm:w-16"
      >
        <span className="absolute inset-1 rounded-full border border-white/20" />
        {isOpen ? (
          <X className="relative h-6 w-6 sm:h-7 sm:w-7" />
        ) : (
          <WhatsAppMark className="relative h-8 w-8 sm:h-9 sm:w-9" />
        )}
        <span className="absolute right-0 top-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-[#5cf2a4] shadow-[0_0_0_4px_rgba(92,242,164,0.18)] sm:right-0.5 sm:top-0.5 sm:h-4 sm:w-4" />
      </button>
    </div>
  );
}
