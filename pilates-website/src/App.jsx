import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import MyCourses from './pages/MyCourses';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import { AuthProvider } from './context/AuthContext';
import { CourseProvider } from './context/CourseContext';

export default function App() {
  return (
    <AuthProvider>
      <CourseProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="courses" element={<Courses />} />
            <Route path="course/:id" element={<CourseDetail />} />
            <Route path="my-courses" element={<MyCourses />} />
            <Route path="favorites" element={<Favorites />} />
            <Route path="profile" element={<Profile />} />
            <Route path="*" element={<div className="p-12 text-center text-xl">Sayfa bulunamadı (404)</div>} />
          </Route>
        </Routes>
      </CourseProvider>
    </AuthProvider>
  );
}


