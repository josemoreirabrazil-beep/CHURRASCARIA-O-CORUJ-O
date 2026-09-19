import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

interface WhatsAppButtonProps {
  customMessage?: string;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ customMessage }) => {
  const [showTooltip, setShowTooltip] = useState(true);

  const phone = '5573999037223';
  const defaultMsg = customMessage || 'Olá! Gostaria de tirar dúvidas sobre o rodízio e reservas da Pousada O Corujão.';
  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(defaultMsg)}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end space-y-2">
      {/* Tooltip Popup */}
      {showTooltip && (
        <div className="bg-zinc-900 border border-emerald-500/40 text-white p-3 rounded-2xl shadow-2xl max-w-xs text-xs animate-bounce relative group">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute -top-2 -right-2 bg-zinc-800 text-zinc-400 hover:text-white rounded-full p-1 border border-zinc-700"
            aria-label="Fechar"
          >
            <X className="w-3 h-3" />
          </button>
          <p className="font-bold text-emerald-400">Atendimento WhatsApp 24h</p>
          <p className="text-zinc-300 text-[11px] mt-0.5">Clique para falar direto com nossa recepção no WhatsApp!</p>
        </div>
      )}

      {/* Main WhatsApp Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-2xl shadow-emerald-950/60 transition transform hover:scale-110 active:scale-95"
        aria-label="Atendimento WhatsApp"
      >
        <MessageCircle className="w-8 h-8 fill-white" />
      </a>
    </div>
  );
};
