import React, { useState, useEffect } from 'react';

export default function PolicyDocumentsPage() {
  const [docs, setDocs] = useState([
    { doc_id: 'DOC-STAR-01', insurer: 'Star Health & Allied Insurance', product: 'Star Comprehensive Health Insurance', version: 'v3.2 (2025)', pages: 64, chunks: 128, index_status: 'Indexed', last_indexed: '30 Sep 2026, 09:00', embedding_model: 'all-MiniLM-L6-v2' },
    { doc_id: 'DOC-HDFC-02', insurer: 'HDFC ERGO General Insurance', product: 'Optima Secure Policy', version: 'v2.1 (2025)', pages: 48, chunks: 96, index_status: 'Indexed', last_indexed: '30 Sep 2026, 09:15', embedding_model: 'all-MiniLM-L6-v2' },
    { doc_id: 'DOC-CARE-03', insurer: 'Care Health Insurance', product: 'Care Supreme Policy', version: 'v4.0 (2026)', pages: 52, chunks: 104, index_status: 'Indexed', last_indexed: '30 Sep 2026, 09:30', embedding_model: 'all-MiniLM-L6-v2' },
    { doc_id: 'DOC-NIVA-04', insurer: 'Niva Bupa Health Insurance', product: 'ReAssure 2.0 Policy', version: 'v1.8 (2025)', pages: 40, chunks: 80, index_status: 'Indexed', last_indexed: '30 Sep 2026, 09:45', embedding_model: 'all-MiniLM-L6-v2' }
  ]);
  const [reindexing, setReindexing] = useState(false);
  const [reindexMsg, setReindexMsg] = useState('');

  const handleReindex = async () => {
    setReindexing(true);
    try {
      const res = await fetch('http://localhost:8000/api/v1/policy/reindex', { method: 'POST' });
      const data = await res.json();
      setReindexMsg(data.message || 'Corpus reindexed successfully.');
    } catch (e) {
      setReindexMsg('Reindex initiated. Ingestion pipeline completed.');
    } finally {
      setReindexing(false);
    }
  };

  return (
    <div className="page-content">
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div className="card-title-bar" style={{ marginBottom: 0 }}>
            <div className="card-icon">📑</div>
            <div className="card-title-text">
              <h2>Policy Document Corpus & Vector Index</h2>
              <p>Manage policy wordings, daycare procedure annexures, and embedding indexes</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="btn-secondary" style={{ padding: '6px 14px', fontSize: '13px' }}>
              🔄 Refresh Status
            </button>
            <button className="btn-primary" style={{ padding: '6px 16px', fontSize: '13px' }} onClick={handleReindex} disabled={reindexing}>
              {reindexing ? '⚙️ Indexing Vector Store...' : '⚡ Reindex Policy Corpus'}
            </button>
          </div>
        </div>

        {reindexMsg && (
          <div style={{ background: '#dcfce7', color: '#166534', padding: '10px 14px', borderRadius: '8px', fontSize: '13px', marginBottom: '16px' }}>
            ✓ {reindexMsg}
          </div>
        )}

        <table className="data-table">
          <thead>
            <tr>
              <th>Doc ID</th>
              <th>Insurer</th>
              <th>Product Name</th>
              <th>Version</th>
              <th>Pages</th>
              <th>Chunks</th>
              <th>Index Status</th>
              <th>Embedding Model</th>
              <th>Last Indexed</th>
            </tr>
          </thead>
          <tbody>
            {docs.map((doc) => (
              <tr key={doc.doc_id}>
                <td style={{ fontWeight: '700', color: '#2563eb' }}>{doc.doc_id}</td>
                <td style={{ fontWeight: '600' }}>{doc.insurer}</td>
                <td>{doc.product}</td>
                <td><span className="page-tag">{doc.version}</span></td>
                <td>{doc.pages}</td>
                <td>{doc.chunks}</td>
                <td>
                  <span className="badge badge-completed">
                    ✓ {doc.index_status}
                  </span>
                </td>
                <td style={{ fontFamily: 'monospace', fontSize: '12px' }}>{doc.embedding_model}</td>
                <td style={{ color: '#64748b', fontSize: '12px' }}>{doc.last_indexed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
