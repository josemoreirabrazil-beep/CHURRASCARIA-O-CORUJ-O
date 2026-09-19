import { MenuItem, Room, MediaItem, Reservation, FinancialMetric } from '../types';

export const initialMenuItems: MenuItem[] = [
  {
    id: 'm1',
    name: 'Rodízio Completo do Corujão',
    category: 'Rodízio & Carnes',
    description: 'Acesso livre a mais de 18 cortes nobres na brasa (Picanha, Ancho, Cupim Recheado, Costela de Chão, Fraldinha, Alcatra) + Buffet completo de saladas e acompanhamentos quentes.',
    price: 89.90,
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    isDailySpecial: true,
    isAvailable: true,
    badge: 'Mais Pedido'
  },
  {
    id: 'm2',
    name: 'Picanha Nobre no Espeto Corrido',
    category: 'Rodízio & Carnes',
    description: 'Picanha australiana fatiada finamente, selada na brasa viva com flor de sal e manteiga de garrafa.',
    price: 0, // Incluso no rodízio
    imageUrl: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80',
    isDailySpecial: true,
    isAvailable: true,
    badge: 'Destaque da Brasa'
  },
  {
    id: 'm3',
    name: 'Costela de Chão Premium (Assada 12h)',
    category: 'Rodízio & Carnes',
    description: 'Costela janela assada lentamente por 12 horas no fogo de chão, derretendo do osso.',
    price: 0,
    imageUrl: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=800&q=80',
    isDailySpecial: true,
    isAvailable: true,
    badge: 'Especial do Chef'
  },
  {
    id: 'm4',
    name: 'Cupim Recheado com Queijo Coalho',
    category: 'Rodízio & Carnes',
    description: 'Cupim macio e suculento recheado com queijo coalho e ervas finas, dourado no espeto.',
    price: 0,
    imageUrl: 'https://images.unsplash.com/photo-1594041680534-e8c8cdebd659?auto=format&fit=crop&w=800&q=80',
    isDailySpecial: false,
    isAvailable: true
  },
  {
    id: 'm5',
    name: 'Buffet de Acompanhamentos & Saladas',
    category: 'Acompanhamentos',
    description: 'Arroz carreteiro, feijão tropeiro com torresmo crocante, mandioca frita com manteiga, polenta com queijo e mais de 25 opções de saladas frescas.',
    price: 0,
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    isDailySpecial: false,
    isAvailable: true
  },
  {
    id: 'm6',
    name: 'Petit Gâteau de Doce de Leite com Gelato',
    category: 'Sobremesas',
    description: 'Bolo morno de doce de leite de minas com recheio cremoso, acompanhado de gelato artesanal de baunilha.',
    price: 26.90,
    imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    isDailySpecial: true,
    isAvailable: true,
    badge: 'Sobremesa do Dia'
  },
  {
    id: 'm7',
    name: 'Pudim Rústico da Vovó Corujão',
    category: 'Sobremesas',
    description: 'Pudim cremoso sem furinhos com calda caramelizada de açúcar mascavo e raspas de limão.',
    price: 18.90,
    imageUrl: 'https://images.unsplash.com/photo-1528975604071-b4dc52a2d18c?auto=format&fit=crop&w=800&q=80',
    isDailySpecial: false,
    isAvailable: true
  },
  {
    id: 'm8',
    name: 'Chopp Pilsen Trincando (500ml)',
    category: 'Bebidas',
    description: 'Chopp gelado servido em caneca congelada com colarinho aveludado perfeito.',
    price: 14.90,
    imageUrl: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=800&q=80',
    isDailySpecial: true,
    isAvailable: true,
    badge: 'Geladíssimo'
  },
  {
    id: 'm9',
    name: 'Caipirinha Corujão de Cachaça Artesanal',
    category: 'Bebidas',
    description: 'Limão taiti fresco, rapadura moída, cachaça envelhecida em tambor de carvalho e bastante gelo.',
    price: 24.90,
    imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
    isDailySpecial: false,
    isAvailable: true
  }
];

export const initialRooms: Room[] = [
  {
    id: 'r1',
    number: '101',
    name: 'Suíte Standard Corujão',
    category: 'Standard',
    pricePerNight: 220.00,
    capacityAdults: 2,
    capacityChildren: 1,
    description: 'Achegado e confortável, perfeito para casais ou viajantes a trabalho. Ambiente climatizado, decoração em madeira rústica e iluminação quente.',
    amenities: ['Ar-condicionado Split', 'Wi-Fi 500MB', 'Cama Box Casal', 'TV LED 43"', 'Frigobar', 'Café da Manhã Incluso'],
    status: 'Disponível',
    imageUrl: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'r2',
    number: '202',
    name: 'Suíte Luxo Ouro Preto com Varanda',
    category: 'Luxo',
    pricePerNight: 350.00,
    capacityAdults: 3,
    capacityChildren: 1,
    description: 'Quarto espaçoso com varanda privativa e rede para descanso. Cama King Size, acabamento refinado em pedra e acesso direto à área da piscina.',
    amenities: ['Varanda com Rede', 'Cama King Size', 'Ar-condicionado', 'Smart TV 55"', 'Frigobar Premium', 'Banheiro em Mármore', 'Café da Manhã Incluso'],
    status: 'Disponível',
    imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'r3',
    number: '303',
    name: 'Suíte Master Imperial com Hidro',
    category: 'Master',
    pricePerNight: 550.00,
    capacityAdults: 2,
    capacityChildren: 2,
    description: 'Nossa acomodação mais exclusiva! Banheira de hidromassagem dupla com vista panorâmica, cama Super King, espumante e cesta de frutas de boas-vindas.',
    amenities: ['Hidromassagem Dupla', 'Cama Super King', 'Vista Panorâmica', 'Espumante de Boas-Vindas', 'Smart TV 65"', 'Café na Suíte', 'Acesso VIP Piscina'],
    status: 'Ocupado',
    imageUrl: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'r4',
    number: '102',
    name: 'Suíte Família Aconchego',
    category: 'Luxo',
    pricePerNight: 380.00,
    capacityAdults: 4,
    capacityChildren: 2,
    description: 'Acomodação ideal para famílias grandes. Conta com 1 cama de casal king e 2 camas de solteiro, com bastante espaço e segurança para as crianças.',
    amenities: ['2 Ambientes', 'Cama King + 2 Solteiro', 'Ar-condicionado', 'Wi-Fi 500MB', 'Próximo à Área Kids', 'Café da Manhã Incluso'],
    status: 'Disponível',
    imageUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80'
  }
];

