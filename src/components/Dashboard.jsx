import { useState } from 'react';

export default function Dashboard() {
  const [jobs] = useState([
    {
      id: 1,
      name: 'Marketing Brochure - Q1 Campaign',
      status: 'completed',
      submitted: '2024-02-08 14:32',
      completed: '2024-02-08 15:45',
      pages: 12,
      copies: 500,
    },
    {
      id: 2,
      name: 'Product Catalog 2024',
      status: 'processing',
      submitted: '2024-02-10 09:15',
      estimated: '2024-02-10 16:00',
      pages: 48,
      copies: 1000,
    },
    {
      id: 3,
      name: 'Internal Presentation Handouts',
      status: 'pending',
      submitted: '2024-02-10 11:20',
      estimated: '2024-02-10 14:30',
      pages: 20,
      copies: 150,
    },
    {
      id: 4,
      name: 'Business Cards - Tech Team',
      status: 'completed',
      submitted: '2024-02-07 10:00',
      completed: '2024-02-07 11:30',
      pages: 1,
      copies: 500,
    },
    {
      id: 5,
      name: 'Annual Report - Executive Summary',
      status: 'failed',
      submitted: '2024-02-09 13:00',
      error: 'Resolution below minimum (1200x1200). Please resubmit with higher resolution.',
      pages: 8,
      copies: 250,
    },
  ]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return '✓';
      case 'processing':
        return '⟳';
      case 'pending':
        return '⏱';
      case 'failed':
        return '✕';
      default:
        return '○';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'completed';
      case 'processing':
        return 'processing';
      case 'pending':
        return 'pending';
      case 'failed':
        return 'failed';
      default:
        return '';
    }
  };

  return (
    <div className="dashboard">
      <h2>📊 Print Job Dashboard</h2>
      <p style={{ color: 'var(--text-light)', marginBottom: '1.5rem' }}>
        Manage and track your active print jobs
      </p>

      <div className="job-list">
        {jobs.map((job) => (
          <div key={job.id} className="job-card">
            <div className="job-header">
              <h3 className="job-name">{job.name}</h3>
              <span className={`job-status ${getStatusColor(job.status)}`}>
                {getStatusIcon(job.status)} {job.status}
              </span>
            </div>

            <div className="job-details">
              <div className="job-detail">
                <span>Submitted:</span>
                <span>{job.submitted}</span>
              </div>
              {job.completed && (
                <div className="job-detail">
                  <span>Completed:</span>
                  <span>{job.completed}</span>
                </div>
              )}
              {job.estimated && (
                <div className="job-detail">
                  <span>Estimated:</span>
                  <span>{job.estimated}</span>
                </div>
              )}
              <div className="job-detail">
                <span>Pages:</span>
                <span>{job.pages}</span>
              </div>
              <div className="job-detail">
                <span>Copies:</span>
                <span>{job.copies}</span>
              </div>
              {job.error && (
                <div
                  className="job-detail"
                  style={{
                    color: 'var(--danger-color)',
                    fontWeight: '500',
                    marginTop: '0.5rem',
                    padding: '0.5rem',
                    backgroundColor: '#fee2e2',
                    borderRadius: '0.375rem',
                  }}
                >
                  <span>⚠️ Error:</span>
                  <span style={{ textAlign: 'right' }}>{job.error}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
