import React, { useState } from 'react';
import { Film, Play, Volume2, VolumeX, Sparkles, Heart } from 'lucide-react';

interface VideoFeedItem {
  id: string;
  title: string;
  subtitle: string;
  posterUrl: string;
  likes: number;
}

const initialVideos: VideoFeedItem[] = [
  {
    id: 'v1',
    title: 'Saindo do Fogo de Chão! 🔥',
    subtitle: 'Costela Janela assada por 12 horas derretendo na brasa do Corujão.',
    posterUrl: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=600&q=80',
    likes: 1240
  },
  {
    id: 'v2',
    title: 'Manhã na Pousada O Corujão ☕',
    subtitle: 'Café da manhã fresco com pão de queijo quentinho e suco natural.',
    posterUrl: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=600&q=80',
    likes: 890
  },
  {
    id: 'v3',
    title: 'Picanha ao Ponto Perfeito! 🥩',
    subtitle: 'A estrela do nosso espeto corrido fatiada diretamente na sua mesa.',
    posterUrl: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=600&q=80',
    likes: 2150
  }
];

export const VideoFeedSection: React.FC = () => {
  const [likes, setLikes] = useState<{ [key: string]: number }>({
    v1: 1240,
    v2: 890,
    v3: 2150
  });

  const [hasLiked, setHasLiked] = useState<{ [key: string]: boolean }>({});

  const toggleLike = (id: string) => {
    setHasLiked(prev => {
      const isLiked = prev[id];
      const newCount = isLiked ? likes[id] - 1 : likes[id] + 1;
      setLikes(l => ({ ...l, [id]: newCount }));
      return { ...prev, [id]: !isLiked };
    });
  };

  return (
    <section id="videos" className="py-20 bg-zinc-900 text-white relative border-t border-amber-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold tracking-wider uppercase">
            <Film className="w-3.5 h-3.5" />
            <span>Feed de Vídeos & Shorts</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Sinta a Experiência O Corujão em Vídeo
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            Confira momentos reais do nosso espeto corrido, pratos do dia e a energia acolhedora da nossa pousada.
          </p>
        </div>

        {/* Vertical Reel Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {initialVideos.map((video) => (
            <div
              key={video.id}
              className="relative bg-zinc-950 rounded-3xl overflow-hidden border border-amber-500/30 shadow-2xl aspect-[9/16] group"
            >
              <img
                src={video.posterUrl}
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-700 filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent opacity-90" />

              {/* Top Reel Badge */}
              <div className="absolute top-4 left-4 flex items-center space-x-2">
                <span className="px-3 py-1 rounded-full bg-amber-500 text-zinc-950 font-black text-[10px] uppercase tracking-wider shadow-lg">
                  Reels Corujão
                </span>
              </div>

              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-14 h-14 rounded-full bg-amber-500/90 hover:bg-amber-400 text-zinc-950 flex items-center justify-center shadow-xl transform hover:scale-110 transition duration-200">
                  <Play className="w-6 h-6 fill-zinc-950 ml-1" />
                </button>
              </div>

              {/* Floating Like Action */}
              <div className="absolute right-4 bottom-20 flex flex-col items-center space-y-1">
                <button
                  onClick={() => toggleLike(video.id)}
                  className={`p-3 rounded-full backdrop-blur-md transition ${
                    hasLiked[video.id] 
                      ? 'bg-rose-600 text-white shadow-lg shadow-rose-900/50' 
                      : 'bg-zinc-900/80 text-zinc-300 hover:text-rose-400'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${hasLiked[video.id] ? 'fill-white' : ''}`} />
                </button>
                <span className="text-[11px] font-bold text-white drop-shadow">
                  {likes[video.id]}
                </span>
              </div>

              {/* Bottom Info */}
              <div className="absolute bottom-4 left-4 right-16 space-y-1">
                <h3 className="font-extrabold text-white text-base drop-shadow-md">
                  {video.title}
                </h3>
                <p className="text-zinc-300 text-xs drop-shadow line-clamp-2">
                  {video.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
