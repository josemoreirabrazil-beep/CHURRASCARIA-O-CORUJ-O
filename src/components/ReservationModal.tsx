import React, { useState, useEffect } from 'react';
import { Room, TableReservationData, RoomReservationData, Reservation } from '../types';
import {
  X, UtensilsCrossed, Hotel, Calendar, Clock, Users, ShieldCheck,
  CreditCard, QrCode, Copy, CheckCircle2, Download, MessageCircle, AlertCircle, ArrowRight
} from 'lucide-react';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: 'mesa' | 'quarto';
  initialRoomId?: string;
  initialDishName?: string;
  rooms: Room[];
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose,
  initialType = 'mesa',
  initialRoomId,
  initialDishName,
  rooms
}) => {
  const [type, setType] = useState<'mesa' | 'quarto'>(initialType);
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1); // 1: Details, 2: Customer, 3: Payment, 4: Success

  // Form State - Table
  const [tableData, setTableData] = useState<TableReservationData>({
    date: new Date().toISOString().split('T')[0],
    time: '12:30',
    guestsCount: 4,
    seatingArea: 'Interno (Ar)',
    occasion: initialDishName ? `Interesse no prato: ${initialDishName}` : 'Nenhum'
  });

  // Form State - Room
  const selectedRoomInitial = rooms.find(r => r.id === initialRoomId) || rooms[0];
  const [selectedRoomId, setSelectedRoomId] = useState<string>(selectedRoomInitial?.id || '');
  
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 2);

  const [checkIn, setCheckIn] = useState<string>(today.toISOString().split('T')[0]);
  const [checkOut, setCheckOut] = useState<string>(tomorrow.toISOString().split('T')[0]);
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(0);

  // Customer State
  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    cpf: '',
    notes: ''
  });

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState<'PIX' | 'Cartão de Crédito'>('PIX');
  const [cardDetails, setCardDetails] = useState({ number: '', name: '', expiry: '', cvc: '', installments: '1' });
  
  const [isLoading, setIsLoading] = useState(false);
  const [createdReservation, setCreatedReservation] = useState<Reservation | null>(null);
  const [copiedPix, setCopiedPix] = useState(false);

  useEffect(() => {
    setType(initialType);
    if (initialRoomId) setSelectedRoomId(initialRoomId);
  }, [initialType, initialRoomId]);

  if (!isOpen) return null;

  const currentRoom = rooms.find(r => r.id === selectedRoomId) || rooms[0];

  // Calculate room nights & price
  const d1 = new Date(checkIn);
  const d2 = new Date(checkOut);
  const diffTime = Math.max(d2.getTime() - d1.getTime(), 1000 * 60 * 60 * 24);
  const totalNights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const roomTotalAmount = (currentRoom?.pricePerNight || 220) * totalNights;
  const roomDepositAmount = roomTotalAmount * 0.3; // 30% sinal

  const tableTotalAmount = 50.00; // Taxa caução de mesa revertida em consumo
  const tableDepositAmount = 50.00;

  const handleProcessCheckout = async () => {
    if (!customer.name || !customer.phone || !customer.cpf) {
      alert('Por favor, preencha os dados de nome, telefone e CPF.');
      return;
    }

    setIsLoading(true);

    try {
      const roomReservationPayload: RoomReservationData = {
        roomId: currentRoom.id,
        roomName: currentRoom.name,
        roomCategory: currentRoom.category,
        checkIn,
        checkOut,
        adults,
        children,
        totalNights,
        pricePerNight: currentRoom.pricePerNight,
        totalAmount: roomTotalAmount
      };

      const payload = {
        customerName: customer.name,
        customerEmail: customer.email,
        customerPhone: customer.phone,
        customerCpf: customer.cpf,
        type,
        tableDetails: type === 'mesa' ? tableData : undefined,
        roomDetails: type === 'quarto' ? roomReservationPayload : undefined,
        totalAmount: type === 'mesa' ? tableTotalAmount : roomTotalAmount,
        depositAmount: type === 'mesa' ? tableDepositAmount : roomDepositAmount,
        notes: customer.notes
      };

      const endpoint = paymentMethod === 'PIX' ? '/api/checkout/pix' : '/api/checkout/card';

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (data.success && data.reservation) {
        setCreatedReservation(data.reservation);
        setStep(4); // Success step
      } else {
        alert(data.error || 'Erro ao processar reserva');
      }
    } catch (err) {
      alert('Falha de conexão ao efetuar checkout.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyPix = () => {
    if (createdReservation?.pixCopiaECola) {
      navigator.clipboard.writeText(createdReservation.pixCopiaECola);
      setCopiedPix(true);
      setTimeout(() => setCopiedPix(false), 3000);
    }
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn">
      <div className="bg-zinc-950 border border-amber-500/40 rounded-3xl max-w-2xl w-full p-5 sm:p-8 space-y-6 relative shadow-2xl my-auto text-white">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-zinc-900 text-zinc-400 hover:text-amber-400 border border-zinc-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1 pr-8">
          <span className="text-[10px] font-black uppercase tracking-widest text-amber-400">
            Sistema Oficial de Reservas
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            {type === 'mesa' ? 'Reserva de Mesa no Rodízio' : 'Reserva de Suíte na Pousada'}
          </h2>
        </div>

        {/* Type Switcher (only on step 1) */}
        {step === 1 && (
          <div className="grid grid-cols-2 gap-2 bg-zinc-900 p-1.5 rounded-2xl border border-zinc-800">
            <button
              onClick={() => setType('mesa')}
              className={`py-2.5 rounded-xl font-bold text-xs transition flex items-center justify-center space-x-2 ${
                type === 'mesa' 
                  ? 'bg-amber-500 text-zinc-950 shadow-md' 
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <UtensilsCrossed className="w-4 h-4" />
              <span>Reservar Mesa</span>
            </button>
            <button
              onClick={() => setType('quarto')}
              className={`py-2.5 rounded-xl font-bold text-xs transition flex items-center justify-center space-x-2 ${
                type === 'quarto' 
                  ? 'bg-amber-500 text-zinc-950 shadow-md' 
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Hotel className="w-4 h-4" />
              <span>Reservar Quarto</span>
            </button>
          </div>
        )}

        {/* Step Indicator */}
        {step < 4 && (
          <div className="flex items-center justify-between text-xs text-zinc-400 pt-1 pb-2 border-b border-zinc-900">
            <span className={step >= 1 ? 'text-amber-400 font-bold' : ''}>1. Detalhes</span>
            <span>→</span>
            <span className={step >= 2 ? 'text-amber-400 font-bold' : ''}>2. Seus Dados</span>
            <span>→</span>
            <span className={step >= 3 ? 'text-amber-400 font-bold' : ''}>3. Pagamento</span>
          </div>
        )}

        {/* STEP 1: Details */}
        {step === 1 && (
          <div className="space-y-4 text-xs">
            {type === 'mesa' ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-bold text-zinc-300">Data da Reserva:</label>
                    <input
                      type="date"
                      value={tableData.date}
                      onChange={(e) => setTableData({ ...tableData, date: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-zinc-300">Horário Previsto:</label>
                    <select
                      value={tableData.time}
                      onChange={(e) => setTableData({ ...tableData, time: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-amber-500"
                    >
                      <option value="11:30">Almoço - 11:30</option>
                      <option value="12:30">Almoço - 12:30</option>
                      <option value="13:30">Almoço - 13:30</option>
                      <option value="18:30">Jantar - 18:30</option>
                      <option value="19:30">Jantar - 19:30</option>
                      <option value="20:30">Jantar - 20:30</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-bold text-zinc-300">Número de Pessoas:</label>
                    <input
                      type="number"
                      min={1}
                      max={30}
                      value={tableData.guestsCount}
                      onChange={(e) => setTableData({ ...tableData, guestsCount: Number(e.target.value) })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-zinc-300">Preferência de Ambiente:</label>
                    <select
                      value={tableData.seatingArea}
                      onChange={(e) => setTableData({ ...tableData, seatingArea: e.target.value as any })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-amber-500"
                    >
                      <option value="Interno (Ar)">Salão Interno Climatizado</option>
                      <option value="Externa/Piscina">Área Externa com Vista Piscina</option>
                      <option value="Próximo Espaço Kids">Mesa Próxima ao Espaço Kids</option>
                    </select>
                  </div>
                </div>

                <div className="p-3 bg-amber-950/40 border border-amber-500/30 rounded-2xl text-amber-300 text-xs">
                  <p className="font-bold">Garantia de Mesa Reservada: R$ 50,00</p>
                  <p className="text-[11px] text-zinc-400">Este valor é 100% revertido em consumo da sua conta no dia!</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-zinc-300">Selecione a Acomodação:</label>
                  <select
                    value={selectedRoomId}
                    onChange={(e) => setSelectedRoomId(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-white font-bold text-xs focus:outline-none focus:border-amber-500"
                  >
                    {rooms.map(r => (
                      <option key={r.id} value={r.id}>
                        {r.name} ({r.category}) - R$ {r.pricePerNight.toFixed(2)}/noite
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-bold text-zinc-300">Data Check-in (14h):</label>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-zinc-300">Data Check-out (12h):</label>
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-bold text-zinc-300">Adultos:</label>
                    <input
                      type="number"
                      min={1}
                      max={4}
                      value={adults}
                      onChange={(e) => setAdults(Number(e.target.value))}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-zinc-300">Crianças (até 12 anos):</label>
                    <input
                      type="number"
                      min={0}
                      max={3}
                      value={children}
                      onChange={(e) => setChildren(Number(e.target.value))}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                {/* Calculation Summary Box */}
                <div className="p-4 bg-zinc-900 rounded-2xl border border-zinc-800 space-y-2">
                  <div className="flex justify-between text-zinc-400">
                    <span>Diária: {totalNights} noite(s) x R$ {currentRoom?.pricePerNight.toFixed(2)}</span>
                    <span className="font-bold text-white">R$ {roomTotalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-amber-400 font-extrabold text-sm pt-2 border-t border-zinc-800">
                    <span>Sinal para confirmação (30%):</span>
                    <span>R$ {roomDepositAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={() => setStep(2)}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-zinc-950 font-black uppercase tracking-wider transition shadow-lg flex items-center justify-center space-x-2 text-xs"
            >
              <span>Avançar para Dados do Hóspede</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP 2: Customer Data */}
        {step === 2 && (
          <div className="space-y-4 text-xs">
            <div className="space-y-3">
              <div className="space-y-1">
                <label className="font-bold text-zinc-300">Nome Completo *</label>
                <input
                  type="text"
                  placeholder="Seu nome completo"
                  value={customer.name}
                  onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-zinc-300">Telefone / WhatsApp *</label>
                  <input
                    type="text"
                    placeholder="(11) 99999-8888"
                    value={customer.phone}
                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-zinc-300">CPF do Titular *</label>
                  <input
                    type="text"
                    placeholder="000.000.000-00"
                    value={customer.cpf}
                    onChange={(e) => setCustomer({ ...customer, cpf: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-amber-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-zinc-300">E-mail para Envio do Comprovante</label>
                <input
                  type="email"
                  placeholder="seu.email@exemplo.com"
                  value={customer.email}
                  onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-zinc-300">Observações Especiais (Opcional)</label>
                <input
                  type="text"
                  placeholder="Ex: Aniversário, berço, mesa alta, restrição alimentar"
                  value={customer.notes}
                  onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setStep(1)}
                className="py-3 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold transition text-xs"
              >
                Voltar
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!customer.name || !customer.phone || !customer.cpf}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 disabled:opacity-50 text-zinc-950 font-black uppercase tracking-wider transition shadow-lg text-xs"
              >
                Ir para Pagamento
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Payment Choice */}
        {step === 3 && (
          <div className="space-y-4 text-xs">
            <div className="p-4 bg-zinc-900 rounded-2xl border border-zinc-800 flex items-center justify-between">
              <div>
                <p className="text-zinc-400">Total a pagar agora ({type === 'mesa' ? 'Taxa Caução' : 'Sinal 30%'}):</p>
                <p className="text-2xl font-black text-amber-400">
                  R$ {type === 'mesa' ? tableDepositAmount.toFixed(2) : roomDepositAmount.toFixed(2)}
                </p>
              </div>
              <ShieldCheck className="w-8 h-8 text-emerald-400" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('PIX')}
                className={`p-4 rounded-2xl border text-left transition flex items-center space-x-3 ${
                  paymentMethod === 'PIX'
                    ? 'bg-amber-950/60 border-amber-500 text-white'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                <QrCode className="w-6 h-6 text-amber-400" />
                <div>
                  <p className="font-extrabold text-white">PIX Instantâneo</p>
                  <p className="text-[10px] text-emerald-400">Aprovação imediata</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('Cartão de Crédito')}
                className={`p-4 rounded-2xl border text-left transition flex items-center space-x-3 ${
                  paymentMethod === 'Cartão de Crédito'
                    ? 'bg-amber-950/60 border-amber-500 text-white'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                <CreditCard className="w-6 h-6 text-amber-400" />
                <div>
                  <p className="font-extrabold text-white">Cartão de Crédito</p>
                  <p className="text-[10px] text-zinc-400">Até 6x no cartão</p>
                </div>
              </button>
            </div>

            {paymentMethod === 'Cartão de Crédito' && (
              <div className="p-4 bg-zinc-900 rounded-2xl border border-zinc-800 space-y-3">
                <input
                  type="text"
                  placeholder="Número do Cartão"
                  value={cardDetails.number}
                  onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Validade (MM/AA)"
                    value={cardDetails.expiry}
                    onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                  />
                  <input
                    type="text"
                    placeholder="CVC / CVV"
                    value={cardDetails.cvc}
                    onChange={(e) => setCardDetails({ ...cardDetails, cvc: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            )}

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setStep(2)}
                className="py-3 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold transition text-xs"
              >
                Voltar
              </button>
              <button
                onClick={handleProcessCheckout}
                disabled={isLoading}
                className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-zinc-950 font-black uppercase tracking-wider transition shadow-xl text-xs flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <span>Processando Checkout...</span>
                ) : (
                  <span>Concluir e Efetuar Pagamento</span>
                )}
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Confirmation & Receipt */}
        {step === 4 && createdReservation && (
          <div className="space-y-6 text-xs text-center py-2">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-black text-white">Reserva Confirmada com Sucesso!</h3>
              <p className="text-amber-400 font-extrabold text-sm">
                Código da Reserva: {createdReservation.code}
              </p>
            </div>

            {/* Pix QR Code Display if method was PIX */}
            {createdReservation.paymentMethod === 'PIX' && createdReservation.pixQrCode && (
              <div className="p-4 bg-zinc-900 border border-amber-500/40 rounded-3xl space-y-3 max-w-sm mx-auto">
                <p className="font-bold text-white text-xs">Escaneie o QR Code Pix para Pagar:</p>
                <img
                  src={createdReservation.pixQrCode}
                  alt="QR Code Pix O Corujão"
                  className="w-48 h-48 mx-auto rounded-2xl bg-white p-2"
                />
                <button
                  onClick={handleCopyPix}
                  className="w-full py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-amber-300 border border-amber-500/30 font-bold text-xs flex items-center justify-center space-x-1.5"
                >
                  <Copy className="w-4 h-4" />
                  <span>{copiedPix ? 'Copiado para a Área de Transferência!' : 'Copiar Código Pix (Copia e Cola)'}</span>
                </button>
              </div>
            )}

            {/* Summary Details */}
            <div className="bg-zinc-900 p-4 rounded-2xl border border-zinc-800 text-left space-y-2 max-w-md mx-auto">
              <p className="font-bold text-amber-400 border-b border-zinc-800 pb-1">Resumo do Pedido:</p>
              <p><strong className="text-white">Cliente:</strong> {createdReservation.customerName}</p>
              <p><strong className="text-white">Tipo:</strong> {createdReservation.type === 'mesa' ? 'Reserva de Mesa no Rodízio' : `Quarto: ${createdReservation.roomDetails?.roomName}`}</p>
              <p><strong className="text-white">Valor Pago / Sinal:</strong> R$ {createdReservation.depositAmount.toFixed(2)}</p>
              <p><strong className="text-white">Status do Pagamento:</strong> <span className="text-emerald-400 font-bold">{createdReservation.paymentStatus}</span></p>
            </div>

            {/* Receipt Actions */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <button
                onClick={handlePrintReceipt}
                className="px-5 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold text-xs flex items-center justify-center space-x-2 border border-zinc-700"
              >
                <Download className="w-4 h-4 text-amber-400" />
                <span>Imprimir / Baixar Comprovante</span>
              </button>

              <a
                href={`https://wa.me/5511999998888?text=${encodeURIComponent(`Olá! Fiz a reserva ${createdReservation.code} no nome de ${createdReservation.customerName} e gostaria de confirmar os detalhes!`)}`}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center justify-center space-x-2 shadow-lg"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Enviar no WhatsApp da Recepção</span>
              </a>
            </div>

            <div className="pt-4">
              <button
                onClick={onClose}
                className="text-zinc-500 hover:text-zinc-300 text-xs font-semibold underline"
              >
                Fechar Tela de Confirmação
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
