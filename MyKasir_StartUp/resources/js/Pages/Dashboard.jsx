import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';

// Sample Data Produk (Bisa diganti dengan data dari Laravel DB)
const initialProducts = [
    { id: 1, name: "Indomie Goreng", price: 3500, emoji: "🍜", bg: "bg-orange-100", text: "text-orange-600" },
    { id: 2, name: "Indomie Kuah Ayam", price: 3000, emoji: "🍲", bg: "bg-yellow-100", text: "text-yellow-600" },
    { id: 3, name: "Kopi ABC Sachet", price: 1500, emoji: "☕", bg: "bg-amber-100", text: "text-amber-800" },
    { id: 4, name: "Telur Ayam 1kg", price: 28000, emoji: "🥚", bg: "bg-orange-50", text: "text-orange-400" },
    { id: 5, name: "Beras Pandan 5kg", price: 75000, emoji: "🍚", bg: "bg-gray-100", text: "text-gray-600" },
    { id: 6, name: "Minyak Goreng 2L", price: 32000, emoji: "🛢️", bg: "bg-yellow-50", text: "text-yellow-600" },
    { id: 7, name: "Sabun Mandi Cair", price: 18000, emoji: "🧼", bg: "bg-blue-100", text: "text-blue-500" },
    { id: 8, name: "Gula Pasir 1kg", price: 15000, emoji: "🧊", bg: "bg-slate-100", text: "text-slate-500" },
    { id: 9, name: "Teh Pucuk Harum", price: 3500, emoji: "🥤", bg: "bg-green-100", text: "text-green-600" },
    { id: 10, name: "Roti Tawar", price: 12000, emoji: "🍞", bg: "bg-amber-100", text: "text-amber-600" },
    { id: 11, name: "Susu Kental Manis", price: 11000, emoji: "🥛", bg: "bg-blue-50", text: "text-blue-400" },
    { id: 12, name: "Tepung Terigu 1kg", price: 10000, emoji: "🌾", bg: "bg-yellow-100", text: "text-yellow-700" }
];

