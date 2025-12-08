import React, { useState } from 'react';
import { translations } from '../utils/translations';

const JsonPreview = ({ data, language = 'en' }) => {
    const t = translations[language];
    const [showCopied, setShowCopied] = useState(false);
    const handleCopy = () => {
        navigator.clipboard.writeText(JSON.stringify(data, null, 2));
        setShowCopied(true);
        setTimeout(() => setShowCopied(false), 2000);
    };

    const handleDownload = () => {
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'prompt.json';
        a.click();
        URL.revokeObjectURL(url);
    };

    // Simple JSON syntax highlighter
    const highlightJSON = (json) => {
        if (typeof json !== 'string') {
            json = JSON.stringify(json, null, 2);
        }
        json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
            let cls = 'number';
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = 'key';
                } else {
                    cls = 'string';
                }
            } else if (/true|false/.test(match)) {
                cls = 'boolean';
            } else if (/null/.test(match)) {
                cls = 'null';
            }
            return '<span class="' + cls + '">' + match + '</span>';
        });
    };

    return (
        <div className="json-preview glass-panel" style={{ height: '100%', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div className="preview-header" style={{
                padding: '1rem',
                borderBottom: '1px solid var(--border-subtle)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'rgba(0,0,0,0.2)'
            }}>
                <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>{t.livePreview}</span>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="btn-icon" onClick={handleCopy} title={t.copyButton}>
                        📋
                    </button>
                    <button className="btn-icon" onClick={handleDownload} title={t.downloadButton}>
                        ⬇️
                    </button>
                </div>
            </div>
            <div className="preview-body" style={{ flex: 1, overflow: 'auto', padding: '1rem', background: '#0d0d0d' }}>
                <pre
                    style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: '0.9rem', lineHeight: '1.5' }}
                    dangerouslySetInnerHTML={{ __html: highlightJSON(data) }}
                />
            </div>
            <style>{`
        .string { color: #a5d6ff; }
        .number { color: #79c0ff; }
        .boolean { color: #56d364; }
        .null { color: #ff7b72; }
        .key { color: #d2a8ff; }
        
        .toast-notification {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%);
          color: white;
          padding: 1rem 1.5rem;
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(139, 92, 246, 0.4);
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          animation: slideIn 0.3s ease-out;
          z-index: 1000;
        }
        
        @keyframes slideIn {
          from {
            transform: translateY(100px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
            {showCopied && (
                <div className="toast-notification">
                    ✓ Copied to clipboard!
                </div>
            )}
        </div>
    );
};

export default JsonPreview;
