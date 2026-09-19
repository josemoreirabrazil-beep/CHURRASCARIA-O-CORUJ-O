import React, { useState } from 'react';
import { Flame, MapPin, Phone, Mail, Clock, Send, ShieldCheck, Heart, UserCog } from 'lucide-react';

interface FooterProps {
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  const [formState, setFormState] = useState({ name: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formState.name && formState.phone) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
      setFormState({ name: '', phone: '', message: '' });
    }
  };

  return (
    <footer className="bg-zinc-950 text-white border-t border-amber-900/40 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-800 p-0.5 shadow-lg shadow-amber-900/40">
                <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center">
                  <Flame className="w-6 h-6 text-amber-500 animate-pulse" />
                </div>
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight text-white uppercase">
                  O CORUJÃO
                </span>
                <p className="text-[10px] text-amber-500 font-bold tracking-wider uppercase">
                  Churrascaria & Pousada
                </p>
              </div>
            </div>

            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
              Tradição gaúcha em carnes nobres no espeto corrido e o melhor aconchego de pousada com piscina aquecida, espaço kids e área verde.
            </p>

            <div className="pt-2 space-y-3 text-xs text-zinc-300">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <p className="font-bold text-white">ROD BR 116, KM 698 JEQUIE/VIT. DA CONQUISTA</p>
                  <p className="text-zinc-300">ÁREA RURAL DE JEQUIE</p>
                  <p className="text-zinc-400">CEP: 45.211-899 — JEQUIÉ – BA</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 pt-1">
                <a
                  href="https://wa.me/5573999037223?text=Ol%C3%A1!%20Gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20a%20Churrascaria%20e%20Pousada%20O%20Coruj%C3%A3o."
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center space-x-2.5 text-zinc-200 hover:text-emerald-400 transition group bg-zinc-900 border border-emerald-500/40 px-3.5 py-2 rounded-xl"
                >
                  <svg className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition flex-shrink-0 fill-current" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.572-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.99c-.002 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c-.001 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <span className="font-extrabold text-emerald-400 text-xs sm:text-sm tracking-wide">(73) 99903-7223</span>
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>contato@ocorujao.com.br</span>
              </div>
            </div>
          </div>

          {/* Hours & Location Card */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-base font-bold text-amber-400 uppercase tracking-wider flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>Horários de Funcionamento</span>
            </h3>

            <div className="bg-zinc-900 p-4 rounded-2xl border border-zinc-800 space-y-3 text-xs">
              <div>
                <p className="font-extrabold text-white">Churrascaria (Rodízio):</p>
                <p className="text-zinc-400">Terça a Domingo: 11h30 às 15h30 (Almoço)</p>
                <p className="text-zinc-400">Sexta e Sábado: 18h30 às 22h30 (Jantar Especial)</p>
              </div>

              <div className="pt-2 border-t border-zinc-800">
                <p className="font-extrabold text-white">Pousada:</p>
                <p className="text-zinc-400">Recepção 24 horas todos os dias</p>
                <p className="text-zinc-400">Check-in: 14h00 | Check-out: 12h00</p>
              </div>
            </div>

            {/* Google Map Mock Card */}
            <div className="p-3 bg-zinc-900 rounded-2xl border border-zinc-800 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-amber-500" />
                <div>
                  <p className="font-bold text-white">Como Chegar</p>
                  <p className="text-[11px] text-zinc-400">Fácil acesso pela BR-116</p>
                </div>
              </div>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Rodovia+BR-116+KM+698+Jequie+BA"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg bg-amber-500 text-zinc-950 font-bold text-[11px] hover:bg-amber-400 transition"
              >
                Abrir Mapa
              </a>
            </div>
          </div>

          {/* Quick Contact Form */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-base font-bold text-amber-400 uppercase tracking-wider flex items-center space-x-2">
              <Send className="w-4 h-4" />
              <span>Mensagem Rápida</span>
            </h3>

            {submitted ? (
              <div className="bg-emerald-950/80 border border-emerald-500/50 p-4 rounded-2xl text-emerald-300 text-xs font-semibold space-y-1">
                <p className="font-bold">Mensagem enviada com sucesso!</p>
                <p className="text-zinc-400">Nossa recepção entrará em contato em breve.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-2 text-xs">
                <input
                  type="text"
                  placeholder="Seu Nome"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500"
                  required
                />
                <input
                  type="text"
                  placeholder="Seu Telefone / WhatsApp"
                  value={formState.phone}
                  onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500"
                  required
                />
                <textarea
                  placeholder="Dúvida ou solicitação especial"
                  rows={2}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-zinc-950 font-extrabold transition shadow-md uppercase tracking-wider text-xs"
                >
                  Enviar Mensagem
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>© {new Date().getFullYear()} Churrascaria e Pousada O Corujão. Todos os direitos reservados.</p>
          <div className="flex items-center space-x-4">
            <button
              onClick={onOpenAdmin}
              className="text-amber-400 hover:underline flex items-center space-x-1 font-medium"
            >
              <UserCog className="w-3.5 h-3.5" />
              <span>Acesso Restrito / Admin</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
