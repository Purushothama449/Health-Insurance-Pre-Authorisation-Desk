import React, { useState } from 'react';

const INITIAL_FORM = {
  patient_id: 'P1001',
  hospital_name: 'ABC Hospital',
  policy_number: 'POL12345',
  room_category: 'Private',
  procedure: 'Cataract Surgery',
  policy_start_date: '01-10-2025',
  admission_type: 'Planned Surgical',
  admission_date: '30-09-2026'
};

export default function PreAuthForm({ onSubmit, loading }) {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMsg(null);
  };

  const handleClear = () => {
    setFormData({
      patient_id: '',
      hospital_name: '',
      policy_number: '',
      room_category: 'Private',
      procedure: '',
      policy_start_date: '',
      admission_type: 'Planned Surgical',
      admission_date: ''
    });
    setErrorMsg(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.patient_id || !formData.hospital_name || !formData.procedure) {
      setErrorMsg('Please fill in all required fields marked with *');
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="card">
      <div className="card-title-bar">
        <div className="card-icon">📄</div>
        <div className="card-title-text">
          <h2>New Pre-Authorisation Request</h2>
          <p>Submit a hospital pre-authorisation request for coverage recommendation</p>
        </div>
      </div>

      {errorMsg && (
        <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '10px 14px', borderRadius: '8px', fontSize: '13px', marginBottom: '16px' }}>
          ⚠️ {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label>Patient ID <span>*</span></label>
            <input
              type="text"
              name="patient_id"
              className="form-input"
              value={formData.patient_id}
              onChange={handleChange}
              placeholder="e.g. P1001"
              required
            />
          </div>

          <div className="form-group">
            <label>Hospital Name <span>*</span></label>
            <input
              type="text"
              name="hospital_name"
              className="form-input"
              value={formData.hospital_name}
              onChange={handleChange}
              placeholder="e.g. ABC Hospital"
              required
            />
          </div>

          <div className="form-group">
            <label>Policy Number <span>*</span></label>
            <input
              type="text"
              name="policy_number"
              className="form-input"
              value={formData.policy_number}
              onChange={handleChange}
              placeholder="e.g. POL12345"
              required
            />
          </div>

          <div className="form-group">
            <label>Room Category <span>*</span></label>
            <select
              name="room_category"
              className="form-select"
              value={formData.room_category}
              onChange={handleChange}
            >
              <option value="General">General</option>
              <option value="Twin Sharing">Twin Sharing</option>
              <option value="Private">Private</option>
              <option value="Deluxe">Deluxe</option>
            </select>
          </div>

          <div className="form-group">
            <label>Procedure <span>*</span></label>
            <input
              type="text"
              name="procedure"
              className="form-input"
              value={formData.procedure}
              onChange={handleChange}
              placeholder="e.g. Cataract Surgery"
              required
            />
          </div>

          <div className="form-group">
            <label>Policy Start Date <span>*</span></label>
            <input
              type="text"
              name="policy_start_date"
              className="form-input"
              value={formData.policy_start_date}
              onChange={handleChange}
              placeholder="DD-MM-YYYY"
              required
            />
          </div>

          <div className="form-group">
            <label>Admission Type <span>*</span></label>
            <select
              name="admission_type"
              className="form-select"
              value={formData.admission_type}
              onChange={handleChange}
            >
              <option value="Planned Surgical">Planned Surgical</option>
              <option value="Day Care">Day Care</option>
              <option value="Emergency">Emergency</option>
              <option value="Maternity">Maternity</option>
            </select>
          </div>

          <div className="form-group">
            <label>Admission Date <span>*</span></label>
            <input
              type="text"
              name="admission_date"
              className="form-input"
              value={formData.admission_date}
              onChange={handleChange}
              placeholder="DD-MM-YYYY"
              required
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn-secondary" onClick={handleClear} disabled={loading}>
            Clear
          </button>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? (
              <>⏳ Processing Request...</>
            ) : (
              <>🚀 Submit Pre-Authorisation Request</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
