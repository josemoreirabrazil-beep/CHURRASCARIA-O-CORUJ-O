import React from 'react';
import { Flame, ShieldCheck, HeartHandshake, Sparkles, Award, Users, CheckCircle2 } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="historia" className="py-20 bg-zinc-900 text-white relative overflow-hidden border-t border-amber-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold tracking-wider uppercase">
            <Flame className="w-3.5 h-3.5" />
            <span>Nossa História & Tradição</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Mais de 20 Anos Unindo o Sabor do Fogo de Chão ao Conforto da Serra
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Fundada pela família Corujão, nossa missão sempre foi simples: servir o melhor espeto corrido com o calor da verdadeira hospitalidade brasileira.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Images Grid Mosaic */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-3 relative">
            <div className="space-y-3">
              <div className="rounded-2xl overflow-hidden border border-amber-900/40 shadow-xl group">
                <img 
                  src="https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=600&q=80" 
                  alt="Costela assada lentamente"
                  className="w-full h-48 object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="rounded-2xl overflow-hidden border border-amber-900/40 shadow-xl group">
                <img 
                  src="https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=600&q=80" 
                  alt="Piscina da Pousada Corujão"
                  className="w-full h-64 object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
            </div>

            <div className="space-y-3 pt-6">
              <div className="rounded-2xl overflow-hidden border border-amber-900/40 shadow-xl group">
                <img 
                  src="https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=600&q=80" 
                  alt="Acomodação Pousada O Corujão"
                  className="w-full h-64 object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="rounded-2xl overflow-hidden border border-amber-900/40 shadow-xl group">
                <img 
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80" 
                  alt="Ambiente Climatizado do Restaurante"
                  className="w-full h-48 object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
            </div>

            {/* Experience Floating Stamp */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-600 to-amber-800 text-zinc-950 px-6 py-3 rounded-2xl shadow-2xl font-black text-center flex items-center space-x-3 border border-amber-400/50">
              <Award className="w-8 h-8 text-zinc-950" />
              <div className="text-left">
                <p className="text-xs uppercase tracking-wider font-extrabold text-amber-950">Referência Regional</p>
                <p className="text-sm font-black text-white">20+ Anos de Excelência</p>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="text-2xl sm:text-3xl font-bold text-amber-300">
              Gastronomia de Qualidade & Descanso Inesquecível em um Só Lugar
            </h3>

            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              O Corujão nasceu do sonho de oferecer uma experiência completa: onde você se delicia com um rodízio autêntico no almoço ou jantar e, em seguida, relaxa em quartos confortáveis com acesso à piscina e área verde preservada.
            </p>

            {/* Key Pillars */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start space-x-3">
                <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 mt-1">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-base">Carnes Nobres & Preparo Artesanal</h4>
                  <p className="text-zinc-400 text-xs sm:text-sm">
                    Selecionamos apenas cortes de procedência garantida. Picanha, costela assada por 12h e cupim recheado servidos no ponto perfeito.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 mt-1">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-base">Estrutura Completa para a Família</h4>
                  <p className="text-zinc-400 text-xs sm:text-sm">
                    Estacionamento privativo, Espaço Kids monitorado aos finais de semana e piscina aquecida para hóspedes da pousada.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 mt-1">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-base">Atendimento Familiar & Personalizado</h4>
                  <p className="text-zinc-400 text-xs sm:text-sm">
                    Nossa equipe cuida de cada detalhe, desde o café da manhã com pães artesanais até a reserva especial de mesas para celebrações.
                  </p>
                </div>
              </div>
            </div>

            {/* Checklist tags */}
            <div className="pt-4 grid grid-cols-2 gap-2 text-xs font-semibold text-zinc-300">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>Wi-Fi de Alta Velocidade Grátis</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>Café da Manhã Regional Incluso</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>Piscina Aquecida Liberada</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>Espaço Kids Climatizado</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
