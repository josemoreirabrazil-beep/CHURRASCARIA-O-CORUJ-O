import React, { useState, useEffect } from 'react';
import { MenuItem, Room, MediaItem, Reservation, FinancialMetric } from './types';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { DailySpecialsSection } from './components/DailySpecialsSection';
import { RoomsSection } from './components/RoomsSection';
import { GallerySection } from './components/GallerySection';
import { VideoFeedSection } from './components/VideoFeedSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { AiChatWidget } from './components/AiChatWidget';
import { ReservationModal } from './components/ReservationModal';
import { AdminDashboard } from './components/AdminDashboard';
import {
  initialMenuItems,
  initialRooms,
  initialMediaItems,
  initialReservations,
  initialFinancialMetrics
} from './data/initialData';

export default function App() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);
  const [rooms, setRooms] = useState<Room[]>(initialRooms);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>(initialMediaItems);
  const [reservations, setReservations] = useState<Reservation[]>(initialReservations);
  const [financials, setFinancials] = useState<FinancialMetric[]>(initialFinancialMetrics);

  // Modals state
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [reservationType, setReservationType] = useState<'mesa' | 'quarto'>('mesa');
  const [selectedRoomId, setSelectedRoomId] = useState<string | undefined>();
  const [selectedDishName, setSelectedDishName] = useState<string | undefined>();

  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Fetch Data from Server
  const loadServerData = async () => {
    try {
      const [resMenu, resRooms, resMedia, resReservations, resFinancials] = await Promise.all([
        fetch('/api/menu').then(r => r.ok ? r.json() : null),
        fetch('/api/rooms').then(r => r.ok ? r.json() : null),
        fetch('/api/media').then(r => r.ok ? r.json() : null),
        fetch('/api/reservations').then(r => r.ok ? r.json() : null),
        fetch('/api/financials').then(r => r.ok ? r.json() : null)
      ]);

      if (resMenu) setMenuItems(resMenu);
      if (resRooms) setRooms(resRooms);
      if (resMedia) setMediaItems(resMedia);
      if (resReservations) setReservations(resReservations);
      if (resFinancials) setFinancials(resFinancials);
    } catch (err) {
      console.log('Using local fallback initial data');
    }
  };

  useEffect(() => {
    loadServerData();
  }, []);

  const handleOpenReservation = (type: 'mesa' | 'quarto', roomIdOrDish?: string) => {
    setReservationType(type);
    if (type === 'quarto') {
      setSelectedRoomId(roomIdOrDish);
      setSelectedDishName(undefined);
    } else {
      setSelectedDishName(roomIdOrDish);
      setSelectedRoomId(undefined);
    }
    setIsReservationOpen(true);
  };

  // Admin Actions
  const handleUpdateMenuItem = async (item: Partial<MenuItem>) => {
    try {
      if (item.id) {
        await fetch(`/api/menu/${item.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item)
        });
      } else {
        await fetch('/api/menu', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item)
        });
      }
      loadServerData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteMenuItem = async (id: string) => {
    try {
      await fetch(`/api/menu/${id}`, { method: 'DELETE' });
      loadServerData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateRoomStatus = async (id: string, status: Room['status']) => {
    try {
      await fetch(`/api/rooms/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      loadServerData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddMedia = async (media: Partial<MediaItem>) => {
    try {
      await fetch('/api/media', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(media)
      });
      loadServerData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteMedia = async (id: string) => {
    try {
      await fetch(`/api/media/${id}`, { method: 'DELETE' });
      loadServerData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateReservationStatus = async (id: string, paymentStatus: Reservation['paymentStatus']) => {
    try {
      await fetch(`/api/reservations/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentStatus })
      });
      loadServerData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-amber-500 selection:text-zinc-950">
      
      {/* Navigation Header */}
      <Header
        onOpenReservation={handleOpenReservation}
        onOpenAdmin={() => setIsAdminOpen(true)}
        activeSection="hero"
      />

      {/* Main Page Sections */}
      <main>
        <HeroSection
          onOpenReservation={handleOpenReservation}
          onNavigateToCardapio={() => {
            document.getElementById('cardapio')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        <AboutSection />

        <DailySpecialsSection
          menuItems={menuItems}
          onOpenReservation={handleOpenReservation}
        />

        <RoomsSection
          rooms={rooms}
          onOpenReservation={handleOpenReservation}
        />

        <GallerySection
          mediaItems={mediaItems}
        />

        <VideoFeedSection />

        <TestimonialsSection />
      </main>

      {/* Footer */}
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Floating Customer Help Widgets */}
      <WhatsAppButton />

      <AiChatWidget
        onOpenReservation={handleOpenReservation}
      />

      {/* Interactive Reservation & Checkout Modal */}
      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
        initialType={reservationType}
        initialRoomId={selectedRoomId}
        initialDishName={selectedDishName}
        rooms={rooms}
      />

      {/* Master Admin Dashboard Modal */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        menuItems={menuItems}
        rooms={rooms}
        mediaItems={mediaItems}
        reservations={reservations}
        financials={financials}
        onRefreshData={loadServerData}
        onUpdateMenuItem={handleUpdateMenuItem}
        onDeleteMenuItem={handleDeleteMenuItem}
        onUpdateRoomStatus={handleUpdateRoomStatus}
        onAddMedia={handleAddMedia}
        onDeleteMedia={handleDeleteMedia}
        onUpdateReservationStatus={handleUpdateReservationStatus}
      />

    </div>
  );
}
