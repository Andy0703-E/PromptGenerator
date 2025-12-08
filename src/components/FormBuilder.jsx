import React, { useState } from 'react';
import { expandText } from '../utils/aiSimulator';

const FormBuilder = ({ template, data, onChange }) => {
    const [loadingField, setLoadingField] = useState(null);

    const handleChange = (key, value) => {
        onChange({ ...data, [key]: value });
    };

    const handleArrayAdd = (key, defaultItem = "") => {
        const currentArray = Array.isArray(data[key]) ? data[key] : [];
        onChange({ ...data, [key]: [...currentArray, defaultItem] });
    };

    const handleArrayChange = (key, index, value) => {
        const newArray = [...data[key]];
        newArray[index] = value;
        onChange({ ...data, [key]: newArray });
    };

    const handleArrayRemove = (key, index) => {
        const newArray = data[key].filter((_, i) => i !== index);
        onChange({ ...data, [key]: newArray });
    };

    const handleEnhance = async (key, currentValue, index = null) => {
        if (!currentValue) return;

        setLoadingField(index !== null ? `${key}-${index}` : key);

        try {
            const expanded = await expandText(currentValue, key);

            if (index !== null) {
                // Handle Array Item update
                const newArray = [...data[key]];
                newArray[index] = expanded;
                onChange({ ...data, [key]: newArray });
            } else {
                // Handle regular field update
                onChange({ ...data, [key]: expanded });
            }
        } catch (err) {
            console.error("AI Expansion failed", err);
        } finally {
            setLoadingField(null);
        }
    };

    // Helper to determine input type
    const renderInput = (field) => {
        const value = data[field.key] || "";

        if (field.type === 'textarea') {
            const isEnhancing = loadingField === field.key;
            return (
                <div style={{ position: 'relative' }}>
                    <textarea
                        value={value}
                        onChange={(e) => handleChange(field.key, e.target.value)}
                        placeholder={field.placeholder}
                        rows={4}
                        disabled={isEnhancing}
                    />
                    <button
                        className={`btn-magic ${isEnhancing ? 'loading' : ''}`}
                        onClick={() => handleEnhance(field.key, value)}
                        title="AI Magic Enhance"
                        disabled={isEnhancing}
                    >
                        {isEnhancing ? '✨...' : '✨'}
                    </button>
                </div>
            );
        }

        if (field.type === 'select') {
            return (
                <select value={value} onChange={(e) => handleChange(field.key, e.target.value)}>
                    {field.options.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
            );
        }

        if (field.type === 'array') {
            const items = Array.isArray(data[field.key]) ? data[field.key] : [];
            return (
                <div className="array-container">
                    {items.map((item, idx) => {
                        const isEnhancing = loadingField === `${field.key}-${idx}`;
                        return (
                            <div key={idx} className="array-item animate-fade-in" style={{ display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'center' }}>
                                <div style={{ position: 'relative', flex: 1 }}>
                                    <input
                                        type="text"
                                        value={item}
                                        onChange={(e) => handleArrayChange(field.key, idx, e.target.value)}
                                        placeholder={`Item ${idx + 1}`}
                                        disabled={isEnhancing}
                                    />
                                    <button
                                        className={`btn-magic-mini ${isEnhancing ? 'loading' : ''}`}
                                        onClick={() => handleEnhance(field.key, item, idx)}
                                        title="Enhance"
                                        disabled={isEnhancing}
                                    >
                                        ✨
                                    </button>
                                </div>
                                <button
                                    className="btn-icon"
                                    onClick={() => handleArrayRemove(field.key, idx)}
                                    title="Remove Item"
                                >
                                    🗑️
                                </button>
                            </div>
                        );
                    })}
                    <button
                        className="btn-primary"
                        style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                        onClick={() => handleArrayAdd(field.key)}
                    >
                        + Add {field.label}
                    </button>
                </div>
            );
        }

        // Default text
        const isEnhancing = loadingField === field.key;
        return (
            <div style={{ position: 'relative' }}>
                <input
                    type="text"
                    value={value}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    placeholder={field.placeholder}
                    disabled={isEnhancing}
                />
                <button
                    className={`btn-magic ${isEnhancing ? 'loading' : ''}`}
                    onClick={() => handleEnhance(field.key, value)}
                    title="AI Magic Enhance"
                    disabled={isEnhancing}
                >
                    {isEnhancing ? '✨...' : '✨'}
                </button>
            </div>
        );
    };

    return (
        <div className="form-builder">
            {template.fields.map((field) => (
                <div key={field.key} className="form-group" style={{ marginBottom: '1.5rem' }}>
                    <label>{field.label}</label>
                    <div className="input-wrapper">
                        {renderInput(field)}
                    </div>
                    {field.description && (
                        <small style={{ color: 'var(--text-secondary)', marginTop: '4px', display: 'block' }}>
                            {field.description}
                        </small>
                    )}
                </div>
            ))}
        </div>
    );
};

export default FormBuilder;
