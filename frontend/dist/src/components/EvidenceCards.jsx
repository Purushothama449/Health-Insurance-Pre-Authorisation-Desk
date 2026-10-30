import React, { useState } from 'react';
import ClauseModal from './ClauseModal';

export default function EvidenceCards({ evidenceList }) {
  const [selectedClause, setSelectedClause] = useState(null);

  if (!evidenceList || evidenceList.length === 0) {
    return null;
  }

  return (
    <div className="card">
      <div className="card-title-bar">
        <div className="card-icon" style={{ background: '#eff6ff', color: '#2563eb' }}>📖</div>
        <div className="card-title-text">
          <h2>Supporting Evidence</h2>
          <p>Verified clause citations retrieved from insurer policy corpus</p>
        </div>
      </div>

      <div className="evidence-list">
        {evidenceList.map((item, index) => (
          <div key={index} className="evidence-card">
            <div className="clause-num">{index + 1}</div>
            <div className="evidence-body">
              <div className="evidence-header">
                <div className="evidence-title">
                  {item.clause_id} — {item.title}
                </div>
                <span className="page-tag">Page {item.page}</span>
              </div>
              <p className="evidence-quote">
                "{item.retrieved_text}"
              </p>
              <span className="view-clause-link" onClick={() => setSelectedClause(item)}>
                View full clause →
              </span>
            </div>
          </div>
        ))}
      </div>

      {selectedClause && (
        <ClauseModal clause={selectedClause} onClose={() => setSelectedClause(null)} />
      )}
    </div>
  );
}
