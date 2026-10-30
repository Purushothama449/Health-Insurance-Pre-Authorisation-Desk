import React from 'react';

export default function RecentRequestsTable({ runs, onSelectRun, onViewAll }) {
  if (!runs || runs.length === 0) {
    return (
      <div className="card">
        <div style={{ textAlign: 'center', padding: '20px', color: '#64748b' }}>
          No recent pre-authorisation requests found.
        </div>
      </div>
    );
  }

  const getStatusBadge = (status) => {
    if (status === 'Completed') return 'badge-completed';
    if (status === 'Processing') return 'badge-processing';
    return 'badge-medical';
  };

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div className="card-title-bar" style={{ marginBottom: 0 }}>
          <div className="card-icon" style={{ background: '#eff6ff', color: '#2563eb' }}>🕒</div>
          <div className="card-title-text">
            <h2>Recent Requests</h2>
            <p>Recent hospital pre-authorization claims processed by system</p>
          </div>
        </div>
        <button className="btn-secondary" style={{ padding: '6px 14px', fontSize: '12px' }} onClick={onViewAll}>
          View All
        </button>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>Run ID</th>
            <th>Patient ID</th>
            <th>Procedure</th>
            <th>Status</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {runs.slice(0, 5).map((run) => (
            <tr key={run.run_id}>
              <td>
                <span className="table-link" onClick={() => onSelectRun(run)}>
                  {run.run_id}
                </span>
              </td>
              <td style={{ fontWeight: '500' }}>{run.patient_id}</td>
              <td style={{ color: '#334155' }}>{run.procedure}</td>
              <td>
                <span className={`badge ${getStatusBadge(run.status)}`}>
                  {run.status}
                </span>
              </td>
              <td style={{ color: '#64748b', fontSize: '12px' }}>{run.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
