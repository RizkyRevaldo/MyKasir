import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Pengaturan({ auth, mustVerifyEmail, status }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Form State untuk Info Pengguna
    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: auth.user.name,
        email: auth.user.email,
    });

    const submitProfile = (e) => {
        e.preventDefault();
        patch('/profile');
    };

    return (
        <>
            <Head title="Pengaturan - MyKasir" />

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
                        <Link href="/laporan" className="flex items-center space-x-3 px-4 py-3 text-gray-500 hover:bg-green-50 hover:text-primary transition-all font-semibold">
                            <i className="fas fa-chart-pie w-5 text-center"></i>
                            <span>Laporan</span>
                        </Link>
                        <Link href="/profile" className="flex items-center space-x-3 px-4 py-3 bg-primary text-white  shadow-md shadow-primary/20 font-semibold">
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
                    <header className="h-20 md:h-24 bg-white border-b border-gray-100 flex items-center justify-between px-4 md:px-8 shadow-sm z-10 flex-shrink-0">
                        <div className="flex items-center space-x-3">
                            <button 
                                onClick={() => setIsSidebarOpen(true)}
                                className="md:hidden p-2 text-gray-600 hover:text-primary focus:outline-none"
                            >
                                <i className="fas fa-bars text-xl"></i>
                            </button>
                            <div>
                                <h1 className="text-lg md:text-2xl font-bold">Pengaturan Akun & Toko</h1>
                                <p className="text-xs md:text-sm text-gray-400 hidden sm:block">Kelola informasi profil dan konfigurasi aplikasi</p>
                            </div>
                        </div>
                    </header>

                    {/* CONTENT BODY */}
                    <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50 space-y-6">
                        <div className="max-w-2xl space-y-6">
                            
                            {/* FORM INFORMASI PROFIL */}
                            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                                <h3 className="text-lg font-bold text-gray-800 flex items-center space-x-2">
                                    <i className="fas fa-user-circle text-primary"></i>
                                    <span>Informasi Akun</span>
                                </h3>

                                <form onSubmit={submitProfile} className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-600 mb-1">Nama Pengguna / Admin</label>
                                        <input 
                                            type="text" 
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-primary"
                                            required
                                        />
                                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-gray-600 mb-1">Email</label>
                                        <input 
                                            type="email" 
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-primary"
                                            required
                                        />
                                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                    </div>

                                    <div className="flex items-center space-x-3 pt-2">
                                        <button 
                                            type="submit" 
                                            disabled={processing}
                                            className="bg-primary hover:bg-primaryHover text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-md shadow-primary/20 transition-all"
                                        >
                                            Simpan Perubahan
                                        </button>
                                        {recentlySuccessful && (
                                            <span className="text-xs font-bold text-primary">Tersimpan!</span>
                                        )}
                                    </div>
                                </form>
                            </div>

                            {/* INFORMASI SISTEM & DATABASE */}
                            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-3">
                                <h3 className="text-lg font-bold text-gray-800 flex items-center space-x-2">
                                    <i className="fas fa-info-circle text-amber-400"></i>
                                    <span>Informasi Aplikasi</span>
                                </h3>
                                <div className="text-xs text-gray-500 space-y-2">
                                    <div className="flex justify-between py-1 border-b border-gray-100">
                                        <span>Nama Aplikasi</span>
                                        <span className="font-bold text-gray-800">KasirKu (MyKasir)</span>
                                    </div>
                                    <div className="flex justify-between py-1 border-b border-gray-100">
                                        <span>Framework Backend</span>
                                        <span className="font-bold text-gray-800">Laravel 11 / 12</span>
                                    </div>
                                    <div className="flex justify-between py-1 border-b border-gray-100">
                                        <span>Frontend Tech</span>
                                        <span className="font-bold text-gray-800">React + Inertia.js + Tailwind CSS</span>
                                    </div>
                                    <div className="flex justify-between py-1">
                                        <span>Status Koneksi</span>
                                        <span className="font-bold text-primary">Terkoneksi (Local State/Mock)</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}