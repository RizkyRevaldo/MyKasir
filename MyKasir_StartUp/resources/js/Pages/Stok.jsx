import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';

const initialStockData = [
    { id: 1, name: "Indomie Kuah Ayam", category: "Makanan", stock: 45, minStock: 10, status: "Aman", image: "/images/indomie-kuah.jpg" },
    { id: 2, name: "Gula Pasir 1kg", category: "Sembako", stock: 20, minStock: 15, status: "Aman", image: "/images/gula.jpg" },
    { id: 3, name: "Minyak Goreng 2L", category: "Sembako", stock: 5, minStock: 10, status: "Menipis", image: "/images/minyak.jpg" },
    { id: 4, name: "Telur Ayam 1kg", category: "Sembako", stock: 15, minStock: 10, status: "Aman", image: "/images/telur.jpg" },
    { id: 5, name: "Sabun Mandi Cair", category: "Kebutuhan", stock: 3, minStock: 5, status: "Menipis", image: "/images/sabun-cair.jpg" },
];

export default function Stok({ auth }) {
    const [stockList, setStockList] = useState(initialStockData);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('Semua');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [addQuantity, setAddQuantity] = useState('');

    // Filter Produk Berdasarkan Nama & Status Stok
    const filteredStock = stockList.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filterStatus === 'Semua' || 
            (filterStatus === 'Menipis' && item.stock <= item.minStock) ||
            (filterStatus === 'Aman' && item.stock > item.minStock);
        return matchesSearch && matchesFilter;
    });

    // Statistik Ringkasan
    const totalItems = stockList.length;
    const lowStockCount = stockList.filter(item => item.stock <= item.minStock).length;
    const safeStockCount = stockList.filter(item => item.stock > item.minStock).length;

    // Handle Tambah Stok Manual
    const openAddStockModal = (item) => {
        setSelectedItem(item);
        setAddQuantity('');
        setIsModalOpen(true);
    };

    const handleStockSubmit = (e) => {
        e.preventDefault();
        const qtyToAdd = parseInt(addQuantity) || 0;
        if (qtyToAdd <= 0) return;

        setStockList(prev => prev.map(item => {
            if (item.id === selectedItem.id) {
                const newStock = item.stock + qtyToAdd;
                return {
                    ...item,
                    stock: newStock,
                    status: newStock <= item.minStock ? "Menipis" : "Aman"
                };
            }
            return item;
        }));

        setIsModalOpen(false);
    };

    return (
        <>
            <Head title="Kelola Stok - MyKasir" />

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
                        <Link href="/dashboard" className="flex items-center space-x-3 px-4 py-3 text-gray-500 hover:bg-green-50 hover:text-primary transition-all font-semibold">
                            <i className="fas fa-cash-register w-5 text-center"></i>
                            <span>Kasir (POS)</span>
                        </Link>
                        <Link href="/produk" className="flex items-center space-x-3 px-4 py-3 text-gray-500 hover:bg-green-50 hover:text-primary transition-all font-semibold">
                            <i className="fas fa-box w-5 text-center"></i>
                            <span>Produk</span>
                        </Link>
                        <Link href="/stok" className="flex items-center space-x-3 px-4 py-3 bg-primary text-white  shadow-md shadow-primary/20 font-semibold">
                            <i className="fas fa-boxes-stacked w-5 text-center"></i>
                            <span>Stok</span>
                        </Link>
                        <a href="#" className="flex items-center space-x-3 px-4 py-3 text-gray-500 hover:bg-green-50 hover:text-primary  transition-all font-semibold">
                            <i className="fas fa-chart-pie w-5 text-center"></i>
                            <span>Laporan</span>
                        </a>
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
                                <h1 className="text-lg md:text-2xl font-bold">Kelola Stok Barang</h1>
                                <p className="text-xs md:text-sm text-gray-400 hidden sm:block">Pantau pasokan & tambah stok masuk</p>
                            </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 md:space-x-4">
                            <div className="relative w-36 sm:w-60 md:w-72">
                                <div className="absolute inset-y-0 left-0 pl-3 md:pl-4 flex items-center pointer-events-none">
                                    <i className="fas fa-search text-gray-400 text-xs md:text-sm"></i>
                                </div>
                                <input 
                                    type="text" 
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Cari barang..." 
                                    className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-full py-2 pl-8 pr-3 md:py-2.5 md:pl-11 md:pr-4 focus:outline-none focus:ring-2 focus:ring-primary/50 text-xs md:text-sm font-medium"
                                />
                            </div>
                        </div>
                    </header>

                    {/* CONTENT BODY */}
                    <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50 space-y-4 md:space-y-6">
                        
                        {/* CARD STATISTIK / RINGKASAN STOK */}
                        <div className="grid grid-cols-3 gap-2 md:gap-4">
                            <div className="bg-white p-3 md:p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center space-x-3">
                                <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center text-lg md:text-2xl flex-shrink-0">
                                    <i className="fas fa-boxes-stacked"></i>
                                </div>
                                <div>
                                    <p className="text-[10px] md:text-xs text-gray-400 font-bold">TOTAL ITEM</p>
                                    <p className="text-sm md:text-xl font-extrabold text-gray-800">{totalItems}</p>
                                </div>
                            </div>

                            <div className="bg-white p-3 md:p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center space-x-3">
                                <div className="w-10 h-10 md:w-12 md:h-12 bg-green-50 text-primary rounded-xl flex items-center justify-center text-lg md:text-2xl flex-shrink-0">
                                    <i className="fas fa-check-circle"></i>
                                </div>
                                <div>
                                    <p className="text-[10px] md:text-xs text-gray-400 font-bold">STOK AMAN</p>
                                    <p className="text-sm md:text-xl font-extrabold text-primary">{safeStockCount}</p>
                                </div>
                            </div>

                            <div className="bg-white p-3 md:p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center space-x-3">
                                <div className="w-10 h-10 md:w-12 md:h-12 bg-red-50 text-red-500 rounded-xl flex items-center justify-center text-lg md:text-2xl flex-shrink-0">
                                    <i className="fas fa-exclamation-triangle"></i>
                                </div>
                                <div>
                                    <p className="text-[10px] md:text-xs text-gray-400 font-bold">MENIPIS</p>
                                    <p className="text-sm md:text-xl font-extrabold text-red-500">{lowStockCount}</p>
                                </div>
                            </div>
                        </div>

                        {/* FILTER BUTTONS */}
                        <div className="flex space-x-2">
                            {['Semua', 'Aman', 'Menipis'].map((status) => (
                                <button
                                    key={status}
                                    onClick={() => setFilterStatus(status)}
                                    className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all ${
                                        filterStatus === status 
                                            ? 'bg-primary text-white shadow-md shadow-primary/20' 
                                            : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-100'
                                    }`}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>

                        {/* 1. TAMPILAN MOBILE (KARTU/CARD GRID) */}
                        <div className="block md:hidden space-y-3">
                            {filteredStock.length === 0 ? (
                                <div className="py-12 text-center text-gray-400 bg-white rounded-2xl border border-gray-100 p-6">
                                    <i className="fas fa-box-open text-3xl mb-2 block"></i>
                                    Tidak ada data stok
                                </div>
                            ) : (
                                filteredStock.map((item) => (
                                    <div key={item.id} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex items-center justify-between gap-3">
                                        <div className="flex items-center space-x-3 min-w-0">
                                            <img 
                                                src={item.image} 
                                                alt={item.name} 
                                                className="w-12 h-12 rounded-xl object-contain bg-gray-50 p-1 border border-gray-100 flex-shrink-0"
                                            />
                                            <div className="truncate">
                                                <h4 className="font-bold text-gray-800 text-sm truncate">{item.name}</h4>
                                                <p className="text-xs text-gray-400 mb-1">{item.category}</p>
                                                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                                                    item.stock <= item.minStock 
                                                        ? 'bg-red-50 text-red-500' 
                                                        : 'bg-green-50 text-primary'
                                                }`}>
                                                    Sisa: {item.stock} pcs
                                                </span>
                                            </div>
                                        </div>

                                        <button 
                                            onClick={() => openAddStockModal(item)}
                                            className="px-3 py-2 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-xl font-bold text-xs transition-colors flex items-center space-x-1 flex-shrink-0"
                                        >
                                            <i className="fas fa-plus text-xs"></i>
                                            <span>Stok</span>
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* 2. TAMPILAN DESKTOP (TABEL) */}
                        <div className="hidden md:block bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-100 text-gray-400 text-xs font-bold uppercase tracking-wider">
                                        <th className="py-4 px-6">Barang</th>
                                        <th className="py-4 px-6">Kategori</th>
                                        <th className="py-4 px-6">Sisa Stok</th>
                                        <th className="py-4 px-6">Status</th>
                                        <th className="py-4 px-6 text-center">Aksi Pasokan</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 text-sm font-medium">
                                    {filteredStock.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="py-12 text-center text-gray-400">
                                                <i className="fas fa-box-open text-4xl mb-3 block"></i>
                                                Tidak ada data stok
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredStock.map((item) => (
                                            <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                                                <td className="py-4 px-6 flex items-center space-x-3">
                                                    <img 
                                                        src={item.image} 
                                                        alt={item.name} 
                                                        className="w-12 h-12 rounded-xl object-contain bg-gray-50 p-1 border border-gray-100 flex-shrink-0"
                                                    />
                                                    <span className="font-bold text-gray-800">{item.name}</span>
                                                </td>
                                                <td className="py-4 px-6 text-gray-500">{item.category}</td>
                                                <td className="py-4 px-6 font-bold text-gray-800">{item.stock} pcs</td>
                                                <td className="py-4 px-6">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                                        item.stock <= item.minStock 
                                                            ? 'bg-red-50 text-red-500 border border-red-100' 
                                                            : 'bg-green-50 text-primary border border-green-100'
                                                    }`}>
                                                        {item.stock <= item.minStock ? 'Menipis' : 'Aman'}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6 text-center">
                                                    <button 
                                                        onClick={() => openAddStockModal(item)}
                                                        className="px-4 py-2 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-xl font-bold text-xs transition-colors space-x-1"
                                                    >
                                                        <i className="fas fa-plus"></i>
                                                        <span>Tambah Pasokan</span>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>

                {/* MODAL TAMBAH PASOKAN STOK */}
                {isModalOpen && selectedItem && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-3xl p-6 md:p-8 max-w-sm w-full shadow-2xl">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-bold text-gray-800">Tambah Pasokan</h3>
                                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                                    <i className="fas fa-times text-lg"></i>
                                </button>
                            </div>

                            <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100 flex items-center space-x-3 mb-4">
                                <img src={selectedItem.image} alt={selectedItem.name} className="w-12 h-12 object-contain rounded-lg bg-white p-1 border" />
                                <div>
                                    <h4 className="font-bold text-sm text-gray-800">{selectedItem.name}</h4>
                                    <p className="text-xs text-gray-400">Stok saat ini: <b className="text-gray-700">{selectedItem.stock} pcs</b></p>
                                </div>
                            </div>

                            <form onSubmit={handleStockSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-600 mb-1">Jumlah Masuk (pcs)</label>
                                    <input 
                                        type="number" 
                                        required
                                        min="1"
                                        value={addQuantity}
                                        onChange={(e) => setAddQuantity(e.target.value)}
                                        placeholder="Misal: 20" 
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm font-bold text-gray-800 focus:outline-none focus:border-primary"
                                    />
                                </div>

                                <div className="pt-2 flex justify-end space-x-2">
                                    <button 
                                        type="button" 
                                        onClick={() => setIsModalOpen(false)} 
                                        className="px-4 py-2 rounded-xl border border-gray-200 text-gray-600 font-bold text-xs"
                                    >
                                        Batal
                                    </button>
                                    <button 
                                        type="submit" 
                                        className="px-4 py-2 rounded-xl bg-primary text-white font-bold text-xs shadow-md shadow-primary/20 hover:bg-primaryHover"
                                    >
                                        Simpan Stok
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}