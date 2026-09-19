import React from 'react';
import { Flame, UtensilsCrossed, Hotel, Star, ShieldCheck, Sparkles, Award } from 'lucide-react';

interface HeroSectionProps {
  onOpenReservation: (type: 'mesa' | 'quarto') => void;
  onNavigateToCardapio: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenReservation,
  onNavigateToCardapio
}) => {
  return (
    <section id="hero" className="relative bg-zinc-950 text-white overflow-hidden pt-8 pb-16 md:py-24">
      {/* Background Hero Image with Dark Gradient & Ember Overlay */}
      <div className="absolute inset-0 z-0 opacity-40 mix-blend-luminosity bg-cover bg-center bg-no-repeat filter brightness-90"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1920&q=80')`
        }}
      />
      
      {/* Dark overlay gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-zinc-950/60 z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-950/40 via-transparent to-transparent z-0 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Copy Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-300 text-xs sm:text-sm font-semibold tracking-wide shadow-lg">
              <Sparkles className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
              <span>Sabor Inigualável & Hospedagem Aconchegante</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none text-white">
              O Legítimo Churrasco <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 bg-clip-text text-transparent">
                na Brasa & Pousada
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Desfrute de mais de 18 cortes nobres no espeto corrido, acompanhamentos da roça e relaxe em suítes aconchegantes com piscina aquecida e área verde. O destino perfeito para sua família!
            </p>

            {/* DOUBLE CTA BUTTONS */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4">
              <button
                onClick={() => onOpenReservation('mesa')}
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-zinc-950 font-extrabold text-base shadow-xl shadow-amber-900/40 transition transform hover:-translate-y-0.5 flex items-center justify-center space-x-2.5 group"
              >
                <UtensilsCrossed className="w-5 h-5 text-zinc-950 group-hover:scale-110 transition" />
                <span>Ver Cardápio / Reservar Mesa</span>
              </button>

              <button
                onClick={() => onOpenReservation('quarto')}
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-amber-300 font-bold text-base border border-amber-500/40 transition shadow-lg flex items-center justify-center space-x-2.5 group"
              >
                <Hotel className="w-5 h-5 text-amber-400 group-hover:scale-110 transition" />
                <span>Reservar Quarto</span>
              </button>
            </div>

            {/* Highlights Bar */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 border-t border-amber-900/30 max-w-xl mx-auto lg:mx-0">
              <div className="flex items-center space-x-2 text-xs text-zinc-300">
                <div className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
                  <Flame className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-white">18+ Cortes</p>
                  <p className="text-[11px] text-zinc-400">Espeto Corrido</p>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-xs text-zinc-300">
                <div className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
                  <Hotel className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-white">Suítes Luxo</p>
                  <p className="text-[11px] text-zinc-400">Café da Manhã grátis</p>
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1 flex items-center space-x-2 text-xs text-zinc-300">
                <div className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                </div>
                <div>
                  <p className="font-bold text-white">Nota 4.9/5</p>
                  <p className="text-[11px] text-zinc-400">Google Reviews</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Showcase Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl p-2 bg-gradient-to-b from-amber-500/30 via-amber-900/20 to-zinc-900/80 border border-amber-500/30 shadow-2xl backdrop-blur-sm">
              <div className="relative rounded-xl overflow-hidden aspect-[4/3] group">
                <img 
                  src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80" 
                  alt="Churrasco no Espeto Corrido - O Corujão"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
                
                {/* Float price tag */}
                <div className="absolute bottom-4 left-4 right-4 p-3 bg-zinc-950/90 backdrop-blur-md rounded-xl border border-amber-500/40 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">Rodízio Especial</span>
                    <p className="text-sm font-extrabold text-white">Rodízio Completo de Carnes</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-zinc-400 line-through">R$ 99,90</span>
                    <p className="text-lg font-black text-amber-400">R$ 89,90</p>
                  </div>
                </div>

                {/* Badge top right */}
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-amber-500 text-zinc-950 font-black text-xs uppercase tracking-wider shadow-lg flex items-center space-x-1">
                  <Award className="w-3.5 h-3.5" />
                  <span>Destaque</span>
                </div>
              </div>

              {/* Quick Info bar below image */}
              <div className="p-3 grid grid-cols-2 gap-2 text-center text-xs">
                <div className="bg-zinc-900/80 p-2 rounded-lg border border-zinc-800">
                  <p className="text-zinc-400 text-[11px]">Churrascaria</p>
                  <p className="font-bold text-amber-300">Aberto hoje das 11h30</p>
                </div>
                <div className="bg-zinc-900/80 p-2 rounded-lg border border-zinc-800">
                  <p className="text-zinc-400 text-[11px]">Pousada</p>
                  <p className="font-bold text-amber-300">Check-in flexível 24h</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
