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
        priceSort: 'none' // none, asc, desc
    });

    // Extract unique categories and levels
    const categories = useMemo(() => ['All', ...new Set(courses.map(c => c.category))], [courses]);
    const levels = useMemo(() => ['All', ...new Set(courses.map(c => c.level))], [courses]);

    // Filter and sort courses
    const filteredCourses = useMemo(() => {
        let result = courses;

        // Search
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(c =>
                c.title.toLowerCase().includes(query) ||
                c.description.toLowerCase().includes(query)
            );
        }

        // Category Filter
        if (filters.category !== 'All') {
            result = result.filter(c => c.category === filters.category);
        }

        // Level Filter
        if (filters.level !== 'All') {
            result = result.filter(c => c.level === filters.level);
        }

        // Price Sorting
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
