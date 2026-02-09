import React, { useState, useEffect } from 'react';
import { 
  ShoppingCart, Store, Users, TrendingUp, DollarSign, Package, 
  MessageCircle, Bell, Shield, Settings, Eye, ChevronRight, 
  Plus, Search, Filter, Star, MapPin, Clock, CheckCircle, 
  AlertCircle, XCircle, Download, Upload, Edit, Trash2, 
  Phone, Mail, CreditCard, Smartphone, Lock, BarChart3,
  Activity, PieChart, ArrowUpRight, ArrowDownRight, Menu,
  X, LogOut, Home, Grid, List, Calendar, FileText, Zap,
  TrendingDown, AlertTriangle, Award, Globe, Target, Percent
} from 'lucide-react';

// ============================
// CONFIGURAÇÃO E TIPOS
// ============================

const PaymentMethods = {
  MPESA: 'M-Pesa',
  EMOLA: 'E-Mola',
  MKESH: 'M-Kesh',
  VISA: 'Visa',
  MASTERCARD: 'Mastercard',
  PAYPAL: 'PayPal'
};

const OrderStatus = {
  PENDING: 'Pendente',
  PAID: 'Pago',
  PROCESSING: 'Em Processamento',
  SHIPPED: 'Enviado',
  DELIVERED: 'Entregue',
  CANCELLED: 'Cancelado',
  DISPUTED: 'Em Disputa'
};

const UserRoles = {
  BUYER: 'buyer',
  SELLER: 'seller',
  ADMIN: 'admin'
};

// ============================
// DADOS SIMULADOS
// ============================

const mockProducts = [
  {
    id: 1,
    name: 'iPhone 15 Pro Max 256GB',
    price: 89500,
    category: 'Electrónicos',
    seller: 'TechStore Maputo',
    sellerId: 1,
    images: ['https://images.unsplash.com/photo-1592286927505-2c2c1fd9eedf?w=400'],
    rating: 4.8,
    reviews: 156,
    stock: 12,
    location: 'Maputo',
    description: 'iPhone 15 Pro Max novo, selado com garantia oficial',
    whatsapp: '258845678901'
  },
  {
    id: 2,
    name: 'Apartamento T3 - Polana',
    price: 12500000,
    category: 'Imóveis',
    seller: 'ImobiMoz',
    sellerId: 2,
    images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400'],
    rating: 4.9,
    reviews: 45,
    stock: 1,
    location: 'Maputo - Polana',
    description: 'Apartamento moderno T3 com vista mar',
    whatsapp: '258847890123'
  },
  {
    id: 3,
    name: 'Serviço de Design Gráfico',
    price: 2500,
    category: 'Serviços',
    seller: 'CreativeMoz',
    sellerId: 3,
    images: ['https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400'],
    rating: 5.0,
    reviews: 234,
    stock: 999,
    location: 'Online',
    description: 'Design profissional para sua marca',
    whatsapp: '258843456789'
  },
  {
    id: 4,
    name: 'Toyota Hilux 2023',
    price: 3450000,
    category: 'Automóveis',
    seller: 'AutoMoz',
    sellerId: 4,
    images: ['https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400'],
    rating: 4.7,
    reviews: 89,
    stock: 3,
    location: 'Matola',
    description: 'Toyota Hilux 4x4 diesel, 25.000km',
    whatsapp: '258849012345'
  }
];

const mockOrders = [
  {
    id: 'ORD-2024-001',
    product: 'iPhone 15 Pro Max 256GB',
    buyer: 'João Silva',
    seller: 'TechStore Maputo',
    amount: 89500,
    status: OrderStatus.DELIVERED,
    paymentMethod: PaymentMethods.MPESA,
    date: '2024-02-05',
    commission: 4475
  },
  {
    id: 'ORD-2024-002',
    product: 'Serviço de Design Gráfico',
    buyer: 'Maria Costa',
    seller: 'CreativeMoz',
    amount: 2500,
    status: OrderStatus.PAID,
    paymentMethod: PaymentMethods.EMOLA,
    date: '2024-02-08',
    commission: 125
  }
];

// ============================
// COMPONENTE PRINCIPAL
// ============================