export default function Dashboard({ auth }) {
    const [cart, setCart] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [cashPaid, setCashPaid] = useState('');
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [lastChangeAmount, setLastChangeAmount] = useState(0);

    // Format Rupiah Helper
    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(number);
    };

    // Filter Produk berdasarkan keyword pencarian
    const filteredProducts = initialProducts.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Cart Actions
    const addToCart = (product) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === product.id ? { ...item, qty: item.qty + 1 } : item
                );
            }
            return [...prevCart, { ...product, qty: 1 }];
        });
    };

    const updateQty = (productId, delta) => {
        setCart(prevCart => {
            return prevCart.map(item => {
                if (item.id === productId) {
                    const newQty = item.qty + delta;
                    return newQty > 0 ? { ...item, qty: newQty } : null;
                }
                return item;
            }).filter(Boolean);
        });
    };

    const clearCart = () => {
        setCart([]);
        setCashPaid('');
    };

    // Calculation Logic
    const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const numericCashPaid = parseFloat(cashPaid) || 0;
    const changeAmount = numericCashPaid - totalAmount;
    const isPaymentValid = cart.length > 0 && numericCashPaid >= totalAmount;

    // Handle Payment
    const handleProcessPayment = () => {
        if (isPaymentValid) {
            setLastChangeAmount(changeAmount);
            setIsSuccessModalOpen(true);
        }
    };

    const handleCloseModal = () => {
        setIsSuccessModalOpen(false);
        clearCart();
    };

    return (
        <>
            <Head title="Kasir (POS) - MyKasir" />

            <div className="bg-gray-50 font-sans text-gray-800 h-screen overflow-hidden flex">
                {/* LEFT SIDEBAR */}
                <aside className="w-64 bg-white border-r border-gray-100 flex flex-col shadow-sm z-10 flex-shrink-0">
                    <div className="h-24 flex flex-col justify-center px-6 border-b border-gray-100">
                        <div className="flex items-baseline space-x-1">
                            <span className="font-logo text-primary text-5xl tracking-tight -mb-2">My</span>
                            <span className="font-bold text-amber-400 text-3xl">Kasir</span>
                        </div>
                        <span className="text-[10px] font-semibold text-gray-400 mt-1 ml-1">Solusi praktis kasir Anda.</span>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
                        <Link href={route('dashboard')} className="flex items-center space-x-3 px-4 py-3 bg-primary text-white shadow-md shadow-primary/20 font-semibold">
                            <i className="fas fa-cash-register w-5 text-center"></i>
                            <span>Kasir (POS)</span>
                        </Link>
                        <a href="#" className="flex items-center space-x-3 px-4 py-3 text-gray-500 hover:bg-green-50 hover:text-primary transition-all font-semibold">
                            <i className="fas fa-box w-5 text-center"></i>
                            <span>Produk</span>
                        </a>
                        <a href="#" className="flex items-center space-x-3 px-4 py-3 text-gray-500 hover:bg-green-50 hover:text-primary transition-all font-semibold">
                            <i className="fas fa-boxes-stacked w-5 text-center"></i>
                            <span>Stok</span>
                        </a>
                        <a href="#" className="flex items-center space-x-3 px-4 py-3 text-gray-500 hover:bg-green-50 hover:text-primary transition-all font-semibold">
                            <i className="fas fa-chart-pie w-5 text-center"></i>
                            <span>Laporan</span>
                        </a>
                        <Link href={route('profile.edit')} className="flex items-center space-x-3 px-4 py-3 text-gray-500 hover:bg-green-50 hover:text-primary rounded-xl transition-all font-semibold">
                            <i className="fas fa-cog w-5 text-center"></i>
                            <span>Pengaturan</span>
                        </Link>
                    </nav>

                    {/* User Profile Info */}
                    <div className="p-4 border-t border-gray-100">
                        <div className="flex items-center justify-between px-3 py-2 bg-gray-50 rounded-xl">
                            <div className="flex items-center space-x-3 truncate">
                                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold uppercase flex-shrink-0">
                                    {auth.user.name ? auth.user.name.substring(0, 2) : 'US'}
                                </div>
                                <div className="truncate">
                                    <p className="text-sm font-bold truncate">{auth.user.name}</p>
                                    <p className="text-xs text-gray-400">Admin Kasir</p>
                                </div>
                            </div>
                            <Link href={route('logout')} method="post" as="button" className="text-gray-400 hover:text-red-500 p-2">
                                <i className="fas fa-sign-out-alt"></i>
                            </Link>
                        </div>
                    </div>
                </aside>

                {/* MAIN CONTENT AREA */}
                <main className="flex-1 flex flex-col h-screen overflow-hidden">
                    {/* Header */}
                    <header className="h-24 bg-white border-b border-gray-100 flex items-center justify-between px-8 shadow-sm z-10 flex-shrink-0">
                        <div>
                            <h1 className="text-2xl font-bold">Daftar Produk</h1>
                            <p className="text-sm text-gray-400">Pilih produk atau cari barang</p>
                        </div>
                        
                        {/* Search Bar */}
                        <div className="relative w-96">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <i className="fas fa-search text-gray-400"></i>
                            </div>
                            <input 
                                type="text" 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Cari nama produk..." 
                                className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-full py-2.5 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-medium"
                            />
                        </div>
                    </header>

                    {/* Product Grid */}
                    <div className="flex overflow-y-auto p-8 bg-gray-50">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {filteredProducts.map((product) => (
                                <div key={product.id} className="bg-white p-4 shadow-sm border border-gray-100 hover:shadow-md hover:border-primary/30 transition-all flex flex-col h-full group">
                                    <div className={`w-full aspect-square ${product.bg} ${product.text} rounded-xl flex items-center justify-center text-6xl mb-4 group-hover:scale-105 transition-transform duration-300`}>
                                        {product.emoji}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-gray-800 text-lg leading-tight mb-1">{product.name}</h3>
                                        <p className="text-primary font-bold">{formatRupiah(product.price)}</p>
                                    </div>
                                    <button 
                                        onClick={() => addToCart(product)} 
                                        className="mt-4 w-full py-2.5 border-2 border-primary text-primary font-bold hover:bg-primary hover:text-white transition-colors flex justify-center items-center space-x-2"
                                    >
                                        <i className="fas fa-plus"></i>
                                        <span>Tambah</span>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>

                {/* RIGHT SIDEBAR (CART & PAYMENT) */}
                <aside className="w-[28rem] bg-white border-l border-gray-100 flex flex-col shadow-sm z-10 flex-shrink-0">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                        <h2 class="text-xl font-bold">Detail Pesanan</h2>
                        <button onClick={clearCart} className="text-red-500 hover:text-red-700 text-sm font-semibold flex items-center space-x-1 bg-red-50 px-3 py-1.5 rounded-lg transition-colors">
                            <i className="fas fa-trash-alt"></i> <span>Kosongkan</span>
                        </button>
                    </div>

                    {/* Cart Items List */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-4">
                        {cart.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-3">
                                <i className="fas fa-shopping-basket text-5xl text-gray-200"></i>
                                <p className="font-medium">Belum ada pesanan</p>
                            </div>
                        ) : (
                            cart.map((item) => (
                                <div key={item.id} className="bg-white border border-gray-100 rounded-xl p-3 flex justify-between items-center shadow-sm">
                                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                                        <div className={`w-12 h-12 rounded-lg ${item.bg} ${item.text} flex items-center justify-center text-2xl flex-shrink-0`}>
                                            {item.emoji}
                                        </div>
                                        <div className="truncate pr-2">
                                            <h4 className="font-bold text-sm truncate">{item.name}</h4>
                                            <p className="text-primary font-bold text-xs">{formatRupiah(item.price)}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200 flex-shrink-0">
                                        <button onClick={() => updateQty(item.id, -1)} className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-red-500 transition-colors rounded-l-lg hover:bg-gray-200">
                                            <i className="fas fa-minus text-xs"></i>
                                        </button>
                                        <span className="w-8 text-center font-bold text-sm">{item.qty}</span>
                                        <button onClick={() => updateQty(item.id, 1)} className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-primary transition-colors rounded-r-lg hover:bg-gray-200">
                                            <i className="fas fa-plus text-xs"></i>
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Payment Section */}
                    <div className="bg-gray-50 border-t border-gray-200 p-6 flex-shrink-0">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-gray-500 font-semibold text-lg">Total Tagihan</span>
                            <span className="text-2xl font-bold text-gray-800">{formatRupiah(totalAmount)}</span>
                        </div>

                        {/* Input Cash */}
                        <div className="mb-4">
                            <label className="block text-sm font-bold text-gray-800 mb-2">Uang Bayar (Tunai)</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <span className="text-gray-500 font-bold">Rp</span>
                                </div>
                                <input 
                                    type="number" 
                                    value={cashPaid}
                                    onChange={(e) => setCashPaid(e.target.value)}
                                    placeholder="0" 
                                    className="w-full bg-white border-2 border-gray-200 rounded-xl py-3 pl-12 pr-4 text-xl font-bold text-gray-800 focus:outline-none focus:ring-0 focus:border-primary transition-all"
                                />
                            </div>
                        </div>

                        {/* Change Display */}
                        <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                            <span className="text-gray-500 font-semibold">Kembalian</span>
                            <span className={`text-xl font-bold ${
                                cart.length === 0 || !cashPaid ? 'text-gray-400' :
                                changeAmount < 0 ? 'text-red-500' : 'text-primary'
                            }`}>
                                {cart.length === 0 ? "Rp 0" :
                                 !cashPaid ? "-" :
                                 changeAmount < 0 ? "Uang Kurang" : formatRupiah(changeAmount)}
                            </span>
                        </div>

                        {/* Pay Button */}
                        <button 
                            onClick={handleProcessPayment}
                            disabled={!isPaymentValid}
                            className="w-full bg-primary hover:bg-primaryHover text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-primary/30 transition-all flex justify-center items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <i className="fas fa-check-circle"></i>
                            <span>BAYAR SEKARANG</span>
                        </button>
                    </div>
                </aside>

                {/* SUCCESS MODAL */}
                {isSuccessModalOpen && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl flex flex-col items-center text-center animate-in fade-in zoom-in duration-200">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4 border-4 border-white shadow-md">
                                <i className="fas fa-check text-4xl text-primary"></i>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">Pembayaran Berhasil!</h3>
                            <p className="text-gray-500 mb-6">Transaksi telah dicatat ke dalam sistem.</p>
                            
                            <div className="w-full bg-gray-50 rounded-xl p-4 mb-6 flex justify-between items-center border border-gray-100">
                                <span className="font-semibold text-gray-500">Kembalian:</span>
                                <span className="text-xl font-bold text-primary">{formatRupiah(lastChangeAmount)}</span>
                            </div>

                            <button onClick={handleCloseModal} className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-primaryHover transition-colors">
                                Pesanan Baru
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}