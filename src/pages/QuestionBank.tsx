import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Button, Form, Table, Modal, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

interface Question {
  id: number;
  text: string;
  type: 'تستی' | 'تشریحی';
  difficulty: 'ساده' | 'متوسط' | 'سخت';
  topic: string;
  options?: string[];
  correctAnswer?: string;
}

const mockQuestions: Question[] = [
  {
    id: 1,
    text: 'حاصل جمع ۲ و ۲ چیست؟',
    type: 'تستی',
    difficulty: 'ساده',
    topic: 'ریاضی',
    options: ['۲', '۳', '۴', '۵'],
    correctAnswer: '۴',
  },
  {
    id: 2,
    text: 'فرمول انرژی جنبشی چیست؟',
    type: 'تشریحی',
    difficulty: 'متوسط',
    topic: 'فیزیک',
  },
];

const QuestionBank: React.FC = () => {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState<Question[]>(mockQuestions);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [topicFilter, setTopicFilter] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('');
  const [showDetails, setShowDetails] = useState<Question | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [form, setForm] = useState<Omit<Question, 'id'>>({
    text: '',
    type: 'تستی',
    difficulty: 'متوسط',
    topic: '',
    options: ['', '', '', ''],
    correctAnswer: '',
  });

  const filtered = questions.filter(q =>
    q.text.includes(search) &&
    (typeFilter ? q.type === typeFilter : true) &&
    (topicFilter ? q.topic.includes(topicFilter) : true) &&
    (difficultyFilter ? q.difficulty === difficultyFilter : true)
  );

  const handleDelete = (id: number) => {
    if (confirm('آیا از حذف این سؤال مطمئن هستید؟')) {
      setQuestions(prev => prev.filter(q => q.id !== id));
    }
  };

  const handleFormChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };
  

  const handleOptionChange = (index: number, value: string) => {
    const updated = [...(form.options || [])];
    updated[index] = value;
    setForm(prev => ({ ...prev, options: updated }));
  };

  const handleAddQuestion = (e: FormEvent) => {
    e.preventDefault();
    const newQuestion: Question = {
      id: Date.now(),
      ...form,
    };
    setQuestions(prev => [...prev, newQuestion]);
    setShowAddModal(false);
  };

  return (
    <div className="container-fluid py-4" style={{ direction: 'rtl' }}>
      <h2 className="text-center mb-4">بانک سؤالات</h2>

      <Button variant="outline-secondary" onClick={() => navigate('/')} className="mb-3">
        ← بازگشت به داشبورد
      </Button>

      {/* Filters */}
      <div className="d-flex flex-wrap gap-3 mb-3">
        <Form.Control
          placeholder="جستجو در متن سؤال..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <Form.Select value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
          <option value="">همه انواع</option>
          <option value="تستی">تستی</option>
          <option value="تشریحی">تشریحی</option>
        </Form.Select>
        <Form.Control
          placeholder="موضوع..."
          value={topicFilter}
          onChange={e => setTopicFilter(e.target.value)}
        />
        <Form.Select value={difficultyFilter} onChange={e => setDifficultyFilter(e.target.value)}>
          <option value="">همه سطوح</option>
          <option value="ساده">ساده</option>
          <option value="متوسط">متوسط</option>
          <option value="سخت">سخت</option>
        </Form.Select>
        <Button variant="success" onClick={() => setShowAddModal(true)}>
          + افزودن دستی سؤال
        </Button>
      </div>

      {/* Table */}
      <Table bordered hover className="text-center align-middle">
        <thead className="table-light">
          <tr>
            <th>متن سؤال</th>
            <th>نوع</th>
            <th>دشواری</th>
            <th>موضوع</th>
            <th>عملیات</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length > 0 ? (
            filtered.map(q => (
              <tr key={q.id}>
                <td>{q.text}</td>
                <td>{q.type}</td>
                <td>{q.difficulty}</td>
                <td>{q.topic}</td>
                <td>
                  <Button size="sm" variant="info" className="ms-1" onClick={() => setShowDetails(q)}>
                    مشاهده
                  </Button>
                  <Button size="sm" variant="outline-danger" onClick={() => handleDelete(q.id)}>
                    حذف
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan={5}>سؤالی یافت نشد.</td></tr>
          )}
        </tbody>
      </Table>

      {/* Details Modal */}
      <Modal show={!!showDetails} onHide={() => setShowDetails(null)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="w-100 text-end">جزئیات سؤال</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {showDetails && (
            <>
              <p><strong>متن:</strong> {showDetails.text}</p>
              <p><strong>نوع:</strong> {showDetails.type}</p>
              <p><strong>دشواری:</strong> {showDetails.difficulty}</p>
              <p><strong>موضوع:</strong> {showDetails.topic}</p>
              {showDetails.type === 'تستی' && showDetails.options && (
                <>
                  <p><strong>گزینه‌ها:</strong></p>
                  <ul>
                    {showDetails.options.map((opt, idx) => (
                      <li key={idx}>{opt}</li>
                    ))}
                  </ul>
                  <p><strong>پاسخ صحیح:</strong> {showDetails.correctAnswer}</p>
                </>
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDetails(null)}>بستن</Button>
        </Modal.Footer>
      </Modal>

      {/* Add Manual Question Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
        <Form onSubmit={handleAddQuestion}>
          <Modal.Header closeButton>
            <Modal.Title className="w-100 text-end">افزودن دستی سؤال</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-2">
              <Form.Label>متن سؤال</Form.Label>
              <Form.Control name="text" value={form.text} onChange={handleFormChange} required />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>موضوع</Form.Label>
              <Form.Control name="topic" value={form.topic} onChange={handleFormChange} required />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>نوع</Form.Label>
              <Form.Select name="type" value={form.type} onChange={handleFormChange}>
                <option value="تستی">تستی</option>
                <option value="تشریحی">تشریحی</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>دشواری</Form.Label>
              <Form.Select name="difficulty" value={form.difficulty} onChange={handleFormChange}>
                <option value="ساده">ساده</option>
                <option value="متوسط">متوسط</option>
                <option value="سخت">سخت</option>
              </Form.Select>
            </Form.Group>
            {form.type === 'تستی' && (
              <>
                <Form.Label>گزینه‌ها</Form.Label>
                {form.options?.map((opt, i) => (
                  <Form.Control
                    className="mb-1"
                    key={i}
                    placeholder={`گزینه ${i + 1}`}
                    value={opt}
                    onChange={e => handleOptionChange(i, e.target.value)}
                  />
                ))}
                <Form.Label>پاسخ صحیح</Form.Label>
                <Form.Control name="correctAnswer" value={form.correctAnswer} onChange={handleFormChange} />
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowAddModal(false)}>انصراف</Button>
            <Button variant="primary" type="submit">ثبت</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default QuestionBank;
