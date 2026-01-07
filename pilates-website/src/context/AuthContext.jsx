import { createContext, useContext, useState, useEffect } from 'react';
import initialUserData from '../data/user.json';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    // Initialize user from local storage or mock data
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('rumeli_user');
        return savedUser ? JSON.parse(savedUser) : initialUserData;
    });

    // Persist user to local storage whenever it changes
    useEffect(() => {
        localStorage.setItem('rumeli_user', JSON.stringify(user));
    }, [user]);

    const login = (userData) => {
        // In a real app, this would verify credentials
        // Here we just merge with existing structure or reset
        setUser({ ...initialUserData, ...userData });
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('rumeli_user');
    };

    const updateUserProfile = (updatedData) => {
        setUser(prev => ({ ...prev, ...updatedData }));
    };

    const enrollCourse = (courseId) => {
        if (!user) return;
        if (user.enrolledCourses.some(c => c.courseId === courseId)) return;

        setUser(prev => ({
            ...prev,
            enrolledCourses: [...prev.enrolledCourses, { courseId, progress: 0 }]
        }));
    };

    const updateProgress = (courseId, progress) => {
        if (!user) return;
        setUser(prev => ({
            ...prev,
            enrolledCourses: prev.enrolledCourses.map(c =>
                c.courseId === courseId ? { ...c, progress } : c
            )
        }));
    };

    const leaveCourse = (courseId) => {
        if (!user) return;
        setUser(prev => ({
            ...prev,
            enrolledCourses: prev.enrolledCourses.filter(c => c.courseId !== courseId)
        }));
    };

    const toggleFavorite = (courseId) => {
        if (!user) return;
        const isFav = user.favorites.includes(courseId);
        setUser(prev => ({
            ...prev,
            favorites: isFav
                ? prev.favorites.filter(id => id !== courseId)
                : [...prev.favorites, courseId]
        }));
    };

    const value = {
        user,
        login,
        logout,
        updateUserProfile,
        enrollCourse,
        updateProgress,
        toggleFavorite,
        leaveCourse
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
