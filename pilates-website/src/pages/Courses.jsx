import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useCourses } from '../context/CourseContext';
import CourseCard from '../components/course/CourseCard';
import FilterPanel from '../components/ui/FilterPanel';
import { Button } from '../components/ui/Components';

export default function Courses() {
    const { filteredCourses, setFilters, filters } = useCourses();
    const [searchParams] = useSearchParams();
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

    // Sync URL params with filters on mount
    useEffect(() => {
        const categoryParam = searchParams.get('category');
        if (categoryParam) {
            setFilters(prev => ({ ...prev, category: categoryParam }));
        }
    }, [searchParams, setFilters]);

    return (
        <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-[#4a4036]">Tüm Kurslar</h1>
                <button
                    className="md:hidden p-2 text-[#8c8077] hover:text-[#d48c94]"
                    onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                </button>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar Filters */}
                <aside className={`md:w-64 flex-shrink-0 ${isMobileFiltersOpen ? 'block' : 'hidden md:block'}`}>
                    <div className="bg-[#fdfbf7] p-6 rounded-lg shadow-sm border border-[#e6dccf] sticky top-24">
                        <FilterPanel />
                    </div>
                </aside>

                {/* Main Content */}
                <div className="flex-grow">
                    <div className="bg-[#fdfbf7] p-4 rounded-lg shadow-sm border border-[#e6dccf] mb-6 flex items-center justify-between">
                        <span className="text-[#5c504a] font-medium">{filteredCourses.length} kurs bulundu</span>
                        {/* Additional header controls can go here */}
                    </div>

                    {filteredCourses.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredCourses.map(course => (
                                <CourseCard key={course.id} course={course} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-[#fdfbf7] rounded-lg border border-[#e6dccf] border-dashed">
                            <svg className="mx-auto h-12 w-12 text-[#b0a69e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h3 className="mt-2 text-sm font-medium text-gray-900">Sonuç Bulunamadı</h3>
                            <p className="mt-1 text-sm text-gray-500">Arama kriterlerinize uygun kurs bulunmamaktadır.</p>
                            <div className="mt-6">
                                <Button onClick={() => setFilters({ category: 'All', level: 'All', priceSort: 'none' })} variant="secondary">
                                    Filtreleri Temizle
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