export const initialMediaItems: MediaItem[] = [
  {
    id: 'med1',
    title: 'Nossa Churrascaria - Salão Principal Climatizado',
    category: 'Churrascaria',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80',
    description: 'Salão amplo com capacidade para 250 pessoas, ideal para famílias e eventos.'
  },
  {
    id: 'med2',
    title: 'Cortes Nobres no Espeto',
    category: 'Churrascaria',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80',
    description: 'Preparação artesanal na brasa com carnes de procedência garantida.'
  },
  {
    id: 'med3',
    title: 'Área da Piscina Iluminada da Pousada',
    category: 'Piscina',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1000&q=80',
    description: 'Piscina aquecida com iluminação noturna, espreguiçadeiras e serviço de bar.'
  },
  {
    id: 'med4',
    title: 'Suíte Master com Hidromassagem',
    category: 'Quartos',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=80',
    description: 'Aconchego e sofisticação para momentos especiais.'
  },
  {
    id: 'med5',
    title: 'Espaço Kids Climatizado e Playground',
    category: 'Área Kids',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1566454825481-4e48f80aa4d7?auto=format&fit=crop&w=1000&q=80',
    description: 'Diversão garantida para a garotada com monitores aos finais de semana.'
  },
  {
    id: 'med6',
    title: 'Café da Manhã Regional da Pousada',
    category: 'Quartos',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=1000&q=80',
    description: 'Pães artesanais, pão de queijo quentinho, frutas da estação e sucos naturais.'
  }
];

export const initialReservations: Reservation[] = [
  {
    id: 'res1',
    code: 'COR-9821',
    customerName: 'Carlos Eduardo Silva',
    customerEmail: 'carlos.silva@email.com',
    customerPhone: '(11) 98765-4321',
    customerCpf: '123.456.789-00',
    type: 'quarto',
    roomDetails: {
      roomId: 'r2',
      roomName: 'Suíte Luxo Ouro Preto com Varanda',
      roomCategory: 'Luxo',
      checkIn: '2026-08-15',
      checkOut: '2026-08-17',
      adults: 2,
      children: 1,
      totalNights: 2,
      pricePerNight: 350,
      totalAmount: 700
    },
    totalAmount: 700,
    depositAmount: 210, // 30% sinal
    paymentMethod: 'PIX',
    paymentStatus: 'Aprovado',
    createdAt: '2026-08-08 14:30',
    notes: 'Solicitou berço para criança e preferência por andar alto.'
  },
  {
    id: 'res2',
    code: 'COR-4310',
    customerName: 'Mariana Mendonça',
    customerEmail: 'mariana@email.com',
    customerPhone: '(31) 99123-8877',
    customerCpf: '987.654.321-11',
    type: 'mesa',
    tableDetails: {
      date: '2026-08-12',
      time: '12:30',
      guestsCount: 6,
      seatingArea: 'Interno (Ar)',
      occasion: 'Aniversário'
    },
    totalAmount: 50.00, // Taxa/Caução de reserva revertida em consumo
    depositAmount: 50.00,
    paymentMethod: 'PIX',
    paymentStatus: 'Aprovado',
    createdAt: '2026-08-09 10:15',
    notes: 'Mesa decorada para aniversário de família.'
  },
  {
    id: 'res3',
    code: 'COR-7712',
    customerName: 'Roberto Alencar',
    customerEmail: 'roberto@email.com',
    customerPhone: '(21) 98822-1100',
    customerCpf: '456.789.123-55',
    type: 'quarto',
    roomDetails: {
      roomId: 'r3',
      roomName: 'Suíte Master Imperial com Hidro',
      roomCategory: 'Master',
      checkIn: '2026-08-20',
      checkOut: '2026-08-22',
      adults: 2,
      children: 0,
      totalNights: 2,
      pricePerNight: 550,
      totalAmount: 1100
    },
    totalAmount: 1100,
    depositAmount: 1100,
    paymentMethod: 'Cartão de Crédito',
    paymentStatus: 'Aprovado',
    createdAt: '2026-08-10 09:00',
    notes: 'Viagem de bodas de prata.'
  }
];

export const initialFinancialMetrics: FinancialMetric[] = [
  { month: 'Mar', faturamentoChurrascaria: 42000, faturamentoPousada: 28000, totalReservas: 110 },
  { month: 'Abr', faturamentoChurrascaria: 48000, faturamentoPousada: 31000, totalReservas: 135 },
  { month: 'Mai', faturamentoChurrascaria: 51000, faturamentoPousada: 35000, totalReservas: 148 },
  { month: 'Jun', faturamentoChurrascaria: 62000, faturamentoPousada: 42000, totalReservas: 180 },
  { month: 'Jul', faturamentoChurrascaria: 75000, faturamentoPousada: 58000, totalReservas: 230 },
  { month: 'Ago', faturamentoChurrascaria: 82000, faturamentoPousada: 64000, totalReservas: 260 }
];
