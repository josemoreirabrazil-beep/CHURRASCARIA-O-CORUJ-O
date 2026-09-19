import React, { useState } from 'react';
import { MediaItem, MediaCategory } from '../types';
import { Image as ImageIcon, Maximize2, X, Sparkles } from 'lucide-react';

interface GallerySectionProps {
  mediaItems: MediaItem[];
}

const categories: ('Todas' | MediaCategory)[] = [
  'Todas',
  'Churrascaria',
  'Piscina',
  'Quartos',
  'Área Kids'
];

export const GallerySection: React.FC<GallerySectionProps> = ({ mediaItems }) => {
  const [selectedCategory, setSelectedCategory] = useState<'Todas' | MediaCategory>('Todas');
  const [activeLightbox, setActiveLightbox] = useState<MediaItem | null>(null);

  const filtered = mediaItems.filter(item => {
    if (selectedCategory === 'Todas') return true;
    return item.category === selectedCategory;
  });

  return (
    <section id="ambientes" className="py-20 bg-zinc-950 text-white border-t border-amber-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold tracking-wider uppercase">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Galeria de Ambientes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Conheça Nossa Estrutura por Dentro e Por Fora
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            Espaços projetados para proporcionar conforto, diversão para as crianças e momentos inesquecíveis em família.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 mb-8 gap-2 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition border ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-zinc-950 border-amber-400 shadow-md'
                  : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white hover:border-amber-500/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveLightbox(item)}
              className="cursor-pointer group relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 aspect-[4/3] shadow-xl hover:border-amber-500/50 transition duration-300"
            >
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-700 filter brightness-90 group-hover:brightness-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-80 group-hover:opacity-90 transition" />

              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-300 font-extrabold text-[10px] uppercase tracking-wider backdrop-blur-md">
                {item.category}
              </div>

              <div className="absolute bottom-4 left-4 right-4 space-y-1">
                <h3 className="font-extrabold text-white text-base group-hover:text-amber-400 transition">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="text-zinc-300 text-xs line-clamp-2">
                    {item.description}
                  </p>
                )}
              </div>

              <div className="absolute top-3 right-3 p-2 rounded-xl bg-zinc-900/80 text-amber-400 opacity-0 group-hover:opacity-100 transition duration-200">
                <Maximize2 className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activeLightbox && (
          <div 
            onClick={() => setActiveLightbox(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
          >
            <div 
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-zinc-900 rounded-3xl border border-amber-500/40 overflow-hidden shadow-2xl space-y-4 p-4"
            >
              <button
                onClick={() => setActiveLightbox(null)}
                className="absolute top-6 right-6 z-10 p-2.5 rounded-full bg-zinc-950/80 text-zinc-300 hover:text-amber-400 border border-amber-500/30 transition"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="relative aspect-video rounded-2xl overflow-hidden bg-black">
                <img
                  src={activeLightbox.url}
                  alt={activeLightbox.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="p-2 space-y-1">
                <div className="inline-block px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
                  {activeLightbox.category}
                </div>
                <h3 className="text-xl font-bold text-white">{activeLightbox.title}</h3>
                {activeLightbox.description && (
                  <p className="text-zinc-400 text-sm">{activeLightbox.description}</p>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
