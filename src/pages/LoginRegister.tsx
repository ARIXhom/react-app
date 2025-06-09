import React, { useState, FormEvent } from 'react';

export interface UserFormData {
  email: string;
  username: string;
  password: string;
  confirmPassword?: string;
  firstName?: string;
  lastName?: string;
  role?: 'user' | 'admin';
}

interface LoginRegisterProps {
  onLogin: () => void;
}

const LoginRegister: React.FC<LoginRegisterProps> = ({ onLogin }) => {
  const [showRegister, setShowRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<UserFormData>({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    role: 'user'
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = (isRegister: boolean) => {
    if (isRegister) {
      if (!/^[^s@]+@[^s@]+\.[^s@]+$/.test(formData.email)) {
        setError('لطفاً یک ایمیل معتبر وارد کنید');
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('رمز عبور و تکرار آن یکسان نیستند');
        return false;
      }
      if (!formData.firstName || !formData.lastName) {
        setError('نام و نام خانوادگی را وارد کنید');
        return false;
      }
    } else {
      if (!formData.username || !formData.password) {
        setError('تمام فیلدهای ورود الزامی است');
        return false;
      }
    }
    if (formData.password.length < 6) {
      setError('رمز عبور باید حداقل ۶ کاراکتر باشد');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: FormEvent, isRegister: boolean) => {
    e.preventDefault();
    setError('');
    if (!validateForm(isRegister)) return;
    setLoading(true);
    try {
      await new Promise(res => setTimeout(res, 800));
      onLogin();
    } catch {
      setError('خطا در ارتباط با سرور');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f2f5',
        padding: '2rem',
        overflowY: 'auto'
      }}
    >
      <div className="card shadow-sm" style={{ width: '100%', maxWidth: 420 }}>
        <div className="card-body p-4">
          <h3 className="card-title text-center mb-4">
            {showRegister ? 'ثبت‌نام' : 'ورود'}
          </h3>

          {error && (
            <div className="alert alert-danger py-2 text-center">
              {error}
            </div>
          )}

          <form onSubmit={e => handleSubmit(e, showRegister)}>
            {showRegister ? (
              <>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">نام</label>
                    <input
                      type="text"
                      name="firstName"
                      className="form-control"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">نام خانوادگی</label>
                    <input
                      type="text"
                      name="lastName"
                      className="form-control"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">ایمیل</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">رمز عبور</label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">تکرار رمز عبور</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      className="form-control"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">نوع حساب</label>
                  <select
                    name="role"
                    className="form-select"
                    value={formData.role}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="user">دانشجو</option>
                    <option value="admin">استاد</option>
                  </select>
                </div>
              </>
            ) : (
              <>
                <div className="mb-3">
                  <label className="form-label">ایمیل یا نام کاربری</label>
                  <input
                    type="text"
                    name="username"
                    className="form-control"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">رمز عبور</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading
                ? showRegister ? 'در حال ثبت‌نام...' : 'در حال ورود...'
                : showRegister ? 'ثبت‌نام' : 'ورود'}
            </button>
          </form>

          <hr className="my-3" />

          <div className="text-center">
            <button
              type="button"
              className="btn btn-link"
              onClick={() => {
                setError('');
                setShowRegister(!showRegister);
              }}
            >
              {showRegister
                ? 'حساب دارید؟ ورود'
                : 'حساب ندارید؟ ثبت‌نام'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;