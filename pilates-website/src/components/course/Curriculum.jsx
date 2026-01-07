import { useState } from 'react';

export default function Curriculum({ sections }) {
    const [openSection, setOpenSection] = useState(0);

    return (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
            {sections.map((section, index) => (
                <div key={index} className="border-b border-gray-200 last:border-b-0">
                    <button
                        onClick={() => setOpenSection(openSection === index ? -1 : index)}
                        className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex justify-between items-center focus:outline-none"
                    >
                        <span className="font-semibold text-gray-900">{section.section}</span>
                        <span className="ml-6 flex-shrink-0">
                            <svg
                                className={`h-5 w-5 transform transition-transform duration-200 ${openSection === index ? 'rotate-180' : ''}`}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </span>
                    </button>

                    <div className={`transition-all duration-300 ease-in-out overflow-hidden ${openSection === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <ul className="bg-white px-6 py-4 space-y-3">
                            {section.lessons.map((lesson, idx) => (
                                <li key={idx} className="flex items-center text-gray-600">
                                    <svg className="h-4 w-4 text-indigo-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {lesson}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ))}
        </div>
    );
}
