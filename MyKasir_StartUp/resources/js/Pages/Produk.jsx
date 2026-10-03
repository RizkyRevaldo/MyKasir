import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';

// Data produk awal (simulasi)
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

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        stock: '',
        category: 'Sembako',
        image: ''
    });

    // Format Rupiah Helper
    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(number);
    };

    // Filter Produk
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Open Modal Add / Edit
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

    // Handle Form Submit
    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingProduct) {
            // Edit Produk
            setProducts(products.map(p => 
                p.id === editingProduct.id 
                    ? { ...p, ...formData, price: Number(formData.price), stock: Number(formData.stock) }
                    : p
            ));
        } else {
            // Tambah Produk Baru
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

    // Handle Hapus Produk
    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
            setProducts(products.filter(p => p.id !== id));
        }
    };

    return (
        <>
            <Head title="Kelola Produk - MyKasir" />

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
                        <Link href="/dashboard" className="flex items-center space-x-3 px-4 py-3 text-gray-500 hover:bg-green-50 hover:text-primary transition-all font-semibold">
                            <i className="fas fa-cash-register w-5 text-center"></i>
                            <span>Kasir (POS)</span>
                        </Link>
                        <Link href="/produk" className="flex items-center space-x-3 px-4 py-3 bg-primary text-white shadow-md shadow-primary/20 font-semibold">
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
                            <Link href="/logout" method="post" as="button" className="text-gray-400 hover:text-red-500 p-2">
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
                            <h1 className="text-2xl font-bold">Kelola Produk</h1>
                            <p className="text-sm text-gray-400">Tambah, ubah, atau hapus item jualan</p>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                            {/* Search Bar */}
                            <div className="relative w-72">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <i className="fas fa-search text-gray-400"></i>
                                </div>
                                <input 
                                    type="text" 
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Cari produk..." 
                                    className="w-full bg-gray-50 border border-gray-200 text-gray-800 rounded-full py-2.5 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-medium text-sm"
                                />
                            </div>

                            {/* Tombol Tambah Produk */}
                            <button 
                                onClick={() => openModal()}
                                className="bg-primary hover:bg-primaryHover text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-md shadow-primary/20 flex items-center space-x-2 transition-all"
                            >
                                <i className="fas fa-plus"></i>
                                <span>Tambah Produk</span>
                            </button>
                        </div>
                    </header>

                    {/* Table Products List */}
                    <div className="flex-1 overflow-y-auto p-8 bg-gray-50">
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
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
                                                        className="w-12 h-12 rounded-xl object-contain bg-gray-50 p-1 border border-gray-100"
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
                        <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold text-gray-800">
                                    {editingProduct ? 'Edit Produk' : 'Tambah Produk Baru'}
                                </h3>
                                <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                                    <i className="fas fa-times text-xl"></i>
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-600 mb-1">Nama Produk</label>
                                    <input 
                                        type="text" 
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="Contoh: Kopi Sachet" 
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-primary"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-600 mb-1">Harga (Rp)</label>
                                        <input 
                                            type="number" 
                                            required
                                            value={formData.price}
                                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                            placeholder="3000" 
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-primary"
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
                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-primary"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-600 mb-1">Kategori</label>
                                    <select 
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-primary"
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
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-primary"
                                    />
                                </div>

                                <div className="pt-4 flex justify-end space-x-3">
                                    <button 
                                        type="button" 
                                        onClick={closeModal} 
                                        className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-50"
                                    >
                                        Batal
                                    </button>
                                    <button 
                                        type="submit" 
                                        className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primaryHover text-white font-bold text-sm shadow-md shadow-primary/20"
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