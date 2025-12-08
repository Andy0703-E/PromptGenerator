import React, { useState } from 'react';
import FormBuilder from './components/FormBuilder';
import JsonPreview from './components/JsonPreview';
import { GenerateModal } from './components/Modals';
import { generateWithGroq } from './utils/groqService';
import { translations } from './utils/translations';
import Footer from './components/Footer';
import './App.css';

const TEMPLATES = {
  chatbot: {
    id: 'chatbot',
    label: 'Chatbot Persona',
    defaultData: {
      role: "",
      name: "",
      tone: "professional",
      instructions: [],
      knowledge_base: []
    },
    fields: [
      { key: 'role', label: 'Role', type: 'text', placeholder: 'e.g. Senior Software Engineer' },
      { key: 'name', label: 'Bot Name', type: 'text', placeholder: 'e.g. CodeBot' },
      {
        key: 'tone',
        label: 'Tone',
        type: 'select',
        options: [
          { value: 'professional', label: 'Professional' },
          { value: 'friendly', label: 'Friendly' },
          { value: 'sarcastic', label: 'Sarcastic' },
          { value: 'concise', label: 'Concise' }
        ]
      },
      { key: 'instructions', label: 'System Instructions', type: 'array' },
      { key: 'knowledge_base', label: 'Knowledge Base Topics', type: 'array' }
    ]
  },
  image_gen: {
    id: 'image_gen',
    label: 'Image Generation',
    defaultData: {
      subject: "",
      style: "realistic",
      aspect_ratio: "1:1",
      negative_prompt: []
    },
    fields: [
      { key: 'subject', label: 'Subject', type: 'textarea', placeholder: 'Describe the main subject...' },
      {
        key: 'style',
        label: 'Style',
        type: 'select',
        options: [
          { value: 'realistic', label: 'Photorealistic' },
          { value: 'anime', label: 'Anime' },
          { value: 'oil_painting', label: 'Oil Painting' },
          { value: 'cyberpunk', label: 'Cyberpunk' }
        ]
      },
      {
        key: 'aspect_ratio',
        label: 'Aspect Ratio',
        type: 'select',
        options: [
          { value: '1:1', label: 'Square (1:1)' },
          { value: '16:9', label: 'Landscape (16:9)' },
          { value: '9:16', label: 'Portrait (9:16)' }
        ]
      },
      { key: 'negative_prompt', label: 'Negative Prompts (What to avoid)', type: 'array' }
    ]
  }
};

function App() {
  const [activeTemplateId, setActiveTemplateId] = useState('chatbot');
  const [formData, setFormData] = useState(TEMPLATES['chatbot'].defaultData);
  const [language, setLanguage] = useState('en'); // 'en' or 'id'

  // Groq Integration State (Hardcoded/Env only)
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;
  const [isGenerateOpen, setIsGenerateOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const activeTemplate = TEMPLATES[activeTemplateId];

  const handleTemplateChange = (templateId) => {
    setActiveTemplateId(templateId);
    setFormData(TEMPLATES[templateId].defaultData);
  };

  const handleGenerate = async (idea, detailLevel) => {
    if (!apiKey) {
      alert("Missing VITE_GROQ_API_KEY in .env file! Please configure it on the server.");
      return;
    }

    setIsGenerating(true);
    try {
      // Pass the template structure to the AI
      const templateSchema = TEMPLATES[activeTemplateId].defaultData;
      // Pass detailLevel to service
      const generatedData = await generateWithGroq(apiKey, idea, templateSchema, detailLevel);

      setFormData(generatedData);
      setIsGenerateOpen(false);
    } catch (error) {
      alert(`Generation Failed: ${error.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const t = translations[language]; // Translation helper
  const toggleLanguage = () => setLanguage(lang => lang === 'en' ? 'id' : 'en');

  return (
    <div className="app-container">
      <header className="app-header glass-panel">
        <div className="logo">
          <img src="/PG.png" alt="JSON Prompt Builder" />
          <span className="gradient-text logo-text">JSON Prompt Builder</span>
        </div>

        <div className="template-selector">
          {Object.values(TEMPLATES).map(tmpl => (
            <button
              key={tmpl.id}
              className={`nav-btn ${activeTemplateId === tmpl.id ? 'active' : ''}`}
              onClick={() => handleTemplateChange(tmpl.id)}
            >
              {tmpl.label}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button
            className="btn-primary"
            style={{ fontSize: '0.9rem' }}
            onClick={() => setIsGenerateOpen(true)}
          >
            {t.generateButton} ✨
          </button>
          <button
            className="btn-icon"
            style={{ fontSize: '1.2rem' }}
          >
          </button>
          <button
            className="btn-icon"
            onClick={toggleLanguage}
            title="Change Language"
            style={{ fontSize: '0.85rem', fontWeight: '600' }}
          >
            {language === 'en' ? '🇮🇩 ID' : '🇬🇧 EN'}
          </button>
        </div>
      </header>

      <main className="app-main">
        <div className="editor-column">
          <div className="panel-header">
            <h2>{t.configurationTitle}</h2>
            <p className="subtitle">{t.configurationSubtitle} {TEMPLATES[activeTemplateId].label.toLowerCase()}.</p>
          </div>
          <FormBuilder
            template={activeTemplate}
            data={formData}
            onChange={setFormData}
            language={language}
          />
        </div>

        <div className="preview-column">
          <JsonPreview data={formData} language={language} />
        </div>
      </main>

      <Footer language={language} />

      <GenerateModal
        isOpen={isGenerateOpen}
        onClose={() => setIsGenerateOpen(false)}
        onGenerate={handleGenerate}
        loading={isGenerating}
        language={language}
      />
    </div>
  );
}

export default App;
