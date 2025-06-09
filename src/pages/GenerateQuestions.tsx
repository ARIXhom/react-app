import React, { useState } from 'react';
import { Button, Form, Modal, Table, Alert, Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

interface Question {
  id: number;
  text: string;
  type: 'تستی' | 'تشریحی';
  difficulty: 'ساده' | 'متوسط' | 'سخت';
  topic: string;
  source: string;
}

const mockTopics = ['ریاضی', 'فیزیک', 'شیمی'];
const mockSources = ['کتاب درسی', 'جزوه', 'مقاله'];

const GenerateQuestions: React.FC = () => {
  const navigate = useNavigate();

  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [selectAllSources, setSelectAllSources] = useState<boolean>(false);
  const [questionCount, setQuestionCount] = useState<number>(5);
  const [questionType, setQuestionType] = useState<'تستی' | 'تشریحی' | 'هردو'>('هردو');
  const [difficulty, setDifficulty] = useState<'ساده' | 'متوسط' | 'سخت'>('متوسط');
  const [generatedQuestions, setGeneratedQuestions] = useState<Question[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [editedText, setEditedText] = useState<string>('');
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  const handleTopicToggle = (topic: string) => {
    setSelectedTopics(prev =>
      prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
    );
  };

  const handleSourceToggle = (source: string) => {
    setSelectedSources(prev =>
      prev.includes(source) ? prev.filter(s => s !== source) : [...prev, source]
    );
  };

  const handleGenerate = () => {
    const count = Math.min(questionCount, 20);
    const questions: Question[] = Array.from({ length: count }, (_, idx) => ({
      id: Date.now() + idx,
      text: `سؤال نمونه ${idx + 1} در موضوع ${selectedTopics[0] || 'عمومی'}`,
      type: questionType === 'هردو' ? (idx % 2 === 0 ? 'تستی' : 'تشریحی') : questionType,
      difficulty,
      topic: selectedTopics[0] || 'عمومی',
      source: selectAllSources ? 'همه منابع' : selectedSources[0] || 'منبع پیش‌فرض',
    }));
    setGeneratedQuestions(questions);
  };

  return (
    <div className="container-fluid" style={{ direction: 'rtl', minHeight: '100vh', padding: '2rem' }}>
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          <h2 className="mb-4 text-center">طراحی سؤالات</h2>

          <Button variant="outline-secondary" className="mb-3" onClick={() => navigate('/')}>
            بازگشت به داشبورد
          </Button>

          <Form>
            {/* Topics Dropdown */}
            <Form.Group className="mb-3">
              <Form.Label>انتخاب موضوعات</Form.Label>
              <Dropdown className="w-100">
                <Dropdown.Toggle variant="outline-primary" className="w-100 text-start">
                  {selectedTopics.length > 0 ? `${selectedTopics.join(', ')}` : 'انتخاب موضوعات'}
                </Dropdown.Toggle>
                <Dropdown.Menu className="w-100 px-2">
                  {mockTopics.map(topic => (
                    <Form.Check
                      key={topic}
                      type="checkbox"
                      label={topic}
                      checked={selectedTopics.includes(topic)}
                      onChange={() => handleTopicToggle(topic)}
                      className="form-check-blue"
                    />
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>

            {/* Sources Dropdown */}
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="انتخاب منابع"
                checked={selectAllSources}
                onChange={e => setSelectAllSources(e.target.checked)}
              />
              {!selectAllSources && (
                <Dropdown className="w-100 mt-2">
                  <Dropdown.Toggle variant="outline-primary" className="w-100 text-start">
                    {selectedSources.length > 0 ? `${selectedSources.join(', ')}` : 'انتخاب منابع'}
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="w-100 px-2">
                    {mockSources.map(source => (
                      <Form.Check
                        key={source}
                        type="checkbox"
                        label={source}
                        checked={selectedSources.includes(source)}
                        onChange={() => handleSourceToggle(source)}
                        className="form-check-blue"
                      />
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>تعداد سؤالات (حداکثر ۲۰)</Form.Label>
              <Form.Control
                type="number"
                value={questionCount}
                onChange={e => setQuestionCount(Math.min(Number(e.target.value), 20))}
                min={1}
                max={20}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>نوع سؤالات</Form.Label>
              <Form.Select
                value={questionType}
                onChange={e => setQuestionType(e.target.value as 'تستی' | 'تشریحی' | 'هردو')}
              >
                <option value="تستی">تستی</option>
                <option value="تشریحی">تشریحی</option>
                <option value="هردو">هردو</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>سطح دشواری</Form.Label>
              <Form.Select
                value={difficulty}
                onChange={e => setDifficulty(e.target.value as 'ساده' | 'متوسط' | 'سخت')}
              >
                <option value="ساده">ساده</option>
                <option value="متوسط">متوسط</option>
                <option value="سخت">سخت</option>
              </Form.Select>
            </Form.Group>

            <Button variant="primary" onClick={handleGenerate}>
              تولید سؤال
            </Button>
          </Form>

          {generatedQuestions.length > 0 && (
            <>
              <h4 className="mt-5">سؤالات تولید شده</h4>
              <Table bordered hover className="text-center align-middle mt-3">
                <thead className="table-light">
                  <tr>
                    <th>متن سؤال</th>
                    <th>نوع</th>
                    <th>دشواری</th>
                    <th>موضوع</th>
                    <th>منبع</th>
                    <th>عملیات</th>
                  </tr>
                </thead>
                <tbody>
                  {generatedQuestions.map(question => (
                    <tr key={question.id}>
                      <td>{question.text}</td>
                      <td>{question.type}</td>
                      <td>{question.difficulty}</td>
                      <td>{question.topic}</td>
                      <td>{question.source}</td>
                      <td>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="ms-2"
                          onClick={() => {
                            setCurrentQuestion(question);
                            setEditedText(question.text);
                            setShowModal(true);
                          }}
                        >
                          ویرایش
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => setGeneratedQuestions(prev => prev.filter(q => q.id !== question.id))}
                        >
                          حذف
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <Button variant="success" onClick={() => {
                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 3000);
              }}>
                ذخیره در بانک سؤالات
              </Button>
            </>
          )}

          <Modal show={showModal} onHide={() => setShowModal(false)} centered>
            <Modal.Header closeButton>
              <Modal.Title className="w-100 text-end">ویرایش سؤال</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group controlId="editQuestionText">
                <Form.Label>متن سؤال</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={editedText}
                  onChange={e => setEditedText(e.target.value)}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                انصراف
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  if (currentQuestion) {
                    setGeneratedQuestions(prev =>
                      prev.map(q =>
                        q.id === currentQuestion.id ? { ...q, text: editedText } : q
                      )
                    );
                    setShowModal(false);
                  }
                }}
              >
                ذخیره
              </Button>
            </Modal.Footer>
          </Modal>

          {showSuccess && (
            <Alert variant="success" className="mt-3">
              سؤالات با موفقیت در بانک ذخیره شدند.
            </Alert>
          )}

          <style>{`
            .form-check-blue .form-check-input:checked {
              background-color: #4a90e2;
              border-color: #4a90e2;
            }
            .form-check-blue .form-check-input {
              cursor: pointer;
            }
            .form-check-blue .form-check-label {
              cursor: pointer;
            }
          `}</style>
        </div>
      </div>
    </div>
  );
};

export default GenerateQuestions;
