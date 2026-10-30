import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardPage from './pages/DashboardPage';
import RecentRequestsPage from './pages/RecentRequestsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import PolicyDocumentsPage from './pages/PolicyDocumentsPage';
import SystemStatusPage from './pages/SystemStatusPage';
import MonitoringPage from './pages/MonitoringPage';
import EvaluationPage from './pages/EvaluationPage';
import SettingsPage from './pages/SettingsPage';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(false);
  const [currentResult, setCurrentResult] = useState(null);
  const [recentRuns, setRecentRuns] = useState([]);

  // Fetch initial run list from backend API
  const fetchRuns = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/v1/runs');
      const data = await res.json();
      if (data.runs && data.runs.length > 0) {
        setRecentRuns(data.runs);
        if (!currentResult) {
          setCurrentResult(data.runs[0]);
        }
      }
    } catch (err) {
      console.warn('Backend API connection pending:', err);
    }
  };

  useEffect(() => {
    fetchRuns();
  }, []);

  // Submit Pre-Auth Request Form Handler
  const handleFormSubmit = async (formData) => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8000/api/v1/preauth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (!res.ok) {
        alert(`Request rejected: ${data.detail?.message || 'Invalid input'}`);
        setLoading(false);
        return;
      }

      const runId = data.run_id;
      
      // Poll run result until completed
      let attempts = 0;
      const pollInterval = setInterval(async () => {
        attempts += 1;
        try {
          const runRes = await fetch(`http://localhost:8000/api/v1/runs/${runId}`);
          const runData = await runRes.json();
          
          if (runData.status === 'Completed' || runData.status === 'Medical Review' || attempts > 10) {
            clearInterval(pollInterval);
            setCurrentResult(runData);
            setLoading(false);
            fetchRuns();
          }
        } catch (e) {
          clearInterval(pollInterval);
          setLoading(false);
        }
      }, 1000);
    } catch (err) {
      alert('Error connecting to backend server.');
      setLoading(false);
    }
  };

  // Feedback Submission Handler
  const handleFeedbackSubmit = async (runId, satisfactory, reason) => {
    try {
      await fetch('http://localhost:8000/api/v1/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ run_id: runId, satisfactory, reason })
      });
    } catch (e) {
      console.error('Feedback submission error:', e);
    }
  };

  // Select a run from table
  const handleSelectRun = (run) => {
    setCurrentResult(run);
    setActiveTab('dashboard');
  };

  return (
    <div className="app-container">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="main-wrapper">
        <Header setActiveTab={setActiveTab} />

        {activeTab === 'dashboard' && (
          <DashboardPage
            formSubmitHandler={handleFormSubmit}
            loading={loading}
            currentResult={currentResult}
            recentRuns={recentRuns}
            onSelectRun={handleSelectRun}
            onViewAllRequests={() => setActiveTab('recent')}
            onFeedbackSubmit={handleFeedbackSubmit}
          />
        )}

        {activeTab === 'recent' && (
          <RecentRequestsPage runs={recentRuns} onSelectRun={handleSelectRun} />
        )}

        {activeTab === 'analytics' && <AnalyticsPage />}

        {activeTab === 'policy' && <PolicyDocumentsPage />}

        {activeTab === 'status' && <SystemStatusPage />}

        {activeTab === 'monitoring' && <MonitoringPage />}

        {activeTab === 'evaluation' && <EvaluationPage />}

        {activeTab === 'settings' && <SettingsPage />}
      </div>
    </div>
  );
}
