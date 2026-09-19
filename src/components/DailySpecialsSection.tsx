import React, { useState } from 'react';
import { MenuItem, DishCategory } from '../types';
import { Flame, UtensilsCrossed, Sparkles, Check, ChevronRight } from 'lucide-react';

interface DailySpecialsSectionProps {
  menuItems: MenuItem[];
  onOpenReservation: (type: 'mesa', dishName?: string) => void;
}

const categories: ('Todas' | DishCategory)[] = [
  'Todas',
  'Rodízio & Carnes',
  'Acompanhamentos',
  'Sobremesas',
  'Bebidas'
];

export const DailySpecialsSection: React.FC<DailySpecialsSectionProps> = ({
  menuItems,
  onOpenReservation
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'Todas' | DishCategory>('Todas');

  const filteredItems = menuItems.filter(item => {
    if (!item.isAvailable) return false;
    if (selectedCategory === 'Todas') return true;
    return item.category === selectedCategory;
  });

  return (
    <section id="cardapio" className="py-20 bg-zinc-950 text-white relative border-t border-amber-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-extrabold tracking-wider uppercase">
            <UtensilsCrossed className="w-3.5 h-3.5" />
            <span>Cardápio Digital & Especialidades</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Pratos do Dia & Cortes Nobres da Nossa Brasa
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            Rodízio completo com seleção rigorosa de carnes, acompanhamentos tipicamente caseiros e sobremesas de dar água na boca.
          </p>
        </div>

        {/* Rodízio Promo Banner Card */}
        <div className="mb-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-950 via-zinc-900 to-amber-950 border border-amber-500/40 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 text-center md:text-left z-10">
            <span className="px-3 py-1 rounded-md bg-amber-500 text-zinc-950 font-black text-xs uppercase tracking-wider">
              Destaque do Chef
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Rodízio Completo do Corujão
            </h3>
            <p className="text-zinc-300 text-xs sm:text-sm max-w-xl">
              18+ Cortes na brasa (Picanha, Ancho, Costela de Chão 12h, Cupim Recheado), Buffet de saladas frescas, pratos quentes e acompanhamentos à vontade.
            </p>
          </div>

          <div className="text-center md:text-right z-10 flex flex-col sm:flex-row md:flex-col items-center justify-center gap-3">
            <div>
              <span className="text-xs text-zinc-400 uppercase tracking-widest block">Apenas</span>
              <span className="text-3xl sm:text-4xl font-black text-amber-400">R$ 89,90</span>
              <span className="text-xs text-zinc-400 block">/ por pessoa</span>
            </div>

            <button
              onClick={() => onOpenReservation('mesa', 'Rodízio Completo do Corujão')}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-zinc-950 font-extrabold text-xs uppercase tracking-wider transition shadow-lg flex items-center space-x-1.5"
            >
              <span>Reservar Mesa Agora</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 mb-8 gap-2 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 border ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-zinc-950 border-amber-400 shadow-lg shadow-amber-900/30'
                  : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white hover:border-amber-500/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-zinc-900 rounded-2xl border border-zinc-800 hover:border-amber-500/40 transition duration-300 overflow-hidden flex flex-col shadow-xl group"
            >
              {/* Image Container */}
              <div className="relative aspect-[16/10] overflow-hidden bg-zinc-950">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-80" />

                {/* Badge if present */}
                {item.badge && (
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-amber-500 text-zinc-950 font-extrabold text-[10px] uppercase tracking-wider shadow-md">
                    {item.badge}
                  </div>
                )}

                {item.isDailySpecial && (
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-amber-950/90 text-amber-300 border border-amber-500/40 font-bold text-[10px] uppercase tracking-wider flex items-center space-x-1 shadow-md">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    <span>Prato do Dia</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-extrabold text-white text-base sm:text-lg group-hover:text-amber-400 transition">
                      {item.name}
                    </h3>
                  </div>

                  <p className="text-zinc-400 text-xs line-clamp-3 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Footer price & CTA */}
                <div className="pt-3 border-t border-zinc-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">Preço</span>
                    <span className="text-lg font-black text-amber-400">
                      {item.price > 0 ? `R$ ${item.price.toFixed(2)}` : 'Incluso no Rodízio'}
                    </span>
                  </div>

                  <button
                    onClick={() => onOpenReservation('mesa', item.name)}
                    className="px-3.5 py-2 rounded-lg bg-zinc-800 hover:bg-amber-500 hover:text-zinc-950 text-amber-300 border border-amber-500/30 text-xs font-bold transition flex items-center space-x-1"
                  >
                    <span>Pedir / Reservar</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
