import React from 'react';
import PreAuthForm from '../components/PreAuthForm';
import ResultPanel from '../components/ResultPanel';
import EvidenceCards from '../components/EvidenceCards';
import AgentExecutionTrace from '../components/AgentExecutionTrace';
import RecentRequestsTable from '../components/RecentRequestsTable';

export default function DashboardPage({
  formSubmitHandler,
  loading,
  currentResult,
  recentRuns,
  onSelectRun,
  onViewAllRequests,
  onFeedbackSubmit
}) {
  return (
    <div className="page-content">
      <div className="dashboard-grid">
        <div className="left-column">
          <PreAuthForm onSubmit={formSubmitHandler} loading={loading} />
          <RecentRequestsTable
            runs={recentRuns}
            onSelectRun={onSelectRun}
            onViewAll={onViewAllRequests}
          />
        </div>
        <div className="right-column">
          <ResultPanel runResult={currentResult} onFeedbackSubmit={onFeedbackSubmit} />
          <EvidenceCards evidenceList={currentResult?.supporting_evidence} />
          <AgentExecutionTrace traceSteps={currentResult?.trace_steps} />
        </div>
      </div>
    </div>
  );
}
