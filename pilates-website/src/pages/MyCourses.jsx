import { useAuth } from '../context/AuthContext';
import { useCourses } from '../context/CourseContext';
import { Button, ProgressBar } from '../components/ui/Components';
import { Link } from 'react-router-dom';

export default function MyCourses() {
    const { user, leaveCourse } = useAuth();
    const { getCourseById } = useCourses();

    if (!user) {
        return <div className="p-12 text-center">Lütfen giriş yapın.</div>;
    }

    const enrolledCourses = user.enrolledCourses.map(enrolled => {
        const course = getCourseById(enrolled.courseId);
        return { ...course, progress: enrolled.progress };
    }).filter(c => c.id); // Filter out any if course not found

    return (
        <div className="w-full px-4 sm:px-6 lg:px-8 py-12 bg-[#fff0f5]">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Kurslarım</h1>

            {enrolledCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {enrolledCourses.map(course => (
                        <div key={course.id} className="bg-[#fae8e6] rounded-xl shadow-sm border border-[#e6dccf] overflow-hidden flex flex-col">
                            <div className="h-40 overflow-hidden">
                                <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="p-6 flex-grow flex flex-col justify-between">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2 truncate">
                                        <Link to={`/course/${course.id}`} className="hover:text-indigo-600 transition-colors">
                                            {course.title}
                                        </Link>
                                    </h3>
                                    <div className="mb-4">
                                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                                            <span>İlerleme</span>
                                            <span>%{course.progress}</span>
                                        </div>
                                        <ProgressBar progress={course.progress} />
                                    </div>
                                </div>
                                <Button to={`/course/${course.id}`} variant="primary" className="w-full mb-3">
                                    Devam Et
                                </Button>
                                <button
                                    onClick={() => leaveCourse(course.id)}
                                    className="w-full text-sm bg-red-500 text-white hover:bg-red-600 hover:text-white font-medium transition-colors py-2 rounded-lg"
                                >
                                    Kurstan Ayrıl
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-[#fdfbf7] rounded-xl border border-dashed border-[#e6dccf]">
                    <svg className="mx-auto h-12 w-12 text-[#b0a69e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">Henüz kayıtlı kursunuz yok</h3>
                    <p className="mt-1 text-sm text-gray-500">Hemen öğrenmeye başlamak için kursları keşfedin.</p>
                    <div className="mt-6">
                        <Button to="/courses" variant="primary">Kursları Keşfet</Button>
                    </div>
                </div>
            )}
        </div>
    );
}
