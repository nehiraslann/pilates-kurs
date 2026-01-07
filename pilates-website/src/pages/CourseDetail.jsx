import { useParams, useNavigate } from 'react-router-dom';
import { useCourses } from '../context/CourseContext';
import { useAuth } from '../context/AuthContext';
import Curriculum from '../components/course/Curriculum';
import InstructorCard from '../components/course/InstructorCard';
import { Button, Badge } from '../components/ui/Components';

export default function CourseDetail() {
    const { id } = useParams();
    const { getCourseById } = useCourses();
    const { user, enrollCourse, toggleFavorite } = useAuth();
    const navigate = useNavigate();

    const course = getCourseById(id);

    if (!course) {
        return <div className="p-12 text-center">Kurs bulunamadı.</div>;
    }

    const isEnrolled = user?.enrolledCourses.some(c => c.courseId === course.id);
    const isFavorite = user?.favorites.includes(course.id);

    const handleEnroll = () => {
        if (!user) {
            // Simple mock login prompt
            if (window.confirm("Kursa kaydolmak için giriş yapmalısınız. Giriş yapılsın mı?")) {
                // Usually would redirect to login, but we are already 'logged in' via mock usually or trigger default user.
                // Since AuthContext provides initial user, we assume logged in if user exists.
                // If user is null, they need to 'login' (which we did blindly in Navbar).
                return;
            }
        }
        enrollCourse(course.id);
        navigate('/my-courses');
    };

    return (
        <div className="bg-gray-50 min-h-screen pb-12">
            {/* Hero Header */}
            <div className="bg-[#4a4036] text-[#faf7f2] py-12 lg:py-20 relative overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-20">
                    <img src={course.image} alt="" className="w-full h-full object-cover blur-sm" />
                </div>
                <div className="w-full px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                        <div className="max-w-3xl">
                            <div className="flex flex-wrap gap-2 mb-4">
                                <Badge color="gray">{course.category}</Badge>
                                <Badge color="gray">{course.level}</Badge>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-bold mb-4">{course.title}</h1>
                            <p className="text-lg text-gray-300 mb-6">{course.description}</p>

                            <div className="flex items-center gap-6 text-sm">
                                <div className="flex items-center text-yellow-400">
                                    <span className="font-bold text-lg mr-1">{course.rating}</span>
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className={`h-5 w-5 ${i < Math.round(course.rating) ? 'text-yellow-400' : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                    <span className="text-gray-400 ml-2">({course.reviewCount} değerlendirme)</span>
                                </div>
                                <div className="flex items-center text-gray-300">
                                    <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                    {course.studentCount} öğrenci
                                </div>
                            </div>
                        </div>

                        {/* Pricing Card (Desktop Overlay) */}
                        <div className="hidden lg:block w-80 bg-white text-gray-900 rounded-xl shadow-2xl overflow-hidden self-start mt-8 lg:-mt-32">
                            <div className="h-48 overflow-hidden">
                                <img src={course.image} alt="" className="w-full h-full object-cover" />
                            </div>
                            <div className="p-6">
                                <div className="text-3xl font-bold text-gray-900 mb-6">
                                    {course.price === 0 ? 'Ücretsiz' : `${course.price} TL`}
                                </div>
                                {isEnrolled ? (
                                    <Button to="/my-courses" className="w-full mb-4">Kursa Git</Button>
                                ) : (
                                    <Button onClick={handleEnroll} className="w-full mb-4">Kursa Kaydol</Button>
                                )}
                                <Button
                                    variant="secondary"
                                    onClick={() => toggleFavorite(course.id)}
                                    className={`w-full ${isFavorite ? 'text-red-600 border-red-200 bg-red-50' : ''}`}
                                >
                                    {isFavorite ? 'Favorilerden Çıkar' : 'Favorilere Ekle'}
                                </Button>

                                <div className="mt-6 space-y-3 text-sm text-gray-600">
                                    <div className="flex items-center">
                                        <svg className="h-5 w-5 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span>{course.duration} toplam süre</span>
                                    </div>
                                    <div className="flex items-center">
                                        <svg className="h-5 w-5 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                        </svg>
                                        <span>{course.lessonCount} ders</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">

                        {/* Mobile Pricing (Visible only on small screens) */}
                        <div className="lg:hidden bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                            <div className="text-3xl font-bold text-gray-900 mb-4">
                                {course.price === 0 ? 'Ücretsiz' : `${course.price} TL`}
                            </div>
                            {isEnrolled ? (
                                <Button to="/my-courses" className="w-full mb-3">Kursa Git</Button>
                            ) : (
                                <Button onClick={handleEnroll} className="w-full mb-3">Kursa Kaydol</Button>
                            )}
                            <Button
                                variant="secondary"
                                onClick={() => toggleFavorite(course.id)}
                                className="w-full"
                            >
                                {isFavorite ? 'Favorilerden Çıkar' : 'Favorilere Ekle'}
                            </Button>
                        </div>

                        {/* Curriculum */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Müfredat</h2>
                            {course.curriculum && course.curriculum.length > 0 ? (
                                <Curriculum sections={course.curriculum} />
                            ) : (
                                <p className="text-gray-500">Müfredat yakında eklenecek.</p>
                            )}
                        </section>

                        {/* Instructor */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Eğitmen</h2>
                            <InstructorCard
                                name={course.instructor}
                                image={course.instructorImage}
                                bio="River Pilates uzman eğitmen kadrosunun değerli bir üyesi. Pilates konusunda uluslararası sertifikalara sahip."
                            />
                        </section>

                        {/* Reviews (Simple List) */}
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Yorumlar</h2>
                            <div className="space-y-6">
                                {/* Mock Review */}
                                <div className="border-b border-gray-100 pb-6">
                                    <div className="flex items-center mb-2">
                                        <div className="font-bold mr-2">Ayşe Y.</div>
                                        <div className="flex text-yellow-400 text-sm">
                                            {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
                                        </div>
                                    </div>
                                    <p className="text-gray-600">Harika bir kurs, çok faydasını gördüm. Hocamız çok ilgili.</p>
                                </div>
                                <div className="border-b border-gray-100 pb-6">
                                    <div className="flex items-center mb-2">
                                        <div className="font-bold mr-2">Mehmet K.</div>
                                        <div className="flex text-yellow-400 text-sm">
                                            <span>★</span><span>★</span><span>★</span><span>★</span><span className="text-gray-300">★</span>
                                        </div>
                                    </div>
                                    <p className="text-gray-600">Genel olarak iyi ama biraz daha pratik yapılabilir.</p>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
