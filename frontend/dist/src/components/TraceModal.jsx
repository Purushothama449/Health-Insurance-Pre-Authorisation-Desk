import React from 'react';

export default function TraceModal({ step, onClose }) {
  if (!step) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span className="badge badge-completed" style={{ marginBottom: '6px', display: 'inline-block' }}>
              Step: {step.step}
            </span>
            <h2 style={{ fontSize: '18px', fontWeight: '700' }}>
              Agent Telemetry: {step.agent}
            </h2>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
          <div className="metric-card">
            <div className="metric-label">Status</div>
            <div className="metric-val" style={{ color: '#10b981', fontSize: '15px' }}>✓ {step.status}</div>
          </div>
          <div className="metric-card">
            <div className="metric-label">Latency</div>
            <div className="metric-val" style={{ fontSize: '15px' }}>⏱ {step.latency_ms} ms</div>
          </div>
          <div className="metric-card">
            <div className="metric-label">Token Count</div>
            <div className="metric-val" style={{ fontSize: '15px' }}>🔤 {step.token_count}</div>
          </div>
          <div className="metric-card">
            <div className="metric-label">Cost (USD)</div>
            <div className="metric-val" style={{ fontSize: '15px', color: '#047857' }}>${step.cost_usd}</div>
          </div>
        </div>

        <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '14px' }}>
          <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '600', marginBottom: '4px' }}>PROMPT VERSION & QUERY</div>
          <div style={{ fontSize: '13px', fontWeight: '600' }}>Version: {step.prompt_version || 'v1'}</div>
          <div style={{ fontSize: '13px', color: '#334155', marginTop: '4px' }}>"{step.query}"</div>
        </div>

        <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '20px' }}>
          <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '600', marginBottom: '6px' }}>TOOL CALLS EXECUTED</div>
          {step.tool_calls && step.tool_calls.length > 0 ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {step.tool_calls.map((tc, idx) => (
                <span key={idx} style={{ background: '#e0e7ff', color: '#3730a3', fontSize: '12px', padding: '3px 8px', borderRadius: '4px', fontFamily: 'monospace' }}>
                  ⚙️ {tc}
                </span>
              ))}
            </div>
          ) : (
            <div style={{ fontSize: '12px', color: '#94a3b8' }}>None</div>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button className="btn-primary" onClick={onClose}>Close Step Telemetry</button>
        </div>
      </div>
    </div>
  );
}
