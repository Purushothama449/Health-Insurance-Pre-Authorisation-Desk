import React, { useState } from 'react';

export default function ResultPanel({ runResult, onFeedbackSubmit }) {
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [feedbackReason, setFeedbackReason] = useState('');
  const [showReasonBox, setShowReasonBox] = useState(false);

  if (!runResult) {
    return (
      <div className="card">
        <div className="card-title-bar">
          <div className="card-icon">⚡</div>
          <div className="card-title-text">
            <h2>Request Result</h2>
            <p>Coverage recommendation with evidence from policy documents</p>
          </div>
        </div>
        <div style={{ textAlign: 'center', padding: '40px 20px', color: '#94a3b8' }}>
          <div style={{ fontSize: '36px', marginBottom: '12px' }}>📋</div>
          <p style={{ fontSize: '14px', fontWeight: '500' }}>No pre-authorisation request submitted yet.</p>
          <p style={{ fontSize: '12px', marginTop: '4px' }}>Fill out the form on the left and submit to view live AI coverage analysis.</p>
        </div>
      </div>
    );
  }

  const handleFeedback = (isSatisfactory) => {
    if (!isSatisfactory && !showReasonBox) {
      setShowReasonBox(true);
      return;
    }
    onFeedbackSubmit(runResult.run_id, isSatisfactory, feedbackReason);
    setFeedbackSent(true);
  };

  const recClass = runResult.recommendation || 'QUERY-TO-HOSPITAL';

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div className="card-title-bar" style={{ marginBottom: 0 }}>
          <div className="card-icon" style={{ background: '#dcfce7', color: '#166534' }}>✓</div>
          <div className="card-title-text">
            <h2>Request Result</h2>
            <p>Coverage recommendation with evidence from policy documents</p>
          </div>
        </div>
        <button className="btn-secondary" style={{ padding: '6px 14px', fontSize: '12px' }}>
          👁️ View Full Trace
        </button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', padding: '12px 16px', borderRadius: '8px', marginBottom: '16px', fontSize: '13px' }}>
        <div>
          <span style={{ fontWeight: '700', fontSize: '15px' }}>Run ID: {runResult.run_id}</span>
          <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
            Submitted: {runResult.created_at} &nbsp;|&nbsp; Completed: {runResult.completed_at || 'Just now'}
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span className={`badge ${runResult.status === 'Completed' ? 'badge-completed' : 'badge-processing'}`}>
            Status: {runResult.status}
          </span>
          <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
            ⏱ Processing time: {runResult.processing_time_sec || 42} seconds
          </div>
        </div>
      </div>

      <div className="rec-badge-box">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="metric-label" style={{ fontWeight: '600', color: '#92400e' }}>Coverage Recommendation</span>
          <span className="badge" style={{ background: '#dbeafe', color: '#1e40af' }}>
            Confidence: {runResult.confidence || 'Verified'}
          </span>
        </div>
        <div className={`rec-tag ${recClass}`} style={{ marginTop: '8px' }}>
          {recClass}
        </div>
        <p className="rec-reason">
          <strong>Reason:</strong> {runResult.reason || 'The procedure appears to be covered, but the policy contains a waiting-period provision applicable to cataract-related treatment.'}
        </p>
      </div>

      <div className="metrics-row">
        <div className="metric-card">
          <div className="metric-label">Indicative Limit</div>
          <div className="metric-val" style={{ color: '#1e3a8a' }}>{runResult.indicative_limit || '₹ 1,50,000'}</div>
          <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>(as per policy sub-limit)</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Escalation</div>
          <div className="metric-val" style={{ fontSize: '13px', fontWeight: '600', color: '#9a3412', marginTop: '4px' }}>
            👤 {runResult.escalation || 'Medical/claims officer review required'}
          </div>
        </div>
      </div>

      {/* Feedback Section */}
      <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '14px', marginTop: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', fontWeight: '600', color: '#64748b' }}>Was this recommendation accurate?</span>
          {feedbackSent ? (
            <span style={{ fontSize: '12px', color: '#10b981', fontWeight: '600' }}>✓ Feedback Recorded</span>
          ) : (
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                className="btn-secondary"
                style={{ padding: '4px 12px', fontSize: '12px' }}
                onClick={() => handleFeedback(true)}
              >
                👍 Satisfactory
              </button>
              <button
                className="btn-secondary"
                style={{ padding: '4px 12px', fontSize: '12px', color: '#b91c1c' }}
                onClick={() => handleFeedback(false)}
              >
                👎 Not Satisfactory
              </button>
            </div>
          )}
        </div>

        {showReasonBox && !feedbackSent && (
          <div style={{ marginTop: '10px' }}>
            <textarea
              className="form-input"
              style={{ width: '100%', height: '60px', fontSize: '12px' }}
              placeholder="Provide reason for dissatisfaction..."
              value={feedbackReason}
              onChange={(e) => setFeedbackReason(e.target.value)}
            />
            <button
              className="btn-primary"
              style={{ marginTop: '6px', padding: '4px 12px', fontSize: '12px' }}
              onClick={() => handleFeedback(false)}
            >
              Submit Reason
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
