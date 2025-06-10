import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Button, Table, Modal, Form, Row, Col, Badge } from 'react-bootstrap';

// Mock exams data
interface Question {
  text: string;
  type: 'تستی' | 'تشریحی';
  options?: string[];
}
interface Exam {
  id: number;
  title: string;
  subjects: string[];
  type: 'تستی' | 'تشریحی' | 'هردو';
  duration: number;
  createdAt: string;
  questions: Question[];
}
const mockExams: Exam[] = [
  {
    id: 1,
    title: 'آزمون ریاضی استاد',
    subjects: ['ریاضی'],
    type: 'تستی',
    duration: 20,
    createdAt: '2025-06-01',
    questions: [
      { text: '۲+۲ = ?', type: 'تستی', options: ['۳', '۴', '۵'] },
      { text: 'سؤال تستی دیگر', type: 'تستی', options: ['الف', 'ب', 'ج'] },
    ],
  },
  {
    id: 2,
    title: 'آزمون ترکیبی فیزیک',
    subjects: ['فیزیک', 'ریاضی'],
    type: 'هردو',
    duration: 30,
    createdAt: '2025-06-05',
    questions: [
      { text: 'تست: سرعت نور؟', type: 'تستی', options: ['۳۰۰۰۰۰', '۱۵۰۰۰۰'] },
      { text: 'تشریح: قانون نیوتن؟', type: 'تشریحی' },
    ],
  },
];

