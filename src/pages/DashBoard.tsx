import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <nav
        className="nav flex-column bg-dark p-3"
        style={{ width: 220 }}
      >
        <h4 className="text-center text-white mb-4">ExamMaker</h4>
        <a className="nav-link text-white" href="#">مدیریت موضوعات</a>
        <a className="nav-link text-white" href="#">مدیریت منابع</a>
        <a className="nav-link text-white" href="#">طراحی سؤالات</a>
        <a className="nav-link text-white" href="#">بانک سؤالات</a>
        <a className="nav-link text-white" href="#">برگزاری آزمون</a>
        <a className="nav-link text-white" href="#">پروفایل / تنظیمات</a>
      </nav>

      {/* Main Content */}
      <main className="flex-grow-1 bg-light d-flex flex-column align-items-center justify-content-center p-4">
        <h2 className="mb-4">خوش آمدید!</h2>
        <div className="row g-3 w-100" style={{ maxWidth: 800 }}>
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
      </main>
    </div>
  );
};

export default Dashboard;
