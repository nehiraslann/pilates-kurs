export default function InstructorCard({ name, image, bio }) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center space-x-4 mb-4">
                <img
                    src={image}
                    alt={name}
                    className="h-16 w-16 rounded-full object-cover border-2 border-indigo-100"
                />
                <div>
                    <h3 className="text-lg font-bold text-gray-900">{name}</h3>
                    <p className="text-indigo-600 text-sm font-medium">Uzman Eğitmen</p>
                </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
                {bio || "Deneyimli pilates eğitmeni. Öğrencilerinin hedeflerine ulaşmasına yardımcı olmaya adanmış."}
            </p>
        </div>
    );
}