const ManageExam: React.FC = () => {
  const [exams, setExams] = useState<Exam[]>(mockExams);
  const [showView, setShowView] = useState(false);
  const [viewExam, setViewExam] = useState<Exam | null>(null);

  const [showCreate, setShowCreate] = useState(false);
  const [newExam, setNewExam] = useState<{
    title: string;
    subjects: string[];
    type: 'تستی' | 'تشریحی' | 'هردو';
    duration: number;
    questions: Question[];
  }>({
    title: '',
    subjects: [],
    type: 'تستی',
    duration: 10,
    questions: [],
  });
  const [newQuestion, setNewQuestion] = useState<Question>({
    text: '',
    type: 'تستی',
    options: [''],
  });

  const handleView = (exam: Exam) => {
    setViewExam(exam);
    setShowView(true);
  };

  const handleCreateOpen = () => {
    setShowCreate(true);
  };

  const handleCreateClose = () => {
    setShowCreate(false);
    setNewExam({
      title: '',
      subjects: [],
      type: 'تستی',
      duration: 10,
      questions: [],
    });
    setNewQuestion({ text: '', type: 'تستی', options: [''] });
  };

  const handleAddQuestion = () => {
    setNewExam(prev => ({
      ...prev,
      questions: [...prev.questions, newQuestion],
    }));
    setNewQuestion({ text: '', type: 'تستی', options: [''] });
  };

  const handlePublish = () => {
    const id = Date.now();
    setExams(prev => [
      ...prev,
      { ...newExam, id, createdAt: new Date().toISOString().split('T')[0] },
    ]);
    handleCreateClose();
  };

  const handleDelete = (id: number) => {
    if (window.confirm('آیا از حذف آزمون مطمئن هستید؟')) {
      setExams(prev => prev.filter(ex => ex.id !== id));
    }
  };
  

  return (
    <div className="container" style={{ direction: 'rtl', padding: '2rem 1rem' }}>
      <h3 className="text-center mb-4">مدیریت آزمون‌ها</h3>
      <Button variant="success" className="mb-3" onClick={handleCreateOpen}>
        + ایجاد آزمون جدید
      </Button>

      <Table bordered hover responsive className="text-center align-middle">
        <thead className="table-light">
          <tr>
            <th>عنوان</th>
            <th>موضوعات</th>
            <th>نوع</th>
            <th>مدت‌زمان (دقیقه)</th>
            <th>تاریخ</th>
            <th>مشاهده</th>
          </tr>
        </thead>
        <tbody>
          {exams.map(ex => (
            <tr key={ex.id}>
              <td>{ex.title}</td>
              <td>{ex.subjects.join(', ')}</td>
              <td><Badge bg="info">{ex.type}</Badge></td>
              <td>{ex.duration}</td>
              <td>{ex.createdAt}</td>
              <td className="d-flex justify-content-center gap-2">
  <Button variant="outline-primary" size="sm" onClick={() => handleView(ex)}>
    مشاهده
  </Button>
  <Button
    variant="outline-danger"
    size="sm"
    onClick={() => handleDelete(ex.id)}
  >
    حذف
  </Button>
</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal: View Exam */}
      <Modal size="lg" show={showView} onHide={() => setShowView(false)}>
        <Modal.Header closeButton>
          <Modal.Title>جزئیات آزمون</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {viewExam && (
            <>
              <h5>{viewExam.title}</h5>
              <p>موضوعات: {viewExam.subjects.join(', ')}</p>
              <p>نوع: {viewExam.type}</p>
              <p>مدت‌زمان: {viewExam.duration} دقیقه</p>
              <hr />
              <h6>سؤالات:</h6>
              {viewExam.questions.map((q, i) => (
                <div key={i} className="mb-3">
                  <strong>{i + 1}. {q.text}</strong>
                  {q.type === 'تستی' && (
                    <ul>
                      {q.options?.map((o, j) => <li key={j}>{o}</li>)}
                    </ul>
                  )}
                  {q.type === 'تشریحی' && <p><em>پاسخ تشریحی</em></p>}
                </div>
              ))}
            </>
          )}
        </Modal.Body>
      </Modal>

      {/* Modal: Create Exam */}
      <Modal size="lg" show={showCreate} onHide={handleCreateClose}>
        <Modal.Header closeButton>
          <Modal.Title>ایجاد آزمون جدید</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Label>عنوان آزمون</Form.Label>
                <Form.Control
                  type="text"
                  value={newExam.title}
                  onChange={(e) =>
                    setNewExam(prev => ({ ...prev, title: e.target.value }))
                  }
                />
              </Col>
              <Col md={6} className="mb-3">
                <Form.Label>موضوعات (کاما جدا کنید)</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="مثال: ریاضی, فیزیک"
                  value={newExam.subjects.join(', ')}
                  onChange={(e) =>
                    setNewExam(prev => ({ ...prev, subjects: e.target.value.split(',').map(s => s.trim()) }))
                  }
                />
              </Col>
              <Col md={4} className="mb-3">
                <Form.Label>نوع آزمون</Form.Label>
                <Form.Select
                  value={newExam.type}
                  onChange={(e) =>
                    setNewExam(prev => ({ ...prev, type: e.target.value as any }))
                  }
                >
                  <option value="تستی">تستی</option>
                  <option value="تشریحی">تشریحی</option>
                  <option value="هردو">هردو</option>
                </Form.Select>
              </Col>
              <Col md={4} className="mb-3">
                <Form.Label>مدت‌زمان (دقیقه)</Form.Label>
                <Form.Control
                  type="number"
                  min={1}
                  value={newExam.duration}
                  onChange={(e) =>
                    setNewExam(prev => ({ ...prev, duration: Number(e.target.value) }))
                  }
                />
              </Col>
            </Row>

            <hr />
            <h6>افزودن سؤال جدید:</h6>
            <Form.Group className="mb-2">
              <Form.Label>متن سؤال</Form.Label>
              <Form.Control
                type="text"
                value={newQuestion.text}
                onChange={(e) =>
                  setNewQuestion(prev => ({ ...prev, text: e.target.value }))
                }
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>نوع سؤال</Form.Label>
              <Form.Select
                value={newQuestion.type}
                onChange={(e) =>
                  setNewQuestion(prev => ({
                    ...prev,
                    type: e.target.value as any,
                    options: e.target.value === 'تستی' ? [''] : undefined
                  }))
                }
              >
                <option value="تستی">تستی</option>
                <option value="تشریحی">تشریحی</option>
              </Form.Select>
            </Form.Group>

            {newQuestion.type === 'تستی' && newQuestion.options?.map((opt, idx) => (
              <Row key={idx} className="mb-1">
                <Col>
                  <Form.Control
                    value={opt}
                    onChange={(e) => {
                      const opts = [...(newQuestion.options || [])];
                      opts[idx] = e.target.value;
                      setNewQuestion(prev => ({ ...prev, options: opts }));
                    }}
                  />
                </Col>
                <Col md="auto">
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => {
                      const opts = [...(newQuestion.options || [])];
                      opts.splice(idx, 1);
                      setNewQuestion(prev => ({ ...prev, options: opts }));
                    }}
                  >
                    حذف
                  </Button>
                </Col>
              </Row>
            ))}
            {newQuestion.type === 'تستی' && (
              <Button variant="outline-secondary" size="sm" onClick={() => {
                setNewQuestion(prev => ({
                  ...prev,
                  options: [...(prev.options || []), '']
                }));
              }}>
                + گزینه جدید
              </Button>
            )}

            <div className="text-end mt-3">
              <Button variant="primary" onClick={handleAddQuestion}>
                افزودن سؤال به آزمون
              </Button>
            </div>

            <hr />
            <p>تعداد سؤالات فعلی: <strong>{newExam.questions.length}</strong></p>
            <div className="d-flex justify-content-end gap-2">
              <Button variant="secondary" onClick={() => alert('پیش‌نمایش آزمون (Test View)')}>
                پیش‌نمایش
              </Button>
              <Button variant="success" onClick={handlePublish}>
                انتشار آزمون
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ManageExam;
