export type RoomCategory = 'Standard' | 'Luxo' | 'Master';
export type RoomStatus = 'Disponível' | 'Ocupado' | 'Em Limpeza' | 'Manutenção';
export type DishCategory = 'Rodízio & Carnes' | 'Acompanhamentos' | 'Sobremesas' | 'Bebidas';
export type MediaCategory = 'Churrascaria' | 'Piscina' | 'Quartos' | 'Área Kids';
export type ReservationType = 'mesa' | 'quarto';
export type PaymentStatus = 'Aprovado' | 'Pendente' | 'Cancelado';
export type PaymentMethod = 'PIX' | 'Cartão de Crédito' | 'Local';

export interface MenuItem {
  id: string;
  name: string;
  category: DishCategory;
  description: string;
  price: number;
  imageUrl: string;
  isDailySpecial: boolean;
  isAvailable: boolean;
  badge?: string;
}

export interface Room {
  id: string;
  number: string;
  name: string;
  category: RoomCategory;
  pricePerNight: number;
  capacityAdults: number;
  capacityChildren: number;
  description: string;
  amenities: string[];
  status: RoomStatus;
  imageUrl: string;
}

export interface MediaItem {
  id: string;
  title: string;
  category: MediaCategory;
  type: 'image' | 'video';
  url: string;
  thumbnailUrl?: string;
  description?: string;
}

export interface TableReservationData {
  date: string;
  time: string;
  guestsCount: number;
  seatingArea: 'Interno (Ar)' | 'Externa/Piscina' | 'Próximo Espaço Kids';
  occasion?: string;
}

export interface RoomReservationData {
  roomId: string;
  roomName: string;
  roomCategory: RoomCategory;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  totalNights: number;
  pricePerNight: number;
  totalAmount: number;
}

export interface Reservation {
  id: string;
  code: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerCpf: string;
  type: ReservationType;
  tableDetails?: TableReservationData;
  roomDetails?: RoomReservationData;
  totalAmount: number;
  depositAmount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  pixQrCode?: string;
  pixCopiaECola?: string;
  createdAt: string;
  notes?: string;
}

export interface FinancialMetric {
  month: string;
  faturamentoChurrascaria: number;
  faturamentoPousada: number;
  totalReservas: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  actions?: {
    label: string;
    type: 'reserve_table' | 'reserve_room' | 'view_menu' | 'whatsapp';
    data?: any;
  }[];
}
