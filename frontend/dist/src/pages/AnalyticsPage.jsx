import React from 'react';

export default function AnalyticsPage() {
  return (
    <div className="page-content">
      <div className="card-title-bar" style={{ marginBottom: '24px' }}>
        <div className="card-icon" style={{ background: '#f0fdf4', color: '#16a34a' }}>📈</div>
        <div className="card-title-text">
          <h2>Claims Analytics & Telemetry Dashboard</h2>
          <p>Real-time operational metrics, agent latency breakdown, and claims processing insights</p>
        </div>
      </div>

      {/* Metric Cards Row 1 */}
      <div className="metrics-row" style={{ gridTemplateColumns: 'repeat(5, 1fr)', marginBottom: '24px' }}>
        <div className="metric-card">
          <div className="metric-label">Total Requests</div>
          <div className="metric-val">142</div>
          <div style={{ fontSize: '11px', color: '#10b981', marginTop: '4px' }}>↑ 12% today</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Completed (Approved)</div>
          <div className="metric-val" style={{ color: '#10b981' }}>128</div>
          <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>90.1% rate</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Query Required</div>
          <div className="metric-val" style={{ color: '#f59e0b' }}>9</div>
          <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>Waiting period holds</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Medical Review</div>
          <div className="metric-val" style={{ color: '#ef4444' }}>5</div>
          <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>Escalated to officer</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Verification Success</div>
          <div className="metric-val" style={{ color: '#2563eb' }}>96.4%</div>
          <div style={{ fontSize: '11px', color: '#10b981', marginTop: '4px' }}>Zero hallucination</div>
        </div>
      </div>

      {/* Metric Cards Row 2 */}
      <div className="metrics-row" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: '24px' }}>
        <div className="metric-card">
          <div className="metric-label">Average Latency</div>
          <div className="metric-val">38.5s</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">p95 Latency</div>
          <div className="metric-val">45.0s</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Avg Tool Calls / Run</div>
          <div className="metric-val">4.5</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Avg Cost / Run</div>
          <div className="metric-val" style={{ color: '#047857' }}>$0.0077</div>
        </div>
      </div>

      {/* SVG Charts Grid */}
      <div className="dashboard-grid">
        <div className="card">
          <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '16px' }}>
            Recommendation Distribution
          </h3>
          <div style={{ height: '180px', display: 'flex', alignItems: 'flex-end', gap: '24px', padding: '20px 10px', borderBottom: '1px solid #e2e8f0' }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: '100%', height: '140px', background: '#10b981', borderRadius: '6px 6px 0 0' }}></div>
              <span style={{ fontSize: '11px', marginTop: '8px', fontWeight: '600' }}>Approve (128)</span>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: '100%', height: '35px', background: '#f59e0b', borderRadius: '6px 6px 0 0' }}></div>
              <span style={{ fontSize: '11px', marginTop: '8px', fontWeight: '600' }}>Query (9)</span>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: '100%', height: '20px', background: '#ef4444', borderRadius: '6px 6px 0 0' }}></div>
              <span style={{ fontSize: '11px', marginTop: '8px', fontWeight: '600' }}>Review (5)</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '16px' }}>
            Latency Breakdown (p50 vs p95)
          </h3>
          <div style={{ height: '180px', display: 'flex', flexDirection: 'column', justifyBetween: 'space-between', padding: '10px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ width: '120px', fontSize: '12px', fontWeight: '500' }}>09:00 - 10:00</span>
              <div style={{ flex: 1, background: '#e2e8f0', height: '12px', borderRadius: '6px', overflow: 'hidden' }}>
                <div style={{ width: '80%', background: '#2563eb', height: '100%' }}></div>
              </div>
              <span style={{ fontSize: '12px', fontWeight: '700' }}>38s</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ width: '120px', fontSize: '12px', fontWeight: '500' }}>10:00 - 11:00</span>
              <div style={{ flex: 1, background: '#e2e8f0', height: '12px', borderRadius: '6px', overflow: 'hidden' }}>
                <div style={{ width: '90%', background: '#2563eb', height: '100%' }}></div>
              </div>
              <span style={{ fontSize: '12px', fontWeight: '700' }}>42s</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ width: '120px', fontSize: '12px', fontWeight: '500' }}>11:00 - 12:00</span>
              <div style={{ flex: 1, background: '#e2e8f0', height: '12px', borderRadius: '6px', overflow: 'hidden' }}>
                <div style={{ width: '70%', background: '#2563eb', height: '100%' }}></div>
              </div>
              <span style={{ fontSize: '12px', fontWeight: '700' }}>35s</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
