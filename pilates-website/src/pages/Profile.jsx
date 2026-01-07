import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Components';

export default function Profile() {
    const { user, updateUserProfile } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
    });

    if (!user) {
        return <div className="p-12 text-center">Lütfen giriş yapın.</div>;
    }

    const completedCoursesCount = user.completedCourses?.length || 0;
    // Mock calculation for total learning time (e.g., 5 hours per completed course + some random current progress)
    const totalLearningHours = completedCoursesCount * 5 + Math.floor(Math.random() * 10);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateUserProfile(formData);
        setIsEditing(false);
        // In a real app, we'd show a success toast here
    };

    return (
        <div className="w-full px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Profilim</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Profile Card */}
                <div className="md:col-span-1">
                    <div className="bg-[#fae8e6] rounded-xl shadow-sm border border-[#e6dccf] p-6 text-center">
                        <div className="relative inline-block mb-4">
                            <img src={user.avatar} alt={user.name} className="h-32 w-32 rounded-full object-cover border-4 border-white shadow-md mx-auto" />
                            <button className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full shadow-lg hover:bg-indigo-700 transition-colors">
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </button>
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                        <p className="text-gray-500 text-sm mb-6">{user.email}</p>

                        <div className="space-y-4 text-left border-t border-gray-100 pt-6">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Kayıtlı Kurslar</span>
                                <span className="font-semibold text-gray-900">{user.enrolledCourses.length}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Tamamlanan</span>
                                <span className="font-semibold text-gray-900">{completedCoursesCount}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Öğrenme Saati</span>
                                <span className="font-semibold text-gray-900">{totalLearningHours} Saat</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Edit Form */}
                <div className="md:col-span-2">
                    <div className="bg-[#fdfbf7] rounded-xl shadow-sm border border-[#e6dccf] p-8">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-gray-900">Kişisel Bilgiler</h3>
                            {!isEditing && (
                                <Button variant="secondary" onClick={() => setIsEditing(true)}>Düzenle</Button>
                            )}
                        </div>

                        {isEditing ? (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Ad Soyad</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2 px-3 border"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">E-posta</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2 px-3 border"
                                    />
                                </div>
                                <div className="flex justify-end space-x-3">
                                    <Button type="button" variant="secondary" onClick={() => setIsEditing(false)}>İptal</Button>
                                    <Button type="submit" variant="primary">Kaydet</Button>
                                </div>
                            </form>
                        ) : (
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">Ad Soyad</label>
                                    <p className="mt-1 text-lg text-gray-900">{user.name}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">E-posta</label>
                                    <p className="mt-1 text-lg text-gray-900">{user.email}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
