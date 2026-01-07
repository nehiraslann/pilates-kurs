export default function Footer() {
    return (
        <footer className="bg-[#4a4036] text-[#e6dccf] py-12">
            <div className="w-full px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">RumeliLearn</h3>
                        <p className="text-gray-400">
                            Modern pilates eğitimi platformunuz. Uzman eğitmenlerle evinizden katılın.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Hızlı Erişim</h4>
                        <ul className="space-y-2 text-[#b0a69e]">
                            <li><a href="#" className="hover:text-[#d48c94]">Ana Sayfa</a></li>
                            <li><a href="#" className="hover:text-[#d48c94]">Kurslar</a></li>
                            <li><a href="#" className="hover:text-white">Eğitmenler</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4">İletişim</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li>info@riverpilates.com</li>
                            <li>+90 212 999 99 99</li>
                            <li>İstanbul, Türkiye</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Takip Edin</h4>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white">Instagram</a>
                            <a href="#" className="text-gray-400 hover:text-white">Twitter</a>
                            <a href="#" className="text-gray-400 hover:text-white">LinkedIn</a>
                        </div>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
                    <p>&copy; 2026 River Pilates. Tüm hakları saklıdır.</p>
                </div>
            </div>
        </footer>
    );
}
