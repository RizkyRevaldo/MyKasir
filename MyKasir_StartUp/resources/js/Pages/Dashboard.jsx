import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';

const initialProducts = [
    { id: 1, name: "Indomie Kuah Ayam", price: 3000, image: "/images/indomie-kuah.jpg" },
    { id: 2, name: "Gula Pasir 1kg", price: 15000, image: "/images/gula.jpg" },
    { id: 3, name: "Minyak Goreng 2L", price: 32000, image: "/images/minyak.jpg" },
    { id: 4, name: "Telur Ayam 1kg", price: 28000, image: "/images/telur.jpg" },
    { id: 5, name: "Sabun Mandi Cair", price: 18000, image: "/images/sabun-cair.jpg" },
    { id: 6, name: "Beras 1 Kg", price: 12000, image: "/images/beras.jpg" },
    { id: 7, name: "Kopi Susu", price: 2500, image: "/images/kopi-susu.jpg" },
    { id: 8, name: "Indomie Goreng Spesial", price: 3500, image: "/images/IndomieGorengSpesial.jpg" },
];

export default function Dashboard({ auth }) {
    const [cart, setCart] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [cashPaid, setCashPaid] = useState('');
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [lastChangeAmount, setLastChangeAmount] = useState(0);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(number);
    };

    const filteredProducts = initialProducts.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

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

    const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    const numericCashPaid = parseFloat(cashPaid) || 0;
    const changeAmount = numericCashPaid - totalAmount;
    const isPaymentValid = cart.length > 0 && numericCashPaid >= totalAmount;

    const handleProcessPayment = () => {
        if (isPaymentValid) {
            setLastChangeAmount(changeAmount);
            setIsSuccessModalOpen(true);
            setIsCartOpen(false);
        }
    };

    const handleCloseModal = () => {
        setIsSuccessModalOpen(false);
        clearCart();
    };

    return (
        <>
            <Head title="Kasir (POS) - MyKasir" />

            <div className="bg-gray-50 font-sans text-gray-800 h-screen overflow-hidden flex flex-col md:flex-row">
                {/* OVERLAY MOBILE SIDEBAR */}
                {isSidebarOpen && (
                    <div 
                        className="fixed inset-0 bg-black/50 z-40 md:hidden"
                        onClick={() => setIsSidebarOpen(false)}
                    ></div>
                )}

                {/* LEFT SIDEBAR */}
                <aside className={`fixed md:static inset-y-0 left-0 w-64 bg-white border-r border-gray-100 flex flex-col shadow-sm z-50 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-200 flex-shrink-0`}>
                    <div className="h-20 md:h-24 flex items-center justify-between px-6 border-b border-gray-100">
                        <div className="flex flex-col justify-center">
                            <div className="flex items-baseline space-x-1">
                                <span className="font-logo text-primary text-4xl md:text-5xl tracking-tight -mb-2">My</span>
                                <span className="font-bold text-amber-400 text-2xl md:text-3xl">Kasir</span>
                            </div>
                            <span className="text-[10px] font-semibold text-gray-400 mt-1">Solusi praktis kasir Anda.</span>
                        </div>
                        <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-gray-400 hover:text-gray-600">
                            <i className="fas fa-times text-xl"></i>
                        </button>
                    </div>

                    <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
                        <Link href="/dashboard" className="flex items-center space-x-3 px-4 py-3 bg-primary text-white shadow-md shadow-primary/20 font-semibold">
                            <i className="fas fa-cash-register w-5 text-center"></i>
                            <span>Kasir (POS)</span>
                        </Link>
                        <Link href="/produk" className="flex items-center space-x-3 px-4 py-3 text-gray-500 hover:bg-green-50 hover:text-primary transition-all font-semibold">
                            <i className="fas fa-box w-5 text-center"></i>
                            <span>Produk</span>
                        </Link>
                        <Link href="/stok" className="flex items-center space-x-3 px-4 py-3 text-gray-500 hover:bg-green-50 hover:text-primary  transition-all font-semibold">
                            <i className="fas fa-boxes-stacked w-5 text-center"></i>
                            <span>Stok</span>
                        </Link>
                        <Link href="/laporan" className="flex items-center space-x-3 px-4 py-3 text-gray-500 hover:bg-green-50 hover:text-primary rounded-xl transition-all font-semibold">
                            <i className="fas fa-chart-pie w-5 text-center"></i>
                            <span>Laporan</span>
                        </Link>
                        <Link href="/profile" className="flex items-center space-x-3 px-4 py-3 text-gray-500 hover:bg-green-50 hover:text-primary transition-all font-semibold">
                            <i className="fas fa-cog w-5 text-center"></i>
                            <span>Pengaturan</span>
                        </Link>
                    </nav>

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
                            <Link href="/logout" method="post" as="button" className="text-gray-400 hover:text-red-500 p-2">
                                <i className="fas fa-sign-out-alt"></i>
                            </Link>
                        </div>
                    </div>
                </aside>

                {/* MAIN CONTENT AREA */}
                <main className="flex-1 flex flex-col h-screen overflow-hidden">
                    <header className="h-20 md:h-24 bg-white border-b border-gray-100 flex items-center justify-between px-4 md:px-8 shadow-sm z-10 flex-shrink-0 gap-2">
                        <div className="flex items-center space-x-3">
                            <button 
                                onClick={() => setIsSidebarOpen(true)}
                                className="md:hidden p-2 text-gray-600 hover:text-primary focus:outline-none"
                            >
                                <i className="fas fa-bars text-xl"></i>
                            </button>
                            <div>
                                <h1 className="text-lg md:text-2xl font-bold">Daftar Produk</h1>
                                <p className="text-xs md:text-sm text-gray-400 hidden sm:block">Pilih produk atau cari barang</p>
                            </div>
                        </div>
                        
                        <div className="relative flex-1 max-w-xs md:max-w-md">
                            <div className="absolute inset-y-0 left-0 pl-3 md:pl-4 flex items-center pointer-events-none">
                                <i className="fas fa-search text-gray-400 text-sm"></i>
                            </div>
                            <input 
                                type="text" 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Cari produk..." 
                                className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-full py-2 pl-9 pr-3 md:py-2.5 md:pl-11 md:pr-4 focus:outline-none focus:ring-2 focus:ring-primary/50 text-xs md:text-sm font-medium"
                            />
                        </div>
                    </header>

                    <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50 pb-24 md:pb-8">
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
                            {filteredProducts.map((product) => (
                                <div key={product.id} className="bg-white rounded-2xl p-3 md:p-4 shadow-sm border border-gray-100 hover:shadow-md hover:border-primary/30 transition-all flex flex-col h-full group">
                                    <div className="w-full aspect-square rounded-xl overflow-hidden mb-2 md:mb-4 bg-gray-50 flex items-center justify-center p-2 border border-gray-100">
                                        <img 
                                            src={product.image} 
                                            alt={product.name} 
                                            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-gray-800 text-xs md:text-lg leading-tight mb-1 line-clamp-2">{product.name}</h3>
                                        <p className="text-primary font-extrabold text-xs md:text-base">{formatRupiah(product.price)}</p>
                                    </div>
                                    <button 
                                        onClick={() => addToCart(product)} 
                                        className="mt-2 md:mt-4 w-full py-2 md:py-2.5 rounded-xl border-2 border-primary text-primary font-bold hover:bg-primary hover:text-white transition-colors flex justify-center items-center space-x-1 md:space-x-2 text-xs md:text-sm"
                                    >
                                        <i className="fas fa-plus text-xs"></i>
                                        <span>Tambah</span>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* BAR KASIR RINGKASAN KHUSUS MOBILE (Floating Bottom Bar) */}
                    <div className="md:hidden fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 p-3 flex justify-between items-center z-30 shadow-lg">
                        <div>
                            <p className="text-xs text-gray-500 font-semibold">{totalQty} Item Pesanan</p>
                            <p className="text-base font-bold text-primary">{formatRupiah(totalAmount)}</p>
                        </div>
                        <button 
                            onClick={() => setIsCartOpen(true)}
                            className="bg-primary text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-md shadow-primary/20 flex items-center space-x-2"
                        >
                            <i className="fas fa-shopping-basket"></i>
                            <span>Lihat Pesanan</span>
                        </button>
                    </div>
                </main>

                {/* RIGHT SIDEBAR (CART & PAYMENT) */}
                {isCartOpen && (
                    <div 
                        className="fixed inset-0 bg-black/50 z-40 md:hidden"
                        onClick={() => setIsCartOpen(false)}
                    ></div>
                )}

                <aside className={`fixed md:static inset-y-0 right-0 w-full sm:w-96 md:w-[28rem] bg-white border-l border-gray-100 flex flex-col shadow-lg md:shadow-sm z-50 transform ${isCartOpen ? 'translate-x-0' : 'translate-x-full'} md:translate-x-0 transition-transform duration-200 flex-shrink-0`}>
                    <div className="p-4 md:p-6 border-b border-gray-100 flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <button onClick={() => setIsCartOpen(false)} className="md:hidden text-gray-400 hover:text-gray-600 mr-2">
                                <i className="fas fa-arrow-left text-lg"></i>
                            </button>
                            <h2 className="text-lg md:text-xl font-bold">Detail Pesanan</h2>
                        </div>
                        <button onClick={clearCart} className="text-red-500 hover:text-red-700 text-xs md:text-sm font-semibold flex items-center space-x-1 bg-red-50 px-3 py-1.5 rounded-lg transition-colors">
                            <i className="fas fa-trash-alt"></i> <span>Kosongkan</span>
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-3 md:space-y-4">
                        {cart.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-3 py-12">
                                <i className="fas fa-shopping-basket text-4xl md:text-5xl text-gray-200"></i>
                                <p className="font-medium text-sm">Belum ada pesanan</p>
                            </div>
                        ) : (
                            cart.map((item) => (
                                <div key={item.id} className="bg-white border border-gray-100 rounded-xl p-3 flex justify-between items-center shadow-sm">
                                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                                        <img 
                                            src={item.image} 
                                            alt={item.name} 
                                            className="w-10 h-10 md:w-12 md:h-12 rounded-lg object-contain bg-gray-50 p-1 border border-gray-100 flex-shrink-0"
                                        />
                                        <div className="truncate pr-2">
                                            <h4 className="font-bold text-xs md:text-sm truncate">{item.name}</h4>
                                            <p className="text-primary font-bold text-xs">{formatRupiah(item.price)}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200 flex-shrink-0">
                                        <button onClick={() => updateQty(item.id, -1)} className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center text-gray-500 hover:text-red-500 transition-colors rounded-l-lg hover:bg-gray-200">
                                            <i className="fas fa-minus text-xs"></i>
                                        </button>
                                        <span className="w-7 md:w-8 text-center font-bold text-xs md:text-sm">{item.qty}</span>
                                        <button onClick={() => updateQty(item.id, 1)} className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center text-gray-500 hover:text-primary transition-colors rounded-r-lg hover:bg-gray-200">
                                            <i className="fas fa-plus text-xs"></i>
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="bg-gray-50 border-t border-gray-200 p-4 md:p-6 flex-shrink-0">
                        <div className="flex justify-between items-center mb-3 md:mb-4">
                            <span className="text-gray-500 font-semibold text-sm md:text-lg">Total Tagihan</span>
                            <span className="text-xl md:text-2xl font-bold text-gray-800">{formatRupiah(totalAmount)}</span>
                        </div>

                        <div className="mb-3 md:mb-4">
                            <label className="block text-xs md:text-sm font-bold text-gray-800 mb-1 md:mb-2">Uang Bayar (Tunai)</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 md:pl-4 flex items-center pointer-events-none">
                                    <span className="text-gray-500 font-bold text-sm">Rp</span>
                                </div>
                                <input 
                                    type="number" 
                                    value={cashPaid}
                                    onChange={(e) => setCashPaid(e.target.value)}
                                    placeholder="0" 
                                    className="w-full bg-white border-2 border-gray-200 rounded-xl py-2.5 pl-10 pr-3 md:py-3 md:pl-12 md:pr-4 text-lg md:text-xl font-bold text-gray-800 focus:outline-none focus:ring-0 focus:border-primary"
                                />
                            </div>
                        </div>

                        <div className="flex justify-between items-center mb-4 md:mb-6 bg-white p-3 md:p-4 rounded-xl border border-gray-100 shadow-sm">
                            <span className="text-gray-500 font-semibold text-xs md:text-base">Kembalian</span>
                            <span className={`text-base md:text-xl font-bold ${
                                cart.length === 0 || !cashPaid ? 'text-gray-400' :
                                changeAmount < 0 ? 'text-red-500' : 'text-primary'
                            }`}>
                                {cart.length === 0 ? "Rp 0" :
                                 !cashPaid ? "-" :
                                 changeAmount < 0 ? "Uang Kurang" : formatRupiah(changeAmount)}
                            </span>
                        </div>

                        <button 
                            onClick={handleProcessPayment}
                            disabled={!isPaymentValid}
                            className="w-full bg-primary hover:bg-primaryHover text-white py-3 md:py-4 rounded-xl font-bold text-base md:text-lg shadow-lg shadow-primary/30 transition-all flex justify-center items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <i className="fas fa-check-circle"></i>
                            <span>BAYAR SEKARANG</span>
                        </button>
                    </div>
                </aside>

                {/* SUCCESS MODAL */}
                {isSuccessModalOpen && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-3xl p-6 md:p-8 max-w-sm w-full shadow-2xl flex flex-col items-center text-center">
                            <div className="w-16 h-16 md:w-20 md:h-20 bg-green-100 rounded-full flex items-center justify-center mb-4 border-4 border-white shadow-md">
                                <i className="fas fa-check text-3xl md:text-4xl text-primary"></i>
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-1 md:mb-2">Pembayaran Berhasil!</h3>
                            <p className="text-xs md:text-sm text-gray-500 mb-6">Transaksi telah dicatat ke dalam sistem.</p>
                            
                            <div className="w-full bg-gray-50 rounded-xl p-3 md:p-4 mb-6 flex justify-between items-center border border-gray-100 text-sm">
                                <span className="font-semibold text-gray-500">Kembalian:</span>
                                <span className="text-lg md:text-xl font-bold text-primary">{formatRupiah(lastChangeAmount)}</span>
                            </div>

                            <button onClick={handleCloseModal} className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-primaryHover transition-colors text-sm md:text-base">
                                Pesanan Baru
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}