export default function MozCommerce() {
  const [currentView, setCurrentView] = useState('home');
  const [userRole, setUserRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState([]);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // ============================
  // TELA DE LOGIN
  // ============================

  const LoginScreen = () => (
    <div className="login-container">
      <div className="login-box">
        <div className="login-logo">
          <Store size={48} />
          <h1>MozCommerce</h1>
          <p>O Maior Marketplace de Moçambique</p>
        </div>

        <div className="login-options">
          <button onClick={() => {
            setUserRole(UserRoles.BUYER);
            setIsAuthenticated(true);
            setCurrentView('home');
          }} className="role-btn buyer">
            <ShoppingCart size={32} />
            <span>Entrar como Comprador</span>
            <ChevronRight size={20} />
          </button>

          <button onClick={() => {
            setUserRole(UserRoles.SELLER);
            setIsAuthenticated(true);
            setCurrentView('seller-dashboard');
          }} className="role-btn seller">
            <Store size={32} />
            <span>Entrar como Vendedor</span>
            <ChevronRight size={20} />
          </button>

          <button onClick={() => {
            setUserRole(UserRoles.ADMIN);
            setIsAuthenticated(true);
            setCurrentView('admin-dashboard');
          }} className="role-btn admin">
            <Shield size={32} />
            <span>Entrar como Admin</span>
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="login-footer">
          <p>Novo no MozCommerce?</p>
          <a href="#register">Criar conta gratuita</a>
        </div>
      </div>
    </div>
  );

  // ============================
  // HEADER
  // ============================

  const Header = () => (
    <header className="main-header">
      <div className="header-container">
        <div className="header-left">
          <button className="mobile-menu-btn" onClick={() => setShowMobileMenu(!showMobileMenu)}>
            {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="logo" onClick={() => setCurrentView('home')}>
            <Store size={32} />
            <span>MozCommerce</span>
          </div>
        </div>

        {userRole === UserRoles.BUYER && (
          <div className="header-search">
            <Search size={20} />
            <input 
              type="text" 
              placeholder="Pesquisar produtos, serviços, imóveis..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        )}

        <div className="header-right">
          {userRole === UserRoles.BUYER && (
            <>
              <button className="header-btn">
                <Bell size={22} />
                <span className="badge">3</span>
              </button>
              <button className="header-btn" onClick={() => setCurrentView('cart')}>
                <ShoppingCart size={22} />
                <span className="badge">{cart.length}</span>
              </button>
            </>
          )}
          
          <button className="header-btn profile">
            <div className="avatar">
              {userRole === UserRoles.ADMIN ? 'A' : userRole === UserRoles.SELLER ? 'V' : 'C'}
            </div>
            <span className="user-name">
              {userRole === UserRoles.ADMIN ? 'Admin' : userRole === UserRoles.SELLER ? 'Vendedor' : 'Comprador'}
            </span>
          </button>

          <button className="header-btn logout" onClick={() => {
            setIsAuthenticated(false);
            setUserRole(null);
            setCurrentView('home');
          }}>
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  );

  // ============================
  // HOME - MARKETPLACE
  // ============================

  const MarketplaceHome = () => {
    const categories = ['all', 'Electrónicos', 'Imóveis', 'Automóveis', 'Serviços', 'Moda', 'Casa'];
    
    const filteredProducts = mockProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    return (
      <div className="marketplace-home">
        {/* Hero Banner */}
        <div className="hero-section">
          <div className="hero-content">
            <h1>Descubra o Melhor de Moçambique</h1>
            <p>Milhares de produtos, serviços e oportunidades ao seu alcance</p>
            <div className="hero-stats">
              <div className="stat">
                <div className="stat-value">50K+</div>
                <div className="stat-label">Produtos</div>
              </div>
              <div className="stat">
                <div className="stat-value">10K+</div>
                <div className="stat-label">Vendedores</div>
              </div>
              <div className="stat">
                <div className="stat-value">100K+</div>
                <div className="stat-label">Usuários</div>
              </div>
            </div>
          </div>
        </div>

        {/* Categorias */}
        <div className="categories-section">
          <h2>Categorias</h2>
          <div className="categories-grid">
            {categories.map(cat => (
              <button
                key={cat}
                className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat === 'all' ? 'Todas' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Produtos */}
        <div className="products-section">
          <div className="section-header">
            <h2>Produtos em Destaque</h2>
            <div className="view-options">
              <button className="view-btn active"><Grid size={20} /></button>
              <button className="view-btn"><List size={20} /></button>
            </div>
          </div>

          <div className="products-grid">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    );
  };

  // ============================
  // CARD DE PRODUTO
  // ============================

  const ProductCard = ({ product }) => (
    <div className="product-card" onClick={() => setSelectedProduct(product)}>
      <div className="product-image">
        <img src={product.images[0]} alt={product.name} />
        <div className="product-badge">{product.category}</div>
      </div>
      
      <div className="product-info">
        <h3>{product.name}</h3>
        <div className="product-seller">
          <Store size={14} />
          <span>{product.seller}</span>
        </div>
        
        <div className="product-rating">
          <Star size={14} fill="#FFD700" color="#FFD700" />
          <span>{product.rating}</span>
          <span className="reviews">({product.reviews})</span>
        </div>

        <div className="product-location">
          <MapPin size={14} />
          <span>{product.location}</span>
        </div>

        <div className="product-footer">
          <div className="product-price">
            {product.price.toLocaleString('pt-MZ')} MZN
          </div>
          <button className="whatsapp-btn" onClick={(e) => {
            e.stopPropagation();
            window.open(`https://wa.me/${product.whatsapp}?text=Olá, estou interessado no produto ${product.name} anunciado no MozCommerce.`, '_blank');
          }}>
            <MessageCircle size={18} />
          </button>
        </div>
      </div>
    </div>
  );

  // ============================
  // DETALHES DO PRODUTO
  // ============================

  const ProductDetails = () => {
    if (!selectedProduct) return null;

    return (
      <div className="product-details-overlay" onClick={() => setSelectedProduct(null)}>
        <div className="product-details-modal" onClick={(e) => e.stopPropagation()}>
          <button className="close-btn" onClick={() => setSelectedProduct(null)}>
            <X size={24} />
          </button>

          <div className="product-details-content">
            <div className="product-details-left">
              <img src={selectedProduct.images[0]} alt={selectedProduct.name} />
            </div>

            <div className="product-details-right">
              <div className="category-badge">{selectedProduct.category}</div>
              <h1>{selectedProduct.name}</h1>
              
              <div className="seller-info">
                <Store size={18} />
                <span>{selectedProduct.seller}</span>
                <div className="verified-badge">
                  <CheckCircle size={14} />
                  Verificado
                </div>
              </div>

              <div className="rating-row">
                <Star size={18} fill="#FFD700" color="#FFD700" />
                <span className="rating-value">{selectedProduct.rating}</span>
                <span className="rating-count">({selectedProduct.reviews} avaliações)</span>
              </div>

              <div className="location-row">
                <MapPin size={18} />
                <span>{selectedProduct.location}</span>
              </div>

              <div className="stock-info">
                <Package size={18} />
                <span>{selectedProduct.stock} unidades disponíveis</span>
              </div>

              <div className="description">
                <h3>Descrição</h3>
                <p>{selectedProduct.description}</p>
              </div>

              <div className="price-section">
                <div className="price-label">Preço</div>
                <div className="price-value">{selectedProduct.price.toLocaleString('pt-MZ')} MZN</div>
              </div>

              <div className="action-buttons">
                <button className="btn-primary" onClick={() => {
                  setCart([...cart, selectedProduct]);
                  alert('Produto adicionado ao carrinho!');
                }}>
                  <ShoppingCart size={20} />
                  Adicionar ao Carrinho
                </button>
                
                <button className="btn-whatsapp" onClick={() => {
                  window.open(`https://wa.me/${selectedProduct.whatsapp}?text=Olá, estou interessado no produto ${selectedProduct.name} anunciado no MozCommerce.`, '_blank');
                }}>
                  <MessageCircle size={20} />
                  Contactar via WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ============================
  // CARRINHO
  // ============================

  const CartView = () => {
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const [selectedPayment, setSelectedPayment] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [showPayment, setShowPayment] = useState(false);

    return (
      <div className="cart-view">
        <h1><ShoppingCart size={28} /> Meu Carrinho</h1>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <ShoppingCart size={64} />
            <h2>Seu carrinho está vazio</h2>
            <p>Adicione produtos para começar suas compras</p>
            <button className="btn-primary" onClick={() => setCurrentView('home')}>
              Explorar Produtos
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item, index) => (
                <div key={index} className="cart-item">
                  <img src={item.images[0]} alt={item.name} />
                  <div className="cart-item-info">
                    <h3>{item.name}</h3>
                    <p className="seller">{item.seller}</p>
                    <p className="price">{item.price.toLocaleString('pt-MZ')} MZN</p>
                  </div>
                  <button className="remove-btn" onClick={() => {
                    setCart(cart.filter((_, i) => i !== index));
                  }}>
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>{total.toLocaleString('pt-MZ')} MZN</span>
              </div>
              <div className="summary-row">
                <span>Taxa de Serviço (5%)</span>
                <span>{(total * 0.05).toLocaleString('pt-MZ')} MZN</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>{(total * 1.05).toLocaleString('pt-MZ')} MZN</span>
              </div>

              <button className="btn-checkout" onClick={() => setShowPayment(true)}>
                Finalizar Compra
              </button>
            </div>

            {showPayment && (
              <PaymentModal 
                amount={total * 1.05} 
                onClose={() => setShowPayment(false)}
              />
            )}
          </>
        )}
      </div>
    );
  };

  // ============================
  // MODAL DE PAGAMENTO
  // ============================

  const PaymentModal = ({ amount, onClose }) => {
    const [selectedMethod, setSelectedMethod] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [processing, setProcessing] = useState(false);
    const [success, setSuccess] = useState(false);

    const processPayment = () => {
      setProcessing(true);
      
      setTimeout(() => {
        setProcessing(false);
        setSuccess(true);
        
        setTimeout(() => {
          alert('Pagamento confirmado! Pedido realizado com sucesso.');
          setCart([]);
          onClose();
          setCurrentView('home');
        }, 2000);
      }, 3000);
    };

    return (
      <div className="payment-modal-overlay" onClick={onClose}>
        <div className="payment-modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2><CreditCard size={24} /> Pagamento Seguro</h2>
            <button onClick={onClose}><X size={24} /></button>
          </div>

          {!processing && !success && (
            <>
              <div className="payment-amount">
                <span>Total a Pagar</span>
                <h1>{amount.toLocaleString('pt-MZ')} MZN</h1>
              </div>

              <div className="payment-methods">
                <h3>Escolha o Método de Pagamento</h3>
                
                <div className="payment-options">
                  {Object.entries(PaymentMethods).map(([key, value]) => (
                    <button
                      key={key}
                      className={`payment-option ${selectedMethod === key ? 'selected' : ''}`}
                      onClick={() => setSelectedMethod(key)}
                    >
                      <Smartphone size={24} />
                      <span>{value}</span>
                      <CheckCircle size={20} />
                    </button>
                  ))}
                </div>
              </div>

              {selectedMethod && (
                <div className="payment-form">
                  {['MPESA', 'EMOLA', 'MKESH'].includes(selectedMethod) ? (
                    <div className="form-group">
                      <label>Número de Telefone</label>
                      <div className="phone-input">
                        <span className="prefix">+258</span>
                        <input
                          type="tel"
                          placeholder="84 123 4567"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                      </div>
                      <p className="help-text">
                        Você receberá uma solicitação no seu telefone para confirmar o pagamento
                      </p>
                    </div>
                  ) : (
                    <div className="form-group">
                      <label>Número do Cartão</label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                      />
                    </div>
                  )}

                  <button className="btn-pay" onClick={processPayment}>
                    <Lock size={20} />
                    Confirmar Pagamento
                  </button>
                </div>
              )}
            </>
          )}

          {processing && (
            <div className="payment-processing">
              <div className="spinner"></div>
              <h3>Processando Pagamento...</h3>
              <p>Aguarde a confirmação</p>
            </div>
          )}

          {success && (
            <div className="payment-success">
              <CheckCircle size={64} color="#10b981" />
              <h3>Pagamento Confirmado!</h3>
              <p>Seu pedido foi realizado com sucesso</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  // ============================
  // DASHBOARD ADMIN
  // ============================

  const AdminDashboard = () => {
    const stats = {
      totalSales: 2500000,
      platformRevenue: 125000,
      activeVendors: 1250,
      totalOrders: 5678,
      pendingApprovals: 23,
      disputes: 5
    };

    return (
      <div className="admin-dashboard">
        <div className="dashboard-header">
          <h1><Shield size={32} /> Painel Administrativo</h1>
          <div className="header-actions">
            <button className="btn-secondary">
              <Download size={20} />
              Exportar Relatório
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card revenue">
            <div className="stat-icon">
              <DollarSign size={28} />
            </div>
            <div className="stat-content">
              <div className="stat-label">Receita da Plataforma</div>
              <div className="stat-value">{stats.platformRevenue.toLocaleString('pt-MZ')} MZN</div>
              <div className="stat-change positive">
                <ArrowUpRight size={16} />
                +15.3% vs mês anterior
              </div>
            </div>
          </div>

          <div className="stat-card sales">
            <div className="stat-icon">
              <TrendingUp size={28} />
            </div>
            <div className="stat-content">
              <div className="stat-label">Total de Vendas</div>
              <div className="stat-value">{stats.totalSales.toLocaleString('pt-MZ')} MZN</div>
              <div className="stat-change positive">
                <ArrowUpRight size={16} />
                +22.5% vs mês anterior
              </div>
            </div>
          </div>

          <div className="stat-card vendors">
            <div className="stat-icon">
              <Store size={28} />
            </div>
            <div className="stat-content">
              <div className="stat-label">Vendedores Ativos</div>
              <div className="stat-value">{stats.activeVendors}</div>
              <div className="stat-change positive">
                <ArrowUpRight size={16} />
                +8.2% vs mês anterior
              </div>
            </div>
          </div>

          <div className="stat-card orders">
            <div className="stat-icon">
              <Package size={28} />
            </div>
            <div className="stat-content">
              <div className="stat-label">Total de Pedidos</div>
              <div className="stat-value">{stats.totalOrders}</div>
              <div className="stat-change positive">
                <ArrowUpRight size={16} />
                +12.8% vs mês anterior
              </div>
            </div>
          </div>

          <div className="stat-card pending">
            <div className="stat-icon">
              <AlertCircle size={28} />
            </div>
            <div className="stat-content">
              <div className="stat-label">Aprovações Pendentes</div>
              <div className="stat-value">{stats.pendingApprovals}</div>
              <div className="stat-meta">Requer atenção</div>
            </div>
          </div>

          <div className="stat-card disputes">
            <div className="stat-icon">
              <AlertTriangle size={28} />
            </div>
            <div className="stat-content">
              <div className="stat-label">Disputas Abertas</div>
              <div className="stat-value">{stats.disputes}</div>
              <div className="stat-meta">Resolver urgentemente</div>
            </div>
          </div>
        </div>

        {/* Gráficos */}
        <div className="charts-section">
          <div className="chart-card">
            <h3><BarChart3 size={20} /> Vendas nos Últimos 30 Dias</h3>
            <div className="chart-placeholder">
              <div className="chart-bars">
                {[65, 78, 82, 90, 88, 95, 100, 92, 85, 88, 94, 98, 96, 100].map((height, i) => (
                  <div key={i} className="chart-bar" style={{height: `${height}%`}}></div>
                ))}
              </div>
            </div>
          </div>

          <div className="chart-card">
            <h3><PieChart size={20} /> Vendas por Categoria</h3>
            <div className="category-stats">
              <div className="category-item">
                <div className="category-bar" style={{width: '85%', backgroundColor: '#3b82f6'}}></div>
                <span>Electrónicos - 35%</span>
              </div>
              <div className="category-item">
                <div className="category-bar" style={{width: '65%', backgroundColor: '#10b981'}}></div>
                <span>Imóveis - 25%</span>
              </div>
              <div className="category-item">
                <div className="category-bar" style={{width: '45%', backgroundColor: '#f59e0b'}}></div>
                <span>Automóveis - 20%</span>
              </div>
              <div className="category-item">
                <div className="category-bar" style={{width: '35%', backgroundColor: '#8b5cf6'}}></div>
                <span>Serviços - 12%</span>
              </div>
              <div className="category-item">
                <div className="category-bar" style={{width: '25%', backgroundColor: '#ec4899'}}></div>
                <span>Outros - 8%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="recent-orders">
          <h3><Package size={20} /> Pedidos Recentes</h3>
          <div className="orders-table">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Produto</th>
                  <th>Comprador</th>
                  <th>Vendedor</th>
                  <th>Valor</th>
                  <th>Comissão</th>
                  <th>Status</th>
                  <th>Data</th>
                </tr>
              </thead>
              <tbody>
                {mockOrders.map(order => (
                  <tr key={order.id}>
                    <td className="order-id">{order.id}</td>
                    <td>{order.product}</td>
                    <td>{order.buyer}</td>
                    <td>{order.seller}</td>
                    <td className="amount">{order.amount.toLocaleString('pt-MZ')} MZN</td>
                    <td className="commission">{order.commission.toLocaleString('pt-MZ')} MZN</td>
                    <td>
                      <span className={`status-badge ${order.status.toLowerCase()}`}>
                        {order.status}
                      </span>
                    </td>
                    <td>{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <h3><Zap size={20} /> Ações Rápidas</h3>
          <div className="actions-grid">
            <button className="action-btn">
              <Users size={24} />
              <span>Aprovar Vendedores</span>
              <span className="badge">{stats.pendingApprovals}</span>
            </button>
            <button className="action-btn">
              <AlertTriangle size={24} />
              <span>Resolver Disputas</span>
              <span className="badge">{stats.disputes}</span>
            </button>
            <button className="action-btn">
              <Settings size={24} />
              <span>Configurar Taxas</span>
            </button>
            <button className="action-btn">
              <FileText size={24} />
              <span>Gerar Relatório</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ============================
  // DASHBOARD VENDEDOR
  // ============================

  const SellerDashboard = () => {
    const sellerStats = {
      totalSales: 156000,
      pendingOrders: 8,
      completedOrders: 234,
      rating: 4.8,
      products: 45,
      revenue: 148200
    };

    return (
      <div className="seller-dashboard">
        <div className="dashboard-header">
          <h1><Store size={32} /> Minha Loja</h1>
          <div className="header-actions">
            <button className="btn-primary" onClick={() => setCurrentView('add-product')}>
              <Plus size={20} />
              Adicionar Produto
            </button>
          </div>
        </div>

        {/* Seller Stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <DollarSign size={28} />
            </div>
            <div className="stat-content">
              <div className="stat-label">Receita Total</div>
              <div className="stat-value">{sellerStats.revenue.toLocaleString('pt-MZ')} MZN</div>
              <div className="stat-change positive">
                <ArrowUpRight size={16} />
                +18.5% este mês
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <Package size={28} />
            </div>
            <div className="stat-content">
              <div className="stat-label">Pedidos Pendentes</div>
              <div className="stat-value">{sellerStats.pendingOrders}</div>
              <div className="stat-meta">Processar hoje</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <CheckCircle size={28} />
            </div>
            <div className="stat-content">
              <div className="stat-label">Pedidos Completos</div>
              <div className="stat-value">{sellerStats.completedOrders}</div>
              <div className="stat-change positive">
                <ArrowUpRight size={16} />
                +12 esta semana
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <Star size={28} />
            </div>
            <div className="stat-content">
              <div className="stat-label">Avaliação</div>
              <div className="stat-value">{sellerStats.rating} ⭐</div>
              <div className="stat-meta">156 avaliações</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <Grid size={28} />
            </div>
            <div className="stat-content">
              <div className="stat-label">Produtos Ativos</div>
              <div className="stat-value">{sellerStats.products}</div>
              <div className="stat-meta">5 inativos</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <TrendingUp size={28} />
            </div>
            <div className="stat-content">
              <div className="stat-label">Total de Vendas</div>
              <div className="stat-value">{sellerStats.totalSales.toLocaleString('pt-MZ')} MZN</div>
              <div className="stat-change positive">
                <ArrowUpRight size={16} />
                +25.3% vs mês anterior
              </div>
            </div>
          </div>
        </div>

        {/* Products Management */}
        <div className="products-management">
          <h3><Grid size={20} /> Meus Produtos</h3>
          <div className="products-list">
            {mockProducts.slice(0, 3).map(product => (
              <div key={product.id} className="seller-product-card">
                <img src={product.images[0]} alt={product.name} />
                <div className="product-info">
                  <h4>{product.name}</h4>
                  <p className="price">{product.price.toLocaleString('pt-MZ')} MZN</p>
                  <div className="product-stats">
                    <span><Eye size={14} /> 1.2k visualizações</span>
                    <span><Star size={14} /> {product.rating}</span>
                    <span><Package size={14} /> {product.stock} em estoque</span>
                  </div>
                </div>
                <div className="product-actions">
                  <button className="btn-icon"><Edit size={18} /></button>
                  <button className="btn-icon"><Trash2 size={18} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="seller-orders">
          <h3><Package size={20} /> Pedidos Recentes</h3>
          <div className="orders-list">
            {mockOrders.slice(0, 2).map(order => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <span className="order-id">{order.id}</span>
                  <span className={`status-badge ${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </div>
                <div className="order-info">
                  <p className="product-name">{order.product}</p>
                  <p className="buyer">Cliente: {order.buyer}</p>
                  <div className="order-footer">
                    <span className="amount">{order.amount.toLocaleString('pt-MZ')} MZN</span>
                    <span className="date">{order.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // ============================
  // RENDER
  // ============================

  if (!isAuthenticated) {
    return <LoginScreen />;
  }

  return (
    <div className="mozcommerce">
      <Header />
      
      <main className="main-content">
        {currentView === 'home' && userRole === UserRoles.BUYER && <MarketplaceHome />}
        {currentView === 'cart' && <CartView />}
        {currentView === 'admin-dashboard' && <AdminDashboard />}
        {currentView === 'seller-dashboard' && <SellerDashboard />}
      </main>

      {selectedProduct && <ProductDetails />}

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .mozcommerce {
          font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          min-height: 100vh;
          color: #fff;
        }

        /* ========== LOGIN ========== */
        .login-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
        }

        .login-box {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          padding: 48px;
          max-width: 500px;
          width: 100%;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }

        .login-logo {
          text-align: center;
          margin-bottom: 40px;
        }

        .login-logo svg {
          color: #3b82f6;
          margin-bottom: 16px;
        }

        .login-logo h1 {
          font-size: 32px;
          font-weight: 700;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 8px;
        }

        .login-logo p {
          color: rgba(255, 255, 255, 0.6);
          font-size: 14px;
        }

        .login-options {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 32px;
        }

        .role-btn {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 20px 24px;
          display: flex;
          align-items: center;
          gap: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
          color: #fff;
          font-size: 16px;
          font-weight: 500;
        }

        .role-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }

        .role-btn.buyer:hover { border-color: #3b82f6; }
        .role-btn.seller:hover { border-color: #10b981; }
        .role-btn.admin:hover { border-color: #f59e0b; }

        .role-btn span {
          flex: 1;
        }

        .login-footer {
          text-align: center;
          padding-top: 24px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .login-footer p {
          color: rgba(255, 255, 255, 0.6);
          font-size: 14px;
          margin-bottom: 8px;
        }

        .login-footer a {
          color: #3b82f6;
          text-decoration: none;
          font-weight: 500;
        }

        /* ========== HEADER ========== */
        .main-header {
          background: rgba(15, 23, 42, 0.95);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .header-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 16px 24px;
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          color: #fff;
          cursor: pointer;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          font-size: 24px;
          font-weight: 700;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .logo svg {
          color: #3b82f6;
        }

        .header-search {
          flex: 1;
          max-width: 600px;
          position: relative;
        }

        .header-search svg {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(255, 255, 255, 0.4);
        }

        .header-search input {
          width: 100%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 12px 16px 12px 48px;
          color: #fff;
          font-size: 14px;
        }

        .header-search input::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .header-btn {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          padding: 10px;
          color: #fff;
          cursor: pointer;
          transition: all 0.2s;
          position: relative;
        }

        .header-btn:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .header-btn.profile {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
        }

        .avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 14px;
        }

        .user-name {
          font-size: 14px;
          font-weight: 500;
        }

        .badge {
          position: absolute;
          top: -4px;
          right: -4px;
          background: #ef4444;
          color: #fff;
          font-size: 11px;
          font-weight: 600;
          padding: 2px 6px;
          border-radius: 10px;
        }

        .header-btn.logout {
          background: rgba(239, 68, 68, 0.1);
          border-color: rgba(239, 68, 68, 0.3);
        }

        .header-btn.logout:hover {
          background: rgba(239, 68, 68, 0.2);
        }

        /* ========== MAIN CONTENT ========== */
        .main-content {
          max-width: 1400px;
          margin: 0 auto;
          padding: 24px;
          min-height: calc(100vh - 80px);
        }

        /* ========== HERO ========== */
        .hero-section {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1));
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          padding: 64px 48px;
          margin-bottom: 48px;
          text-align: center;
        }

        .hero-content h1 {
          font-size: 48px;
          font-weight: 700;
          margin-bottom: 16px;
          background: linear-gradient(135deg, #fff, rgba(255, 255, 255, 0.7));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-content p {
          font-size: 18px;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 40px;
        }

        .hero-stats {
          display: flex;
          justify-content: center;
          gap: 64px;
        }

        .stat {
          text-align: center;
        }

        .stat-value {
          font-size: 36px;
          font-weight: 700;
          color: #3b82f6;
          margin-bottom: 8px;
        }

        .stat-label {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.6);
        }

        /* ========== CATEGORIES ========== */
        .categories-section {
          margin-bottom: 48px;
        }

        .categories-section h2 {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 20px;
        }

        .categories-grid {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .category-btn {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 12px 24px;
          color: rgba(255, 255, 255, 0.7);
          cursor: pointer;
          transition: all 0.2s;
          font-size: 14px;
          font-weight: 500;
        }

        .category-btn:hover,
        .category-btn.active {
          background: #3b82f6;
          border-color: #3b82f6;
          color: #fff;
        }

        /* ========== PRODUCTS ========== */
        .products-section {
          margin-bottom: 48px;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .section-header h2 {
          font-size: 28px;
          font-weight: 700;
        }

        .view-options {
          display: flex;
          gap: 8px;
        }

        .view-btn {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          padding: 8px;
          color: rgba(255, 255, 255, 0.7);
          cursor: pointer;
          transition: all 0.2s;
        }

        .view-btn.active,
        .view-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 24px;
        }

        .product-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.3s;
        }

        .product-card:hover {
          transform: translateY(-4px);
          border-color: rgba(59, 130, 246, 0.5);
          box-shadow: 0 12px 40px rgba(59, 130, 246, 0.2);
        }

        .product-image {
          position: relative;
          height: 200px;
          overflow: hidden;
        }

        .product-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .product-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          background: rgba(59, 130, 246, 0.9);
          backdrop-filter: blur(10px);
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 600;
        }

        .product-info {
          padding: 16px;
        }

        .product-info h3 {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 12px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .product-seller {
          display: flex;
          align-items: center;
          gap: 6px;
          color: rgba(255, 255, 255, 0.6);
          font-size: 13px;
          margin-bottom: 8px;
        }

        .product-rating {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          margin-bottom: 8px;
        }

        .reviews {
          color: rgba(255, 255, 255, 0.5);
        }

        .product-location {
          display: flex;
          align-items: center;
          gap: 6px;
          color: rgba(255, 255, 255, 0.6);
          font-size: 13px;
          margin-bottom: 16px;
        }

        .product-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 16px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .product-price {
          font-size: 20px;
          font-weight: 700;
          color: #10b981;
        }

        .whatsapp-btn {
          background: #25D366;
          border: none;
          border-radius: 8px;
          padding: 8px 12px;
          color: #fff;
          cursor: pointer;
          transition: all 0.2s;
        }

        .whatsapp-btn:hover {
          background: #20BA5A;
          transform: scale(1.05);
        }

        /* ========== PRODUCT DETAILS ========== */
        .product-details-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          z-index: 1000;
          animation: fadeIn 0.2s;
        }

        .product-details-modal {
          background: #1e293b;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          max-width: 1000px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          animation: slideUp 0.3s;
        }

        .close-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          background: rgba(255, 255, 255, 0.1);
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          cursor: pointer;
          z-index: 10;
        }

        .close-btn:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .product-details-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          padding: 40px;
        }

        .product-details-left img {
          width: 100%;
          border-radius: 16px;
        }

        .product-details-right {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .category-badge {
          display: inline-block;
          background: rgba(59, 130, 246, 0.2);
          border: 1px solid rgba(59, 130, 246, 0.3);
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 600;
          color: #3b82f6;
          width: fit-content;
        }

        .product-details-right h1 {
          font-size: 28px;
          font-weight: 700;
        }

        .seller-info {
          display: flex;
          align-items: center;
          gap: 8px;
          color: rgba(255, 255, 255, 0.7);
        }

        .verified-badge {
          display: flex;
          align-items: center;
          gap: 4px;
          background: rgba(16, 185, 129, 0.2);
          border: 1px solid rgba(16, 185, 129, 0.3);
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 12px;
          color: #10b981;
          margin-left: auto;
        }

        .rating-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .rating-value {
          font-weight: 600;
          font-size: 18px;
        }

        .rating-count {
          color: rgba(255, 255, 255, 0.5);
        }

        .location-row,
        .stock-info {
          display: flex;
          align-items: center;
          gap: 8px;
          color: rgba(255, 255, 255, 0.7);
        }

        .description {
          padding: 20px 0;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .description h3 {
          font-size: 16px;
          margin-bottom: 12px;
        }

        .description p {
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.6;
        }

        .price-section {
          padding: 20px 0;
        }

        .price-label {
          color: rgba(255, 255, 255, 0.6);
          font-size: 14px;
          margin-bottom: 8px;
        }

        .price-value {
          font-size: 32px;
          font-weight: 700;
          color: #10b981;
        }

        .action-buttons {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: auto;
        }

        .btn-primary,
        .btn-whatsapp {
          padding: 16px 24px;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          transition: all 0.2s;
        }

        .btn-primary {
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          color: #fff;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(59, 130, 246, 0.4);
        }

        .btn-whatsapp {
          background: #25D366;
          color: #fff;
        }

        .btn-whatsapp:hover {
          background: #20BA5A;
          transform: translateY(-2px);
        }

        /* ========== CART ========== */
        .cart-view {
          max-width: 900px;
          margin: 0 auto;
        }

        .cart-view h1 {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 32px;
          margin-bottom: 32px;
        }

        .empty-cart {
          text-align: center;
          padding: 80px 20px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
        }

        .empty-cart svg {
          color: rgba(255, 255, 255, 0.3);
          margin-bottom: 24px;
        }

        .empty-cart h2 {
          font-size: 24px;
          margin-bottom: 12px;
        }

        .empty-cart p {
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 32px;
        }

        .cart-items {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 24px;
          margin-bottom: 24px;
        }

        .cart-item {
          display: flex;
          gap: 20px;
          padding: 20px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .cart-item:last-child {
          border-bottom: none;
        }

        .cart-item img {
          width: 100px;
          height: 100px;
          object-fit: cover;
          border-radius: 12px;
        }

        .cart-item-info {
          flex: 1;
        }

        .cart-item-info h3 {
          font-size: 18px;
          margin-bottom: 8px;
        }

        .cart-item-info .seller {
          color: rgba(255, 255, 255, 0.6);
          font-size: 14px;
          margin-bottom: 12px;
        }

        .cart-item-info .price {
          font-size: 20px;
          font-weight: 700;
          color: #10b981;
        }

        .remove-btn {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          border-radius: 8px;
          padding: 8px;
          color: #ef4444;
          cursor: pointer;
        }

        .remove-btn:hover {
          background: rgba(239, 68, 68, 0.2);
        }

        .cart-summary {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 24px;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          padding: 12px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .summary-row:last-of-type {
          border-bottom: none;
        }

        .summary-row.total {
          font-size: 20px;
          font-weight: 700;
          color: #10b981;
          padding-top: 20px;
          border-top: 2px solid rgba(255, 255, 255, 0.2);
        }

        .btn-checkout {
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          border: none;
          border-radius: 12px;
          color: #fff;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          margin-top: 20px;
        }

        .btn-checkout:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(59, 130, 246, 0.4);
        }

        /* ========== PAYMENT MODAL ========== */
        .payment-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          z-index: 2000;
        }

        .payment-modal {
          background: #1e293b;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          max-width: 500px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .modal-header h2 {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 20px;
        }

        .modal-header button {
          background: none;
          border: none;
          color: #fff;
          cursor: pointer;
          padding: 8px;
        }

        .payment-amount {
          text-align: center;
          padding: 32px 24px;
          background: rgba(59, 130, 246, 0.1);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .payment-amount span {
          color: rgba(255, 255, 255, 0.6);
          font-size: 14px;
        }

        .payment-amount h1 {
          font-size: 36px;
          font-weight: 700;
          color: #10b981;
          margin-top: 8px;
        }

        .payment-methods {
          padding: 24px;
        }

        .payment-methods h3 {
          font-size: 16px;
          margin-bottom: 16px;
        }

        .payment-options {
          display: grid;
          gap: 12px;
        }

        .payment-option {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 16px;
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          transition: all 0.2s;
          color: #fff;
          font-size: 15px;
          font-weight: 500;
        }

        .payment-option:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .payment-option.selected {
          background: rgba(59, 130, 246, 0.2);
          border-color: #3b82f6;
        }

        .payment-option span {
          flex: 1;
        }

        .payment-option svg:last-child {
          opacity: 0;
        }

        .payment-option.selected svg:last-child {
          opacity: 1;
          color: #10b981;
        }

        .payment-form {
          padding: 24px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 8px;
          color: rgba(255, 255, 255, 0.9);
        }

        .phone-input {
          display: flex;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          overflow: hidden;
        }

        .prefix {
          padding: 12px 16px;
          background: rgba(255, 255, 255, 0.05);
          border-right: 1px solid rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.6);
        }

        .phone-input input,
        .form-group input {
          flex: 1;
          background: transparent;
          border: none;
          padding: 12px 16px;
          color: #fff;
          font-size: 15px;
        }

        .form-group input {
          width: 100%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
        }

        .help-text {
          margin-top: 8px;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.5);
        }

        .btn-pay {
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, #10b981, #059669);
          border: none;
          border-radius: 12px;
          color: #fff;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }

        .btn-pay:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(16, 185, 129, 0.4);
        }

        .payment-processing,
        .payment-success {
          padding: 60px 24px;
          text-align: center;
        }

        .spinner {
          width: 60px;
          height: 60px;
          border: 4px solid rgba(59, 130, 246, 0.2);
          border-top-color: #3b82f6;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 24px;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .payment-processing h3,
        .payment-success h3 {
          font-size: 20px;
          margin-bottom: 8px;
        }

        .payment-processing p {
          color: rgba(255, 255, 255, 0.6);
        }

        .payment-success svg {
          margin-bottom: 24px;
        }

        /* ========== ADMIN DASHBOARD ========== */
        .admin-dashboard,
        .seller-dashboard {
          max-width: 1400px;
          margin: 0 auto;
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
        }

        .dashboard-header h1 {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 32px;
        }

        .header-actions {
          display: flex;
          gap: 12px;
        }

        .btn-secondary {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 12px 20px;
          color: #fff;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
          margin-bottom: 32px;
        }

        .stat-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 24px;
          display: flex;
          gap: 20px;
        }

        .stat-card.revenue { border-left: 4px solid #10b981; }
        .stat-card.sales { border-left: 4px solid #3b82f6; }
        .stat-card.vendors { border-left: 4px solid #8b5cf6; }
        .stat-card.orders { border-left: 4px solid #f59e0b; }
        .stat-card.pending { border-left: 4px solid #ef4444; }
        .stat-card.disputes { border-left: 4px solid #dc2626; }

        .stat-icon {
          width: 56px;
          height: 56px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.05);
        }

        .stat-card.revenue .stat-icon { background: rgba(16, 185, 129, 0.2); color: #10b981; }
        .stat-card.sales .stat-icon { background: rgba(59, 130, 246, 0.2); color: #3b82f6; }
        .stat-card.vendors .stat-icon { background: rgba(139, 92, 246, 0.2); color: #8b5cf6; }
        .stat-card.orders .stat-icon { background: rgba(245, 158, 11, 0.2); color: #f59e0b; }
        .stat-card.pending .stat-icon { background: rgba(239, 68, 68, 0.2); color: #ef4444; }
        .stat-card.disputes .stat-icon { background: rgba(220, 38, 38, 0.2); color: #dc2626; }

        .stat-content {
          flex: 1;
        }

        .stat-label {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 8px;
        }

        .stat-value {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .stat-change {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          font-weight: 500;
        }

        .stat-change.positive {
          color: #10b981;
        }

        .stat-meta {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.5);
        }

        /* ========== CHARTS ========== */
        .charts-section {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
          gap: 24px;
          margin-bottom: 32px;
        }

        .chart-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 24px;
        }

        .chart-card h3 {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 16px;
          margin-bottom: 24px;
        }

        .chart-placeholder {
          height: 250px;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
        }

        .chart-bars {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 8px;
          height: 100%;
          width: 100%;
        }

        .chart-bar {
          flex: 1;
          background: linear-gradient(to top, #3b82f6, #60a5fa);
          border-radius: 4px 4px 0 0;
          transition: all 0.3s;
          cursor: pointer;
        }

        .chart-bar:hover {
          background: linear-gradient(to top, #2563eb, #3b82f6);
        }

        .category-stats {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .category-item {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .category-bar {
          height: 32px;
          border-radius: 8px;
          transition: all 0.3s;
        }

        .category-item span {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.7);
        }

        /* ========== TABLES ========== */
        .recent-orders,
        .seller-orders,
        .products-management {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 24px;
          margin-bottom: 32px;
        }

        .recent-orders h3,
        .seller-orders h3,
        .products-management h3 {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 18px;
          margin-bottom: 20px;
        }

        .orders-table {
          overflow-x: auto;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        thead {
          background: rgba(255, 255, 255, 0.05);
        }

        th {
          text-align: left;
          padding: 12px 16px;
          font-size: 13px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.8);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        td {
          padding: 16px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          font-size: 14px;
        }

        tbody tr:hover {
          background: rgba(255, 255, 255, 0.02);
        }

        .order-id {
          color: #3b82f6;
          font-weight: 600;
        }

        .amount {
          color: #10b981;
          font-weight: 600;
        }

        .commission {
          color: #f59e0b;
          font-weight: 600;
        }

        .status-badge {
          display: inline-block;
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 600;
        }

        .status-badge.pago {
          background: rgba(16, 185, 129, 0.2);
          color: #10b981;
        }

        .status-badge.entregue {
          background: rgba(59, 130, 246, 0.2);
          color: #3b82f6;
        }

        .status-badge.pendente {
          background: rgba(245, 158, 11, 0.2);
          color: #f59e0b;
        }

        /* ========== QUICK ACTIONS ========== */
        .quick-actions {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 24px;
        }

        .quick-actions h3 {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 18px;
          margin-bottom: 20px;
        }

        .actions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
        }

        .action-btn {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          transition: all 0.2s;
          color: #fff;
          font-size: 14px;
          font-weight: 500;
          position: relative;
        }

        .action-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-2px);
        }

        .action-btn .badge {
          position: absolute;
          top: 12px;
          right: 12px;
        }

        /* ========== SELLER PRODUCTS ========== */
        .products-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .seller-product-card {
          display: flex;
          gap: 20px;
          padding: 16px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          transition: all 0.2s;
        }

        .seller-product-card:hover {
          background: rgba(255, 255, 255, 0.05);
        }

        .seller-product-card img {
          width: 100px;
          height: 100px;
          object-fit: cover;
          border-radius: 8px;
        }

        .seller-product-card .product-info {
          flex: 1;
        }

        .seller-product-card h4 {
          font-size: 16px;
          margin-bottom: 8px;
        }

        .seller-product-card .price {
          font-size: 18px;
          font-weight: 700;
          color: #10b981;
          margin-bottom: 12px;
        }

        .product-stats {
          display: flex;
          gap: 16px;
          font-size: 13px;
          color: rgba(255, 255, 255, 0.6);
        }

        .product-stats span {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .product-actions {
          display: flex;
          gap: 8px;
        }

        .btn-icon {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-icon:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        /* ========== ORDERS LIST ========== */
        .orders-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 16px;
        }

        .order-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 20px;
          transition: all 0.2s;
        }

        .order-card:hover {
          background: rgba(255, 255, 255, 0.05);
        }

        .order-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .order-info .product-name {
          font-weight: 600;
          margin-bottom: 8px;
        }

        .order-info .buyer {
          color: rgba(255, 255, 255, 0.6);
          font-size: 14px;
          margin-bottom: 16px;
        }

        .order-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 16px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .order-footer .amount {
          font-size: 18px;
        }

        .order-footer .date {
          color: rgba(255, 255, 255, 0.5);
          font-size: 13px;
        }

        /* ========== ANIMATIONS ========== */
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* ========== RESPONSIVE ========== */
        @media (max-width: 768px) {
          .mobile-menu-btn {
            display: block;
          }

          .header-search {
            display: none;
          }

          .user-name {
            display: none;
          }

          .hero-content h1 {
            font-size: 32px;
          }

          .hero-stats {
            flex-direction: column;
            gap: 24px;
          }

          .products-grid {
            grid-template-columns: 1fr;
          }

          .product-details-content {
            grid-template-columns: 1fr;
          }

          .charts-section {
            grid-template-columns: 1fr;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .orders-list {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
