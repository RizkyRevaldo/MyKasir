import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';

// Data Mock Ringkasan & Riwayat Transaksi
const summaryData = {
    totalRevenue: 2450000,
    totalTransactions: 38,
    totalItemsSold: 112,
    popularProduct: "Indomie Kuah Ayam"
};

const topProducts = [
    { id: 1, name: "Indomie Kuah Ayam", sold: 42, revenue: 126000, image: "/images/indomie-kuah.jpg" },
    { id: 2, name: "Minyak Goreng 2L", sold: 18, revenue: 576000, image: "/images/minyak.jpg" },
    { id: 3, name: "Gula Pasir 1kg", sold: 15, revenue: 225000, image: "/images/gula.jpg" },
    { id: 4, name: "Telur Ayam 1kg", sold: 12, revenue: 336000, image: "/images/telur.jpg" },
];

const transactionHistory = [
    { id: "TRX-1004", time: "10:45 AM", itemsCount: 3, total: 45000, paymentMethod: "Tunai", cashier: "Admin Kasir" },
    { id: "TRX-1003", time: "10:12 AM", itemsCount: 1, total: 32000, paymentMethod: "Tunai", cashier: "Admin Kasir" },
    { id: "TRX-1002", time: "09:30 AM", itemsCount: 5, total: 88000, paymentMethod: "Tunai", cashier: "Admin Kasir" },
    { id: "TRX-1001", time: "08:15 AM", itemsCount: 2, total: 18000, paymentMethod: "Tunai", cashier: "Admin Kasir" },
];

