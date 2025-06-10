import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Dashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', direction: 'rtl' }}>
      {/* Sidebar */}
      <div
        className={`bg-white text-dark position-fixed top-0 bottom-0 ${
          sidebarOpen ? 'end-0' : 'end-minus'
        }`}
        style={{
          width: 220,
          transition: 'all 0.3s',
          zIndex: 1040,
          padding: '1.5rem 1rem',
          overflowY: 'auto',
          borderLeft: '1px solid #ddd',
          boxShadow: '0 0 10px rgba(0,0,0,0.05)',
          backgroundColor: '#eaf4fd',
        }}
      >
        <h4 className="text-center mb-4" style={{ color: '#4a90e2' }}>ExamMaker</h4>
        <Link className="nav-link py-2 text-dark" to="/manage-topics">مدیریت موضوعات</Link>
        <Link className="nav-link py-2 text-dark" to="/manage-resources">مدیریت منابع</Link>
        <Link className="nav-link py-2 text-dark" to="/generate-questions">طراحی سؤالات</Link>
        <Link className="nav-link py-2 text-dark" to="/question-bank">بانک سؤالات</Link>
        <Link className="nav-link py-2 text-dark" to="/take-exam">برگزاری آزمون</Link>
        <Link className="nav-link py-2 text-dark" to="/profile">پروفایل / تنظیمات</Link>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="position-fixed top-0 bottom-0 start-0 end-0"
          style={{ background: 'rgba(0,0,0,0.3)', zIndex: 1030 }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div
        className="flex-grow-1"
        style={{
          marginRight: sidebarOpen ? 220 : 0,
          transition: 'margin 0.3s',
          backgroundColor: '#f5f6fa',
          padding: '1.5rem',
        }}
      >
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="m-0">خوش آمدید!</h2>

          {/* Toggle button (top left in mobile) */}
          <div className="d-md-none position-absolute start-0 top-0 m-3">
            <Button variant="outline-dark" onClick={toggleSidebar}>
              ☰
            </Button>
          </div>
        </div>

        {/* Dashboard Summary */}
        <div className="row g-3" style={{ maxWidth: 900, margin: '0 auto' }}>
          <div className="col-md-6">
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title">آخرین سؤالات تولیدشده</h5>
                <p className="card-text">۱۲ سوال جدید</p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title">آخرین آزمون برگزارشده</h5>
                <p className="card-text">آزمون ریاضی - دیروز</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar RTL slide fix */}
      <style>{`
        .end-minus {
          left: -220px;
        }
        @media (min-width: 768px) {
          .position-fixed {
            position: static !important;
          }
          .end-minus {
            left: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
