import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Badge } from '../ui/Components';

export default function CourseCard({ course }) {
    const { toggleFavorite, user } = useAuth();
    const isFavorite = user?.favorites.includes(course.id);

    return (
        <div className="bg-[#fae8e6] rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full group border border-[#e6dccf]">
            <div className="relative h-48 overflow-hidden">
                <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/800x600?text=RumeliLearn';
                    }}
                />
                <div className="absolute top-2 right-2">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            toggleFavorite(course.id);
                        }}
                        className={`p-2 rounded-full shadow-sm ${isFavorite ? 'bg-red-50 text-red-500' : 'bg-white/90 text-gray-400 hover:text-red-500'}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
                <div className="absolute bottom-2 left-2">
                    <Badge color="indigo">{course.category}</Badge>
                </div>
            </div>

            <div className="p-5 flex-grow flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold text-[#4a4036] line-clamp-2 hover:text-[#d48c94] transition-colors">
                            <Link to={`/course/${course.id}`}>
                                {course.title}
                            </Link>
                        </h3>
                    </div>

                    <div className="flex items-center mb-3">
                        <div className="flex items-center text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                                <svg key={i} className={`h-4 w-4 ${i < Math.round(course.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                            <span className="text-xs text-gray-500 ml-1">({course.reviewCount})</span>
                        </div>
                    </div>

                    <div className="flex items-center mb-4">
                        <img src={course.instructorImage} alt={course.instructor} className="h-6 w-6 rounded-full object-cover mr-2" />
                        <span className="text-sm text-[#5c504a]">{course.instructor}</span>
                    </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-xs text-[#8c8077]">{course.level}</span>
                        <span className="text-xs text-[#8c8077]">{course.duration}</span>
                    </div>
                    <span className="text-xl font-bold text-[#d48c94]">
                        {course.price === 0 ? 'Ücretsiz' : `${course.price} TL`}
                    </span>
                </div>
            </div>
        </div>
    );
}


