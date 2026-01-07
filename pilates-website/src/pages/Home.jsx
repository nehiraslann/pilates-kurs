import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCourses } from '../context/CourseContext';
import CourseCard from '../components/course/CourseCard';
import { Button } from '../components/ui/Components';

export default function Home() {
    const { courses } = useCourses();
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            id: 1,
            title: "Pilates ile Forma Girin",
            description: "Uzman eğitmenler eşliğinde, kendi hızınızda pilates öğrenin.",
            image: "/k1.jpg",
            cta: "Kursları Keşfet",
            link: "/courses"
        },
        {
            id: 2,
            title: "Reformer Pilates Deneyimi",
            description: "Gücünüzü ve esnekliğinizi artıracak ileri seviye dersler.",
            image: "/k2.jpg",
            cta: "Hemen Başla",
            link: "/courses"
        },
        {
            id: 3,
            title: "Hamilelikte Sağlıklı Kalın",
            description: "Anne adayları için özel olarak hazırlanmış güvenli egzersiz programları.",
            image: "/k3.jpg",
            cta: "Programı İncele",
            link: "/courses"
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [slides.length]);

    return (
        <div className="space-y-16 pb-12 bg-[#f7f5ef]">
            {/* anasayfa slider */}
            <div className="relative h-[500px] w-full overflow-hidden bg-gray-900">
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                            }`}
                    >
                        <div className="absolute inset-0 bg-black/40 z-10" /> {/* Overlay */}
                        <img
                            src={slide.image}
                            alt={slide.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 z-20 flex items-center justify-center text-center px-4">
                            <div className="max-w-3xl space-y-6 animate-fade-in-up">
                                <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                                    {slide.title}
                                </h1>
                                <p className="text-xl text-gray-100 max-w-2xl mx-auto">
                                    {slide.description}
                                </p>
                                <div>
                                    <Button to={slide.link} variant="primary" className="text-lg px-8 py-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
                                        {slide.cta}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {/* küçük navigasyon noktaları */}
                <div className="absolute bottom-6 left-0 right-0 z-30 flex justify-center space-x-2">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`h-2 w-8 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white w-12' : 'bg-white/50 hover:bg-white/80'
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>



            {/* Populer kurslar */}
            <section className="bg-[#f2efe9] py-16">
                <div className="w-full px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-10">
                        <div>
                            <h2 className="text-3xl font-bold text-[#4a4036] sm:text-4xl">Popüler Kurslar</h2>
                            <p className="mt-4 text-[#8c8077]">Öğrencilerimiz tarafından en çok tercih edilenler.</p>
                        </div>
                        <Link to="/courses" className="text-[#d48c94] font-medium hover:text-[#c07b83]">Tümünü Gör &rarr;</Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {courses.slice(0, 3).map(course => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </div>
                </div>
            </section>

            {/* kişi istatistikleri */}
            <section className="w-full px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div className="p-6 bg-[#fffdf9] rounded-xl shadow-sm border border-[#e6dccf]">
                        <div className="text-4xl font-bold text-[#d48c94] mb-2">10+</div>
                        <div className="text-[#5c504a]">Uzman Eğitmen</div>
                    </div>
                    <div className="p-6 bg-[#fffdf9] rounded-xl shadow-sm border border-[#e6dccf]">
                        <div className="text-4xl font-bold text-[#d48c94] mb-2">50+</div>
                        <div className="text-[#5c504a]">Online Ders</div>
                    </div>
                    <div className="p-6 bg-[#fffdf9] rounded-xl shadow-sm border border-[#e6dccf]">
                        <div className="text-4xl font-bold text-[#d48c94] mb-2">1000+</div>
                        <div className="text-[#5c504a]">Mutlu Öğrenci</div>
                    </div>
                </div>
            </section>
        </div>
    );
}
