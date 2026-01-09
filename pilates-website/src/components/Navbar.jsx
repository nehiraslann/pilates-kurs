import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCourses } from '../context/CourseContext';
import { Button } from './ui/Components';

export default function Navbar() {
    const { user, logout } = useAuth();
    const { searchQuery, setSearchQuery } = useCourses();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        navigate('/courses');
    };

    return (
        <nav className="bg-[#fdfbf7] shadow-sm sticky top-0 z-50 border-b border-[#e6dccf]">
            <div className="w-full px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <Link to="/" className="flex-shrink-0 flex items-center">
                            <span className="text-2xl font-bold text-[#d48c94]">River Pilates</span>
                        </Link>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <Link to="/" className="border-transparent text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                                Ana Sayfa
                            </Link>
                            <Link to="/courses" className="border-transparent text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                                Kurslar
                            </Link>
                        </div>
                    </div>

                    <div className="hidden sm:flex items-center space-x-4">
                        <form onSubmit={handleSearch} className="relative">
                            <input
                                type="text"
                                placeholder="Kurs ara..."
                                className="w-64 pl-4 pr-4 py-2 border border-[#e6dccf] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d48c94] focus:border-transparent bg-[#faf7f2]"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </form>

                        {user ? (
                            <div className="flex items-center space-x-4">
                                <Link to="/my-courses" className="text-gray-500 hover:text-gray-900">Kurslarım</Link>
                                <Link to="/favorites" className="text-gray-500 hover:text-gray-900">Favoriler</Link>
                                <Link to="/profile" className="text-gray-500 hover:text-gray-900">Profilim</Link>
                                <div className="relative group">
                                    <button className="flex items-center space-x-2 focus:outline-none">
                                        <img className="h-8 w-8 rounded-full" src={user.avatar} alt={user.name} />
                                    </button>
                                    <div className="absolute right-0 w-48 mt-2 py-1 bg-white rounded-md shadow-lg hidden group-hover:block border border-gray-100">
                                        <div className="px-4 py-2 border-b">
                                            <p className="text-sm font-medium text-gray-900">{user.name}</p>
                                            <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                        </div>
                                        <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profil</Link>
                                        <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Çıkış Yap</button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <Button onClick={() => window.alert('Mock Login triggered! User set in AuthContext.')}>Giriş Yap</Button>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="sm:hidden flex items-center">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#d48c94]"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="sm:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 bg-[#fdfbf7] border-t border-[#e6dccf]">
                        <Link to="/" className="block px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50">Ana Sayfa</Link>
                        <Link to="/courses" className="block px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50">Kurslar</Link>
                        
                        <form onSubmit={handleSearch} className="px-3 py-2">
                            <input
                                type="text"
                                placeholder="Kurs ara..."
                                className="w-full pl-4 pr-4 py-2 border border-[#e6dccf] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d48c94] focus:border-transparent bg-[#faf7f2]"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </form>

                        {user ? (
                            <div className="px-3 py-2 space-y-1">
                                <Link to="/my-courses" className="block px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50">Kurslarım</Link>
                                <Link to="/favorites" className="block px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50">Favoriler</Link>
                                <Link to="/profile" className="block px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50">Profilim</Link>
                                <div className="px-3 py-2">
                                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                </div>
                                <button onClick={logout} className="block w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:bg-gray-50">Çıkış Yap</button>
                            </div>
                        ) : (
                            <div className="px-3 py-2">
                                <Button onClick={() => window.alert('Mock Login triggered! User set in AuthContext.')} className="w-full">Giriş Yap</Button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
