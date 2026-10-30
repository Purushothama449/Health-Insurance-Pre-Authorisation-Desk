import React from 'react';

export default function ClauseModal({ clause, onClose }) {
  if (!clause) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span className="page-tag" style={{ marginBottom: '6px', display: 'inline-block' }}>
              Page {clause.page || 18}
            </span>
            <h2 style={{ fontSize: '18px', fontWeight: '700' }}>
              {clause.clause_id} — {clause.title}
            </h2>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '16px' }}>
          <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '600', marginBottom: '4px' }}>
            SOURCE DOCUMENT
          </div>
          <div style={{ fontSize: '13px', fontWeight: '600', color: '#1e3a8a' }}>
            {clause.source_document || 'Star Comprehensive Health Insurance Policy Wording'}
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '600', marginBottom: '8px' }}>
            FULL POLICY CLAUSE TEXT
          </div>
          <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#1e293b', background: '#ffffff', padding: '16px', borderRadius: '8px', border: '1px solid #cbd5e1', whiteSpace: 'pre-line' }}>
            {clause.full_clause || clause.retrieved_text}
          </p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button className="btn-primary" onClick={onClose}>Close Clause View</button>
        </div>
      </div>
    </div>
  );
}
