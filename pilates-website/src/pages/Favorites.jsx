import { useAuth } from '../context/AuthContext';
import { useCourses } from '../context/CourseContext';
import CourseCard from '../components/course/CourseCard';
import { Button } from '../components/ui/Components';

export default function Favorites() {
    const { user } = useAuth();
    const { getCourseById } = useCourses();

    if (!user) {
        return <div className="p-12 text-center">Lütfen giriş yapın.</div>;
    }

    const favoriteCourses = user.favorites
        .map(id => getCourseById(id))
        .filter(Boolean); // Silinen kursları filtrele

    return (
        <div className="w-full px-4 sm:px-6 lg:px-8 py-12 bg-[#fff0f5]">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Favorilerim</h1>

            {favoriteCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favoriteCourses.map(course => (
                        <CourseCard key={course.id} course={course} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-[#fdfbf7] rounded-xl border border-dashed border-[#e6dccf]">
                    <svg className="mx-auto h-12 w-12 text-[#b0a69e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">Favori listeniz boş</h3>
                    <p className="mt-1 text-sm text-gray-500">Beğendiğiniz kursları buraya ekleyerek daha sonra inceleyebilirsiniz.</p>
                    <div className="mt-6">
                        <Button to="/courses" variant="primary">Kursları Keşfet</Button>
                    </div>
                </div>
            )}
        </div>
    );
}