export default function Laporan({ auth }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [filterPeriod, setFilterPeriod] = useState('Hari Ini');

    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(number);
    };

    return (
        <>
            <Head title="Laporan Penjualan - MyKasir" />

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
                   <div className="h-20 md:h-24 flex items-center justify-between px-4 border-b border-gray-100">
                        <Link href="/dashboard" className="flex items-center">
                        <img 
                            src="/images/mykasir.png" 
                            alt="MyKasir Logo" 
                            className="h-12 md:h-14 w-auto object-contain"
                        />
                        </Link>
                        <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-gray-400 hover:text-gray-600">
                            <i className="fas fa-times text-xl"></i>
                        </button>
                    </div>

                    <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
                        <Link href="/dashboard" className="flex items-center space-x-3 px-4 py-3 text-gray-500 hover:bg-green-50 hover:text-primary  transition-all font-semibold">
                            <i className="fas fa-cash-register w-5 text-center"></i>
                            <span>Kasir (POS)</span>
                        </Link>
                        <Link href="/produk" className="flex items-center space-x-3 px-4 py-3 text-gray-500 hover:bg-green-50 hover:text-primary transition-all font-semibold">
                            <i className="fas fa-box w-5 text-center"></i>
                            <span>Produk</span>
                        </Link>
                        <Link href="/stok" className="flex items-center space-x-3 px-4 py-3 text-gray-500 hover:bg-green-50 hover:text-primary transition-all font-semibold">
                            <i className="fas fa-boxes-stacked w-5 text-center"></i>
                            <span>Stok</span>
                        </Link>
                        <Link href="/laporan" className="flex items-center space-x-3 px-4 py-3 bg-primary text-white  shadow-md shadow-primary/20 font-semibold">
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
                                <h1 className="text-lg md:text-2xl font-bold">Laporan Penjualan</h1>
                                <p className="text-xs md:text-sm text-gray-400 hidden sm:block">Ringkasan pendapatan & performa toko</p>
                            </div>
                        </div>

                        {/* Periode Filter Dropdown */}
                        <div className="flex items-center space-x-2">
                            <select 
                                value={filterPeriod}
                                onChange={(e) => setFilterPeriod(e.target.value)}
                                className="bg-gray-50 border border-gray-200 text-gray-800 rounded-xl px-3 py-2 text-xs md:text-sm font-bold focus:outline-none focus:border-primary"
                            >
                                <option value="Hari Ini">Hari Ini</option>
                                <option value="Minggu Ini">Minggu Ini</option>
                                <option value="Bulan Ini">Bulan Ini</option>
                            </select>
                        </div>
                    </header>

                    {/* CONTENT BODY */}
                    <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50 space-y-6">
                        
                        {/* 4 CARDS SUMMARY */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
                            <div className="bg-white p-4 md:p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center space-x-3">
                                <div className="w-10 h-10 md:w-12 md:h-12 bg-green-50 text-primary rounded-xl flex items-center justify-center text-lg md:text-2xl flex-shrink-0">
                                    <i className="fas fa-wallet"></i>
                                </div>
                                <div className="truncate">
                                    <p className="text-[10px] md:text-xs text-gray-400 font-bold uppercase">Omset Penjualan</p>
                                    <p className="text-sm md:text-lg font-extrabold text-primary truncate">{formatRupiah(summaryData.totalRevenue)}</p>
                                </div>
                            </div>

                            <div className="bg-white p-4 md:p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center space-x-3">
                                <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center text-lg md:text-2xl flex-shrink-0">
                                    <i className="fas fa-receipt"></i>
                                </div>
                                <div>
                                    <p className="text-[10px] md:text-xs text-gray-400 font-bold uppercase">Total Transaksi</p>
                                    <p className="text-sm md:text-lg font-extrabold text-gray-800">{summaryData.totalTransactions} Nota</p>
                                </div>
                            </div>

                            <div className="bg-white p-4 md:p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center space-x-3">
                                <div className="w-10 h-10 md:w-12 md:h-12 bg-amber-50 text-amber-500 rounded-xl flex items-center justify-center text-lg md:text-2xl flex-shrink-0">
                                    <i className="fas fa-shopping-bag"></i>
                                </div>
                                <div>
                                    <p className="text-[10px] md:text-xs text-gray-400 font-bold uppercase">Produk Terjual</p>
                                    <p className="text-sm md:text-lg font-extrabold text-gray-800">{summaryData.totalItemsSold} pcs</p>
                                </div>
                            </div>

                            <div className="bg-white p-4 md:p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center space-x-3">
                                <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-50 text-purple-500 rounded-xl flex items-center justify-center text-lg md:text-2xl flex-shrink-0">
                                    <i className="fas fa-fire"></i>
                                </div>
                                <div className="truncate">
                                    <p className="text-[10px] md:text-xs text-gray-400 font-bold uppercase">Terlaris</p>
                                    <p className="text-xs md:text-sm font-bold text-gray-800 truncate">{summaryData.popularProduct}</p>
                                </div>
                            </div>
                        </div>

                        {/* SECTION GRID: TOP PRODUCTS & TRANSACTION HISTORY */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            
                            {/* TOP SELLING PRODUCTS */}
                            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                                <h3 className="font-bold text-base md:text-lg text-gray-800 flex items-center space-x-2">
                                    <i className="fas fa-trophy text-amber-400"></i>
                                    <span>Produk Terlaris</span>
                                </h3>

                                <div className="space-y-3">
                                    {topProducts.map((item, index) => (
                                        <div key={item.id} className="flex items-center justify-between p-2 rounded-xl bg-gray-50 border border-gray-100">
                                            <div className="flex items-center space-x-3 truncate">
                                                <span className="font-bold text-xs text-gray-400 w-4 text-center">#{index + 1}</span>
                                                <img src={item.image} alt={item.name} className="w-10 h-10 object-contain rounded-lg bg-white p-1 border" />
                                                <div className="truncate">
                                                    <p className="font-bold text-xs md:text-sm text-gray-800 truncate">{item.name}</p>
                                                    <p className="text-[10px] text-gray-400">{item.sold} pcs terjual</p>
                                                </div>
                                            </div>
                                            <span className="font-bold text-xs md:text-sm text-primary flex-shrink-0">{formatRupiah(item.revenue)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* RECENT TRANSACTIONS TABLE */}
                            <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                                <div className="flex justify-between items-center">
                                    <h3 className="font-bold text-base md:text-lg text-gray-800 flex items-center space-x-2">
                                        <i className="fas fa-history text-primary"></i>
                                        <span>Riwayat Transaksi Terakhir</span>
                                    </h3>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse min-w-[500px]">
                                        <thead>
                                            <tr className="bg-gray-50 border-b border-gray-100 text-gray-400 text-xs font-bold uppercase">
                                                <th className="py-3 px-4">No. Transaksi</th>
                                                <th className="py-3 px-4">Waktu</th>
                                                <th className="py-3 px-4">Item</th>
                                                <th className="py-3 px-4">Total</th>
                                                <th className="py-3 px-4 text-center">Metode</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100 text-xs md:text-sm font-medium">
                                            {transactionHistory.map((trx) => (
                                                <tr key={trx.id} className="hover:bg-gray-50/50 transition-colors">
                                                    <td className="py-3 px-4 font-bold text-gray-800">{trx.id}</td>
                                                    <td className="py-3 px-4 text-gray-400">{trx.time}</td>
                                                    <td className="py-3 px-4 text-gray-600">{trx.itemsCount} Barang</td>
                                                    <td className="py-3 px-4 font-bold text-primary">{formatRupiah(trx.total)}</td>
                                                    <td className="py-3 px-4 text-center">
                                                        <span className="bg-green-50 text-primary px-2.5 py-1 rounded-full text-[10px] font-bold">
                                                            {trx.paymentMethod}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}