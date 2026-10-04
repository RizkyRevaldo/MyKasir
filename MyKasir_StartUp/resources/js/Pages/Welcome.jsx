import { Link, Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Welcome({ auth }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <>
            <Head title="MyKasir - Cloud POS UMKM" />

            <div className="bg-white font-sans text-bodyText antialiased">
                {/* NAVBAR */}
                <nav className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/95 backdrop-blur-md shadow-sm">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-24 items-center justify-between">
                {/* Logo Section */}
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

                            {/* Desktop Menu */}
                            <div className="hidden items-center space-x-8 md:flex">
                                <a href="#fitur" className="text-lg font-bold text-bodyText hover:text-primary transition-colors">
                                    Fitur
                                </a>
                                <a href="#harga" className="text-lg font-bold text-bodyText hover:text-primary transition-colors">
                                    Harga
                                </a>
                                <a href="#testimoni" className="text-lg font-bold text-bodyText hover:text-primary transition-colors">
                                    Testimoni
                                </a>
                            </div>

                            {/* Action Buttons (Inertia Dynamic Auth) */}
                            <div className="hidden items-center space-x-4 md:flex">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="bg-primary text-white px-6 py-3 rounded-xl font-bold text-lg hover:bg-primaryHover transition-colors shadow-md"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="px-4 py-2 text-lg font-bold text-primary hover:text-primaryHover"
                                        >
                                            Masuk
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="rounded-xl bg-primary px-6 py-3 text-lg font-bold text-white shadow-md transition-colors hover:bg-primaryHover"
                                        >
                                            Daftar Gratis
                                        </Link>
                                    </>
                                )}
                            </div>

                            {/* Mobile menu button */}
                            <div className="flex items-center md:hidden">
                                <button
                                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                    className="p-2 text-darkText hover:text-primary focus:outline-none"
                                >
                                    <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'} text-3xl`}></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Menu Dropdown */}
                    {mobileMenuOpen && (
                        <div className="border-t border-gray-100 bg-white px-4 pt-4 pb-6 md:hidden space-y-3">
                            <a href="#fitur" className="block text-lg font-bold text-bodyText hover:text-primary">Fitur</a>
                            <a href="#harga" className="block text-lg font-bold text-bodyText hover:text-primary">Harga</a>
                            <a href="#testimoni" className="block text-lg font-bold text-bodyText hover:text-primary">Testimoni</a>
                            <div className="pt-4 border-t border-gray-100 flex flex-col gap-2">
                                {auth.user ? (
                                    <Link href={route('dashboard')} className="w-full text-center bg-primary text-white py-3 rounded-xl font-bold">
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link href={route('login')} className="w-full text-center py-2 text-lg font-bold text-primary">
                                            Masuk
                                        </Link>
                                        <Link href={route('register')} className="w-full text-center bg-primary text-white py-3 rounded-xl font-bold">
                                            Daftar Gratis
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </nav>

                {/* HERO SECTION */}
                <section className="relative overflow-hidden bg-white pt-16 pb-20 lg:pt-24 lg:pb-28">
                    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
                            {/* Hero Text */}
                            <div className="z-10 text-center lg:text-left">
                                <h1 className="mb-6 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl text-darkText">
                                    MyKasir - Kelola Warung <br className="hidden lg:block" />
                                    <span className="text-primary">Jadi Lebih Untung</span>
                                </h1>
                                <p className="mx-auto mb-10 max-w-2xl text-xl leading-relaxed text-bodyText sm:text-2xl lg:mx-0">
                                    Aplikasi kasir pintar berbasis cloud. <b>Sangat mudah digunakan</b>, bahkan untuk pemula. Catat jualan, pantau stok, dan lihat untung harian langsung dari HP Anda.
                                </p>
                                <div className="flex flex-col justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
                                    <Link
                                        href={route('register')}
                                        className="btn-large flex items-center justify-center gap-3 bg-primary text-center text-white"
                                    >
                                        <i className="fas fa-rocket text-xl"></i> Coba Gratis Sekarang!
                                    </Link>
                                    <a
                                        href="#fitur"
                                        className="btn-large flex items-center justify-center gap-2 border-2 border-gray-200 bg-white text-center text-darkText hover:border-primary hover:text-primary"
                                    >
                                        <i className="fas fa-play-circle"></i> Lihat Cara Kerja
                                    </a>
                                </div>

                                <div className="mt-8 flex items-center justify-center space-x-2 text-sm font-bold text-gray-500 lg:justify-start">
                                    <i className="fas fa-check-circle text-lg text-primary"></i> <span>Tanpa Kartu Kredit</span>
                                    <span className="mx-2">•</span>
                                    <i className="fas fa-check-circle text-lg text-primary"></i> <span>Bisa Dipakai di HP & Tablet</span>
                                </div>
                            </div>

                            {/* Hero Mockup POS */}
                            <div className="relative z-10 mx-auto hidden w-full max-w-lg sm:block lg:max-w-full">
                                <div className="absolute inset-0 -translate-x-10 translate-y-10 transform rounded-full bg-primary/10 blur-3xl scale-110"></div>
                                <div className="relative flex h-[400px] flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl">
                                    {/* Mockup Header */}
                                    <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50 p-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="flex h-8 w-8 items-center justify-center rounded bg-primary text-white">
                                                <i className="fas fa-store text-sm"></i>
                                            </div>
                                            <span className="font-bold text-darkText">Unpam Store</span>
                                        </div>
                                        <div className="flex space-x-2">
                                            <div className="h-3 w-3 rounded-full bg-red-400"></div>
                                            <div className="h-3 w-3 rounded-full bg-secondary"></div>
                                            <div className="h-3 w-3 rounded-full bg-primary"></div>
                                        </div>
                                    </div>
                                    {/* Mockup Body */}
                                    <div className="flex flex-1 overflow-hidden">
                                        <div className="grid w-2/3 grid-cols-3 gap-3 overflow-y-auto bg-gray-50 p-4">
                                            <div className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-gray-100 bg-white p-3 text-center shadow-sm hover:border-primary">
                                                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                                                    <i className="fas fa-box"></i>
                                                </div>
                                                <span className="text-xs font-bold text-darkText">Beras 5kg</span>
                                                <span className="text-xs font-bold text-primary">Rp 65k</span>
                                            </div>
                                            <div className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-gray-100 bg-white p-3 text-center shadow-sm hover:border-primary">
                                                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100 text-yellow-600">
                                                    <i className="fas fa-egg"></i>
                                                </div>
                                                <span className="text-xs font-bold text-darkText">Telur 1kg</span>
                                                <span className="text-xs font-bold text-primary">Rp 28k</span>
                                            </div>
                                            <div className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-gray-100 bg-white p-3 text-center shadow-sm hover:border-primary">
                                                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
                                                    <i className="fas fa-fire"></i>
                                                </div>
                                                <span className="text-xs font-bold text-darkText">Minyak 2L</span>
                                                <span className="text-xs font-bold text-primary">Rp 32k</span>
                                            </div>
                                            <div className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-gray-100 bg-white p-3 text-center shadow-sm hover:border-primary">
                                                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                                                    <i className="fas fa-leaf"></i>
                                                </div>
                                                <span className="text-xs font-bold text-darkText">Teh Kotak</span>
                                                <span className="text-xs font-bold text-primary">Rp 5k</span>
                                            </div>
                                            <div className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-gray-100 bg-white p-3 text-center shadow-sm hover:border-primary">
                                                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                                                    <i className="fas fa-mug-hot"></i>
                                                </div>
                                                <span className="text-xs font-bold text-darkText">Kopi Hitam</span>
                                                <span className="text-xs font-bold text-primary">Rp 12k</span>
                                            </div>
                                            <div className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-primary bg-white p-3 text-center shadow-sm ring-2 ring-primary/20">
                                                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                                                    <i className="fas fa-bread-slice"></i>
                                                </div>
                                                <span className="text-xs font-bold text-darkText">Roti Tawar</span>
                                                <span className="text-xs font-bold text-primary">Rp 15k</span>
                                            </div>
                                        </div>
                                        <div className="flex w-1/3 flex-col border-l border-gray-100 bg-white">
                                            <div className="border-b border-gray-100 p-3 text-sm font-bold text-darkText">Tagihan Saat Ini</div>
                                            <div className="flex-1 space-y-3 overflow-y-auto p-3 text-sm">
                                                <div className="flex justify-between items-center"><span class="text-gray-600">Beras 5kg x1</span><span className="font-bold">65.000</span></div>
                                                <div className="flex justify-between items-center"><span class="text-gray-600">Minyak 2L x2</span><span className="font-bold">64.000</span></div>
                                                <div className="flex justify-between items-center"><span class="text-gray-600">Roti Tawar x1</span><span className="font-bold">15.000</span></div>
                                            </div>
                                            <div className="border-t border-gray-100 bg-gray-50 p-4">
                                                <div className="mb-3 flex justify-between items-center">
                                                    <span className="font-bold text-gray-600">Total:</span>
                                                    <span className="text-lg font-extrabold text-primary">Rp 144.000</span>
                                                </div>
                                                <button className="w-full rounded-lg bg-primary py-2 text-sm font-bold text-white hover:bg-primaryHover">
                                                    Bayar Sekarang
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FITUR SECTION */}
                <section id="fitur" className="bg-[#FAFAFA] py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mb-16 text-center">
                            <h2 className="mb-4 text-3xl font-extrabold sm:text-4xl text-darkText">Kenapa Memilih MyKasir?</h2>
                            <p className="mx-auto max-w-2xl text-xl text-bodyText">
                                Tiga pilar utama kami yang dirancang khusus untuk memudahkan Anda mengatur warung tanpa pusing.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
                            <div className="flex flex-col items-center rounded-3xl border border-gray-100 bg-white p-10 text-center shadow-sm transition-shadow duration-300 hover:shadow-xl">
                                <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-green-50 text-primary">
                                    <i className="fas fa-cash-register text-5xl"></i>
                                </div>
                                <h3 className="mb-4 text-2xl font-bold text-darkText">Catat Transaksi</h3>
                                <p className="text-lg leading-relaxed text-bodyText">
                                    Proses jualan cepat, tanpa ribet. Tinggal klik gambar barang atau scan barcode, otomatis terhitung total bayar dan kembaliannya.
                                </p>
                            </div>

                            <div className="relative mt-0 flex flex-col items-center rounded-3xl border border-gray-100 bg-white p-10 text-center shadow-sm transition-shadow duration-300 hover:shadow-xl md:-mt-4">
                                <div className="absolute top-0 left-1/2 h-1.5 w-1/3 -translate-x-1/2 transform rounded-b-md bg-secondary"></div>
                                <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-yellow-50 text-secondary">
                                    <i className="fas fa-boxes-stacked text-5xl"></i>
                                </div>
                                <h3 className="mb-4 text-2xl font-bold text-darkText">Kelola Stok</h3>
                                <p className="text-lg leading-relaxed text-bodyText">
                                    Pantau stok barang dagangan secara <i>real-time</i>. Sistem akan memberi notifikasi otomatis di HP jika ada barang yang hampir habis.
                                </p>
                            </div>

                            <div className="flex flex-col items-center rounded-3xl border border-gray-100 bg-white p-10 text-center shadow-sm transition-shadow duration-300 hover:shadow-xl">
                                <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-blue-50 text-blue-500">
                                    <i className="fas fa-chart-line text-5xl"></i>
                                </div>
                                <h3 className="mb-4 text-2xl font-bold text-darkText">Laporan Otomatis</h3>
                                <p className="text-lg leading-relaxed text-bodyText">
                                    Laporan harian, omzet, dan keuntungan otomatis jadi tanpa perlu dihitung manual di buku tulis. Pantau bisnis dari mana saja.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* HARGA SECTION */}
                <section id="harga" className="bg-white py-24">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mb-16 text-center">
                            <h2 className="mb-4 text-3xl font-extrabold sm:text-4xl text-darkText">Daftar Harga</h2>
                            <p className="mx-auto max-w-2xl text-xl text-bodyText">
                                Pilih paket yang paling pas dengan ukuran warung Anda. Bisa mulai dari yang gratis!
                            </p>
                        </div>

                        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 md:grid-cols-3">
                            {/* Free Tier */}
                            <div className="rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm">
                                <h3 className="mb-2 text-2xl font-bold uppercase tracking-wide text-darkText">Pemula</h3>
                                <div className="mb-2 text-5xl font-extrabold text-darkText">
                                    Rp 0<span className="text-lg font-normal text-gray-500">/bulan</span>
                                </div>
                                <p className="mb-8 font-bold text-gray-500">Sempurna untuk coba-coba</p>
                                <ul className="mb-10 space-y-4 text-left text-lg">
                                    <li className="flex items-center"><i className="fas fa-check text-primary mr-3"></i> Maks 1 Pengguna (Kasir)</li>
                                    <li className="flex items-center"><i className="fas fa-check text-primary mr-3"></i> Maks 100 Produk</li>
                                    <li className="flex items-center"><i className="fas fa-check text-primary mr-3"></i> Laporan Harian Dasar</li>
                                    <li className="flex items-center"><i className="fas fa-check text-primary mr-3"></i> Support Email</li>
                                </ul>
                                <Link
                                    href={route('register')}
                                    className="block w-full rounded-xl border-2 border-primary py-4 px-6 text-lg font-bold text-primary transition-colors hover:bg-primary hover:text-white"
                                >
                                    Daftar Gratis
                                </Link>
                            </div>

                            {/* Pro Tier */}
                            <div className="relative z-10 transform rounded-3xl border-4 border-secondary bg-white p-8 text-center shadow-2xl md:scale-105">
                                <div className="absolute top-0 right-0 rounded-bl-xl rounded-tr-xl bg-secondary px-4 py-1 text-sm font-bold uppercase tracking-wider text-darkText">
                                    Paling Laris
                                </div>
                                <h3 className="mb-2 text-2xl font-bold uppercase tracking-wide text-darkText">Warung Maju</h3>
                                <div className="mb-2 text-5xl font-extrabold text-primary">
                                    Rp 75k<span className="text-lg font-normal text-gray-500">/bulan</span>
                                </div>
                                <p className="mb-8 font-bold text-gray-500">Untuk warung yang ramai pembeli</p>
                                <ul className="mb-10 space-y-4 text-left text-lg">
                                    <li className="flex items-center"><i className="fas fa-check text-primary mr-3"></i> Hingga 5 Pengguna/Karyawan</li>
                                    <li className="flex items-center"><i className="fas fa-check text-primary mr-3"></i> Produk Tidak Terbatas</li>
                                    <li className="flex items-center"><i className="fas fa-check text-primary mr-3"></i> Laporan Lengkap & Analisa</li>
                                    <li className="flex items-center"><i className="fas fa-check text-primary mr-3"></i> Stok Management Cerdas</li>
                                    <li className="flex items-center"><i className="fas fa-check text-primary mr-3"></i> Backup Data Otomatis Cloud</li>
                                </ul>
                                <Link
                                    href={route('register')}
                                    className="block w-full rounded-xl bg-primary py-4 px-6 text-xl font-bold text-white shadow-lg transition-all hover:bg-primaryHover hover:shadow-xl"
                                >
                                    Pilih Paket Maju
                                </Link>
                            </div>

                            {/* Enterprise Tier */}
                            <div className="rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm">
                                <h3 className="mb-2 text-2xl font-bold uppercase tracking-wide text-darkText">Grosir Besar</h3>
                                <div className="mb-2 text-5xl font-extrabold text-darkText">Custom</div>
                                <p className="mb-8 font-bold text-gray-500">Solusi untuk banyak cabang</p>
                                <ul className="mb-10 space-y-4 text-left text-lg">
                                    <li className="flex items-center"><i className="fas fa-check text-primary mr-3"></i> Banyak Cabang Toko</li>
                                    <li className="flex items-center"><i className="fas fa-check text-primary mr-3"></i> Format Laporan Custom</li>
                                    <li className="flex items-center"><i className="fas fa-check text-primary mr-3"></i> Integrasi API</li>
                                    <li className="flex items-center"><i className="fas fa-check text-primary mr-3"></i> Bantuan Langsung 24/7</li>
                                </ul>
                                <a
                                    href="#"
                                    className="block w-full rounded-xl border-2 border-gray-800 py-4 px-6 text-lg font-bold text-gray-800 transition-colors hover:bg-gray-800 hover:text-white"
                                >
                                    Hubungi Kami
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* TESTIMONI SECTION */}
                <section id="testimoni" className="bg-primary/5 py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mb-16 text-center">
                            <h2 className="mb-4 text-3xl font-extrabold sm:text-4xl text-darkText">Kata Mereka yang Sudah Untung</h2>
                            <p className="mx-auto max-w-2xl text-xl text-bodyText">
                                Ratusan pemilik warung sudah membuktikan kemudahan MyKasir.
                            </p>
                        </div>

                        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
                            <div className="flex flex-col justify-between rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
                                <div>
                                    <div className="mb-4 flex text-xl text-secondary">
                                        <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>
                                    </div>
                                    <p className="mb-8 text-xl italic leading-relaxed text-bodyText">
                                        "Semenjak pakai MyKasir, saya gak pernah pusing lagi hitung uang kembalian atau kehilangan catetan utang. Laporannya juga jelas, ketahuan untung berapa hari ini!"
                                    </p>
                                </div>
                                <div className="flex items-center">
                                    <div className="mr-4 flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-gray-200">
                                        <i className="fas fa-user-circle text-6xl text-gray-400"></i>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-darkText">Ibu Hartini</h4>
                                        <p className="text-gray-500">Pemilik Warung Sembako Barokah</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col justify-between rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
                                <div>
                                    <div className="mb-4 flex text-xl text-secondary">
                                        <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>
                                    </div>
                                    <p className="mb-8 text-xl italic leading-relaxed text-bodyText">
                                        "Aplikasinya gampang banget dipelajari. Anak saya yang setingkin sistemnya dari HP dia, saya yang jaga warung tinggal pencet-pencet gambar aja pas ada yang beli. Mantap."
                                    </p>
                                </div>
                                <div className="flex items-center">
                                    <div className="mr-4 flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-gray-200">
                                        <i className="mt-2 text-5xl text-gray-400 fas fa-user-tie"></i>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-darkText">Bapak Budi</h4>
                                        <p className="text-gray-500">Toko Kelontong Laris</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FOOTER */}
                <footer className="border-t border-gray-200 bg-white pt-16 pb-8">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mb-8 flex flex-col items-center justify-between md:flex-row">
                            <div className="mb-6 flex items-baseline space-x-1 md:mb-0">
                                <span className="-mb-2 font-script text-4xl font-normal text-primary">My</span>
                                <span className="font-sans text-3xl font-extrabold text-secondary">Kasir</span>
                            </div>

                            <div className="flex space-x-6 text-lg font-bold text-gray-600">
                                <a href="#" className="hover:text-primary">Syarat & Ketentuan</a>
                                <a href="#" className="hover:text-primary">Kebijakan Privasi</a>
                                <a href="#" className="hover:text-primary">Hubungi Kami</a>
                            </div>
                        </div>

                        <div className="border-t border-gray-100 pt-8 text-center font-bold text-gray-500">
                            <p>&copy; 2026 MyKasir (Kecipak Kecipuk Pantai Anyer Group). Hak Cipta Dilindungi.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}