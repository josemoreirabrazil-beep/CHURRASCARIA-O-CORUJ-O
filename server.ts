import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import QRCode from 'qrcode';
import {
  initialMenuItems,
  initialRooms,
  initialMediaItems,
  initialReservations,
  initialFinancialMetrics
} from './src/data/initialData.js';
import { MenuItem, Room, MediaItem, Reservation } from './src/types.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

// Ensure data directory and file exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

interface DB {
  menuItems: MenuItem[];
  rooms: Room[];
  mediaItems: MediaItem[];
  reservations: Reservation[];
  financials: typeof initialFinancialMetrics;
}

function loadDB(): DB {
  try {
    if (fs.existsSync(DB_FILE)) {
      const raw = fs.readFileSync(DB_FILE, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Error reading DB file, reinitializing:', err);
  }

  const initialDB: DB = {
    menuItems: initialMenuItems,
    rooms: initialRooms,
    mediaItems: initialMediaItems,
    reservations: initialReservations,
    financials: initialFinancialMetrics
  };

  saveDB(initialDB);
  return initialDB;
}

function saveDB(db: DB) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving DB file:', err);
  }
}

// Initialize db in memory
let db = loadDB();

// Setup Gemini AI
const aiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({
  apiKey: aiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build'
    }
  }
});

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '10mb' }));

  // --- API ROUTES ---

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // 1. Menu Items API
  app.get('/api/menu', (req, res) => {
    res.json(db.menuItems);
  });

  app.post('/api/menu', (req, res) => {
    const newItem: MenuItem = {
      id: 'm_' + Date.now(),
      name: req.body.name || 'Novo Prato',
      category: req.body.category || 'Rodízio & Carnes',
      description: req.body.description || '',
      price: Number(req.body.price) || 0,
      imageUrl: req.body.imageUrl || 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
      isDailySpecial: Boolean(req.body.isDailySpecial),
      isAvailable: Boolean(req.body.isAvailable ?? true),
      badge: req.body.badge
    };
    db.menuItems.unshift(newItem);
    saveDB(db);
    res.status(201).json(newItem);
  });

  app.put('/api/menu/:id', (req, res) => {
    const { id } = req.params;
    const index = db.menuItems.findIndex(i => i.id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Prato não encontrado' });
    }
    db.menuItems[index] = { ...db.menuItems[index], ...req.body };
    saveDB(db);
    res.json(db.menuItems[index]);
  });

  app.delete('/api/menu/:id', (req, res) => {
    const { id } = req.params;
    db.menuItems = db.menuItems.filter(i => i.id !== id);
    saveDB(db);
    res.json({ success: true, message: 'Prato removido com sucesso' });
  });

  // 2. Rooms API
  app.get('/api/rooms', (req, res) => {
    res.json(db.rooms);
  });

  app.put('/api/rooms/:id', (req, res) => {
    const { id } = req.params;
    const index = db.rooms.findIndex(r => r.id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Quarto não encontrado' });
    }
    db.rooms[index] = { ...db.rooms[index], ...req.body };
    saveDB(db);
    res.json(db.rooms[index]);
  });

  // 3. Media Items API
  app.get('/api/media', (req, res) => {
    res.json(db.mediaItems);
  });

  app.post('/api/media', (req, res) => {
    const newMedia: MediaItem = {
      id: 'med_' + Date.now(),
      title: req.body.title || 'Foto do Ambiente',
      category: req.body.category || 'Churrascaria',
      type: req.body.type || 'image',
      url: req.body.url,
      description: req.body.description || ''
    };
    db.mediaItems.unshift(newMedia);
    saveDB(db);
    res.status(201).json(newMedia);
  });

  app.delete('/api/media/:id', (req, res) => {
    const { id } = req.params;
    db.mediaItems = db.mediaItems.filter(m => m.id !== id);
    saveDB(db);
    res.json({ success: true, message: 'Mídia removida' });
  });

  // 4. Reservations & Checkout API
  app.get('/api/reservations', (req, res) => {
    res.json(db.reservations);
  });

  app.put('/api/reservations/:id/status', (req, res) => {
    const { id } = req.params;
    const { paymentStatus } = req.body;
    const index = db.reservations.findIndex(r => r.id === id);
    if (index === -1) {
      return res.status(404).json({ error: 'Reserva não encontrada' });
    }
    db.reservations[index].paymentStatus = paymentStatus;
    saveDB(db);
    res.json(db.reservations[index]);
  });

  // Pix QR Code Generation & Checkout
  app.post('/api/checkout/pix', async (req, res) => {
    try {
      const {
        customerName,
        customerEmail,
        customerPhone,
        customerCpf,
        type,
        tableDetails,
        roomDetails,
        totalAmount,
        depositAmount,
        notes
      } = req.body;

      const code = 'COR-' + Math.floor(1000 + Math.random() * 9000);
      const pixKey = '12.345.678/0001-99'; // CNPJ Corujão fictício
      const amount = Number(depositAmount || totalAmount).toFixed(2);
      
      // Dynamic PIX payload standard format string
      const pixPayload = `00020126580014BR.GOV.BCB.PIX0114+55119999988880224Reserva Corujao ${code}520400005303986540${amount.replace('.', '')}5802BR5925Churrascaria Pousada Corujao6009SAO PAULO62070503***6304`;

      // Generate base64 QR Code
      const qrCodeDataUrl = await QRCode.toDataURL(pixPayload, {
        margin: 1,
        width: 320,
        color: {
          dark: '#18181b',
          light: '#ffffff'
        }
      });

      const newReservation: Reservation = {
        id: 'res_' + Date.now(),
        code,
        customerName: customerName || 'Cliente Corujão',
        customerEmail: customerEmail || 'cliente@email.com',
        customerPhone: customerPhone || '(00) 00000-0000',
        customerCpf: customerCpf || '000.000.000-00',
        type: type || 'mesa',
        tableDetails,
        roomDetails,
        totalAmount: Number(totalAmount),
        depositAmount: Number(depositAmount),
        paymentMethod: 'PIX',
        paymentStatus: 'Pendente',
        pixQrCode: qrCodeDataUrl,
        pixCopiaECola: pixPayload,
        createdAt: new Date().toLocaleString('pt-BR'),
        notes
      };

      db.reservations.unshift(newReservation);
      
      // Update room status if room reservation
      if (type === 'quarto' && roomDetails?.roomId) {
        const rIndex = db.rooms.findIndex(r => r.id === roomDetails.roomId);
        if (rIndex !== -1) {
          db.rooms[rIndex].status = 'Ocupado';
        }
      }

      saveDB(db);

      res.status(201).json({
        success: true,
        reservation: newReservation,
        pixQrCode: qrCodeDataUrl,
        pixCopiaECola: pixPayload
      });
    } catch (err: any) {
      console.error('Pix checkout error:', err);
      res.status(500).json({ error: 'Falha ao gerar Pix de reserva', details: err.message });
    }
  });

  app.post('/api/checkout/card', (req, res) => {
    try {
      const {
        customerName,
        customerEmail,
        customerPhone,
        customerCpf,
        type,
        tableDetails,
        roomDetails,
        totalAmount,
        depositAmount,
        notes
      } = req.body;

      const code = 'COR-' + Math.floor(1000 + Math.random() * 9000);

      const newReservation: Reservation = {
        id: 'res_' + Date.now(),
        code,
        customerName: customerName || 'Cliente Corujão',
        customerEmail: customerEmail || 'cliente@email.com',
        customerPhone: customerPhone || '(00) 00000-0000',
        customerCpf: customerCpf || '000.000.000-00',
        type: type || 'mesa',
        tableDetails,
        roomDetails,
        totalAmount: Number(totalAmount),
        depositAmount: Number(depositAmount),
        paymentMethod: 'Cartão de Crédito',
        paymentStatus: 'Aprovado', // Cartão simula aprovação imediata
        createdAt: new Date().toLocaleString('pt-BR'),
        notes
      };

      db.reservations.unshift(newReservation);

      // Update room status if room reservation
      if (type === 'quarto' && roomDetails?.roomId) {
        const rIndex = db.rooms.findIndex(r => r.id === roomDetails.roomId);
        if (rIndex !== -1) {
          db.rooms[rIndex].status = 'Ocupado';
        }
      }

      saveDB(db);

      res.status(201).json({
        success: true,
        reservation: newReservation
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Erro no pagamento de cartão' });
    }
  });

  // 5. Admin Authentication
  app.post('/api/admin/login', (req, res) => {
    const { email, password } = req.body;
    if (email === 'admin@ocorujao.com.br' && password === 'admin123') {
      return res.json({
        success: true,
        token: 'jwt_mock_token_corujao_admin_2026',
        user: { name: 'Gerente O Corujão', email: 'admin@ocorujao.com.br', role: 'Owner' }
      });
    }
    return res.status(401).json({ error: 'E-mail ou senha inválidos' });
  });

  // 6. Financial Metrics API
  app.get('/api/financials', (req, res) => {
    res.json(db.financials);
  });

  // 7. Gemini AI Assistant Chat Widget API
  app.post('/api/gemini/chat', async (req, res) => {
    try {
      const { message, history } = req.body;

      if (!message) {
        return res.status(400).json({ error: 'Mensagem é obrigatória' });
      }

      const activeMenu = db.menuItems.map(m => `- ${m.name} (${m.category}): R$ ${m.price > 0 ? m.price.toFixed(2) : 'Incluso no Rodízio'} - ${m.description}`).join('\n');
      const activeRooms = db.rooms.map(r => `- ${r.name} (${r.category}) - Quarto ${r.number}: R$ ${r.pricePerNight.toFixed(2)}/noite (Até ${r.capacityAdults} adultos e ${r.capacityChildren} crianças) - Status: ${r.status}`).join('\n');

      const systemInstruction = `
Você é o "Garçom e Recepcionista Virtual da Churrascaria e Pousada O Corujão".
Sua personalidade é extremamente acolhedora, educada, solícita e com aquele sotaque hospitaleiro brasileiro.

INFORMAÇÕES OFICIAIS DO NEGÓCIO:
- Nome: Churrascaria e Pousada O Corujão
- Slogan: Onde o verdadeiro churrasco gaúcho encontra o conforto e aconchego do campo.
- Churrascaria:
  * Rodízio Completo: R$ 89,90 por pessoa. Mais de 18 cortes nobres na brasa (Picanha, Cupim Recheado, Costela de Chão 12h, Ancho, Fraldinha, Alcatra) + Buffet de Saladas e Acompanhamentos quentes à vontade.
  * Horários da Churrascaria: Almoço das 11:30 às 15:30. Jantar das 18:30 às 22:30 (de terça a domingo).
  * Bebidas: Chopp trincando, Caipirinhas artesanais, vinhos e sucos.
  * Estrutura: Salão interno climatizado, área externa ao lado da piscina, Espaço Kids com monitoramento.
- Pousada:
  * Check-in: a partir das 14:00. Check-out: até às 12:00.
  * Recepção 24 horas.
  * Acomodações disponíveis:
    1. Suíte Standard Corujão: R$ 220,00/noite (Ar Split, Wi-Fi 500MB, TV LED, Café da Manhã incluso).
    2. Suíte Luxo Ouro Preto: R$ 350,00/noite (Varanda com rede, Cama King, Smart TV 55", Frigobar premium, Café incluso).
    3. Suíte Master Imperial: R$ 550,00/noite (Hidromassagem dupla, Vista panorâmica, Cama Super King, Espumante e frutas, Café na suíte).
  * Cortesia Pousada: Acesso livre à piscina aquecida, estacionamento fechado gratuito com segurança 24h, Wi-Fi em todas as áreas e Café da Manhã Regional completo.
- Localização: Rodovia BR-116, Km 42 - Zona de Lazer (Apenas 10 min do centro, fácil acesso).
- Pagamentos: Aceita PIX (com desconto/sinal rápido no site), Cartão de Crédito até 6x e Débito.

SEU OBJETIVO:
1. Responder todas as dúvidas com precisão e entusiasmo.
2. Sempre incentivar o cliente a fazer uma reserva de MESA ou QUARTO diretamente pelo site ou tirando dúvidas.
3. Mantenha respostas diretas, organizadas em tópicos amigáveis e sem rodeios desnecessários.

CARDÁPIO ATUALIZADO EM TEMPO REAL:
${activeMenu}

QUARTOS ATUALIZADOS EM TEMPO REAL:
${activeRooms}
`;

      const contentsPrompt = history && Array.isArray(history) && history.length > 0 
        ? history.map((h: any) => `${h.sender === 'user' ? 'Cliente' : 'Garçom Corujão'}: ${h.text}`).join('\n') + `\nCliente: ${message}\nGarçom Corujão:`
        : `Cliente: ${message}\nGarçom Corujão:`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: contentsPrompt,
        config: {
          systemInstruction,
          temperature: 0.7,
          topP: 0.95
        }
      });

      const replyText = response.text || 'Olá! Sou o Garçom e Recepcionista Virtual do Corujão. Como posso te ajudar hoje com nosso delicioso rodízio ou nossas acomodações?';

      res.json({ reply: replyText });
    } catch (err: any) {
      console.error('Gemini API Error:', err);
      res.status(500).json({
        reply: 'Olá! No momento estou organizando a casa, mas você pode conferir nosso cardápio e reservar seu quarto ou mesa diretamente nos botões da tela!'
      });
    }
  });

  // --- VITE MIDDLEWARE OR STATIC SERVING ---
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
