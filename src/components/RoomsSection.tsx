import React, { useState } from 'react';
import { Room } from '../types';
import { Hotel, Users, Wifi, Tv, Coffee, Sparkles, Check, ChevronRight, ShieldCheck } from 'lucide-react';

interface RoomsSectionProps {
  rooms: Room[];
  onOpenReservation: (type: 'quarto', roomId?: string) => void;
}

export const RoomsSection: React.FC<RoomsSectionProps> = ({
  rooms,
  onOpenReservation
}) => {
  const [selectedRoomModal, setSelectedRoomModal] = useState<Room | null>(null);

  return (
    <section id="pousada" className="py-20 bg-zinc-900 text-white relative border-t border-amber-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold tracking-wider uppercase">
            <Hotel className="w-3.5 h-3.5" />
            <span>Pousada & Acomodações</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Suítes Confortáveis para o Seu Merecido Descanso
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            Quartos equipados com ar-condicionado split, camas box super macias, banheiros privativos, Wi-Fi 500MB e café da manhã regional incluso na diária.
          </p>
        </div>

        {/* Room Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="bg-zinc-950 rounded-3xl border border-zinc-800 hover:border-amber-500/40 transition duration-300 overflow-hidden flex flex-col shadow-2xl group"
            >
              {/* Room Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={room.imageUrl}
                  alt={room.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-90" />

                {/* Status Badge */}
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-zinc-900/90 text-amber-300 border border-amber-500/40 text-[11px] font-bold uppercase tracking-wider shadow-lg">
                  {room.category}
                </div>

                <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider shadow-md ${
                  room.status === 'Disponível' 
                    ? 'bg-emerald-500 text-zinc-950' 
                    : 'bg-zinc-800 text-zinc-300 border border-zinc-700'
                }`}>
                  {room.status}
                </div>

                {/* Price tag over image */}
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                  <div className="bg-zinc-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-amber-500/30">
                    <span className="text-[10px] text-zinc-400 uppercase tracking-widest block">Diária a partir de</span>
                    <span className="text-xl font-black text-amber-400">R$ {room.pricePerNight.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center space-x-1 bg-zinc-900/80 px-2.5 py-1.5 rounded-xl text-xs text-zinc-300 border border-zinc-800">
                    <Users className="w-3.5 h-3.5 text-amber-400" />
                    <span>Até {room.capacityAdults + room.capacityChildren} pes.</span>
                  </div>
                </div>
              </div>

              {/* Room Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition">
                    {room.name}
                  </h3>

                  <p className="text-zinc-400 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                    {room.description}
                  </p>

                  {/* Key Amenities */}
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {room.amenities.slice(0, 4).map((amenity, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-zinc-900 text-zinc-300 border border-zinc-800 text-[11px] flex items-center space-x-1"
                      >
                        <Check className="w-3 h-3 text-amber-400" />
                        <span>{amenity}</span>
                      </span>
                    ))}
                    {room.amenities.length > 4 && (
                      <span className="px-2 py-1 rounded-lg bg-amber-500/10 text-amber-400 text-[10px] font-bold">
                        +{room.amenities.length - 4} mais
                      </span>
                    )}
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="pt-4 border-t border-zinc-800 flex items-center gap-2">
                  <button
                    onClick={() => setSelectedRoomModal(room)}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-bold border border-zinc-700 transition"
                  >
                    Ver Detalhes
                  </button>

                  <button
                    onClick={() => onOpenReservation('quarto', room.id)}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-zinc-950 text-xs font-black uppercase tracking-wider transition shadow-lg flex items-center justify-center space-x-1"
                  >
                    <span>Reservar</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Room Details Modal */}
        {selectedRoomModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-zinc-900 border border-amber-500/40 rounded-3xl max-w-2xl w-full p-6 space-y-6 max-h-[90vh] overflow-y-auto">
              <div className="relative aspect-video rounded-2xl overflow-hidden">
                <img
                  src={selectedRoomModal.imageUrl}
                  alt={selectedRoomModal.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-amber-500 text-zinc-950 font-black text-xs">
                  {selectedRoomModal.category}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-black text-white">{selectedRoomModal.name}</h3>
                  <span className="text-2xl font-black text-amber-400">R$ {selectedRoomModal.pricePerNight.toFixed(2)} /noite</span>
                </div>

                <p className="text-zinc-300 text-sm leading-relaxed">{selectedRoomModal.description}</p>

                <div className="pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">Comodidades Inclusas:</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs text-zinc-300">
                    {selectedRoomModal.amenities.map((a, i) => (
                      <div key={i} className="flex items-center space-x-2 bg-zinc-950 p-2 rounded-lg border border-zinc-800">
                        <Check className="w-4 h-4 text-amber-400" />
                        <span>{a}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-800 flex justify-end space-x-3">
                <button
                  onClick={() => setSelectedRoomModal(null)}
                  className="px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-bold"
                >
                  Fechar
                </button>
                <button
                  onClick={() => {
                    const roomId = selectedRoomModal.id;
                    setSelectedRoomModal(null);
                    onOpenReservation('quarto', roomId);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-zinc-950 text-xs font-black uppercase tracking-wider"
                >
                  Garantir Reserva
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
