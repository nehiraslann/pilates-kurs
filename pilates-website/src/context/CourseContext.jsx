import { createContext, useContext, useState, useMemo } from 'react';
import coursesData from '../data/courses.json';

const CourseContext = createContext();

export const useCourses = () => useContext(CourseContext);

export const CourseProvider = ({ children }) => {
    const [courses] = useState(coursesData);
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({
        category: 'All',
        level: 'All',
        priceSort: 'none' // varsayılan, artan, azalan
    });

    // Benzersiz kategorileri ve seviyeleri çıkar
    const categories = useMemo(() => ['All', ...new Set(courses.map(c => c.category))], [courses]);
    const levels = useMemo(() => ['All', ...new Set(courses.map(c => c.level))], [courses]);

    // Kursları filtrele ve sırala
    const filteredCourses = useMemo(() => {
        let result = courses;

        // Arama
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(c =>
                c.title.toLowerCase().includes(query) ||
                c.description.toLowerCase().includes(query)
            );
        }

        // Kategori filtresi
        if (filters.category !== 'All') {
            result = result.filter(c => c.category === filters.category);
        }

        // Seviye filtresi
        if (filters.level !== 'All') {
            result = result.filter(c => c.level === filters.level);
        }

        // Fiyat sıralaması
        if (filters.priceSort === 'asc') {
            result = [...result].sort((a, b) => a.price - b.price);
        } else if (filters.priceSort === 'desc') {
            result = [...result].sort((a, b) => b.price - a.price);
        }

        return result;
    }, [courses, searchQuery, filters]);

    const value = {
        courses,
        filteredCourses,
        categories,
        levels,
        searchQuery,
        setSearchQuery,
        filters,
        setFilters,
        getCourseById: (id) => courses.find(c => c.id === Number(id))
    };

    return (
        <CourseContext.Provider value={value}>
            {children}
        </CourseContext.Provider>
    );
};
