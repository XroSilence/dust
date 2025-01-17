// src/pages/admin/AdminDashboard.jsx
import React, { useState } from 'react';
import { Building2, ClipboardCheck, Phone, MapPin } from 'lucide-react';

const AdminDashboard = () => {
    const [activeSection, setActiveSection] = useState('content');

    const [contentEdits, setContentEdits] = useState({
        hero: {
            title: 'DUSTUP',
            subtitle: 'We Take Dust Down',
        },
        intentPaths: [
            {
                id: 'quote',
                title: 'Get a Quote',
                description: 'Quick, no-obligation quote for your facility',
                icon: ClipboardCheck,
                customColor: '#3B82F6',
            },
            // ... other paths
        ]
    });

    return (
        <div className="bg-slate-900 min-h-screen">
            {/* Admin Navigation */}
            <nav className="bg-slate-800 p-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <h1 className="text-white text-xl font-bold">DustUp Admin</h1>
                    <div className="flex gap-4">
                        <button
                            onClick={() => setActiveSection('content')}
                            className={`px-4 py-2 rounded ${activeSection === 'content' ? 'bg-blue-500' : 'bg-slate-700'
                                } text-white`}
                        >
                            Content Editor
                        </button>
                        <button
                            onClick={() => setActiveSection('theme')}
                            className={`px-4 py-2 rounded ${activeSection === 'theme' ? 'bg-blue-500' : 'bg-slate-700'
                                } text-white`}
                        >
                            Theme Settings
                        </button>
                        <button
                            onClick={() => setActiveSection('pages')}
                            className={`px-4 py-2 rounded ${activeSection === 'pages' ? 'bg-blue-500' : 'bg-slate-700'
                                } text-white`}
                        >
                            Pages
                        </button>
                    </div>
                </div>
            </nav>

            {/* Content Editor */}
            <div className="max-w-7xl mx-auto p-6">
                {activeSection === 'content' && (
                    <div className="space-y-8">
                        <div className="bg-slate-800 p-6 rounded-lg">
                            <h2 className="text-xl text-white mb-4">Hero Section</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-white mb-2">Title</label>
                                    <input
                                        type="text"
                                        value={contentEdits.hero.title}
                                        onChange={(e) => setContentEdits({
                                            ...contentEdits,
                                            hero: { ...contentEdits.hero, title: e.target.value }
                                        })}
                                        className="w-full p-2 rounded"
                                    />
                                </div>
                                <div>
                                    <label className="block text-white mb-2">Subtitle</label>
                                    <input
                                        type="text"
                                        value={contentEdits.hero.subtitle}
                                        onChange={(e) => setContentEdits({
                                            ...contentEdits,
                                            hero: { ...contentEdits.hero, subtitle: e.target.value }
                                        })}
                                        className="w-full p-2 rounded"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-800 p-6 rounded-lg">
                            <h2 className="text-xl text-white mb-4">Intent Paths</h2>
                            {contentEdits.intentPaths.map((path, index) => (
                                <div key={path.id} className="mb-6 p-4 border border-slate-700 rounded">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-white mb-2">Title</label>
                                            <input
                                                type="text"
                                                value={path.title}
                                                onChange={(e) => {
                                                    const newPaths = [...contentEdits.intentPaths];
                                                    newPaths[index] = { ...path, title: e.target.value };
                                                    setContentEdits({ ...contentEdits, intentPaths: newPaths });
                                                }}
                                                className="w-full p-2 rounded"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-white mb-2">Description</label>
                                            <input
                                                type="text"
                                                value={path.description}
                                                onChange={(e) => {
                                                    const newPaths = [...contentEdits.intentPaths];
                                                    newPaths[index] = { ...path, description: e.target.value };
                                                    setContentEdits({ ...contentEdits, intentPaths: newPaths });
                                                }}
                                                className="w-full p-2 rounded"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-white mb-2">Color</label>
                                            <input
                                                type="color"
                                                value={path.customColor}
                                                onChange={(e) => {
                                                    const newPaths = [...contentEdits.intentPaths];
                                                    newPaths[index] = { ...path, customColor: e.target.value };
                                                    setContentEdits({ ...contentEdits, intentPaths: newPaths });
                                                }}
                                                className="w-full p-2 rounded"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Theme Settings */}
                {activeSection === 'theme' && (
                    <div className="bg-slate-800 p-6 rounded-lg">
                        <h2 className="text-xl text-white mb-4">Theme Settings</h2>
                        {/* Add color pickers, font selectors, etc. */}
                    </div>
                )}

                {/* Pages Manager */}
                {activeSection === 'pages' && (
                    <div className="bg-slate-800 p-6 rounded-lg">
                        <h2 className="text-xl text-white mb-4">Pages</h2>
                        {/* Add page management UI */}
                    </div>
                )}

                {/* Save Changes Button */}
                <div className="fixed bottom-6 right-6">
                    <button
                        className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-600"
                        onClick={() => {
                            // Implement save functionality
                            console.log('Saving changes:', contentEdits);
                        }}
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;