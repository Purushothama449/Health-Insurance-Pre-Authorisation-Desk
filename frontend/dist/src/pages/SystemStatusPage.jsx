import React from 'react';

export default function SystemStatusPage() {
  return (
    <div className="page-content">
      <div className="card">
        <div className="card-title-bar">
          <div className="card-icon" style={{ background: '#dcfce7', color: '#166534' }}>⚡</div>
          <div className="card-title-text">
            <h2>System Status & Service Health</h2>
            <p>Real-time microservices status, API health checks, and database connectivity</p>
          </div>
        </div>

        <div className="metrics-row" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: '24px' }}>
          <div className="metric-card">
            <div className="metric-label">FastAPI Backend</div>
            <div className="metric-val" style={{ color: '#10b981', fontSize: '16px' }}>● Operational</div>
            <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>Latency: 12ms</div>
          </div>
          <div className="metric-card">
            <div className="metric-label">LangGraph Agent Worker</div>
            <div className="metric-val" style={{ color: '#10b981', fontSize: '16px' }}>● 3 Workers Active</div>
            <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>Worker Queue: Idle</div>
          </div>
          <div className="metric-card">
            <div className="metric-label">Policy Vector Database</div>
            <div className="metric-val" style={{ color: '#10b981', fontSize: '16px' }}>● 408 Chunks Indexed</div>
            <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>FAISS Index: Healthy</div>
          </div>
          <div className="metric-card">
            <div className="metric-label">Redis Job Queue</div>
            <div className="metric-val" style={{ color: '#10b981', fontSize: '16px' }}>● Connected</div>
            <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>Memory: 12.4 MB</div>
          </div>
        </div>
      </div>
    </div>
  );
}
