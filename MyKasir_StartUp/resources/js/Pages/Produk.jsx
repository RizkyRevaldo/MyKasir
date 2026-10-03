import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';

const initialProducts = [
    { id: 1, name: "Indomie Kuah Ayam", price: 3000, stock: 45, category: "Makanan", image: "/images/indomie-kuah.jpg" },
    { id: 2, name: "Gula Pasir 1kg", price: 15000, stock: 20, category: "Sembako", image: "/images/gula.jpg" },
    { id: 3, name: "Minyak Goreng 2L", price: 32000, stock: 12, category: "Sembako", image: "/images/minyak.jpg" },
    { id: 4, name: "Telur Ayam 1kg", price: 28000, stock: 15, category: "Sembako", image: "/images/telur.jpg" },
    { id: 5, name: "Sabun Mandi Cair", price: 18000, stock: 8, category: "Kebutuhan", image: "/images/sabun-cair.jpg" },
];

export default function Produk({ auth }) {
    const [products, setProducts] = useState(initialProducts);
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        stock: '',
        category: 'Sembako',
        image: ''
    });

    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(number);
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const openModal = (product = null) => {
        if (product) {
            setEditingProduct(product);
            setFormData({
                name: product.name,
                price: product.price,
                stock: product.stock,
                category: product.category,
                image: product.image
            });
        } else {
            setEditingProduct(null);
            setFormData({ name: '', price: '', stock: '', category: 'Sembako', image: '/images/indomie-kuah.jpg' });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingProduct(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingProduct) {
            setProducts(products.map(p => 
                p.id === editingProduct.id 
                    ? { ...p, ...formData, price: Number(formData.price), stock: Number(formData.stock) }
                    : p
            ));
        } else {
            const newProduct = {
                id: Date.now(),
                ...formData,
                price: Number(formData.price),
                stock: Number(formData.stock)
            };
            setProducts([...products, newProduct]);
        }
        closeModal();
    };

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
            setProducts(products.filter(p => p.id !== id));
        }
    };

    return (
        <>
            <Head title="Kelola Produk - MyKasir" />

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
                        <Link href="/produk" className="flex items-center space-x-3 px-4 py-3 bg-primary text-white  shadow-md shadow-primary/20 font-semibold">
                            <i className="fas fa-box w-5 text-center"></i>
                            <span>Produk</span>
                        </Link>
                        <a href="#" className="flex items-center space-x-3 px-4 py-3 text-gray-500 hover:bg-green-50 hover:text-primary transition-all font-semibold">
                            <i className="fas fa-boxes-stacked w-5 text-center"></i>
                            <span>Stok</span>
                        </a>
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
                                <h1 className="text-lg md:text-2xl font-bold">Kelola Produk</h1>
                                <p className="text-xs md:text-sm text-gray-400 hidden sm:block">Total {filteredProducts.length} Produk Tersedia</p>
                            </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 md:space-x-4">
                            <div className="relative w-32 sm:w-60 md:w-72">
                                <div className="absolute inset-y-0 left-0 pl-3 md:pl-4 flex items-center pointer-events-none">
                                    <i className="fas fa-search text-gray-400 text-xs md:text-sm"></i>
                                </div>
                                <input 
                                    type="text" 
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Cari..." 
                                    className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-full py-2 pl-8 pr-3 md:py-2.5 md:pl-11 md:pr-4 focus:outline-none focus:ring-2 focus:ring-primary/50 text-xs md:text-sm font-medium"
                                />
                            </div>

                            <button 
                                onClick={() => openModal()}
                                className="bg-primary hover:bg-primaryHover text-white px-3 py-2 md:px-5 md:py-2.5 rounded-xl font-bold text-xs md:text-sm shadow-md shadow-primary/20 flex items-center space-x-1 md:space-x-2 transition-all flex-shrink-0"
                            >
                                <i className="fas fa-plus text-xs"></i>
                                <span className="hidden sm:inline">Tambah Produk</span>
                                <span className="sm:hidden">Tambah</span>
                            </button>
                        </div>
                    </header>

                    {/* CONTENT AREA: MOBILE CARDS & DESKTOP TABLE */}
                    <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50">
                        {/* 1. TAMPILAN MOBILE (KARTU/CARD GRID) */}
                        <div className="block md:hidden space-y-3">
                            {filteredProducts.length === 0 ? (
                                <div className="py-12 text-center text-gray-400 bg-white rounded-2xl border border-gray-100 p-6">
                                    <i className="fas fa-box-open text-3xl mb-2 block"></i>
                                    Produk tidak ditemukan
                                </div>
                            ) : (
                                filteredProducts.map((product) => (
                                    <div key={product.id} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex items-center justify-between gap-3">
                                        <div className="flex items-center space-x-3 min-w-0">
                                            <img 
                                                src={product.image} 
                                                alt={product.name} 
                                                className="w-14 h-14 rounded-xl object-contain bg-gray-50 p-1 border border-gray-100 flex-shrink-0"
                                            />
                                            <div className="truncate">
                                                <h4 className="font-bold text-gray-800 text-sm truncate">{product.name}</h4>
                                                <div className="flex items-center space-x-2 mt-1">
                                                    <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md text-[10px] font-bold">
                                                        {product.category}
                                                    </span>
                                                    <span className={`text-xs font-bold ${product.stock <= 10 ? 'text-red-500' : 'text-gray-500'}`}>
                                                        Stok: {product.stock}
                                                    </span>
                                                </div>
                                                <p className="text-primary font-extrabold text-sm mt-1">{formatRupiah(product.price)}</p>
                                            </div>
                                        </div>

                                        <div className="flex flex-col space-y-1 flex-shrink-0">
                                            <button 
                                                onClick={() => openModal(product)} 
                                                className="p-2 text-blue-500 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-xs"
                                            >
                                                <i className="fas fa-edit"></i>
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(product.id)} 
                                                className="p-2 text-red-500 bg-red-50 hover:bg-red-100 rounded-lg transition-colors text-xs"
                                            >
                                                <i className="fas fa-trash-alt"></i>
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* 2. TAMPILAN DESKTOP (TABEL RAPI) */}
                        <div className="hidden md:block bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-100 text-gray-400 text-xs font-bold uppercase tracking-wider">
                                        <th className="py-4 px-6">Produk</th>
                                        <th className="py-4 px-6">Kategori</th>
                                        <th className="py-4 px-6">Harga</th>
                                        <th className="py-4 px-6">Stok</th>
                                        <th className="py-4 px-6 text-center">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 text-sm font-medium">
                                    {filteredProducts.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="py-12 text-center text-gray-400">
                                                <i className="fas fa-box-open text-4xl mb-3 block"></i>
                                                Produk tidak ditemukan
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredProducts.map((product) => (
                                            <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                                                <td className="py-4 px-6 flex items-center space-x-3">
                                                    <img 
                                                        src={product.image} 
                                                        alt={product.name} 
                                                        className="w-12 h-12 rounded-xl object-contain bg-gray-50 p-1 border border-gray-100 flex-shrink-0"
                                                    />
                                                    <span className="font-bold text-gray-800">{product.name}</span>
                                                </td>
                                                <td className="py-4 px-6 text-gray-500">
                                                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold">
                                                        {product.category}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6 font-bold text-primary">
                                                    {formatRupiah(product.price)}
                                                </td>
                                                <td className="py-4 px-6">
                                                    <span className={`font-bold ${product.stock <= 10 ? 'text-red-500' : 'text-gray-700'}`}>
                                                        {product.stock} pcs
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6 text-center">
                                                    <div className="flex items-center justify-center space-x-2">
                                                        <button 
                                                            onClick={() => openModal(product)} 
                                                            className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                                                        >
                                                            <i className="fas fa-edit"></i>
                                                        </button>
                                                        <button 
                                                            onClick={() => handleDelete(product.id)} 
                                                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                        >
                                                            <i className="fas fa-trash-alt"></i>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>

                {/* MODAL FORM TAMBAH / EDIT PRODUK */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl">
                            <div className="flex justify-between items-center mb-4 md:mb-6">
                                <h3 className="text-lg md:text-xl font-bold text-gray-800">
                                    {editingProduct ? 'Edit Produk' : 'Tambah Produk Baru'}
                                </h3>
                                <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                                    <i className="fas fa-times text-lg"></i>
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-600 mb-1">Nama Produk</label>
                                    <input 
                                        type="text" 
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="Contoh: Kopi Sachet" 
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs md:text-sm font-medium focus:outline-none focus:border-primary"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-3 md:gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-600 mb-1">Harga (Rp)</label>
                                        <input 
                                            type="number" 
                                            required
                                            value={formData.price}
                                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                            placeholder="3000" 
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs md:text-sm font-medium focus:outline-none focus:border-primary"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-600 mb-1">Stok</label>
                                        <input 
                                            type="number" 
                                            required
                                            value={formData.stock}
                                            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                            placeholder="50" 
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs md:text-sm font-medium focus:outline-none focus:border-primary"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-600 mb-1">Kategori</label>
                                    <select 
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs md:text-sm font-medium focus:outline-none focus:border-primary"
                                    >
                                        <option value="Sembako">Sembako</option>
                                        <option value="Makanan">Makanan</option>
                                        <option value="Minuman">Minuman</option>
                                        <option value="Kebutuhan">Kebutuhan</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-600 mb-1">Path Gambar</label>
                                    <input 
                                        type="text" 
                                        value={formData.image}
                                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                        placeholder="/images/nama-file.jpg" 
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs md:text-sm font-medium focus:outline-none focus:border-primary"
                                    />
                                </div>

                                <div className="pt-3 md:pt-4 flex justify-end space-x-2 md:space-x-3">
                                    <button 
                                        type="button" 
                                        onClick={closeModal} 
                                        className="px-4 py-2 rounded-xl border border-gray-200 text-gray-600 font-bold text-xs md:text-sm hover:bg-gray-50"
                                    >
                                        Batal
                                    </button>
                                    <button 
                                        type="submit" 
                                        className="px-4 py-2 rounded-xl bg-primary hover:bg-primaryHover text-white font-bold text-xs md:text-sm shadow-md shadow-primary/20"
                                    >
                                        Simpan
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