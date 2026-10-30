import React, { useState } from 'react';

export default function SettingsPage() {
  const [promptVer, setPromptVer] = useState('v1');
  const [cacheEnabled, setCacheEnabled] = useState(true);

  return (
    <div className="page-content">
      <div className="card">
        <div className="card-title-bar">
          <div className="card-icon" style={{ background: '#f1f5f9', color: '#0f172a' }}>⚙️</div>
          <div className="card-title-text">
            <h2>System Settings & Prompt Versioning</h2>
            <p>Configure agent prompts, LLM stub settings, cache strategy, and rate limits</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          {/* Prompt Versioning Section */}
          <div className="metric-card" style={{ background: 'white' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '12px' }}>
              📝 Prompt Version Control
            </h3>
            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label>Select Active Agent Prompt Version</label>
              <select
                className="form-select"
                value={promptVer}
                onChange={(e) => setPromptVer(e.target.value)}
              >
                <option value="v1">v1 — Production (Strict Citation & Clause Enforcement)</option>
                <option value="v2">v2 — Experimental (Chain-of-Thought RAG Reasoning)</option>
              </select>
            </div>

            <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }}>
              <div style={{ fontWeight: '700', marginBottom: '6px' }}>V1 vs V2 Benchmark Comparison:</div>
              <div>• Groundedness Score: V1 (0.96) vs V2 (0.94)</div>
              <div>• Context Relevance: V1 (0.98) vs V2 (0.97)</div>
              <div>• Hallucination Rate: V1 (0.0%) vs V2 (0.0%)</div>
            </div>
          </div>

          {/* Caching & Rate Limit Section */}
          <div className="metric-card" style={{ background: 'white' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '12px' }}>
              ⚡ Redis Cache & Rate Limiting
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div>
                <div style={{ fontWeight: '600', fontSize: '13px' }}>Vector Embedding & Result Cache</div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>Cache Hit Rate: 78.4%</div>
              </div>
              <input
                type="checkbox"
                checked={cacheEnabled}
                onChange={(e) => setCacheEnabled(e.target.checked)}
                style={{ width: '18px', height: '18px' }}
              />
            </div>

            <div className="form-group">
              <label>API Rate Limit (Requests / Second)</label>
              <input type="number" className="form-input" defaultValue={50} readOnly />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
