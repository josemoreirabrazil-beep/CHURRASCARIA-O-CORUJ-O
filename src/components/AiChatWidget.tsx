import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { Bot, Send, X, MessageSquare, Sparkles, UtensilsCrossed, Hotel, User, RefreshCw, Volume2 } from 'lucide-react';

interface AiChatWidgetProps {
  onOpenReservation: (type: 'mesa' | 'quarto') => void;
}

export const AiChatWidget: React.FC<AiChatWidgetProps> = ({ onOpenReservation }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'bot',
      text: 'Olá! Seja muito bem-vindo ao Corujão! 🦉🥩\n\nSou o Garçom e Recepcionista Virtual. Como posso te ajudar hoje? Posso tirar dúvidas sobre nosso rodízio na brasa, diárias da pousada, espaço kids ou ajudar com sua reserva!',
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      actions: [
        { label: 'Reservar Mesa', type: 'reserve_table' },
        { label: 'Reservar Quarto', type: 'reserve_room' }
      ]
    }
  ]);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: messages.slice(-6)
        })
      });

      const data = await response.json();

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: data.reply || 'Como posso te ajudar com reservas de mesas ou quartos?',
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        actions: query.toLowerCase().includes('mesa') || query.toLowerCase().includes('rodízio')
          ? [{ label: 'Fazer Reserva de Mesa', type: 'reserve_table' }]
          : query.toLowerCase().includes('quarto') || query.toLowerCase().includes('pousada') || query.toLowerCase().includes('hospedagem')
          ? [{ label: 'Reservar Quarto na Pousada', type: 'reserve_room' }]
          : [
              { label: 'Reservar Mesa', type: 'reserve_table' },
              { label: 'Reservar Quarto', type: 'reserve_room' }
            ]
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: 'bot',
          text: 'Estou organizando a recepção, mas você pode usar os botões abaixo para reservar mesa ou quarto diretamente!',
          timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
          actions: [
            { label: 'Reservar Mesa', type: 'reserve_table' },
            { label: 'Reservar Quarto', type: 'reserve_room' }
          ]
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleActionClick = (actionType: 'reserve_table' | 'reserve_room' | 'view_menu' | 'whatsapp') => {
    if (actionType === 'reserve_table') {
      onOpenReservation('mesa');
      setIsOpen(false);
    } else if (actionType === 'reserve_room') {
      onOpenReservation('quarto');
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 left-6 z-40 bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-zinc-950 px-4 py-3 rounded-full shadow-2xl shadow-amber-950/60 transition transform hover:scale-105 flex items-center space-x-2.5 font-black text-xs uppercase tracking-wider border border-amber-400/50"
        >
          <div className="w-7 h-7 rounded-full bg-zinc-950 flex items-center justify-center text-amber-400">
            <Bot className="w-4 h-4" />
          </div>
          <span className="hidden sm:inline">Garçom Virtual Corujão</span>
          <span className="sm:hidden">Garçom IA</span>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 left-6 z-50 w-[92vw] sm:w-[380px] h-[520px] bg-zinc-950 border border-amber-500/40 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-fadeIn">
          
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-amber-950 via-zinc-900 to-amber-950 border-b border-amber-900/40 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 p-0.5 shadow-md flex items-center justify-center text-zinc-950 font-black">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-white text-sm">Garçom Virtual Corujão</h3>
                <p className="text-[10px] text-emerald-400 font-semibold flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>Online • Inteligência Gemini</span>
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl space-y-2 ${
                    msg.sender === 'user'
                      ? 'bg-amber-500 text-zinc-950 font-medium rounded-br-none shadow-md'
                      : 'bg-zinc-900 text-zinc-200 border border-zinc-800 rounded-bl-none shadow-md'
                  }`}
                >
                  <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>

                  {/* Actions buttons inside message */}
                  {msg.actions && msg.actions.length > 0 && (
                    <div className="pt-2 flex flex-wrap gap-1.5">
                      {msg.actions.map((act, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleActionClick(act.type)}
                          className="px-3 py-1.5 rounded-lg bg-zinc-950 text-amber-300 hover:bg-amber-500 hover:text-zinc-950 border border-amber-500/40 text-[11px] font-bold transition flex items-center space-x-1"
                        >
                          {act.type === 'reserve_table' ? <UtensilsCrossed className="w-3 h-3" /> : <Hotel className="w-3 h-3" />}
                          <span>{act.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <span className="text-[9px] text-zinc-500 mt-1 px-1">{msg.timestamp}</span>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center space-x-2 bg-zinc-900 p-3 rounded-2xl w-24 text-amber-400 border border-zinc-800">
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span className="text-[10px] font-bold">Digitando...</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Suggestion Chips */}
          <div className="px-3 py-2 bg-zinc-900/60 border-t border-zinc-800 flex items-center overflow-x-auto gap-1.5 no-scrollbar text-[11px]">
            <button
              onClick={() => handleSendMessage('Qual o valor do rodízio?')}
              className="px-2.5 py-1 rounded-full bg-zinc-800 text-amber-300 hover:bg-amber-500 hover:text-zinc-950 border border-amber-500/30 whitespace-nowrap transition"
            >
              Rodízio R$?
            </button>
            <button
              onClick={() => handleSendMessage('Quais os horários de check-in e check-out?')}
              className="px-2.5 py-1 rounded-full bg-zinc-800 text-amber-300 hover:bg-amber-500 hover:text-zinc-950 border border-amber-500/30 whitespace-nowrap transition"
            >
              Horários Pousada
            </button>
            <button
              onClick={() => handleSendMessage('Tem piscina e espaço kids?')}
              className="px-2.5 py-1 rounded-full bg-zinc-800 text-amber-300 hover:bg-amber-500 hover:text-zinc-950 border border-amber-500/30 whitespace-nowrap transition"
            >
              Lazer & Kids
            </button>
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-zinc-900 border-t border-zinc-800 flex items-center space-x-2">
            <input
              type="text"
              placeholder="Digite sua dúvida aqui..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={isLoading || !input.trim()}
              className="p-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-zinc-950 font-bold transition shadow-md"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}
    </>
  );
};
