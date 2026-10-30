import React from 'react';

export default function MonitoringPage() {
  return (
    <div className="page-content">
      <div className="card">
        <div className="card-title-bar">
          <div className="card-icon" style={{ background: '#eff6ff', color: '#2563eb' }}>📊</div>
          <div className="card-title-text">
            <h2>Prometheus & OpenTelemetry Monitoring</h2>
            <p>Live observability traces, agent step breakdown, and container resource metrics</p>
          </div>
        </div>

        <div style={{ background: '#0f172a', color: '#f8fafc', padding: '24px', borderRadius: '12px', fontFamily: 'monospace', fontSize: '13px', lineHeight: '1.8' }}>
          <div style={{ color: '#10b981', fontWeight: '700', marginBottom: '12px' }}>
            [OpenTelemetry Agent Tracing Active] - Endpoint: http://localhost:4317
          </div>
          <div>http_requests_total&#123;method="POST", path="/api/v1/preauth"&#125; 142</div>
          <div>langgraph_agent_step_duration_seconds&#123;agent="Policy_Agent"&#125; p50=14.0s p95=18.0s</div>
          <div>langgraph_agent_step_duration_seconds&#123;agent="Verification_Agent"&#125; p50=6.0s p95=8.0s</div>
          <div>vector_store_query_latency_milliseconds p50=4.2ms p95=12.1ms</div>
          <div>guardrail_prompt_injections_blocked_total 2</div>
          <div style={{ color: '#38bdf8', marginTop: '12px' }}>
            Grafana Dashboard URL: <a href="http://localhost:3000" target="_blank" rel="noreferrer" style={{ color: '#38bdf8' }}>http://localhost:3000 (Grafana Port 3000)</a>
          </div>
        </div>
      </div>
    </div>
  );
}
