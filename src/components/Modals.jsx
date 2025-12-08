import React, { useState, useEffect } from 'react';
import { translations } from '../utils/translations';

// Keeping Settings Modal code just in case, but it's not used in the UI anymore per requirements
export const SettingsModal = ({ isOpen, onClose, apiKey, setApiKey }) => {
    const [inputKey, setInputKey] = useState(apiKey || '');

    useEffect(() => {
        setInputKey(apiKey || '');
    }, [apiKey]);

    const handleSave = () => {
        setApiKey(inputKey);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay animate-fade-in">
            <div className="modal-content" style={{ width: '400px' }}>
                <h3>⚙️ Settings</h3>
                <div className="form-group">
                    <label>Groq API Key</label>
                    <input
                        type="password"
                        value={inputKey}
                        onChange={(e) => setInputKey(e.target.value)}
                        placeholder="gsk_..."
                    />
                    <small style={{ color: 'var(--text-secondary)', display: 'block', marginTop: '5px' }}>
                        Your key is stored locally in your browser.
                    </small>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                    <button className="btn-icon" onClick={onClose}>Cancel</button>
                    <button className="btn-primary" onClick={handleSave}>Save Key</button>
                </div>
            </div>
        </div>
    );
};

export const GenerateModal = ({ isOpen, onClose, onGenerate, loading, language = 'en' }) => {
    const [idea, setIdea] = useState('');
    const [detailLevel, setDetailLevel] = useState('detailed');
    const t = translations[language];

    if (!isOpen) return null;

    return (
        <div className="modal-overlay animate-fade-in">
            <div className="modal-content" style={{ width: '450px' }}>
                <h3>✨ {t.modalTitle}</h3>

                <div className="form-group">
                    <label>{t.promptLengthLabel}</label>
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                        <button
                            className={`btn-icon ${detailLevel === 'concise' ? 'active' : ''}`}
                            onClick={() => setDetailLevel('concise')}
                            style={{ flex: 1, borderColor: detailLevel === 'concise' ? 'var(--text-primary)' : '' }}
                        >
                            {t.shortConcise}
                        </button>
                        <button
                            className={`btn-icon ${detailLevel === 'detailed' ? 'active' : ''}`}
                            onClick={() => setDetailLevel('detailed')}
                            style={{ flex: 1, borderColor: detailLevel === 'detailed' ? 'var(--text-primary)' : '' }}
                        >
                            {t.longDetailed}
                        </button>
                    </div>
                </div>

                <div className="form-group">
                    <label>{t.yourIdeaLabel}</label>
                    <textarea
                        value={idea}
                        onChange={(e) => setIdea(e.target.value)}
                        placeholder={t.ideaPlaceholder}
                        rows={4}
                        autoFocus
                    />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                    <button className="btn-icon" onClick={onClose} disabled={loading}>{t.cancelButton}</button>
                    <button
                        className="btn-primary"
                        onClick={() => onGenerate(idea, detailLevel)}
                        disabled={loading || !idea.trim()}
                    >
                        {loading ? t.generating : `${t.generateButtonModal} 🪄`}
                    </button>
                </div>
            </div>
        </div>
    );
};
