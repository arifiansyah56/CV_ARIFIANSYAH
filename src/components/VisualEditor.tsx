import React, { useState, useEffect } from 'react';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

interface VisualEditorProps {
  data: any;
  onChange: (data: any) => void;
}

export const VisualEditor: React.FC<VisualEditorProps> = ({ data, onChange }) => {
  const [activeSection, setActiveSection] = useState<string>('experience');

  if (!data) return null;

  const sections = [
    { id: 'experience', label: 'Pengalaman' },
    { id: 'projects', label: 'Proyek' },
    { id: 'education', label: 'Pendidikan' },
    { id: 'skills', label: 'Keahlian (Skills)' },
    { id: 'certifications', label: 'Sertifikasi' },
    { id: 'leadership', label: 'Kepemimpinan' },
  ];

  const handleUpdate = (section: string, newData: any) => {
    onChange({ ...data, [section]: newData });
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 h-full overflow-hidden">
      {/* Sidebar Navigation */}
      <div className="w-full md:w-48 shrink-0 flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 pb-4 md:pb-0 md:pr-4">
        {sections.map(s => (
          <button
            key={s.id}
            onClick={() => setActiveSection(s.id)}
            className={`px-4 py-2 text-left rounded-lg text-sm font-medium transition-colors whitespace-nowrap md:whitespace-normal ${
              activeSection === s.id 
                ? 'bg-orange-500 text-white shadow-md' 
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Editor Content */}
      <div className="flex-1 overflow-y-auto pr-2 pb-8">
        <SectionEditor 
          sectionId={activeSection} 
          items={data[activeSection] || []} 
          onChange={(newData) => handleUpdate(activeSection, newData)} 
        />
      </div>
    </div>
  );
};

const SectionEditor = ({ sectionId, items, onChange }: { sectionId: string, items: any[], onChange: (items: any[]) => void }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  // Field definitions for objects
  const schema: Record<string, any[]> = {
    experience: [
      { key: 'role', label: 'Peran / Jabatan', type: 'text' },
      { key: 'company', label: 'Perusahaan', type: 'text' },
      { key: 'period', label: 'Periode', type: 'text' },
      { key: 'description', label: 'Deskripsi', type: 'textarea' },
    ],
    projects: [
      { key: 'title', label: 'Judul Proyek', type: 'text' },
      { key: 'category', label: 'Kategori', type: 'text' },
      { key: 'role', label: 'Peran', type: 'text' },
      { key: 'description', label: 'Deskripsi Singkat', type: 'textarea' },
      { key: 'fullScope', label: 'Ruang Lingkup (Scope)', type: 'textarea' },
      { key: 'challenges', label: 'Tantangan', type: 'textarea' },
      { key: 'image', label: 'URL Gambar Utama', type: 'text' },
      { key: 'software', label: 'Perangkat Lunak (Pisahkan dengan koma)', type: 'textArray' },
      { key: 'gallery', label: 'URL Galeri (Pisahkan dengan koma)', type: 'textArray' },
    ],
    education: [
      { key: 'title', label: 'Gelar / Jurusan', type: 'text' },
      { key: 'institution', label: 'Institusi', type: 'text' },
      { key: 'details', label: 'Detail (IPK dll)', type: 'text' },
    ],
    skills: [
      { key: 'category', label: 'Kategori Skill', type: 'text' },
      { key: 'items', label: 'Daftar Skill (Pisahkan dengan koma)', type: 'textArray' },
    ],
  };

  const currentSchema = schema[sectionId];
  const isStringArray = !currentSchema; // If no schema, it's an array of strings (like certifications)

  const handleItemChange = (index: number, key: string, value: any) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [key]: value };
    onChange(newItems);
  };

  const handleStringItemChange = (index: number, value: string) => {
    const newItems = [...items];
    newItems[index] = value;
    onChange(newItems);
  };

  const handleAddItem = () => {
    if (isStringArray) {
      onChange([...items, 'Item Baru']);
    } else {
      const newItem: any = { id: Date.now() };
      currentSchema.forEach(f => {
        newItem[f.key] = f.type === 'textArray' ? [] : '';
      });
      onChange([...items, newItem]);
    }
    setExpandedIndex(items.length);
  };

  const handleDeleteItem = (index: number) => {
    if (window.confirm('Hapus item ini?')) {
      const newItems = [...items];
      newItems.splice(index, 1);
      onChange(newItems);
    }
  };

  if (isStringArray) {
    return (
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="text"
              value={item}
              onChange={(e) => handleStringItemChange(index, e.target.value)}
              className="flex-1 px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg outline-none text-slate-900 dark:text-white"
            />
            <button onClick={() => handleDeleteItem(index)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg">
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
        <button onClick={handleAddItem} className="mt-4 flex items-center gap-2 text-sm font-medium text-orange-500 hover:text-orange-600">
          <Plus className="w-4 h-4" /> Tambah Item
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={item.id || index} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-sm">
          <div 
            className="flex justify-between items-center p-4 cursor-pointer bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800"
            onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
          >
            <h4 className="font-semibold text-slate-800 dark:text-slate-200 truncate pr-4">
              {item.title || item.role || item.category || `Item ${index + 1}`}
            </h4>
            <div className="flex items-center gap-2">
              <button 
                onClick={(e) => { e.stopPropagation(); handleDeleteItem(index); }}
                className="p-1.5 text-slate-400 hover:text-red-500 rounded-md transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              {expandedIndex === index ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
            </div>
          </div>
          
          {expandedIndex === index && (
            <div className="p-4 border-t border-slate-200 dark:border-slate-700 space-y-4 bg-white dark:bg-slate-900">
              {currentSchema.map(field => (
                <div key={field.key}>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    {field.label}
                  </label>
                  {field.type === 'textarea' ? (
                    <textarea
                      value={item[field.key] || ''}
                      onChange={(e) => handleItemChange(index, field.key, e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg outline-none text-slate-900 dark:text-white text-sm resize-y"
                    />
                  ) : field.type === 'textArray' ? (
                    <input
                      type="text"
                      value={(item[field.key] || []).join(', ')}
                      onChange={(e) => {
                        const val = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                        handleItemChange(index, field.key, val);
                      }}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg outline-none text-slate-900 dark:text-white text-sm"
                    />
                  ) : (
                    <input
                      type="text"
                      value={item[field.key] || ''}
                      onChange={(e) => handleItemChange(index, field.key, e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg outline-none text-slate-900 dark:text-white text-sm"
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      <button onClick={handleAddItem} className="mt-2 flex items-center gap-2 text-sm font-medium bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 px-4 py-2 rounded-lg transition-colors text-slate-700 dark:text-slate-300 w-full justify-center">
        <Plus className="w-4 h-4" /> Tambah Data Baru
      </button>
    </div>
  );
};
