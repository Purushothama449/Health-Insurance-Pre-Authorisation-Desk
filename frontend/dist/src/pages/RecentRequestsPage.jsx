import React, { useState } from 'react';

export default function RecentRequestsPage({ runs, onSelectRun }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [admissionFilter, setAdmissionFilter] = useState('All');

  const filteredRuns = runs.filter((r) => {
    const matchesSearch =
      r.run_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.patient_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.procedure.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || r.status === statusFilter;
    const matchesAdmission = admissionFilter === 'All' || r.admission_type === admissionFilter;

    return matchesSearch && matchesStatus && matchesAdmission;
  });

  return (
    <div className="page-content">
      <div className="card">
        <div className="card-title-bar">
          <div className="card-icon">📚</div>
          <div className="card-title-text">
            <h2>All Pre-Authorisation Requests</h2>
            <p>Comprehensive historical ledger of hospital claims and AI recommendations</p>
          </div>
        </div>

        {/* Filters Bar */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '16px', marginBottom: '20px' }}>
          <div>
            <label style={{ fontSize: '12px', fontWeight: '600', color: '#64748b' }}>Search Claims</label>
            <input
              type="text"
              className="form-input"
              style={{ width: '100%', marginTop: '4px' }}
              placeholder="Search by Run ID, Patient ID, or Procedure..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div>
            <label style={{ fontSize: '12px', fontWeight: '600', color: '#64748b' }}>Status Filter</label>
            <select
              className="form-select"
              style={{ width: '100%', marginTop: '4px' }}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Completed">Completed</option>
              <option value="Processing">Processing</option>
              <option value="Medical Review">Medical Review</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: '12px', fontWeight: '600', color: '#64748b' }}>Admission Type</label>
            <select
              className="form-select"
              style={{ width: '100%', marginTop: '4px' }}
              value={admissionFilter}
              onChange={(e) => setAdmissionFilter(e.target.value)}
            >
              <option value="All">All Types</option>
              <option value="Planned Surgical">Planned Surgical</option>
              <option value="Day Care">Day Care</option>
              <option value="Emergency">Emergency</option>
              <option value="Maternity">Maternity</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <table className="data-table">
          <thead>
            <tr>
              <th>Run ID</th>
              <th>Patient ID</th>
              <th>Hospital Name</th>
              <th>Procedure</th>
              <th>Admission Type</th>
              <th>Recommendation</th>
              <th>Status</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {filteredRuns.map((run) => (
              <tr key={run.run_id}>
                <td>
                  <span className="table-link" onClick={() => onSelectRun(run)}>
                    {run.run_id}
                  </span>
                </td>
                <td style={{ fontWeight: '600' }}>{run.patient_id}</td>
                <td>{run.hospital_name}</td>
                <td style={{ fontWeight: '500' }}>{run.procedure}</td>
                <td style={{ color: '#64748b' }}>{run.admission_type}</td>
                <td>
                  <span style={{ fontSize: '11px', fontWeight: '700', padding: '3px 8px', borderRadius: '4px', background: run.recommendation === 'APPROVE-RECOMMENDED' ? '#d1fae5' : '#fef3c7', color: run.recommendation === 'APPROVE-RECOMMENDED' ? '#065f46' : '#92400e' }}>
                    {run.recommendation || 'PROCESSING'}
                  </span>
                </td>
                <td>
                  <span className={`badge ${run.status === 'Completed' ? 'badge-completed' : 'badge-processing'}`}>
                    {run.status}
                  </span>
                </td>
                <td style={{ color: '#64748b', fontSize: '12px' }}>{run.created_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
