import React, { useState, FormEvent } from 'react';
import { Button, Form, Alert, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const mockUser = {
  name: 'علی رضایی',
  email: 'ali@example.com',
  role: 'user',
};

const mockExams = [
  { id: 1, title: 'آزمون ریاضی', date: '1403/02/01', score: '85%' },
  { id: 2, title: 'آزمون فیزیک', date: '1403/01/25', score: '70%' },
];

const Profile: React.FC = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(mockUser);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (password && password !== confirmPass) {
      alert('رمز عبور جدید و تکرار آن مطابقت ندارند.');
      return;
    }

    setUser(prev => ({ ...prev, email }));
    setPassword('');
    setConfirmPass('');
    setSuccessMsg('تغییرات با موفقیت ذخیره شد!');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  return (
    <div className="container py-4" style={{ direction: 'rtl' }}>
      <h2 className="text-center mb-4">پروفایل کاربر</h2>

      <Button variant="outline-secondary" onClick={() => navigate('/')} className="mb-4">
        ← بازگشت به داشبورد
      </Button>

      <div className="mb-4">
        <h5>اطلاعات کاربر</h5>
        <p><strong>نام:</strong> {user.name}</p>
        <p><strong>ایمیل:</strong> {user.email}</p>
        <p><strong>نقش:</strong> {user.role === 'admin' ? 'استاد' : 'دانشجو'}</p>
      </div>

      <div className="mb-5">
        <h5>ویرایش ایمیل یا رمز عبور</h5>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>ایمیل</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>رمز عبور جدید</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="در صورت نیاز"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>تکرار رمز عبور</Form.Label>
            <Form.Control
              type="password"
              value={confirmPass}
              onChange={e => setConfirmPass(e.target.value)}
              placeholder="در صورت نیاز"
            />
          </Form.Group>
          <Button type="submit" variant="primary">ذخیره تغییرات</Button>
        </Form>
        {successMsg && <Alert className="mt-3" variant="success">{successMsg}</Alert>}
      </div>

      <div>
        <h5 className="mb-3">آزمون‌های اخیر</h5>
        <Table striped bordered hover className="text-center align-middle">
          <thead className="table-light">
            <tr>
              <th>عنوان آزمون</th>
              <th>تاریخ</th>
              <th>نمره</th>
            </tr>
          </thead>
          <tbody>
            {mockExams.map(exam => (
              <tr key={exam.id}>
                <td>{exam.title}</td>
                <td>{exam.date}</td>
                <td>{exam.score}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Profile;
