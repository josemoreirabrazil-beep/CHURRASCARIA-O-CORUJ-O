import React, { useState } from 'react';
import { MenuItem, Room, MediaItem, Reservation, FinancialMetric } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import {
  LayoutDashboard, Utensils, Hotel, Image as ImageIcon, DollarSign,
  Plus, Edit2, Trash2, CheckCircle2, AlertCircle, RefreshCw, LogOut,
  X, Search, Download, Shield, Sparkles, Filter
} from 'lucide-react';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: MenuItem[];
  rooms: Room[];
  mediaItems: MediaItem[];
  reservations: Reservation[];
  financials: FinancialMetric[];
  onRefreshData: () => void;
  onUpdateMenuItem: (item: Partial<MenuItem>) => Promise<void>;
  onDeleteMenuItem: (id: string) => Promise<void>;
  onUpdateRoomStatus: (id: string, status: Room['status']) => Promise<void>;
  onAddMedia: (media: Partial<MediaItem>) => Promise<void>;
  onDeleteMedia: (id: string) => Promise<void>;
  onUpdateReservationStatus: (id: string, status: Reservation['paymentStatus']) => Promise<void>;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  menuItems,
  rooms,
  mediaItems,
  reservations,
  financials,
  onRefreshData,
  onUpdateMenuItem,
  onDeleteMenuItem,
  onUpdateRoomStatus,
  onAddMedia,
  onDeleteMedia,
  onUpdateReservationStatus
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('admin@ocorujao.com.br');
  const [password, setPassword] = useState('admin123');
  const [loginError, setLoginError] = useState('');

  const [activeTab, setActiveTab] = useState<'analytics' | 'menu' | 'rooms' | 'media' | 'financials'>('analytics');

  // Menu Form Modal State
  const [editingMenuItem, setEditingMenuItem] = useState<Partial<MenuItem> | null>(null);
  const [showMenuItemModal, setShowMenuItemModal] = useState(false);

  // Media Form Modal State
  const [newMedia, setNewMedia] = useState<Partial<MediaItem>>({ title: '', category: 'Churrascaria', type: 'image', url: '' });
  const [showMediaModal, setShowMediaModal] = useState(false);

  // Search filter for financial table
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (data.success) {
        setIsAuthenticated(true);
        setLoginError('');
      } else {
        setLoginError(data.error || 'Credenciais inválidas');
      }
    } catch (err) {
      setLoginError('Erro de conexão ao efetuar login');
    }
  };

  const handleSaveMenuItem = async () => {
    if (editingMenuItem && editingMenuItem.name) {
      await onUpdateMenuItem(editingMenuItem);
      setShowMenuItemModal(false);
      setEditingMenuItem(null);
    }
  };

  const handleSaveMedia = async () => {
    if (newMedia.url && newMedia.title) {
      await onAddMedia(newMedia);
      setShowMediaModal(false);
      setNewMedia({ title: '', category: 'Churrascaria', type: 'image', url: '' });
    }
  };

  const handleExportCSV = () => {
    const headers = ['ID', 'Codigo', 'Cliente', 'CPF', 'Telefone', 'Tipo', 'ValorTotal', 'SinalPago', 'Metodo', 'Status', 'Data'];
    const rows = reservations.map(r => [
      r.id,
      r.code,
      `"${r.customerName}"`,
      r.customerCpf,
      r.customerPhone,
      r.type,
      r.totalAmount,
      r.depositAmount,
      r.paymentMethod,
      r.paymentStatus,
      `"${r.createdAt}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `reservas_corujao_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredReservations = reservations.filter(r => 
    r.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.customerPhone.includes(searchQuery)
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn text-white">
      <div className="bg-zinc-950 border border-amber-500/40 rounded-3xl w-full max-w-6xl max-h-[92vh] flex flex-col overflow-hidden shadow-2xl relative">
        
        {/* Header Bar */}
        <div className="p-4 sm:p-6 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-amber-500 text-zinc-950 font-black">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white">Painel de Administração Master</h2>
              <p className="text-xs text-amber-400 font-semibold">Churrascaria e Pousada O Corujão</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={onRefreshData}
              className="p-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-amber-300 transition text-xs font-bold flex items-center space-x-1"
              title="Atualizar Dados"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2.5 rounded-xl bg-zinc-800 hover:bg-rose-950 hover:text-rose-400 text-zinc-400 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* LOGIN SCREEN */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 max-w-md mx-auto my-auto space-y-6 w-full text-center">
            <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center mx-auto">
              <Shield className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-black text-white">Acesso do Proprietário</h3>
              <p className="text-xs text-zinc-400">Digite suas credenciais de administrador para acessar a gestão completa.</p>
            </div>

            {loginError && (
              <div className="p-3 bg-rose-950/80 border border-rose-500/50 rounded-xl text-rose-300 text-xs font-bold">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4 text-xs text-left">
              <div className="space-y-1">
                <label className="font-bold text-zinc-300">E-mail de Login:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-zinc-300">Senha:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-amber-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-zinc-950 font-black uppercase tracking-wider text-xs transition shadow-lg"
              >
                Entrar no Painel Master
              </button>
            </form>
          </div>
        ) : (
          /* AUTHENTICATED ADMIN DASHBOARD */
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Tabs Bar */}
            <div className="bg-zinc-900 border-b border-zinc-800 px-4 py-2 flex items-center space-x-2 overflow-x-auto text-xs no-scrollbar">
              <button
                onClick={() => setActiveTab('analytics')}
                className={`px-4 py-2.5 rounded-xl font-bold flex items-center space-x-2 transition ${
                  activeTab === 'analytics' ? 'bg-amber-500 text-zinc-950' : 'text-zinc-400 hover:text-white'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Visão Geral & Métricas</span>
              </button>

              <button
                onClick={() => setActiveTab('menu')}
                className={`px-4 py-2.5 rounded-xl font-bold flex items-center space-x-2 transition ${
                  activeTab === 'menu' ? 'bg-amber-500 text-zinc-950' : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Utensils className="w-4 h-4" />
                <span>Gestão Churrascaria</span>
              </button>

              <button
                onClick={() => setActiveTab('rooms')}
                className={`px-4 py-2.5 rounded-xl font-bold flex items-center space-x-2 transition ${
                  activeTab === 'rooms' ? 'bg-amber-500 text-zinc-950' : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Hotel className="w-4 h-4" />
                <span>Gestão Pousada</span>
              </button>

              <button
                onClick={() => setActiveTab('media')}
                className={`px-4 py-2.5 rounded-xl font-bold flex items-center space-x-2 transition ${
                  activeTab === 'media' ? 'bg-amber-500 text-zinc-950' : 'text-zinc-400 hover:text-white'
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                <span>Mídias & Fotos</span>
              </button>

              <button
                onClick={() => setActiveTab('financials')}
                className={`px-4 py-2.5 rounded-xl font-bold flex items-center space-x-2 transition ${
                  activeTab === 'financials' ? 'bg-amber-500 text-zinc-950' : 'text-zinc-400 hover:text-white'
                }`}
              >
                <DollarSign className="w-4 h-4" />
                <span>Conciliação & Reservas</span>
              </button>
            </div>

            {/* Tab Content Area */}
            <div className="flex-1 p-6 overflow-y-auto space-y-6">
              
              {/* TAB 1: VISÃO GERAL & ANALYTICS */}
              {activeTab === 'analytics' && (
                <div className="space-y-6">
                  {/* KPI Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-5 bg-zinc-900 rounded-2xl border border-zinc-800 space-y-1">
                      <span className="text-zinc-400 text-xs font-semibold">Faturamento Total do Mês</span>
                      <p className="text-2xl font-black text-amber-400">
                        R$ {financials.reduce((acc, f) => acc + f.faturamentoChurrascaria + f.faturamentoPousada, 0).toLocaleString('pt-BR')}
                      </p>
                    </div>

                    <div className="p-5 bg-zinc-900 rounded-2xl border border-zinc-800 space-y-1">
                      <span className="text-zinc-400 text-xs font-semibold">Total de Reservas Ativas</span>
                      <p className="text-2xl font-black text-emerald-400">{reservations.length}</p>
                    </div>

                    <div className="p-5 bg-zinc-900 rounded-2xl border border-zinc-800 space-y-1">
                      <span className="text-zinc-400 text-xs font-semibold">Ocupação da Pousada</span>
                      <p className="text-2xl font-black text-amber-300">
                        {Math.round((rooms.filter(r => r.status === 'Ocupado').length / rooms.length) * 100)}%
                      </p>
                    </div>

                    <div className="p-5 bg-zinc-900 rounded-2xl border border-zinc-800 space-y-1">
                      <span className="text-zinc-400 text-xs font-semibold">Prato Mais Vendido</span>
                      <p className="text-lg font-black text-white">Rodízio Completo</p>
                    </div>
                  </div>

                  {/* Recharts Revenue Bar Chart */}
                  <div className="p-6 bg-zinc-900 rounded-3xl border border-zinc-800 space-y-4">
                    <h3 className="font-bold text-white text-base">Faturamento Mensal (Churrascaria vs Pousada)</h3>
                    <div className="h-72 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={financials}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                          <XAxis dataKey="month" stroke="#a1a1aa" fontSize={12} />
                          <YAxis stroke="#a1a1aa" fontSize={12} />
                          <Tooltip contentStyle={{ backgroundColor: '#18181b', borderColor: '#d97706', borderRadius: '12px' }} />
                          <Legend />
                          <Bar dataKey="faturamentoChurrascaria" name="Churrascaria (R$)" fill="#d97706" radius={[6, 6, 0, 0]} />
                          <Bar dataKey="faturamentoPousada" name="Pousada (R$)" fill="#059669" radius={[6, 6, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: GESTÃO DA CHURRASCARIA */}
              {activeTab === 'menu' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-black text-white">Gestão do Cardápio Digital</h3>
                    <button
                      onClick={() => {
                        setEditingMenuItem({ name: '', category: 'Rodízio & Carnes', description: '', price: 0, isDailySpecial: true, isAvailable: true, imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80' });
                        setShowMenuItemModal(true);
                      }}
                      className="px-4 py-2.5 rounded-xl bg-amber-500 text-zinc-950 font-extrabold text-xs flex items-center space-x-1.5 shadow-lg"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Cadastrar Novo Prato</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {menuItems.map(item => (
                      <div key={item.id} className="p-4 bg-zinc-900 rounded-2xl border border-zinc-800 space-y-3 flex flex-col justify-between text-xs">
                        <div className="space-y-2">
                          <div className="flex justify-between items-start">
                            <h4 className="font-extrabold text-white text-sm">{item.name}</h4>
                            <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-bold text-[10px]">
                              {item.category}
                            </span>
                          </div>
                          <p className="text-zinc-400 text-xs">{item.description}</p>
                          <p className="font-black text-amber-400 text-base">
                            {item.price > 0 ? `R$ ${item.price.toFixed(2)}` : 'Incluso no Rodízio'}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-zinc-800 flex items-center justify-between">
                          <span className={`font-bold ${item.isAvailable ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {item.isAvailable ? 'Disponível' : 'Indisponível'}
                          </span>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => {
                                setEditingMenuItem(item);
                                setShowMenuItemModal(true);
                              }}
                              className="p-2 rounded-lg bg-zinc-800 text-amber-300 hover:bg-zinc-700"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => onDeleteMenuItem(item.id)}
                              className="p-2 rounded-lg bg-zinc-800 text-rose-400 hover:bg-rose-950"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: GESTÃO DA POUSADA */}
              {activeTab === 'rooms' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-black text-white">Status dos Quartos da Pousada</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {rooms.map(room => (
                      <div key={room.id} className="p-5 bg-zinc-900 rounded-3xl border border-zinc-800 space-y-4 text-xs">
                        <div className="flex justify-between items-center">
                          <span className="font-black text-amber-400 text-base">Quarto {room.number}</span>
                          <span className="px-2.5 py-1 rounded-full bg-zinc-800 text-zinc-300 font-bold">{room.category}</span>
                        </div>

                        <div>
                          <h4 className="font-extrabold text-white text-sm">{room.name}</h4>
                          <p className="text-zinc-400">R$ {room.pricePerNight.toFixed(2)} /noite</p>
                        </div>

                        <div className="space-y-1.5 pt-2 border-t border-zinc-800">
                          <label className="font-bold text-zinc-300">Alterar Status em Tempo Real:</label>
                          <select
                            value={room.status}
                            onChange={(e) => onUpdateRoomStatus(room.id, e.target.value as any)}
                            className={`w-full p-2.5 rounded-xl font-extrabold text-xs focus:outline-none ${
                              room.status === 'Disponível' ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/50' :
                              room.status === 'Ocupado' ? 'bg-rose-950 text-rose-300 border border-rose-500/50' :
                              'bg-amber-950 text-amber-300 border border-amber-500/50'
                            }`}
                          >
                            <option value="Disponível">Disponível</option>
                            <option value="Ocupado">Ocupado</option>
                            <option value="Em Limpeza">Em Limpeza</option>
                            <option value="Manutenção">Manutenção</option>
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: GERENCIADOR DE MÍDIA */}
              {activeTab === 'media' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-black text-white">Galeria de Ambientes & Mídias</h3>
                    <button
                      onClick={() => setShowMediaModal(true)}
                      className="px-4 py-2.5 rounded-xl bg-amber-500 text-zinc-950 font-extrabold text-xs flex items-center space-x-1.5 shadow-lg"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Adicionar Nova Foto</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {mediaItems.map(media => (
                      <div key={media.id} className="relative bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden aspect-video group">
                        <img src={media.url} alt={media.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
                        <button
                          onClick={() => onDeleteMedia(media.id)}
                          className="absolute top-3 right-3 p-2 rounded-xl bg-rose-900/80 text-white hover:bg-rose-700 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <div className="absolute bottom-3 left-3 right-3">
                          <p className="font-bold text-white text-xs">{media.title}</p>
                          <span className="text-[10px] text-amber-400 font-semibold">{media.category}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: CONCILIAÇÃO FINANCEIRA & RESERVAS */}
              {activeTab === 'financials' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                    <h3 className="text-xl font-black text-white">Histórico de Reservas & Conciliação</h3>
                    <div className="flex items-center space-x-2 w-full sm:w-auto">
                      <div className="relative flex-1 sm:w-64">
                        <input
                          type="text"
                          placeholder="Buscar por cliente ou código..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white"
                        />
                        <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-2.5" />
                      </div>
                      <button
                        onClick={handleExportCSV}
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center space-x-1"
                      >
                        <Download className="w-4 h-4" />
                        <span>Exportar CSV</span>
                      </button>
                    </div>
                  </div>

                  {/* Reservations Table */}
                  <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-x-auto text-xs">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-zinc-800 bg-zinc-950 text-amber-400 font-bold uppercase tracking-wider">
                          <th className="p-3">Código</th>
                          <th className="p-3">Cliente</th>
                          <th className="p-3">Tipo</th>
                          <th className="p-3">Valor Sinal</th>
                          <th className="p-3">Método</th>
                          <th className="p-3">Status</th>
                          <th className="p-3">Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredReservations.map(r => (
                          <tr key={r.id} className="border-b border-zinc-800/60 hover:bg-zinc-800/40">
                            <td className="p-3 font-mono font-bold text-amber-300">{r.code}</td>
                            <td className="p-3">
                              <p className="font-bold text-white">{r.customerName}</p>
                              <p className="text-[10px] text-zinc-400">{r.customerPhone}</p>
                            </td>
                            <td className="p-3 uppercase font-semibold">{r.type}</td>
                            <td className="p-3 font-bold text-emerald-400">R$ {r.depositAmount.toFixed(2)}</td>
                            <td className="p-3">{r.paymentMethod}</td>
                            <td className="p-3">
                              <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                                r.paymentStatus === 'Aprovado' ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40' :
                                r.paymentStatus === 'Pendente' ? 'bg-amber-950 text-amber-300 border border-amber-500/40' :
                                'bg-rose-950 text-rose-300 border border-rose-500/40'
                              }`}>
                                {r.paymentStatus}
                              </span>
                            </td>
                            <td className="p-3">
                              <select
                                value={r.paymentStatus}
                                onChange={(e) => onUpdateReservationStatus(r.id, e.target.value as any)}
                                className="bg-zinc-950 border border-zinc-700 rounded p-1 text-[11px] text-white"
                              >
                                <option value="Aprovado">Aprovado</option>
                                <option value="Pendente">Pendente</option>
                                <option value="Cancelado">Cancelado</option>
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

        {/* Modal edit Menu Item */}
        {showMenuItemModal && editingMenuItem && (
          <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
            <div className="bg-zinc-900 p-6 rounded-3xl border border-amber-500/40 max-w-md w-full space-y-4 text-xs">
              <h3 className="text-lg font-black text-white">Cadastrar / Editar Prato</h3>
              <input
                type="text"
                placeholder="Nome do Prato"
                value={editingMenuItem.name || ''}
                onChange={(e) => setEditingMenuItem({ ...editingMenuItem, name: e.target.value })}
                className="w-full bg-zinc-950 p-2.5 rounded-xl border border-zinc-800 text-white"
              />
              <input
                type="number"
                placeholder="Preço R$"
                value={editingMenuItem.price || 0}
                onChange={(e) => setEditingMenuItem({ ...editingMenuItem, price: Number(e.target.value) })}
                className="w-full bg-zinc-950 p-2.5 rounded-xl border border-zinc-800 text-white"
              />
              <textarea
                placeholder="Descrição"
                value={editingMenuItem.description || ''}
                onChange={(e) => setEditingMenuItem({ ...editingMenuItem, description: e.target.value })}
                className="w-full bg-zinc-950 p-2.5 rounded-xl border border-zinc-800 text-white"
              />
              <input
                type="text"
                placeholder="URL da Imagem"
                value={editingMenuItem.imageUrl || ''}
                onChange={(e) => setEditingMenuItem({ ...editingMenuItem, imageUrl: e.target.value })}
                className="w-full bg-zinc-950 p-2.5 rounded-xl border border-zinc-800 text-white"
              />
              <div className="flex space-x-2 pt-2">
                <button
                  onClick={() => setShowMenuItemModal(false)}
                  className="flex-1 py-2 rounded-xl bg-zinc-800 text-zinc-300 font-bold"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveMenuItem}
                  className="flex-1 py-2 rounded-xl bg-amber-500 text-zinc-950 font-black"
                >
                  Salvar Prato
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal add Media */}
        {showMediaModal && (
          <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
            <div className="bg-zinc-900 p-6 rounded-3xl border border-amber-500/40 max-w-md w-full space-y-4 text-xs">
              <h3 className="text-lg font-black text-white">Adicionar Foto à Galeria</h3>
              <input
                type="text"
                placeholder="Título da Foto"
                value={newMedia.title || ''}
                onChange={(e) => setNewMedia({ ...newMedia, title: e.target.value })}
                className="w-full bg-zinc-950 p-2.5 rounded-xl border border-zinc-800 text-white"
              />
              <select
                value={newMedia.category}
                onChange={(e) => setNewMedia({ ...newMedia, category: e.target.value as any })}
                className="w-full bg-zinc-950 p-2.5 rounded-xl border border-zinc-800 text-white"
              >
                <option value="Churrascaria">Churrascaria</option>
                <option value="Piscina">Piscina</option>
                <option value="Quartos">Quartos</option>
                <option value="Área Kids">Área Kids</option>
              </select>
              <input
                type="text"
                placeholder="URL da Imagem"
                value={newMedia.url || ''}
                onChange={(e) => setNewMedia({ ...newMedia, url: e.target.value })}
                className="w-full bg-zinc-950 p-2.5 rounded-xl border border-zinc-800 text-white"
              />
              <div className="flex space-x-2 pt-2">
                <button
                  onClick={() => setShowMediaModal(false)}
                  className="flex-1 py-2 rounded-xl bg-zinc-800 text-zinc-300 font-bold"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveMedia}
                  className="flex-1 py-2 rounded-xl bg-amber-500 text-zinc-950 font-black"
                >
                  Salvar Mídia
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
