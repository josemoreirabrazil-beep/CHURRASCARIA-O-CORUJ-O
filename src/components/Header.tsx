import React, { useState } from 'react';
import { Flame, Hotel, UtensilsCrossed, Phone, Clock, MapPin, ShieldCheck, Menu as MenuIcon, X, UserCog } from 'lucide-react';

interface HeaderProps {
  onOpenReservation: (type: 'mesa' | 'quarto') => void;
  onOpenAdmin: () => void;
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenReservation,
  onOpenAdmin,
  activeSection
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-zinc-950/95 backdrop-blur-md border-b border-amber-900/30 text-white shadow-xl">
      {/* Top Bar Contact Info */}
      <div className="bg-gradient-to-r from-amber-950 via-zinc-900 to-amber-950 border-b border-amber-900/20 text-xs py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-zinc-300">
          <div className="flex items-center space-x-6">
            <span className="flex items-center space-x-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              <span>ROD BR 116, KM 698 - Jequié / Vit. da Conquista - BA</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              <span>Rodízio: 11h30 às 15h30 e 18h30 às 22h30 | Pousada: 24h</span>
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <a 
              href="https://wa.me/5573999037223" 
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-1.5 hover:text-emerald-400 transition font-medium text-emerald-400"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.572-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.99c-.002 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c-.001 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span>(73) 99903-7223</span>
            </a>
            <span className="text-zinc-600">|</span>
            <button
              onClick={onOpenAdmin}
              className="flex items-center space-x-1 text-amber-400 hover:text-amber-300 font-medium transition"
            >
              <UserCog className="w-3.5 h-3.5" />
              <span>Painel Admin</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => scrollToSection('hero')}
          className="cursor-pointer flex items-center space-x-3 group"
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-amber-600 to-amber-900 p-0.5 shadow-lg shadow-amber-900/30 group-hover:scale-105 transition transform">
            <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center">
              <Flame className="w-6 h-6 text-amber-500 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-1">
              <span className="text-lg sm:text-xl font-extrabold tracking-tight bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 bg-clip-text text-transparent uppercase">
                O CORUJÃO
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-amber-500/90 font-medium tracking-wider uppercase">
              Churrascaria & Pousada
            </p>
          </div>
        </div>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center space-x-7 text-sm font-medium text-zinc-300">
          <button onClick={() => scrollToSection('historia')} className="hover:text-amber-400 transition">
            Sobre Nós
          </button>
          <button onClick={() => scrollToSection('cardapio')} className="hover:text-amber-400 transition flex items-center space-x-1">
            <UtensilsCrossed className="w-4 h-4 text-amber-500" />
            <span>Cardápio</span>
          </button>
          <button onClick={() => scrollToSection('pousada')} className="hover:text-amber-400 transition flex items-center space-x-1">
            <Hotel className="w-4 h-4 text-amber-500" />
            <span>Pousada</span>
          </button>
          <button onClick={() => scrollToSection('ambientes')} className="hover:text-amber-400 transition">
            Galeria
          </button>
          <button onClick={() => scrollToSection('videos')} className="hover:text-amber-400 transition">
            Vídeos
          </button>
          <button onClick={() => scrollToSection('depoimentos')} className="hover:text-amber-400 transition">
            Avaliações
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center space-x-3">
          <button
            onClick={() => onOpenReservation('mesa')}
            className="px-3.5 py-2 rounded-lg text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-amber-300 border border-amber-500/30 transition shadow-sm flex items-center space-x-1.5"
          >
            <UtensilsCrossed className="w-3.5 h-3.5 text-amber-400" />
            <span>Reservar Mesa</span>
          </button>

          <button
            onClick={() => onOpenReservation('quarto')}
            className="px-4 py-2 rounded-lg text-xs font-bold bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-zinc-950 transition shadow-md shadow-amber-900/40 flex items-center space-x-1.5"
          >
            <Hotel className="w-3.5 h-3.5" />
            <span>Reservar Quarto</span>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex sm:hidden items-center space-x-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-zinc-300 hover:bg-zinc-800 focus:outline-none"
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-amber-500" /> : <MenuIcon className="w-6 h-6 text-amber-500" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-zinc-900 border-b border-amber-900/40 px-4 py-5 space-y-4 text-sm animate-fadeIn">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-zinc-800">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenReservation('mesa'); }}
              className="w-full py-2.5 px-3 rounded-lg bg-zinc-800 text-amber-300 text-xs font-semibold border border-amber-500/30 flex justify-center items-center space-x-1.5"
            >
              <UtensilsCrossed className="w-4 h-4 text-amber-400" />
              <span>Reservar Mesa</span>
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenReservation('quarto'); }}
              className="w-full py-2.5 px-3 rounded-lg bg-amber-500 text-zinc-950 text-xs font-bold flex justify-center items-center space-x-1.5"
            >
              <Hotel className="w-4 h-4" />
              <span>Reservar Quarto</span>
            </button>
          </div>

          <div className="flex flex-col space-y-3 font-medium text-zinc-200">
            <button onClick={() => scrollToSection('historia')} className="text-left py-1 hover:text-amber-400">
              Sobre a Empresa
            </button>
            <button onClick={() => scrollToSection('cardapio')} className="text-left py-1 hover:text-amber-400">
              Cardápio & Rodízio
            </button>
            <button onClick={() => scrollToSection('pousada')} className="text-left py-1 hover:text-amber-400">
              Quartos da Pousada
            </button>
            <button onClick={() => scrollToSection('ambientes')} className="text-left py-1 hover:text-amber-400">
              Galeria de Ambientes
            </button>
            <button onClick={() => scrollToSection('videos')} className="text-left py-1 hover:text-amber-400">
              Vídeos & Reels
            </button>
            <button onClick={() => scrollToSection('depoimentos')} className="text-left py-1 hover:text-amber-400">
              Depoimentos de Clientes
            </button>
            <button 
              onClick={() => { setMobileMenuOpen(false); onOpenAdmin(); }}
              className="text-left py-2 font-semibold text-amber-400 border-t border-zinc-800 flex items-center space-x-2"
            >
              <UserCog className="w-4 h-4" />
              <span>Painel de Administração</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
