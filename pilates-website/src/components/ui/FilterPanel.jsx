import { useCourses } from '../../context/CourseContext';

export default function FilterPanel({ className }) {
    const { categories, levels, filters, setFilters } = useCourses();

    const handleCreateFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className={`space-y-8 ${className}`}>
            {/* Kategori filtresi */}
            <div>
                <h3 className="text-sm font-medium text-gray-900 tracking-wide uppercase mb-3">Kategori</h3>
                <div className="space-y-2">
                    {categories.map((category) => (
                        <label key={category} className="flex items-center cursor-pointer group">
                            <input
                                type="radio"
                                name="category"
                                value={category}
                                checked={filters.category === category}
                                onChange={() => handleCreateFilterChange('category', category)}
                                className="h-4 w-4 text-[#d48c94] focus:ring-[#d48c94] border-[#e6dccf]"
                            />
                            <span className={`ml-3 text-sm group-hover:text-[#d48c94] transition-colors ${filters.category === category ? 'text-[#d48c94] font-medium' : 'text-[#8c8077]'}`}>
                                {category}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Seviye filtresi */}
            <div className="pt-6 border-t border-gray-100">
                <h3 className="text-sm font-medium text-gray-900 tracking-wide uppercase mb-3">Seviye</h3>
                <div className="space-y-2">
                    {levels.map((level) => (
                        <label key={level} className="flex items-center cursor-pointer group">
                            <input
                                type="radio"
                                name="level"
                                value={level}
                                checked={filters.level === level}
                                onChange={() => handleCreateFilterChange('level', level)}
                                className="h-4 w-4 text-[#d48c94] focus:ring-[#d48c94] border-[#e6dccf]"
                            />
                            <span className={`ml-3 text-sm group-hover:text-[#d48c94] transition-colors ${filters.level === level ? 'text-[#d48c94] font-medium' : 'text-[#8c8077]'}`}>
                                {level}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Sıralama seçenekleri */}
            <div className="pt-6 border-t border-gray-100">
                <h3 className="text-sm font-medium text-gray-900 tracking-wide uppercase mb-3">Sıralama</h3>
                <select
                    value={filters.priceSort}
                    onChange={(e) => handleCreateFilterChange('priceSort', e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                    <option value="none">Varsayılan</option>
                    <option value="asc">Fiyat: Artan</option>
                    <option value="desc">Fiyat: Azalan</option>
                </select>
            </div>

            {/* Filtreleri sıfırla */}
            <div className="pt-6">
                <button
                    onClick={() => setFilters({ category: 'All', level: 'All', priceSort: 'none' })}
                    className="text-sm text-[#d48c94] hover:text-[#c07b83] font-medium"
                >
                    Filtreleri Temizle
                </button>
            </div>
        </div>
    );
}
