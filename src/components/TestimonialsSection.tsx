import React from 'react';
import { Star, Quote, CheckCircle2, ThumbsUp } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  city: string;
  comment: string;
  rating: number;
  date: string;
  avatarUrl: string;
  tag: 'Mesa & Churrasco' | 'Hospedagem Pousada' | 'Aniversário em Família';
}

const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Henrique Vasconcelos',
    city: 'São Paulo - SP',
    comment: 'Atendimento impecável! A picanha na brasa e a costela de chão derretem na boca. Ficamos hospedados no final de semana e a piscina aquecida para as crianças foi maravilhosa.',
    rating: 5,
    date: 'Há 3 dias',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    tag: 'Hospedagem Pousada'
  },
  {
    id: 't2',
    name: 'Juliana e Renato Alcantara',
    city: 'Campinas - SP',
    comment: 'Comemoramos o aniversário da minha mãe lá. Reservamos uma mesa grande com antecedência pelo site e foi perfeito. Fomos super bem recebidos e a sobremesa da casa foi cortesia incrível!',
    rating: 5,
    date: 'Há 1 semana',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    tag: 'Aniversário em Família'
  },
  {
    id: 't3',
    name: 'Dr. Fernando Prado',
    city: 'Belo Horizonte - MG',
    comment: 'Sempre que viajo a trabalho pela região faço questão de parar no Corujão. O rodízio tem uma variedade fantástica de carnes nobres e o chopp é trincando de gelado!',
    rating: 5,
    date: 'Há 2 semanas',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    tag: 'Mesa & Churrasco'
  }
];

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="depoimentos" className="py-20 bg-zinc-950 text-white relative border-t border-amber-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold tracking-wider uppercase">
            <Quote className="w-3.5 h-3.5" />
            <span>Depoimentos de Clientes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Quem Experimenta, Recomenda O Corujão
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            Média 4.9 estrelas no Google com mais de 1.800 avaliações de famílias e viajantes satisfeitos.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-zinc-900 rounded-3xl p-6 border border-zinc-800 hover:border-amber-500/40 transition duration-300 flex flex-col justify-between space-y-6 shadow-xl relative"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-amber-500/10" />

              <div className="space-y-4">
                {/* Tag & Rating */}
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-extrabold uppercase tracking-wider">
                    {t.tag}
                  </span>
                  <div className="flex items-center space-x-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>

                <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed italic">
                  "{t.comment}"
                </p>
              </div>

              {/* Author */}
              <div className="pt-4 border-t border-zinc-800 flex items-center space-x-3">
                <img
                  src={t.avatarUrl}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover border border-amber-500/40"
                />
                <div>
                  <div className="flex items-center space-x-1">
                    <h4 className="font-bold text-white text-sm">{t.name}</h4>
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                  </div>
                  <p className="text-[11px] text-zinc-400">{t.city} • {t.date}</p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
