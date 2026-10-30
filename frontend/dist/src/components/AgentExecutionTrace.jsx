import React, { useState } from 'react';
import TraceModal from './TraceModal';

const DEFAULT_STEPS = [
  { step: 'Validation', agent: 'Validation Agent', latency_ms: 2000, tool_calls: ['validate_request_fields'], status: 'Success', token_count: 210, cost_usd: 0.0004, query: 'Validate request fields' },
  { step: 'Policy Agent', agent: 'Policy Analysis Agent', latency_ms: 18000, tool_calls: ['search_policy', 'search_waiting_period'], status: 'Success', token_count: 1450, cost_usd: 0.0029, query: 'Cataract Surgery policy coverage' },
  { step: 'Retrieval', agent: 'Retrieval Agent', latency_ms: 12000, tool_calls: ['get_clause(Clause 5.2)', 'get_clause(Clause 7.1)'], status: 'Success', token_count: 890, cost_usd: 0.0018, query: 'Fetch Clause 5.2 and Clause 7.1' },
  { step: 'Verification', agent: 'Verification Agent', latency_ms: 8000, tool_calls: ['verify_evidence_support'], status: 'Success', token_count: 920, cost_usd: 0.0018, query: 'Verify waiting period provision' },
  { step: 'Completed', agent: 'Orchestrator Node', latency_ms: 2000, tool_calls: ['format_recommendation_response'], status: 'Completed', token_count: 430, cost_usd: 0.0008, query: 'Finalize output' }
];

export default function AgentExecutionTrace({ traceSteps }) {
  const [selectedStep, setSelectedStep] = useState(null);
  const steps = traceSteps && traceSteps.length > 0 ? traceSteps : DEFAULT_STEPS;

  return (
    <div className="card">
      <div className="card-title-bar">
        <div className="card-icon" style={{ background: '#ecfdf5', color: '#047857' }}>🌿</div>
        <div className="card-title-text">
          <h2>Agent Execution Trace</h2>
          <p>Click any pipeline node to inspect real-time agent telemetry, tool calls, and latency</p>
        </div>
      </div>

      <div className="trace-pipeline">
        {steps.map((st, idx) => (
          <React.Fragment key={idx}>
            <div className="trace-step" onClick={() => setSelectedStep(st)}>
              <div className="step-icon">
                {st.step === 'Completed' ? '5' : idx + 1}
              </div>
              <div className="step-name">{st.step}</div>
              <div className="step-time">
                {st.latency_ms ? `${Math.round(st.latency_ms / 1000)}s` : '12s'}
              </div>
            </div>
            {idx < steps.length - 1 && (
              <div className="trace-arrow">➔</div>
            )}
          </React.Fragment>
        ))}
      </div>

      {selectedStep && (
        <TraceModal step={selectedStep} onClose={() => setSelectedStep(null)} />
      )}
    </div>
  );
}
